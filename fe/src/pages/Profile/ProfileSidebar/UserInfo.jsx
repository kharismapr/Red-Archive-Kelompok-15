// src/pages/Profile/ProfileSidebar/UserInfo.jsx
export function UserInfo() {
    return (
        <div className="flex flex-col items-center space-y-2">
            <img 
            alt="User avatar" 
            className="w-40 h-40 rounded-sm" 
            src={localStorage.getItem('profile_picture')} 
            />
            <h2 className="text-xl font-bold text-white select-text">{localStorage.getItem('user')}</h2>
            <p className="text-white text-base select-text">Joined at</p>
            <p className="text-white text-base select-text">{localStorage.getItem('join_date')}</p>
        </div>
    );
};