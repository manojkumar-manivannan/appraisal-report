"use client";
import { useStore } from "@/hooks";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface Props {
  title: string;
  path: string;
  Icon: React.ReactNode;
}
const SideBarItem: FC<Props> = ({ title, path, Icon }) => {
  const pathname = usePathname();
  const { sidebarOpen } = useStore();
  const isActive = pathname === path.split("?")[0];
  return (
    <Link
      href={path}
      className={cn(
        "align-center flex h-10 w-full flex-row items-center justify-start gap-2 rounded-md p-1 text-black transition-all hover:bg-sky-200 hover:bg-opacity-50 hover:text-sky-500",
        isActive && "bg-sky-200 bg-opacity-50 text-sky-500",
      )}
    >
      <div>{Icon}</div>
      {sidebarOpen && <div>{title}</div>}
    </Link>
  );
};

export default SideBarItem;
