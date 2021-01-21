// Grid - Maze Gesigner

// Global Constants
const NUM_ROWS = 10;
const NUM_COLS = 10;

// MAP
let mapGen = generateTotalMap();
let grid = mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map;
let loot = 30;
let turn = 0;
let timeline;
let bossFight = false;
let phase = "explore";
let layer = 0;

// Add a playet to the grid array
let player = {
    row: 5,
    col: 5
}

let players = [];
let monsters = [];

let difficulty = {
    movement: 0,
    stage: 0
};

addPlayer();

grid[player.row][player.col] = 2;

// Create div to model grid arrau
createDivGrid(grid);

// Player Movement - Key Event Listeners
document.addEventListener("keydown", movePlayer);

function movePlayer(event) {

    if (phase == "explore") {

        //remove player class from current cell
        let cellId = "cell" + player.row + "-" + player.col;
        document.getElementById(cellId).classList.remove("player");

        // Change based on cellID
        onArrow(event, cellId);
    }

}

function updatePlayer(newRow, newCol, cellId) {

    // set grid array to 0 for current location
    grid[player.row][player.col] = 0;

    // Set Difficulty
    setDifficulty();

    // Update player location, based on location in area
    upDatePlayerLocation(newRow, newCol, grid);

    // Random Encounter
    randomEncounter();

    // Update class and grid
    upDateGrid(cellId);

    // Set player on grid to 2;
    grid[player.row][player.col] = 2;

}

function newMap(cellId) {

    // IF eneter new location, get where the player is and transfer them to logical spot
    newLocation();

    // Remove Player from location
    cellId = "cell" + player.row + "-" + player.col;
    document.getElementById(cellId).classList.remove("player");

    // Simplify var by a little
    let fullMap = mapGen.totalMap[0];

    // Create Walls if around specific area
    block(fullMap);

    // Regenerate area and location in map
    grid = generateNewLocation(grid, fullMap, cellId);
}

function block(fullMap) {

    // Make wall if around border
    borderWall(fullMap);

    // make wall if next to room 6
    roomSix(fullMap);

    // make wall if next to room 7
    roomSeven(fullMap);


}

function borderWall(fullMap) {
    if ((mapGen.sCol - 1) < 1) { // If reach north border, block north path
        for (let i = 0; i < 10; i++) {

            fullMap[mapGen.sCol][mapGen.sRow].map[0][i] = 1;

        }
    }

    if ((mapGen.sCol + 1) > 8) { // If reach south border, block south path
        for (let i = 0; i < 10; i++) {

            fullMap[mapGen.sCol][mapGen.sRow].map[9][i] = 1;

        }
    }

    if ((mapGen.sRow - 1) < 1) { // If reach west border, block west path
        for (let i = 0; i < 10; i++) {

            fullMap[mapGen.sCol][mapGen.sRow].map[i][0] = 1;

        }
    }

    if ((mapGen.sRow + 1) > 8) { // If reach east border, block east path
        for (let i = 0; i < 10; i++) {

            fullMap[mapGen.sCol][mapGen.sRow].map[i][9] = 1;

        }
    }
}

function roomSix(fullMap) {
    if (fullMap[mapGen.sCol + 1][mapGen.sRow].type == 6) {
        for (let i = 0; i < 10; i++) {
            fullMap[mapGen.sCol][mapGen.sRow].map[9][i] = 1;
        }

    }
}

function roomSeven(fullMap) {
    if (fullMap[mapGen.sCol][mapGen.sRow - 1].type == 7) {

        for (let i = 0; i < 10; i++) {
            fullMap[mapGen.sCol][mapGen.sRow].map[i][0] = 1;
        }

    }

    if (fullMap[mapGen.sCol + 1][mapGen.sRow].type == 7) {

        for (let i = 0; i < 10; i++) {
            fullMap[mapGen.sCol][mapGen.sRow].map[9][i] = 1;
        }

    }

    if (fullMap[mapGen.sCol - 1][mapGen.sRow].type == 7) {

        for (let i = 0; i < 10; i++) {
            fullMap[mapGen.sCol][mapGen.sRow].map[0][i] = 1;
        }

    }
}

function generateNewLocation(grid, fullMap, cellId) {
    grid = fullMap[mapGen.sCol][mapGen.sRow].map;

    document.getElementById("container").innerHTML = "";

    createDivGrid(grid);

    upDateGrid(cellId);

    grid[player.row][player.col] = 2;

    return grid;
}

function newLocation() {
    if (player.row == 0) {
        player.row += 9;
        player.col;

        mapGen.sCol -= 1;

        console.log("Took the north exit!");
    } else if (player.row == 9) {
        player.row -= 9;
        player.col;

        mapGen.sCol += 1;

        console.log("Took the south exit!");
    } else if (player.col == 9) {
        player.row;
        player.col -= 9;

        mapGen.sRow += 1;

        console.log("Took the west exit!");
    } else if (player.col == 0) {
        player.row;
        player.col += 9;

        mapGen.sRow -= 1;

        console.log("Took the east exit!");
    }
}

function upDateGrid(cellId) {
    // Update class and grid
    cellId = "cell" + player.row + "-" + player.col;
    document.getElementById(cellId).classList.add("player");
}

function randomEncounter() {
    let random = randomInt(0, 100);
    if (random > 95) {
        setUpCombat(bossFight);
        modal2.style.display = "block";
        phase = "combat";
    }
}

function setDifficulty() {
    difficulty.movement += 1;

    if (difficulty.movement > 70) {
        difficulty.stage = 1;
    }

    if (difficulty.movement > 140) {
        difficulty.stage = 2;

    }
    if (difficulty.movement > 220) {
        difficulty.stage = 3;
    }
    if (difficulty.movement > 300) {
        difficulty.stage = 4;
    }
    if (difficulty.movement > 400) {
        difficulty.stage = 5;
    }

    // Change HTML
    document.getElementById('movement').innerHTML = `Movements: ${difficulty.movement}`;
    document.getElementById('stage').innerHTML = `Stage: ${difficulty.stage}`;
}

function upDatePlayerLocation(newRow, newCol, grid) {
    if (grid[newRow][newCol] == 0) {
        player.row = newRow;
        player.col = newCol;
    } else if (grid[newRow][newCol] == 3) {
        grid[newRow][newCol] = 0;
        loot += 5;
        cellId = "cell" + newRow + "-" + newCol;
        document.getElementById(cellId).classList.add("white");
    } else if (grid[newRow][newCol] == 4) {
        let cost = 30;
        let openChest = confirm(`This chest costs ${cost} loot to open. Do you want to open it?`);

        if (openChest) {
            if (loot >= cost) {
                loot -= cost;
                randomChest();
                grid[newRow][newCol] = 0;
                cellId = "cell" + newRow + "-" + newCol;
                document.getElementById(cellId).classList.add("white");
            } else {
                alert("You do not have enough to open this chest!");
            }

            changeStatusLog();

        }
    } else if (grid[newRow][newCol] == 9) {
        bossFight = true;
        setUpCombat();
        modal2.style.display = "block";
        phase = "combat";
    }
}

function onArrow(event, cellId) {
    if (event.keyCode == 39) { // right arrow key
        if (player.col < 9) {
            updatePlayer(player.row, player.col + 1, cellId);
        } else {
            mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map[player.row][player.col] = 0;

            newMap(cellId);
        }
    } else if (event.keyCode == 37) { // left arrow key
        if (player.col > 0) {
            updatePlayer(player.row, player.col - 1, cellId);
        } else {
            mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map[player.row][player.col] = 0;

            newMap(cellId);
        }
    } else if (event.keyCode == 38) { // Up arrow key
        if (player.row > 0) {
            updatePlayer(player.row - 1, player.col, cellId);

        } else {
            mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map[player.row][player.col] = 0;

            newMap(cellId);
        }
    } else if (event.keyCode == 40) { // Down arrow key
        if (player.row < 9) {
            updatePlayer(player.row + 1, player.col, cellId);
        } else {
            mapGen.totalMap[0][mapGen.sCol][mapGen.sRow].map[player.row][player.col] = 0;

            newMap(cellId);
        }
    }
}