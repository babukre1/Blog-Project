import { Sidebar } from "@/components/Sidebar";
import { playlists } from "@/hooks/data/playlists";
import { getServerSideUser } from "@/lib/auth";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "my blog dashboard",
  description: "Manage your posts and profile here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nextCookies = cookies();
  const { sessionUser } = await getServerSideUser(nextCookies);
  if (!sessionUser) {
    redirect("/sign-in");
  }
  return (
    <div className="">
      <div className="grid lg:grid-cols-5">
        <Sidebar playlists={playlists} className="py-6" />
        <div className="col-span-3 lg:col-span-4 lg:border-l py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
