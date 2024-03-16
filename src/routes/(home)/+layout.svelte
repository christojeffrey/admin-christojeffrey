<script>
	import Sidebar from '$lib/sidebar.svelte';
</script>

<div class="flex h-full">
	<Sidebar />
	<!-- right primary container -->
	<slot />
</div>
