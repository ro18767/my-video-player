<script lang="ts">
	import { writable } from 'svelte/store';

	export let time = writable(0);
	export let duration = writable(NaN);

	let root_element: HTMLButtonElement;

	const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

	$: value = $time / $duration;
</script>

<button
	class="timeline"
	style:--value={value}
	bind:this={root_element}
	on:pointerdown={(e) => {
		root_element.setPointerCapture(e.pointerId);
		root_element.dispatchEvent(new PointerEvent('pointermove', e));
	}}
	on:pointermove={(e) => {
		if (!root_element.hasPointerCapture(e.pointerId)) return;
		$time = $duration * (clamp(e.offsetX / root_element.offsetWidth, 0, 1) || 0);
	}}
	on:pointerup={(e) => {
		if (!root_element.hasPointerCapture(e.pointerId)) return;
		root_element.releasePointerCapture(e.pointerId);
	}}
>
	{#if Number.isFinite(value)}
		<div class="progress">
			<div class="dot" />
		</div>
	{/if}
</button>

<style>
	.timeline {
		appearance: none;
		display: block;
		background-color: transparent;
		color: rgb(var(--on-surface));
		background-image: none;
		width: 100%;
	}
	.timeline > .progress {
		background-image: linear-gradient(
			to right,
			rgb(var(--primary)) 0 calc(var(--value) * 100%),
			rgb(var(--surface)) calc(var(--value) * 100%) 100%
		);
		display: block;
		position: relative;
		height: min(8px, 100%);
	}
	.timeline > .progress > .dot {
		display: inline-block;
		position: absolute;
		height: 100%;
		left: calc(var(--value) * 100%);
		transform-origin: center;
		translate: -50% 0;
		scale: 250%;

		aspect-ratio: 1 / 1;
		border-width: 1px;
		border-color: rgb(var(--surface-900));
		border-style: solid;
		border-radius: 50%;
		background-color: rgb(var(--primary));
	}
</style>
