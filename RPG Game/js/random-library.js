// Library of Random Functions

// return a random decimal between low (inclusive) and high (exclusive)
function randomDec(low, high) {
    return Math.random() * (high - low) + low;
}
// return a random interger between low (inclusive) and high (exclusive)
function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// return a random rgb string
function randomRGB() {
    let r = randomInt(0, 256);
    let g = randomInt(0, 256);
    let b = randomInt(0, 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// return a random array element
function randomElement(grades) {
    return grades[randomInt(0, grades.length)];
}

// EVENT LISTENERS & HANDLERS
document.addEventListener("keydown", keydownHandlerLib);
document.addEventListener("keyup", keyupHandlerLib);

// Get the modal
let modal = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");
let keyIsDown = {};

// If key is pressed, oprn up menu
function keydownHandlerLib(event) {

    if (event.keyCode == 49) {
        keyIsDown[event.keyCode] = true;
        modal.style.display = "block";
    }

    // if (event.keyCode == 50) {
    //     keyIsDown[event.keyCode] = true;
    //     modal2.style.display = "block";
    // }

}

// If key is not pressed, close menu
function keyupHandlerLib(event) {
    keyIsDown[event.keyCode] = false;
    modal.style.display = "none";
    // modal2.style.display = "none";
}

// Return random health
function randomHealth() {
    return randomInt(80, 100);
}

// Return random type of personality
function randomType() {
    let array = [
        { personality: "Brawny", bonus: "if (attacker.wep.type == 'physical'){temp += 25}", applied: 'offense' }, // if attacker's weapon is physical, damage + 5,
        { personality: "Vampire", bonus: "if (attacker.wep.type == 'magic'){temp += 25}", applied: 'offense' }, // if attacker's weapon is physical, damage + 5,
        { personality: "Clown", bonus: "if (attacker.hp <= 10){temp += 8}", applied: 'offense' }, // If attacker is bellow ten hp, damage + 8
        { personality: "Smart", bonus: "temp += 10;", applied: 'offense' }, // if defender personality is dumb, damage + 15
        { personality: "Dumb", bonus: "if (attacker.hp >= '10'){temp += 25}", applied: 'offense' }, // if attacker is above ten HP, damage + 5
        { personality: "Saiyan", bonus: "if (randomInt(1, 10) > 5){temp += 25}", applied: 'offense' }, // If random number from 1-10 above 5, + 5 damage.
        { personality: "Paladin", bonus: "if (attacker.hp < 10){temp -= 25}", applied: 'defence' }, // if defender bellow ten hp, + 5 shield
        { personality: "Ailen", bonus: "if (defender.hp > 20){temp -= 35}", applied: 'defence' }, // if defender above 20 HP, shield + 3
        { personality: "Slave", bonus: "if (attacker.type.personality == 'Clown'){temp += 45}", applied: 'offense' }, // If attacker personality is clown, + 15 damage
        { personality: "Military", bonus: "if (attacker.wep.weapon == 'ranged'){temp += 35}", applied: 'offense' }, // if weapon is ranged, + 5 damage
        { personality: "Brain Dead", bonus: "if (randomInt(0, 10) < 5){temp -= 40;}", applied: 'offense' }, // if a number between 1 and 10 bellow 5, opponet shield += 10
    ]

    let random = randomInt(0, array.length);
    return array[random];
}

// Return random type of weapon
function randomWeapon() {
    let array = [
        { weapon: "Sword", type: "physical", ability: "randomInt(30, 50)", deathNote: "was sliced in half by a sword!", value: 1 },
        { weapon: "Shovel", type: "physical", ability:"randomInt(30, 40)", deathNote: "got dugged by a shovel!", value: 2 },
        { weapon: "Pistol", type: "ranged", ability: "randomInt(40, 50)", deathNote: "was shot by a pistol!", value: 1 },
        { weapon: "Knife", type: "physical", ability: "randomInt(30, 50)", deathNote: "was stabbed in the throat!", value: 1 },
        { weapon: "Shotgun", type: "ranged", ability: "randomInt(40, 50)", deathNote: "was blasted to rubble!", value: 2 },
        { weapon: "Spear", type: "ranged", ability: "randomInt(20, 30) + randomInt(20, 30)", deathNote: "got pierced by a spear!", value: 3 },
        { weapon: "Molotov", type: "ranged", ability: "randomInt(20, 40) + randomInt(30, 50)", deathNote: "screamed as fire from a broken molotov seared thy skin.", value: 3 },
        { weapon: "Machine Gun", type: "ranged", ability: "randomInt(10, 20) + randomInt(20, 30) + randomInt(25, 35)", deathNote: "was ripped apart by bullets!", value: 2 },
        { weapon: "Frying Pan", type: "magic", ability: "randomInt(60, 65)", deathNote: "was fried by a frying pan!", value: 2 },
        { weapon: "Blood Magic", type: "magic", ability: "randomInt(20, 100)", deathNote: "was destroyed inside-out by inner blood turmoil!", value: 2 },
        { weapon: "Laser Sword", type: "magic", ability: "randomInt(10, 80)", deathNote: "was cut in half by pure plasma!", value: 3 },
        { weapon: "Grenade", type: "ranged", ability: "20", deathNote: "was blew up by a grenade!", value: 2 },
        { weapon: "Shield", type: "physical", ability: "randomInt(60, 100) - 50", deathNote: "neck broke by getting bashed by a shield!", value: 3 },
       { weapon: "Rocket Launcher", type: "physical", ability: "randomInt(50, 60) - 30", deathNote: "torn apart by a missle!", value: 2 },
        { weapon: "Holy Cross", type: "magic", ability: "randomInt(-20, 100) + 10", deathNote: "was smited by a holy might!", value: 2 },
        { weapon: "Railgun", type: "ranged", ability: "randomInt(1, 150) - 60", deathNote: "was fried by a plasma beam!", value: 3 }
    ];

    let random = randomInt(0, array.length);
    return array[random];
}

function randomChestWeapon() {
    let array = [
        { weapon: "Iron Sword", type: "physical", ability: "randomInt(50, 70)", deathNote: "was sliced in half by a sword, the blade was gleaming!", value: 1 },
        { weapon: "Diggy Dig", type: "physical", ability:"randomInt(80, 100)", deathNote: "got dugged by a diggy dig shovel!", value: 2 },
        { weapon: "Ironscope PIstol", type: "ranged", ability: "randomInt(100, 150)", deathNote: "was shot in the head by a pistol!", value: 1 },
        { weapon: "Jagged Knife", type: "physical", ability: "randomInt(40, 50)", deathNote: "was stabbed in the throat, in the most messy way!", value: 1 },
        { weapon: "Double Barrel Shotgun", type: "ranged", ability: "randomInt(60, 70)", deathNote: "was blasted to rubble by two massive blasts!", value: 2 },
        { weapon: "Shard Spear", type: "ranged", ability: "randomInt(30, 40) + randomInt(40, 50)", deathNote: "got pierced by a sparkling spear!", value: 3 },
        { weapon: "Greek Fire", type: "ranged", ability: "randomInt(30, 50) + randomInt(50, 60)", deathNote: "screamed as green fire burned them alive.", value: 3 },
        { weapon: "AK-47", type: "ranged", ability: "randomInt(40, 50) + randomInt(40, 50) + randomInt(40, 50)", deathNote: "was ripped apart by ultra bullets!", value: 2 },
        { weapon: "Sword of Destiny", type: "magic", ability: "randomInt(100, 200)", deathNote: "was sliced by a holy blade!", value: 2 },
        { weapon: "Blood Missle", type: "magic", ability: "randomInt(50, 140)", deathNote: "was exploaded by pure blood!", value: 2 },
        { weapon: "God's Gaze", type: "magic", ability: "randomInt(-100, 1000)", deathNote: "was cut in half by a pure HOLY GAZE!", value: 3 },
        { weapon: "Splunk Bomb", type: "ranged", ability: "60", deathNote: "was blew up by a splunk bomb!", value: 2 },
        { weapon: "Shield Bro", type: "physical", ability: "randomInt(70, 150) - 50", deathNote: "neck broke by getting bashed by a shield bro!", value: 3 },
       { weapon: "BFG", type: "physical", ability: "randomInt(100, 200) - 100", deathNote: "torn apart by a plasma explosion!", value: 2 },
        { weapon: "Steel CrossBow", type: "magic", ability: "randomInt(-20, 150) + 40", deathNote: "was pierced by an iron bolt from a cross bow!", value: 2 },
        { weapon: "Railgun", type: "ranged", ability: "randomInt(1, 250) - 60", deathNote: "was fried by a rapid plasma beam!", value: 3 }
    ];

    let random = randomInt(0, array.length);
    return array[random];
}

function enemyWeapon() {
    let array = [
        { weapon: "Claws", type: "physical", ability: "randomInt(20, 30)", deathNote: "was ripped by claws!", value: 1 },
        { weapon: "Fire Ball", type: "magic", ability:"randomInt(10, 40)", deathNote: "was blasted by fire!", value: 2 },
        { weapon: "Acid Sput", type: "ranged", ability: "randomInt(10, 40)", deathNote: "was turned to a pool of acidl!", value: 1 },
    ];

    let random = randomInt(0, array.length);
    return array[random];
}

function bossWeapon() {
    let array = [
        { weapon: "MASSIVE AX", type: "physical", ability: "randomInt(40, 60)", deathNote: "was turned to nothing by a masive ax!", value: 1 },
        { weapon: "FIRE WHIP", type: "magic", ability:"randomInt(40, 80)", deathNote: "was whiped by pure fire!", value: 2 },
        { weapon: "BAZOOKA", type: "ranged", ability: "randomInt(20, 100)", deathNote: "was blasted to thousands of bits!", value: 1 },
    ];

    let random = randomInt(0, array.length);
    return array[random];
}

function randomChest() {

    for (let i = 0; i < players.length; i++) {
        let random = randomInt(0, 5);

        if (random == 0) {
            let newItem = randomChestWeapon();
            
            let playerGetWeapon = confirm(`Hero${i} got ${newItem.weapon}! Do you want to replace this with your old weapon? Your old weapon was ${players[i].wep.weapon}! The stats for the new weapon are: ${newItem.ability} and is ${newItem.type}. The old weapon stats are ${players[i].wep.ability} and is ${players[i].wep.type}`);

            if (playerGetWeapon) {
                players[i].wep = newItem;
            }

            document.getElementById('wep' + players[i].tribute).innerHTML = `Weapon: ${players[i].wep.weapon}`;
        } else if (random == 1) {
            players[i].maxHp += 50;
            players[i].hp += 50;
            alert(`Hero${i} got + 50 Maxhealth and + 50 HEALTH`);
            document.getElementById('health' + players[i].tribute).innerHTML = `Hp: ${players[i].hp}`;
        } else if (random == 2) {
            players[i].speed += 10;
            alert(`Hero${i} got + 10 speed!`);
        } else if (random == 3) {
            players[i].baseDam += 15;
            alert(`Hero${i} got +15 base damage!`);
        } else if (random == 4) {
            players[i].hp += 150;
        }
    }


}

function changeStatusLog() {
    let log = "";

    for (let i = 0; i < players.length; i++) {
        log += `<li id="menu${players[i].tribute}">${players[i].name}<br><span id=menuHealth${i}>Hp: ${players[i].hp}</span><br><span id="menuPersonality${i}">Type: ${players[i].type.personality}</span><br><span id='menuWep${i}'>Weapon: ${players[i].wep.weapon}</span></li>`;
    }

    log += `<br><li>Loot: ${loot}</li><li>World Layer: ${layer}</li><li id="movement">Movements: ${difficulty.movement}</li><li id="stage">Stage: ${difficulty.stage}</li>`;

    document.getElementById('stats').innerHTML = log;
}