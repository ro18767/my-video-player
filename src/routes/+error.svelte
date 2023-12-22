<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message ?? 'Oops. Something gone wrong'}</h1>
