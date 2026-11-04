"use client";

import * as React from "react";
import Modal from "../ui/modal";
import Button from "../ui/button";
import Spinner from "../ui/spinner";
import { cn } from "../lib/cn";
import { TOASTLY_EVENTS } from "./toastly";
import type { AlertEvent, ConfirmEvent, ToastEvent, ToastVariant, ToastlyPosition, ToastlyProviderProps } from "./types";

type StoredToast = ToastEvent & { id: string };

const ALIASES: Record<string, string> = {
    tl: "top-left", tc: "top-center", tr: "top-right",
    lc: "left-center", c: "center", rc: "right-center",
    bl: "bottom-left", bc: "bottom-center", br: "bottom-right"
};

const POSITION_CLASSES: Record<string, string> = {
    "top-left": "top-4 left-4 items-start",
    "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
    "top-right": "top-4 right-4 items-end",
    "left-center": "top-1/2 left-4 -translate-y-1/2 items-start",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center",
    "right-center": "top-1/2 right-4 -translate-y-1/2 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-4 right-4 items-end"
};

const VARIANT_STYLES: Record<ToastVariant, { border: string; icon: string }> = {
    info: { border: "border-border", icon: "text-foreground-muted" },
    success: { border: "border-primary/40", icon: "text-primary" },
    warning: { border: "border-amber-500/40", icon: "text-amber-500" },
    error: { border: "border-destructive/40", icon: "text-destructive" }
};

const ICON_PATHS: Record<ToastVariant, React.ReactNode> = {
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
    success: <><circle cx="12" cy="12" r="9" /><path d="m8.5 12.5 2.5 2.5 4.5-5" /></>,
    warning: <><path d="M10.3 4.2 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0Z" /><path d="M12 9.5v4M12 17h.01" /></>,
    error: <><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6M15 9l-6 6" /></>
};

function ToastCard({ toast, onDismiss, className, style }: { toast: StoredToast; onDismiss: (id: string) => void; className?: string; style?: React.CSSProperties }) {
    const variant = toast.variant ?? "info";
    const styles = VARIANT_STYLES[variant];

    return (
        <div
            data-supa-ui="toastly-toast"
            role={variant === "error" ? "alert" : "status"}
            style={{ animation: "sui-toast-in 220ms cubic-bezier(0.22,1,0.36,1)", ...style }}
            className={cn(
                "pointer-events-auto flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-lg border bg-popover p-3 text-sm text-foreground shadow-xl",
                styles.border,
                className
            )}
        >
            <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center", styles.icon)}>
                {toast.loading ? (
                    <Spinner size="sm" />
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("size-5")}>
                        {ICON_PATHS[variant]}
                    </svg>
                )}
            </span>

            <div className={cn("min-w-0 flex-1 break-words pt-px")}>{toast.message}</div>

            {toast.allowDismiss !== false && (
                <button
                    type="button"
                    aria-label="Dismiss"
                    onClick={() => onDismiss(toast.id)}
                    className={cn("-mr-1 -mt-0.5 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-accent hover:text-foreground")}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={cn("size-3.5")}>
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default function ToastlyProvider({
    children,
    position = "bottom-right",
    duration = 4000,
    maxVisible = 5
}: ToastlyProviderProps) {
    const [toasts, setToasts] = React.useState<StoredToast[]>([]);
    const [alertState, setAlertState] = React.useState<AlertEvent | null>(null);
    const [confirmState, setConfirmState] = React.useState<ConfirmEvent | null>(null);

    const ids = React.useRef(new Set<string>());
    const timers = React.useRef(new Map<string, number>());
    const durationRef = React.useRef(Number(duration));
    durationRef.current = Number(duration) || 4000;

    const dismiss = React.useCallback((id: string) => {
        ids.current.delete(id);
        const timer = timers.current.get(id);
        if (timer !== undefined) {
            window.clearTimeout(timer);
            timers.current.delete(id);
        }
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    React.useEffect(() => {
        const onAdd = (event: Event) => {
            const detail = (event as CustomEvent<StoredToast>).detail;
            if (!detail?.id || ids.current.has(detail.id)) return;
            ids.current.add(detail.id);
            setToasts((current) => [detail, ...current]);

            const auto = detail.autoDismiss ?? !detail.loading;
            const delay = detail.autoDismissIn ?? (auto ? durationRef.current : undefined);
            if (delay !== undefined && Number.isFinite(delay) && delay >= 0) {
                timers.current.set(detail.id, window.setTimeout(() => dismiss(detail.id), delay));
            }
        };
        const onDismiss = (event: Event) => dismiss((event as CustomEvent<{ id: string }>).detail.id);
        const onAlert = (event: Event) => setAlertState((event as CustomEvent<AlertEvent>).detail);
        const onConfirm = (event: Event) => setConfirmState((event as CustomEvent<ConfirmEvent>).detail);

        window.addEventListener(TOASTLY_EVENTS.add, onAdd);
        window.addEventListener(TOASTLY_EVENTS.dismiss, onDismiss);
        window.addEventListener(TOASTLY_EVENTS.alert, onAlert);
        window.addEventListener(TOASTLY_EVENTS.confirm, onConfirm);
        const activeTimers = timers.current;
        const activeIds = ids.current;
        return () => {
            window.removeEventListener(TOASTLY_EVENTS.add, onAdd);
            window.removeEventListener(TOASTLY_EVENTS.dismiss, onDismiss);
            window.removeEventListener(TOASTLY_EVENTS.alert, onAlert);
            window.removeEventListener(TOASTLY_EVENTS.confirm, onConfirm);
            activeTimers.forEach((timer) => window.clearTimeout(timer));
            activeTimers.clear();
            activeIds.clear();
        };
    }, [dismiss]);

    const closeAlert = () => {
        const current = alertState;
        setAlertState(null);
        current?.onClose?.();
    };

    const closeConfirm = (confirmed: boolean) => {
        const current = confirmState;
        setConfirmState(null);
        if (!current) return;
        if (confirmed) current.onConfirm?.();
        else current.onCancel?.();
        current.onClose?.();
    };

    const canonical = ALIASES[position as string] ?? (position as string);
    const stacked = toasts.filter((toast) => !toast.position).slice(0, maxVisible);
    const placed = toasts.filter((toast) => toast.position);

    return (
        <>
            {children}

            <div
                data-supa-ui="toastly-provider"
                aria-label="Notifications"
                className={cn(
                    "pointer-events-none fixed z-[80] flex flex-col gap-2",
                    POSITION_CLASSES[canonical] ?? POSITION_CLASSES["bottom-right"]
                )}
            >
                {stacked.map((toast) => (
                    <ToastCard key={toast.id} toast={toast} onDismiss={dismiss} />
                ))}
            </div>

            {placed.map((toast) => (
                <ToastCard
                    key={toast.id}
                    toast={toast}
                    onDismiss={dismiss}
                    className={cn("fixed z-[80]")}
                    style={{ left: Number(toast.position?.[0] ?? 0), top: Number(toast.position?.[1] ?? 0) }}
                />
            ))}

            <Modal
                open={alertState !== null}
                onClose={closeAlert}
                title={alertState?.title}
                size="sm"
                footer={<Button size="sm" onClick={closeAlert}>{alertState?.okLabel ?? "OK"}</Button>}
            >
                <div className={cn("text-sm text-foreground-lighter")}>{alertState?.message}</div>
            </Modal>

            <Modal
                open={confirmState !== null}
                onClose={() => closeConfirm(false)}
                title={confirmState?.title ?? "Confirm"}
                size="sm"
                footer={
                    <>
                        <Button size="sm" variant="outline" onClick={() => closeConfirm(false)}>
                            {confirmState?.cancelLabel ?? "Cancel"}
                        </Button>
                        <Button size="sm" variant={confirmState?.danger ? "danger" : "primary"} onClick={() => closeConfirm(true)}>
                            {confirmState?.confirmLabel ?? "Confirm"}
                        </Button>
                    </>
                }
            >
                <div className={cn("text-sm text-foreground-lighter")}>{confirmState?.message}</div>
            </Modal>
        </>
    );
}
