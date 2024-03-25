<script lang="ts">
	import DraggableContainer from './components/draggable-container.svelte';
	import SaveButtonWithConfirmation from './components/save-button-with-confirmation.svelte';
	import Button from '$ui/button.svelte';
	export let data;
	import type { Project } from '$types';
	import { writable } from 'svelte/store';
	import ProjectCard from './components/project-card.svelte';

	// store projects in writable variable
	const projects = writable<Project[]>(data.projects.projects);
	async function handleSaveButtonClick() {
		console.log('projects');
		console.log($projects);
		// TODO: update projects
	}
</script>

<div class="p-4 h-screen relative flex flex-col flex-grow">
	<!-- header -->
	<div class="flex justify-between mb-4">
		<!-- title -->
		<div class="text-3xl">Projects</div>
		<Button
			on:click={() => {
				projects.update((projects) => [
					...projects,
					{
						title: 'New Project',
						description: 'Description',
						youtubeLink: 'asdf'
					}
				]);
			}}>Add Project</Button
		>
	</div>

	<!-- draggables' container -->
	<div class="max-h-full overflow-auto flex-grow mb-16">
		<DraggableContainer writeableVar={projects} let:index let:draggedItem>
			<ProjectCard writeableVar={projects} {index} {draggedItem} />
		</DraggableContainer>
	</div>

	<!-- button container -->
	<SaveButtonWithConfirmation onConfirm={handleSaveButtonClick} />
</div>
