<script lang="ts">
	import Bandcamp from '../../lib/icons/Bandcamp.svelte';
	import Spotify from '../../lib/icons/Spotify.svelte';
	import Youtube from '../../lib/icons/Youtube.svelte';
	import SongBox from '../../lib/SongBox.svelte';
	import { Accordion, Group } from 'flowbite-svelte';
	import { releaseApi, songsApi } from '$lib/api';
	type GroupedData = Record<
		string,
		{
			cover?: string;
			date?: string;
			spotify_link?: string;
			youtube_link?: string;
			bandcamp_link?: string;
			songs: Array<any>;
		}
	>;
	let data: GroupedData = {};
	Promise.all([songsApi.getAll(), releaseApi.getAll()]).then((res) => {
		const songs = res[0];
		const releases = res[1];
		const releaseMap: Record<number, string> = {};
		for (const release of releases) {
			data[release.release_name] = {
				cover: release.album_cover,
				date: release.release_date,
				spotify_link: release.spotify_link,
				youtube_link: release.youtube_link,
				bandcamp_link: release.bandcamp_link,
				songs: []
			};
			releaseMap[release.id] = release.release_name;
		}
		data['Unreleased'] = {
			songs: []
		};
		for (const song of songs) {
			const releaseName = song.release_id ? releaseMap[song.release_id] : 'Unreleased';
			data[releaseName].songs.push(song);
		}
		data['Unreleased'].songs = data['Unreleased'].songs.sort((a, b) => {
			return a.song_name > b.song_name ? 1 : -1;
		});
	});
</script>

<div id="main">
	<br />
	{#if Object.keys(data).length == 0}
		Loading...
	{:else}
		{#each Object.entries(data) as [release, releaseData]}
			<div class="releaseBox">
				<div class="release">
					<b>{release}</b>
					{#if releaseData.cover}
						<br />{releaseData.date}
						<br /><Bandcamp url={releaseData.bandcamp_link} />
						<Spotify url={releaseData.spotify_link} />
						<Youtube url={releaseData.youtube_link} />
						<br /><img alt="cover" class="albumCover" src={releaseData.cover} />
					{/if}
				</div>
				<div class="songBox">
					<Accordion>
						{#each data[release].songs as song}
							<SongBox data={song} />
						{/each}
					</Accordion>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	#main {
		padding: 1rem;
		text-align: center;
		max-width: 600px;
		margin: auto;
	}
	.releaseBox {
		margin-bottom: 3rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
	.albumCover {
		max-width: 15rem;
		max-height: 15rem;
	}
	@media (max-width: 1000px) {
		.albumCover {
			max-width: 80%;
			max-height: none;
		}
		.releaseBox {
			display: block;
		}
	}
</style>
