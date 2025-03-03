import React from "react";
import { z } from "zod";

import { authMessages } from "@/modules/auth/messages";

export const handleEmailBlur = (email: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
  const errorMessage = authMessages.EMAIL_VALIDATION_ERROR;

  try {
    const emailValidator = z.string().email(errorMessage);

    emailValidator.parse(email); // This will throw an error if the email is invalid
  } catch (err) {
    if (err instanceof z.ZodError) {
      setError(errorMessage);
    }
  }
};
