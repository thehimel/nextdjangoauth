import React from "react";
import { Spinner } from "@heroui/spinner";

import { AuthMessages } from "@/modules/auth/messages";

interface LoadingScreenProps {
  message?: string; // The message to be displayed while loading
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = AuthMessages.LOADING }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center gap-4 p-8">
        <Spinner color="primary" size="lg" />
        <p className="text-center">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
