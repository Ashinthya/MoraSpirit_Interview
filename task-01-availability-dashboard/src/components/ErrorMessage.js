export default function ErrorMessage({ message, onRetry }) {
    return (
        <div
            role="alert"
            className="rounded-xl border border-rose-300/50 bg-rose-500/25 p-6 text-center backdrop-blur-sm"
        >
            <p className="font-semibold text-rose-100">Something went wrong</p>
            <p className="mt-1 text-sm text-rose-50/80">{message}</p>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 rounded-lg border border-rose-200/40 bg-rose-300/15 px-4 py-2 text-sm font-semibold text-rose-50 transition hover:bg-rose-300/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c]"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
