// place files you want to import through the `$lib` alias in this folder.
//
export function foo() {
  return 'foo';
}


export function formatTime(isoTime) {
  const date = toLocalTime(isoTime);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
	}

function toLocalTime(isoTime) {
  const date = new Date(isoTime);
  const localTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localTime;
}
