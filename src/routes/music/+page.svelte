<script>
	import SongBox from '../../lib/SongBox.svelte';
	import { Accordion } from 'flowbite-svelte';
	export let data;
</script>

<div id="main">
	Studio recordings are in the works, so here are some lyrics that you can't hear during our shows.
	<br />
	{#await data}
		Loading...
	{:then}
		<Accordion>
			{#each data.data as song}
				<SongBox data={song} />
			{/each}
		</Accordion>
	{/await}
</div>

<style>
	#main {
		padding: 1rem;
		text-align: center;
		max-width: 600px;
		margin: auto;
	}
</style>
