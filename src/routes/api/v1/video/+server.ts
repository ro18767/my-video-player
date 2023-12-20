import { error, fail, json } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs/promises';
import type { RequestHandler } from './$types';
import { create_video, get_video, type VideoItem } from '$lib/server/database';

export const GET: RequestHandler = async ({ request }) => {
	let { id } = Object.fromEntries(new URL(request.url).searchParams.entries());
	if (id == null)
		throw error(400, {
			message: 'not found id'
		});
	if (typeof id !== 'string')
		throw error(400, {
			message: `id is ${typeof id} but must be string`
		});
	try {
		return json(await get_video(id));
	} catch (err) {
		console.log(err)
		throw fail(500, { err: err });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	let { video, title } = Object.fromEntries(await request.formData());
	if (title == null) {
		title = new Date().toJSON();
		// throw error(400, {
		// 	message: 'not found title'
		// });
	}
	if (typeof title !== 'string') {
		title = new Date().toJSON();
		// throw error(400, {
		// 	message: 'video is file but must be string'
		// });
	}
	if (video == null)
		throw error(400, {
			message: 'not found video file'
		});
	if (typeof video === 'string')
		throw error(400, {
			message: 'video is string but must be file'
		});
	if (!video.type.startsWith('video/'))
		throw error(400, {
			message: 'video  has incorect format'
		});
	try {
		let videoItem: VideoItem = {
			id: crypto.randomUUID(),
			type: 'video',
			title: title || new Date().toJSON(),
			video_filename_extention: video.type.split('/')[1] ?? ''
		};
		const filePath = path.join(
			process.cwd(),
			'static',
			'video',
			`${videoItem.id}.${videoItem.video_filename_extention}`
		);
		await fs.writeFile(filePath, Buffer.from(await video.arrayBuffer()));

		await create_video(videoItem);

		// console.log(videoItem);
		return json(videoItem);
	} catch (err) {
		throw fail(500, { err: err });
	}
};
