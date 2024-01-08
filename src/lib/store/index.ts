import { persisted } from 'svelte-persisted-store';

export const likedVideoArr = persisted('likedVideoArr', [], {
	storage: 'local',
	syncTabs: true
	// serializer: devalue, // defaults to `JSON`
	// storage: 'local', // 'session' for sessionStorage, defaults to 'local'
	// syncTabs: true // choose wether to sync localStorage across tabs, default is true
	// onError: (e) => {/* Do something */} // Defaults to console.error with the error object
});
export const timelineVideoArr = persisted('timelineVideoArr', {}, {
	storage: 'local',
	syncTabs: true
	// serializer: devalue, // defaults to `JSON`
	// storage: 'local', // 'session' for sessionStorage, defaults to 'local'
	// syncTabs: true // choose wether to sync localStorage across tabs, default is true
	// onError: (e) => {/* Do something */} // Defaults to console.error with the error object
});
