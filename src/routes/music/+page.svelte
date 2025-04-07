<script lang="ts">
	import Bandcamp from '../../lib/icons/Bandcamp.svelte';
	import Spotify from '../../lib/icons/Spotify.svelte';
	import Youtube from '../../lib/icons/Youtube.svelte'
	import SongBox from '../../lib/SongBox.svelte';
	import { Accordion } from 'flowbite-svelte';
	import {type GroupedData} from './groupedData'
	export let data: {
		data: GroupedData;
	};
	console.log(data)
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
							<br /><Bandcamp url={data.data[release].bandcamp_link}/>
							<Spotify url={data.data[release].spotify_link} />
							<Youtube url={data.data[release].youtube_link} />
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
