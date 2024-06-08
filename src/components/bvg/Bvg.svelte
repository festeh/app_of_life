<script lang="ts">
	import { onMount } from 'svelte';
	import Table from './Table.svelte';
	import BvgSmall from './BvgSmall.svelte';

	export let isBig = false;

	let data = null;

	onMount(async () => {
		const response = await fetch('/api/bvg');
		const json = await response.json();
		console.log(json);
		data = json;
	});
</script>

<main>
	{#if data}
		{#if isBig}
			<Table data={data.arr} title="Arrivals, Kirchofstr." />
		{:else}
			<BvgSmall data={data.arr} />
		{/if}
	{:else}
		<p>loading...</p>
	{/if}
</main>
