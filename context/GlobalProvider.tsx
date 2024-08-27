import { getCurrentUser } from "@/lib/appwrite";
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

export const useGlobalContext = () => useContext(GlobalContext);
const GlobalContext = createContext<context>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  loading: false,
  setIsLoading: () => {},
});
type context = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  loading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
          router.replace("/home");
          // console.log(user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          loading,
          setIsLoading,
        } as context
      }
    >
      {children}
    </GlobalContext.Provider>
  );
};
