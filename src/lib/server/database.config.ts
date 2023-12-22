import { env } from '$env/dynamic/private';
export const endpoint = env.DB_ENDPOINT;
export const key = env.DB_KEY

export const databaseId = 'ToDoList';
export const containerId = 'Items';
