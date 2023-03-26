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
			? ' - ' + $page.route.id?.substring(1).toUpperCase()
			: ''}
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
			<a href="https://www.instagram.com/lvhfband/" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
					<path
						d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
					/></svg
				>
			</a>
			<a href="https://www.facebook.com/LVHFBand" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"
					><path
						d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
					/></svg
				>
			</a>
		</div>
		<div>
			<a href="https://www.youtube.com/@lvhfchannel" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" class="icon"
					><path
						d="M7.518.011l1.81-.01c.971.004 3.89.03 5.972.173l.355.05c.394.061.95.209 1.445.76.463.478.66 1.426.714 1.746l.017.108s.155 1.378.168 2.816L18 7.241c0 .654-.032 1.31-.068 1.84l-.1 1.172s-.17 1.274-.732 1.853c-.675.753-1.463.753-1.8.811l-.537.033c-2.11.12-4.778.138-5.547.14l-2.132-.03c-1.465-.029-3.372-.076-4.215-.143-.394-.116-1.294-.058-1.969-.81-.43-.444-.63-1.293-.7-1.668l-.031-.186S.014 8.875 0 7.437V5.654l.007-.39c.012-.45.035-.883.06-1.254l.1-1.172S.339 1.564.9.985C1.575.232 2.362.232 2.7.174l.75-.045C4.827.057 6.4.025 7.518.01zm-.973 3.262v6.545l6.546-3.273-6.546-3.272z"
					/></svg
				>
			</a>
			<a href="mailto:lvhfband@gmail.com" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"
					><path
						d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
					/></svg
				>
			</a>
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
			<a href="https://www.instagram.com/lvhfband/" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
					<path
						d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
					/></svg
				>
			</a>
		</div>
		<div id="share">
			<button
				class="icon"
				on:click={() =>
					navigator.share({
						title: 'LVHF',
						text: 'Indie/Post-Hardcore from Hamilton, Ontario',
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
			<a href="https://www.instagram.com/lvhfband/" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
					<path
						d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
					/></svg
				>
			</a>
			<a href="https://www.facebook.com/LVHFBand" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"
					><path
						d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
					/></svg
				>
			</a>
			<a href="https://www.youtube.com/@lvhfchannel" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14" class="icon"
					><path
						d="M7.518.011l1.81-.01c.971.004 3.89.03 5.972.173l.355.05c.394.061.95.209 1.445.76.463.478.66 1.426.714 1.746l.017.108s.155 1.378.168 2.816L18 7.241c0 .654-.032 1.31-.068 1.84l-.1 1.172s-.17 1.274-.732 1.853c-.675.753-1.463.753-1.8.811l-.537.033c-2.11.12-4.778.138-5.547.14l-2.132-.03c-1.465-.029-3.372-.076-4.215-.143-.394-.116-1.294-.058-1.969-.81-.43-.444-.63-1.293-.7-1.668l-.031-.186S.014 8.875 0 7.437V5.654l.007-.39c.012-.45.035-.883.06-1.254l.1-1.172S.339 1.564.9.985C1.575.232 2.362.232 2.7.174l.75-.045C4.827.057 6.4.025 7.518.01zm-.973 3.262v6.545l6.546-3.273-6.546-3.272z"
					/></svg
				>
			</a>
			<a href="mailto:lvhfband@gmail.com" class="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"
					><path
						d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
					/></svg
				>
			</a>
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
	#drawer a {
		color: var(--color-red);
		font-size: 2rem;
		line-height: 3rem;
		font-family: 'Tw Cen MT Condensed Extra Bold';
		font-style: italic;
		text-decoration: none;
	}
	#drawer a svg {
		fill: var(--color-red);
	}
</style>
