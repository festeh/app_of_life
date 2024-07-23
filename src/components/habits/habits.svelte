<script lang="ts">
	import { onMount } from 'svelte';
	import { Popover } from 'svelte-ux';

	interface Habit {
		id: string;
		description: string;
		long_description: string;
	}

	interface HabitLog {
		habit: string;
		date: string;
		repeats: number;
		streak: number;
	}

	interface Date {
		key: string;
		repr: string;
	}

	export let habits: Habit[];
	export let logs: HabitLog[];
	let completed: Record<string, Record<string, boolean>> = {};
	let popupOpen: Record<string, boolean> = {};
	let streaks: Record<string, number> = {};

	onMount(async () => {
		habits.forEach((habit) => {
			popupOpen[habit.id] = false;
			completed[habit.id] = {};
		});

		logs.forEach((log) => {
			const isoDate = log.date.substring(0, 10);
			completed[log.habit][isoDate] = true;
			if (log.date.substring(0, 10) === (new Date()).toISOString().substring(0, 10)) {
				streaks[log.habit] = log.streak;
			}
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
    let streak = 1;
    const prevDate = new Date(date.key);
    prevDate.setDate(prevDate.getDate() - 1);
    logs.forEach((log) => {
      if (log.habit === habit.id && log.date.substring(0, 10) === prevDate.toISOString().substring(0, 10)) {
        streak = log.streak + 1;
      }
    });
		const res = await fetch('/api/habits', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				habit: habit.id,
				date: date.key,
				repeats: 1,
				streak
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
	<div class="grid grid-cols-9 border rounded-xl shadow-md p-1">
		<div class="font-bold mb-8"></div>
		{#each dates as date}
			<div class="text-center">{date.repr}</div>
		{/each}
		<div class="text-center">Streak</div>
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
			<div class="flex justify-center items-center font-bold text-lg">
				{streaks[habit.id] || 0}
			</div>
		{/each}
	</div>
</div>
