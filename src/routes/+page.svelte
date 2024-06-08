<script lang="ts">
	import Bvg from '../components/bvg/Bvg.svelte';
	import Weatherwidget from '../components/weather/weatherwidget.svelte';
</script>

<div class="grid sm:grid-cols-1 md:grid-cols-2">
	<Weatherwidget />
	<Bvg isBig={false} />
</div>
