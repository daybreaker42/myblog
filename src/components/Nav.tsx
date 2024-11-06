import { NavLink } from "react-router-dom";

export default function Nav() {
    const appName = process.env.REACT_APP_SITE_NAME;

    return (
        <nav className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <NavLink to="/" className="text-2xl font-bold text-amber-500">{appName}</NavLink>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-amber-500 hover:text-amber-500 transition-colors" : "hover:text-amber-500 transition-colors"}>홈</NavLink>
                    <NavLink to="/article" className={({ isActive }) => isActive ? "text-amber-500 hover:text-amber-500 transition-colors" : "hover:text-amber-500 transition-colors"}>글목록</NavLink>
                    <NavLink to="/category" className={({ isActive }) => isActive ? "text-amber-500 hover:text-amber-500 transition-colors" : "hover:text-amber-500 transition-colors"}>카테고리</NavLink>
                    <NavLink to="/tag" className={({ isActive }) => isActive ? "text-amber-500 hover:text-amber-500 transition-colors" : "hover:text-amber-500 transition-colors"}>태그</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "text-amber-500 hover:text-amber-500 transition-colors" : "hover:text-amber-500 transition-colors"}>소개</NavLink>
                    <button className="hover:text-amber-500 transition-colors flex items-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <NavLink to="/admin" className="text-amber-500 hover:text-amber-400 transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        Admin
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}