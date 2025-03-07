"use client";

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/modules/global/config/site";
import { title, subtitle } from "@/modules/theme/primitives";
import { GithubIcon } from "@/modules/global/components/icons";
import { VantaBackground } from "@/modules/global/components/VantaBackground";

export default function Home() {
  return (
    <>
      <VantaBackground />

      <section className="relative z-10 flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Add&nbsp;</span>
          <span className={title({ color: "violet" })}>authentication&nbsp;</span>
          <br />
          <span className={title()}>seamlessly, regardless of your experience.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Authentication simplified with <span className="text-blue-500">Next.js</span> and{" "}
            <span className="text-green-500">Django</span>.
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
          <Link
            isExternal
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href={siteConfig.links.github}
          >
            <GithubIcon size={20} />
            GitHub
          </Link>
        </div>

        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing <Code color="primary">app/page.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </>
  );
}
