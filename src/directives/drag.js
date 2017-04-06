let damp=100
export default {
    bind(el, binding) {
        downHandlers.set(el, function(e) {
            downHandler(el, e, binding)
        })

        upHandlers.set(el, function(e) {
            upHandler(el, e, binding)
        })

        el.addEventListener('mousedown', downHandlers.get(el))
        document.addEventListener('mouseup', upHandlers.get(el))
    },
    unbind(el, binding) {
        el.removeEventListener('mousedown', downHandlers.get(el))
        document.removeEventListener('mouseup', upHandlers.get(el))
    }
}

let downHandlers = new WeakMap()
let upHandlers = new WeakMap()
let moveHandlers = new WeakMap()
let clones = new WeakMap()

function downHandler(el, e) {

    el.dataset.originalY = el.offsetTop
    el.dataset.originalX = el.offsetLeft

    el.dataset.lastT = new Date().getTime()
    el.style.top = el.offsetTop
    el.style.left = el.offsetLeft
    el.style.pointerEvents = 'none'
    el.style.transition = 'top 0.1s, left 0.1s'
    e.preventDefault()

    el.dataset.held = true
    el.classList.add('v-drag-dragging')
    moveHandlers.set(el, function(e) {
        moveHandler(el, e)
    })
    document.addEventListener('mousemove', moveHandlers.get(el))
    el.style.position = 'relative'

    moveHandler(el, e)

    chaser(el) 
}

function upHandler(el, e, binding) {
    if (!el.dataset.held || el.dataset.held === 'false') return

    el.dataset.held = false
    el.classList.remove('v-drag-dragging')
    e.target.dispatchEvent(new CustomEvent('drop', {detail: binding.value}))

    el.style.position = null
    el.style.top = null
    el.style.left = null
    el.style.pointerEvents = null
    el.style.transform = null
    
    
    moveHandler(el, e)

    document.removeEventListener('mousemove', moveHandlers.get(el))
}

function moveHandler(el, e) {
    el.dataset.mouseX = e.clientX
    el.dataset.mouseY = e.clientY
}

function chaser(el) {

    if (!el.dataset.held || el.dataset.held === 'false') return

    let t = new Date().getTime()
    let delT = t - parseInt(el.dataset.lastT)
    el.dataset.lastT = t

    let influence = delT/damp
    if (influence>1) influence = 1

    let delX = parseInt(el.dataset.mouseX) - el.offsetLeft
    let delY = parseInt(el.dataset.mouseY) - el.offsetTop
    el.style.left = (parseInt(el.style.left)||0) + delX*influence + 'px'
    el.style.top  = (parseInt(el.style.top)||0) + delY*influence + 'px'

    let speed = Math.sqrt(delY**2 + delX**2)
    speed = Math.min(speed, 20)/20
    console.log(speed)
    let inverseSpeed = 1 - speed
    let spread = speed*5 + 1
    let darkness = inverseSpeed*0.2 + 0.3
    let scale = speed*0.2 + 1
    el.style.boxShadow = `0 2px ${spread}px rgba(0,0,0,${darkness})`
    el.style.transform =`rotate(${-1*delY/5}deg) scale(${scale})`
    setTimeout(chaser.bind(null, el), 40)
}