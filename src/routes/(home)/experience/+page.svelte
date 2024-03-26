<script lang="ts">
	import DraggableContainer from '$components/draggable-container.svelte';
	import SaveButtonWithConfirmation from '$components/save-button-with-confirmation.svelte';
	import Button from '$ui/button.svelte';
	export let data;
	import type { Experience } from '$types';
	import { writable } from 'svelte/store';
	import ExperienceCard from './components/experience-card.svelte';
	import { env } from '$env/dynamic/public';

	// store experiences in writable variable
	const experiencesWriteable = writable<Experience[]>(data.experiences.experiences);
	async function handleSaveButtonClick() {
		// TODO: update experiences
		await fetch(`${env.PUBLIC_BASE_BACKEND_URL}/restricted/update-all/experiences`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				Authorization: data.accessToken as string
			},
			body: JSON.stringify($experiencesWriteable)
		});
	}

	const newExperience = {
		title: 'New Experience',
		company: 'Company',
		startDate: '2021-01-01',
		endDate: '2021-01-01',
		description: 'Description'
	};
</script>

<div class="p-4 h-screen relative flex flex-col flex-grow">
	<!-- header -->
	<div class="flex justify-between mb-4">
		<!-- title -->
		<div class="text-3xl">experiences</div>
		<Button
			on:click={() => {
				$experiencesWriteable = [...$experiencesWriteable, newExperience];
			}}>Add experience</Button
		>
	</div>

	<!-- draggables' container -->
	<div class="max-h-full overflow-auto flex-grow mb-16">
		<DraggableContainer writeableVar={experiencesWriteable} let:index let:isDragged>
			<ExperienceCard writeableVar={experiencesWriteable} {index} {isDragged} />
		</DraggableContainer>
	</div>

	<!-- button container -->
	<SaveButtonWithConfirmation onConfirm={handleSaveButtonClick} />
</div>
