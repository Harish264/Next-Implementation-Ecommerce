import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";

export const { handlers, auth } = NextAuth({ providers: [GitHub, Google] });
