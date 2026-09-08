<script lang="ts">
	import Bandcamp from '../../lib/icons/Bandcamp.svelte';
	import Spotify from '../../lib/icons/Spotify.svelte';
	import Youtube from '../../lib/icons/Youtube.svelte';
	import SongBox from '../../lib/SongBox.svelte';
	import { Accordion, Group } from 'flowbite-svelte';
	import { supabase } from '$lib/supabase';
	type GroupedData = Record<
		string,
		{
			cover: string;
			date: Date;
			spotify_link: string;
			youtube_link: string;
			bandcamp_link: string;
			songs: Array<any>;
		}
	>;
	let data: GroupedData = {};
	supabase
		.from('Songs')
		.select(
			'*, Release (release_name, release_date,album_cover, spotify_link, youtube_link, bandcamp_link)'
		)
		.order('song_name')
		.then((res) => {
			if (res.data == null) return;
			res.data.sort((a, b) => {
				if (a.Release && !b.Release) return -1;
				if (b.Release && !a.Release) return 1;
				if (a.Release && b.Release) {
					if (a.Release.release_date > b.Release.release_date) return -1;
					if (a.Release.release_date < b.Release.release_date) return 1;
					return a.track_order > b.track_order ? 1 : -1;
				}
				return a.song_name > b.song_name ? 1 : -1;
			});
			const groupedData: GroupedData = {};
			for (const row of res.data) {
				if (row.Release === null) {
					row.Release = { release_name: 'Unreleased' };
				}
				const release = row.Release.release_name;
				if (groupedData[release] == undefined)
					groupedData[release] = {
						cover: row.Release.album_cover,
						date: row.Release.release_date,
						bandcamp_link: row.Release.bandcamp_link,
						youtube_link: row.Release.youtube_link,
						spotify_link: row.Release.spotify_link,
						songs: []
					};
				groupedData[release].songs.push(row);
			}
			data = groupedData;
		});
</script>

<div id="main">
	<br />
	{#if Object.keys(data).length == 0}
		Loading...
	{:else}
		<table>
			{#each Object.entries(data) as [release, releaseData]}
				<tr>
					<td>
						<b>{release}</b>
						{#if releaseData.cover}
							<br />{releaseData.date}
							<br /><Bandcamp url={releaseData.bandcamp_link} />
							<Spotify url={releaseData.spotify_link} />
							<Youtube url={releaseData.youtube_link} />
							<br /><img alt="cover" class="albumCover" src={releaseData.cover} />
						{/if}
					</td>
					<td>
						<Accordion>
							{#each data[release].songs as song}
								<SongBox data={song} />
							{/each}
						</Accordion>
					</td>
				</tr>
			{/each}
		</table>
	{/if}
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
