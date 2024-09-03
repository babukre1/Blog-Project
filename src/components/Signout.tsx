import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";

const Signout = () => {
  const router = useRouter();
  const {} = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
  return <div>Signout</div>;
};

export default Signout;
