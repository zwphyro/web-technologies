import {TetrominoI, TetrominoJ, TetrominoL, TetrominoO, TetrominoS, TetrominoT, TetrominoZ} from "./Tetromino.js";

const maximum_level = 20
const different_tetromino_amount = 7
const level_time_step = 50

/* A class that implements data changes in response to user requests
 */
export class TetrisModel
{
    constructor(data, view)
    {
        this.data = data
        this.view = view
        this.data.current_tetromino = this.getRandomTetromino()
        this.data.next_tetromino = this.getRandomTetromino()
        this.save_allowed = true
        this.restartFallTimeout()
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    moveCurrentTetrominoDown()
    {
        this.restartFallTimeout()
        this.data.current_tetromino_position.y += 1
        if (!this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino_position.y -= 1
            this.placeCurrentTetromino()
            this.switchToNextTetromino()
        }
        this.view.update()
    }

    moveCurrentTetrominoRight()
    {
        this.data.current_tetromino_position.x += 1
        if (!this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino_position.x -= 1
        }
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    moveCurrentTetrominoLeft()
    {
        this.data.current_tetromino_position.x -= 1
        if (!this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino_position.x += 1
        }
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    checkCurrentTetrominoPosition()
    {
        for (let point of this.data.current_tetromino.current_state)
        {
            let x = point.x + this.data.current_tetromino_position.x
            let y = point.y + this.data.current_tetromino_position.y
            if (y < 0 && !(x < 0 || x >= this.data.field_width || y >= this.data.field_height))
            {
                continue
            }
            if (x < 0 || x >= this.data.field_width || y >= this.data.field_height ||
                this.data.field[y][x] !== "empty_cell")
            {
                return false
            }
        }
        return true
    }

    getRandomTetromino()
    {
        switch (Math.floor(Math.random() * different_tetromino_amount))
        {
            case 0:
                return new TetrominoI()
            case 1:
                return new TetrominoJ()
            case 2:
                return new TetrominoL()
            case 3:
                return new TetrominoS()
            case 4:
                return new TetrominoZ()
            case 5:
                return new TetrominoO()
            case 6:
                return new TetrominoT()
        }
    }

    restartFallTimeout(timeout = 1000 - level_time_step * this.data.level)
    {
        clearTimeout(this.timeout_id)
        this.timeout_id = setTimeout(() => this.moveCurrentTetrominoDown(), timeout)
    }

    calculateShadowTetrominoPosition()
    {
        let temporary = {...this.data.current_tetromino_position}
        while (this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino_position.y += 1
        }
        this.data.current_tetromino_position.y -= 1
        this.data.shadow_tetromino_position = this.data.current_tetromino_position
        this.data.current_tetromino_position = temporary
    }

    dropCurrentTetromino()
    {
        this.restartFallTimeout()
        this.data.current_tetromino_position = this.data.shadow_tetromino_position
        this.placeCurrentTetromino()
        this.switchToNextTetromino()
        this.view.update()
    }

    placeCurrentTetromino()
    {
        this.save_allowed = true
        for (let point of this.data.current_tetromino.current_state)
        {
            let x = point.x + this.data.current_tetromino_position.x
            let y = point.y + this.data.current_tetromino_position.y
            this.data.field[y][x] = this.data.current_tetromino.name
        }
        this.removeCompleteRows()
    }

    removeCompleteRows()
    {
        let i = 0
        let removed_rows_amount = 0
        while (i < this.data.field_height)
        {
            let flag = false
            for (let j = 0; j < this.data.field_width; j++)
            {
                flag = flag || this.data.field[i][j] === "empty_cell"
            }
            if (!flag)
            {
                removed_rows_amount += 1
                this.removeRow(i)
            }
            i += 1
        }
        this.calculateScore(removed_rows_amount)
    }

    removeRow(remove_row_index)
    {
        let temporary = new Array(remove_row_index)
        for (let i = 0; i < remove_row_index; i++)
        {
            temporary[i] = new Array(this.data.field_width)
            for (let j = 0; j < this.data.field_width; j++)
            {
                temporary[i][j] = this.data.field[i][j]
                this.data.field[i][j] = "empty_cell"
            }
        }
        for (let i = 0; i < remove_row_index; i++)
        {
            for (let j = 0; j < this.data.field_width; j++)
            {
                this.data.field[i + 1][j] = temporary[i][j]
            }
        }
    }

    calculateScore(removed_rows_amount)
    {
        let base = 0
        switch (removed_rows_amount)
        {
            case 1:
                base = 40
                break
            case 2:
                base = 100
                break
            case 3:
                base = 300
                break
            case 4:
                base = 1200
                break
            default:
                break
        }
        this.data.score += base * (this.data.level + 1)
        this.data.removed_rows_amount += removed_rows_amount
        // level increases every ten removed rows
        this.data.level = Math.min(Math.floor(this.data.removed_rows_amount / 10), maximum_level)
    }

    switchToNextTetromino()
    {
        this.data.current_tetromino_position = {x: 0, y: 0}
        this.data.current_tetromino = this.data.next_tetromino
        this.data.next_tetromino = this.getRandomTetromino()
        if (!this.checkCurrentTetrominoPosition())
        {
            this.gameOver()
        }
        this.calculateShadowTetrominoPosition()
    }

    switchToSavedTetromino()
    {
        if (!this.save_allowed)
        {
            return
        }
        this.save_allowed = false
        if (this.data.saved_tetromino === undefined)
        {
            this.data.saved_tetromino = this.data.current_tetromino
            this.switchToNextTetromino()
            this.view.update()
            return
        }
        this.data.current_tetromino_position = {x: 0, y: 0}
        let temporary = this.data.current_tetromino
        this.data.current_tetromino = this.data.saved_tetromino
        this.data.saved_tetromino = temporary
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    rotateCurrentTetrominoRight()
    {
        this.data.current_tetromino.rotateRight()
        if (!this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino.rotateLeft()
        }
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    rotateCurrentTetrominoLeft()
    {
        this.data.current_tetromino.rotateLeft()
        if (!this.checkCurrentTetrominoPosition())
        {
            this.data.current_tetromino.rotateRight()
        }
        this.calculateShadowTetrominoPosition()
        this.view.update()
    }

    gameOver()
    {
        console.log(localStorage["tetris.score_table"])
        let temporary = JSON.parse(localStorage["tetris.score_table"])
        temporary.push({
            name: localStorage["tetris.username"],
            score: this.data.score
        })
        localStorage["tetris.score_table"] = JSON.stringify(temporary)
        window.location = "score.html"
    }
}
