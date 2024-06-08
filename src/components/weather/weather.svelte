<script>
	import { onMount } from 'svelte';
	import Weatherwidget from './weatherwidget.svelte';
	import WeatherPage from './WeatherPage.svelte';

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
  <WeatherPage data={hourlyData} />
{:else}
	<Weatherwidget data={hourlyData} />
{/if}
