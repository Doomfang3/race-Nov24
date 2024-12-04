class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen
    this.width = 40
    this.height = 80
    this.positionX =
      Math.round(Math.random() * (gameScreen.clientWidth - this.width - GRASS_WIDTH * 2)) +
      GRASS_WIDTH
    this.positionY = -80
    this.speed = 5
    this.element = document.createElement('img')

    this.element.src = 'images/redCar.png'
    this.element.style.position = 'absolute'
    this.element.style.width = `${this.width}px`
    this.element.style.height = `${this.height}px`
    this.element.style.left = `${this.positionX}px`
    this.element.style.top = `${this.positionY}px`

    this.gameScreen.appendChild(this.element)
  }

  updatePosition() {
    this.positionY += this.speed
  }

  move() {
    this.updatePosition()
    this.element.style.top = `${this.positionY}px`
  }
}
