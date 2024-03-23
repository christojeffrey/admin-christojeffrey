<!-- https://stackoverflow.com/questions/3392493/adjust-width-of-input-field-to-its-input -->
<script lang="ts">
	import type { FocusEventHandler, FormEventHandler } from 'svelte/elements';

	export let value = '';
	export let placeholder = 'placeholder';
	export let inputClass = '';
	let placeholderMode: boolean;

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		placeholderMode = false;
		value = (event.target as HTMLInputElement).value;
	};
	const handleFocusOut: FocusEventHandler<HTMLInputElement> = (event) => {
		if (value === '') {
			placeholderMode = true;
			value = placeholder;
		}
	};
	const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
		(event.target as HTMLInputElement).select();
	};
</script>

<div
	class={`${$$restProps.class} inline-block relative max-w-full overflow-clip whitespace-nowrap ${placeholderMode ? 'text-neutral-300' : ''}`}
>
	<span class={`${inputClass} p-2 text-ellipsis`}>
		{value}
	</span>
	<input
		class={`${inputClass} absolute left-0 right-0 bottom-0 top-0 p-2 text-ellipsis`}
		bind:value
		on:input={handleInput}
		on:focusin={handleFocus}
		on:focusout={handleFocusOut}
	/>
</div>
