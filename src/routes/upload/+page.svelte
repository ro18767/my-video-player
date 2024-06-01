<script lang="ts">
	import upload_file_icon from '$lib/assets/icons/Material/upload_file.svg';
	import { goto } from '$app/navigation';
	import FileDropzone from '$lib/components/mediaplayer/FileDropzone.svelte';

	let video_files: FileList;
	$: video = video_files?.[0];
	// $: console.log(video_files);
	let title = '';
	$: disabled = !(title.length && video);
	let load_promise: Promise<{ id: string }>;
</script>

<div class="page">
	<div class="page_content">
		<h1 class="h1">Uploading video</h1>
		<form
			on:submit|self|preventDefault={async (e) => {
				if (disabled) return;
				let formData = new FormData(e.currentTarget);

				load_promise = fetch('/api/v1/video', {
					body: formData,
					method: 'POST'
				}).then((respoce) => respoce.json());
				let { id } = await load_promise;
				goto(`/watch/${id}`);
			}}
		>
			<label class="label">
				<span>Video title <small>(required)</small></span>
				<input class="input" type="text" name="title" bind:value={title} />
			</label>

			<FileDropzone name="video" bind:files={video_files} accept="video/*" multiple={false}>
				<svelte:fragment slot="lead">
					<img class="upload_file_icon" src={upload_file_icon} alt="upload file" />
				</svelte:fragment>
				<svelte:fragment slot="meta">max file size 50 MB</svelte:fragment>
			</FileDropzone>

			{#if (video?.size ?? 0) > 50 * 1024 * 1024}
				<div class="error">Too Large. Please use file smaller size</div>
			{/if}
			{#await load_promise}
				<div>Uploading...</div>
			{:then _}
				<button class="submit" {disabled} type="submit">Upload</button>
			{:catch}
				<button class="submit" {disabled} type="submit">Upload</button>
				<div class="error">Network error try again</div>
			{/await}
		</form>
	</div>
</div>

<style>
	.page {
		background-color: rgb(var(--color-surface-500));
		color: rgb(var(--on-surface));
		height: 100vh;
		height: 100dvh;
		display: flex;
		justify-content: center;
		padding: 2rem;
	}
	.page_content {
		width: 100%;
		max-width: 80ch;
		display: flex;
		gap: 30px;
		flex-direction: column;
		min-height: 100%;
		justify-content: center;
	}
	.h1 {
		text-align: center;
		display: inline-block;
	}

	form {
		display: flex;
		flex-direction: column;
		text-align: center;
		row-gap: 1rem;
	}

	.label {
		display: block;
		text-align: start;
	}

	.input {
		font-family: inherit;
		font-feature-settings: inherit;
		font-variation-settings: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		color: inherit;
		margin: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border-radius: 0;
		padding: 0.5rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5rem;
		--tw-shadow: 0 0 #0000;
		width: 100%;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
			opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.2s;
		border-width: var(--theme-border-base);
		background-color: rgb(var(--color-surface-700));
		border-color: rgb(var(--color-surface-500));
		width: 100%;
	}
	.upload_file_icon {
		margin: 0 auto;
		width: 4rem;
	}
	.submit {
		font-family: inherit;
		font-feature-settings: inherit;
		font-variation-settings: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		margin: 0;
		text-transform: none;
		-webkit-appearance: button;
		background-image: none;
		cursor: pointer;
		font-size: 1rem;
		line-height: 1.5rem;
		padding-left: 1.25rem;
		padding-right: 1.25rem;
		padding-top: 9px;
		padding-bottom: 9px;
		white-space: nowrap;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.15s;
		background-color: rgb(var(--color-surface-50));
		color: rgb(var(--color-surface-900));
	}
	.error {
	}
</style>
