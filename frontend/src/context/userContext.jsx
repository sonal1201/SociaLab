import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Run every time accessToken changes
  useEffect(() => {
    fetchUser();
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUser, setAccessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const getUserData = () => useContext(UserContext);
