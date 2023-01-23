<script lang="ts">
	import { AccordionItem } from 'flowbite-svelte';
	export let date: string;
	export let open: boolean;
	export let venue: string;
	export let setList: Array<string>;
	export let poster: string;
	export let bands: Array<string>;
</script>

<AccordionItem {open}>
	<span slot="header">{date} - {venue}</span>
	<div id="details">
		<div>
			Setlist
			<ol>
				{#each setList as song}
					<li>{song}</li>
				{/each}
			</ol>
		</div>

		<div>
			Lineup
			<ol>
				{#each bands as band}
					<li>{band}</li>
				{/each}
			</ol>
		</div>
	</div>
</AccordionItem>

<style>
	#details {
		display: flex;
		flex-direction: row;
	}
</style>
