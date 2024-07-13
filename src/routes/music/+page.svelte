<script lang="ts">
	import SongBox from '../../lib/SongBox.svelte';
	import { Accordion } from 'flowbite-svelte';
	export let data: {
		data: Record<string, { cover: string; date: Date; songs: Array<any> }>;
	};
</script>

<div id="main">
	<br />
	{#await data}
		Loading...
	{:then}
		<table>
			{#each Object.keys(data.data) as release}
				<tr>
					<td>
						<b>{release}</b>
						{#if data.data[release].cover}
							<br />{data.data[release].date}
							<br /><img alt="cover" class="albumCover" src={data.data[release].cover} />
						{/if}
					</td>
					<td>
						<Accordion>
							{#each data.data[release].songs as song}
								<SongBox data={song} />
							{/each}
						</Accordion>
					</td>
				</tr>
			{/each}
		</table>
	{/await}
</div>

<style>
	#main {
		padding: 1rem;
		text-align: center;
		max-width: 600px;
		margin: auto;
	}
	table {
		width: 100%;
	}
	td {
		vertical-align: top;
	}
	.albumCover {
		max-width: 10rem;
		max-height: 10rem;
	}
	td {
		padding-bottom: 1rem;
	}
</style>
