class Game {
    // code to be added
    constructor(){
        this.startScreen = document.getElementById("game-intro"); //dom method
        this.gameScreen = document.getElementById("game-screen"); // dom method
        this.gameEndScreen = document.getElementById("game-end"); // dom method com essas três partes consguimos mudar as screen (intro, jogo e fim)
        this.player = new Player(this.gameScreen, 
        200,
        500,
        100,
        150,
        "./images/car.png"); // o carro começa no canto de baixo da tela
      this.height = 600; // aqui está assumindo valor px
      this.width = 500; // aqui está assumindo valor px
      this.obstacles = []; // collection of items, o melhor é array
      this.score = 0; // cada vez que bater perde ponto, por isso começa com 0
      this.lives = 3; // é possível bater o carro três vezes antes de morrer
      this.gameIsOver = false; // depois de bater 3 vezes aciona o método gameOver para encerrar o jogo
      this.loadingObstacle = false; //
    }

    start(){
      // Set the height and width of the game screen | quando o jogo começa muda a tela e tem essa configuração
      this.gameScreen.style.height = `${this.height}px`;// aqui busca a altura da tela
      this.gameScreen.style.width = `${this.width}px`; // aqui busca a largura da tela

      // Hide the start screen/ Intro screen 
      this.startScreen.style.display = "none"; // 

      // Show the game screen | ao começar o jogo esconde/bloqueia a tela inicial
      this.gameScreen.style.display = "block"; // this display block elements stack, regardless of their width

      // Start the game loop
      this.gameLoop();
    } 

    gameLoop(){
        // Interrupt the function to stop the loop if "gameIsOver" is set to "true"
        if (this.gameIsOver) {
            return; //o return pára o loop se der gameOver (zerar as vidas)
        }
    
        this.update(); // keeps updating the screen with the gameLoop function 
    
        window.requestAnimationFrame(() =>{ this.gameLoop()}); // é um method que cria animation (gráfico, frames per seconds, update methods)
    }

    update(){
        let score = document.getElementById("score");
        let lives = document.getElementById ("lives");
      
        score.innerHTML = this.score;
        lives.innerHTML = this.lives;

        this.player.move(); //para continuar a mover o player during the game
        //console.log("in the update"); foi usado só no começo do exercício

        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();

        // If the player's car collides with an obstacle
        if (this.player.didCollide(obstacle)) {
          // Remove the obstacle element from the DOM
            obstacle.element.remove();
          // Remove obstacle object from the array
            this.obstacles.splice(i, 1); //esse splice remove o obstaculo do array
          // Reduce player's lives by 1
            this.lives--;
          // Update the counter variable to account for the removed obstacle
        } // If the obstacle is off the screen (at the bottom)
        else if (obstacle.top > this.height) {
          // Increase the score by 1
            this.score++;
          // Remove the obstacle from the DOM
            obstacle.element.remove(); //remove o obstaculo do HTML
          // Remove obstacle object from the array
            this.obstacles.splice(i, 1); // esse splice remove o obstaculo do array
          // Update the counter variable to account for the removed obstacle
        }
    }
    
        // If the lives are 0, end the game
        if (this.lives === 0) {
        this.endGame();
    }
    
        // Check for collision and if an obstacle is still on the screen
        if(!this.obstacles.length && !this.loadingObstacle){ //aqui coloca-se os obstáculos
        this.loadingObstacle = true;
        setTimeout(() =>{
            console.log("test");
            this.obstacles.push(new Obstacle(this.gameScreen));
            this.loadingObstacle = false;
        }, 500);
    }
  } 
    
    // Create a new method responsible for ending the game
    endGame() {
        this.gameIsOver = true;
        this.player.element.remove();
                
        // Hide game screen
        this.gameScreen.style.display = "none";
      // Show end game screen
        this.gameEndScreen.style.display = "block";
        this.lives.innerHTML = 0;

        this.obstacles.forEach(obstacle => {  obstacle.element.remove();
        });
        return;
    }
}