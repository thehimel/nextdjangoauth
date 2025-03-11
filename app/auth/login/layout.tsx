import React, { PropsWithChildren, Suspense } from "react";

import LoadingScreen from "@/modules/auth/components/loading-screen";

export default function LogInLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex h-full w-full items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-large bg-content1 px-8 py-8 shadow-small">
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </div>
    </section>
  );
}
