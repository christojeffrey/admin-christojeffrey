<script lang="ts">
	import DraggableContainer from './components/draggable-container.svelte';
	import SaveButtonWithConfirmation from './components/save-button-with-confirmation.svelte';
	import Button from '$ui/button.svelte';
	export let data;
	import type { Experience } from '$types';
	import { writable } from 'svelte/store';
	import ExperienceCard from './components/experience-card.svelte';
	import { env } from '$env/dynamic/public';

	// store experiences in writable variable
	const experiencesWriteable = writable<Experience[]>(data.experiences.experiences);
	async function handleSaveButtonClick() {
		console.log($experiencesWriteable);
		// TODO: update experiences
		await fetch(`${env.PUBLIC_BASE_BACKEND_URL}/restricted/update-all/experiences`, {
			method: 'POST',
			headers: {
				Authentication: data.accessToken as string
			},
			body: JSON.stringify({ experiences: $experiencesWriteable })
		});
	}
</script>

<div class="p-4 h-screen relative flex flex-col flex-grow">
	<!-- header -->
	<div class="flex justify-between mb-4">
		<!-- title -->
		<div class="text-3xl">experiences</div>
		<Button
			on:click={() => {
				$experiencesWriteable = [
					...$experiencesWriteable,
					{
						title: 'New experience',
						description: 'Description',
						youtubeLink: 'asdf'
					}
				];
			}}>Add experience</Button
		>
	</div>

	<!-- draggables' container -->
	<div class="max-h-full overflow-auto flex-grow mb-16">
		<DraggableContainer writeableVar={experiencesWriteable} let:index let:draggedItemIndex>
			<ExperienceCard writeableVar={experiencesWriteable} {index} {draggedItemIndex} />
		</DraggableContainer>
	</div>

	<!-- button container -->
	<SaveButtonWithConfirmation onConfirm={handleSaveButtonClick} />
</div>
