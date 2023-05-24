<script lang="ts">
	import { AccordionItem } from 'flowbite-svelte';
	export let data: Object;
	export let index: number;
	const [yyyy, mm, dd, hh, mi] = data.date.split(/[/:\-T]/);
</script>

<div class="accordionItem">
	<AccordionItem transitionParams={{ duration: 0 }} open={index == 0 ? true : false}>
		<span
			slot="header"
			style={Date.parse(data.date) > new Date().getTime() &&
				'background:var(--color-red);padding-right:0.5rem'}
			>{yyyy}-{mm}-{dd} {hh}:{mi} - {data.venue}, {data.city}, {data.province}</span
		>

		<div id="details">
			<img src={data.poster} alt="poster" />
			<div>
				{#if data.video_link}
					<a href={data.video_link} class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" class="icon">
							<path
								d="M7.518.011l1.81-.01c.971.004 3.89.03 5.972.173l.355.05c.394.061.95.209 1.445.76.463.478.66 1.426.714 1.746l.017.108s.155 1.378.168 2.816L18 7.241c0 .654-.032 1.31-.068 1.84l-.1 1.172s-.17 1.274-.732 1.853c-.675.753-1.463.753-1.8.811l-.537.033c-2.11.12-4.778.138-5.547.14l-2.132-.03c-1.465-.029-3.372-.076-4.215-.143-.394-.116-1.294-.058-1.969-.81-.43-.444-.63-1.293-.7-1.668l-.031-.186S.014 8.875 0 7.437V5.654l.007-.39c.012-.45.035-.883.06-1.254l.1-1.172S.339 1.564.9.985C1.575.232 2.362.232 2.7.174l.75-.045C4.827.057 6.4.025 7.518.01zm-.973 3.262v6.545l6.546-3.273-6.546-3.272z"
							/>
						</svg>
					</a>
				{/if}
				{#if data.Setlist.length}
					Setlist
					<ol class="list-decimal">
						{#each data.Setlist as song}
							<li>{song.song_name}</li>
						{/each}
					</ol>
				{/if}
			</div>
		</div>
	</AccordionItem>
</div>

<style>
	#details {
		display: flex;
		flex-direction: row;
	}
	.icon {
		height: 1rem;
		vertical-align: top;
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
