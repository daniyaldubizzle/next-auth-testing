import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      profile(profile) {
        console.log("Github Profile: ", profile);
        let userRole = "Github User";
        if (profile?.email === "daniyalmateen22@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        console.log("Google Profile: ", profile);

        return {
          ...profile,
          role: "Google User",
          id: profile.sub,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
