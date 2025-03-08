import { PropsWithChildren } from "react";

export default function SingOutLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex pt-16 pb-24 h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-10 shadow-small">
        {children}
      </div>
    </section>
  );
}
