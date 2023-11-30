# Mi

Real-DOM diff + tagged template string. Local state free. 933 bytes **uncompressed**.

Try it out on [JS Bin](https://jsbin.com/bazopiv/edit?html,js,output).

## Install

```html
<script src="https://cdn.jsdelivr.net/gh/audinue/mi@1.0.0/mi.min.js"></script>
```

## Usage
```html
<div id="app"></div>
<script>
  const { html, mount } = Mi

  let count = 0
  
  mount(
    () => html`
      <button onclick=${() => count++}>${count}</button>
    `,
    app
  )
</script>
```

## Reference

- `html(string, ...values)` Mi-specific tagged template string
- `mount(component, container)` Mounts component
- `render()` Render mounted components due to side effects

Side effect example:

```js
const { html, mount, render } = Mi

let count = 0

setInterval(() => {
  count++
  render()
}, 1000)

mount(
  () => html`
    <p>Count: ${count}</p>
  `,
  app
)
```
