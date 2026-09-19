import { useEffect, useState } from "react";
import { getMembers } from "@/lib/api";

export function useMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        getMembers(controller.signal)
            .then((data) => setMembers(data.members ?? []))
            .catch((err) => {
                if (err.name !== "AbortError") setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [attempt]);

    function retry() {
        setError(null);
        setLoading(true);
        setAttempt((n) => n + 1);
    }

    return { members, loading, error, retry };
}
