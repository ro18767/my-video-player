import type { VideoItem } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params, url }) => {
	let api_url = new URL('/api/v1/video', url);
	api_url.searchParams.set('id', params.id);
	let videoItem: VideoItem = await fetch(api_url).then((response) => response.json());

	if (videoItem == null) {
		throw error(404, {
			message: 'Not found video'
		});
	}

	let { title } = videoItem;
	let src = `/video/${videoItem.id}.${videoItem.video_filename_extention}`;
	videoItem.title;
	return {
		title,
		src
	};
}) satisfies PageLoad;
