function addPlayer() {
    players = createPlayer();
    // Set Players onto Div and display information

    let log = "";

    for (let i = 0; i < 4; i++) {
        log += `<p id="${players[i].tribute}">${players[i].name}<br><span id=health${i}>Hp: ${players[i].hp}</span><br><span id="personality${i}">Type: ${players[i].type.personality}</span><br><span id='wep${i}'>Weapon: ${players[i].wep.weapon}</span></p>`;
    }

    document.getElementById('playerMenu').innerHTML += log;

    // Set status
    changeStatusLog();


}

// Crate the exact player and their stats
function createPlayer() {
    let player = [];
    let random = 0;

    for (let i = 0; i < 4; i++) {

        player.push({
            tribute: i,
            name: `HERO${[i]}`,
            hp: randomHealth(),
            maxHp: 100,
            wep: randomWeapon(),
            type: randomType(),
            speed: randomInt(0, 10),
            image: random,
            kills: 0,
            baseDam: 0
        });
    }

    return player;
}

// Crate the exact player and their stats
function createMonster() {
    let monster = [];
    let amountMonsters = randomInt(1, 5);
    let random = 0;


    if (bossFight == false) {
        for (let i = 0; i < amountMonsters; i++) {

            monster.push({
                tribute: 9 + i,
                name: `MONSTER${i}`,
                hp: 50,
                maxHp: 1000000,
                wep: enemyWeapon(),
                type: randomType(),
                speed: randomInt(0, 10),
                image: random,
                kills: 0,
                baseDam: 0
            });
        }
    } else {
        amountMonsters = 1;
        monster.push({
            tribute: 9,
            name: `BOSS`,
            hp: randomInt(700, 1000),
            maxHp: 1000000,
            wep: bossWeapon(),
            type: randomType(),
            speed: randomInt(0, 10),
            image: random,
            kills: 0,
            baseDam: 0
        })
    }


    let log = "";

    // Set Players onto Div and display information
    for (let i = 0; i < amountMonsters; i++) {
        log += `<p id="${monster[i].tribute}">${monster[i].name}<br><span id=health${monster[i].tribute + "m"}>Hp: ${monster[i].hp}</span><br><span id="personality${i + "m"}">Type: ${monster[i].type.personality}</span><br><span>Weapon: ${monster[i].wep.weapon}</span></p>`;
    }

    document.getElementById('enemyMenu').innerHTML += log;

    return monster;

}