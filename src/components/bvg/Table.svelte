<script lang="ts">
	import { isArrivalToKirchhofStrSouthDirection } from '$lib/bvg';
	import Trip from './Trip.svelte';

	export let data;
	export let title;

	data = data.filter(isArrivalToKirchhofStrSouthDirection);
</script>

<div class="flex items-center flex-col">
	<h1 class="text-center text-lg font-bold">BVG</h1>
	<h2>{title}</h2>
	<ul>
		{#each data as item}
			<li>
				<div>
					<Trip data={item} />
				</div>
			</li>
		{/each}
	</ul>
</div>
