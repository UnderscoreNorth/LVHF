<script lang="ts">
	import { AccordionItem } from 'flowbite-svelte';
	export let date: string;
	export let open: boolean;
	export let venue: string;
	export let setList: Array<string>;
	export let poster: string;
</script>

<div class="accordionItem">
	<AccordionItem {open} transitionParams={{ duration: 0 }}>
		<span slot="header">{date} - {venue}</span>

		<div id="details">
			<img src={poster} alt="poster" />
			<div>
				Setlist
				<ol class="list-decimal">
					{#each setList as song}
						<li>{song}</li>
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
