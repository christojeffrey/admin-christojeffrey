<script lang="ts">
	import { env } from '$env/dynamic/public';

	import Button from '$ui/button.svelte';
	import axios from 'axios';
	let files: FileList;

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

		const result = await fetch(`https://api.imgbb.com/1/upload?key=${env.PUBLIC_IMGBB_API_KEY}`, {
			method: 'POST',
			body
		}).then((result) => result.json());
	}
</script>

<div class="bg-neutral-100 flex-grow p-4">
	<div class="text-3xl">Photos</div>
	<!-- input file upload -->
	<label for="many">Upload multiple files of any type:</label>
	<input bind:files id="many" multiple type="file" />
	{#if files}
		<h2>Selected files:</h2>
		{#each Array.from(files) as file}
			<p>{file.name} ({file.size} bytes)</p>
		{/each}
		<div>
			<Button on:click={handleClick}>upload!</Button>
		</div>
	{/if}
</div>
