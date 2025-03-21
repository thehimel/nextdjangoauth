import React from "react";
import { Spinner } from "@heroui/spinner";

import { useAuthMessages } from "@/modules/auth/hooks/useAuthMessages";

interface LoadingScreenProps {
  message?: string; // The message to be displayed while loading
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  const authMessages = useAuthMessages();

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center gap-4 p-8">
        <Spinner color="current" size="lg" />
        <p className="text-center">{message || authMessages.general.loading}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
