class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen
    this.width = 40
    this.height = 80
    this.positionX = gameScreen.clientWidth / 2 - this.width / 2
    this.positionY = gameScreen.clientHeight - this.height - 20
    this.directionX = 0
    this.directionY = 0
    this.speed = 5
    this.element = document.createElement('img')

    this.element.src = 'images/car.png'
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`

    this.gameScreen.appendChild(this.element)
  }

  updatePosition() {
    this.positionX += this.speed * this.directionX
    if (this.positionX < 0 + GRASS_WIDTH) {
      this.positionX = 0 + GRASS_WIDTH
    }
    if (this.positionX > this.gameScreen.clientWidth - this.width - GRASS_WIDTH) {
      this.positionX = this.gameScreen.clientWidth - this.width - GRASS_WIDTH
    }

    this.positionY += this.speed * this.directionY
    if (this.positionY < 0) {
      this.positionY = 0
    }
    if (this.positionY > this.gameScreen.clientHeight - this.height) {
      this.positionY = this.gameScreen.clientHeight - this.height
    }
  }

  move() {
    this.updatePosition()
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect()
    const obstacleRect = obstacle.element.getBoundingClientRect()

    return (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    )
  }
}
