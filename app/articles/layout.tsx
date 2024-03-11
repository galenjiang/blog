import { ModeToggle } from "@/components/theme-toggle";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="px-4 pt-8 pb-4">
        <div className="text-right"><ModeToggle></ModeToggle></div>
        <div>
            {children}
        </div>
    </div>
}