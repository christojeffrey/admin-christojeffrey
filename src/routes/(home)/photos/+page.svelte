<script lang="ts">
	import { env } from '$env/dynamic/public';
	import ImagePreview from './image-preview.svelte';
	import Button from '$ui/button.svelte';
	import axios from 'axios';
	import Gallery from './gallery.svelte';
	let files: FileList;
	let showImage: boolean;
	export let data;

	let form: any;

	let photos = data.photos.photos;

	let uploading = false;
	let isButtonDisabled = true;
	let progresses: string[] = [];

	$: {
		isButtonDisabled = files ? files.length === 0 : true;
	}
	async function handleClick() {
		uploading = true;
		isButtonDisabled = true;
		const responses = await Promise.all(
			Array.from(files).map(async (file: File, index: number) => {
				// create axios request with onProgress
				const body = new FormData();
				body.append('image', file);
				const axiosRequest = await axios.post(
					`https://api.imgbb.com/1/upload?key=${env.PUBLIC_IMGBB_API_KEY}`,
					body,
					{
						onUploadProgress: (progressEvent) => {
							console.log(progressEvent.progress);
							if (progressEvent.progress) {
								progresses[index] = `${Math.round(progressEvent.progress * 100)}%`;
							} else {
								progresses[index] = 'uploading...';
							}
						}
					}
				);
				progresses[index] = 'getting blur data...';
				const blurData = await axios.post(
					`/api/blur`,
					{
						url: axiosRequest.data.data.medium.url
					},
					{
						onUploadProgress: (progressEvent) => {
							console.log(progressEvent.progress);
							if (progressEvent.progress) {
								progresses[index] = `BD:${Math.round(progressEvent.progress * 100)}%`;
							} else {
								progresses[index] = 'BD:uploading...';
							}
						}
					}
				);
				console.log('blurData');

				return { uploadRespond: axiosRequest, blurBase64: blurData.data };
			})
		);

		let parsedResponse = responses.map((response) => {
			const data = response.uploadRespond.data.data;
			return {
				thumbnail: data.thumb,
				medium: data.medium,
				full: data.image,
				title: data.title,
				blurBase64: response.blurBase64
			};
		});

		let newPhotos = [...photos, ...parsedResponse];

		await fetch(`${env.PUBLIC_BASE_BACKEND_URL}/restricted/update-all/photos`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: data.accessToken as string
			},
			body: JSON.stringify(newPhotos)
		});
		// revalidate the cache
		await fetch('https://photos.christojeffrey.com/api/revalidate?tag=photos');
		// clear files
		photos = newPhotos;
		form.reset();
		files = null as any;
		uploading = false;
		console.log('done!');
	}
</script>

<div class=" flex-grow p-4 h-screen overflow-auto">
	<div class="text-3xl">Photos</div>
	<!-- input file upload -->
	<section class="max-h-[50vh] overflow-auto">
		<label for="many">Upload multiple files of any type:</label>
		<form bind:this={form}>
			<input bind:files id="many" multiple type="file" disabled={uploading} />
		</form>
		{#if files}
			<h2>Selected files:</h2>
			<div class="container">
				{#each Array.from(files) as file, index}
					<div class="box">
						<ImagePreview {file} {showImage} overlayText={progresses[index]} />
					</div>
				{/each}
			</div>
		{/if}
		<div>
			<Button on:click={handleClick} disabled={isButtonDisabled}>upload!</Button>
		</div>
	</section>

	<!-- galery -->
	<section>
		<Gallery bind:photos accessToken={data.accessToken || ''} />
	</section>
</div>

<style>
	.container {
		margin: 0 auto;
		width: 700px;
		-moz-column-count: 3;
		-webkit-column-count: 3;
		column-count: 3;
		-moz-column-gap: 10px;
		-webkit-column-gap: 10px;
		column-gap: 10px;
	}

	.box {
		border: 1px solid black;
		width: 100%;
		margin: 10px 0;
		display: inline-block;
		box-sizing: border-box;
	}
</style>
