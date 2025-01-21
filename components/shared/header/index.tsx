import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Search from "./search";

// Define the type for menu items
type MenuItem = {
    href: string;
    name: string;
};

// Mock data (or ensure your actual data follows this structure)
import data from "@/lib/data"; // Ensure data.headerMenus follows the MenuItem[] type

export default function Header() {
    const headerMenus: MenuItem[] = data.headerMenus; // Explicitly typed

    return (
        <header className="bg-black text-white">
            <div className="px-4 py-3">
                {/* Flex container for horizontal alignment */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center font-extrabold text-2xl" aria-label="Home">
                        <Image
                            src="/icons/logo.svg"
                            width={40}
                            height={40}
                            alt={`${APP_NAME} logo`}
                            priority
                        />
                        <span className="ml-2">{APP_NAME}</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:block flex-1 max-w-lg mx-4">
                        <Search />
                    </div>

                    {/* Sign In and Cart Icons */}
                    <div className="flex items-center gap-4">
                        <Menu />
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden mt-2">
                    <Search />
                </div>

                {/* Category Menu */}
                <div className="flex items-center px-3 mt-3 bg-gray-800">
                    <Button
                        variant="ghost"
                        className="header-button flex items-center gap-1 text-base [&_svg]:size-6"
                        aria-label="Open Menu"
                    >
                        <MenuIcon />
                        All
                    </Button>
                    <div className="flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]">
                        {headerMenus.map((menu) => (
                            <Link
                                href={menu.href}
                                key={menu.href}
                                className="header-button !p-2"
                                aria-label={`Navigate to ${menu.name}`}
                            >
                                {menu.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
