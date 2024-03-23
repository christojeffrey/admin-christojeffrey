import { writable } from 'svelte/store';

export const isConfirmationDialogShown = writable(false);
export const ConfirmationDialogConfig = writable({
	title: '',
	message: '',
	onConfirm: () => {}
});
