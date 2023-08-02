const player = (sign, turn) => {
    const getSign = () => {
        return sign;
    }
    return { getSign, turn }
}

const game = (() => {
    var signsArray = [null,null,null,null,null,null,null,null,null]
    const playerX = player('X', true);
    const playerO = player('O', false);
    var currentPlayer = playerX;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    function togglePlayer() {
        if (currentPlayer === playerX) {
            currentPlayer = playerO;
        } else if (currentPlayer === playerO) {
            currentPlayer = playerX;
        }
        return currentPlayer;
    }

    function isGameOver() {
        const winner = getWinner()
        if(!!winner) {
            displayController.statusControl(`${winner} is the winner`);
            displayController.disableClicks();
        }
        else if(isArrayFull()) {
            displayController.statusControl("GAME OVER");
            resetArray()
        } else {
            displayController.statusControl(`${game.currentPlayer.getSign()}'s turn`)
        }
    }

    function getWinner() {
        for (let condition = 0; condition < winConditions.length; condition++) {
            for (let i = 0; i < winConditions[condition].length; i++) {
                if((signsArray[winConditions[condition][0]] === signsArray[winConditions[condition][1]]) && (signsArray[winConditions[condition][0]]) === signsArray[winConditions[condition][2]] && signsArray[winConditions[condition][0]] != null) {
                    const winner = signsArray[winConditions[condition][0]];
                    return winner;
                };
            };
        }
    }

    function isArrayFull() {
        return !signsArray.includes(undefined || null)
    }

    function resetArray() {
        signsArray = signsArray.map(sign => sign = null);
    }

    function render(index, sign) {
        signsArray[index] = sign;
        game.currentPlayer = game.togglePlayer();
        isGameOver()
    }

    return { togglePlayer, render, currentPlayer, resetArray }
})();

const displayController = (() => {
    const boxes = document.querySelectorAll('.box');
    const restart = document.querySelector('.restart');

    function clickBoxes() {
        boxes.forEach(box => {
            box.addEventListener('click', showSign)
        })
    }

    clickBoxes();

    function disableClicks() {
        boxes.forEach(box => {
            box.removeEventListener('click', showSign)
        })
    }

    function showSign(e) {
        if (!!e.target.innerText != true) {
            e.target.textContent = game.currentPlayer.getSign();
            game.render(e.target.id, game.currentPlayer.getSign());
        }
    }

    restart.addEventListener('click', function () {
        boxes.forEach(box => {
            box.textContent = "";
        });
        game.resetArray();
        statusControl("");
        clickBoxes();
    });

    function statusControl(result) {
        const status = document.querySelector('.status')
        status.textContent = result;
    }

    return { statusControl, disableClicks }
})();
