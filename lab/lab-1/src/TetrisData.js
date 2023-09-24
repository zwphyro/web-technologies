/* A class that implements data storage
 */
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
        this.next_tetromino = undefined
        this.saved_tetromino = undefined
        this.current_tetromino = undefined
        this.current_tetromino_position = {x: 0, y: 0}
        this.shadow_tetromino_position = {x: 0, y: 0}
        this.removed_rows_amount = 0
        this.level = 0
        this.score = 0
    }
}
