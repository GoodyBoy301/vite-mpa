import {
  AmbientLight,
  CineonToneMapping,
  Group,
  Mesh,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three"

export default class GL {
  innerHeight: number
  innerWidth: number
  scene: Scene
  element: Element
  bounds: DOMRect
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  fov: number
  viewport: { height: number; width: number }
  composer: any
  group: Group[]
  light1: PointLight
  canvas: HTMLCanvasElement
  constructor(element: string, ...group: Group[]) {
    this.element = window.$(element)
    const bounds = this.element.getBoundingClientRect()
    this.bounds = bounds
    this.innerHeight = bounds.height
    this.innerWidth = bounds.width
    this.group = group
    this.create()
    // group.forEach((group) => (group.receiveShadow = true))
    // group.forEach((group) => (group.castShadow = true))
    this.scene.add(...group)
    this.camera.lookAt(group[0].position)
  }

  create(transit = false) {
    this.createRenderer()
    this.createScene()
    this.createCamera()
    this.reCalculate()
    this.canvas = this.renderer?.domElement
    this.update()
  }

  update() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.update.bind(this))
    // this.group.forEach((group) => (group.rotation.y += 0.01))
  }

  destroy() {
    this.renderer.dispose()
    this.scene.children.forEach((child) => child.clear())
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if (child instanceof Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for (const key in child.material) {
          if (typeof child.material[key] === "object") {
            const value = child.material[key]

            // Test if there is a dispose function
            if (value && typeof value.dispose === "function") {
              value.dispose()
            }
          }
        }
      }
    })
    this.scene.clear()
    this.camera.clear()
    this.canvas.remove()
  }

  reCalculate() {
    const bounds = this.element.getBoundingClientRect()
    this.bounds = bounds
    this.innerHeight = bounds.height
    this.innerWidth = bounds.width
    this.camera.aspect = this.innerWidth / this.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    this.renderer.setSize(this.innerWidth, this.innerHeight)
    this.fov = this.camera.fov * (Math.PI / 180)
    const height = 2 * Math.tan(this.fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { height, width }
  }

  createRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true, canvas: this.element })
    // this.renderer.physicallyCorrectLights = true
    this.renderer.outputColorSpace = "srgb"
    this.renderer.toneMapping = CineonToneMapping
    this.renderer.toneMappingExposure = 1.75
    this.renderer.setClearColor("#eaecee", 0.0)
    this.renderer.setSize(this.innerWidth, this.innerHeight)
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  }

  createScene() {
    const scene = new Scene()
    this.scene = scene
    const ambientLight = new AmbientLight(0xc0d0ec, 0.5)
    scene.add(ambientLight)
    // ambientLight.castShadow = true
    this.light1 = new PointLight(0x777777, 35000)
    // this.light1.castShadow = true
    scene.add(this.light1)
    this.light1.position.set(0, -0.5, 17.5)
  }

  createCamera() {
    this.camera = new PerspectiveCamera(
      35,
      this.innerWidth / this.innerHeight,
      4,
      100
    )
    this.scene.add(this.camera)
    this.camera.position.z = 5
    this.camera.position.y = -0.75
  }
}
