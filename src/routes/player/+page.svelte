<script lang="ts">
	import { onMount } from 'svelte';

	let media_element: HTMLVideoElement;
	let src: string;
	function toggle_fullscreen() {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
	}
	function toggle_pause(element: HTMLMediaElement) {
		if (element.paused) {
			element.play();
		} else {
			element.pause();
		}
	}
	function toggle_picture_in_picture(element: HTMLVideoElement) {
		if (document.pictureInPictureElement) {
			document.exitPictureInPicture();
		} else if (document.pictureInPictureEnabled) {
			element.requestPictureInPicture();
		}
	}
	function handle_drop(event: DragEvent) {
		console.log('handle_drop');
		let files = event.dataTransfer?.files;
		if (!files) return;
		for (const file of files) {
			handle_file(file);
			break;
		}
	}

	function handle_file(file: File) {
		console.log('handle_file');

		URL.revokeObjectURL(src);
		src = URL.createObjectURL(file);

		console.log('src', src);
	}
	onMount(() => {
		window.launchQueue.setConsumer(async (launchParams) => {
			function isFileSystemFileHandle(file: FileSystemHandle): file is FileSystemFileHandle {
				return file.kind === 'file';
			}
			for (const file of launchParams.files) {
				if (isFileSystemFileHandle(file)) handle_file(await file.getFile());
				break;
			}
		});
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="mediaplayer"
	on:dragenter|stopPropagation|preventDefault
	on:dragover|stopPropagation|preventDefault
	on:drop|preventDefault|stopPropagation={handle_drop}
>
	<div class="media">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video {src} crossorigin="anonymous" bind:this={media_element} />
	</div>

	<button
		type="button"
		class="controls"
		on:click|self={() => {
			toggle_pause(media_element);
		}}
		on:dblclick|self={toggle_fullscreen}
	>
		<div class="controls_panel">
			<button
				type="button"
				class="picture_in_picture"
				on:click={() => {
					toggle_picture_in_picture(media_element);
				}}>picture_in_picture</button
			>
			<button type="button" class="volume">volume</button>
			<button type="button" class="fullscreen" on:click={toggle_fullscreen}>fullscreen</button>
		</div>
	</button>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		border: 0;
		padding: 0;
	}
	:global(html),
	:global(body) {
		width: 100%;
		height: 100%;

		background-color: #121212;
	}

	.mediaplayer {
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		& * {
			display: block;
		}
		& > * {
			position: absolute;
			inset: 0;
		}
		& > .media {
			& > * {
				object-fit: contain;
				position: absolute;
				width: 100%;
				height: 100%;
			}
		}
		& > .controls {
			background: none;
			& > .controls_panel {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;

				position: absolute;
				width: 100%;
				bottom: 0;
				& > * {
					height: 48px;
					width: 64px;
				}
			}
		}
	}
</style>
