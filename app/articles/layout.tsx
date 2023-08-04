import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="px-4 pt-8 pb-4">
        { children }
    </div>
}