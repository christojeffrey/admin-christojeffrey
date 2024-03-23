import { env } from '$env/dynamic/public';
export async function load() {
	const projects = await fetch(env.PUBLIC_BASE_BACKEND_URL + '/projects').then((res) => res.json());

	return {
		projects
	};
}
