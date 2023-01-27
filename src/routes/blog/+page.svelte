<script>
	export let data;
</script>

{#await data}
	Loading...
{:then}
	{#each data.data as blog}
		{blog.content} -{blog.date}
		<hr />
	{/each}
{/await}
