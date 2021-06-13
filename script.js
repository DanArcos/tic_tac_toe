//Create a GameBoard object
const gameBoard = ( () => {
    let playerTurn = true;
    
    let array = ["","","","","","","","",""]; //Set Default Value
    
    var clearBoard = () => {
        return ["","","","","","","","",""]
    }

    return {playerTurn, array, clearBoard}
})();

//Create a Display Controller Object
const displayController = ( () => {
    //Initial Grid
    const createGrid = () =>{
        let counter = 0
        document.querySelectorAll('.grid_row').forEach( (element) => {
            console.log(element)
            for (let i = 0; i < 3; i++){
                let div = document.createElement('div')
                div.dataset.index = counter;
                div.id = 'gameSpace_'+counter
                div.classList.add('board_div')
                div.textContent = ""

                div.addEventListener('click', (e)=>{
                    console.log(e.target)
                    if (gameBoard.playerTurn){
                        gameBoard.playerTurn = false // switch flag back
                        player1.makeMove("X", e.target.dataset.index)
                         
                    }
                    else{
                        gameBoard.playerTurn = true// switch flag back
                        player2.makeMove("O", e.target.dataset.index)
                    }
                    
                    console.log(gameBoard.array)
                })

                element.appendChild(div)
                
                counter = counter + 1
            }

        })
    } 
    
    //Check if there's a winner
    var checkWinner = () => {
        let condition1 = gameBoard.array[0]===gameBoard.array[1] && gameBoard.array[1]===gameBoard.array[2] //Check First Row
        let condition2 = gameBoard.array[3]===gameBoard.array[4] && gameBoard.array[4]===gameBoard.array[5] //Check Second Row
        let condition3 = gameBoard.array[6]===gameBoard.array[7] && gameBoard.array[7]===gameBoard.array[8] //Check Third Row
        
        let condition4 = gameBoard.array[0]===gameBoard.array[3] && gameBoard.array[3]===gameBoard.array[6] //Check First Column
        let condition5 = gameBoard.array[1]===gameBoard.array[4] && gameBoard.array[4]===gameBoard.array[7] //Check Second Column
        let condition6 = gameBoard.array[2]===gameBoard.array[5] && gameBoard.array[5]===gameBoard.array[8] //Check Third Column
        
        let condition7 = gameBoard.array[0]===gameBoard.array[4] && gameBoard.array[4]===gameBoard.array[8] //Check First Diagnol
        let condition8 = gameBoard.array[2]===gameBoard.array[4] && gameBoard.array[4]===gameBoard.array[6] //Check Second Diagnol

        return (condition1||condition2||condition3||condition4||condition5||condition6||condition7||condition8);
    }

    //Update Display
    var updateDisplay = (array) => {
        //Update Game Status
        const gameStatus = document.getElementById("gameStatus")
        let statusText;
        gameBoard.playerTurn ? statusText = "Player 1 Turn" : statusText = "Player 2 Turn"
        gameStatus.textContent = statusText;

        //Update Block
        document.querySelectorAll(".board_div").forEach( (element) => {
            element.textContent = gameBoard.array[element.dataset.index]
        })

        if(checkWinner()){
            //Show Winning Display
        }
        else{
            //Do Nothing and keep playing
        }

    }
    
    var wipeBoard = () => {
        gameBoard.array = gameBoard.clearBoard()
        gameBoard.playerTurn = true;
        updateDisplay(gameBoard.array)
        console.log(gameBoard.array)    
    }

    return {createGrid, checkWinner, updateDisplay, wipeBoard}

})();

//Create Player Object Using a factory
const Player = (name) => {
    const getName = () => {console.log(`my name is ${name}`)}
    const makeMove = (mark, index) => {
        if(gameBoard.array[index] != ""){
            //Do Nothing If already occupied
            alert("Select Another Spot!")
        }
        else{
            gameBoard.array[index] = mark
            displayController.updateDisplay(gameBoard.array)
        }
    };
    return {getName, makeMove}
}

//Logic For Clicking the Clear Board Button
document.getElementById('clear_btn').addEventListener('click', (e)=>{
    displayController.wipeBoard();
})

console.log("Page Loaded")

console.log('Create Grid')
displayController.createGrid()

const player1 = Player('Dan')
player1.getName()

const player2 = Player('Computer')
player2.getName()

displayController.updateDisplay(gameBoard.array)

//player1.makeMove("X",0)
//player1.makeMove("X",1)
//player1.makeMove("X",2)

//console.log(gameBoard.array)
//console.log(gameBoard.clearBoard())
//console.log(gameBoard.array)