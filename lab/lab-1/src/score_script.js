let restart_element = document.getElementById("restart")
restart_element.addEventListener("click", restart)
document.addEventListener("keydown", restartEnter)

function restart(event)
{
    window.location = "main.html"
}

function restartEnter(event)
{
    if (event.key === "Enter")
    {
        restart(event)
    }
}

let score_table = JSON.parse(localStorage["tetris.score_table"])
score_table.sort(compare)

function compare(left, right)
{
    if (left.score < right.score)
    {
        return 1
    }
    return -1
}

let names_element = document.getElementById("names")
let scores_element = document.getElementById("scores")

for (let i = 0; i < Math.min(10, score_table.length); i++)
{
    let current_name = document.createElement("div")
    current_name.setAttribute("class", "name_text")
    current_name.innerText = score_table[i].name
    names_element.appendChild(current_name)
    let current_score = document.createElement("div")
    current_score.setAttribute("class", "score_text")
    current_score.innerText = score_table[i].score
    scores_element.appendChild(current_score)
}
