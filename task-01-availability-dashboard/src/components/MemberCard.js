function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

export default function MemberCard({ member, selected, onSelect }) {
    return (
        <button
            type="button"
            onClick={() => onSelect(member.id)}
            aria-pressed={selected}
            className={`glass flex h-full w-full flex-col items-center rounded-2xl p-6 text-center transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0c] ${selected ? "glass-active" : "glass-hover hover:-translate-y-0.5"
                }`}
        >
            <span
                aria-hidden="true"
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border text-base font-bold shadow-[inset_0_1px_0_0_rgb(255_255_255/0.28)] transition ${selected
                    ? "border-white/60 bg-white/25 text-white"
                    : "border-white/20 bg-zinc-900/70 text-zinc-100"
                    }`}
            >
                {getInitials(member.name)}
            </span>

            <span className="mt-4 w-full min-w-0">
                <span className="block truncate text-base font-semibold text-white">
                    {member.name}
                </span>
                <span className="mt-1 block truncate text-sm text-zinc-300">
                    {member.role}
                </span>
            </span>

            <span
                aria-hidden="true"
                className={`mt-5 block w-full rounded-lg border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition ${selected
                    ? "border-white/60 bg-white/20 text-white"
                    : "border-white/20 text-zinc-300"
                    }`}
            >
                {selected ? "Selected" : "Select"}
            </span>
        </button>
    );
}
