import { Link } from "react-router-dom";

export default function PopularTagBlock({ name, count }: { name: string, count: number }) {
    return (
        <Link to={`/tag/${name}`} className="px-4 py-2 bg-[#111111] border border-amber-500/30 rounded-full text-amber-500 hover:border-amber-500 transition-colors">
            #{name} ({count})
        </Link>
        // <Link to={`/tag/${name}`} className="flex">
        //     <span className="px-2 py-1 bg-[#1a1a1a] text-gray-300 text-sm rounded-md">#{name}</span>
        //     <span className="ml-2 text-gray-400 text-sm">{count}</span>
        // </Link>
    );
}