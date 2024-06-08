<script lang="ts">
	export let data;
	data.busId = data.line.id;

	// clean null values
	data = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));

	// extract time from ISO string in HH:MM format
	function extractTime(time, onlyMin: boolean) {
		const now = new Date();
		const inputTime = new Date(time);
		const diffInSeconds = Math.floor((inputTime.getTime() - now.getTime()) / 1000);
		console.log(diffInSeconds);
		if (diffInSeconds < 0) {
			return '---';
		}
		const minutes = Math.floor(diffInSeconds / 60);
    if (onlyMin) {
      return `+ ${minutes.toString()}`
    }
		const seconds = diffInSeconds % 60;
		return `+${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
	}

	const when = extractTime(data.when, false);
	const plannedWhen = extractTime(data.plannedWhen, true);
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
