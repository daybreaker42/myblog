import { Link } from "react-router-dom";

export default function PopularTagBlock({ name, count }: { name: string, count: number }) {
    return (
        <Link to={`/tag/${name}`} className="px-4 py-2 bg-[#111111] border border-amber-500/30 rounded-full text-amber-500 hover:border-amber-500 transition-colors">
            #{name} ({count})
        </Link>
    );
}