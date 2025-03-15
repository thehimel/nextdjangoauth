import { ReactNode } from "react";

interface GradientHeaderProps {
  children: ReactNode;
}

const GradientHeader = ({ children }: GradientHeaderProps) => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="h-40 bg-gradient-to-br from-black/20 to-transparent dark:from-white/20 dark:to-transparent blur-3xl -z-10" />
      </div>
      {children}
    </div>
  );
};

export default GradientHeader;
