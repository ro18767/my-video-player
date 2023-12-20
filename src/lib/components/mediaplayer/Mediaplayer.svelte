<script lang="ts">
	import fullscreen_icon from '$lib/assets/icons/Material/fullscreen.svg';
	import fullscreen_exit_icon from '$lib/assets/icons/Material/fullscreen_exit.svg';
	import picture_in_picture_icon from '$lib/assets/icons/Material/picture_in_picture.svg';
	import volume_up_icon from '$lib/assets/icons/Material/volume_up.svg';
	import volume_off_icon from '$lib/assets/icons/Material/volume_off.svg';
	import play_arrow_icon from '$lib/assets/icons/Material/play_arrow.svg';
	import pause_icon from '$lib/assets/icons/Material/pause.svg';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { exit_fullscreen, is_element_fullscreen, toggle_fullscreen } from './fullscreen';
	import { toggle_picture_in_picture } from './picture_in_picture';
	import { toggle_element_mute, toggle_element_pause } from './media';
	import Timeline from './Timeline.svelte';

	export let src: string;

	let root_element: HTMLDivElement;
	let media_element: HTMLVideoElement;

	export let paused = false;
	let is_fullscreen = false;
	export let muted = false;
	let is_can_play = false;
	let is_error = false;

	const time = writable(0);
	const duration = writable(NaN);

	onMount(() => {
		is_fullscreen = is_element_fullscreen(root_element);
		media_element.load();
		return () => {
			exit_fullscreen(root_element);
		};
	});
</script>

<svelte:document
	on:fullscreenchange={() => {
		is_fullscreen = is_element_fullscreen(root_element);
	}}
/>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={root_element} class="mediaplayer">
	<div class="media">
		<!-- svelte-ignore a11y-media-has-caption -->
		{#if is_error}
			{#if is_can_play}
				<div class="error">Something wrong. Please reload the page</div>
			{:else}
				<div class="error">File format is not supported. Please select another file</div>
			{/if}
		{:else if src}
			<video
				{src}
				crossorigin="anonymous"
				bind:this={media_element}
				bind:paused
				bind:muted
				bind:duration={$duration}
				bind:currentTime={$time}
				on:canplay={() => {
					if (paused) return;
					is_can_play = true;
					media_element.play();
				}}
				on:error={() => {
					is_can_play = false;
					is_error = true;
				}}
			/>
		{:else}
			<div class="message">Click to Select file or Drag and Drop file</div>
		{/if}
	</div>

	<button
		id="play_button"
		type="button"
		class="controls"
		on:click|self={async () => {
			toggle_element_pause(media_element);
		}}
		on:dblclick|self={() => {
			toggle_fullscreen(root_element);
		}}
	>
		<div class="controls_panel">
			<button
				type="button"
				class="toggle_pause"
				on:click={() => {
					toggle_element_pause(media_element);
				}}
			>
				<img src={paused ? play_arrow_icon : pause_icon} alt="fullscreen" />
			</button>
			<Timeline {time} {duration} />
			<button
				type="button"
				class="picture_in_picture"
				on:click={() => {
					toggle_picture_in_picture(media_element);
				}}
			>
				<img src={picture_in_picture_icon} alt="picture_in_picture" />
			</button>
			<button
				type="button"
				class="volume"
				on:click={() => {
					toggle_element_mute(media_element);
				}}
			>
				<img src={muted ? volume_off_icon : volume_up_icon} alt="fullscreen" />
			</button>
			<button
				type="button"
				class="fullscreen"
				on:click={() => {
					toggle_fullscreen(root_element);
				}}
			>
				<img src={is_fullscreen ? fullscreen_exit_icon : fullscreen_icon} alt="fullscreen" />
			</button>
		</div>
	</button>
</div>

<style>
	.mediaplayer {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;

		background-color: rgb(0 0 0);
		color: rgb(var(--on-surface));
	}
	.mediaplayer > * {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.mediaplayer > .media > * {
		object-fit: contain;
		position: absolute;
		width: 100%;
		height: 100%;
	}
	.mediaplayer > .controls {
		background: none;
	}

	.mediaplayer > .controls > .controls_panel {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;

		position: absolute;
		width: 100%;
		bottom: 0;
		box-shadow: 0 0 16px 16px rgb(var(--surface-900) / 30%);
		background-color: rgb(var(--surface-900) / 30%);
	}

	.mediaplayer > .controls > .controls_panel > button {
		appearance: none;
		background-color: transparent;
		color: rgb(var(--on-surface));
		background-image: none;
		height: 48px;
		width: 64px;
		display: grid;
		place-items: center;
	}

	.mediaplayer > .controls > .controls_panel > button > img {
		filter: invert(100%);
	}
</style>
