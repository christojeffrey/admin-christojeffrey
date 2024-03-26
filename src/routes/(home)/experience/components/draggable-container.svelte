<script lang="ts">
	import { flip } from 'svelte/animate';
	import type { Writable } from 'svelte/store';
	const dragDuration = 300;

	let draggedItemIndex: any;
	let animatingItems = new Set();

	function swapWith(targetItemIndex: any) {
		if (draggedItemIndex === targetItemIndex || animatingItems.has(targetItemIndex)) return;
		animatingItems.add(targetItemIndex);
		setTimeout(() => animatingItems.delete(targetItemIndex), dragDuration);
		// const projectAIndex = $writeableVar.indexOf(draggedItemIndex);
		// const projectBIndex = $writeableVar.indexOf(targetItemIndex);
		$writeableVar[draggedItemIndex] = $writeableVar[targetItemIndex];
		$writeableVar[targetItemIndex] = $writeableVar[draggedItemIndex];
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
				draggedItemIndex = index;
			}}
			on:dragenter={() => {
				swapWith(index);
			}}
			on:dragend={() => (draggedItemIndex = null)}
			role="presentation"
		>
			<!-- children -->
			<slot {index} {draggedItemIndex} />

			<!-- svelte-ignore a11y-click-events-have-key-events -->
		</div>
	{/each}
</div>
