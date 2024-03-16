import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './../$types';

// redirect if not authenticated
export async function load({ parent }: PageServerLoadEvent) {
	const parentsData = await parent();
	if (!parentsData.isAuthenticated) {
		redirect(307, '/login');
	}
}
