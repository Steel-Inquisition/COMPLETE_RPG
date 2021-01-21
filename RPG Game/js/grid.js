function generateTotalMap() {
    let array = [
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
    ];


    let iniMap;


    // GET ENTRANCE LOCATION
    let random = randomInt(2, array.length - 2);
    let lineRandom = randomInt(2, 8);

    // GET EXIT LOCATION
    let exitRandom = randomInt(2, array.length - 2);
    let exitLineRandom = randomInt(2, 8);

    // Create general map
    array = createGeneralMap(array, random);


    // Get Entrance
    array = createEntrance(array, random, lineRandom);

    // Get Exit
    array = createExit(array, exitRandom, exitLineRandom);

    // Save exact location where player starts at
    let save = {
        sRow: lineRandom,
        sCol: random,
        totalMap: []
    };

    // Length of hallway till reach end
    array = hallwayAcross(random, lineRandom, exitRandom, array);
    array = hallWayCol(random, lineRandom, exitLineRandom, array);

    // Change numbers to rooms
    numberToRoom(array, iniMap)

    // Save all of this and push it into an array
    save.totalMap.push(array);

    return save;
}

function createDivGrid(grid) {
    for (let row = 0; row < NUM_ROWS; row++) {
        for (let col = 0; col < NUM_COLS; col++) {
            // Create a div for each element in 2d grid
            let divEl = document.createElement('div');

            let fullMap = mapGen.totalMap[0];
            block(fullMap);

            // Add an id to each divEL
            divEl.id = "cell" + row + "-" + col;

            // Add apporiate class to each divEL
            if (grid[row][col] == 1) {
                divEl.classList.add('grey');
            } else if (grid[row][col] == 2) {
                divEl.classList.add("player");
            } else if (grid[row][col] == 3) {
                divEl.classList.add("coin");
            } else if (grid[row][col] == 4) {
                divEl.classList.add("chest");
            } else if (grid[row][col] == 9) {
                divEl.classList.add("green");
            }


            // Add dataset values for row and column
            divEl.dataset.row = row;
            divEl.dataset.col = col;

            // Add div to container
            document.getElementById("container").append(divEl);
        }
    }
}

function createGeneralMap(array) {
    for (let i = 1; i < 9; i++) {
        for (let x = 1; x < 9; x++) {
            array[x][i] = randomInt(5, 9);
        }
    }

    return array;
}

function createEntrance(array, random, lineRandom) {
    // Get Entrance
    array[random][lineRandom] = 1;

    return array;
}

function createExit(array, exitRandom, exitLineRandom) {
    // Get Exit
    array[exitRandom][exitLineRandom] = 4;

    return array;
}


function hallwayAcross(random, lineRandom, exitRandom, array) {
    let length = 0;

    console.log("row of entrance: " + random);
    console.log("col of entrance: " + lineRandom);


    // Draw a line stright towards row
    do {
        if (random > exitRandom) {
            array[random - 1][lineRandom] = 2;
            random -= 1;
        } else if (random < exitRandom) {
            array[random + 1][lineRandom] = 2;
            random += 1;
        }

        length++;

    }
    while (random > exitRandom || random < exitRandom);

    // If there is no hallway
    if (length != 1) {
        array[random][lineRandom] = 3;
    }

    return array;
}

function hallWayCol(random, lineRandom, exitLineRandom, array) {
    
    // Draw a line stright upwards or down column
    do {
        if (lineRandom > exitLineRandom) {
            array[random][lineRandom - 1] = 2;
            lineRandom -= 1;
        } else if (lineRandom < exitLineRandom) {
            array[random][lineRandom + 1] = 2;
            lineRandom += 1;
        }

    }
    while (lineRandom > exitLineRandom || lineRandom < exitLineRandom);

    // End of hallway is a room
    array[random][lineRandom] = 4;

    return array;
}

function numberToRoom(array, iniMap) {
    for (let i = 1; i < 9; i++) {
        for (let x = 1; x < 9; x++) {

            if (array[x][i] == 1) {
                array[x][i] = tunnel1(iniMap);
            } else if (array[x][i] == 2) {
                array[x][i] = hall(iniMap);
            } else if (array[x][i] == 0) {
                array[x][i] = empty(iniMap);
            } else if (array[x][i] == 3) {
                array[x][i] = bend(iniMap);
            } else if (array[x][i] == 4) {
                array[x][i] = end(iniMap);
            } else if (array[x][i] == 5) {
                array[x][i] = twister(iniMap);
            } else if (array[x][i] == 6) {
                array[x][i] = endHall(iniMap);
            } else if (array[x][i] == 7) {
                array[x][i] = stop(iniMap);
            } else if (array[x][i] == 8) {
                array[x][i] = chest(iniMap);
            }
        }


    }
}