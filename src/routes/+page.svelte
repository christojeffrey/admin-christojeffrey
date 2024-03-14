<script>
	import Header from '$lib/Header.svelte';
	export let data;
</script>

<svelte:head>
	<title>Kinde Auth | SvelteKit Starter Kit</title>
</svelte:head>

<Header isAuthenticated={data.isAuthentication} user={data.userProfile} />
