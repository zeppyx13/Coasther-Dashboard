// src/app/dashboard/iot/terminal/page.tsx
// Halaman Remote Terminal - MQTT Log Monitor + Command Input
// Tambahkan ke sidebar: { label: "IoT Terminal", iconName: "terminal", href: "/dashboard/iot/terminal" }
// Tambahkan ke PAGE_TITLES di dashboard-topbar.tsx:
//   "/dashboard/iot/terminal": { label: "IoT", title: "Remote Terminal" },

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import DashboardShell from "@/components/dashboard/nav/dashboard-shell";
import { sidebarMenus } from "@/lib/dashboard-data";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { socket } from "@/lib/socket";
import {
    Terminal,
    Wifi,
    WifiOff,
    Trash2,
    Send,
    ChevronRight,
    Circle,
    Download,
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================
type LogLevel = "INFO" | "WARN" | "ERROR" | "SYSTEM";

type LogEntry = {
    id: string;
    level: LogLevel;
    msg: string;
    ts: string;
    source: "mqtt" | "system";
};

type CommandDef = {
    cmd: string;
    label: string;
    desc: string;
    danger?: boolean;
};

// =====================================================
// CONSTANTS
// =====================================================
const MQTT_CMD_TOKEN = process.env.NEXT_PUBLIC_MQTT_CMD_TOKEN ?? "Ch$K0st!2025#Secure";

const AVAILABLE_COMMANDS: CommandDef[] = [
    { cmd: "status",    label: "Status",       desc: "Cek kondisi ESP32 sekarang" },
    { cmd: "sync_ntp",  label: "Sync NTP",     desc: "Sinkronisasi waktu dari NTP" },
    { cmd: "relay_on",  label: "Relay ON",     desc: "Nyalakan relay (air mengalir)" },
    { cmd: "relay_off", label: "Relay OFF",    desc: "Matikan relay (air diputus)", danger: true },
    { cmd: "clear_buf", label: "Clear Buffer", desc: "Bersihkan offline buffer" },
    { cmd: "reset_nvs", label: "Reset NVS",    desc: "Reset semua counter ke 0", danger: true },
    { cmd: "reboot",    label: "Reboot",       desc: "Restart ESP32 dari jauh", danger: true },
];

const LEVEL_STYLE: Record<LogLevel, { dot: string; text: string; badge: string }> = {
    INFO:   { dot: "bg-emerald-400",  text: "text-emerald-300", badge: "text-emerald-400 bg-emerald-400/10" },
    WARN:   { dot: "bg-amber-400",    text: "text-amber-300",   badge: "text-amber-400 bg-amber-400/10" },
    ERROR:  { dot: "bg-red-400",      text: "text-red-300",     badge: "text-red-400 bg-red-400/10" },
    SYSTEM: { dot: "bg-blue-400",     text: "text-blue-300",    badge: "text-blue-400 bg-blue-400/10" },
};

function authHeader() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

function generateId() {
    return Math.random().toString(36).slice(2, 9);
}

function formatTs(ts: string): string {
    try {
        return new Date(ts).toLocaleTimeString("id-ID", {
            hour: "2-digit", minute: "2-digit", second: "2-digit",
        });
    } catch {
        return ts;
    }
}

// =====================================================
// MAIN PAGE
// =====================================================
export default function IotTerminalPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const [sending, setSending] = useState(false);
    const [mqttConnected, setMqttConnected] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    const [filterLevel, setFilterLevel] = useState<LogLevel | "ALL">("ALL");

    const logEndRef  = useRef<HTMLDivElement>(null);
    const inputRef   = useRef<HTMLInputElement>(null);

    // Tambah log entry
    const addLog = useCallback((entry: Omit<LogEntry, "id">) => {
        setLogs((prev) => {
            const next = [...prev, { ...entry, id: generateId() }];
            // Batasi 500 baris agar tidak OOM
            return next.length > 500 ? next.slice(next.length - 500) : next;
        });
    }, []);

    // System log (dari frontend sendiri)
    const sysLog = useCallback((msg: string, level: LogLevel = "SYSTEM") => {
        addLog({ level, msg, ts: new Date().toISOString(), source: "system" });
    }, [addLog]);

    // =====================================================
    // SOCKET.IO — subscribe ke log dari backend
    // Topic: coasther/device/+/log → backend forward via Socket.IO
    // =====================================================
    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            setMqttConnected(true);
            sysLog("Socket.IO terhubung ke server.");
        });

        socket.on("disconnect", () => {
            setMqttConnected(false);
            sysLog("Socket.IO terputus.", "WARN");
        });

        // Event dari backend saat ada log dari ESP32
        socket.on("iot_log", (payload: { level: string; msg: string; ts: string; room_id?: string }) => {
            addLog({
                level: (payload.level as LogLevel) ?? "INFO",
                msg: payload.msg,
                ts: payload.ts ?? new Date().toISOString(),
                source: "mqtt",
            });
        });

        sysLog("Terminal siap. Subscribe ke coasther/device/+/log");

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("iot_log");
            socket.disconnect();
        };
    }, [addLog, sysLog]);

    // Auto scroll ke bawah
    useEffect(() => {
        if (autoScroll && logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs, autoScroll]);

    // =====================================================
    // KIRIM COMMAND KE ESP32 VIA BACKEND
    // =====================================================
    async function sendCommand(rawCmd: string) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        // Simpan ke history
        setHistory((prev) => {
            const next = [cmd, ...prev.filter((h) => h !== cmd)];
            return next.slice(0, 50);
        });
        setHistoryIdx(-1);

        sysLog(`> ${cmd}`, "SYSTEM");
        setSending(true);

        try {
            // Cari room_id — ambil dari live status, default room 1
            // (extend ini kalau multi-room)
            const roomId = 1;

            await api.post(
                `/api/iot/relay/${roomId}`,
                { command: cmd },
                { headers: authHeader() }
            );

            sysLog(`Command "${cmd}" berhasil dikirim.`, "INFO");
        } catch (err: any) {
            const msg = err?.response?.data?.message || "Gagal mengirim command.";
            sysLog(`Error: ${msg}`, "ERROR");
        } finally {
            setSending(false);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;
        sendCommand(input);
        setInput("");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const idx = Math.min(historyIdx + 1, history.length - 1);
            setHistoryIdx(idx);
            setInput(history[idx] ?? "");
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const idx = Math.max(historyIdx - 1, -1);
            setHistoryIdx(idx);
            setInput(idx === -1 ? "" : history[idx] ?? "");
        }
    }

    function clearLogs() {
        setLogs([]);
        sysLog("Log dibersihkan.");
    }

    function exportLogs() {
        const content = logs
            .map((l) => `[${formatTs(l.ts)}] [${l.level}] ${l.msg}`)
            .join("\n");
        const blob = new Blob([content], { type: "text/plain" });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement("a");
        a.href     = url;
        a.download = `coasther-log-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const filteredLogs = filterLevel === "ALL"
        ? logs
        : logs.filter((l) => l.level === filterLevel);

    // =====================================================
    // RENDER
    // =====================================================
    return (
        <DashboardShell menus={sidebarMenus}>
            <div className="flex flex-col gap-4 h-[calc(100vh-120px)]">

                {/* ── Header Bar ── */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[#7B1113]">
                            <Terminal size={16} className="text-white" />
                        </div>
                        <div>
                            <h2 className="font-poppins text-base font-bold text-[#2F2F2F]">
                                Remote Terminal
                            </h2>
                            <p className="font-inter text-xs text-[#999]">
                                Monitor log & kirim command ke ESP32
                            </p>
                        </div>
                    </div>

                    {/* Status + actions */}
                    <div className="flex items-center gap-2">
                        {/* Connection badge */}
                        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium font-inter border ${
                            mqttConnected
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-red-50 text-red-600 border-red-200"
                        }`}>
                            {mqttConnected
                                ? <Wifi size={12} />
                                : <WifiOff size={12} />
                            }
                            {mqttConnected ? "Connected" : "Disconnected"}
                        </div>

                        {/* Filter */}
                        {(["ALL", "INFO", "WARN", "ERROR"] as const).map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setFilterLevel(lvl)}
                                className={`rounded-xl px-3 py-1.5 font-inter text-xs font-medium transition border ${
                                    filterLevel === lvl
                                        ? "bg-[#7B1113] text-white border-[#7B1113]"
                                        : "bg-white text-[#666] border-[#EAEAEA] hover:bg-[#F8F8F8]"
                                }`}
                            >
                                {lvl}
                            </button>
                        ))}

                        <button
                            onClick={exportLogs}
                            title="Export log"
                            className="flex items-center gap-1.5 rounded-xl border border-[#EAEAEA] bg-white px-3 py-1.5 font-inter text-xs text-[#666] transition hover:bg-[#F8F8F8]"
                        >
                            <Download size={12} />
                            Export
                        </button>

                        <button
                            onClick={clearLogs}
                            title="Bersihkan log"
                            className="flex items-center gap-1.5 rounded-xl border border-[#EAEAEA] bg-white px-3 py-1.5 font-inter text-xs text-[#666] transition hover:bg-[#F8F8F8]"
                        >
                            <Trash2 size={12} />
                            Clear
                        </button>
                    </div>
                </div>

                {/* ── Main Layout ── */}
                <div className="flex flex-1 gap-4 min-h-0">

                    {/* ── Log Panel (kiri) ── */}
                    <div className="flex flex-1 flex-col min-w-0 rounded-3xl border border-[#EAEAEA] bg-[#0F1117] overflow-hidden">

                        {/* Terminal header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="font-mono text-xs text-white/30 ml-2">
                                coasther/device/+/log — {filteredLogs.length} entries
                            </span>
                            <div className="ml-auto flex items-center gap-2">
                                <button
                                    onClick={() => setAutoScroll(!autoScroll)}
                                    className={`font-mono text-xs transition ${
                                        autoScroll ? "text-emerald-400" : "text-white/30"
                                    }`}
                                >
                                    {autoScroll ? "● auto-scroll ON" : "○ auto-scroll OFF"}
                                </button>
                            </div>
                        </div>

                        {/* Log entries */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-0.5 font-mono text-sm"
                            onWheel={() => setAutoScroll(false)}
                        >
                            {filteredLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full gap-3 opacity-30">
                                    <Terminal size={32} className="text-white" />
                                    <p className="text-white text-xs">
                                        Menunggu log dari ESP32...
                                    </p>
                                </div>
                            )}

                            {filteredLogs.map((log) => {
                                const style = LEVEL_STYLE[log.level];
                                return (
                                    <div
                                        key={log.id}
                                        className="flex items-start gap-3 py-0.5 group hover:bg-white/[0.02] rounded px-1"
                                    >
                                        {/* Timestamp */}
                                        <span className="text-white/25 text-xs shrink-0 mt-0.5 w-20">
                                            {formatTs(log.ts)}
                                        </span>

                                        {/* Level badge */}
                                        <span className={`text-xs font-bold shrink-0 w-12 mt-0.5 ${style.text}`}>
                                            {log.level}
                                        </span>

                                        {/* Source dot */}
                                        <div className="mt-1.5 shrink-0">
                                            <Circle
                                                size={6}
                                                className={log.source === "mqtt"
                                                    ? "fill-emerald-400 text-emerald-400"
                                                    : "fill-blue-400 text-blue-400"
                                                }
                                            />
                                        </div>

                                        {/* Message */}
                                        <span className={`flex-1 break-all leading-relaxed ${
                                            log.source === "system"
                                                ? "text-white/40 italic"
                                                : "text-white/80"
                                        }`}>
                                            {log.msg}
                                        </span>
                                    </div>
                                );
                            })}
                            <div ref={logEndRef} />
                        </div>

                        {/* ── Input Command ── */}
                        <div className="border-t border-white/5 p-3">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-emerald-400 shrink-0" />
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ketik command... (↑↓ untuk history)"
                                    disabled={sending}
                                    className="flex-1 bg-transparent font-mono text-sm text-white/80 placeholder:text-white/20 outline-none"
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                                <button
                                    type="submit"
                                    disabled={sending || !input.trim()}
                                    className="flex items-center gap-1.5 rounded-xl bg-[#7B1113] px-3 py-1.5 font-inter text-xs text-white transition hover:bg-[#9B1416] disabled:opacity-40"
                                >
                                    <Send size={11} />
                                    {sending ? "Kirim..." : "Kirim"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Command Panel (kanan) ── */}
                    <div className="w-64 shrink-0 flex flex-col gap-3">

                        {/* Quick Commands */}
                        <div className="rounded-3xl border border-[#EAEAEA] bg-white p-4 flex flex-col gap-3">
                            <p className="font-poppins text-sm font-semibold text-[#2F2F2F]">
                                Quick Commands
                            </p>
                            <div className="space-y-1.5">
                                {AVAILABLE_COMMANDS.map((c) => (
                                    <button
                                        key={c.cmd}
                                        onClick={() => sendCommand(c.cmd)}
                                        disabled={sending}
                                        title={c.desc}
                                        className={`w-full flex items-center justify-between rounded-2xl px-3 py-2.5 font-inter text-xs transition group disabled:opacity-50 ${
                                            c.danger
                                                ? "bg-red-50 text-red-700 hover:bg-red-100"
                                                : "bg-[#F8F8F8] text-[#444] hover:bg-[#F0F0F0]"
                                        }`}
                                    >
                                        <span className="font-medium">{c.label}</span>
                                        <span className={`font-mono text-[10px] opacity-50 group-hover:opacity-80 transition ${
                                            c.danger ? "text-red-500" : "text-[#999]"
                                        }`}>
                                            {c.cmd}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="rounded-3xl border border-[#EAEAEA] bg-white p-4 flex flex-col gap-2.5">
                            <p className="font-poppins text-sm font-semibold text-[#2F2F2F]">
                                Keterangan
                            </p>
                            <div className="space-y-2">
                                {(["INFO", "WARN", "ERROR"] as const).map((lvl) => (
                                    <div key={lvl} className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full shrink-0 ${LEVEL_STYLE[lvl].dot}`} />
                                        <span className="font-inter text-xs text-[#666]">{lvl}</span>
                                    </div>
                                ))}
                                <div className="border-t border-[#F0F0F0] pt-2 space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Circle size={6} className="fill-emerald-400 text-emerald-400 shrink-0" />
                                        <span className="font-inter text-xs text-[#666]">Log dari ESP32</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Circle size={6} className="fill-blue-400 text-blue-400 shrink-0" />
                                        <span className="font-inter text-xs text-[#666]">Log sistem</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* History */}
                        {history.length > 0 && (
                            <div className="rounded-3xl border border-[#EAEAEA] bg-white p-4 flex flex-col gap-2.5">
                                <p className="font-poppins text-sm font-semibold text-[#2F2F2F]">
                                    Riwayat Command
                                </p>
                                <div className="space-y-1">
                                    {history.slice(0, 8).map((h, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setInput(h); inputRef.current?.focus(); }}
                                            className="w-full text-left rounded-xl px-2.5 py-1.5 font-mono text-xs text-[#555] hover:bg-[#F8F8F8] transition"
                                        >
                                            {h}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
