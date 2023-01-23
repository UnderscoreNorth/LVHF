<script>
	import ShowBox from '../../lib/ShowBox.svelte';
	import { Accordion } from 'flowbite-svelte';
</script>

<div id="main">
	<h1>Shows</h1>
	<Accordion>
		<ShowBox
			date={'Jan 21, 2023'}
			open={true}
			venue={'Doors Pub: Taco Joint & Metal Bar'}
			poster={''}
			setList={[
				'Flaked Off',
				'On and Out',
				'Blister in the Sun (Cover)',
				'Coward',
				'Claust',
				'Live Variables Have Failed',
				'Holland 1945 (Cover)'
			]}
			bands={['The Masquerade', 'Paradise Mayday', 'The Dominion', 'LVHF', 'Iron Moose']}
		/>
	</Accordion>
</div>

<style>
	#main {
		margin: 1rem;
	}
</style>
