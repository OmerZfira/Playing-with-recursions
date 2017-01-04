// === Consts ===
const mazeTpl =
    '#S#############################F#' +
    '# #     # #         #         # #' +
    '# # ### # # ### ##### # ##### # #' +
    '# # # # #     #       # #   #   #' +
    '# # # # ########### ### # # #####' +
    '#   # #     #     # # #   #     #' +
    '# ### ##### # ### # # ####### # #' +
    '# #     # # # # # #       # # # #' +
    '# # ### # # # # # ######### ### #' +
    '# #   #   # #   #   #       #   #' +
    '# ### ### # ### ### # ####### # #' +
    '# #   # # #     # #   #   #   # #' +
    '# # ### # ####### ##### # # ### #' +
    '# #   # #       #   #   # # # # #' +
    '# ### # ####### # # # ### # # # #' +
    '#     #           #   #     #   #' +
    '#################################';
const HEIGHT = 17;
const WIDTH = 33;
// const PENCIL = 'pencil';
// const BUCKET = 'bucket';
const WALL = 'wall';
const ROUTE = 'route';
const START = 'start';
const FINISH = 'finish';

// === Vars ===
let gBoard;
let gTimer = 0;

// let gState = {
//     currTool: null,
//     color: 'red'
// }

// === Init ====

document.addEventListener("DOMContentLoaded", init);

function init() {
    gBoard = createBoard();
    renderBoard();
}

function createBoard() {
    let board = [];
    for (let i = 0; i < HEIGHT; i++) {
        board[i] = [];
        for (let j = 0; j < WIDTH; j++) {
            let cellType;
            let currCellType = mazeTpl[i * 33 + j];
            switch (currCellType) {
                case '#': cellType = WALL;
                    break;
                case ' ': cellType = ROUTE;
                    break;
                case 'S': cellType = START;
                    break;
                case 'F': cellType = FINISH;
                    break;
            }
            board[i][j] = { 'i': i, 'j': j, 'type': cellType, wasHere: false };
        }
    }
    console.log('board is:', board);
    return board;
}

function renderBoard() {

    let htmlStr = ``;
    for (var i = 0; i < HEIGHT; i++) {

        htmlStr += `<div class="row">`
        for (var j = 0; j < WIDTH; j++) {
            htmlStr += `<div id = "cell-${i}-${j}" class="cell ${gBoard[i][j].type}"></div>`;
        }
        htmlStr += `</div>`;
    }


    let elBoard = document.querySelector('.maze');
    elBoard.innerHTML = htmlStr;
}


// === Functions ===
function startSolve() {
    solveMaze(0, 1);
}

function solveMaze(i, j) {
    if (i < 0 || j < 0 || i >= HEIGHT || j >= WIDTH || gBoard[i][j].type === WALL) {
        return;
    } else if (gBoard[i][j].type === FINISH) {
        // alert('finished!');
        return true;
    } else if (!gBoard[i][j].wasHere) {
        gBoard[i][j].wasHere = true;

        if (solveMaze(i - 1, j) ||
            (solveMaze(i + 1, j)) ||
            (solveMaze(i, j - 1)) ||
            (solveMaze(i, j + 1))) {
                gTimer += 50;
            setTimeout(function () {

                document.querySelector(`#cell-${i}-${j}`).classList.add('passedHere');
            }, gTimer)
            return true;
        }
    }
}