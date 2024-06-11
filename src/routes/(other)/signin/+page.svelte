<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
	import { Button } from 'svelte-ux';
</script>


<SignIn provider="credentials" className="border p-2 rounded-xl flex-col" options={{redirectTo: "/"}}>
	<div slot="credentials" class="p-1">
		<input type="email" name="email" placeholder="Email" class="border p-1"/>
		<input type="password" name="password" placeholder="Password" class="border p-1"/>
	</div>
	<div slot="submitButton" class="p-1">
		<Button type="submit" color="primary" variant="fill" rounded="full">Sign In</Button>
	</div>
</SignIn>
