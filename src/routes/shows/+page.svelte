<script lang="ts">
	import ShowBox from '../../lib/ShowBox.svelte';
	import { Accordion } from 'flowbite-svelte';
	export let data: unknown;
</script>

<div id="main">
	{#await data}
		Loading...
	{:then}
		<Accordion>
			{#each data.data as show, i}
				<ShowBox data={show} index={i} />
			{/each}
		</Accordion>
	{/await}
</div>

<style>
	#main {
		width: calc(100% - 2rem);
		max-width: 600px;
		margin: auto;
	}
</style>
