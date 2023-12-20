<script lang="ts">
	import Mediaplayer from '$lib/components/mediaplayer/Mediaplayer.svelte';
	import {
		fileOpen,
		supported,
		type FirstFileOpenOptions,
		type WellKnownDirectory
	} from 'browser-fs-access';
	import { onMount } from 'svelte';

	let src: string;

	function handle_drop(event: DragEvent) {
		// console.log('handle_drop');
		let files = event.dataTransfer?.files;
		if (!files) return;
		for (const file of Array.from(files)) {
			handle_file(file);
			break;
		}
	}
	function select_file() {
		const options: FirstFileOpenOptions<false> = {
			// List of allowed MIME types, defaults to `*/*`.
			mimeTypes: ['video/*'],
			multiple: false,
			description: 'Video files',
			startIn: 'videos' as WellKnownDirectory,
			excludeAcceptAllOption: true
		};

		fileOpen(options).then(handle_file).catch(console.error);
	}

	function handle_file(file: File) {
		// console.log('handle_file');

		URL.revokeObjectURL(src);
		src = URL.createObjectURL(file);
	}
	onMount(() => {
		window.launchQueue?.setConsumer?.((launchParams) => {
			async function setFileAsSource() {
				function isFileSystemFileHandle(file: FileSystemHandle): file is FileSystemFileHandle {
					return file.kind === 'file';
				}
				for (const file of launchParams.files) {
					if (isFileSystemFileHandle(file)) handle_file(await file.getFile());
					break;
				}
			}
			setFileAsSource();
		});
	});
</script>

<div class="grid">
	{#if src}
		<Mediaplayer {src} paused={true} />
	{:else if supported}
		<button
			on:dragenter|stopPropagation|preventDefault
			on:dragover|stopPropagation|preventDefault
			on:drop|preventDefault|stopPropagation={handle_drop}
			on:click={select_file}>Select file</button
		>
	{:else}
		<div>Your browser does not support core features</div>
	{/if}
</div>

<style>
	.grid {
		display: grid;
		height: 100vh;
		height: 100dvh;
	}
</style>
