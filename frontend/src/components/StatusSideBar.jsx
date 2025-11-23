import React, { useEffect, useState } from "react";
import axios from "axios";
import { Highlighter } from "./ui/highlighter";
import { getUserData } from "@/context/userContext";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ArrowLeft, ArrowLeftCircle, ArrowRight } from "lucide-react";

const StatusSideBar = () => {
  const { user } = getUserData();
  const [storyFeed, setStoryFeed] = useState([]);
  const [myStory, setMyStory] = useState(null);
  const [activeStory, setActiveStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Add Status modal state
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");

  const fetchStories = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/get-stories/feed`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const myStories = res.data.stories.find(
        (item) => item.user.id === user.id
      );

      setMyStory(myStories || null);
      setStoryFeed(res.data.stories || []);
    } catch (error) {
      console.log("Story Feed Error:", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // ALL STORIES
  const allStories = myStory
    ? [myStory, ...storyFeed.filter((item) => item.user.id !== user.id)]
    : storyFeed;

  const activeUserIndex = activeStory
    ? allStories.findIndex((s) => s.user.id === activeStory.user.id)
    : -1;

  const goPrev = () => {
    if (!activeStory) return;

    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((i) => i - 1);
      return;
    }

    if (activeUserIndex > 0) {
      const prev = allStories[activeUserIndex - 1];
      setActiveStory(prev);
      setCurrentStoryIndex(prev.stories.length - 1);
    }
  };

  const goNext = () => {
    if (!activeStory) return;

    if (currentStoryIndex < activeStory.stories.length - 1) {
      setCurrentStoryIndex((i) => i + 1);
      return;
    }

    if (activeUserIndex < allStories.length - 1) {
      const next = allStories[activeUserIndex + 1];
      setActiveStory(next);
      setCurrentStoryIndex(0);
    }
  };

  // UPLOAD STORY
  const uploadStory = async () => {
    if (!selectedImage) return toast.message("Please Add Story");
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();

    formData.append("storyImage", selectedImage);
    formData.append("caption", caption);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/stories`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setOpenAddModal(false);
      setSelectedImage(null);
      setCaption("");
      fetchStories();
      toast.message("Story Add Successfully");
    } catch (error) {
      console.log("Story Upload Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="text-black">
      <h2 className="text-xl text-white font-bold mb-6">
        <Highlighter action="highlight" color="#36572c" padding={12}>
          Socialogy
        </Highlighter>
      </h2>

      {/* My Story */}
      <div className="mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-xl cursor-pointer">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#36572c]">
                <img
                  src={user?.profile?.profileImageUrl || "/default-avatar.png"}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 font-bold">My Story</p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-40">
            <DropdownMenuItem
              onClick={() => {
                if (!myStory) return;
                setActiveStory(myStory);
                setCurrentStoryIndex(0);
              }}
            >
              View Status
            </DropdownMenuItem>

            {/* OPEN ADD STORY MODAL */}
            <DropdownMenuItem onClick={() => setOpenAddModal(true)}>
              Add Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full border-t border-gray-300 my-2" />

      {/* OTHER USERS */}
      <div className="space-y-2 overflow-y-auto max-h-[80vh] pr-1">
        {storyFeed
          .filter((item) => item.user.id !== user.id)
          .map((item) => (
            <div
              key={item.user.id}
              onClick={() => {
                setActiveStory(item);
                setCurrentStoryIndex(0);
              }}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-xl cursor-pointer"
            >
              <img
                src={item.user.profile.profileImageUrl}
                className="w-11 h-11 rounded-full"
              />
              <p className="text-gray-600 font-medium">
                @{item.user.profile.username}
              </p>
            </div>
          ))}
      </div>

      {/* STORY VIEWER */}
      {activeStory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[999]">
          <div className="bg-white w-[90%] max-w-md rounded-2xl p-4 shadow-xl relative">
            <button
              className="absolute top-3 right-3 cursor-pointer bg-gray-200 hover:bg-red-300 p-1 w-8 h-8 rounded-full"
              onClick={() => setActiveStory(null)}
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                src={
                  activeStory.user.profile.profileImageUrl ||
                  "/default-avatar.png"
                }
                className="w-10 h-10 rounded-full"
              />
              <p className="font-semibold text-gray-800">
                @{activeStory.user.profile.username}
              </p>
            </div>

            <div className="relative w-full rounded-xl overflow-hidden">
              <img
                src={activeStory.stories[currentStoryIndex]?.image}
                className="w-full max-h-[70vh] object-cover"
              />

              {(activeUserIndex > 0 || currentStoryIndex > 0) && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 
                   bg-black/50 text-white px-3 cursor-pointer py-1 rounded-full z-20"
                  onClick={goPrev}
                >
                  <ArrowLeft size={18}/>
                </button>
              )}

              {(activeUserIndex < allStories.length - 1 ||
                currentStoryIndex < activeStory.stories.length - 1) && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 
                   bg-black/50 text-white px-3 py-1 cursor-pointer rounded-full z-20"
                  onClick={goNext}
                >
                  <ArrowRight size={18}/>
                  
                </button>
              )}
            </div>

            {activeStory.stories[currentStoryIndex]?.caption && (
              <p className="mt-3 text-gray-700 text-sm">
                {activeStory.stories[currentStoryIndex]?.caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ADD STORY MODAL */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000]">
          <div className="bg-white w-[90%] max-w-md p-4 rounded-2xl relative">
            <button
              className="absolute top-3 right-3 bg-gray-200 cursor-pointer hover:bg-red-200 w-8 p-1 rounded-full"
              onClick={() => setOpenAddModal(false)}
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-3">Add Status</h2>

            <label
              className="border-2 border-dashed border-green-700 rounded-xl 
        flex flex-col items-center justify-center gap-2
        w-full h-40 cursor-pointer bg-green-50/40 
        hover:bg-green-50 transition"
            >
              {!selectedImage ? (
                <>
                  <div className="text-3xl text-green-800 font-bold">+</div>
                  <p className="text-green-900 font-medium">Add Story Image</p>
                </>
              ) : (
                <>
                  <div className="text-3xl text-green-800 font-bold">+</div>
                  <p className="text-green-900 font-medium">
                    Add Different Story Image
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>

            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                className="w-full h-64 object-scale-down rounded-lg mb-3"
              />
            )}

            <textarea
              className="w-full border rounded-lg p-2 mb-3"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <button
              className={`w-full py-2 rounded-lg flex items-center cursor-pointer justify-center gap-2 
    ${loading ? "bg-green-900 cursor-not-allowed" : "bg-[#36572c] hover:bg-green-800"} 
    text-white transition`}
              onClick={uploadStory}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </>
              ) : (
                "Upload Status"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSideBar;
