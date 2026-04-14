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
        <section>
            <h1>{$user.username}</h1>
            <button><a href="/logOut.php">Sing out</a></button>
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
            <h1>Login</h1>
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
                    <input type="submit" class="primary" value="SIGN IN" />
                </div>
            </form>

            <footer class="card-footer">
                <small
                    >Don't have an account? <button
                        onclick={() => (signUp = true)}>Sign up</button
                    ></small
                >
            </footer>
        </main>
    {:else}
        <main>
            <h1>Login</h1>
            <form action="/signUp.php" method="POST" class="form">
                <input type="hidden" name="return" />
                <div class="field">
                    <label for="mail">Username</label>
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
                    <label for="pass">Clash Royale ID</label>
                    <input id="sid" name="sid" placeholder="000000" required />
                </div>

                <div class="actions">
                    <input type="submit" class="primary" value="SIGN UP" />
                </div>
            </form>

            <footer class="card-footer">
                <small
                    >Have an account? <button onclick={() => (signUp = false)}
                        >Sign in</button
                    ></small
                >
            </footer>
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
    }

    @media (max-width: 560px) {
        .grid {
            grid-template-columns: 1fr;
        }
        .stat.wide {
            grid-column: span 1;
        }
    }
</style>
