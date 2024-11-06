import { Link } from "react-router-dom";

export default function TagBlock({ name} : { name: string }) {
    return (
        <Link to={`/tag/${name}`} className="flex">
            <span className="px-2 py-1 bg-[#1a1a1a] text-gray-300 text-sm rounded-md">#{name}</span>
        </Link>
    );
}