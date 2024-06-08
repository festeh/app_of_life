<script>
	import { onMount } from 'svelte';
	import { Card } from 'svelte-ux';
	import WeatherHour from './weather_hour.svelte';
	import Weatherwidget from './weatherwidget.svelte';

	export let isBig = true;

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
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});
</script>

{#if loading}
	<p>Loading weather data...</p>
{:else if error}
	<p>Error: {error}</p>
{:else if isBig}
	<Card title="Погодка" class="border rounded-xl p-2 m-1">
		<div slot="contents">
			{#each hourlyData as info}
				<WeatherHour {info} />
			{/each}
		</div>
	</Card>
{:else}
	<Weatherwidget data={hourlyData} />
{/if}
