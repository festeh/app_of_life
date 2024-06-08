<script lang="ts">
	import { Table } from 'svelte-ux';

	export let data;
</script>

<div class="flex text-lg">
	<Table
		{data}
		classes={{
			table: 'w-full m-2 border rounded-2xl p-1',
			thead: 'border',
			th: 'p-2 border-y',
			// tbody: 'bg-surface-200',
			// tr: 'hover:bg-surface-100',
			td: 'p-2 border-y'
		}}
		columns={[
			{ name: '🕒', value: 'time', align: 'center' },
			{ name: '🌡️', value: 'temperature', align: 'center' },
			{ name: '💧', value: 'humidity', align: 'center' },
			{ name: '🌐', value: 'emoji' },
			{ name: '⚠️', value: 'isWarning' }
		]}
	/>
</div>
