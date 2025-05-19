// src/pages/Thread/components/PostForm.jsx
export const PostForm = () => (
  <section className="bg-[#c75a5f] rounded-3xl p-6 shadow-lg max-w-4xl mx-auto w-full">
    <h2 className="text-2xl font-bold mb-4 text-white border-b border-red-300 pb-3">
      Post a Reply
    </h2>
    <form className="flex flex-col space-y-4">
      <label className="flex flex-col text-white font-semibold text-sm">
        Your Reply
        <textarea 
          className="mt-2 rounded-lg p-3 resize-y min-h-[120px] text-red-900" 
          placeholder="Write your reply here..." 
          required
        />
      </label>
      <button className="self-start bg-white text-[#bb3a44] font-semibold rounded-lg px-6 py-2 hover:bg-red-100 transition" type="submit">
        Submit Reply
      </button>
    </form>
  </section>
);