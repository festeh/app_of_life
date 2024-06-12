<script lang="ts">
	import { Button } from 'svelte-ux';
</script>

<form method="POST" action="?/login">
	<div class="p-1">
		<input type="email" name="email" placeholder="Email" class="border p-1"/>
		<input type="password" name="password" placeholder="Password" class="border p-1"/>
	</div>
	<div class="p-1">
		<Button type="submit" color="primary" variant="fill" rounded="full">Sign In</Button>
	</div>
</form>
