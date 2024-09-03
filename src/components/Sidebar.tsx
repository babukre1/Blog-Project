import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

import { Playlist } from "@/hooks/data/playlists";
import Link from "next/link";
import { Signout } from "./NavItems";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            <Link
              className={buttonVariants({
                variant: "ghost",
              })}
              href="/dashboard"
            >
              Overview
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Posts
          </h2>
          <div className="space-y-1">
            <Link
              className={buttonVariants({
                variant: "ghost",
              })}
              href="/dashboard/create-post"
            >
              Create Posts
            </Link>
            <Button variant="ghost" className="w-full justify-start">
          
              My Posts
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Profile
          </h2>
          <div className="flex flex-col space-y-1 flex-grow-0">
            <div className="mb-8">
              <Link
                className={buttonVariants({
                  variant: "ghost",
                  className: "flex-grow-0",
                })}
                href="/dashboard/create-post"
              >
                Update Profile
              </Link>
            </div>
                <Signout />
          </div>
        </div>
      </div>
    </div>
  );
}
