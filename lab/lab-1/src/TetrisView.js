const tetramino_size = 4
const cell_size = 40

export class TetrisView
{
    constructor(data)
    {
        this.data = data
        this.field_element = document.getElementById("field")
        this.field_element.width = this.data.field_width * cell_size
        this.field_element.height = this.data.field_height * cell_size
        this.field_context = this.field_element.getContext('2d')
        this.tetramino_images = new Map()
        this.initializeTetraminoImages()
        this.next = new Array(tetramino_size)
        this.initializeNext()
        this.saved = new Array(tetramino_size)
        this.initializeSaved()
        this.score = document.getElementById("score")
    }

    initializeTetraminoImages()
    {
        for (let value of 'IJLOSTZ')
        {
            this.tetramino_images.set(`tetramino_${value}`, new Image())
            this.tetramino_images.get(`tetramino_${value}`).src = `./assets/images/tetramino-${value}.png`
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
        if (this.data.current_tetramino !== undefined)
        {
            this.updateShadowTetramino()
            this.updateCurrentTetramino()
        }
        if (this.data.next_tetramino !== undefined)
        {
            this.updateNextTetramino()
        }
        if (this.data.saved_tetramino !== undefined)
        {
            this.updateSavedTetramino()
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
                this.field_context.drawImage(this.tetramino_images.get(this.data.field[i][j]), x, y, cell_size, cell_size)
            }
        }
    }

    updateCurrentTetramino()
    {
        for (let point of this.data.current_tetramino.current_state)
        {
            let x = point.x + this.data.current_tetramino_position.x
            let y = point.y + this.data.current_tetramino_position.y
            if (x < 0 || y < 0 || x >= this.data.field_width || y >= this.data.field_height)
            {
                continue
            }
            x *= cell_size
            y *= cell_size
            this.field_context.drawImage(this.tetramino_images.get(this.data.current_tetramino.name), x, y, cell_size, cell_size)
        }
    }

    updateShadowTetramino()
    {
        for (let point of this.data.current_tetramino.current_state)
        {
            let x = point.x + this.data.shadow_tetramino_position.x
            let y = point.y + this.data.shadow_tetramino_position.y
            if (x < 0 || y < 0 || x >= this.data.field_width || y >= this.data.field_height)
            {
                continue
            }
            x *= cell_size
            y *= cell_size
            this.field_context.globalAlpha = 0.5
            this.field_context.drawImage(this.tetramino_images.get(this.data.current_tetramino.name), x, y, cell_size, cell_size)
            this.field_context.globalAlpha = 1
        }
    }

    updateNextTetramino()
    {
        for (let i = 0; i < this.next.length; i++)
        {
            this.next[i].setAttribute("class", this.data.next_tetramino.name)
            // in the top and left positions added offset relative to fixation position
            let top = cell_size * (this.data.next_tetramino.current_state[i].y + 1)
            let left = cell_size * (this.data.next_tetramino.current_state[i].x - 3)
            this.next[i].style.top = `${top}px`
            this.next[i].style.left = `${left}px`
        }
    }

    updateSavedTetramino()
    {
        for (let i = 0; i < this.saved.length; i++)
        {
            this.saved[i].setAttribute("class", this.data.saved_tetramino.name)
            // in the top and left positions added offset relative to fixation position
            let top = cell_size * (this.data.saved_tetramino.current_state[i].y + 1)
            let left = cell_size * (this.data.saved_tetramino.current_state[i].x - 3)
            this.saved[i].style.top = `${top}px`
            this.saved[i].style.left = `${left}px`
        }
    }
}