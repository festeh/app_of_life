
export const KirchofStrId = "900028151"

export function isArrivalToKirchhofStrSouthDirection(trip) {
  let originLat = trip?.origin?.location?.latitude || 0;
  let stopLat = trip?.stop?.location?.latitude || 0;
  return originLat > stopLat;
}

