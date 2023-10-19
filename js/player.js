class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left; // pela logica começa pela esquerda
        this.top = top; // depois foi para cima
        this.width = width;
        this.height = height;
        // this.imgSrc = imgSrc; // o professor colocou essa linha durante a aula 
        this.directionX = 0; //horizontly direction, inicia com 0 e 
        this.directionY = 0; // vertical direction, inicia com 0 e 
        this.element = document.createElement("img"); //aqui busca a image 

        this.element.src = imgSrc; // cria o element busca o imgSrc na inicialização da construction
        this.element.style.position = "absolute"; // permite definir com absolute values, estamos fazendo a função CSS aqui, sempre que usamos .style 
        // Set up the default element's property values
        this.element.style.width = `${width}px`; // essa é forma de definir o tamanho em px (formatação CSS em JS)
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.gameScreen.appendChild(this.element); // 
    }

    move() {
        // Update player's car position based on directionX and directionY
        this.left += this.directionX; //   
        this.top += this.directionY; // 

        if (this.left + this.width >= this.gameScreen.offsetWidth){  // if the car is trying to leave the screen size on the right side, it will always be on the inside part of the screen
            this.left = this.gameScreen.offsetWidth - this.width;
            // left - side
        } else if (this.left <= 0){
            this.left = 0;
        }
        //top and bottom
        if (this.top <= 0){
            this.top = 0;
        }
        else if (this.top + this.height >= this.gameScreen.offsetHeight){  // height is measured from top to bottom, so this condition is for the bottom part
            this.top = this.gameScreen.offsetHeight - this.height;
            } 
            // Update the player's car position on the screen
            this.updatePosition(); // isso vai fazer o carro se movimentar
    }

        //Update CSS
        updatePosition() {
            this.element.style.left = `${this.left}px`; //
            this.element.style.top = `${this.top}px`;   //
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect(); // carro | getBoundingClientRect() busca o index(posição) e top, bottom, width and heigth em um único metodo, por isso com a condicional abaixo é possível verificar a colisão do carro com objeto. obs: lembrando que não é uma colisão se o carro bater na parede, pois fizemos as condições acima para corrigir a posição do carro para não passar a barreira da pista (quando isso acpntece fazer o valor -10 nesse caso).  
        const obstacleRect = obstacle.element.getBoundingClientRect(); // obstáculo
    
        if ( // fazer testes com isso para ver como a batida funciona, 
        // nessa condição estamos colocando cada posição em direção à outra. Então, 
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            layerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top) {
            return true; /* será uma colisão */
            } else { // do contrário não será uma colisão
            return false;
        }
    }
}