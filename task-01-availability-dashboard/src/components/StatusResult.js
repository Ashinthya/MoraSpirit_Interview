export default function StatusResult({ result }) {
    const available = result.status === "available";

    return (
        <div
            className={`rounded-xl border p-4 backdrop-blur-sm ${available
                ? "border-emerald-300/50 bg-emerald-500/20"
                : "border-rose-300/50 bg-rose-500/25"
                }`}
        >
            <div className="flex items-center gap-2">
                <span
                    aria-hidden="true"
                    className={`text-sm font-bold ${available ? "text-emerald-300" : "text-rose-300"
                        }`}
                >
                    {available ? "✓" : "✕"}
                </span>
                <p
                    className={`font-semibold ${available ? "text-emerald-100" : "text-rose-100"
                        }`}
                >
                    {available ? "Available" : "Busy"}
                </p>
            </div>
            <p
                className={`mt-2 text-sm ${available ? "text-emerald-50/80" : "text-rose-50/80"
                    }`}
            >
                {result.reason}
            </p>
        </div>
    );
}
