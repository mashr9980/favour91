import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({ className, children, ...props }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;