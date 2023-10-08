import { createVNode, render } from 'vue'

export default function renderComponent({ el, component, props }) {
  let vnode = createVNode(component, props)
  render(vnode, el)

  return () => {
    // destroy component
    render(null, el)
    vnode = undefined
  }
}
