<script lang="ts">
	import { formatTime } from "$lib";

	export let info;

</script>

<div class="bg-surface-100 p-6 rounded-lg shadow-md flex">
	<div class="flex justify-center items-center">
		<div class="text-center">
			<p class="text-xl font-bold mb-2">{info.time}</p>
		</div>
	</div>
	<div class="ml-8 flex justify-center items-center">
		<div class="text-center">
			<p class="text-xl font-bold mb-2">{info.temperature}</p>
			<p class="text-lg">Температура</p>
		</div>
		<div class="text-center ml-4">
			<p class="text-xl font-bold mb-2">{info.humidity}</p>
			<p class="text-lg">Влажность</p>
		</div>
	</div>
	<div class="ml-4 text-center">
		<p class="text-lg">{info.description}</p>
	</div>
</div>
