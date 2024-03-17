import { env } from '$env/dynamic/private';
export async function load() {
	const projects = await fetch(env.BASE_BACKEND_URL + '/projects').then((res) => res.json());

	return {
		projects
	};
}
