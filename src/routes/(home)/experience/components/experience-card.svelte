<script lang="ts">
	import TextField from '$ui/text-field.svelte';
	import TextArea from '$ui/text-area.svelte';
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import type { Writable } from 'svelte/store';

	export let writeableVar: Writable<any>;
	export let index: number;
	export let isDragged: any;

	function onDelete() {
		$writeableVar = $writeableVar.filter((_: any, i: number) => i !== index);
	}
</script>

<div class={`m-2 flex ${isDragged ? 'opacity-50' : ''}`}>
	<div class="flex flex-col gap-2 flex-grow">
		<div>
			<TextField
				bind:value={$writeableVar[index].title}
				class="text-2xl"
				inputClass="bg-neutral-50"
			/>
		</div>
		<TextArea
			bind:value={$writeableVar[index].description}
			class="bg-neutral-50"
			minimumHeight={30}
		/>
		<div>
			<TextField bind:value={$writeableVar[index].link} class="" inputClass="bg-neutral-50" />
		</div>
		<div>
			<TextField
				bind:value={$writeableVar[index].youtubeLink}
				class=""
				inputClass="bg-neutral-50"
			/>
		</div>
	</div>
	<!-- options -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="w-6 text-lg"
		on:click={() => {
			// setup confirmation dialog config
			ConfirmationDialogConfig.set({
				title: 'Delete Item',
				message: 'Are you sure you want to delete?',
				onConfirm: () => {
					onDelete();
				}
			});
			isConfirmationDialogShown.set(true);
		}}
	>
		d
	</div>
</div>
