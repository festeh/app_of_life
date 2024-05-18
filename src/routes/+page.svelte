<script lang="ts">
	export let data;
</script>

{#if data.loggedIn}
	<h1>Admin</h1>
{:else}
	<h1>Guest</h1>
{/if}

{ JSON.stringify(data) }

