<script>
    import "$lib/css/global.scss";
    import { goto } from "$app/navigation";

    let searchTag = "";
    const examples = ["89PY22Q89", "2ULJU2RQG", "RV08Y88"];

    const sanitize = (tag) => tag.replace(/#/g, "").trim().toUpperCase();

    function searchPlayer() {
        const t = sanitize(searchTag);
        if (t) goto(`/player/${t}`);
    }

    function onSubmit(event) {
        event.preventDefault();
        searchPlayer();
    }
</script>

<main class="hero">
    <div class="card">
        <header class="header">
            <h1>Clash Royale Stats</h1>
            <p class="subtitle">Quickly look up any player's stats by tag.</p>
        </header>

        <form
            class="search"
            on:submit={onSubmit}
            aria-label="Search player by tag"
        >
            <label for="player-tag" class="visually-hidden">Player tag</label>
            <div class="input-wrap">
                <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20l-5.99-6zM10 15a5 5 0 110-10 5 5 0 010 10z"
                    />
                </svg>
                <input
                    id="player-tag"
                    type="text"
                    inputmode="text"
                    placeholder="Enter player tag (e.g. 89PY22Q89 or #89PY22Q89)"
                    bind:value={searchTag}
                    autocomplete="on"
                    list="player-tags"
                    on:keydown={(e) => e.key === "Enter" && searchPlayer()}
                    aria-label="Player tag"
                />
                <datalist id="player-tags">
                    {#each examples as ex}
                        <option value={ex}></option>
                        <option value={"#" + ex}></option>
                    {/each}
                </datalist>
            </div>

            <button type="submit" class="btn">Search</button>
        </form>

        <div class="examples">
            <span>Examples:</span>
            {#each examples as ex}
                <a class="example-link" href={`/player/${ex}`}>{ex}</a>
            {/each}
        </div>

        <footer class="foot">
            <small
                >Tip: you can paste tags with or without the leading "#".</small
            >
        </footer>
    </div>
</main>

<style lang="scss">
    @use "src/lib/css/colors.scss" as *;

    :global(.visually-hidden) {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
        border: 0;
        padding: 0;
        margin: -1px;
    }

    .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: linear-gradient(
            135deg,
            rgba(42, 46, 90, 0.95) 0%,
            rgba(12, 15, 30, 0.95) 100%
        );
        color: var(--neutral-900);
    }

    .card {
        width: 100%;
        max-width: 880px;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.03),
            rgba(255, 255, 255, 0.015)
        );
        border-radius: 14px;
        padding: 2.2rem;
        box-shadow: 0 10px 40px rgba(8, 10, 30, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(6px);
    }

    .header {
        text-align: center;
        margin-bottom: 1.25rem;

        h1 {
            font-size: 2.4rem;
            margin: 0;
            letter-spacing: 0.4px;
            color: var(--neutral-900);
            text-shadow: 0 0 20px rgba(81, 67, 214, 0.12);
        }

        .subtitle {
            margin: 0.45rem 0 0;
            color: var(--neutral-800);
            font-size: 1rem;
        }
    }

    .search {
        display: flex;
        gap: 0.75rem;
        align-items: center;
        margin-top: 0.75rem;
    }

    .input-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.04);
        padding: 0.45rem 0.6rem;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.03);
        transition:
            box-shadow 0.16s ease,
            transform 0.12s ease;

        &:focus-within {
            box-shadow: 0 6px 24px rgba(81, 67, 214, 0.12);
            transform: translateY(-1px);
            border-color: rgba(81, 67, 214, 0.28);
        }

        .icon {
            width: 22px;
            height: 22px;
            color: var(--primary-600);
            margin-right: 0.6rem;
            opacity: 0.95;
            flex-shrink: 0;
        }

        input {
            background: transparent;
            border: none;
            outline: none;
            color: var(--neutral-800);
            font-size: 1.05rem;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 0.6px;

            &::placeholder {
                color: #bfbfbf;
                opacity: 0.9;
                text-transform: none;
            }
        }
    }

    .btn {
        background: linear-gradient(
            180deg,
            rgba(81, 67, 214, 0.98),
            rgba(58, 43, 175, 0.98)
        );
        color: white;
        border: none;
        padding: 0.7rem 1.05rem;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(81, 67, 214, 0.18);
        transition:
            transform 0.12s ease,
            box-shadow 0.12s ease;
    }

    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(81, 67, 214, 0.22);
    }

    .examples {
        margin-top: 1rem;
        display: flex;
        gap: 0.6rem;
        align-items: center;
        flex-wrap: wrap;
        color: var(--neutral-800);
        font-size: 0.95rem;

        .example-link {
            background: rgba(255, 255, 255, 0.02);
            padding: 0.28rem 0.6rem;
            border-radius: 8px;
            color: var(--primary-600);
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.02);
            transition:
                background 0.12s,
                transform 0.08s;
        }

        .example-link:hover {
            background: rgba(255, 255, 255, 0.04);
            transform: translateY(-2px);
        }
    }

    .foot {
        margin-top: 1.1rem;
        color: var(--neutral-600);
        font-size: 0.85rem;
        text-align: center;
    }

    @media (max-width: 640px) {
        .card {
            padding: 1.25rem;
        }
        .header h1 {
            font-size: 1.6rem;
        }
        .search {
            flex-direction: column;
            align-items: stretch;
        }
        .btn {
            width: 100%;
        }
    }
</style>
