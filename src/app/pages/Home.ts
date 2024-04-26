import { $App } from ".."

export default class Home {
  app: $App
  constructor(app: $App) {
    this.app = app
  }

  async create(transit = false) {
    if (transit) {
    } else {
      this.preLoad()
    }
  }

  preLoad() {}

  resize() {}

  destroy() {}

  navigate() {}
}
