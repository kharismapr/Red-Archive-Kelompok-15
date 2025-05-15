// components/Logo.jsx
export const Logo = () => (
    <div className="flex items-center space-x-2">
        <img 
        alt="Folder icon representing RedArchive logo" 
        className="w-8 h-6" 
        src="/Logo.svg" 
        />
        <span className="font-extrabold italic text-white text-lg select-none sansation-font">
        RedArchive
        </span>
    </div>
);