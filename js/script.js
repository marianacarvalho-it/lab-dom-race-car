window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  startButton.addEventListener("click", function () {
      startGame();
  });

  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  function startGame() {
    console.log("start game");
    game = new Game(); // added
    game.start(); // added
  }

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }

  // Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;

    const possibleKeys = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeys.includes(key)) {
      event.preventDefault(); //.preventDefault() evita provaveis erros

  // Update player's directionX and directionY based on the key pressed
    if(game){
      switch (key) { // não funciona como condição nesse caso
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    } 
  }
        // Function that handles keys events
        function handleKeyup (event){
        const key = event.key;
        const possibleKeys = [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown"]

        if (possibleKeys.includes(key)){
          event.preventDefault();}// prevents default role of keys to be used (like up and down are for scrolling the pages)
        }
        if (game){
          switch(key){
            case "ArrowLeft":
              game.player.directionX = 0;
              break;
            case "ArrowRight":
              game.player.directionX = 0;
              break;
            case "ArrowUp":
              game.player.directionY = 0;
              break;
            case "ArrowDown":
              game.player.directionY = 0;
          }
        }
      }
      // Add the handleKeydown function as an event listener for the keydown event
window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup); 
};
/* function startGame() {
  console.log("start game");
  game = new Game();
  game.start();
} */



