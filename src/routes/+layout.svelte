<script lang="ts">
	import { AppBar, AppLayout, Card, Button, NavItem, Tooltip, settings } from 'svelte-ux';

	import { page } from '$app/stores';
	import '../app.css';
	import { getSettings } from 'svelte-ux';

	const { currentTheme } = getSettings();
  currentTheme.setTheme("light")

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
	<AppLayout>
		<nav slot="nav" class="nav h-full">
			<NavItem
				path="/"
				text="Home"
				icon="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
				currentUrl={$page.url}
				class="mt-2"
			/>

			<!-- <NavItem -->
			<!-- 	path="/about" -->
			<!-- 	text="About" -->
			<!-- 	icon="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" -->
			<!-- 	currentUrl={$page.url} -->
			<!-- /> -->
		</nav>

		<AppBar title="Papujki"></AppBar>

		<slot />
	</AppLayout>
{:else}
	<slot />
{/if}
