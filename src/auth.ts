
import { env } from '$env/dynamic/private';
import { SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"
export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      console.log("AUTH", credentials)
      if (credentials.email === env.VITE_EMAIL && credentials.password === env.VITE_PASSWORD) {
        return { user: { email: credentials.email } }
      }
      throw new Error("Invalid credentials")
    }
  },
  )],
  secret: env.SECRET,
  trustHost: true,
})
