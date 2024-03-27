<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	{disabled}
	on:click
	class={`${$$restProps.class} p-2 text-lg font-semibold bg-slate-100 hover:bg-slate-300 h-12 rounded-xl ${disabled ? 'cursor-not-allowed text-neutral-400' : 'cursor-pointer'}`}
>
	<slot />
</button>
