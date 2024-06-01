<script lang="ts">
	import { onMount } from 'svelte';

	const letters =
		'-=+_!@#$%^&*"№:?*()/\\][{}`\'' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.toLowerCase();

	let interval: NodeJS.Timeout | null = null;

	let main_text: HTMLHeadElement;
	onMount(() => {
		let iteration = 0;

		if (interval) clearInterval(interval);

		interval = setInterval(() => {
			main_text.innerText = main_text.innerText
				.split('')
				.map((letter, index) => {
					if (index < iteration) {
						return main_text.dataset.value?.[index];
					}

					return letters[Math.floor(Math.random() * letters.length)];
				})
				.join('');

			if (iteration >= (main_text.dataset.value?.length ?? 0)) {
				if (interval) clearInterval(interval);
			}

			iteration += 1 / 3;
		}, 10);
		return () => {
			if (interval) clearInterval(interval);
		};
	});
</script>

<svelte:head>
	<title>Welcome to Vobla - Video Player/Hosting</title>
</svelte:head>

<div class="welcome-container">
	<h1
		bind:this={main_text}
		data-value="Welcome to Vobla - Video Player/Hosting - free video sharing"
	>
		Welcome to Vobla - Video Player/Hosting - free video sharing
	</h1>
	<div class="button-container">
		<a href="/player" class="button">video player</a>
		<a href="/upload" class="button">video upload/share</a>
	</div>
</div>

<style>
	.welcome-container {
		background-color: rgb(var(--color-surface-500));
		color: rgb(var(--on-surface));
		display: flex;
		flex-direction: column;
		gap: 30px;
		height: 100vh;
		height: 100dvh;
		justify-content: center;
		align-items: center;
	}

	h1 {
		text-align: center;
		font-family: 'Space Mono', monospace;
	}

	.button-container {
		text-align: center;
	}

	.button {
		display: inline-block;
		padding: 10px 20px;
		text-decoration: none;
		color: rgb(var(--on-primary));
		background-color: rgb(var(--color-primary-500));
		border-radius: 5px;
		font-size: 16px;
		margin: 0 10px;
	}

	.button:where(:hover, :focus) {
		background-color: rgb(var(--color-primary-600));
	}
</style>
