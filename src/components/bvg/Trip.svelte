<script lang="ts">
	export let data;

	// data.tripId = null;
	// data.stop = null;
	// data.line.operator = null;
	data.busId = data.line.id;
	// data.products = null;
	// if (data.destination) {
	// 	data.destination.products = null;
	// }
	// data.line = null;

	console.log(data.destination);

	// clean null values
	data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));

	// extract time from ISO string in HH:MM format
	function extractTime(time) {
		return time.split('T')[1].split(':').slice(0, 2).join(':');
	}
</script>

<div class="border p-2 flex-col w-40">
	<div class="flex items-stretch justify-evenly">
		<div class="self-center">
			<span class="text-lg font-bold">{extractTime(data.when)}</span>
			<span>({extractTime(data.plannedWhen)})</span>
		</div>
		<div class="self-center">
			<span>{data?.busId.toUpperCase()}</span>
		</div>
	</div>
<!-- 	<pre> -->
<!-- {JSON.stringify(data, null, 2)} -->
<!-- </pre> -->
</div>
