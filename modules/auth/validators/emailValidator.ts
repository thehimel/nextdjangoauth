import React from "react";
import { z } from "zod";

export const handleEmailBlur = (email: string, setError: React.Dispatch<React.SetStateAction<string>>, errorMessage: string) => {
  try {
    const emailValidator = z.string().email(errorMessage);

    emailValidator.parse(email); // This will throw an error if the email is invalid
  } catch (err) {
    if (err instanceof z.ZodError) {
      setError(errorMessage);
    }
  }
};
