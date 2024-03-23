<script lang="ts">
	import { flip } from 'svelte/animate';

	const dragDuration = 300;

	let draggedItem: any;
	let animatingItems = new Set();

	function swapWith(targetProject: any) {
		if (draggedItem === targetProject || animatingItems.has(targetProject)) return;
		animatingItems.add(targetProject);
		setTimeout(() => animatingItems.delete(targetProject), dragDuration);
		const projectAIndex = items.indexOf(draggedItem);
		const projectBIndex = items.indexOf(targetProject);
		items[projectAIndex] = targetProject;
		items[projectBIndex] = draggedItem;
	}
	export let items: any[] = [];
</script>

<div class="flex flex-col gap-4">
	{#each items as item (item)}
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
			<slot {item} isDragged={draggedItem ? draggedItem === item : false} />
		</div>
	{/each}
</div>
