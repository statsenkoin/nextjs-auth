import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '@/configs/axios';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // name: {
        //   label: 'Name',
        //   type: 'text',
        //   placeholder: 'User name',
        // },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@mail.com',
          required: true,
        },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials, req) {
        {
          // Add logic here to look up the user from the credentials supplied
          // const users = [
          //   {
          //     id: '1',
          //     name: 'qwerty',
          //     email: 'qwerty@m.com',
          //     password: '123',
          //   },
          // ];
          // if (!credentials?.email || !credentials.password) return null;
          // const currentUser = users.find(
          //   (user) => user.email === credentials.email
          // );
          // if (currentUser && currentUser.password === credentials.password) {
          //   const { password, ...userWithoutPassword } = currentUser;
          //   console.log('userWithoutPassword :>> ', userWithoutPassword);
          //   return userWithoutPassword;
          // }
          // return null;
        }

        console.log('credentials :>> ', credentials);
        if (!credentials.email || !credentials.password) return null;

        // const res = await fetch('http://localhost:3000/api/auth/login', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     // name: credentials?.name,
        //     email: credentials.email,
        //     password: credentials.password,
        //     provider: 'credentials',
        //   }),
        // });
        const body = { ...credentials, provider: 'credentials' };

        const res = await axios.post('/api/auth/login', body);

        const user = res.data;
        // const user = await res.json();
        console.log('user :>> ', user);
        if (user && !user.error) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      console.log('accountSession :>> ', user);
      // session.user = { ...session.user };
      session.user = token;

      console.log('session :>> ', session);
      return session;
    },
    async signIn(account, profile, session) {
      let user = account.user;
      if (account.account.provider === 'google') {
        const newUser = {
          name: user.name,
          email: user.email,
          image: user.image,
          password: process.env.GOOGLE_SECRET,
          provider: account.account.provider,
          accessToken: account.account.access_token,
        };
        const res = await axios.post('/api/auth/register', newUser);
        user = res.data;
        console.log('user signin :>> ', user);
        console.log('accountSignin :>> ', account);
        account.user = { ...account.user, _id: user._id };
        console.log('accountSignin2 :>> ', account);
        return user;
      }
      return user;
    },
  },
  pages: { signIn: '/signin' },
};
