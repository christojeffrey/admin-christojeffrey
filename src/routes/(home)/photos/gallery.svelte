<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Photos from './photos.svelte';
	export let photos: any[];
	export let accessToken: string;

	let handleDelete = async (photoIndex: number) => {
		const newPhotos = photos.filter((photo, index) => index !== photoIndex);
		await fetch(`${env.PUBLIC_BASE_BACKEND_URL}/restricted/update-all/photos`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: accessToken
			},
			body: JSON.stringify(newPhotos)
		});

		photos = newPhotos;
	};
</script>

<!-- render all photos -->
<div class="container">
	{#each photos as photo, index}
		<Photos
			{photo}
			onDelete={() => {
				handleDelete(index);
			}}
		/>
	{/each}
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
</style>
