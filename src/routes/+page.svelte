<script lang="ts">
	export let data;
  console.log(data);
</script>

{#if data.loggedIn}
	<h1>Admin!</h1>
	{JSON.stringify(data)}
{/if}
