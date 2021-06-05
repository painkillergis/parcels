class GameEngine {
  canvas?: HTMLCanvasElement
  viewport: Viewport = {
    center: { x: 0, y: 0 },
    size: { x: window.innerWidth, y: window.innerHeight },
    zoom: 2 ** 1,
  }
  hasUpdated: Boolean = true
  intervals: Array<NodeJS.Timeout> = []

  customers: Array<Customer> = []
  towers: Array<Tower> = []
  money: number = 10_000

  eventListeners: Array<EventListener> = []

  constructor() {
    this.towers = Array(1)
      .fill(null)
      .map(() => {
        const magnitude = 64
        const angle = Math.random() * Math.PI * 2
        return {
          location: {
            x: Math.sin(angle) * magnitude,
            y: Math.cos(angle) * magnitude,
          },
        }
      })

    this.customers = setIsServiced(
      this.towers,
      Array(100)
        .fill(null)
        .map(() => {
          const magnitude = Math.random() ** 2 * 512
          const angle = Math.random() * Math.PI * 2
          return {
            location: {
              x: Math.sin(angle) * magnitude,
              y: Math.cos(angle) * magnitude,
            },
            isServiced: false,
          }
        }),
    )

    this.intervals = [
      setInterval(() => {
        if (this.canvas && this.hasUpdated) {
          this.hasUpdated = false
          this.render()
        }
      }, 1 / 30),
      setInterval(() => {
        this.setMoney(
          this.money -
            80 * this.towers.length +
            5 *
              this.customers.filter((customer) => customer.isServiced)
                .length,
        )
      }, 1000),
    ]

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)
  }

  render() {
    const { x: width, y: height } = this.viewport.size

    this.canvas!.width = width
    this.canvas!.height = height

    const context = this.canvas!.getContext('2d')!

    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)

    this.customers
      .map((customer) => ({
        ...customer,
        location: toScreenLocation(this.viewport, customer.location),
      }))
      .filter(({ location }) =>
        contains(
          { left: 0, top: 0, right: width, bottom: height },
          location,
        ),
      )
      .forEach(({ location, isServiced }) => {
        context.fillStyle = isServiced ? 'green' : 'gray'
        context.beginPath()
        context.ellipse(location.x, location.y, 4, 4, 0, 0, Math.PI * 2)
        context.fill()
      })

    context.strokeStyle = 'green'
    context.lineWidth = 2
    this.towers
      .map((tower) => ({
        ...tower,
        location: toScreenLocation(this.viewport, tower.location),
      }))
      .filter(({ location }) =>
        contains(
          { left: 0, top: 0, right: width, bottom: height },
          location,
        ),
      )
      .forEach(({ location }) => {
        context.beginPath()
        context.ellipse(
          location.x,
          location.y,
          64 * this.viewport.zoom ** 2,
          64 * this.viewport.zoom ** 2,
          0,
          0,
          Math.PI * 2,
        )
        context.stroke()
      })
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  addEventListener(eventListener: EventListener) {
    eventListener({ type: 'updateMoney', payload: this.money })
    this.eventListeners.push(eventListener)
  }

  removeEventListener(eventListener: EventListener) {
    this.eventListeners = this.eventListeners.filter(
      (_eventListener) => _eventListener !== eventListener,
    )
  }

  resize() {
    this.viewport = {
      ...this.viewport,
      size: {
        x: window.innerWidth,
        y: window.innerHeight,
      },
    }
    this.hasUpdated = true
  }

  pan(offset: Vector2) {
    this.viewport = {
      ...this.viewport,
      center: {
        x: this.viewport.center.x - offset.x / this.viewport.zoom ** 2,
        y: this.viewport.center.y - offset.y / this.viewport.zoom ** 2,
      },
    }
    this.hasUpdated = true
  }

  zoom(delta: number) {
    this.viewport = {
      ...this.viewport,
      zoom: Math.min(
        2 ** 2,
        Math.max(2 ** 0, this.viewport.zoom + delta / 2 ** 10),
      ),
    }
    this.hasUpdated = true
  }

  createTower(screenLocation: Vector2) {
    if (this.money >= 8000) {
      this.setMoney(this.money - 8000)
      this.towers.push({
        location: fromScreenLocation(this.viewport, screenLocation),
      })
      this.customers = setIsServiced(this.towers, this.customers)
      this.hasUpdated = true
    } else {
      this.dispatch({
        type: 'purchaseFailed',
        payload: { additionalMoneyRequired: 8000 - this.money },
      })
    }
  }

  setMoney(money: number) {
    this.money = money
    this.dispatch({ type: 'updateMoney', payload: money })
  }

  dispatch(action: Action) {
    this.eventListeners.forEach((eventListener) => eventListener(action))
  }
}

export interface Vector2 {
  x: number
  y: number
}

export type EventListener = (action: Action) => void

export interface Action {
  type: String
  payload?: any
}

interface Viewport {
  size: Vector2
  center: Vector2
  zoom: number
}

interface Customer {
  location: Vector2
  isServiced: Boolean
}

interface Tower {
  location: Vector2
}

interface Envelope {
  left: number
  top: number
  right: number
  bottom: number
}

function setIsServiced(
  towers: Array<Tower>,
  customers: Array<Customer>,
): Array<Customer> {
  return customers.map((customer) => ({
    ...customer,
    isServiced: towers.some(
      (tower) => magnitude(tower.location, customer.location) <= 64,
    ),
  }))
}

function toScreenLocation(viewport: Viewport, location: Vector2): Vector2 {
  return {
    x:
      viewport.size.x / 2 +
      (location.x - viewport.center.x) * viewport.zoom ** 2,
    y:
      viewport.size.y / 2 +
      (location.y - viewport.center.y) * viewport.zoom ** 2,
  }
}

function fromScreenLocation(
  viewport: Viewport,
  location: Vector2,
): Vector2 {
  return {
    x:
      (location.x - viewport.size.x / 2) / viewport.zoom ** 2 +
      viewport.center.x,
    y:
      (location.y - viewport.size.y / 2) / viewport.zoom ** 2 +
      viewport.center.y,
  }
}

function contains(envelope: Envelope, location: Vector2) {
  return (
    location.x >= envelope.left &&
    location.x <= envelope.right &&
    location.y >= envelope.top &&
    location.y <= envelope.bottom
  )
}

function magnitude(p1: Vector2, p2: Vector2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

export default GameEngine
