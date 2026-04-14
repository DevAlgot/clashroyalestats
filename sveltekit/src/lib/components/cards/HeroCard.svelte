<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";
    import { getLevel } from "$lib/utils";

    let { card } = $props();

    let cardImage = `/src/lib/assets/images/cards/card${card.id + 10000000}_active.png`;

    console.log(card);

    if (card.iconUrls.heroMedium == null) {
        console.log(card);

        card.iconUrls.heroMedium = card.iconUrls.medium;
    }
</script>

<article href="../card/{card.name}">
    <div id="card">
        <img src={card.iconUrls.heroMedium} alt="" srcset="" />
        <p>Level {getLevel(card)}</p>
    </div>
</article>

<style lange="scss">
    img {
        filter: drop-shadow(0 0 9px #c47014);
    }
</style>
