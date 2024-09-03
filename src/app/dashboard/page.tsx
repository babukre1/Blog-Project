import DashboardRecentPosts from "@/components/DashboardRecentPosts";
import { getServerSideUser } from "@/lib/auth";
import { cookies } from "next/headers";

import { redirect} from "next/navigation";

const page = async () => {
  const nextCookies = cookies();
  const { sessionUser } = await getServerSideUser(nextCookies);
  if (!sessionUser) {
    redirect("/sign-in");
  }
  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <div className="grid grid-cols-2">
        {/* recent posts */}
        <DashboardRecentPosts sessionUser={sessionUser} />
        <div></div>
      </div>
    </div>
  );
};

export default page;
