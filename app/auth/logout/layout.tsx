import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function LogOutLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex h-full w-full items-center justify-center py-16">
      <div className={clsx("w-full max-w-sm rounded-large px-8 py-8", { "bg-content1 shadow-small": false })}>
        {children}
      </div>
    </section>
  );
}
