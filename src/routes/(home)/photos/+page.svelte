<script lang="ts">
	import { env } from '$env/dynamic/public';

	import Button from '$ui/button.svelte';
	import axios from 'axios';
	let files: FileList;
	let showImage: boolean;
	let image: any;
	let placeholder: any;
	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(file);
		}
	}

	async function handleClick() {
		const body = new FormData();
		body.append('image', files[0]);

		// create axios request with onProgress
		const axiosRequest = await axios.post(
			`https://api.imgbb.com/1/upload?key=${env.PUBLIC_IMGBB_API_KEY}`,
			body,
			{
				onUploadProgress: (progressEvent) => {
					console.log(progressEvent.progress);
				}
			}
		);
		console.log(axiosRequest);
	}

	function onChange() {
		const file = files[0];

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

<div class="bg-neutral-100 flex-grow p-4">
	<div class="text-3xl">Photos</div>
	<!-- input file upload -->
	<label for="many">Upload multiple files of any type:</label>
	<input bind:files id="many" multiple type="file" on:change={onChange} />
	{#if files}
		<h2>Selected files:</h2>
		{#each Array.from(files) as file}
			<p>{file.name} ({file.size} bytes)</p>
		{/each}
		<div>
			<Button on:click={handleClick}>upload!</Button>
		</div>
		{#if showImage}
			<img bind:this={image} src="" alt="Preview" class="w-36" />
		{:else}
			<span bind:this={placeholder}>Image Preview</span>
		{/if}
	{/if}
</div>
