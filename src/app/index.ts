import gsap from "gsap"
import Framework from "./classes/framework"
import Scroll from "./classes/scroll"
import Home from "./pages/Home"
import Nav from "./partials/nav"
import Lenis from "@studio-freight/lenis/types"
import { GLTF } from "three/examples/jsm/Addons.js"

declare global {
  interface Window {
    app: App
    $(el: string): HTMLElement
    $$(el: string): HTMLElement[]
    lenis: Lenis
    GLS: [GLTF, GLTF, GLTF]
  }
}

export interface $App {
  page: Home
  pages: {
    home: Home
  }
  partials: { nav: Nav }
  scroll: Scroll
  content: Element
  template: string
  createPages(): void
  createPartials(): void
}

class App extends Framework implements $App {
  pages: {
    home: Home
  }
  partials: { nav: Nav }
  page: Home

  constructor() {
    super()
    this.createPages()
    this.createPartials()
    this.preload()
    window.onresize = () => this.onresize()
  }

  preload() {}

  createPartials() {
    this.partials = {
      nav: new Nav(this),
    }
  }
  createPages() {
    this.pages = {
      home: new Home(this),
    }
    this.page = this.pages[this.template]
      ? this.pages[this.template]
      : this.pages.home
    this.page.create()
  }

  onresize() {
    Object.values(this.pages).forEach((page) => page.resize())
    Object.values(this.partials).forEach((partial) => partial.resize())
  }
}

window.$ = (el: string) => document.querySelector(el)
window.$$ = (el: string) => gsap.utils.toArray(el)
window.app = new App()
