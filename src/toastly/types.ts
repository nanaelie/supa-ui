import type * as React from "react";

export type ToastVariant = "info" | "success" | "warning" | "error";

export type ToastlyPosition =
    | "top-left" | "top-center" | "top-right"
    | "left-center" | "center" | "right-center"
    | "bottom-left" | "bottom-center" | "bottom-right"
    | "tl" | "tc" | "tr"
    | "lc" | "c" | "rc"
    | "bl" | "bc" | "br";

export type ToastEvent = {
    id?: string;
    message: React.ReactNode;
    variant?: ToastVariant;
    allowDismiss?: boolean;
    autoDismiss?: boolean;
    autoDismissIn?: number;
    loading?: boolean;
    position?: [x?: number | `${number}`, y?: number | `${number}`];
};

export type AlertEvent = {
    title?: string;
    message?: React.ReactNode;
    okLabel?: string;
    onClose?: () => void;
};

export type ConfirmEvent = {
    title?: string;
    message?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
};

export type ToastlyProviderProps = {
    children?: React.ReactNode;
    position?: ToastlyPosition;
    duration?: number | `${number}`;
    maxVisible?: number;
};

export type ToastInput = string | ToastEvent;
