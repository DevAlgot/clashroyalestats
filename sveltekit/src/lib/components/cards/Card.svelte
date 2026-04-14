<script>
    import { get } from "svelte/store";
    import "$lib/css/global.scss";
    import "$lib/css/card.scss";
    import { getLevel } from "$lib/utils";

    let { card } = $props();

    let cardImage = `/src/lib/assets/images/cards/card${card.id}.png`;
</script>

<article href="../card/{card.name}">
    <div id="card">
        <img src={card.iconUrls.medium} alt="" srcset="" />
        <p>Level {getLevel(card)}</p>
    </div>
</article>
