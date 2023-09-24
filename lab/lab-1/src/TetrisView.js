const tetromino_size = 4
const cell_size = 40

/* A class that implements rendering
 */
export class TetrisView
{
    constructor(data)
    {
        this.data = data
        this.field_element = document.getElementById("field")
        this.field_element.width = this.data.field_width * cell_size
        this.field_element.height = this.data.field_height * cell_size
        this.field_context = this.field_element.getContext('2d')
        this.tetromino_images = new Map()
        this.initializeTetrominoImages()
        this.next = new Array(tetromino_size)
        this.initializeNext()
        this.saved = new Array(tetromino_size)
        this.initializeSaved()
        this.score = document.getElementById("score")
    }

    initializeTetrominoImages()
    {
        for (let value of 'IJLOSTZ')
        {
            this.tetromino_images.set(`tetromino_${value}`, new Image())
            this.tetromino_images.get(`tetromino_${value}`).src = `./assets/images/tetromino-${value}.png`
        }
    }

    initializeNext()
    {
        let next_element = document.getElementById("next")
        for (let i = 0; i < this.next.length; i++)
        {
            this.next[i] = document.createElement("div")
            this.next[i].setAttribute("class", "empty_cell")
            next_element.appendChild(this.next[i])
        }
    }

    initializeSaved()
    {
        let saved_element = document.getElementById("saved")
        for (let i = 0; i < this.saved.length; i++)
        {
            this.saved[i] = document.createElement("div")
            this.saved[i].setAttribute("class", "empty_cell")
            saved_element.appendChild(this.saved[i])
        }
    }

    update()
    {
        this.updateField()
        if (this.data.current_tetromino !== undefined)
        {
            this.updateShadowTetromino()
            this.updateCurrentTetromino()
        }
        if (this.data.next_tetromino !== undefined)
        {
            this.updateNextTetromino()
        }
        if (this.data.saved_tetromino !== undefined)
        {
            this.updateSavedTetromino()
        }
        this.score.innerText = `${this.data.score}`
    }

    updateField()
    {
        this.field_context.clearRect(0, 0, this.field_element.width, this.field_element.height)
        for (let i = 0; i < this.data.field_height; i++)
        {
            for (let j = 0; j < this.data.field_width; j++)
            {
                if (this.data.field[i][j] === "empty_cell") continue
                let x = j * cell_size
                let y = i * cell_size
                this.field_context.drawImage(this.tetromino_images.get(this.data.field[i][j]), x, y, cell_size, cell_size)
            }
        }
    }

    updateCurrentTetromino()
    {
        for (let point of this.data.current_tetromino.current_state)
        {
            let x = (point.x + this.data.current_tetromino_position.x) * cell_size
            let y = (point.y + this.data.current_tetromino_position.y) * cell_size
            this.field_context.drawImage(this.tetromino_images.get(this.data.current_tetromino.name), x, y, cell_size, cell_size)
        }
    }

    updateShadowTetromino()
    {
        for (let point of this.data.current_tetromino.current_state)
        {
            let x = (point.x + this.data.shadow_tetromino_position.x) * cell_size
            let y = (point.y + this.data.shadow_tetromino_position.y) * cell_size
            this.field_context.globalAlpha = 0.5
            this.field_context.drawImage(this.tetromino_images.get(this.data.current_tetromino.name), x, y, cell_size, cell_size)
            this.field_context.globalAlpha = 1
        }
    }

    updateNextTetromino()
    {
        for (let i = 0; i < this.next.length; i++)
        {
            this.next[i].setAttribute("class", this.data.next_tetromino.name)
            // in the top and left positions added offset relative to fixation position
            let top = cell_size * (this.data.next_tetromino.current_state[i].y + 1)
            let left = cell_size * (this.data.next_tetromino.current_state[i].x - 3)
            this.next[i].style.top = `${top}px`
            this.next[i].style.left = `${left}px`
        }
    }

    updateSavedTetromino()
    {
        for (let i = 0; i < this.saved.length; i++)
        {
            this.saved[i].setAttribute("class", this.data.saved_tetromino.name)
            // in the top and left positions added offset relative to fixation position
            let top = cell_size * (this.data.saved_tetromino.current_state[i].y + 1)
            let left = cell_size * (this.data.saved_tetromino.current_state[i].x - 3)
            this.saved[i].style.top = `${top}px`
            this.saved[i].style.left = `${left}px`
        }
    }
}
