import { signIn } from "../../../auth"
import type { Actions } from "./$types"
export const actions: Actions = {
  default:
    async (request) => {
      console.log("Sign in request" )
      await signIn(request)
    }
}
