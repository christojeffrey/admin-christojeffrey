<script lang="ts">
	export let closeOnClickOutside = true;
	export let onClose = () => {};
</script>

<div class="absolute h-screen w-screen flex justify-center items-center">
	<!-- background -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-screen h-screen bg-black opacity-10"
		on:click={() => {
			if (closeOnClickOutside) onClose();
		}}
	/>
	<!-- dialog -->
	<div class={`${$$restProps.class} absolute w-[50vw] min-h-[25vh] bg-white rounded-3xl p-4`}>
		<slot />
	</div>
</div>
