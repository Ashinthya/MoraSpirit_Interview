import MemberCard from "./MemberCard";

export default function MemberGrid({ members, selectedId, onSelect }) {
    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
                <li key={member.id}>
                    <MemberCard
                        member={member}
                        selected={member.id === selectedId}
                        onSelect={onSelect}
                    />
                </li>
            ))}
        </ul>
    );
}

export function MemberGridSkeleton() {
    return (
        <ul
            aria-busy="true"
            aria-label="Loading members"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
            {Array.from({ length: 6 }, (_, i) => (
                <li
                    key={i}
                    className="glass flex h-[228px] animate-pulse flex-col items-center rounded-2xl p-6"
                >
                    <span className="h-16 w-16 rounded-full bg-white/15" />
                    <span className="mt-4 h-4 w-28 rounded bg-white/15" />
                    <span className="mt-2 h-3 w-20 rounded bg-white/10" />
                    <span className="mt-5 h-8 w-full rounded-lg bg-white/10" />
                </li>
            ))}
        </ul>
    );
}
