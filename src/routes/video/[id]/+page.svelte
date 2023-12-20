<script lang="ts">
	import type { PageData } from './$types';
	import Mediaplayer from '$lib/components/mediaplayer/Mediaplayer.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	$: src = data.src;
</script>

<div class="grid">
	{#if src}
		<Mediaplayer {src} paused={true} />
	{:else}
		<div>Your link is invalid</div>
	{/if}
</div>

<style>
	.grid {
		display: grid;
		height: 100vh;
		height: 100dvh;
	}
</style>
