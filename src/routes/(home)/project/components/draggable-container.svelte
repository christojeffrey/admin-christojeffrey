<script lang="ts">
	import { flip } from 'svelte/animate';
	import TextField from '$ui/text-field.svelte';
	import TextArea from '$ui/text-area.svelte';
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
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

	function onDelete(item: any) {
		items = items.filter((i) => i !== item);
	}
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

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class={`m-2 flex ${draggedItem && draggedItem === item ? 'opacity-50' : ''}`}>
				<div class="flex flex-col gap-2 flex-grow">
					<div>
						<TextField bind:value={item.title} class="text-2xl" inputClass="bg-neutral-50" />
					</div>
					<TextArea bind:value={item.description} class="bg-neutral-50" minimumHeight={30} />
					<div>
						<TextField bind:value={item.link} class="" inputClass="bg-neutral-50" />
					</div>
					<div>
						<TextField bind:value={item.youtubeLink} class="" inputClass="bg-neutral-50" />
					</div>
				</div>
				<!-- options -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="w-6 text-lg"
					on:click={() => {
						// setup confirmation dialog config
						ConfirmationDialogConfig.set({
							title: 'Delete Item',
							message: 'Are you sure you want to delete?',
							onConfirm: () => {
								onDelete(item);
							}
						});
						isConfirmationDialogShown.set(true);
					}}
				>
					d
				</div>
			</div>
		</div>
	{/each}
</div>
