import gsap from "gsap"
import { $App } from ".."
import barba from "@barba/core"

export default class Nav {
  app: $App
  elements: HTMLElement[]
  pages: {
    home: string
    // longPage: string
  }
  titles: {
    home: string
    // "long-page": string
  }
  menuTl: gsap.core.Timeline
  constructor(app: $App) {
    this.app = app
    this.create()
    this.createBarba()
    this.createMenu()

    this.pages = {
      home: "",
      // longPage: "long-page",
    }
    this.titles = {
      home: "",
      // "long-page": "",
    }
  }

  create(transit = false) {
    return null
    // window.addEventListener("popstate", this.back.bind(this))

    // this.elements = window.$$("a[nav]")
    // this.elements.forEach((element) => {
    //   if (innerWidth < 760) return
    //   element.onclick = async (e) => {
    //     e.preventDefault()
    //     const target = e.target as HTMLAnchorElement
    //     await this.ready(target.href, true)
    //   }
    // })
  }

  createBarba() {
    const Nav = this
    const App = this.app

    barba.init({
      transitions: [
        {
          name: "transiontion name",
          before(data) {},
          async beforeLeave(data) {
            await gsap.to(".postloader", {
              scaleY: 1,
              ease: "ease.out",
              duration: 1,
              delay: 0.5,
            })
            App.scroll.lenis.scrollTo(0, { immediate: true })
          },

          leave(data) {},

          afterLeave(data) {},

          beforeEnter(data) {},

          async enter(data) {},

          async afterEnter(data) {
            App.page.destroy()
            App.page = App.pages[data.next.namespace]
            gsap.delayedCall(1.1, () => App.page.create(true))
          },

          after(data) {},
        },
      ],
    })
  }

  createMenu() {
    const open = window.$(".header__nav__open")
    const close = window.$(".header__nav__close")

    const mm = gsap.matchMedia()
    this.menuTl = gsap.timeline({
      paused: true,
      defaults: { ease: "power1", duration: 0.5 },
    })
    mm.add("(min-width:761px)", () => {
      this.menuTl
        .fromTo(
          ".header__nav__close",
          {
            width: "25rem",
            height: "4.4rem",
            "--opacity": 0,
            ease: "power1.out",
          },
          {
            width: "67.9rem",
            height: "65rem",
            "--opacity": 1,
          }
        )
        .fromTo(
          ".header__nav__home",
          {
            y: "0rem",
            ease: "power1.out",
          },
          {
            y: "62.1rem",
            duration: 0.1,
          },
          0.2
        )
        .to(
          ".header__nav__home",

          {
            opacity: 0,
            duration: 0.1,
          },
          0
        )
        .to(
          ".header__nav__home",
          {
            opacity: 1,
            duration: 0.1,
          },
          0.4
        )
        .fromTo(
          ".header__nav__close a",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.1,
          }
        )
        .fromTo(
          ".header__nav__close a",
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.25,
            stagger: { amount: 0.25 },
          },
          0.6
        )
        .fromTo(
          ".header__nav__close > *",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.2,
            delay: 0.5,
          },
          0
        )
        .fromTo(
          ".header__nav__close",
          {
            color: "transparent",
          },
          {
            color: "#010101",
            duration: 0.2,
            delay: 0.5,
          },
          0
        )
    })
    mm.add("(max-width:760px)", () => {
      this.menuTl
        .fromTo(
          ".header__nav__close",
          {
            width: "17rem",
            height: "4rem",
            "--opacity": 0,
            ease: "power1.out",
          },
          {
            width: "34rem",
            height: "56rem",
            "--opacity": 1,
          }
        )
        .fromTo(
          ".header__nav__home",
          {
            y: "0rem",
            ease: "power1.out",
          },
          {
            y: "62.1rem",
            duration: 0.1,
          },
          0.2
        )
        .to(
          ".header__nav__home",

          {
            opacity: 0,
            duration: 0.1,
          },
          0
        )
        .to(
          ".header__nav__home",
          {
            opacity: 1,
            duration: 0.1,
          },
          0.4
        )
        .fromTo(
          ".header__nav__close a",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.1,
          }
        )
        .fromTo(
          ".header__nav__close a",
          {
            yPercent: 100,
            clipPath: "inset(0% 0% 100% 0%)",
          },
          {
            yPercent: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.25,
            stagger: { amount: 0.25 },
          },
          0.6
        )
        .fromTo(
          ".header__nav__close > *",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.2,
            delay: 0.5,
          },
          0
        )
        .fromTo(
          ".header__nav__close",
          {
            color: "transparent",
          },
          {
            color: "#010101",
            duration: 0.2,
            delay: 0.5,
          },
          0
        )
    })

    open.onclick = () =>
      this.menuTl.progress() > 0.5 ? this.menuTl.reverse() : this.menuTl.play()
    close.onclick = () =>
      this.menuTl.progress() > 0.5 ? this.menuTl.reverse() : this.menuTl.play()
  }

  resize() {}
  destroy() {}

  navigate() {
    this.create()
  }

  async ready(href: string, push = true) {
    const [html, template] = await this.go(event)
    await gsap.to(".postloader", {
      scaleY: 1,
      ease: "power1",
      duration: 1,
      delay: 0.5,
    })
    location.assign(href)
    gsap.to(".postloader", {
      scaleY: 0,
      ease: "power1",
      duration: 1,
      delay: 5,
    })
  }

  async go({ target }) {
    const { href } = target
    const request = await fetch(href)
    if (request.ok) {
      const html = await request.text()
      const div = document.createElement("div")
      div.innerHTML = html
      const content = div.querySelector(".content")
      const template = content.getAttribute("data-template")
      return [content.innerHTML, template]
    } else {
      console.log(`could not fetch ${href}`)
    }
  }

  async back() {
    if (innerWidth < 760) return
    location.reload()
  }

  menuOpen() {
    this.app.scroll.lenis.stop()
  }

  async menuClose() {
    this.app.scroll.lenis.start()
  }
}
