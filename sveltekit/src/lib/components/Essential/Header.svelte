<script>
    import { isUser } from "$lib/js/user.js";

    let isDark = $state(false);

    function toggleDark() {
        isDark = !isDark;
        console.log(isDark);
    }

    let letUser = isUser();
</script>

<header>
    <h2><a href="/">Royalty Statistics</a></h2>

    <div>
        {#if !letUser}
            <a id="profile" href="/profile">Log in </a>
        {:else}
            <nav>
                My profile
                <div id="profile-nav">
                    <a href="/profile">My Page</a>
                    <a id="logout" href="/logOut.php">Log out</a>
                </div>
            </nav>
        {/if}
    </div>
</header>

<style lang="scss">
    header {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: rgba(56, 18, 99, 0.2);
        border-radius: 8px 8px 0 0;
        color: var(--static-neutral-100);
        z-index: 2;
        width: 100%;
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgb(45, 22, 73);

        a {
            color: var(--static-neutral-100);
            text-decoration: none;
            text-align: center;
        }

        #profile {
            margin: 0 10px;
        }

        div {
            position: relative;

            nav {
                position: relative;
                cursor: pointer;
                min-width: 100px;
                text-align: center;

                #profile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    position: absolute;
                    top: 100%;
                    right: 0;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.1s ease;
                    background-color: black;
                    border-radius: 5px;
                    width: 100%;
                    border: 1px solid transparent;

                    a {
                        padding: 8px 0;
                        width: 100%;
                        display: block;

                        &:hover {
                            background-color: var(--primary-200);
                        }
                    }
                }

                &:hover #profile-nav {
                    opacity: 1;
                    pointer-events: all;
                }
            }

            &:hover #logout {
                opacity: 1;
                pointer-events: all;
            }
        }

        h2 {
            margin: 0;
        }
    }
</style>
