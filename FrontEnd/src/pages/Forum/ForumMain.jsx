// src/pages/Forum/ForumMain.jsx
import { ForumTable } from './ForumTable';

export const ForumMain = () => (
    <section className="flex-1 bg-[#c75a5f] rounded-3xl p-6 overflow-y-auto max-h-[calc(100vh-96px)] shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-white border-b border-red-300 pb-3">
        Forums
        </h1>
        <ForumTable />
    </section>
);