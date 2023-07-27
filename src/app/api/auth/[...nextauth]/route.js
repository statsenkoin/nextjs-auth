import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { toast } from 'react-hot-toast';

export const authConfig = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    //   // authorization: {
    //   //   params: {
    //   //     prompt: 'consent',
    //   //     access_type: 'offline',
    //   //     response_type: 'code',
    //   //   },
    //   // },
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@mail.com',
          required: true,
        },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials, req, res) {
        console.log('credentials :>> ', credentials);
        const user = credentials;
        console.log('user authorize:>> ', user);

        if (user && !user.error) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile, session) {
      console.log('user signIn :>> ', user);
      //   console.log('account signIn :>> ', account);
      return user;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('Start of jwt ===============================');
      console.log('token jwt:>> ', token);
      console.log('user jwt:>> ', user);
      console.log('account jwt:>> ', account);
      //   console.log('profile jwt:>> ', profile);
      //   console.log('isNewUser jwt:>> ', isNewUser);
      console.log('End of jwt ===============================');

      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      console.log('Start of session ===============================');
      console.log('session session :>> ', session);
      console.log('user session :>> ', user);
      console.log('token session :>> ', token);
      console.log('End of session ===============================');
      return session;
    },
    // pages: { signIn: '/auth/login' },
  },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
