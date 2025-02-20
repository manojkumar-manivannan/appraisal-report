import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/ReactToastify.min.css";
export const metadata = {
    title: "Myreaa",
    description: "An AI powered real estate platform",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                    <ToastContainer theme="colored" />
                </Suspense>
            </body>
        </html>
    );
}
