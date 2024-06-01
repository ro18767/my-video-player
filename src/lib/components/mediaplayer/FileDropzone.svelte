<script lang="ts">
	/**
	 * Bind FileList to the file input.
	 * @type {FileList}
	 */
	export let files: FileList | undefined = undefined;
	/**
	 * File input reference.
	 */
	export let fileInput: HTMLInputElement | undefined = undefined;
	/**
	 * Required. Set a unique name for the file input.
	 * @type {string}
	 */
	export let name: string;
</script>

<div class="dropzone">
	<!-- Input: File (hidden) -->
	<!-- NOTE: keep `bind:files` here, unlike FileButton -->
	<input
		bind:files
		bind:this={fileInput}
		type="file"
		{name}
		class="dropzone-input"
		on:change
		on:dragenter
		on:dragover
		on:dragleave
		on:drop
		on:click
		on:keydown
		on:keyup
		on:keypress
		on:focus
		on:focusin
		on:focusout
		{...$$restProps}
	/>
	<!-- Interface -->
	<div class="dropzone-interface">
		<div class="dropzone-interface-text">
			<!-- Lead -->
			{#if $$slots.lead}<div class="dropzone-lead"><slot name="lead" /></div>{/if}
			<!-- Message -->
			<div class="dropzone-message">
				<slot name="message"><strong>Upload a file</strong> or drag and drop</slot>
			</div>
			<!-- Meta Text -->
			{#if $$slots.meta}<small class="dropzone-meta"><slot name="meta" /></small>{/if}
		</div>
	</div>
</div>

<style>
	.dropzone {
		width: 100%;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke,
			opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 0.2s;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-width: 2px;
		border-style: dashed;
		padding: 1rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
		border-radius: 0px;
		background-color: rgb(var(--color-surface-700));
		border-color: rgb(var(--color-surface-500));
	}
	.dropzone-input {
		font-family: inherit;
		font-feature-settings: inherit;
		font-variation-settings: inherit;
		font-weight: inherit;
		letter-spacing: inherit;
		color: inherit;
		margin: 0px;
		font-size: unset;
		line-height: inherit;
		background: unset;
		border-color: inherit;
		border-width: 0px;
		border-radius: 0px;
		padding: 0px;
		position: absolute;
		inset: 0px;
		z-index: 1;
		width: 100%;
		cursor: pointer;
		opacity: 0;
	}
	.dropzone-interface {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.dropzone-interface-text {
	}
	.dropzone-lead {
		margin-bottom: 1rem;
	}
	.dropzone-message {
	}
	.dropzone-meta {
		opacity: 0.75;
	}
</style>
