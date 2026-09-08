<script lang="ts">
	import { supabase } from '$lib/supabase';
	import ShowBox from '../../lib/ShowBox.svelte';
	import { Accordion } from 'flowbite-svelte';

	let data: any[] = [];
	supabase
		.from('Shows')
		.select('*,Setlist:id(*)')
		.order('date', { ascending: false })
		.order('song_order', { foreignTable: 'Setlist' })
		.then((res) => {
			if (res.data !== null) data = res.data;
		});
</script>

<div id="main">
	{#if data.length == 0}
		Loading...
	{:else}
		<Accordion>
			{#each data.data as show, i}
				<ShowBox data={show} index={i} />
			{/each}
		</Accordion>
	{/if}
</div>

<style>
	#main {
		width: calc(100% - 2rem);
		max-width: 600px;
		margin: auto;
	}
</style>
