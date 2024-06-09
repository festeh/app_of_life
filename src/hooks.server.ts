import { redirect } from "@sveltejs/kit";
import { handle as mainHandle } from "./auth"

export const handle = async ({ event, resolve }) => {
  console.log('event', event.url.pathname, event.request.method);
  return mainHandle({ event, resolve });

}
