<script lang="ts">
	export let data;
</script>

<div class="h-screen flex flex-col items-center justify-center">
	<h1 class="">admin christojeffrey</h1>
	{#if data.isAuthenticated}
		<div class="profile-blob">
			<div class="avatar">
				{data.user?.given_name}
			</div>
			<div>
				<p class="text-heading-2 text-capitalize">
					{data.user?.given_name}
					{data.user?.family_name}
				</p>
				<a class="text-subtle" href="/api/auth/logout"> Sign out </a>
			</div>
		</div>
	{:else}
		<div>
			<a class="btn btn-ghost sign-in-btn" href="/api/auth/login"> Sign in </a>
		</div>
	{/if}
</div>
