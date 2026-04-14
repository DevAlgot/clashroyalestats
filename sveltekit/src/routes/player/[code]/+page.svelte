<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/Player/PlayerStats.svelte";
    import PlayerHead from "$lib/components/Player/PlayerHead.svelte";
    import Match from "$lib/components/Player/Match.svelte";
    import PlayerBattles from "$lib/components/Player/PlayerBattles.svelte";
    import PlayerCards from "$lib/components/Player/PlayerCards.svelte";

    let { data } = $props();

    // ...existing code...
    const battlelog = data.battlelog;
    const player = data.profile;
    const cards = player.cards;

    console.log(data);

    const pages = ["profile", "battles", "cards"];
    let currentpage = $state("profile");
    $effect(() => {
        console.log("You selected: " + currentpage);
    });
</script>

<svelte:head>
    <title
        >{player.name}
        {player.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>

<main class="player" id="player">
    <br />
    <br class="dark" />
    <div class="upper head">
        <PlayerHead bind:selectedPage={currentpage} {player} />
    </div>
    <div class="upper stats">
        {#if currentpage === "profile"}
            <PlayerStats {player} />
        {:else if currentpage === "battles"}
            <PlayerBattles {player} {battlelog} />
        {:else if currentpage === "cards"}
            <PlayerCards {player} {cards} />
        {/if}
    </div>

    <!-- New detailed stats section -->
</main>

<style lang="scss">
    main.player {
        display: block !important;
        color: var(--neutral-100);
        padding: 2rem;
    }

    .upper {
        padding: 1rem;
        border-radius: 8px;
        max-width: 1080px;
        margin: auto;
        background-color: var(--primary-700);

        &.head {
            border-bottom: 0;
            border-radius: 8px 8px 0 0;
        }

        &.stats {
            border-bottom: 0;
            border-top: 0;
            border-radius: 0 0 8px 8px;
            background-color: var(--primary-100);
        }
    }

    @media (max-width: 650px) {
        main.player {
            padding: 5px;
        }
    }
</style>
