<script>
	import '$lib/styles/styles.css';
</script>

<main>
	<!-- +page.svelte is rendered in this <slot> -->
	<slot />
</main>

<style>
	main {
		display: grid;
	}
</style>