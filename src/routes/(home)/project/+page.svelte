<script lang="ts">
	import DraggableContainer from './components/draggable-container.svelte';
	import SaveButtonWithConfirmation from './components/save-button-with-confirmation.svelte';
	import Button from '$ui/button.svelte';
	export let data;

	let projects = data.projects.projects;
	async function handleSaveButtonClick() {
		console.log('projects');
		console.log(projects);
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
				projects = [{ title: '', description: '', link: '', youtubeLink: '' }, ...projects];
			}}>Add Project</Button
		>
	</div>

	<!-- draggables' container -->
	<div class="max-h-full overflow-auto flex-grow mb-16">
		<DraggableContainer bind:items={projects}></DraggableContainer>
	</div>

	<!-- button container -->
	<SaveButtonWithConfirmation onConfirm={handleSaveButtonClick} />
</div>
