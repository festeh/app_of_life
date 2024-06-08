<script lang="ts">
	import Bvg from '../components/bvg/Bvg.svelte';
	import Weather from '../components/weather/weather.svelte';
</script>

<div class="grid sm:grid-cols-1 md:grid-cols-2">
	<Weather isBig={false} />
	<Bvg isBig={false} />
</div>
