import type * as React from "react";
import type { AlertEvent, ConfirmEvent, ToastEvent, ToastInput, ToastVariant } from "./types";

export const TOASTLY_EVENTS = {
    add: "toastly:add-toast",
    dismiss: "toastly:dismiss-alert",
    alert: "toastly:alert",
    confirm: "toastly:confirm"
} as const;

let counter = 0;

const emit = (name: string, detail: unknown) => {
    if (typeof window === "undefined") return false;
    window.dispatchEvent(new CustomEvent(name, { detail }));
    return true;
};

const normalize = (input: ToastInput): ToastEvent =>
    typeof input === "string" ? { message: input } : input;

const add = (input: ToastInput): string => {
    const toast = normalize(input);
    const id = toast.id ?? `toastly-${Date.now()}-${++counter}`;
    emit(TOASTLY_EVENTS.add, { ...toast, id });
    return id;
};

const withVariant = (variant: ToastVariant) => (input: ToastInput) => add({ ...normalize(input), variant });

const dismiss = (id: string) => {
    emit(TOASTLY_EVENTS.dismiss, { id });
};

type PromiseMessages<T> = {
    loading: React.ReactNode;
    success: React.ReactNode | ((value: T) => React.ReactNode);
    error: React.ReactNode | ((error: unknown) => React.ReactNode);
};

export const toastly = {
    add,
    info: withVariant("info"),
    success: withVariant("success"),
    warning: withVariant("warning"),
    error: withVariant("error"),
    dismiss,

    promise<T>(promise: Promise<T>, messages: PromiseMessages<T>): Promise<T> {
        const id = add({ message: messages.loading, variant: "info", loading: true, autoDismiss: false });
        return promise.then(
            (value) => {
                dismiss(id);
                const message = typeof messages.success === "function" ? messages.success(value) : messages.success;
                add({ message, variant: "success" });
                return value;
            },
            (error) => {
                dismiss(id);
                const message = typeof messages.error === "function" ? messages.error(error) : messages.error;
                add({ message, variant: "error" });
                throw error;
            }
        );
    },

    alert(event: AlertEvent): Promise<void> {
        return new Promise((resolve) => {
            const sent = emit(TOASTLY_EVENTS.alert, {
                ...event,
                onClose: () => {
                    event.onClose?.();
                    resolve();
                }
            });
            if (!sent) resolve();
        });
    },

    confirm(event: ConfirmEvent): Promise<boolean> {
        return new Promise((resolve) => {
            let settled = false;
            const settle = (value: boolean) => {
                if (settled) return;
                settled = true;
                resolve(value);
            };
            const sent = emit(TOASTLY_EVENTS.confirm, {
                ...event,
                onConfirm: () => {
                    event.onConfirm?.();
                    settle(true);
                },
                onCancel: () => {
                    event.onCancel?.();
                    settle(false);
                },
                onClose: () => {
                    event.onClose?.();
                    settle(false);
                }
            });
            if (!sent) settle(false);
        });
    },

    to(x: number | `${number}`, y: number | `${number}`) {
        return {
            add: (input: ToastInput) => add({ ...normalize(input), position: [x, y] })
        };
    }
};
