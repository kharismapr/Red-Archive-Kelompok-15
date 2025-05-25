export default function ArchiveSidebar() {
    return (
        <aside className="flex flex-col items-center md:items-start md:w-64 space-y-4">
        <img 
            alt="Generic user avatar silhouette" 
            className="w-40 h-40 rounded-sm" 
            src={localStorage.getItem("profile_picture")} 
        />
        <h2 className="text-xl font-bold text-white">{localStorage.getItem("user")}</h2>
        <hr className="border-[#9a2f36] w-full" />
        </aside>
    );
}