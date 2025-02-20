"use client";
import { useStore } from "@/hooks";
import { cn } from "@/utils";
import React from "react";
import { AcademicCapIcon, HomeIcon } from "@heroicons/react/16/solid";
import SideBarItem from "@/app/components/layout/SideBarItem";
interface MenuItem {
    title: string;
    path: string;
    icon: React.ReactNode;
}
const menuItems: MenuItem[] = [
    {
        title: "Appraisal",
        path: "/appraisal",
        icon: <AcademicCapIcon className="h-6 w-6" />,
    },
    {
        title: "Api Docs",
        path: "/api-docs",
        icon: <HomeIcon className="h-6 w-6" />,
    },
];

const SideBar = () => {
    const { sidebarOpen } = useStore();
    return (
        <div
            className={cn(
                "flex flex-col gap-2 bg-white p-4 text-gray-200 shadow-md transition-all duration-300",
                sidebarOpen ? "w-36" : "w-16"
            )}
        >
            {menuItems.map((item) => (
                <SideBarItem
                    key={item.path}
                    title={item.title}
                    path={item.path}
                    Icon={item.icon}
                />
            ))}
        </div>
    );
};

export default SideBar;
