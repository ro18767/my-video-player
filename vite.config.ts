import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	// worker: {
	// 	plugins: [sveltekit()],
	// 	format: 'es'
	// },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
