import { env } from '$env/dynamic/public';
export async function load() {
	const experiences = await fetch(env.PUBLIC_BASE_BACKEND_URL + '/experiences').then((res) =>
		res.json()
	);

	return {
		experiences
	};
}
