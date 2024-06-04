<script lang="ts">
	import { AppBar, AppLayout, Card, Button, NavItem, Tooltip, settings, Icon } from 'svelte-ux';

	import { page } from '$app/stores';
	import '../app.css';
	import { getSettings } from 'svelte-ux';

	const { currentTheme } = getSettings();
	currentTheme.setTheme('light');

	export let data;
	settings({
		components: {
			AppBar: {
				classes: 'bg-primary text-white shadow-md'
			},
			AppLayout: {
				classes: {
					nav: 'bg-neutral-800'
				}
			},
			NavItem: {
				classes: {
					root: 'text-sm text-gray-400 pl-6 py-2 hover:text-white hover:bg-gray-300/10 [&:where(.is-active)]:text-sky-400 [&:where(.is-active)]:bg-gray-500/10'
				}
			}
		}
	});
</script>

{#if data.loggedIn}
	<AppBar title="Papujki" menuIcon={null}>
		<div slot="title" class="flex">
			<a href="/" class="icon"> H </a>
			<a href="/weather" class="icon"> W </a>
		</div>
	</AppBar>

	<slot />
{:else}
	<slot />
{/if}

<style>
	.icon {
		font-size: 1.5rem;
		margin: 0 0.5rem;
		font-weight: bold;
	}
</style>
