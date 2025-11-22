import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import CommentModal from "./CommentModal";

const CommentButton = ({ postId, comments }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm cursor-pointer"
      >
        <MessageCircle size={20} className="text-gray-600" />
        <span>{comments.length}</span>
      </button>

      {open && (
        <CommentModal
          postId={postId}
          comments={comments}
          closeModal={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CommentButton;
