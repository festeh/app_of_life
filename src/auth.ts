import { AuthError, CredentialsSignin, SvelteKitAuth } from "@auth/sveltekit"
import Credentials from "@auth/sveltekit/providers/credentials"
import { redirect } from "@sveltejs/kit"

class CustomError extends CredentialsSignin {
  code = "401"
}


export const { handle, signIn, signOut } = SvelteKitAuth({
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      if (credentials.email === import.meta.env.VITE_EMAIL && credentials.password === import.meta.env.VITE_PASSWORD) {
        return { user: { email: credentials.email } }
      }
      return null
    }
  },
  )],
  secret: import.meta.env.VITE_SECRET,
  trustHost: true,
})
