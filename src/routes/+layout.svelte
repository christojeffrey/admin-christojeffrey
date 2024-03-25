<script>
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';
	import '../app.css';
</script>

<div class="flex flex-col h-screen w-screen">
	<ProgressBar color="#7F57F1" />
	<slot />
</div>
