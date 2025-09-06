import { ModeToggle } from "@/components/theme-toggle";
import React from "react";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-8 pb-4">
      <div className="text-right relative">
        <div className="absolute top-0 right-0">
          <ModeToggle></ModeToggle>
        </div>
      </div>
      <div>{children}</div>

      <Footer></Footer>
    </div>
  );
}
