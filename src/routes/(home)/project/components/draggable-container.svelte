<script lang="ts">
	import { flip } from 'svelte/animate';
	import TextField from '$ui/text-field.svelte';
	import TextArea from '$ui/text-area.svelte';
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import type { Writable } from 'svelte/store';
	const dragDuration = 300;

	let draggedItem: any;
	let animatingItems = new Set();

	function swapWith(targetProject: any) {
		if (draggedItem === targetProject || animatingItems.has(targetProject)) return;
		animatingItems.add(targetProject);
		setTimeout(() => animatingItems.delete(targetProject), dragDuration);
		const projectAIndex = $writeableVar.indexOf(draggedItem);
		const projectBIndex = $writeableVar.indexOf(targetProject);
		$writeableVar[projectAIndex] = targetProject;
		$writeableVar[projectBIndex] = draggedItem;
	}
	export let writeableVar: Writable<any>;
</script>

<div class="flex flex-col gap-4">
	{#each $writeableVar as item, index (item)}
		<div
			animate:flip={{ duration: dragDuration }}
			class={`rounded-xl bg-neutral-50`}
			draggable="true"
			on:dragstart={() => {
				draggedItem = item;
			}}
			on:dragenter={() => swapWith(item)}
			on:dragend={() => (draggedItem = null)}
			role="presentation"
		>
			<!-- children -->
			<slot {index} {draggedItem} />

			<!-- svelte-ignore a11y-click-events-have-key-events -->
		</div>
	{/each}
</div>
