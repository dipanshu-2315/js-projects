let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];




document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
      box.addEventListener("click", () => {
          if (turnO) {
              box.innerText = "O";
              box.classList.add("o"); // Add class for styling
              box.classList.remove("x");
              turnO = false;
          } else {
              box.innerText = "X";
              box.classList.add("x"); // Add class for styling
              box.classList.remove("o");
              turnO = true;
          }
          box.disabled = true;
          checkWinner();
      });
  });
});



  const disableBoxes = () => {
    const boxes = document.querySelectorAll(".box"); 

    for(let box of boxes) {
      box.disabled = true;
    }
  }

  const enableBoxes = () => {
    const boxes = document.querySelectorAll(".box"); 

    for(let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  }




  const checkWinner = () => {
    const boxes = document.querySelectorAll(".box"); 
    let isDraw = true; // Assume it's a draw initially

    // Check for a winner
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // If all three positions match and are not empty, declare a winner
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val); // Display winner message
            return; // Stop further execution once we have a winner
        }
    }

    // Check if all boxes are filled (No empty spaces left)
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false; // If an empty box is found, it's not a draw
        }
    });

    if (isDraw) {
        showDraw(); // If no winner and board is full, declare a draw
    }
};


const gameTitle = document.getElementById("game-title");


const showWinner = (winner) => {
  setTimeout(() => {
      msg.innerText = `🎉 Congrats! Winner is ${winner}`;
      msgContainer.classList.remove("hide"); // Show result message
      gameTitle.classList.add("hide"); // Hide Tic-Tac-Toe title
  }, 1000); // 1-second delay
  disableBoxes(); // Disable boxes immediately
};

const showDraw = () => {
  setTimeout(() => {
      msg.innerText = "🤝 It's a Draw!";
      msgContainer.classList.remove("hide"); // Show result message
      gameTitle.classList.add("hide"); // Hide Tic-Tac-Toe title
  }, 1000); // 1-second delay
  disableBoxes(); // Disable boxes immediately
};


const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameTitle.classList.remove("hide"); // Show Tic-Tac-Toe title again

}



  newGamebtn.addEventListener("click",resetGame);
  resetBtn.addEventListener("click",resetGame);

  
  
