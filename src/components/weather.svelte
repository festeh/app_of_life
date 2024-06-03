<script>
	import { onMount } from 'svelte';
	import { Card } from 'svelte-ux';
	import { ListItem } from 'svelte-ux';

	let hourlyData = null;
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/weather');
			console.log(response);
			if (!response.ok) {
				const message = `An error has occured: ${response.status}`;
				throw new Error(message);
			}
			hourlyData = await response.json();
			console.log(hourlyData);
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});
</script>

<Card title="Погодка">
	<div slot="contents">
		{#if loading}
			<p>Loading weather data...</p>
		{:else if error}
			<p>Error: {error}</p>
		{:else}
			{#each hourlyData as item}
				<ListItem>
					<div slot="title">
						{item.time}
					</div>
					<div slot="subheading" class="flex flex-col">
						<span> {item.temperature} °C </span>
            <span> {item.humidity}  </span>
						<span> {item.description}</span>
					</div>
				</ListItem>
			{/each}
		{/if}
	</div>
</Card>

<style>
	.weather-card {
		/* background-color: #f4f4f4; */
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		max-width: 300px;
		margin: 0 auto;
	}

	h2 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	p {
		font-size: 18px;
		margin-bottom: 5px;
	}
</style>
