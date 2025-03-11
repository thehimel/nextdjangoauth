import clsx from "clsx";
import React, { PropsWithChildren, Suspense } from "react";

import LoadingScreen from "@/modules/auth/components/loading-screen";

export default function LogInLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex h-full w-full items-center justify-center py-16">
      <div className={clsx("w-full max-w-sm rounded-large px-8 py-8", { "bg-content1 shadow-small": false })}>
        <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
      </div>
    </section>
  );
}
