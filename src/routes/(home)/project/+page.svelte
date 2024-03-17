<script lang="ts">
	import { flip } from 'svelte/animate';
	import TextField from '$components/textField.svelte';
	export let data;

	let projects = data.projects.projects;

	const dragDuration = 300;

	let draggedProject: any;
	let animatingProjects = new Set();

	function swapWith(targetProject: any) {
		if (draggedProject === targetProject || animatingProjects.has(targetProject)) return;
		animatingProjects.add(targetProject);
		setTimeout(() => animatingProjects.delete(targetProject), dragDuration);
		const projectAIndex = projects.indexOf(draggedProject);
		const projectBIndex = projects.indexOf(targetProject);
		projects[projectAIndex] = targetProject;
		projects[projectBIndex] = draggedProject;
	}
</script>

<div class="bg-neutral-100 flex-grow p-4 flex flex-col overflow-clip">
	<div class="text-3xl">Projects</div>

	<div class="border-2 flex-grow">
		container
		<!-- draggables' container -->
		<div>
			{#each projects as project (project)}
				<div
					animate:flip={{ duration: dragDuration }}
					class={`border-2 p-4 mb-4 `}
					draggable="true"
					on:dragstart={() => {
						draggedProject = project;
					}}
					on:dragenter={() => swapWith(project)}
					on:dragend={() => (draggedProject = null)}
					role="presentation"
				>
					<!-- content -->
					<div class={`${draggedProject && draggedProject === project ? 'opacity-50' : ''}`}>
						<TextField value={project.title} class="text-2xl" />
						<div class="text-lg">{project.description}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
