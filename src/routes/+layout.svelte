<script lang="ts">
	import '../app.postcss';
	import { Drawer } from 'flowbite-svelte';
	import { sineIn } from 'svelte/easing';
	import { page } from '$app/stores';
	import Instagram from '$lib/icons/Instagram.svelte';
	import Youtube from '$lib/icons/Youtube.svelte';
	import Email from '$lib/icons/Email.svelte';
	import Spotify from '$lib/icons/Spotify.svelte';
	import Bandcamp from '$lib/icons/Bandcamp.svelte';
	let drawerHidden = true;
	let transitionParams = {
		x: -320,
		duration: 0,
		easing: sineIn
	};
	let width: number;
	let links = [
		['/', 'LVHF'],
		['/shows', 'SHOWS'],
		['/bio', 'BIO'],
		['/music', 'MUSIC'],
		['/blog', 'BLOG'],
		['/etc', 'ETC']
	];
</script>

<svelte:head>
	<title
		>LVHF{$page.route.id !== '/' ? ' - ' + $page.route.id?.substring(1).toUpperCase() : ''}</title
	>
	<meta property="og:url" content={'https://lvhf.band' + $page.route.id} />
	<meta
		property="og:title"
		content={'LVHF' + $page.route.id !== '/'
			? 'LVHF - ' + $page.route.id?.substring(1).toUpperCase()
			: 'LVHF'}
	/>
</svelte:head>
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
		<div>
			<Instagram />
			<Spotify />
		</div>
		<div>
			<Youtube />
			<Bandcamp />
		</div>
		<div>
			<Email />
		</div>
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
		<div id="instalink">
			<Instagram />
			<Spotify />
		</div>
		<div id="share">
			<button
				class="icon"
				on:click={() =>
					navigator.share({
						title: 'LVHF',
						text: 'Indie/Punk/Noise/Alt from Hamilton, Ontario',
						url: 'https://lvhf.band' + $page.route.id
					})}
			>
				<svg
					class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root MuiSvgIcon-fontSizeLarge css-1shn170"
					focusable="false"
					aria-hidden="true"
					viewBox="0 0 24 24"
					data-testid="ShareIcon"
					tabindex="-1"
					><path
						d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
					/></svg
				>
			</button>
		</div>
	{:else}
		<div style="float:left;width:0;white-space:nowrap">
			<Instagram />
			<Youtube />
			<Spotify />
			<Email />
			<Bandcamp />
		</div>
		<div id="desktop">
			{#each links as link}
				<a class={($page.route.id == link[0] ? 'underlined' : '') + ' topNav'} href={link[0]}
					>{link[1]}</a
				>
			{/each}
		</div>
	{/if}
</nav>

<slot />

<style>
	#instalink {
		flex-grow: 1;
		text-align: right;
	}
	#share {
		flex-grow: 0;
	}
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
		height: 2rem;
	}
	.underlined {
		text-decoration: underline;
	}
	#desktop {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 30rem;
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
		top: 4rem;
		bottom: 0;
		background: var(--color-beige);
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}
	:global(#drawer a) {
		color: var(--color-red);
		font-size: 2rem;
		line-height: 3rem;
		font-family: 'Tw Cen MT Condensed Extra Bold';
		font-style: italic;
		text-decoration: none;
	}
	:global(#drawer a svg) {
		fill: var(--color-red);
	}
</style>
