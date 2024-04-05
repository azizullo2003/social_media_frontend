import { authMiddleware } from "@clerk/nextjs";
import { debug } from "console";

export default authMiddleware({
  publicRoutes: ["/"],
  debug: false,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
