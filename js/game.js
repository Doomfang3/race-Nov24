const GRASS_WIDTH = 50

class Game {
  constructor() {
    this.gameIntro = document.getElementById('game-intro')
    this.gameScreen = document.getElementById('game-screen')
    this.endScreen = document.getElementById('game-end')
    this.scoreElement = document.getElementById('score')
    this.livesElement = document.getElementById('lives')
    this.width = 500
    this.height = 600
    this.player
    this.gameLoopId
    this.currentFrame = 0
    this.obstacles = []
    this.score = 0
    this.lives = 3
    this.isGameOver = false
  }

  start() {
    this.gameIntro.style.display = 'none'
    this.endScreen.style.display = 'none'
    this.gameScreen.style.display = 'block'

    this.gameScreen.style.width = `${this.width}px`
    this.gameScreen.style.height = `${this.height}px`

    this.player = new Player(this.gameScreen)

    this.gameLoop()
  }

  gameLoop() {
    this.gameLoopId = setInterval(() => {
      this.currentFrame += 1
      this.scoreElement.innerText = this.score
      this.livesElement.innerText = this.lives

      if (this.currentFrame % 60 === 0) {
        this.obstacles.push(new Obstacle(this.gameScreen))
      }
      this.player.move()

      const nextObstacles = []
      this.obstacles.forEach(currentObstacle => {
        currentObstacle.move()
        if (this.player.didCollide(currentObstacle)) {
          currentObstacle.element.remove()
          this.lives -= 1
          if (this.lives < 0) {
            this.isGameOver = true
          }
        } else if (currentObstacle.positionY < this.gameScreen.clientHeight) {
          nextObstacles.push(currentObstacle)
        } else {
          currentObstacle.element.remove()
          this.score += 100
        }
      })
      this.obstacles = nextObstacles

      if (this.isGameOver) {
        clearInterval(this.gameLoopId)
        this.player.element.remove()
        this.obstacles.forEach(currentObstacle => {
          currentObstacle.element.remove()
        })
        this.gameScreen.style.display = 'none'
        this.endScreen.style.display = 'block'
      }
    }, 1000 / 60)
  }
}
