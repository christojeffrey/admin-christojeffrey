<script lang="ts">
	import { onMount } from 'svelte';

	export let value: string = '';
	export let minimumHeight: number = 50;

	let textAreaElement: HTMLTextAreaElement;
	let placeholder = 'placeholder';


	function handleInput(event: Event) {
		value = (event.target as HTMLTextAreaElement).value;

		(event.target as HTMLTextAreaElement).style.height = '1px';
		(event.target as HTMLTextAreaElement).style.height =
			Math.max((event.target as HTMLTextAreaElement).scrollHeight, minimumHeight) + 'px';
	}
	// set height first time
	onMount(() => {
		textAreaElement.style.height = '1px';
		textAreaElement.style.height = Math.max(textAreaElement.scrollHeight, minimumHeight) + 'px';
	});
</script>

<textarea
	class={`${$$restProps.class} text-lg px-2 overflow-visible resize-none`}
	bind:this={textAreaElement}
	on:input={handleInput}
	on:load={handleInput}
	bind:value
	{placeholder}
></textarea>
