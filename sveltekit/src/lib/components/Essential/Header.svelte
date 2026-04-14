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
        <a id="profile" href="/profile">{!letUser ? "Log in" : "My profile"}</a>
        <a id="logout" href="/logOut.php">Log out</a>
    </div>
</header>

<style lang="scss">
    header {
        position: sticky;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: var(--static-primary-700);
        border-radius: 8px 8px 0 0;
        color: var(--static-neutral-100);

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

            #logout {
                position: absolute;
                top: 100%;
                left: 0;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.1s ease;
                background-color: black;
                padding: 0.5rem 0;
                border-radius: 5px;
                width: 100%;
                border: 1px solid transparent;

                &:hover {
                    border: 1px solid var(--primary-700);
                    background-color: var(--primary-200);
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
