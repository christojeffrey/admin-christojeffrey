<script lang="ts">
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import Button from '$ui/button.svelte';
	export let onConfirm = () => {};
</script>

<div class="mr-4 mb-4 h-12 absolute bottom-0 right-0">
	<Button
		class="w-32"
		on:click={() => {
			// setup confirmation dialog config
			ConfirmationDialogConfig.set({
				title: 'Save',
				message: 'Are you sure you want to save?',
				onConfirm: () => {
					onConfirm();
				}
			});
			isConfirmationDialogShown.set(true);
		}}
	>
		save
	</Button>
</div>
