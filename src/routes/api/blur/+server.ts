import { json } from '@sveltejs/kit';
import { getPlaiceholder } from 'plaiceholder';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST({ request }) {
	const { url } = await request.json();

	const buffer = await fetch(url).then(async (res) => await res.arrayBuffer());

	const { base64 } = await getPlaiceholder(buffer);
	return json(base64);
}
