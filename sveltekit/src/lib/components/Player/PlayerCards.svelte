<script>
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank, sortCards } from "$lib/utils";

    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    import PlayerStats from "$lib/components/Player/PlayerStats.svelte";
    import PlayerHead from "$lib/components/Player/PlayerHead.svelte";
    import Match from "$lib/components/Player/Match.svelte";
    import Level from "$lib/components/Player/Level.svelte";

    let { player, cards } = $props();

    // Now you can access data returned from +page.server.js via the `data` prop
    // For example:

    let cardsByLevel = {};

    // Group cards by their level
    for (let card of cards) {
        const level = getLevel(card);
        if (!cardsByLevel[level]) {
            cardsByLevel[level] = [];
        }
        cardsByLevel[level].push(card);
    }

    // The card by level, a "2d" array
    let cardsGroupedByLevel = $state(Object.values(cardsByLevel).reverse());

    for (let levelCards of cardsGroupedByLevel) {
        // Sort each level group by rarity and then name
        levelCards.sort((a, b) => {
            if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                return b.elixirCost - a.elixirCost;
            }
            return rarityRank[b.rarity] - rarityRank[a.rarity];
        });
    }
</script>

<section class="cards">
    <select
        name="sort"
        id=""
        onchange={(e) =>
            (cardsGroupedByLevel = sortCards(e, cardsGroupedByLevel))}
    >
        <option value="rarity-asc">Rarity Ascending</option>
        <option value="rarity-desc">Rarity Descending</option>
        <option value="elixir-asc">Elixir Ascending</option>
        <option value="elixir-desc">Elixir Descending</option>
        <option value="evo-asc">Evolution Ascending</option>
        <option value="evo-desc">Evolution Descending</option>
    </select>

    {#each cardsGroupedByLevel as levelCards}
        <Level cards={levelCards}></Level>
    {/each}
</section>

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    main.player {
        display: block !important;
        color: var(--neutral-100);
    }
    .upper {
        padding: 1rem;
        border-radius: 8px;
        width: 60vw;
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
            background-color: var(--neutral-200);
            color: var(--neutral-900);
        }
    }
    .cards {
        margin-top: 1rem;
        color: var(--neutral-800);

        select {
            background-color: var(--primary-300);
            border: none;
            padding: 0.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 1rem;
            color: var(--neutral-900);
            border-bottom: 5px solid var(--primary-600);

            &:focus {
                outline: none;
            }

            &:active {
                color: white;
            }

            option {
                background-color: var(--primary-900);
                color: var(--neutral-800);
            }
        }
    }
</style>
