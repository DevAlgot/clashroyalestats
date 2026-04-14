<script>
    import Trophy from "$lib/assets/trophy.png";
    import Crown from "$lib/assets/blue-crown.png";

    let { player = {} } = $props();

    // safe last-seen formatting

    function parseClashDate(raw) {
        if (!raw) return null;
        const m = raw.match(
            /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(?:\.(\d+))?Z?$/,
        );
        if (m) {
            const [, Y, MO, D, HH, MM, SS, MS] = m;
            const ms = MS ? MS.padEnd(3, "0").slice(0, 3) : "000";
            return new Date(`${Y}-${MO}-${D}T${HH}:${MM}:${SS}.${ms}Z`);
        }
        const parsed = Date.parse(raw);
        return isNaN(parsed) ? null : new Date(parsed);
    }

    function timeAgo(date) {
        const sec = Math.floor((Date.now() - date.getTime()) / 1000);
        if (sec < 10) return "just now";
        if (sec < 60) return `${sec}s ago`;
        const min = Math.floor(sec / 60);
        if (min < 60) return `${min}m ago`;
        const hr = Math.floor(min / 60);
        if (hr < 24) return `${hr}h ago`;
        const days = Math.floor(hr / 24);
        if (days < 7) return `${days}d ago`;
        return date.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    let lastSeen = $derived.by(() => {
        const d = parseClashDate(player?.lastSeen);
        return d ? timeAgo(d) : "Never";
    });
    //20260323T130405.000Z

    // derive a stable arena index from the arena object with sensible fallbacks
    function getArena(arena = {}) {
        const id = arena.id; // e.g. 54000000 for Dragon Spa
        const baseUrl = "https://static.wikia.nocookie.net/clashroyale/images";

        // Most arena icons follow this pattern now (small icon, ~170-200px width)
        return `${baseUrl}/thumb/${id.toString().slice(0, 2)}/${id}Arena.png/revision/latest/scale-to-width-down/170`;
    }

    // primary: StatsRoyale CDN; adjust if you host local assets instead
    const arenaImg = getArena(player.arena);

    const role = player.role ?? "";

    const medalClass =
        player.clanRank === 1
            ? "medal gold"
            : player.clanRank === 2
              ? "medal silver"
              : player.clanRank === 3
                ? "medal bronze"
                : "";
</script>

<article class="clan-player">
    <div class="arena {medalClass}"><p>{player.clanRank}</p></div>

    <div class="info">
        <a href="/player/{player.tag.replace('#', '')}" class="row top">
            <h3 class="name flex">
                {#if player.role === "leader"}
                    <img
                        src={Crown}
                        width="auto "
                        height="28px"
                        alt=""
                    />{player.name}
                {:else}
                    {player.name}
                {/if}
            </h3>
            <span class="tag">{player.tag}</span>
        </a>

        <div class="row meta">
            <span class="role">{role}</span>

            <span class="level">Lv {player.expLevel ?? "—"}</span>
            <span class="trophies"
                ><img src={Trophy} width="12px" height="12px" alt="" />
                {player.trophies ?? "—"}</span
            >
            <span class="arena-name"
                >{player.arena?.name ?? "Arena unknown"}</span
            >
        </div>

        <div class="row small">
            <span class="last">Last seen: {lastSeen}</span>
        </div>
    </div>
</article>

<style lang="scss">
    .clan-player {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        background: var(--primary-200);
        border-radius: 6px;
        margin-bottom: 0.5rem;
        color: var(--neutral-900);

        .arena {
            display: flex;
            width: 72px;
            height: 72px;
            flex-shrink: 0;
            border-radius: 16px;
            background: var(--primary-300);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
            justify-content: center;
            align-items: center;

            &.medal {
            }

            &.gold {
                $bg-color: #d4af37;
                $border-color: lighten(
                    $color: $bg-color,
                    $amount: 20%,
                );
                background-color: $bg-color;
                border: 3px solid $border-color;
                box-shadow: 0 0 4px 0px $border-color;
                color: #111;
            }
            &.silver {
                $bg-color: #c0c0c0;
                $border-color: lighten(
                    $color: $bg-color,
                    $amount: 20%,
                );
                background-color: $bg-color;
                border: 3px solid $border-color;
                box-shadow: 0 0 4px 0px $border-color;
                color: #111;
            }
            &.bronze {
                $bg-color: #cd7f32;
                $border-color: lighten(
                    $color: $bg-color,
                    $amount: 20%,
                );
                background-color: $bg-color;
                border: 3px solid $border-color;
                box-shadow: 0 0 4px 0px $border-color;
                color: #111;
            }

            p {
                margin: 0;
                font-size: 1.5rem;
            }
        }

        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;

            .row {
                display: flex;
                gap: 0.75rem;
                align-items: center;
                flex-wrap: wrap;
            }

            .top {
                color: var(--neutral-900);

                * {
                    transition: all 0.12s ease;

                    &:hover {
                        color: var(--neutral-600) !important;
                        scale: 1.02;
                    }

                    &:active {
                        scale: 0.98;
                    }
                }

                .name {
                    margin: 0;
                    font-size: 1.05rem;
                    font-weight: 600;

                    &.flex {
                        display: flex;
                        align-items: center;
                        gap: 0.3rem;
                    }
                }

                .tag {
                    font-family: monospace;
                    color: var(--neutral-700);
                    font-size: 0.9rem;
                }
            }

            .meta {
                font-size: 0.9rem;
                color: var(--neutral-700);

                .role {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 0.15rem 0.5rem;
                    border-radius: 999px;
                    font-weight: 600;
                    color: var(--accent-700);

                    &.flex {
                        display: flex;
                        align-items: center;
                        gap: 0.3rem;
                    }
                }

                .level,
                .trophies,
                .arena-name {
                    padding: 0.15rem 0.4rem;
                    border-radius: 4px;
                    background: rgba(255, 255, 255, 0.02);
                }
            }

            .small {
                font-size: 0.8rem;
                color: var(--neutral-600);
            }
        }
    }

    @media (max-width: 720px) {
        .clan-player {
            .arena {
                width: 56px;
                height: 56px;
            }
            .info .top .name {
                font-size: 1rem;
            }
        }
    }
</style>
