// components/Logo.jsx
export const Logo = () => (
    <div className="flex items-center space-x-2">
        <img 
        alt="Folder icon representing RedArchive logo" 
        className="w-10 h-8" 
        src="/Logo.svg" 
        />
        <span className="font-extrabold italic text-white text-xl select-none sansation-font">
        RedArchive
        </span>
    </div>
);