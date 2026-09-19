import { useAvailability } from "@/hooks/useAvailability";
import StatusResult from "./StatusResult";
import ErrorMessage from "./ErrorMessage";

export default function AvailabilityPanel({ member, date, onDateChange }) {
    const { result, loading, error } = useAvailability(member?.id ?? null, date);

    return (
        <section
            aria-labelledby="availability-title"
            className="glass rounded-2xl p-6"
        >
            <h2 id="availability-title" className="text-lg font-semibold text-white">
                Check availability
            </h2>

            {!member ? (
                <p className="mt-2 text-sm text-zinc-300">
                    Select a member to get started.
                </p>
            ) : (
                <>
                    <p className="mt-1 text-sm text-zinc-300">
                        <span className="font-medium text-white">{member.name}</span>
                        {" · "}
                        {member.role}
                    </p>

                    <label
                        htmlFor="availability-date"
                        className="mt-5 block text-sm font-medium text-zinc-200"
                    >
                        Date
                    </label>
                    <input
                        id="availability-date"
                        type="date"
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/20 bg-zinc-950/70 px-3 py-2 text-white [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    />

                    <div aria-live="polite" className="mt-4 min-h-[88px]">
                        {!date && (
                            <p className="text-sm text-zinc-300">
                                Pick a date to see availability.
                            </p>
                        )}
                        {loading && (
                            <div className="flex items-center gap-2 text-sm text-zinc-200">
                                <span
                                    aria-hidden="true"
                                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                                />
                                Checking…
                            </div>
                        )}
                        {error && <ErrorMessage message={error} />}
                        {result && <StatusResult result={result} />}
                    </div>
                </>
            )}
        </section>
    );
}
