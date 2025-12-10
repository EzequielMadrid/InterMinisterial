import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import UnAuthenticatedSidebar from "./leftBar/UnAuthenticatedSidebar";
import SidebarAds from "./leftBar/SidebarAds";
import { LinkIcon, MapPinIcon } from "lucide-react";
import { getUserByClerkId } from "@/actions/user.actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

async function Sidebar() {
  const authUser = await currentUser();
  let sidebarContent;
  if (!authUser) {
    sidebarContent = <UnAuthenticatedSidebar />;
  } else {
    const user = await getUserByClerkId(authUser.id);
    if (!user) return null;
    sidebarContent = (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/perfil/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="w-20 h-20 border-2">
                <AvatarImage src={user.image || "/avatar.svg"} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.username}</p>
              </div>
            </Link>
            {user.bio && (
              <p className="mt-3 text-sm text-muted-foreground">{user.bio}</p>
            )}
            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-mono">{user._count.following}</p>
                  <p className="text-xs text-muted-foreground">Siguiendo</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-mono">{user._count.followers}</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="w-4 h-4 mr-2" />
                {user.location || "Sin ubicación"}
              </div>
              <div className="flex items-center text-muted-foreground">
                <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                {user.website ? (
                  <a
                    href={user.website}
                    className="hover:underline truncate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                ) : (
                  "Sin sitio web"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="sticky top-20 space-y-4">
      {sidebarContent}
      {/* Always visible below */}
      <SidebarAds />
    </div>
  );
}

export default Sidebar;
