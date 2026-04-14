<script>
    import { get } from "svelte/store";
    import { getLevel, round } from "$lib/utils.js";

    import "$lib/css/global.scss";

    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import ElixirImage from "$lib/assets/elixir.png";
    import LevelImage from "$lib/assets/level.png";
    import Level from "./Level.svelte";
    import HeroCard from "../cards/HeroCard.svelte";

    let { opponent, player, collection } = $props();

    let hp = $state(player.kingTowerHitPoints);
    if (player.princessTowersHitPoints != null) {
        for (let i = 0; i < player.princessTowersHitPoints.length; i++) {
            hp += player.princessTowersHitPoints[i];
        }
    }

    const currentDeck = player.cards;
    const support = player?.supportCards[0] || 159000005;

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

    console.log(currentDeck);

    // svelte-ignore state_referenced_locally
    let avgLevel = round(sum / currentDeck.length, 1);
    // svelte-ignore state_referenced_locally
    let avgElixir = round(elixir / currentDeck.length, 1);

    function cardType(card) {
        if (!card) return "";
        const evoLevel = Number(
            card.evolutionLevel ?? card.evolutionLevel ?? 0,
        );
        const icons = card.iconUrls ?? {};
        if (evoLevel >= 2 && icons.heroMedium) return "hero";
        if (evoLevel >= 1 && icons.evolutionMedium) return "evo";
        return "";
    }
</script>

<div class="deck-info">
    <div class="match-deck deck">
        <div class="support">
            <img
                style={opponent ? "transform: scaleX(-1)" : ""}
                src={supporters[support.id]}
                alt=""
            />
        </div>
        {#each currentDeck as card, i}
            {#if !collection}
                {#if cardType(card) === "hero"}
                    <HeroCard {card} />
                {:else if cardType(card) === "evo"}
                    <EvoCard {card} />
                {:else}
                    <Card {card} />
                {/if}
            {:else if i < 3 && cardType(card) === "hero"}
                <HeroCard {card} />
            {:else if i < 3 && cardType(card) === "evo"}
                <EvoCard {card} />
            {:else}
                <Card {card} />
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

            <section id="hp">
                <p>{hp} HP</p>
                <ul id="tooltip">
                    <p><b>Tower Health</b></p>
                    <hr />
                    <li>
                        <p>King</p>
                        <p>{player.kingTowerHitPoints}</p>
                    </li>
                    {#if player.princessTowersHitPoints != null}
                        {#each player.princessTowersHitPoints as ptHp, index}
                            <hr />
                            <li>
                                <p>Princess</p>
                                <p>{ptHp}</p>
                            </li>
                        {/each}
                    {/if}
                    <hr />
                    <li>
                        <p><b>Total</b></p>
                        <p>{hp}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</div>

<style lang="scss" global>
    .deck-info {
        text-align: center;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background-color: inherit;
    }

    .match-deck {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        background: linear-gradient(var(--primary-300), var(--primary-200));

        .support {
            grid-column: 1 / span 4;
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

    #hp {
        position: relative;
        #tooltip {
            list-style: none;
            width: max-content;
            opacity: 0;
            position: absolute;
            bottom: 10px;
            right: 0;
            transform: translate(25%, 25%) scale(0.6);
            background-color: var(--primary-100);
            padding: 0.75rem;
            border-radius: 5px;
            transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
            pointer-events: none;

            li {
                font-size: smaller;
                position: relative;
                margin: 1rem 0;
                display: flex;
                justify-content: space-between;
                margin: 0;

                p {
                    margin: 0;
                }
            }

            hr {
                height: 1px;
                color: var(--neutral-300);
            }
        }

        &:hover #tooltip {
            opacity: 1;
            transform: scale(1) translate(25%, 0);
            pointer-events: all;
        }
    }
</style>
