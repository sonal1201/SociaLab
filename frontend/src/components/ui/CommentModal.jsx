import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const CommentModal = ({ postId, comments, closeModal }) => {
  const [text, setText] = useState("");

  const token = localStorage.getItem("accessToken");

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(
        `http://localhost:3001/api/v1/user/posts/${postId}/create-comments`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Comment added");
      setText("");
      closeModal();
      window.location.reload(); 
    } catch (error) {
      toast.error("Cannot add comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-xl w-96">
        <h2 className="font-bold text-lg mb-3">Comments</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto mb-3">
          {comments.map((c) => (
            <div key={c.id} className="border p-2 rounded">
              <p className="text-sm font-semibold">@{c.user.profile.username}</p>
              <p className="text-gray-600">{c.text}</p>
            </div>
          ))}
        </div>

    
        <textarea
          className="w-full border rounded p-2"
          placeholder="Write a comment..."
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={closeModal}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={addComment}
            className="bg-[#36572c] text-white px-3 py-1 rounded"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
