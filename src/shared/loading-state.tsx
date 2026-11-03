import Spinner from "../ui/spinner";
import { cn } from "../lib/cn";

export type LoadingStateProps = { label?: string; className?: string };

export default function LoadingState({ label = "Loading...", className = "" }: LoadingStateProps) {
    return (
        <div data-supa-ui="loading-state" className={cn("flex w-full flex-col items-center justify-center gap-3 py-16 text-sm text-foreground-muted", className)}>
            <Spinner size="lg" />
            <span>{label}</span>
        </div>
    );
}
