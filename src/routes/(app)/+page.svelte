<script lang="ts">
	import Bvg from '../../components/bvg/Bvg.svelte';
	import Weather from '../../components/weather/weather.svelte';
</script>

<div class="agrid">
	<Weather isBig={false} />
	<Bvg isBig={false} />
</div>

<style>
.agrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1em;
}
</style>
