<script lang="ts">
	export let data: unknown;
</script>

<div id="main">
	<div>
		{#await data}
			Loading...
		{:then}
			{#if data.data.length > 0}
				Upcoming shows
				<hr />
				<table style="width:100%">
					{#each data.data as show}
						<tr
							><td>{new Date(show.date).toLocaleDateString()}</td><td>{show.venue}</td><td
								>{show.city}</td
							></tr
						>
					{/each}
				</table>
			{/if}
		{/await}
	</div>
	<img id="band-photo" src="LVHF Mar 18 Edited.jpg" alt="band" />
	<p>Post hardcore/indie rock band from Hamilton, Ontario.</p>
</div>

<style>
	#main {
		padding: 1rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		width: calc(100% - 2rem);
		max-width: 600px;
		margin: auto;
	}
	#band-photo {
		border-style: dashed;
		border-color: var(--color-beige);
		padding: 10px;
		border-width: 2px;
		margin: 1rem;
	}
</style>
