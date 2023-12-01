{
  let renders = []
  let handlers = []
  let request

  let render = () =>
    cancelAnimationFrame(request) || (request = requestAnimationFrame(
      () => (handlers = []) && renders.map(render => render())
    ))

  window.Mi = {
    render,
    html: (strings, ...values) =>
      values.reduce(
        (string, value, index) =>
          `${string}${
            typeof value === 'function'
              ? `Mi._(this,event,${(handlers = [...handlers, value]).length})`
              : Array.isArray(value)
                ? value.join('')
                : value === null || value === false
                  ? ''
                  : value
          }${strings[index + 1]}`,
        strings[0]
      ),
    mount: (
      component,
      container,
      _render = (
        next = container.cloneNode(),
        patch = (
          curr,
          next,
          _curr,
          _next
        ) =>
          curr.isEqualNode(next)
          || curr.nodeName !== next.nodeName && (curr.replaceWith(next), 1)
          || curr.nodeType === 3 && curr.data !== next.data && (curr.data = next.data)
          || curr.nodeType === 1 && (
            [...next.attributes].map(
              ({ name, value }) => curr.getAttribute(name) !== value && curr.setAttribute(name, value)
            ),
            [...curr.attributes].map(
              ({ name }) => !next.hasAttribute(name) && curr.removeAttribute(name)
            ),
            ['checked', 'value'].map(name => curr[name] !== next[name] && (curr[name] = next[name])),
            curr.append(
              ...(_next = [...next.childNodes])
                .slice((_curr = [...curr.childNodes]).length)
            ),
            _curr
              .slice(_next.length)
              .map(child => child.remove()),
            _curr
              .slice(0, Math.min(_curr.length, _next.length))
              .map((child, i) => patch(child, _next[i]))
          )
      ) => (next.innerHTML = component()) && patch(container, next)
    ) => renders.push(_render) && _render(),
    _: (element, event, index) => (
      handlers[index - 1].call(element, event),
      render()
    )
  }
}