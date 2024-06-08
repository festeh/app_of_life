<script>
	import { Card, Table } from 'svelte-ux';
	export let data;
</script>

<div class="p-2 border rounded-xl m-2">
	<Table
		{data}
		columns={[
			{ name: 'Время', value: 'time', align: 'center' },
			{ name: 'Темпа', value: 'temperature', align: 'center' },
			{ name: 'Влажность', value: 'humidity', align: 'center' },
			{ name: 'P(дождик)', value: 'precipitation', align: 'center' },
			{ name: 'УФ-индекс', value: 'uvIndex' },
			{ name: 'УФ-опасность', value: 'uvHealthConcern' },
			{ name: 'Ветер', value: 'windSpeed' }
		]}
		]}
	/>
</div>
