<script lang="ts">
	import { onMount } from 'svelte';
	import { blogApi, releaseApi, setlistsApi, showsApi, songsApi } from '$lib/api';
	import type { InferSelectModel } from 'drizzle-orm';
	import type { blog, release, setlists, shows, songs } from '$lib/db/tables';

	type BlogRow = InferSelectModel<typeof blog> | { id: null; content: string; date: string };
	type ReleaseRow =
		| InferSelectModel<typeof release>
		| {
				id: null;
				release_name: string;
				release_date: string;
				album_cover: string;
				spotify_link: string;
				youtube_link: string;
				bandcamp_link: string;
		  };
	type SetlistRow =
		| InferSelectModel<typeof setlists>
		| { id: null; show_id: number | null; song_order: number | null; song_name: string };
	type ShowRow =
		| InferSelectModel<typeof shows>
		| {
				id: null;
				date: string;
				venue: string;
				venue_link: string;
				poster: string;
				event_link: string;
				city: string;
				province: string;
				video_link: string;
		  };
	type SongRow =
		| InferSelectModel<typeof songs>
		| {
				id: null;
				song_name: string;
				lyrics: string;
				release_id: number | null;
				track_order: number | null;
		  };

	let selectedTable: 'blog' | 'release' | 'setlists' | 'shows' | 'songs' = 'shows';

	let blogData: BlogRow[] = [];
	let releaseData: ReleaseRow[] = [];
	let setlistsData: SetlistRow[] = [];
	let showsData: ShowRow[] = [];
	let songsData: SongRow[] = [];

	onMount(async () => {
		await loadAllData();
	});

	async function loadAllData() {
		await Promise.all([
			loadBlogData(),
			loadReleaseData(),
			loadSetlistsData(),
			loadShowsData(),
			loadSongsData()
		]);
	}

	async function loadBlogData() {
		const data = await blogApi.getAll();
		blogData = [createEmptyBlogRow(), ...data];
	}

	async function loadReleaseData() {
		const data = await releaseApi.getAll();
		releaseData = [createEmptyReleaseRow(), ...data];
	}

	async function loadSetlistsData() {
		const data = (await setlistsApi.getAll()).sort((a, b) => a.id - b.id);
		setlistsData = [createEmptySetlistRow(), ...data];
	}

	async function loadShowsData() {
		const data = await showsApi.getAll();
		showsData = [createEmptyShowRow(), ...data];
	}

	async function loadSongsData() {
		const data = await songsApi.getAll();
		songsData = [createEmptySongRow(), ...data];
	}

	function createEmptyBlogRow(): BlogRow {
		return { id: null, content: '', date: '' };
	}

	function createEmptyReleaseRow(): ReleaseRow {
		return {
			id: null,
			release_name: '',
			release_date: '',
			album_cover: '',
			spotify_link: '',
			youtube_link: '',
			bandcamp_link: ''
		};
	}

	function createEmptySetlistRow(): SetlistRow {
		return { id: null, show_id: null, song_order: null, song_name: '' };
	}

	function createEmptyShowRow(): ShowRow {
		return {
			id: null,
			date: '',
			venue: '',
			venue_link: '',
			poster: '',
			event_link: '',
			city: '',
			province: '',
			video_link: ''
		};
	}

	function createEmptySongRow(): SongRow {
		return { id: null, song_name: '', lyrics: '', release_id: null, track_order: null };
	}

	function isRowEmpty(row: any): boolean {
		const keys = Object.keys(row).filter((k) => k !== 'id');
		return keys.every((key) => {
			const val = row[key];
			return val === null || val === '' || val === undefined;
		});
	}

	async function handleRowBlur(row: any, table: string, index: number) {
		console.log(row, table, index);
		if (isRowEmpty(row)) {
			return; // Don't save empty rows
		}

		const { id, ...data } = row;

		if (id === null) {
			// Create new entry
			let result;
			switch (table) {
				case 'blog':
					result = (await blogApi.create(data)) as BlogRow;
					blogData[index] = result;
					blogData = [...blogData, createEmptyBlogRow()];
					break;
				case 'release':
					result = (await releaseApi.create(data)) as ReleaseRow;
					releaseData[index] = result;
					releaseData = [...releaseData, createEmptyReleaseRow()];
					break;
				case 'setlists':
					result = (await setlistsApi.create(data)) as SetlistRow;
					setlistsData[index] = result;
					setlistsData = [...setlistsData, createEmptySetlistRow()];
					break;
				case 'shows':
					result = (await showsApi.create(data)) as ShowRow;
					showsData[index] = result;
					showsData = [...showsData, createEmptyShowRow()];
					break;
				case 'songs':
					result = (await songsApi.create(data)) as SongRow;
					songsData[index] = result;
					songsData = [...songsData, createEmptySongRow()];
					break;
			}
		} else {
			// Update existing entry
			switch (table) {
				case 'blog':
					await blogApi.update(id, data);
					break;
				case 'release':
					await releaseApi.update(id, data);
					break;
				case 'setlists':
					await setlistsApi.update(id, data);
					break;
				case 'shows':
					await showsApi.update(id, data);
					break;
				case 'songs':
					await songsApi.update(id, data);
					break;
			}
		}
	}

	async function deleteRow(id: number | null, table: string) {
		if (id === null) return;

		if (!confirm('Are you sure you want to delete this row?')) return;

		switch (table) {
			case 'blog':
				await blogApi.delete(id);
				await loadBlogData();
				break;
			case 'release':
				await releaseApi.delete(id);
				await loadReleaseData();
				break;
			case 'setlists':
				await setlistsApi.delete(id);
				await loadSetlistsData();
				break;
			case 'shows':
				await showsApi.delete(id);
				await loadShowsData();
				break;
			case 'songs':
				await songsApi.delete(id);
				await loadSongsData();
				break;
		}
	}
</script>

<div class="container">
	<h1>Update Database</h1>

	<div class="table-selector">
		<button class:active={selectedTable === 'blog'} on:click={() => (selectedTable = 'blog')}
			>Blog</button
		>
		<button class:active={selectedTable === 'release'} on:click={() => (selectedTable = 'release')}
			>Releases</button
		>
		<button
			class:active={selectedTable === 'setlists'}
			on:click={() => (selectedTable = 'setlists')}>Setlists</button
		>
		<button class:active={selectedTable === 'shows'} on:click={() => (selectedTable = 'shows')}
			>Shows</button
		>
		<button class:active={selectedTable === 'songs'} on:click={() => (selectedTable = 'songs')}
			>Songs</button
		>
	</div>

	{#if selectedTable === 'blog'}
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Content</th>
					<th>Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each blogData as row, i}
					<tr class:empty-row={row.id === null}>
						<td>{row.id ?? 'New'}</td>
						<td class="expandCol">
							<textarea bind:value={row.content} on:blur={() => handleRowBlur(row, 'blog', i)} />
						</td>
						<td>
							<input
								type="date"
								bind:value={row.date}
								on:blur={() => handleRowBlur(row, 'blog', i)}
							/>
						</td>
						<td>
							{#if row.id !== null}
								<button class="delete" on:click={() => deleteRow(row.id, 'blog')}>Delete</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if selectedTable === 'release'}
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Release Name</th>
					<th>Release Date</th>
					<th>Album Cover</th>
					<th>Spotify Link</th>
					<th>YouTube Link</th>
					<th>Bandcamp Link</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each releaseData as row, i}
					<tr class:empty-row={row.id === null}>
						<td>{row.id ?? 'New'}</td>
						<td>
							<input
								type="text"
								bind:value={row.release_name}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							<input
								type="date"
								bind:value={row.release_date}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.album_cover}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.spotify_link}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.youtube_link}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.bandcamp_link}
								on:blur={() => handleRowBlur(row, 'release', i)}
							/>
						</td>
						<td>
							{#if row.id !== null}
								<button class="delete" on:click={() => deleteRow(row.id, 'release')}>Delete</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if selectedTable === 'setlists'}
		<datalist id="songs">
			{#each songsData as song}
				<option value={song.song_name}></option>
			{/each}
		</datalist>
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Show ID</th>
					<th>Song Order</th>
					<th>Song Name</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each setlistsData as row, i}
					<tr class:empty-row={row.id === null}>
						<td>{row.id ?? 'New'}</td>
						<td>
							<input
								type="number"
								bind:value={row.show_id}
								on:blur={() => handleRowBlur(row, 'setlists', i)}
							/>
						</td>
						<td>
							<input
								type="number"
								bind:value={row.song_order}
								on:blur={() => handleRowBlur(row, 'setlists', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								list="songs"
								bind:value={row.song_name}
								on:blur={() => handleRowBlur(row, 'setlists', i)}
							/>
						</td>
						<td>
							{#if row.id !== null}
								<button class="delete" on:click={() => deleteRow(row.id, 'setlists')}>Delete</button
								>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if selectedTable === 'shows'}
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Date</th>
					<th>Venue</th>
					<th>Venue Link</th>
					<th>Poster</th>
					<th>Event Link</th>
					<th>City</th>
					<th>Province</th>
					<th>Video Link</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each showsData as row, i}
					<tr class:empty-row={row.id === null}>
						<td>{row.id ?? 'New'}</td>
						<td>
							<input
								type="datetime-local"
								bind:value={row.date}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.venue}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.venue_link}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.poster}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.event_link}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.city}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.province}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							<input
								type="text"
								bind:value={row.video_link}
								on:blur={() => handleRowBlur(row, 'shows', i)}
							/>
						</td>
						<td>
							{#if row.id !== null}
								<button class="delete" on:click={() => deleteRow(row.id, 'shows')}>Delete</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}

	{#if selectedTable === 'songs'}
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Song Name</th>
					<th>Lyrics</th>
					<th>Release ID</th>
					<th>Track Order</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each songsData as row, i}
					<tr class:empty-row={row.id === null}>
						<td>{row.id ?? 'New'}</td>
						<td>
							<input
								type="text"
								style="width:10rem"
								bind:value={row.song_name}
								on:blur={() => handleRowBlur(row, 'songs', i)}
							/>
						</td>
						<td class="expandCol">
							<textarea bind:value={row.lyrics} on:blur={() => handleRowBlur(row, 'songs', i)}
							></textarea>
						</td>
						<td>
							<input
								type="number"
								bind:value={row.release_id}
								on:blur={() => handleRowBlur(row, 'songs', i)}
							/>
						</td>
						<td>
							<input
								type="number"
								bind:value={row.track_order}
								on:blur={() => handleRowBlur(row, 'songs', i)}
							/>
						</td>
						<td>
							{#if row.id !== null}
								<button class="delete" on:click={() => deleteRow(row.id, 'songs')}>Delete</button>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.container {
		padding: 2rem;
		max-width: 100%;
		overflow-x: auto;
	}

	h1 {
		margin-bottom: 1.5rem;
	}

	.table-selector {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.table-selector button {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		background: white;
		cursor: pointer;
		border-radius: 4px;
	}

	.table-selector button:hover {
		background: #f0f0f0;
	}

	.table-selector button.active {
		background: #007bff;
		color: white;
		border-color: #007bff;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	th,
	td {
		padding: 0.75rem;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ddd;
		font-family: inherit;
		font-size: 0.9rem;
	}

	input[type='date'] {
		width: 8rem;
	}

	input[type='number'] {
		width: 3rem;
	}

	textarea {
		min-height: 5rem;
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
	}

	.delete {
		padding: 0.375rem 0.75rem;
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.875rem;
		transition: background 0.2s;
	}

	.delete:hover {
		background: #c82333;
	}

	.expandCol {
		width: 100%;
	}
</style>
