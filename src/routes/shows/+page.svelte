<script lang="ts">
	import { setlistsApi, showsApi } from '$lib/api';
	import ShowBox from '$lib/ShowBox.svelte';
	import { Accordion } from 'flowbite-svelte';

	let data: any[] = [];

	Promise.all([showsApi.getAll(), setlistsApi.getAll()]).then((res) => {
		const shows = res[0];
		const setlist = res[1];
		for (const row of shows) {
			let empty: { Setlist: typeof setlist } = { Setlist: [] };
			let show = Object.assign(row, empty);
			for (let i = setlist.length - 1; i >= 0; i--) {
				const song = setlist[i];
				if (song.show_id == show.id) {
					show.Setlist.unshift(setlist.splice(i, 1)[0]);
				}
			}
			data.push(show);
		}
		data = data;
	});
</script>

<div id="main">
	{#if data.length == 0}
		Loading...
	{:else}
		<Accordion>
			{#each data as show, i}
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
