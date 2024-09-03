import { ExpressContext } from "../server";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.context<ExpressContext>().create();
export const router = t.router;
const middleware = t.middleware;


export const publicProcedure = t.procedure;
// export const privateProcedure = t.procedure.use(isAuth);
