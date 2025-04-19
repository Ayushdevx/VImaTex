import React, { createContext, useContext, useState } from 'react';

// Mock user type to match what Clerk's useUser provides
interface MockUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  username: string;
  emailAddresses: { emailAddress: string }[];
  primaryEmailAddress: { emailAddress: string };
  imageUrl: string;
}

// Mock auth context type
interface MockAuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: MockUser | null;
  signIn: (email: string) => void;
  signOut: () => void;
}

// Create a mock context
const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

// Sample mock user
const mockUserData: MockUser = {
  id: "user_mock123456789",
  fullName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  emailAddresses: [{ emailAddress: "john.doe@example.com" }],
  primaryEmailAddress: { emailAddress: "john.doe@example.com" },
  imageUrl: "https://via.placeholder.com/150"
};

// Provider component
export const MockAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(true); // Default to signed in for testing
  const [user, setUser] = useState<MockUser | null>(mockUserData);

  const signIn = (email: string) => {
    setUser({
      ...mockUserData,
      primaryEmailAddress: { emailAddress: email },
      emailAddresses: [{ emailAddress: email }],
    });
    setIsSignedIn(true);
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  const value = {
    isLoaded: true,
    isSignedIn,
    user,
    signIn,
    signOut
  };

  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
};

// Custom hook to use the mock auth context
export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

// This will provide the same interface as Clerk's useUser hook
export const useUser = () => {
  const { isLoaded, isSignedIn, user } = useMockAuth();
  return { isLoaded, isSignedIn, user };
};

// Mock for useClerk hook
export const useClerk = () => {
  const { signIn, signOut } = useMockAuth();
  return {
    signIn: () => Promise.resolve(),
    signOut: () => {
      signOut();
      return Promise.resolve();
    }
  };
};

// Export a function to mock the ClerkProvider
export const MockClerkProvider: React.FC<{ 
  children: React.ReactNode, 
  publishableKey?: string
}> = ({ children }) => {
  return <MockAuthProvider>{children}</MockAuthProvider>;
}; 