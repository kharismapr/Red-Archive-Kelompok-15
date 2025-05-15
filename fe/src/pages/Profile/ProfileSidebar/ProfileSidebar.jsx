// src/pages/Profile/ProfileSidebar/ProfileSidebar.jsx
import { UserInfo } from './UserInfo';
import { RecentPosts } from './RecentPosts';

export const ProfileSidebar = () => (
    <aside className="flex flex-col items-center md:items-start md:w-64 space-y-4">
        <UserInfo />
        <hr className="border-[#9a2f36] w-full"/>
        <button className="w-full bg-[#d1d5db] text-[#6b7280] font-semibold rounded-md py-2 cursor-default select-none" disabled>
        Archive
        </button>
        <hr className="border-[#9a2f36] w-full"/>
        <RecentPosts />
    </aside>
);