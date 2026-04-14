<script>
    // Sort cards within each level group by rarity and then name
    import { sortBy } from "$lib/utils.js";
    import Deck from "$lib/components/Player/MatchDeck.svelte";
    import Level from "$lib/components/Player/Level.svelte";
    import PlayerMatch from "$lib/components/Player/PlayerMatch.svelte";
    import {
        rarityRank,
        getAvrageLevel,
        round,
        getTimeAgo,
    } from "$lib/utils.js";
    import { get } from "svelte/store";

    import redCrown from "$lib/assets/red-crown.png";
    import blueCrown from "$lib/assets/blue-crown.png";

    let { match } = $props();
    const win = match.opponent[0].crowns < match.team[0].crowns;

    let deltaLevel = round(
        getAvrageLevel(match.team[0].cards) -
            getAvrageLevel(match.opponent[0].cards),
        1,
    );

    let year = match.battleTime.substring(0, 4);
    let month = match.battleTime.substring(4, 6);
    let day = match.battleTime.substring(6, 8);

    let hour = parseInt(match.battleTime.substring(9, 11)) + 2;
    let minute = match.battleTime.substring(11, 13);
    let second = match.battleTime.substring(13, 15);

    let date =
        year +
        "-" +
        month +
        "-" +
        day +
        "  " +
        hour +
        ":" +
        minute +
        ":" +
        second;
    const isCollection = match.deckSelection === "collection";
</script>

{#if match.gameMode.name != "ClanWar_BoatBattle"}
    <div class="match {win ? 'win' : 'lose'}">
        <div class="info">
            <h3>{match.gameMode.name}</h3>
            <div>
                <img src={blueCrown} alt="" />
                <p>{match.team[0].crowns} - {match.opponent[0].crowns}</p>
                <img src={redCrown} alt="" />
            </div>
        </div>

        <section class="decks">
            <section class="team">
                <PlayerMatch player={match.team[0]}></PlayerMatch>
                <Deck player={match.team[0]} collection={isCollection} />
            </section>
            <div id="middle">
                <p>vs</p>
                <div id="separator"></div>
            </div>
            <section class="opponent">
                <PlayerMatch player={match.opponent[0]} opponent={true}
                ></PlayerMatch>
                <Deck
                    opponent={true}
                    player={match.opponent[0]}
                    collection={isCollection}
                />
            </section>
        </section>
        <div id="bottom">
            <p>&Delta;Lvl: {deltaLevel}</p>
            <section id="time">
                <p>{getTimeAgo(match.battleTime)}</p>
                <div id="tooltip">{date}</div>
            </section>
        </div>
    </div>
{/if}

<style lang="scss">
    .lose {
        border-top: 5px solid var(--lose-color);
    }

    .win {
        border-top: 5px solid var(--win-color);
    }

    .match {
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: var(--primary-200);
        color: var(--neutral-900);
        .trophies {
            margin: 0;
            font-weight: bold;
            margin-right: 0.5rem !important;
        }

        p {
            margin: 0;
        }
    }

    .decks {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        gap: 0.6rem;

        #middle {
            display: flex;
            flex-direction: column;
            align-self: stretch;
            align-items: center;
            color: var(--neutral-600);

            #separator {
                width: 1px;
                height: 100%;
                background-color: var(--neutral-400);
                align-self: stretch;
                border-radius: 10px;
                margin: auto;
            }
        }
    }
    .info {
        text-align: center;
        gap: 1rem;
        p {
            margin: 0;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 50px;
            }
        }
    }

    #bottom {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: var(--neutral-700);

        #time {
            #tooltip {
                opacity: 0;
                position: absolute;
                top: -120%;
                right: 0;
                transform: translate(25%, -50%) scale(0.6);
                background-color: var(--neutral-100);
                padding: 0.75rem;
                border-radius: 5px;
                transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
                pointer-events: none;
            }

            &:hover #tooltip {
                opacity: 1;
                transform: scale(1) translate(25%, -50%);
                pointer-events: all;
            }
        }
    }
</style>
