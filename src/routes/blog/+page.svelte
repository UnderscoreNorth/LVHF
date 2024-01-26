<script>
	export let data;
</script>

{#await data}
	Loading...
{:then}
	{#each data.data as blog}
		{@html blog.content} -{blog.date}
		<hr />
	{/each}
{/await}
