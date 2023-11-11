import NextAuth from "next-auth";
import { authOptions } from "../nextauthConfig";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
