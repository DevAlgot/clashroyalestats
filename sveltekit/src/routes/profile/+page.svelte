<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { getUser, user } from "$lib/js/user.js";
    import PlayerStats from "$lib/components/Player/PlayerStats.svelte";
    import PlayerHead from "$lib/components/Player/PlayerHead.svelte";
    import { page } from "$app/state";
    import { get } from "svelte/store";
    import { round, getLevel, sortBy, rarityRank } from "$lib/utils";

    import Match from "$lib/components/Player/Match.svelte";
    import PlayerBattles from "$lib/components/Player/PlayerBattles.svelte";
    import PlayerCards from "$lib/components/Player/PlayerCards.svelte";

    console.log($user);

    let idInput = "";
    let error = "";

    let { data } = $props();

    // ...existing code...

    const battlelog = data.battlelog;
    const player = data.player;
    const cards = player?.cards;

    const pages = ["profile", "battles", "cards"];
    let currentpage = $state("profile");

    let signUp = $state(false);
</script>

<!-- login page when not logged in -->
{#if $user !== null}
    <main class="player">
        <br />

        <!-- user card (keeps PlayerHead / upper stats unchanged) -->
        <section class="user-card">
            <div class="user-avatar" aria-hidden>
                {#if $user.username}
                    {$user.username.charAt(0).toUpperCase()}
                {:else}
                    U
                {/if}
            </div>
            <div class="user-info">
                <h2 class="username">{$user.username}</h2>
                <p class="muted">ID: <code>{$user.sid}</code></p>
                <div class="user-actions">
                    <form
                        action="/logOut.php"
                        method="POST"
                        class="inline-form"
                    >
                        <button type="submit" class="btn primary"
                            >Sign out</button
                        >
                    </form>
                </div>
            </div>
        </section>
        <br class="dark" />
        <div class="upper head">
            <PlayerHead
                {player}
                bind:selectedPage={currentpage}
                code={$user.sid}
            />
        </div>
        <div class="upper stats">
            {#if currentpage === "profile"}
                <PlayerStats {player} />
            {:else if currentpage === "battles"}
                <PlayerBattles {player} {battlelog} />
            {:else if currentpage === "cards"}
                <PlayerCards {player} {cards} />
            {/if}
        </div>
        <!-- New detailed stats section -->
    </main>
{/if}

{#if $user === null}
    {#if !signUp}
        <main>
            <div class="auth-card">
                <h1>Sign in</h1>
                <p class="muted">Enter your credentials to continue.</p>
                <form action="/welcome.php" method="POST" class="form">
                    <input type="hidden" name="return" />
                    <div class="field">
                        <label for="mail">Email</label>
                        <input
                            id="mail"
                            name="mail"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div class="field">
                        <label for="pass">Password</label>
                        <input
                            id="pass"
                            name="pass"
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div class="actions">
                        <input
                            type="submit"
                            class="btn primary"
                            value="SIGN IN"
                        />
                    </div>
                </form>

                <footer class="card-footer">
                    <small>
                        Don't have an account?
                        <button
                            class="btn link"
                            onclick={() => (signUp = true)}
                        >
                            Sign up
                        </button>
                    </small>
                </footer>
            </div>
        </main>
    {:else}
        <main>
            <div class="auth-card">
                <h1>Create account</h1>
                <p class="muted">Quick sign up — we only need a few details.</p>
                <form action="/signUp.php" method="POST" class="form">
                    <input type="hidden" name="return" />
                    <div class="field">
                        <label for="username">Username</label>
                        <input id="username" name="username" required />
                    </div>
                    <div class="field">
                        <label for="mail">Email</label>
                        <input
                            id="mail"
                            name="mail"
                            type="email"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div class="field">
                        <label for="pass">Password</label>
                        <input
                            id="pass"
                            name="pass"
                            type="password"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <div class="field">
                        <label for="sid">Clash Royale ID</label>
                        <input
                            id="sid"
                            name="sid"
                            placeholder="000000"
                            required
                        />
                    </div>

                    <div class="actions">
                        <input
                            type="submit"
                            class="btn primary"
                            value="SIGN UP"
                        />
                    </div>
                </form>

                <footer class="card-footer">
                    <small>
                        Have an account?
                        <button
                            class="btn link"
                            onclick={() => (signUp = false)}
                        >
                            Sign in
                        </button>
                    </small>
                </footer>
            </div>
        </main>
    {/if}
{/if}

<style lang="scss">
    @use "src/lib/css/colors.scss" as theme;
    main.player {
        display: block !important;
        color: var(--neutral-100);
        padding-bottom: 2rem;
    }

    .upper {
        padding: 1rem;
        border-radius: 8px;
        max-width: 1200px;
        margin: auto;
        background-color: var(--primary-700);

        &.head {
            border-bottom: 0;
            border-radius: 8px 8px 0 0;
        }

        &.stats {
            border-bottom: 0;
            border-top: 0;
            border-radius: 0 0 8px 8px;
            background-color: var(--primary-100);
        }
    }

    /* Auth card + user card styles */
    .auth-card,
    .user-card {
        max-width: 760px;
        margin: 1rem auto;
        padding: 1.25rem;
        border-radius: 10px;
        background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.02),
            rgba(0, 0, 0, 0.02)
        );
        border: 1px solid rgba(255, 255, 255, 0.03);
        color: var(--neutral-900);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    }

    .auth-card h1,
    .user-card h2 {
        margin: 0 0 0.5rem 0;
    }

    .auth-card .muted,
    .user-card .muted {
        color: var(--neutral-600);
        margin-bottom: 0.75rem;
    }

    .form .field {
        margin-bottom: 0.75rem;
    }

    .form label {
        display: block;
        font-size: 0.85rem;
        margin-bottom: 0.25rem;
        color: var(--neutral-600);
    }

    .form input[type="text"],
    .form input[type="email"],
    .form input[type="password"],
    .form input[type="number"],
    .form input {
        width: 100%;
        padding: 0.6rem 0.75rem;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.04);
        background: rgba(0, 0, 0, 0.04);
        color: var(--neutral-900);
    }

    .actions {
        margin-top: 0.5rem;
    }

    .btn {
        display: inline-block;
        padding: 0.55rem 0.9rem;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        font-weight: 700;
    }

    .btn.primary {
        background: linear-gradient(
            180deg,
            var(--accent-300),
            var(--accent-200)
        );
        color: white;
    }

    .btn.link {
        background: transparent;
        color: var(--accent-300);
        padding: 0;
        font-weight: 600;
    }

    /* user card */
    .user-card {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .user-avatar {
        width: 64px;
        height: 64px;
        border-radius: 10px;
        background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.02),
            rgba(0, 0, 0, 0.06)
        );
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--neutral-900);
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .user-info .username {
        margin: 0;
        font-size: 1.2rem;
    }

    .user-actions {
        margin-top: 0.45rem;
    }

    .muted code {
        background: rgba(0, 0, 0, 0.04);
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
        color: var(--neutral-800);
    }

    @media (max-width: 880px) {
        .upper,
        .details {
            width: 92vw;
        }
        .grid {
            grid-template-columns: repeat(2, 1fr);
        }
        .stat.wide {
            grid-column: span 2;
        }

        .user-card {
            flex-direction: row;
        }
    }

    @media (max-width: 560px) {
        .grid {
            grid-template-columns: 1fr;
        }
        .stat.wide {
            grid-column: span 1;
        }
        .user-card {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
