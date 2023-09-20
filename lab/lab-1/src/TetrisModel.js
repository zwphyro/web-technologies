import {TetraminoI, TetraminoJ, TetraminoL, TetraminoO, TetraminoS, TetraminoT, TetraminoZ} from "./Tetramino.js";

const maximum_level = 20
const different_tetramino_amount = 7
const level_time_step = 50


export class TetrisModel
{
    constructor(data, view)
    {
        this.data = data
        this.view = view
        this.data.current_tetramino = this.getRandomTetramino()
        this.data.next_tetramino = this.getRandomTetramino()
        this.save_allowed = true
        this.restartFallTimeout()
        this.calculateShadowTetraminoPosition()
        this.view.update()
    }

    moveCurrentTetraminoDown()
    {
        this.restartFallTimeout()
        this.data.current_tetramino_position.y += 1
        if (!this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino_position.y -= 1
            this.placeCurrentTetramino()
            this.switchToNextTetramino()
        }
        this.view.update()
    }

    moveCurrentTetraminoRight()
    {
        this.data.current_tetramino_position.x += 1
        if (!this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino_position.x -= 1
        }
        this.calculateShadowTetraminoPosition()
        this.view.update()
    }

    moveCurrentTetraminoLeft()
    {
        this.data.current_tetramino_position.x -= 1
        if (!this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino_position.x += 1
        }
        this.calculateShadowTetraminoPosition()
        this.view.update()
    }

    checkCurrentTetraminoPosition()
    {
        for (let point of this.data.current_tetramino.current_state)
        {
            let x = point.x + this.data.current_tetramino_position.x
            let y = point.y + this.data.current_tetramino_position.y
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

    getRandomTetramino()
    {
        switch (Math.floor(Math.random() * different_tetramino_amount))
        {
            case 0:
                return new TetraminoI()
            case 1:
                return new TetraminoJ()
            case 2:
                return new TetraminoL()
            case 3:
                return new TetraminoS()
            case 4:
                return new TetraminoZ()
            case 5:
                return new TetraminoO()
            case 6:
                return new TetraminoT()
        }
    }

    restartFallTimeout(timeout = 1000 - level_time_step * this.data.level)
    {
        clearTimeout(this.timeout_id)
        this.timeout_id = setTimeout(() => this.moveCurrentTetraminoDown(), timeout)
    }

    calculateShadowTetraminoPosition()
    {
        let temporary = {...this.data.current_tetramino_position}
        while (this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino_position.y += 1
        }
        this.data.current_tetramino_position.y -= 1
        this.data.shadow_tetramino_position = this.data.current_tetramino_position
        this.data.current_tetramino_position = temporary
    }

    dropCurrentTetramino()
    {
        this.restartFallTimeout()
        this.data.current_tetramino_position = this.data.shadow_tetramino_position
        this.placeCurrentTetramino()
        this.switchToNextTetramino()
        this.view.update()
    }

    placeCurrentTetramino()
    {
        this.save_allowed = true
        for (let point of this.data.current_tetramino.current_state)
        {
            let x = point.x + this.data.current_tetramino_position.x
            let y = point.y + this.data.current_tetramino_position.y
            this.data.field[y][x] = this.data.current_tetramino.name
        }
        this.removeFullRows()
    }

    removeFullRows()
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
        this.data.removed_lines_amount += removed_rows_amount
        // level increases every ten removed lines
        this.data.level = Math.min(Math.floor(this.data.removed_lines_amount / 10), maximum_level)
    }

    switchToNextTetramino()
    {
        this.data.current_tetramino_position = {x: 0, y: 0}
        this.data.current_tetramino = this.data.next_tetramino
        this.data.next_tetramino = this.getRandomTetramino()
        if (!this.checkCurrentTetraminoPosition())
        {
            this.gameOver()
        }
        this.calculateShadowTetraminoPosition()
    }

    switchToSavedTetramino()
    {
        if (!this.save_allowed)
        {
            return
        }
        this.save_allowed = false
        if (this.data.saved_tetramino === undefined)
        {
            this.data.saved_tetramino = this.data.current_tetramino
            this.switchToNextTetramino()
            this.view.update()
            return
        }
        this.data.current_tetramino_position = {x: 0, y: 0}
        let temporary = this.data.current_tetramino
        this.data.current_tetramino = this.data.saved_tetramino
        this.data.saved_tetramino = temporary
        this.calculateShadowTetraminoPosition()
        this.view.update()
    }

    rotateCurrentTetraminoRight()
    {
        this.data.current_tetramino.rotateRight()
        if (!this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino.rotateLeft()
        }
        this.calculateShadowTetraminoPosition()
        this.view.update()
    }

    rotateCurrentTetraminoLeft()
    {
        this.data.current_tetramino.rotateLeft()
        if (!this.checkCurrentTetraminoPosition())
        {
            this.data.current_tetramino.rotateRight()
        }
        this.calculateShadowTetraminoPosition()
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
