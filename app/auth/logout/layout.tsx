import { PropsWithChildren } from "react";

export default function LogOutLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex h-full w-full items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-large bg-content1 py-10 px-8 shadow-small">
        {children}
      </div>
    </section>
  );
}
