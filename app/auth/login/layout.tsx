import { PropsWithChildren, Suspense } from "react";

import LoadingScreen from "@/modules/auth/components/loading-screen";

export default function SignInLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex pb-24 h-full w-full items-center justify-center">
      <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
    </section>
  );
}
