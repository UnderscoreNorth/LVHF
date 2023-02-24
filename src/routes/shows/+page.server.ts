import * as dotenv from 'dotenv';
import { error as serror } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

export async function load() {
	const supabaseUrl = process.env.SUPABASE_URL || '';
	const supabaseKey = process.env.SUPABASE_KEY || '';
	const supabase = createClient(supabaseUrl, supabaseKey);
	const { data, error } = await supabase
		.from('Shows')
		.select('*,Setlist:id(*)')
		.order('date', { ascending: false })
		.order('song_order', { foreignTable: 'Setlist' });
	if (error) {
		throw serror(404, 'Not found');
	} else {
		return { data: data };
	}
}
