<script>
    import { get } from "svelte/store";
    import { getLevel, round } from "$lib/utils.js";

    import "$lib/css/global.scss";

    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import ElixirImage from "$lib/assets/elixir.png";
    import LevelImage from "$lib/assets/level.png";
    import Level from "./Level.svelte";

    let { currentDeck, cards, support } = $props();
    if (!support) {
        support = { id: 159000005 };
        console.log("no support found, using default");
    }

    //support cards, defiened to easier get the image.
    let supporters = {
        159000000:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_princess.png",
        159000001:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_cannoneer.png",
        159000002:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_knives_thrower.png",
        159000003:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_royal_chef.png",
        159000004:
            "https://game-assets.clashroyaleapp.com/97e7e4f5da14075417226853ec2c43591232cb64/image/chr_support_cards/support_card_hires_royal_chef.png",
        159000005: "",
    };

    let sum = $state(0);
    let elixir = $state(0);

    for (let i = 0; i < currentDeck.length; i++) {
        sum += getLevel(currentDeck[i]); //grab the level of the card

        if (currentDeck[i].name != "Mirror") {
            elixir += currentDeck[i].elixirCost; // and the elixir cost
        } else {
            elixir += 0;
        }
    }

    // svelte-ignore state_referenced_locally
    let avgLevel = round(sum / currentDeck.length, 1);
    // svelte-ignore state_referenced_locally
    let avgElixir = round(elixir / currentDeck.length, 1);
</script>

<div class="deck-info">
    <div class="deck">
        <div class="support">
            <img src={supporters[support.id]} alt="" />
        </div>
        {#each currentDeck as card}
            {#if card.evolutionLevel != null && (currentDeck[0] === card || currentDeck[1] === card)}
                <EvoCard {card}></EvoCard>
            {:else}
                <Card {card}></Card>
            {/if}
        {/each}

        <div class="detail">
            <section>
                <img src={LevelImage} alt="" />
                <p>{avgLevel}</p>
            </section>

            <section>
                <img class="elixir" src={ElixirImage} alt="" />
                <p>{avgElixir}</p>
            </section>
        </div>
    </div>
</div>

<style lang="scss" global>
    $color: rgba(var(--primary-300), 0.15);

    .deck-info {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: inherit;
    }

    .deck {
        display: grid;
        border-radius: 15px;
        padding: 15px 9px 0px 9px;
        background-size: cover;
        color: var(--neutral-900);
        background: linear-gradient(var(--primary-200), var(--primary-100));
        grid-template-columns: repeat(8, minmax(0, 1fr));

        .support {
            grid-column: 1 / span 8;
        }

        .detail {
            display: flex;
            align-items: center;
            gap: 1.4rem;
            margin: 0 0 10px 5px;

            section {
                display: inherit;
                gap: 0.35rem;

                p {
                    text-wrap: nowrap;
                    margin: 0;
                }

                img {
                    height: 20px;
                    width: auto;

                    &.elixir {
                        filter: brightness(1.6);
                    }
                }
            }
        }
        .support {
            margin-bottom: 10px;
            position: relative;
            height: 67px;

            img {
                height: 130px;
                mask-image: linear-gradient(black 67%, transparent 86%);
            }
        }
    }

    @media (max-width: 650px) {
        .deck {
            grid-template-columns: repeat(4, minmax(0, 1fr));

            .detail {
                margin: 0 0 10px 0px;
            }

            .support {
                grid-column: 1 / span 4;
            }
        }
    }
</style>
