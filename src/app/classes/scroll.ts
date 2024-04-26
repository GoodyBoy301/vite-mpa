import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { Observer, ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger, Observer)

interface LenisEvent {
  animate: {
    value: number
    from: number
    to: number
    lerp: number
    duration: number
    isRunning: boolean
  }
  animatedScroll: number
  dimensions: { wrapper: Window; content: HTMLElement }
  direction: 1 | -1
  options: { wrapper: Window; content: HTMLElement }
  targetScroll: number
  time: number
  velocity: number
  __isLocked: boolean
  __isScrolling: boolean
  __isSmooth: true
  __isStopped: boolean
  actualScroll: number
  className: string
  isHorizontal: boolean
  isLocked: boolean
  isScrolling: boolean
  isSmooth: boolean
  isStopped: boolean
  limit: number
  progress: number
  scroll: number
}

export default class Scroll {
  lenis: Lenis | undefined
  scrollbar: gsap.core.Timeline | undefined
  observer: Observer | undefined
  main: gsap.core.Timeline | undefined
  navbar: gsap.core.Timeline
  constructor(page: string) {
    this.create(page)
  }

  create(page: string) {
    this.lenis = new Lenis({
      // wrapper: innerWidth >= 768 ? window : window.$(".app"),
      // smoothTouch: true,
      lerp: 0,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    })

    window.lenis = this.lenis

    createMain()

    this.lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(this.raf.bind(this))

    let isPlayingNav = false
    let isReversingNav = false
    this.lenis.on("scroll", ({ direction }: LenisEvent) => {
      if (direction > 0 && innerWidth >= 768) {
        if (isPlayingNav) return
        isPlayingNav = true
        gsap.delayedCall(0.9, () => {
          isPlayingNav = false
        })
        this.navbar.play()
      }

      if (direction < 0 && innerWidth >= 768) {
        if (isReversingNav) return
        isReversingNav = true
        gsap.delayedCall(0.9, () => {
          isReversingNav = false
        })
        this.navbar.reverse()
      }
    })

    this.navbar = gsap.timeline({ paused: true }).fromTo(
      "header",
      {
        y: "0rem",
        ease: "power2.out",
      },
      {
        y: "-8.65rem",
        ease: "power2.in",
        duration: 1,
      }
    )
  }

  navigate(page: string) {
    // this.lenis.reset()
    this.create(page)
  }

  raf(time: number) {
    this.lenis.raf(time)
    requestAnimationFrame(this.raf.bind(this))
  }
}

function createMain() {
  const mm = gsap.matchMedia()
  let tl: gsap.core.Timeline
  tl = gsap.timeline()
  mm.add("(min-width:761px)", () => {
    tl = gsap
      .timeline({
        paused: true,
        defaults: { ease: "none" },
        scrollTrigger: { scrub: true },
      })
      .to(".header__nav__home", { y: "-20vh", duration: 20 })
      .to(".header__nav__home", { opacity: 0, duration: 100 })
  })

  mm.add("(min-width:1920px)", () => {
    tl = gsap.timeline()
  })

  mm.add("(max-width:760px)", () => {
    tl = gsap.timeline({
      paused: true,
      defaults: { ease: "none" },
      scrollTrigger: { scrub: true },
    })
  })
}
