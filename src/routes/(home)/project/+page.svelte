<script lang="ts">
	import { flip } from 'svelte/animate';
	import TextField from '$components/textField.svelte';
	import TextArea from '$components/text-area.svelte';
	import DraggableContainer from './components/draggable-container.svelte';
	import ProjectCard from './components/project-card.svelte';
	export let data;

	let projects = data.projects.projects;
</script>

<div class="p-4 flex flex-col overflow-clip flex-grow">
	<div class="text-3xl">Projects</div>

	<div>
		<!-- draggables' container -->
		<div class="my-4">
			<DraggableContainer let:item let:isDragged items={projects}>
				<ProjectCard {item} {isDragged} />
			</DraggableContainer>
		</div>
	</div>
</div>
