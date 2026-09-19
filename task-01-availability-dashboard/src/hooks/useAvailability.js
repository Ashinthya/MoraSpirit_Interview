import { useEffect, useState } from "react";
import { checkAvailability } from "@/lib/api";

export function useAvailability(memberId, date) {
    const key = memberId && date ? `${memberId}|${date}` : null;

    const [state, setState] = useState({ key: null, result: null, error: null });

    useEffect(() => {
        if (!key) return;

        const controller = new AbortController();

        checkAvailability(memberId, date, controller.signal)
            .then((result) => setState({ key, result, error: null }))
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setState({ key, result: null, error: err.message });
                }
            });

        return () => controller.abort();
    }, [key, memberId, date]);

    const settled = key !== null && state.key === key;

    return {
        result: settled ? state.result : null,
        error: settled ? state.error : null,
        loading: key !== null && !settled,
    };
}
