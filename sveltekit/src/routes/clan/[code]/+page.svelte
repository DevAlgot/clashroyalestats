<script>
    import Player from "$lib/components/Clan/Player.svelte";
    import "$lib/css/global.scss";
    import "$lib/css/player.scss";

    let { data } = $props();

    const clan = data.clan;
</script>

<main class="clan">
    <br />
    <br />
    <div class="upper head">
        <section class="header">
            <section id="player-info">
                <img
                    src="https://cdn.statsroyale.com/images/badges/{clan.badgeId}.png"
                    alt=""
                />
                <div id="clan">
                    <h1 class="name">{clan.name}</h1>
                    <p class="tag">{clan.tag}</p>
                </div>
            </section>
            <p><i>{clan.description}</i></p>
        </section>
    </div>
    <div class="upper stats">
        {#each clan.memberList as player}
            <Player {player} />
        {/each}
    </div>
</main>

<style lang="scss">
    main.clan {
        display: block !important;
        color: var(--neutral-100);
    }
    .upper {
        padding: 1rem;
        border-radius: 8px;
        max-width: 1080px;
        margin: auto;
        background-color: var(--primary-300);

        &.head {
            border-bottom: 0;
            border-radius: 8px 8px 0 0;
        }

        &.stats {
            border-bottom: 0;
            border-top: 0;
            border-radius: 0 0 8px 8px;
            background-color: var(--primary-100);
            color: var(--neutral-900);
        }
    }

    .name {
        margin: 0;
        font-size: xx-large;
    }
    .tag {
        font-family: monospace;
        margin: 0;
        margin-top: 0;
    }
    .header {
        position: relative;
        margin: -1rem;
        margin-bottom: -1rem;
        border-radius: 8px 8px 0 0;
        padding: 1rem;
        margin-bottom: 1rem;
        background-color: var(--primary-200);
        height: 160px;
        color: var(--neutral-900);

        #player-info {
            display: flex;
            gap: 0.5rem;
            #clan {
                display: inherit;
                flex-direction: column;
                p {
                    color: var(--neutral-100);
                    a {
                        color: var(--accent-300);
                        text-decoration: none;
                    }
                }
            }
            img {
                height: 69px;
                width: auto;
            }
        }
    }
</style>
