import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	);
	let user = null;
	if (isAuthenticated) {
		user = await kindeAuthClient.getUser(request as unknown as SessionManager);

		// const userOrganizations = await kindeAuthClient.getUserOrganizations(
		// 	request as unknown as SessionManager
		// );
		// const permission = await kindeAuthClient.getPermission(
		// 	request as unknown as SessionManager,
		// 	'read:profile'
		// );
		// const permissions = await kindeAuthClient.getPermissions(request as unknown as SessionManager);
		// const aud = await kindeAuthClient.getClaim(request as unknown as SessionManager, 'aud');

		// console.log({
		// 	isAuthentication,
		// 	userProfile,
		// 	userOrganizations,
		// 	permission,
		// 	permissions,
		// 	aud
		// });
	}

	// const config = await getConfiguration();

	// const apiInstance = new UsersApi(config);

	// const users = await apiInstance.getUsers();
	// console.log('users', users);

	return {
		isAuthenticated,
		user
	};
}
