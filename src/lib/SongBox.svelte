<script lang="ts">
	import { AccordionItem } from 'flowbite-svelte';
	export let data: Object;
</script>

<div class="accordionItem">
	<AccordionItem transitionParams={{ duration: 0 }}>
		<span slot="header">{(data.track_order ? data.track_order + '. ' : '') + data.song_name}</span>
		<div id="lyrics">
			{@html data.lyrics}
		</div>
	</AccordionItem>
</div>

<style>
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
	:global(.accordionItem h2) {
		margin: 0;
	}
</style>
