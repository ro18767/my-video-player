<script lang="ts">
	import arrow_back_icon from '$lib/assets/icons/Material/arrow_back.svg';
	import type { PageData } from './$types';
	import Mediaplayer from '$lib/components/mediaplayer/Mediaplayer.svelte';

	export let data: PageData;

	$: src = data.src;
	$: title = data.title;
</script>

<div class="page">
	{#if src}
		<Mediaplayer {src} paused={true} />
		<div class="topbar">
			<a class="back_btn" href="/">
				<img src={arrow_back_icon} alt="back" />
			</a>
			<div class="title">
				<span>
					{title}
				</span>
			</div>
		</div>
	{:else}
		<div>Your link is invalid</div>
	{/if}
</div>

<style>
	.page {
		position: relative;
		height: 100vh;
		height: 100dvh;
	}
	.topbar {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		box-shadow: 0 0 16px 16px rgb(var(--color-surface-900) / 80%);
		background-color: rgb(var(--color-surface-900) / 80%);
	}
	.back_btn {
		appearance: none;
		background-color: transparent;
		color: rgb(var(--on-surface));
		background-image: none;
		height: 48px;
		width: 64px;
		display: grid;
		place-items: center;
	}
	.back_btn img {
		filter: invert(100%);
	}

	.title {
		flex: 1;
		display: flex;
		place-items: center;
		color: rgb(var(--on-surface));
		overflow: hidden;
	}
	.title span {
		display: block;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
