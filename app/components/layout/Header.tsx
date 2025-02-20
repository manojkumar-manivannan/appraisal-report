"use client";

import { useStore } from "@/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon, UserIcon } from "@heroicons/react/16/solid";
import { signOut } from "next-auth/react";
import { FC } from "react";
import MenuOption from "../ui/MenuOption";

const Header: FC = () => {
    const { toggleSidebar } = useStore();
    return (
        <div className="text-md sticky top-0 z-10 flex min-h-10 w-full flex-row items-center justify-between bg-white px-10 py-1 shadow-lg">
            <Bars3Icon
                className="h-5 w-5 hover:text-sky-500"
                onClick={toggleSidebar}
            />
            <Menu>
                <MenuButton className="group inline-flex rounded-full p-2">
                    <UserIcon className="h-5 w-5 hover:text-sky-500" />
                </MenuButton>
                <MenuItems
                    anchor="bottom end"
                    className="absolute z-10 origin-bottom-left rounded-xl border border-sky-500 bg-white text-sky-500 transition duration-100 ease-out group-hover:visible"
                >
                    <MenuItem>
                        <MenuOption
                            title="Logout"
                            onClick={() => {
                                signOut({
                                    callbackUrl: "/sign-in",
                                });
                            }}
                        />
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
};

export default Header;
