import {TetrisData} from "./TetrisData.js";
import {TetrisView} from "./TetrisView.js";
import {TetrisModel} from "./TetrisModel.js";

let username_element = document.getElementById("username")
username_element.value = localStorage["tetris.username"]

let data = new TetrisData()
let view = new TetrisView(data)
let model = new TetrisModel(data, view)

document.addEventListener("keydown", proceedKeyDown)

function proceedKeyDown(event)
{
    switch (event.key)
    {
        case 'k':
        case 'ArrowUp':
            model.dropCurrentTetromino()
            break
        case 'j':
        case 'ArrowDown':
            model.moveCurrentTetrominoDown()
            break
        case 'h':
        case 'ArrowLeft':
            model.moveCurrentTetrominoLeft()
            break
        case 'l':
        case 'ArrowRight':
            model.moveCurrentTetrominoRight()
            break
        case 'f':
        case ' ':
            model.rotateCurrentTetrominoRight()
            break
        case 'd':
            model.rotateCurrentTetrominoLeft()
            break
        case 'Shift':
            model.switchToSavedTetromino()
            break
        default:
            break;
    }
}
