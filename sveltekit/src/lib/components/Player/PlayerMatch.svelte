<script>
    let { player, opponent } = $props();
    import trophy from "$lib/assets/trophy.png";

    let badgeId = $state(0);
    if (player.clan != null) badgeId = player.clan.badgeId;
</script>

<section class="{opponent ? 'opponent' : 'team'} stats">
    <div id="player">
        <img
            src="https://cdn.statsroyale.com/images/badges/{badgeId}.png"
            alt=""
        />
        <div>
            <h2>
                <a href="/player/{player.tag.replace('#', '')}">{player.name}</a
                >
            </h2>
            <h3>
                <a
                    class="clan"
                    href="/clan/{player?.clan?.tag.replace('#', '')}"
                >
                    {player?.clan?.name ? player.clan.name : "No clan"}
                </a>
            </h3>
        </div>
    </div>

    <section class="postTrophies">
        <img src={trophy} alt="" />
        <p class="trophies">
            {player.startingTrophies + player.trophyChange}
        </p>

        <div class="deltaTrophies {player.trophyChange > 0 ? 'win' : 'lose'}">
            <p>{player.startingTrophies}</p>

            {#if player.trophyChange > 0}
                <p>+</p>
            {:else if player.trophyChange === 0}
                <p>▬</p>
            {/if}
            <p>{player.trophyChange}</p>
        </div>
    </section>
</section>

<style lang="scss">
    .stats {
        margin-bottom: 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .opponent {
        align-items: end;

        #player {
            flex-direction: row-reverse;
            text-align: end;
        }

        .postTrophies {
            flex-direction: row-reverse;
        }
    }

    a {
        color: var(--neutral-900);

        &:hover {
            color: var(--neutral-600);
        }

        &.clan {
            color: var(--accent-600);
        }
    }

    #player {
        display: flex;
        align-items: center;
        font-size: smaller;
        gap: 0.4rem;
        h3 {
            font-weight: 500;
        }
        img {
            width: 40px;
        }
    }

    .postTrophies {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        font-size: 14px;
        color: var(--neutral-800);

        p {
            margin: 0;
        }

        img {
            width: 25px;
        }

        .deltaTrophies {
            padding: 0.2rem;
            display: flex;
            border-radius: 4px;
            &.win {
                border: 2px solid var(--win-color);
            }
            &.lose {
                border: 2px solid var(--lose-color);
            }
        }
    }
</style>
