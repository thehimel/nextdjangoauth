import React, { PropsWithChildren, Suspense } from "react";

import LoadingScreen from "@/modules/auth/components/loading-screen";

export default function SignInLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex pb-24 h-full w-full items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-8 shadow-small">
          <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
        </div>
      </div>
    </section>
  );
}
