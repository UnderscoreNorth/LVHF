<script lang="ts">
	import { blogApi } from '$lib/api';

	let data = blogApi.getAll();
</script>

{#await data}
	Loading...
{:then res}
	{#each res as blog}
		{@html `${blog.content} - ${blog.date}`}
		<hr />
	{/each}
{/await}
