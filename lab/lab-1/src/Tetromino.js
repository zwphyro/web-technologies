/* A set of classes that store information about various tetrominoes and have a single interface
 */
export class TetrominoI
{
    constructor()
    {
        this.name = "tetromino_I"
        this.states = []
        this.states[0] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 6, y: 1}]
        this.states[1] = [{x: 4, y: -1}, {x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoJ
{
    constructor()
    {
        this.name = "tetromino_J"
        this.states = []
        this.states[0] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}]
        this.states[1] = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 2}]
        this.states[2] = [{x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}]
        this.states[3] = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoL
{
    constructor()
    {
        this.name = "tetromino_L"
        this.states = []
        this.states[0] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 3, y: 2}]
        this.states[1] = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 0}]
        this.states[2] = [{x: 5, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}]
        this.states[3] = [{x: 4, y: 0}, {x: 5, y: 2}, {x: 4, y: 1}, {x: 4, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoS
{
    constructor()
    {
        this.name = "tetromino_S"
        this.states = []
        this.states[0] = [{x: 4, y: 1}, {x: 5, y: 1}, {x: 3, y: 2}, {x: 4, y: 2}]
        this.states[1] = [{x: 3, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoZ
{
    constructor()
    {
        this.name = "tetromino_Z"
        this.states = []
        this.states[0] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}]
        this.states[1] = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoO
{
    constructor()
    {
        this.name = "tetromino_O"
        this.states = []
        this.states[0] = [{x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}

export class TetrominoT
{
    constructor()
    {
        this.name = "tetromino_T"
        this.states = []
        this.states[0] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}]
        this.states[1] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 4, y: 0}, {x: 4, y: 2}]
        this.states[2] = [{x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 0}]
        this.states[3] = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}]
        this.current_state_index = 0
    }

    get current_state()
    {
        return this.states[this.current_state_index]
    }

    rotateRight()
    {
        this.current_state_index = (this.current_state_index + 1) % this.states.length
    }

    rotateLeft()
    {
        this.current_state_index = (this.current_state_index - 1 + this.states.length) % this.states.length
    }
}
