<script lang="ts">
	import { AppBar, settings } from 'svelte-ux';
	import '../../app.css';
	import { getSettings } from 'svelte-ux';
	const { currentTheme } = getSettings();
	currentTheme.setTheme('light');

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

<AppBar title="Papujki" menuIcon={null}>
	<div slot="title" class="flex">
		<a href="/" class="icon"> M </a>
		<a data-sveltekit-reload href="/weather" class="icon"> W </a>
		<a data-sveltekit-reload href="/bvg" class="icon"> B </a>
		<a data-sveltekit-reload href="/habits?_={Date.now()}" class="icon"> H </a>
	</div>
</AppBar>

<slot />

<style>
	.icon {
		font-size: 1.5rem;
		margin: 0 0.5rem;
		font-weight: bold;
	}
</style>
