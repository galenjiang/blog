import { ModeToggle } from "@/components/theme-toggle";
import React from "react";
import Footer from "../../components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-8 pb-4">
      <div>{children}</div>
    </div>
  );
}
