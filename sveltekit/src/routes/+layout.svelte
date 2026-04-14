<script>
	import favicon from "$lib/assets/favicon.svg";
	import Header from "$lib/components/Essential/Header.svelte";
	import { setUser } from "$lib/js/user.js";

	let { children, data } = $props();
	// @ts-ignore
	setUser(data.user);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children?.()}
