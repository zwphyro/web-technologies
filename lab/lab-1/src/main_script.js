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
            model.dropCurrentTetramino()
            break
        case 'j':
        case 'ArrowDown':
            model.moveCurrentTetraminoDown()
            break
        case 'h':
        case 'ArrowLeft':
            model.moveCurrentTetraminoLeft()
            break
        case 'l':
        case 'ArrowRight':
            model.moveCurrentTetraminoRight()
            break
        case 'f':
        case ' ':
            model.rotateCurrentTetraminoRight()
            break
        case 'd':
            model.rotateCurrentTetraminoLeft()
            break
        case 'Shift':
            model.switchToSavedTetramino()
            break
        default:
            break;
    }
}
