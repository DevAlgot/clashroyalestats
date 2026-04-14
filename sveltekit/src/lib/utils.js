export function round(num, decimals = 2) {
    let decimalsNum = Math.pow(10, decimals);
    num *= decimalsNum;

    return Math.round(num) / decimalsNum;
}

export function getLevel(card) {
    return card.level + (16 - card.maxLevel);
}

export function sortBy(list, type, ascending) {
    let t = [];

    switch (type) {
        case 0:
            if (ascending)
                t = list.sort((a, b) => getLevel(a) - getLevel(b));
            else t = list.sort((b, a) => getLevel(a) - getLevel(b));
            break;
        case 1:
            if (ascending) t = list.sort((a, b) => a.id - b.id);
            else t = list.sort((b, a) => a.id - b.id);
            break;
        case 2:
            if (ascending)
                t = list.sort((a, b) => a.elixirCost - b.elixirCost);
            else t = list.sort((b, a) => a.elixirCost - b.elixirCost);
            break;
        case 3:
            t = list.sort(
                (a, b) => rarityRank[a.rarity] - rarityRank[b.rarity],
            );
            t = list.sort(
                (a, b) => rarityRank[b.rarity] - rarityRank[a.rarity],
            );
            break;
        default:
            break;
    }
    return t;
}

export const rarityRank = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    champion: 5,
};


export function getAvrageLevel(deck) {
    let sum = 0;
    for (let i = 0; i < deck.length; i++) {
        sum += getLevel(deck[i]);
    }
    return round(sum / deck.length, 1);
}

export function getAvrageElixir(deck) {
    let sum = 0;
    for (let i = 0; i < deck.length; i++) {
        sum += deck[i].elixirCost;
    }
    return round(sum / deck.length, 1);
}


export function sortCards(e, cardsGroupedByLevel) {
    switch (e.target.value) {
        case "rarity-asc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                        return a.elixirCost - b.elixirCost;
                    }
                    return rarityRank[a.rarity] - rarityRank[b.rarity];
                });
            }
            break;
        case "rarity-desc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    if (rarityRank[a.rarity] === rarityRank[b.rarity]) {
                        return b.elixirCost - a.elixirCost;
                    }
                    return rarityRank[b.rarity] - rarityRank[a.rarity];
                });
            }
            break;
        case "elixir-asc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((a, b) => {
                    const costA = a.elixirCost ?? 0;
                    const costB = b.elixirCost ?? 0;


                    return costA - costB;
                });
            }
            break;
        case "elixir-desc":
            for (let levelCards of cardsGroupedByLevel) {
                levelCards.sort((b, a) => {
                    const costA = a.elixirCost ?? 0;
                    const costB = b.elixirCost ?? 0;

                    if (costA == costB) {
                        return rarityRank[a.rarity] - rarityRank[b.rarity];
                    }
                    return costA - costB;
                });
            }
            break;
        case "evo-asc":
            for (let levelCards of cardsGroupedByLevel) {

                levelCards.sort((a, b) => {
                    console.log(a);

                    const evoA = a.evolutionLevel ?? 0;
                    const evoB = b.evolutionLevel ?? 0;

                    return evoB - evoA;
                });
            }
            break;
        case "evo-desc":
            for (let levelCards of cardsGroupedByLevel) {

                levelCards.sort((a, b) => {
                    console.log(a);

                    const evoA = a.evolutionLevel ?? 0;
                    const evoB = b.evolutionLevel ?? 0;

                    return evoA - evoB;
                });
            }
            break;
    }
    return cardsGroupedByLevel;
}


export const roles = {
    "member": "Member",
    "coLeader": "Co-Leader",
    "leader": "Leader",
    "elder": "Elder"
}

export function getTimeAgo(battleTimeString) {
    let year = battleTimeString.substring(0, 4);
    let month = battleTimeString.substring(4, 6);
    let day = battleTimeString.substring(6, 8);
    let hour = parseInt(battleTimeString.substring(9, 11)) + 2;
    let minute = battleTimeString.substring(11, 13);
    let second = battleTimeString.substring(13, 15);

    const battleTime = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();
    const diffInDays = Math.floor((now - battleTime) / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((now - battleTime) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((now - battleTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} week${Math.floor(diffInDays / 7) > 1 ? 's' : ''} ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} month${Math.floor(diffInDays / 30) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInDays / 365)} year${Math.floor(diffInDays / 365) > 1 ? 's' : ''} ago`;
}

export function switchDark() {
    console.log("Clicked");

}

export function getArena(arenaId, name) {
    let arena = arenaId - (54000000);
    console.log(name + "-" + arena + ": " + arenas[arena]);

    return arenas[arena];
}

let arenas = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 10,
    8: 7,
    9: 7,
    10: 9,
    11: 12,
    12: 15,
    13: 14,
    14: 15,
    15: 18,
    16: 18,
    17: 18,
    18: 19,
    19: 22,
    20: 23,
    31: 24
}
