import { signOut } from "../../../auth"
import type { Actions } from "./$types"
export const actions: Actions = {
  default:
    async (request) => {
      console.log("Sign out req", request)
      await signOut(request)
    }
}
