<script lang="ts">
	import { Popover } from 'svelte-ux';

	interface Habit {
		id: string;
		description: string;
		long_description: string;
	}
	export let habits: Habit[];

	let dates: string[] = ['7 Jul', '8 Jul', '9 Jul', '10 Jul', '11 Jul', '12 Jul', '13 Jul'];
	let completed: boolean[] = [false, false, false, false, false, false, false];

	let popupOpen: Record<string, boolean> = {};
	habits.forEach((habit) => {
		popupOpen[habit.id] = false;
	});
</script>

<div class="container mx-auto p-4">
	<div class="text-center">
		<h1 class="font-bold mb-1">Habit Tracker</h1>
	</div>
	<div class="grid grid-cols-8 border rounded-xl shadow-md p-1">
		<div class="font-bold"></div>
		{#each dates as date}
			<div class="text-center">{date}</div>
		{/each}
		{#each habits as habit, i (habit.id)}
			<Popover bind:open={popupOpen[habit.id]}>
				<div class="p-2 bg-surface-100 border shadow text-center">{@html habit.long_description}</div>
			</Popover>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:click={() => (popupOpen[habit.id] = !popupOpen[habit.id])}>
				{habit.description}
			</div>
			{#each completed as c}
				<div class="text-center">
					<span class="inline-block w-6 h-6 rounded-full {c ? 'bg-green-500' : 'bg-red-500'}"
					></span>
				</div>
			{/each}
		{/each}
		<div class="text-center"></div>
	</div>
</div>
