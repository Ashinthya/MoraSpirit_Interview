"use client";
import { useRef, useState } from "react";
import { useMembers } from "@/hooks/useMembers";
import MemberGrid, { MemberGridSkeleton } from "./MemberGrid";
import AvailabilityPanel from "./AvailabilityPanel";
import ErrorMessage from "./ErrorMessage";

export default function Dashboard() {
    const { members, loading, error, retry } = useMembers();
    const [selectedId, setSelectedId] = useState(null);
    const [date, setDate] = useState("");

    const selectedMember = members.find((m) => m.id === selectedId) ?? null;

    const panelRef = useRef(null);

    function handleSelect(id) {
        setSelectedId(id);

        const isMobile = window.matchMedia("(max-width: 1023px)").matches;
        if (!isMobile) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        panelRef.current?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
        });
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgb(0_0_0/0.8)]">
                    Member Availability
                </h1>
                <p className="mt-2 text-zinc-200 drop-shadow-[0_1px_6px_rgb(0_0_0/0.8)]">
                    Select a member and a date to check whether they are available.
                </p>
            </header>

            <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8">
                <div className="order-2 lg:order-1">
                    {loading && <MemberGridSkeleton />}

                    {!loading && error && (
                        <ErrorMessage message={error} onRetry={retry} />
                    )}

                    {!loading && !error && members.length === 0 && (
                        <p className="glass rounded-2xl p-6 text-center text-zinc-300">
                            No members found.
                        </p>
                    )}

                    {!loading && !error && members.length > 0 && (
                        <MemberGrid
                            members={members}
                            selectedId={selectedId}
                            onSelect={handleSelect}
                        />
                    )}
                </div>

                <div ref={panelRef} className="order-1 scroll-mt-4 lg:sticky lg:top-6 lg:order-2">
                    <AvailabilityPanel
                        member={selectedMember}
                        date={date}
                        onDateChange={setDate}
                    />
                </div>
            </div>
        </div>
    );
}
