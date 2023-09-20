export class TetrisData
{
    constructor()
    {
        this.field_width = 10
        this.field_height = 18
        this.field = new Array(this.field_height)
        for (let i = 0; i < this.field_height; i++)
        {
            this.field[i] = new Array(this.field_width).fill("empty_cell")
        }
        this.next_tetramino = undefined
        this.saved_tetramino = undefined
        this.current_tetramino = undefined
        this.current_tetramino_position = {x: 0, y: 0}
        this.shadow_tetramino_position = {x: 0, y: 0}
        this.removed_lines_amount = 0
        this.level = 0
        this.score = 0
    }
}
