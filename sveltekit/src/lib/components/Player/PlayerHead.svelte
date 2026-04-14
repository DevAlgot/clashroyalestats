<script>
    import { roles } from "$lib/utils";
    import { page } from "$app/state";
    let { selectedPage = $bindable(), data, code, player, params } = $props();

    let urlToFavorite = player?.currentFavouriteCard.name
        .replace(/\s+/g, "_")
        .toLowerCase();

    let arena = player?.arena?.id - (54000000 - 3);
    let style = $state("");
    if (arena == 54000031) {
        arena = 24;
        style = `
            width: 169px;
            right: -1px;
            bottom: 0;
        `;
    }
    if (arena == 54000020) {
        style = `
            width: 141px;
            right: -1px;
            bottom: 0;
        `;
    }

    let arenaUrl = `/src/lib/assets/images/arenas/arena${arena}.png`;

    const basePath = `/player/${encodeURIComponent(code)}`;
    const navLinks = [
        { label: "Profile", key: "profile" },
        {
            label: "Battles",
            key: "battles",
        },
        { label: "Cards", key: "cards" },
    ];
</script>

<section class="header">
    <section id="player-info">
        <h1 class="name">{player.name}</h1>
        <p class="tag">{player.tag}</p>
        <div id="clan">
            <img
                src="https://cdn.statsroyale.com/images/badges/{player?.clan
                    ?.badgeId ?? '0'}.png"
                alt=""
            />
            <p>
                <a href="/clan/{player.clan?.tag.replace('#', '')}"
                    >{player?.clan?.name ?? "No clan"}</a
                >
                <br />{roles?.[player?.role] ?? ""}
            </p>
        </div>
    </section>

    <img
        id="favorite"
        src="https://cdn.statsroyale.com/v5/image/chr/{urlToFavorite}_dl.png"
        {style}
        alt=""
    />
</section>
<div id="nav">
    {#each navLinks as link}
        <button type="button" onclick={() => (selectedPage = link.key)}
            >{link.label}</button
        >
    {/each}
</div>

<style lang="scss">
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
        background-color: var(--static-primary-800);
        height: 160px;
        color: var(--static-neutral-100);

        #favorite {
            width: 362px;
            height: auto;
            float: right;
            margin: 0 auto;
            bottom: -25px;
            position: absolute;
        }

        #favorite {
            width: 200px;
            right: -18px;
            bottom: -14px;
            transform: scaleX(-1);
        }

        #player-info {
            #clan {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                p {
                    color: var(--static-neutral-100);
                    a {
                        color: var(--accent-600);
                        text-decoration: none;
                    }
                }
                img {
                    height: 52px;
                    width: auto;
                }
            }
        }
    }

    #nav {
        margin: -1rem;
        background-color: var(--static-primary-700);
        border-top: 1px solid var(--static-primary-400);
        border-right: 0;
        border-left: 0;
        white-space: nowrap;

        button {
            display: inline;
            text-decoration: none;
            background: none;
            border: none;
            margin: 0;

            padding: 1rem;
            cursor: pointer;

            color: var(--static-neutral-200);
            border-right: 1px solid var(--static-primary-200);

            &:hover {
                background-color: var(--static-primary-400);
                color: var(--static-neutral-100);
            }
        }
    }
</style>
