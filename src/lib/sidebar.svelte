<script>
	let sideOptions = [
		{
			name: 'Projects',
			path: '/project'
		},
		{
			name: 'Experience',
			path: '/experience'
		},
		{
			name: 'Photos',
			path: '/photos'
		}
	];
	let generalOptions = [
		{
			name: 'Logout',
			path: '/logout'
		}
	];
</script>

<!-- left sidebar -->
<div class="bg-neutral-200 p-4 w-48">
	<!-- heading -->
	<div class="text-center">
		<div class="text-3xl font-bold">admin</div>
		<div class="text-sm">christojeffrey</div>
	</div>
	<!-- options -->
	<div class="my-4 text-sm">Options</div>
	{#each sideOptions as option}
		<a href={option.path}>
			<div class="text-xl my-1 ml-4">{option.name}</div>
		</a>
	{/each}
	<div class="my-4 text-sm">General</div>
	{#each generalOptions as option}
		<a href={option.path}>
			<div class="text-xl my-1 ml-4">{option.name}</div>
		</a>
	{/each}
</div>
