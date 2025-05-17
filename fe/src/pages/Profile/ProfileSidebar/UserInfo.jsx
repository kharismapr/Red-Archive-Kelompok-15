// src/pages/Profile/ProfileSidebar/UserInfo.jsx
export const UserInfo = () => (
    <div className="flex flex-col items-center space-y-2">
        <img 
        alt="User avatar" 
        className="w-40 h-40 rounded-sm" 
        src="https://storage.googleapis.com/a1aa/image/a39b73a4-c96b-459e-9061-3e74553ddc17.jpg" 
        />
        <h2 className="text-xl font-bold text-white select-text">Account name</h2>
        <p className="text-white text-base select-text">join date</p>
    </div>
);