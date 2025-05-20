export default function ArchiveSidebar() {
    return (
        <aside className="flex flex-col items-center md:items-start md:w-64 space-y-4">
        <img 
            alt="Generic user avatar silhouette" 
            className="w-40 h-40 rounded-sm" 
            src="https://storage.googleapis.com/a1aa/image/a39b73a4-c96b-459e-9061-3e74553ddc17.jpg" 
        />
        <h2 className="text-xl font-bold text-white">Account name</h2>
        <hr className="border-[#9a2f36] w-full" />
        </aside>
    );
}