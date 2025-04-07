import * as dotenv from 'dotenv';
import { error as serror } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { GroupedData } from './groupedData';

dotenv.config();

export async function load() {
	const supabaseUrl = process.env.SUPABASE_URL || '';
	const supabaseKey = process.env.SUPABASE_KEY || '';
	const supabase = createClient(supabaseUrl, supabaseKey);
	const { data, error } = await supabase
		.from('Songs')
		.select('*, Release (release_name, release_date,album_cover, spotify_link, youtube_link, bandcamp_link)')
		.order('song_name');
	if (error) {
		console.log(error);
		throw serror(404, 'Not found');
	} else {
		data.sort((a, b) => {
			if (a.Release && !b.Release) return -1;
			if (b.Release && !a.Release) return 1;
			if (a.Release && b.Release) {
				if (a.Release.release_date > b.Release.release_date) return 1;
				if (a.Release.release_date < b.Release.release_date) return -1;
				return a.track_order > b.track_order ? 1 : -1;
			}
			return a.song_name > b.song_name ? 1 : -1;
		});
		const groupedData: GroupedData = {};
		for (const row of data) {
			if (row.Release === null) {
				row.Release = { release_name: 'Unreleased' };
			}
			const release = row.Release.release_name;
			if (groupedData[release] == undefined)
				groupedData[release] = {
					cover: row.Release.album_cover,
					date: row.Release.release_date,
					bandcamp_link:row.Release.bandcamp_link,
					youtube_link:row.Release.youtube_link,
					spotify_link:row.Release.spotify_link,
					songs: []
				};
			groupedData[release].songs.push(row);
		}
		return { data: groupedData };
	}
}
