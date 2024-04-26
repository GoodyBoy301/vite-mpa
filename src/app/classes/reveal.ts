import Home from "../pages/Home"

export default class Reveal {
  threshold: number
  unobserve: number | boolean
  params: {
    threshold?: number
    unobserve?: number
    keep?: boolean
    elements: string
  }
  observer: IntersectionObserver
  page: any
  elements: HTMLElement[]
  constructor(
    page: Home,
    params: {
      threshold?: number
      unobserve?: number
      keep?: boolean
      elements: string
    }
  ) {
    this.threshold = params.threshold || 0.15
    this.unobserve = params.unobserve ?? true
    this.params = params
    this.page = page
    this.elements = window.$$(params.elements)
    this.createObserver()
  }

  createObserver() {
    const options = { threshold: this.threshold }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          this.page.revealIn({
            index: entry.target.getAttribute("data-slide"),
            target: el,
            id: entry.target.id || entry.target.className,
          })
          if (!this.params.keep) this.observer.unobserve(entry.target)
        } else {
          const el = entry.target
          this.page.revealOut({
            index: entry.target.getAttribute("data-slide"),
            target: el,
            id: entry.target.id || entry.target.className,
          })
        }
      })
    }, options)

    this.elements.forEach((el) => {
      this.observer.observe(el)
    })
  }
}
