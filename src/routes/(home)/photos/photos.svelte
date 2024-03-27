<script lang="ts">
	import Button from '$ui/button.svelte';

	export let photo: any;
	export let onDelete: (photo: any) => void;

	let showOverlay = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="box">
	<!-- on hover, add overlay -->
	<div
		class="relative"
		on:mouseover={() => {
			showOverlay = true;
		}}
		on:mouseleave={() => {
			showOverlay = false;
		}}
	>
		<img src={photo.thumbnail.url} alt={photo.name} class={`${showOverlay && 'brightness-50'}`} />
		{#if showOverlay}
			<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
				<div>
					<Button on:click={onDelete}>delete</Button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.box {
		border: 1px solid black;
		margin: 10px 0;
		display: inline-block;
		box-sizing: border-box;
	}
</style>
