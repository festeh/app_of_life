import { KirchofStrId } from "$lib/bvg";



export async function GET() {
  // const depUrl = `https://v6.bvg.transport.rest/stops/${KirchofStrId}/departures?results=10&duration=20`;
  const arrUrl = `https://v6.bvg.transport.rest/stops/${KirchofStrId}/arrivals?results=10&duration=20`;
  try {
    const arr = await fetch(arrUrl);
    const arrJson = await arr.json();
    const res = {
      arr: arrJson.arrivals,
      arrUpdated: arrJson.realtimeDataUpdatedAt,
    }
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error(error);
    const msg = `Error fetching BVG data: ${error}`;
    return new Response(msg, { status: 500 });
  }


}
