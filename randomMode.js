export function initGame() {
    const cells = document.querySelectorAll(".cell");
    const staticText = document.querySelector("#staticText");
    const btn = document.querySelector("#restartBtn");
    const winCondition = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    let option = ["", "", "", "", "", "", "", "", ""];
    let currPlayer = "X";
    let running = false;
    restartGame()

    function cellClicked() {
        const cellIndex = this.getAttribute("cellIndex");

        if (option[cellIndex] != "" || !running) {
            return;
        }
        updateCell(this, cellIndex);
        checkWin();
        if (running) {
            changePlayer(); 
            randomPick();  
        }
    }

    function updateCell(cell, index) {
        option[index] = currPlayer;
        cell.textContent = currPlayer;
        cell.style.color = (currPlayer == "X") ? "#21a9e0" : "#f67e0a";
    }

    function changePlayer() {
        currPlayer = (currPlayer == "X") ? "O" : "X";
        staticText.textContent = `${currPlayer}'s Turn`;
    }

    function randomPick() {
        setTimeout(() => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * option.length);
            } while (option[randomIndex] !== "");

            updateCell(cells[randomIndex], randomIndex);
            checkWin();

            if (running) {
                changePlayer(); 
                running = true;
            }
        }, 1000);
    }

    function checkWin() {
        let roundWon = false;
        let declareWin = [];
        let cellA, cellB, cellC;
        for (let i = 0; i < winCondition.length; i++) {
            const Condition = winCondition[i];
            cellA = option[Condition[0]];
            cellB = option[Condition[1]];
            cellC = option[Condition[2]];

            if (cellA == "" || cellB == "" || cellC == "") {
                continue;
            }
            if (cellA == cellB && cellB == cellC) {
                declareWin = Condition;
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            staticText.textContent = `${currPlayer} Won!!`;
            declareWin.forEach(index => cells[index].style.background = "#2e4f5e");
            running = false;
        } else if (!option.includes("")) {
            staticText.textContent = "Draw!";
            running = false;
        }
    }

    function restartGame() {
        currPlayer = "X";
        option = ["", "", "", "", "", "", "", "", ""];
        staticText.textContent = `${currPlayer}'s Turn!`;
        running = true;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.background = "";
        });
    }

    cells.forEach((cell, index) => {
        cell.setAttribute("cellIndex", index);
        cell.addEventListener("click", cellClicked);
    });
    btn.addEventListener("click", restartGame);
    staticText.textContent = `${currPlayer}'s Turn`;
    running = true;
}
