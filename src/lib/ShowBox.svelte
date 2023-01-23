<script lang="ts">
	import { AccordionItem } from 'flowbite-svelte';
	export let data: Object;
	const [yyyy, mm, dd, hh, mi] = data.date.split(/[/:\-T]/);
</script>

<div class="accordionItem">
	<AccordionItem transitionParams={{ duration: 0 }}>
		<span slot="header"
			>{yyyy}-{mm}-{dd} {hh}:{mi} - {data.venue}, {data.city}, {data.province}</span
		>

		<div id="details">
			<img src={data.poster} alt="poster" />
			<div>
				Setlist
				<ol class="list-decimal">
					{#each data.Setlist as song}
						<li>{song.song_name}</li>
					{/each}
				</ol>
			</div>
		</div>
	</AccordionItem>
</div>

<style>
	#details {
		display: flex;
		flex-direction: row;
	}
	.accordionItem :global(button) {
		background-color: transparent;
		background-image: none;
		border: none;
		color: inherit;
		font-family: inherit;
		font-size: 1rem;
		font-weight: inherit;
		border-bottom: solid 1px white;
		text-align: left;
		width: 100%;
	}
	img {
		max-width: 50%;
		object-fit: contain;
		margin-right: 1rem;
		max-height: 600px;
	}
</style>
