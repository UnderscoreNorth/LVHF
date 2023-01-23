<script lang="ts">
	import '../app.postcss';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { page } from '$app/stores';
	let drawerHidden = true;
	let transitionParams = {
		x: -320,
		duration: 0,
		easing: sineIn
	};
	let width: number;
	let links = [
		['/', 'LVHF'],
		['/shows', 'Shows'],
		['/blog', 'Blog']
	];
</script>

<svelte:window bind:innerWidth={width} />
<Drawer
	backdrop={true}
	transitiontype="fly"
	{transitionParams}
	bind:hidden={drawerHidden}
	id="sidebar1"
>
	<div id="drawer">
		{#each links as link}
			<a href={link[0]} on:click={() => (drawerHidden = true)}>{link[1]}</a>
		{/each}
	</div>
</Drawer>
<nav>
	{#if width < 1000}
		<button class="icon" on:click={() => (drawerHidden = false)}>
			<svg
				class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
				focusable="false"
				aria-hidden="true"
				viewBox="0 0 24 24"
				data-testid="MenuIcon"
				tabindex="-1"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg
			>
		</button>
		<a href="/">LVHF</a>{$page.route.id !== '/'
			? '-' + $page.route.id?.substring(1).toUpperCase()
			: ''}
	{:else}
		<div id="desktop">
			{#each links as link}
				<a class={$page.route.id == link[0] ? 'underlined' : ''} href={link[0]}>{link[1]}</a>
			{/each}
		</div>
	{/if}
</nav>

<slot />

<style>
	nav {
		font-size: 2rem;
		line-height: 2rem;
		font-weight: bold;
		font-family: 'Tw Cen MT Condensed Extra Bold';
		font-style: italic;
		background: var(--color-red);
		padding: 1rem;
		display: flex;
		flex-direction: row;
		position: sticky;
		top: 0;
		left: 0;
		width: calc(100% - 2rem);
		z-index: 1;
	}
	.underlined {
		text-decoration: underline;
	}
	#desktop {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 20rem;
		margin: auto;
	}
	#desktop a {
		flex-grow: 1;
		text-align: center;
	}
	nav a {
		color: var(--color-beige);
		text-decoration: none;
	}

	:root {
		background-color: #000000;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='Artboard-5' fill='%23555555' fill-opacity='0.4' fill-rule='nonzero'%3E%3Cpath d='M6 18h12V6H6v12zM4 4h16v16H4V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		--color-beige: rgb(211, 209, 188);
		--color-red: rgb(66, 10, 10);
		--color-grey: rgb(173, 173, 173);
		color: var(--color-beige);
		font-family: 'Courier New', Courier, monospace;
	}
	:global(body) {
		margin: 0;
	}
	:global(.icon) {
		background-color: transparent;
		background-image: none;
		border: none;
		height: 2rem;
		width: 2rem;
		display: inline-block;
	}
	:global(.icon svg) {
		height: 100%;
		width: 100%;
		fill: var(--color-beige);
	}
	@font-face {
		font-family: 'Tw Cen MT Condensed Extra Bold';
		src: url('/TCCEB.TFF');
	}
	#drawer {
		position: fixed;
		z-index: 2;
		left: 0;
		top: 0;
		bottom: 0;
		background: var(--color-beige);
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}
	#drawer a {
		color: var(--color-red);
		font-size: 2rem;
		line-height: 3rem;
		font-family: 'Tw Cen MT Condensed Extra Bold';
		font-style: italic;
		text-decoration: none;
	}
</style>
