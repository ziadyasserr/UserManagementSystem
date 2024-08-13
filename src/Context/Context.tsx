import { jwtDecode } from 'jwt-decode';
import  { createContext, useEffect, useState, ReactNode } from 'react';

interface UserData {
  // Define the structure based on your JWT token's payload
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

interface AuthContextType {
  userData: UserData | null;
  saveUserData: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveUserData = () => {
    const encodeToken = localStorage.getItem('userToken');
    if (encodeToken) {
      const decodeToken = jwtDecode<UserData>(encodeToken);
      setUserData(decodeToken);
    }
  };

  useEffect(() => {
    saveUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
