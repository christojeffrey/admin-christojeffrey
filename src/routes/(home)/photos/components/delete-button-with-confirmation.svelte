<script lang="ts">
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import Button from '$ui/button.svelte';

	export let onConfirm = () => {};
</script>

<div class="">
	<Button
		class="w-32"
		on:click={() => {
			// setup confirmation dialog config
			ConfirmationDialogConfig.set({
				title: 'Delete',
				message: 'Are you sure you want to delete?',
				onConfirm: () => {
					onConfirm();
				}
			});
			isConfirmationDialogShown.set(true);
		}}
	>
		Delete
	</Button>
</div>
