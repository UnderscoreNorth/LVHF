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
			{#each data.data as show}
				<ShowBox data={show} />
			{/each}
		</Accordion>
	{/await}
</div>

<style>
	#main {
		margin: 1rem;
	}
</style>
