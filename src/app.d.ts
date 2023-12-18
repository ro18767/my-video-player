/// <reference types="svelte-adapter-azure-swa" />
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface LaunchParams {
		files: FileSystemHandle[];
		targetURL: string;
	}
	interface Window {
		launchQueue: {
			setConsumer(callback: (launchParams: LaunchParams) => void): void;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
