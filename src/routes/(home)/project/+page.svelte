<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { ConfirmationDialogConfig, isConfirmationDialogShown } from '$states';
	import DraggableContainer from './components/draggable-container.svelte';
	import ProjectCard from './components/project-card.svelte';
	import SaveButtonWithConfirmation from './components/save-button-with-confirmation.svelte';
	export let data;

	let projects = data.projects.projects;
	async function handleSaveButtonClick() {
		console.log('projects');
		let data = await fetch(env.PUBLIC_BASE_BACKEND_URL + '/projects');
		let response = await data.json();
		console.log(response);
	}
</script>

<div class="p-4 h-screen relative flex flex-col flex-grow">
	<!-- title -->
	<div class="text-3xl mb-4">Projects</div>

	<!-- draggables' container -->
	<div class="max-h-full overflow-auto flex-grow mb-16">
		<DraggableContainer let:item let:isDragged items={projects}>
			<ProjectCard {item} {isDragged} />
		</DraggableContainer>
	</div>
	<!-- button container -->
	<SaveButtonWithConfirmation onConfirm={handleSaveButtonClick} />
</div>
