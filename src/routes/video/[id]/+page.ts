import { base } from '$app/paths';
import type { VideoItem } from '$lib/server/database';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params, url }) => {
	let api_url = new URL('/core/v1/video', url);
	api_url.searchParams.set('id', params.id);
	let videoItem: VideoItem = await fetch(api_url).then((response) => response.json());
	let { title } = videoItem;
	let src = `/video/${videoItem.id}.${videoItem.video_filename_extention}`;
	videoItem.title;
	return {
		title,
		src
	};
}) satisfies PageLoad;

export const ssr = false;

export const csr = true;

export const prerender = false;
