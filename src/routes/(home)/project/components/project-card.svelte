<script lang="ts">
	import TextField from '$components/textField.svelte';
	import TextArea from '$components/text-area.svelte';

	export let item: any;
	export let isDragged: boolean;
</script>

<!-- content -->
<div class={`flex flex-col gap-2 ${isDragged ? 'opacity-50' : ''}`}>
	<div>
		<TextField value={item.title} class="text-2xl" inputClass="bg-neutral-50" />
	</div>
	<TextArea value={item.description} class="bg-neutral-50" minimumHeight={30} />
	<div>
		<TextField value={item.link} class="" inputClass="bg-neutral-50" />
	</div>
	<div>
		<TextField value={item.youtubeLink} class="" inputClass="bg-neutral-50" />
	</div>
</div>
