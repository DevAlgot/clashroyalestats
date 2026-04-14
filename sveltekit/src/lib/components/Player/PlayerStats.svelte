<script>
    import { round, getLevel, sortBy, rarityRank, sortCards } from "$lib/utils";

    import Deck from "$lib/components/Player/Deck.svelte";
    import Card from "$lib/components/cards/Card.svelte";
    import EvoCard from "$lib/components/cards/EvoCard.svelte";
    import Level from "$lib/components/Player/Level.svelte";

    let { player } = $props();

    // Derived stats (reactive so they update when `player` changes)
    let totalGames = (player?.wins || 0) + (player?.losses || 0);

    let totalCards = player?.cards?.length || 0;
    let uniqueCards = player?.cards
        ? new Set(player.cards.map((c) => c.name)).size
        : 0;

    let avgCardLevel = player?.cards?.length
        ? round(
              player.cards.reduce((sum, c) => sum + (getLevel(c) || 0), 0) /
                  player.cards.length,
              1,
          )
        : 0;

    let topCards = player?.cards?.length
        ? [...player.cards]
              .sort((a, b) => (getLevel(b) || 0) - (getLevel(a) || 0))
              .slice(0, 3)
        : [];

    // Existing derived stats
    const safe = (v) => (typeof v === "number" ? v : 0);
    const totalBattles =
        safe(player.battleCount) || safe(player.wins) + safe(player.losses);
    const wins = safe(player.wins);
    const losses = safe(player.losses);
    const winRate = totalBattles ? (wins / totalBattles) * 100 : 0;
    const threeCrownRate = totalBattles
        ? (safe(player.threeCrownWins) / totalBattles) * 100
        : 0;

    // Cards info
    const allCards = player.cards || [];
    const supportCards = player.supportCards || [];
    const currentDeck = player.currentDeck || [];

    const uniqueCardsOwned =
        allCards.filter((c) => safe(c.count) > 0 || safe(c.level) > 0).length +
        supportCards.filter((c) => safe(c.count) > 0 || safe(c.level) > 0)
            .length;
    const totalCardEntries = allCards.length + supportCards.length;

    const totalCardsCount =
        allCards.reduce((s, c) => s + safe(c.count), 0) +
        supportCards.reduce((s, c) => s + safe(c.count), 0);

    const rarityCounts = allCards.reduce((acc, c) => {
        const r = c.rarity || "unknown";
        acc[r] = (acc[r] || 0) + 1;
        return acc;
    }, {});

    const maxedCount = allCards.filter(
        (c) => c.level && c.maxLevel && c.level >= c.maxLevel,
    ).length;
    const percentMaxed = totalCardEntries
        ? (maxedCount / totalCardEntries) * 100
        : 0;

    // Deck averages
    const deckAvgLevel = currentDeck.length
        ? currentDeck.reduce((s, c) => s + safe(c.level), 0) /
          currentDeck.length
        : 0;
    const deckAvgElixir = currentDeck.length
        ? currentDeck.reduce((s, c) => s + safe(c.elixirCost), 0) /
          currentDeck.length
        : 0;
    const legendaryInDeck = currentDeck.filter(
        (c) => c.rarity === "legendary",
    ).length;

    // Other derived stats
    const donations = safe(player.totalDonations || player.donations);
    const donationsPerWin = wins ? donations / wins : 0;
    const donationsPerBattle = totalBattles ? donations / totalBattles : 0;
    const threeCrownPerWin = wins ? safe(player.threeCrownWins) / wins : 0;
    const trophyScore = safe(player.trophies);
    const bestTrophies = safe(player.bestTrophies) || safe(player.bestTrophies);

    // New interesting / estimated stats
    const avgMatchMinutes = 8; // conservative estimate
    const estimatedPlayHours = round(totalBattles * (avgMatchMinutes / 60), 1);

    // collection "value" heuristic (weights)
    const rarityWeight = {
        common: 1,
        rare: 5,
        epic: 20,
        legendary: 120,
        champion: 200,
        unknown: 2,
    };
    const collectionValue = allCards.reduce((sum, c) => {
        const weight = rarityWeight[c.rarity] ?? rarityWeight.unknown;
        const count = safe(c.count) || 1;
        return sum + weight * count;
    }, 0);

    // deck elixir spread
    const deckElixirs = currentDeck
        .map((c) => safe(c.elixirCost))
        .filter(Boolean);
    const deckMinElixir = deckElixirs.length ? Math.min(...deckElixirs) : 0;
    const deckMaxElixir = deckElixirs.length ? Math.max(...deckElixirs) : 0;

    // rarity / champion counts
    const championCount = allCards.filter(
        (c) => c.rarity === "champion",
    ).length;
    const legendaryCount = allCards.filter(
        (c) => c.rarity === "legendary",
    ).length;

    // challenges / tournaments
    const challengeCardsWon = safe(player.challengeCardsWon);
    const challengeMaxWins = safe(player.challengeMaxWins);
    const tournamentBattles = safe(player.tournamentBattleCount);

    // ranked / league
    const leagueCurr = player.leagueStatistics?.currentSeason || {};
    const leagueBest = player.leagueStatistics?.bestSeason || {};
    const rankedTrophies = safe(leagueCurr.trophies) || trophyScore;
    const rankedBest =
        safe(leagueCurr.bestTrophies) || safe(leagueBest.trophies);

    // progression / exp
    const expPoints = safe(player.expPoints) || safe(player.totalExpPoints);
    const expLevel = safe(player.expLevel);

    // account "age" heuristic
    // use totalBattles and donations as proxy: assume ~10 battles/day avg for active players
    const estimatedDays = totalBattles
        ? Math.max(30, Math.round(totalBattles / 8))
        : 0;
    const estimatedAccountAge =
        player.badges?.find((b) => b.name === "YearsPlayed")?.level || 0;

    // helpers
    const pct = (v) => round(v, 1) + "%";
    const num = (v) => round(v, 0);
</script>

<!-- ...existing code... -->

<div class="player-stats">
    <section>
        <ul class="stats" id="general">
            <li>
                <h2><strong>Trophies:</strong></h2>
                <p>{player.trophies}</p>
            </li>
            <li>
                <h2><strong>Clan:</strong></h2>
                <p>{player.clan ? player.clan.name : "No clan"}</p>
            </li>
            <li>
                <h2><strong>Level:</strong></h2>
                <p>{player.expLevel}</p>
            </li>
            <li>
                <h2><strong>Wins:</strong></h2>
                <p>{player.wins}</p>
            </li>
            <li>
                <h2><strong>Losses:</strong></h2>
                <p>{player.losses}</p>
            </li>
        </ul>
    </section>

    <section>
        <div id="current-deck">
            <Deck
                style="margin-top: 20px"
                cards={allCards}
                currentDeck={player.currentDeck}
                support={player.currentDeckSupportCards[0]}
            />
        </div>
    </section>

    <section class="details">
        <h2>Detailed stats</h2>

        <div class="grid">
            <div class="stat">
                <div class="value">{round(winRate, 1)}%</div>
                <div class="label">Win rate ({wins}/{totalBattles})</div>
            </div>

            <div class="stat">
                <div class="value">{round(threeCrownRate, 1)}%</div>
                <div class="label">
                    3‑crown rate ({safe(player.threeCrownWins)})
                </div>
            </div>

            <div class="stat">
                <div class="value">{num(deckAvgLevel)}</div>
                <div class="label">Avg deck level</div>
            </div>

            <div class="stat">
                <div class="value">{round(deckAvgElixir, 2)}</div>
                <div class="label">Avg deck elixir</div>
            </div>

            <div class="stat">
                <div class="value">{legendaryInDeck}</div>
                <div class="label">Legendaries in deck</div>
            </div>

            <div class="stat">
                <div class="value">{num(totalCardsCount)}</div>
                <div class="label">Total card instances</div>
            </div>

            <div class="stat">
                <div class="value">{uniqueCardsOwned}/{totalCardEntries}</div>
                <div class="label">Unique cards owned</div>
            </div>

            <div class="stat">
                <div class="value">{round(percentMaxed, 1)}%</div>
                <div class="label">Cards maxed</div>
            </div>

            <div class="stat">
                <div class="value">{num(donationsPerWin)}</div>
                <div class="label">Donations per win</div>
            </div>

            <div class="stat">
                <div class="value">{round(donationsPerBattle, 2)}</div>
                <div class="label">Donations per battle</div>
            </div>

            <div class="stat">
                <div class="value">{estimatedPlayHours}h</div>
                <div class="label">Est. play time</div>
            </div>

            <div class="stat">
                <div class="value">{collectionValue}</div>
                <div class="label">Collection value (heuristic)</div>
            </div>

            <div class="stat">
                <div class="value">{deckMinElixir}—{deckMaxElixir}</div>
                <div class="label">Deck elixir range</div>
            </div>

            <div class="stat wide">
                <div>
                    <div class="value">Trophies: {trophyScore}</div>
                    <div class="label">Best: {bestTrophies}</div>
                </div>
                <div class="mini">
                    <div class="small">
                        League (this season): {rankedTrophies}
                    </div>
                    <div class="small">Best season: {rankedBest}</div>
                </div>
            </div>
        </div>

        <div class="extra-grid">
            <div class="card-block">
                <h3>Progress & account</h3>
                <ul class="mini-list">
                    <li>Level: <strong>{expLevel}</strong></li>
                    <li>EXP points: <strong>{expPoints}</strong></li>
                    <li>
                        Account age: <strong>{estimatedAccountAge}</strong>
                    </li>
                    <li>
                        Estimated play days (proxy): <strong
                            >{estimatedDays} days</strong
                        >
                    </li>
                </ul>
            </div>

            <div class="card-block">
                <h3>Challenges & events</h3>
                <ul class="mini-list">
                    <li>
                        Challenge cards won: <strong>{challengeCardsWon}</strong
                        >
                    </li>
                    <li>
                        Challenge best streak: <strong
                            >{challengeMaxWins}</strong
                        >
                    </li>
                    <li>
                        Tournament battles: <strong>{tournamentBattles}</strong>
                    </li>
                </ul>
            </div>

            <div class="card-block">
                <h3>Collection highlights</h3>
                <ul class="mini-list">
                    <li>
                        Legendaries owned: <strong>{legendaryCount}</strong>
                    </li>
                    <li>Champions owned: <strong>{championCount}</strong></li>
                    <li>
                        Top cards (level): <strong
                            >{topCards.map((c) => c.name).join(", ")}</strong
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="rarity-breakdown">
            <h3>Collection by rarity</h3>
            <ul>
                {#each Object.entries(rarityCounts) as [rar, cnt]}
                    <li><strong>{rar}</strong>: {cnt}</li>
                {/each}
            </ul>
        </div>
    </section>

    <section>
        <h2>Badges</h2>

        <ul id="badges" class="stats">
            {#each player.badges as badge}
                {#if !badge.name.includes("Mastery")}
                    <li>
                        <div class="badge">
                            <img
                                class="badge-image"
                                src=" {badge.iconUrls.large}"
                                alt="{badge.name} badge"
                            />
                            <p>{badge.name}</p>
                            <p class="level">
                                {badge.level}
                            </p>
                        </div>
                    </li>
                {/if}
            {/each}
        </ul>
    </section>
</div>

<!-- ...existing code... -->

<style lang="scss">
    .player-stats {
        color: var(--neutral-900);
        section {
            position: relative;
        }

        #current-deck {
            border-radius: 15px;
        }

        .stats#general {
            list-style: none;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 1rem;

            li {
                color: var(--neutral-800);
                background-size: cover;
                background-color: var(--primary-200);
                border: var(--primary-400 1px solid);
                border-top: var(--primary-300 1px solid);
                aspect-ratio: 1/1;
                border-radius: 15px;
                padding: 1rem;
            }
        }

        .details {
            margin: 1.25rem auto 3rem;
            background: var(--primary-200);
            padding: 1rem;
            border-radius: 10px;
            color: var(--neutral-900);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
            border: 1px solid rgba(255, 255, 255, 0.03);

            h2 {
                margin: 0 0 0.75rem;
                font-size: 1.25rem;
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.75rem;
            }

            .stat {
                background: rgba(255, 255, 255, 0.02);
                padding: 0.85rem;
                border-radius: 8px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.03);

                .value {
                    font-weight: 700;
                    font-size: 1.25rem;
                    margin-bottom: 0.25rem;
                    color: var(--neutral-900);
                }
                .label {
                    font-size: 0.85rem;
                    color: var(--neutral-300);
                }
            }

            .stat.wide {
                grid-column: span 3;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .extra-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 0.75rem;
                margin-top: 0.85rem;
            }

            .card-block {
                background: rgba(0, 0, 0, 0.03);
                padding: 0.65rem;
                border-radius: 8px;
                border: 1px solid rgba(0, 0, 0, 0.04);
            }

            .mini-list {
                list-style: none;
                padding: 0;
                margin: 0.5rem 0 0 0;
                li {
                    margin: 0.35rem 0;
                    color: var(--neutral-600);
                    font-size: 0.95rem;
                }
            }

            .rarity-breakdown {
                margin-top: 0.9rem;
                h3 {
                    margin: 0 0 0.5rem;
                    font-size: 1rem;
                }
                ul {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    li {
                        color: var(--neutral-600);
                        background: rgba(255, 255, 255, 0.02);
                        padding: 0.4rem 0.6rem;
                        border-radius: 6px;
                    }
                }
            }
        }

        /* other styles left unchanged... */
    }

    #badges {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 1rem;
        list-style: none;
        padding: 0;

        .badge {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: var(--primary-200);
            padding: 0.75rem;
            border-radius: 10px;
            color: var(--neutral-900);
            border: 2px solid #2828a4;
            box-shadow: 0 0 7px var(--primary-400);
            overflow: hidden;

            .badge-image {
                width: 130px;
                height: auto;
                background-size: cover;
                margin: -25px;
                margin-bottom: 5px;
            }
            p {
                margin: 0;
                font-weight: 600;
            }

            .level {
                margin-top: 0.25rem;
                font-size: 0.95rem;
                color: var(--neutral-600);
            }
        }
    }

    @media (max-width: 650px) {
        .player-stats {
            section {
                padding: 0.75rem;
            }

            .stats#general {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }

            .details {
                .grid {
                    grid-template-columns: repeat(2, 1fr);
                }

                .stat.wide {
                    grid-column: 1 / span 2;
                }
            }

            .details .extra-grid {
                grid-template-columns: 1fr;
            }

            #badges {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }
    }

    @media (max-width: 400px) {
        .player-stats {
            .stats#general {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            #badges {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    }
</style>
