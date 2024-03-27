import { env } from '$env/dynamic/public';
export async function load() {
	const photos = await fetch(env.PUBLIC_BASE_BACKEND_URL + '/photos').then((res) => res.json());

	return {
		photos
	};
}
