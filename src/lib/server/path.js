import path from 'path';
import fs from 'fs';

export const video = path.join(process.cwd(), 'static', 'video');

if (!fs.existsSync(video)) {
	fs.mkdirSync(video, {
		recursive: true
	});
}
