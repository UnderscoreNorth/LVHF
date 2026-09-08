<script lang="ts">
	import { supabase } from '$lib/supabase';

	let data: any[] = [];
	supabase
		.from('Blog')
		.select('*')
		.order('date', { ascending: false })
		.order('id', { ascending: false })
		.then((res) => {
			if (res.data !== null) data = res.data;
		});
</script>

{#if data.length == 0}
	Loading...
{:else}
	{#each data as blog}
		{@html `${blog.content} - ${blog.date}`}
		<hr />
	{/each}
{/if}
