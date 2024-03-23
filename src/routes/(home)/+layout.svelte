<script>
	import Sidebar from '$lib/sidebar.svelte';

	import { writable } from 'svelte/store';
	import ConfirmationDialog from '$components/confirmation-dialog.svelte';

	// global state
	export const showConfirmationDialog = writable(false);
</script>

<div class="flex h-full">
	<Sidebar />
	<!-- right primary container -->
	<slot />
	<!-- dialogs -->
	<ConfirmationDialog />
</div>
