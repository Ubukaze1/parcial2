import React from "react";
export default function MainLayout({
    content,
}: {
    content: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            {/* Main Content */}
            <main className="flex-1 p-6">
                {content}
            </main>
        </div>
    );
}