import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const accessToken = localStorage.getItem("accessToken");

  // Fetch USER
  const fetchUser = async () => {
    if (!accessToken) return;

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const getUserData = () => useContext(UserContext);
