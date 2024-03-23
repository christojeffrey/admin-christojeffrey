<script lang="ts">
	import DraggableContainer from './components/draggable-container.svelte';
	import ProjectCard from './components/project-card.svelte';
	export let data;

	let projects = data.projects.projects;
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
	<div class="mr-4 mb-4 h-12 border-2 bg-blue-50 absolute bottom-0 right-0">
		<button> save </button>
	</div>
</div>
