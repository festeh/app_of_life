<script lang="ts">
	export let data;
	data.busId = data.line.id;

	// clean null values
	data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));

	// extract time from ISO string in HH:MM format
	function extractTime(time) {
		const inputTime = new Date(time);
		const diffInSeconds = Math.floor((inputTime.getTime() - now.getTime()) / 1000);
		if (diffInSeconds < 0) {
			return '---';
		}
		const minutes = Math.round(diffInSeconds / 60);
		return `+${minutes.toString()}`;
	}

	const now = new Date();
	const when = extractTime(data.when);
	const plannedWhen = extractTime(data.plannedWhen);
	const bus = data?.busId?.toUpperCase() || 'WTF';
</script>

{#if when !== '---'}
	<div class="border p-2 flex-col w-40">
		<div class="flex items-stretch justify-evenly">
			<div class="self-center">
				<span class="text-lg font-bold">{when}</span>
				<span>({plannedWhen})</span>
			</div>
			<div class="self-center">
				<span>{bus}</span>
			</div>
		</div>
	</div>
{/if}
