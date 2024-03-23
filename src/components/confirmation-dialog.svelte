<script>
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import Button from '$ui/button.svelte';
	import Dialog from '$ui/dialog.svelte';
	import Heading from '$ui/heading.svelte';

	function handleClose() {
		isConfirmationDialogShown.set(false);
	}
</script>

{#if $isConfirmationDialogShown}
	<Dialog onClose={handleClose} closeOnClickOutside={true} class="flex flex-col justify-between">
		<!-- text -->
		<div>
			<Heading>
				{$ConfirmationDialogConfig.title}
			</Heading>
			<p class="text-xl">
				{$ConfirmationDialogConfig.message}
			</p>
		</div>
		<!-- buttons -->
		<div class="flex justify-between gap-4">
			<Button
				class="flex-grow"
				on:click={() => {
					$ConfirmationDialogConfig.onConfirm();
					handleClose();
				}}
			>
				confirm!
			</Button>
		</div>
	</Dialog>
{/if}
