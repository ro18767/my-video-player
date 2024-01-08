<script lang="ts">
	import { goto } from '$app/navigation';

	let video_files: FileList;
	$: video = video_files?.[0];
	// $: console.log(video_files);
	let title = '';
	$: disabled = !(title.length && video);
</script>

<main>
	<h1>Uploading video</h1>
	<form
		on:submit|self|preventDefault={async (e) => {
			if (disabled) return;
			let formData = new FormData(e.currentTarget);

			let { id } = await fetch('/api/v1/video', {
				body: formData,
				method: 'POST'
			}).then((respoce) => respoce.json());
			goto(`/watch/${id}`);
		}}
	>
		<label for="title">Video title:</label>
		<input type="text" id="title" name="title" bind:value={title} />
		<label for="video">Select video:</label>
		<input
			type="file"
			id="video"
			name="video"
			accept="video/*"
			multiple={false}
			bind:files={video_files}
		/>
		<button {disabled} type="submit">Upload</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		margin: 2em;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		margin-bottom: 0.5em;
	}

	input {
		margin-bottom: 1em;
	}
	input[type='text'] {
		border: 1px solid rgb(var(--primary));
		color: rgb(var(--on-primary));
	}
</style>
