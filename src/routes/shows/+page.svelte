<script>
	import ShowBox from '../../lib/ShowBox.svelte';
	import { Accordion } from 'flowbite-svelte';
</script>

<div id="main">
	<Accordion>
		<ShowBox
			date={'Jan 21, 2023'}
			open={true}
			venue={'Doors Pub: Taco Joint & Metal Bar'}
			poster={'/posters/2023-01-21.jpg'}
			setList={[
				'Chomboscope (Intro)',
				'Flaked Off',
				'On and Out',
				'Blister in the Sun (Cover)',
				'Coward',
				'Claust',
				'Tell Me Why (Cover)',
				'Live Variables Have Failed',
				'Holland 1945 (Cover)'
			]}
		/>
		<ShowBox
			date={'Dec 18, 2022'}
			open={false}
			venue={'The Casbah'}
			poster={'/posters/2022-12-18.jpg'}
			setList={[
				'Flaked Off',
				'On and Out',
				'Blister in the Sun (Cover)',
				'Coward',
				'Claust',
				'Live Variables Have Failed',
				'Holland 1945 (Cover)'
			]}
		/>
	</Accordion>
</div>

<style>
	#main {
		margin: 1rem;
	}
</style>
