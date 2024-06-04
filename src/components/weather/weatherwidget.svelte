<script lang="ts">
	import { formatTime } from '$lib';
	import { onMount } from 'svelte';
	import { Table } from 'svelte-ux';
	let loading = true;
	let error = null;
	let data = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/weather');
			console.log(response);
			if (!response.ok) {
				const message = `An error has occured: ${response.status}`;
				throw new Error(message);
			}
			data = await response.json();
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});
</script>

<div>
	{#if loading}
		<p>Loading weather data...</p>
	{:else if error}
		<p>Error: {error}</p>
	{:else}
		<div class="flex text-lg">
			<Table
				{data}
				classes={{
					table: 'w-full m-2 border rounded-2xl p-1',
          thead: 'border',
					th: 'p-2 border-y',
					// tbody: 'bg-surface-200',
					// tr: 'hover:bg-surface-100',
					td: 'p-2 border-y'
				}}
				columns={[
					{ name: '🕒', value: 'time', align: 'center'},
					{ name: '🌡️', value: 'temperature', align: 'center' },
					{ name: '💧', value: 'humidity', align: 'center' },
          { name: '?', value: 'emoji' },
				]}
			/>
		</div>
	{/if}
</div>
