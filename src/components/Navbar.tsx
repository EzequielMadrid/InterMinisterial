import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.actions";
import DesktopNavbar from "./navBar/DesktopNavbar";
import MobileNavbar from "./navBar/MobileNavbar";
// Supports weights 400-900
import "@fontsource-variable/orbitron";

async function Navbar() {
  const user = await currentUser();
  if (user) await syncUser(); // POST

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="md:text-3xl text-xl font-bold text-primary tracking-wider font-orbitron"
            >
              Interministerial
            </Link>
          </div>
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
