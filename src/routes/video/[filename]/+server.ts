import { error, fail, json } from '@sveltejs/kit';
import path from 'path';
import * as api_path from '../../../lib/server/path';
import fs from 'fs/promises';
import type { RequestHandler } from './$types';
import { create_video, get_video, type VideoItem } from '$lib/server/database';

export const GET: RequestHandler = async ({ request, setHeaders, params }) => {
	try {
		let { filename } = params;
		if (filename !== path.basename(filename))
			throw error(400, {
				message: 'not valid filename'
			});
		if (typeof filename !== 'string')
			throw error(400, {
				message: `id is ${typeof filename} but must be string`
			});
		path.basename;
		try {
			await fs.access(path.join(api_path.video, filename), fs.constants.F_OK);
		} catch (err) {
			throw error(404, {
				message: `not found file`
			});
		}
		
		let file = new File([await fs.readFile(path.join(api_path.video, filename))], filename, {
			type: `video/${path.extname(filename).slice(1)}`,
			lastModified:(await fs.stat(path.join(api_path.video, filename))).mtimeMs,
		});
		return new Response(file, {
			headers: {
				'Content-Type': file.type,
				'Content-Length': file.size.toString(),
				'Last-Modified': new Date(file.lastModified).toUTCString(),
				'Cache-Control': 'public, max-age=600'
			}
		});
	} catch (err) {
		throw fail(500, { err: err });
	}
};
