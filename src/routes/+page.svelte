<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	export let data;

	onMount(() => {
		if (!data.loggedIn) {
			goto('/login');
		}
	});
</script>

{#if data.loggedIn}
	<h1>Admin!</h1>
	{JSON.stringify(data)}
{/if}
