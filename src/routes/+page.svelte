<script lang="ts">
	import Weather from '../components/weather.svelte';

	export let data;
	console.log(data);
</script>

{#if data.loggedIn}
	<Weather />
{/if}
