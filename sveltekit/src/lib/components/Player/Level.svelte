<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";

    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import HeroCard from "$lib/components/cards/HeroCard.svelte";
    import { getLevel } from "$lib/utils";

    let { cards } = $props();
    console.log(cards);

    function cardType(card) {
        if (!card) return "normal";
        const icons = card.iconUrls ?? {};
        const evoLevel = Number(card.evolutionLevel ?? 0);
        if (icons.heroMedium || evoLevel >= 2) return "hero";
        if (icons.evolutionMedium || evoLevel >= 1) return "evo";
        return "normal";
    }
</script>

<div>
    {#if getLevel(cards[0]) < 16}
        <h2>Level {getLevel(cards[0])}</h2>
    {:else}
        <h2>Elite</h2>
    {/if}
    <div class="cards">
        {#each cards as card}
            {#key card.id}
                {#if cardType(card) === "hero"}
                    <HeroCard {card} />
                {:else if cardType(card) === "evo"}
                    <EvoCard {card} />
                {:else}
                    <Card {card} />
                {/if}
            {/key}
        {/each}
    </div>
</div>

<style lang="scss">
    .cards {
        display: grid !important;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 10px;
    }

    h2 {
        margin: 10px 0 5px 0;
    }

    @media (max-width: 900px) {
        .cards {
            grid-template-columns: repeat(8, minmax(0, 1fr));
        }
    }

    @media (max-width: 650px) {
        .cards {
            grid-template-columns: repeat(6, minmax(0, 1fr));
        }
    }

    @media (max-width: 500px) {
        .cards {
            grid-template-columns: repeat(5, minmax(0, 1fr));
        }
    }
</style>
