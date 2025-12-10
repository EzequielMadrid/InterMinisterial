import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import { BellIcon, HomeIcon, Trophy, UserIcon } from "lucide-react";

async function DesktopNavbar() {
  const user = await currentUser();
  console.log("Current user in DesktopNavbar:", user);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />
      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Foro</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notificaciones">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notificaciones</span>
            </Link>
          </Button>
          {/* TODO: create an api for this section */}
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/estadisticas">
              <Trophy className="w-4 h-4" />
              <span className="hidden lg:inline">Estadísticas</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/perfil/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Perfil</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Iniciar Sesión</Button>
        </SignInButton>
      )}
    </div>
  );
}
export default DesktopNavbar;
