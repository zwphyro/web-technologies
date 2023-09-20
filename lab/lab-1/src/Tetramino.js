export class TetraminoI
{
    constructor()
    {
        this.name = "tetramino_I"
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

export class TetraminoJ
{
    constructor()
    {
        this.name = "tetramino_J"
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

export class TetraminoL
{
    constructor()
    {
        this.name = "tetramino_L"
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

export class TetraminoS
{
    constructor()
    {
        this.name = "tetramino_S"
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

export class TetraminoZ
{
    constructor()
    {
        this.name = "tetramino_Z"
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

export class TetraminoO
{
    constructor()
    {
        this.name = "tetramino_O"
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

export class TetraminoT
{
    constructor()
    {
        this.name = "tetramino_T"
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
