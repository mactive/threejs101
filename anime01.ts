import { animate, utils, createDraggable, createSpring} from 'animejs'

const [$logo] = utils.$('.logo.js')
const [$button] = utils.$('button')
let rotations = 0

animate('.logo.js', {
  scale: [
    { to: 1.25, ease: 'inOut(3)', duration: 200},
    { to: 1, ease: createSpring({ stiffness: 100, damping: 10 })}
  ],
  loop: true,
  loopDelay: 250,
})

createDraggable('.logo.js', {
  container: [0, 0, 0, 0],
  releaseEase: createSpring({ stiffness: 100 }),
})

const rotateLogo = () => {
  rotations++;
  $button.textContent = `rotations: ${rotations}`
  animate($logo, {
    rotate: 360 * rotations,
    duration: 1500,
    ease: 'out(4)',
  })
}

$button.addEventListener('click', rotateLogo)








const drag = createDraggable($logo)
const spring = createSpring()

animate({
  targets: '.logo',
  rotate: 360,
  duration: 1000,
  easing: 'easeInOutSine',
})