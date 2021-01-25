function setUpCombat() {

    // Get monster
    monsters = createMonster();

    // Difficulty select
    difficultyStage();

    // Get initial timeline
    timeline = timeLine();

    // if player or monster attacking, set HTML to select either attack or next turn
    nextAttackerBtn();

    // if fighting boss, change run button to can't run
    canRun();

    console.log(monsters);

    // Add an even listener to get attack btn
    document.getElementById('attack-btn').addEventListener('click', attack);
    document.getElementById('run-btn').addEventListener('click', run);


}

function timeLine() {
    let array = [];

    // SORT EVERYONE VIA HIGHEST SPEED INTO A TIMLINE
    for (let i = 0; i < (players.length); i++) {
        array.push(players[i]);
    }

    for (let i = 0; i < (monsters.length); i++) {
        array.push(monsters[i]);
    }

    array.sort(function (a, b) {
        return b.speed - a.speed
    });

    console.log(array);

    document.getElementById('timeMenu').innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        document.getElementById('timeMenu').innerHTML += `<p>POS ${i}: ${array[i].name}</p>`;
    }

    return array;
}

function run() {
    let runChance = 0;
    let logEl = document.getElementById('logMenu');
    let text;

    turnChange(logEl, text);

    runChance = randomInt(0, 10);
    
    if (bossFight) {
        text = `<li>You can't run in a boss fight...</li>`;
    } else {
        if (runChance > 5) {
            text = `<li>The Team ran away and succeded!</li>`;
            monsters = [];
            endBattle();
        } else {
            text = `<li>The Team tried to run away and failed!</li>`;
            attack();
        }


    }

    logEl.innerHTML += text;


}

// Get attacker, defender, events, to get damage. Damage is boosted by events, classes, weapons, bonus, and subtracted b. Calculate if player is dead. If only one player is left, they win!
function attack() {

    if (players.length > 0 && monsters.length > 0) {
        // Get attacker and defender from list from players.length
        timeline = timeLine();

        // Change Turn if above the length of players and monsters
        if (turn >= (players.length + monsters.length)) {
            turn = 0;
        }

        // Set valuables used
        let attacker = timeline[turn];
        let defender;
        let damage = 0;
        let logEl = document.getElementById('logMenu');
        let text;

        // Set initial damage based on weapon
        defender = setInitialDam(attacker, defender);

        // if player or monster attacking, set HTML to select either attack or next turn
        nextAttackerBtn();

        // Move up the turn and movement var. Change HTML to reflect this.
        turnChange(logEl, text);

        console.log(attacker, defender);

        // Add damge based on attack type, class, and base damn
        damage += applyClass(attacker, defender);

        // If damage bellow 0, set it to 0
        damage = ifDamageZero(damage);

        // Calculate damage and deal that set damage. Change HTML to reflect difference. 
        calculateDamage(damage, defender);

        // Change HTML to show diffrences
        attackStatus(defender, attacker, damage, logEl, text);

        // Kill player / monster if bellow or equal 0 hp
        playerIsDead(attacker, defender, text, logEl);



    } else {
        // End Battle
        endBattle();
    }
}

// Change the turn and round. One turn is the same as running the attack function once.
function turnChange(logEl, text) {
    // Set up Timer
    difficulty.movement++;
    turn++;

    // Change HTML to reflect change
    text = `<li><strong>Movement: ${difficulty.movement}</strong></li><li><strong>Stage: ${difficulty.stage}</strong></li>`
    logEl.innerHTML += text;
}

// Change the damage dealt based on weapon class and type ability
function applyClass(attacker, defender) {
    // Add or subtract damage based on weapon type

    let temp = 0;

    temp = eval(attacker.wep.ability);


    switch (attacker.wep.type) {
        case "physical": // If defender has a physical weapon + 6 damage
            if (defender.wep.type == "ranged") {
                temp += -20;
            }
            break;
        case "ranged": // If attacker has a ranged weapon and opponet has ranged, -= 6 damage
            if (defender.wep.type == "ranged") {
                temp += -20;
            }
            break;
        case "magic": // If defender has ranged or physical + 3 dam, otherwise -5 dam
            if (defender.wep.type == "ranged") {
                temp += 30;
            } else if (defender.wep.type == "physical") {
                temp += 30;
            } else {
                temp += -50;
            }
            break;
        default:
            console.log("IMPOSSIBLE!");
    }

    // Based on type, add the ability
    if (attacker.type.applied == 'offense') {
        eval(attacker.type.bonus);
    }

    if (defender.type.applied == 'defence') {
        eval(defender.type.bonus);
    }

    temp += attacker.baseDam;

    return temp;
}

// If damage bellow 0, go to 0
function ifDamageZero(damage) {
    if (damage < 0) {
        return damage = 0;
    }
    return damage;
}

// Calcuate the damage donne from attacker to defender
function calculateDamage(damage, defender) {
    // Deal Damage
    defender.hp -= damage;

    //Change HTML to reflect health change
    if (defender.tribute >= 9) {
        document.getElementById('health' + defender.tribute + "m").innerHTML = `Hp: ${defender.hp}`;
    } else {
        document.getElementById('health' + defender.tribute).innerHTML = `Hp: ${defender.hp}`;
    }

    console.log(defender.hp);
}

// deal damage and check whose the one attacking and defending. Display HTML.
function attackStatus(defender, attacker, damage, logEl, text) {


    text = `<li>${attacker.name} attacks ${defender.name}, dealing ${damage} damage!</li>`;
    logEl.innerHTML += text;


}

// Check players array and see if they are dead or not
function playerIsDead(attacker, defender, text, logEl, ) {

    // REMOVE PLAYER IF DEAD
    for (let i = 0; i < players.length; i++) {

        if (players[i].hp <= 0) {

            causeOfDeath(attacker, defender, text, logEl, );

            players.splice(i, 1);



        }

    }

    for (let i = 0; i < monsters.length; i++) {

        if (monsters[i].hp <= 0) {

            causeOfDeath(attacker, defender, text, logEl, );

            monsters.splice(i, 1);

            loot += 5;


        }

    }
}

// Return their exact cause of death!
function causeOfDeath(attacker, defender, text, logEl) {
    text = `<li>${defender.name} ${attacker.wep.deathNote}</li>`;
    logEl.innerHTML += text;

    text = `|->${defender.name} is dead!`;
    logEl.innerHTML += text;

    attacker.kills += 1;



    // eventually need to splce dead out of existance
}

// Set enemy to certain health / damage based on stage
function difficultyStage() {
    for (let i = 0; i < monsters.length; i++) {
        if (difficulty.stage == 1) {
            if (bossFight) {
                monsters[i].baseDam = 25;
                monsters[i].hp += 100;
            } else {
                monsters[i].baseDam = 15;
                monsters[i].hp += 50;
            }

            document.getElementById('health' + monsters[i].tribute + "m").innerHTML = `Hp: ${monsters[i].hp}`;
        } else if (difficulty.stage == 2) {
            if (bossFight) {
                monsters[i].baseDam = 30;
                monsters[i].speed += 15;
                monsters[i].hp += 100;
            } else {
                monsters[i].baseDam = 50;
                monsters[i].speed += 15;
                monsters[i].hp += 100;
            }

            document.getElementById('health' + monsters[i].tribute + "m").innerHTML = `Hp: ${monsters[i].hp}`;
        } else if (difficulty.stage == 3) {
            if (bossFight) {
                monsters[i].baseDam = 60;
                monsters[i].speed += 35;
                monsters[i].hp += 300;
            } else {
                monsters[i].baseDam = 50;
                monsters[i].speed += 30;
                monsters[i].hp += 200;
            }

            document.getElementById('health' + monsters[i].tribute + "m").innerHTML = `Hp: ${monsters[i].hp}`;
        } else if (difficulty.stage == 4) {
            if (bossFight) {
                monsters[i].baseDam = 90;
                monsters[i].speed += 45;
                monsters[i].hp += 400;
            } else {
                monsters[i].baseDam = 60;
                monsters[i].speed += 40;
                monsters[i].hp += 400;
            }

            document.getElementById('health' + monsters[i].tribute + "m").innerHTML = `Hp: ${monsters[i].hp}`;
        } else if (difficulty.stage == 5) {
            if (bossFight) {
                monsters[i].baseDam = 150;
                monsters[i].speed += 50;
                monsters[i].hp += 700;
            } else {
                monsters[i].baseDam = 70;
                monsters[i].speed += 50;
                monsters[i].hp += 500;
            }

            document.getElementById('health' + monsters[i].tribute + "m").innerHTML = `Hp: ${monsters[i].hp}`;
        }
    }

}


function nextAttackerBtn() {
    if (timeline[turn].tribute >= 9) {
        document.getElementById('attack-btn').innerHTML = "NEXT TURN";
    } else {
        document.getElementById('attack-btn').innerHTML = "ATTACK!";
    }
}

function canRun() {
    if (bossFight) {
        document.getElementById('run-btn').innerHTML = "Can't Run!";
    } else {
        document.getElementById('run-btn').innerHTML = "Run!";
    }
}

function setInitialDam(attacker, defender) {
    if (attacker.tribute >= 9) {
        let exactDefender = randomInt(0, players.length);
        defender = players[exactDefender];

    } else {
        let exactDefender = randomInt(0, monsters.length);
        defender = monsters[exactDefender];
    }

    return defender;
}

function endBattle() {
    if (players.length == 0) {
        document.getElementById('total').innerHTML = "<div>GAME OVER! YOU ARE DEAD!</div>";
        document.getElementById('total').innerHTML += `<div>You survived until layer ${layer}. You stepped: ${difficulty.movement} and stage: ${difficulty.stage}</div>`;
    } else if (monsters.length == 0) {
        alert(`You won! Your total loot is now: ${loot}`);
        modal2.style.display = "none";
        document.getElementById('enemyMenu').innerHTML = "";
        phase = 'explore';
        turn = 0;

        if (bossFight) {
            document.getElementById("container").innerHTML = "";
            mapGen = generateTotalMap()
            playerAboveMax();
            grid = mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map;
            bossFight = false;
            player.row = 5;
            player.col = 5;
            layer++;

            grid[player.row][player.col] = 2;

            createDivGrid(grid);
        }


        changeStatusLog();

    }
}


function playerAboveMax() {
    for (let i = 0; i < players.length; i++) {
        if (players[i].hp > players[i].maxHp) {
            players[i].hp = players[i].maxHp;
        }
    }
}