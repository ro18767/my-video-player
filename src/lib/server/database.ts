import { CosmosClient } from '@azure/cosmos';
import { databaseId, containerId, endpoint, key } from './database.config';

async function get_conteiner() {
	const client = new CosmosClient({ endpoint, key });

	const { database } = await client.databases.createIfNotExists({ id: databaseId });
	// console.log(database.id);

	const { container } = await database.containers.createIfNotExists({
		id: containerId,
		partitionKey: {
			paths: ['/partitionKey']
		}
	});
	// console.log(container.id);
	return container;
}

export type VideoItem = {
	type: 'video';
	id: string;
	title: string;
	video_filename_extention: string;
};
export async function create_video(videoItem: VideoItem) {
	const container = await get_conteiner();

	await container.items.create(videoItem);
}
export async function get_video(id: string) {
	const container = await get_conteiner();
	const querIterator = await container.items.query<VideoItem>(
		{
			query: 'SELECT * from v WHERE v.type = @type AND v.id = @id',
			parameters: [
				{ name: '@type', value: 'video' },
				{ name: '@id', value: id }
			]
		},
		{
			maxItemCount: 1
		}
	);
	if (querIterator.hasMoreResults()) {
		const { resources: result } = await querIterator.fetchNext();
		querIterator.reset();
		return result[0] ?? null;
	}
	querIterator.reset();
	return null;
}
