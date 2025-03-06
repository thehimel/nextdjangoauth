"use client";

import React from "react";
import { Button, Input, Link, Divider, ResizablePanel, Form } from "@heroui/react";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function Component() {
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [currentStep, setCurrentStep] = React.useState<"email" | "verification">("email");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isVerificationCodeValid, setIsVerificationCodeValid] = React.useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep === "email") {
      if (!email.length) {
        setIsEmailValid(false);
        return;
      }
      setIsEmailValid(true);
      setCurrentStep("verification");
    } else if (currentStep === "verification") {
      if (!verificationCode.length) {
        setIsVerificationCodeValid(false);
        return;
      }
      setIsVerificationCodeValid(true);
      console.log(`Email: ${email}, Verification Code: ${verificationCode}`);
      // Handle final form submission logic or API call here
    }
  };

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 10 },
  };

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <ResizablePanel>
          <h1 className="mb-4 text-xl font-medium">Sign In</h1>
          <AnimatePresence initial={false} mode="popLayout">
            <LazyMotion features={domAnimation}>
              {isFormVisible ? (
                <m.div
                  animate="visible"
                  className="flex flex-col gap-y-3"
                  exit="hidden"
                  initial="hidden"
                  variants={variants}
                >
                  <Form validationBehavior="native" onSubmit={handleSubmit}>
                    {currentStep === "email" && (
                      <Input
                        isRequired
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        validationState={isEmailValid ? "valid" : "invalid"}
                        onValueChange={(value) => {
                          setEmail(value);
                          setIsEmailValid(true);
                        }}
                        variant="bordered"
                      />
                    )}
                    {currentStep === "verification" && (
                      <Input
                        isRequired
                        label="Verification Code"
                        name="verificationCode"
                        type="text"
                        validationState={isVerificationCodeValid ? "valid" : "invalid"}
                        value={verificationCode}
                        variant="bordered"
                        onValueChange={(value) => {
                          setVerificationCode(value);
                          setIsVerificationCodeValid(true);
                        }}
                      />
                    )}
                    <Button className="w-full" color="primary" type="submit">
                      {currentStep === "email" ? "Next" : "Continue"}
                    </Button>
                  </Form>
                  {currentStep === "email" && (
                    <>
                      {orDivider}
                      <Button
                        fullWidth
                        startContent={<Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />}
                        variant="flat"
                        onPress={() => setIsFormVisible(false)}
                      >
                        Other Login options
                      </Button>
                    </>
                  )}
                </m.div>
              ) : (
                <>
                  <Button
                    fullWidth
                    color="primary"
                    startContent={<Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />}
                    type="button"
                    onPress={() => setIsFormVisible(true)}
                  >
                    Continue with Email
                  </Button>
                  {orDivider}
                  <m.div
                    animate="visible"
                    className="flex flex-col gap-y-2"
                    exit="hidden"
                    initial="hidden"
                    variants={variants}
                  >
                    <div className="flex flex-col gap-2">
                      <Button
                        fullWidth
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                        variant="flat"
                      >
                        Continue with Google
                      </Button>
                      <Button
                        fullWidth
                        startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                        variant="flat"
                      >
                        Continue with Github
                      </Button>
                    </div>
                    <p className="mt-3 text-center text-small">
                      By signing in, you agree to our Terms and Privacy Policy.
                    </p>
                  </m.div>
                </>
              )}
            </LazyMotion>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </div>
  );
}
