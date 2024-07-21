<script lang="ts">
	import { onMount } from 'svelte';
	import { Popover } from 'svelte-ux';

	interface Habit {
		id: string;
		description: string;
		long_description: string;
	}

	interface Date {
		key: string;
		repr: string;
	}

	export let habits: Habit[];
	export let logs: any[];
	let completed: Record<string, Record<string, boolean>> = {};
	let popupOpen: Record<string, boolean> = {};

	onMount(async () => {
		habits.forEach((habit) => {
			popupOpen[habit.id] = false;
			completed[habit.id] = {};
		});
		logs.forEach((log) => {
			const isoDate = log.date.substring(0, 10);
			completed[log.habit][isoDate] = true;
		});
	});

	const today = new Date();
	const dates: Date[] = [];
	for (let i = 0; i < 7; i++) {
		if (i !== 0) {
			today.setDate(today.getDate() - 1);
		}
		let dateString = today.toLocaleDateString('en-GB', { month: 'long', day: 'numeric' });
		let [day, month] = dateString.split(' ');
		month = month.substring(0, 3);
		const repr = `${day} ${month}`;
		dates.push({ repr, key: today.toISOString().substring(0, 10) });
	}

	async function completeHabit(habit: Habit, date: Date) {
    if (completed[habit.id] && completed[habit.id][date.key]) {
      return;
    }
		const res = await fetch('/api/habits', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				habit: habit.id,
        date: date.key,
				repeats: 1,
				streak: 1
			})
		});
		// invalidateAll();
		window.location.reload();
	}
</script>

<div class="mx-auto p-4">
	<div class="text-center">
		<h1 class="font-bold mb-1">Habit Tracker</h1>
	</div>
	<div class="grid grid-cols-8 border rounded-xl shadow-md p-1">
		<div class="font-bold mb-8"></div>
		{#each dates as date}
			<div class="text-center">{date.repr}</div>
		{/each}
		{#each habits as habit, i (habit.id)}
			<Popover bind:open={popupOpen[habit.id]}>
				<div class="p-2 bg-surface-100 border shadow text-center">
					{@html habit.long_description}
				</div>
			</Popover>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="text-center" on:click={() => (popupOpen[habit.id] = !popupOpen[habit.id])}>
				{habit.description}
			</div>
			{#each dates as date}
				<button
					class="text-center items-center justify-center flex"
					on:click={() => completeHabit(habit, date)}
				>
					<span
						class="inline-block w-6 h-6 rounded-full"
						class:bg-green-500={completed[habit.id] && completed[habit.id][date.key] === true}
						class:bg-red-500={!completed[habit.id] || !completed[habit.id][date.key]}
					></span>
				</button>
			{/each}
		{/each}
		<div class="text-center"></div>
	</div>
</div>
