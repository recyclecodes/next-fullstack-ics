import { authMiddleware } from "@clerk/nextjs";
import prismadb from "./lib/prismadb";
 
export default authMiddleware();
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

async function main() {
  prismadb.$use(async (params, next) => {

      if (params.action === 'delete') {
        params.action = 'update';
        params.args.data = { deleted: true };
      }
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        if (params.args.data !== undefined) {
          params.args.data.deleted = true;
        } else {
          params.args.data = { deleted: true };
        }
      }
    
    return next(params);
  });
}

main();