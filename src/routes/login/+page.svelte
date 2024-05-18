<script>
	let email = '';
	let password = '';

	async function handleSubmit() {
		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		if (response.ok) {
			window.location.href = '/';
		} else {
			alert('Invalid email or password');
		}
	}
</script>

<div class="flex flex-row items-center justify-center flex-grow h-dvh">
	<form on:submit|preventDefault={handleSubmit}>
		<label>
			Email:
			<input type="email" bind:value={email} required />
		</label>
		<label>
			Password:
			<input type="password" bind:value={password} required />
		</label>
		<button type="submit">Login</button>
	</form>
</div>
