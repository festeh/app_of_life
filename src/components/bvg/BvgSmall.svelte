<script lang="ts">
	import { isArrivalToKirchhofStrSouthDirection } from '$lib/bvg';
	import Trip from './Trip.svelte';

	export let data;

	data = data.filter(isArrivalToKirchhofStrSouthDirection);
</script>

<div class="my-2">
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
