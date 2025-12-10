"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  Trophy,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();
  // Automatically close menu when navigating
  // MobileMenu close callback
  const closeMenu = () => setShowMobileMenu(false);

  const perfilHref = user
    ? `/perfil/${
        user.username ?? user.primaryEmailAddress?.emailAddress.split("@")[0]
      }`
    : "#";

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/" onClick={closeMenu}>
                <HomeIcon className="w-4 h-4" />
                Foro
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/notificaciones" onClick={closeMenu}>
                    <BellIcon className="w-4 h-4" />
                    Notificaciones
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href="/estadisticas" onClick={closeMenu}>
                    <Trophy className="w-4 h-4" />
                    Estadísticas
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={perfilHref} onClick={closeMenu}>
                    <UserIcon className="w-4 h-4" />
                    Perfil
                  </Link>
                </Button>

                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start w-full"
                    onClick={closeMenu}
                  >
                    <LogOutIcon className="w-4 h-4" />
                    Cerrar sesión
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={closeMenu}
                >
                  Iniciar sesión
                </Button>
              </SignInButton>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
