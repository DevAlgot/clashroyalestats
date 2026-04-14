<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/Player/PlayerStats.svelte";
    import PlayerHead from "$lib/components/Player/PlayerHead.svelte";
    import Match from "$lib/components/Player/Match.svelte";

    let { player, battlelog } = $props();

    //loss streak
    for (let battle of battlelog) {
        if (battle.team[0].crowns < battle.opponent[0].crowns) {
            //lost
        } else {
            //won
        }
    }
</script>

<svelte:head>
    <title
        >{player.name}
        {player.tag} Clash Royale profile | Royalty Statistics</title
    >
</svelte:head>
<section id="overview">
    {#each battlelog as battle}
        {#if battle.team[0].crowns > battle.opponent[0].crowns}
            <div class="win"></div>
        {:else if battle.team[0].crowns < battle.opponent[0].crowns}
            <div class="lose"></div>
        {:else}
            <div class="draw"></div>
        {/if}
    {/each}
</section>
{#each battlelog as battle, index (battle.battleTime)}
    <Match match={battle} />
{/each}

<style lang="scss">
    #overview {
        display: grid;
        grid-template-columns: repeat(15, minmax(0, 1fr));
        gap: 0.75rem;
        margin-bottom: 1rem;

        div {
            width: auto;
            aspect-ratio: 1/1;
            background-color: var(--accent-600);
            border-radius: 8px;
        }

        .lose {
            background-color: var(--lose-color);
        }

        .win {
            background-color: var(--win-color);
        }

        .draw {
            background-color: var(--neutral-400);
        }
    }
    @media (max-width: 850px) {
        #overview {
            grid-template-columns: repeat(12, minmax(0, 1fr));
        }
    }

    @media (max-width: 650px) {
        #overview {
            grid-template-columns: repeat(8, minmax(0, 1fr));
        }
    }

    @media (max-width: 450px) {
        #overview {
            grid-template-columns: repeat(6, minmax(0, 1fr));
        }
    }
</style>
