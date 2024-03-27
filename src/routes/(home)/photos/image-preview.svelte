<script lang="ts">
	export let file: File;
	export let showImage: boolean;
	export let overlayText: string = '';

	let image: any;
	let placeholder: any;
	$: {
		file && onChange();
	}
	function onChange() {
		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				image.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	}
</script>

<div class="relative">
	{#if showImage}
		<div class="relative">
			<img bind:this={image} src="" alt="Preview" class={`${overlayText && 'brightness-50'}`} />
			{#if overlayText}
				<div
					class="absolute top-0 left-0 w-full h-full text-white flex justify-center items-center"
				>
					<div>{overlayText}</div>
				</div>
			{/if}
		</div>
	{:else}
		<span bind:this={placeholder}>Image Preview</span>
	{/if}
</div>
