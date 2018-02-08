const fs = require('fs')
const parse5 = require('parse5');

const addHost = 'http://localhost:3100/cdn/v_01/'

const htmlString = fs.readFileSync('./tartget.html', { encoding: 'utf8' })
const document = parse5.parse(htmlString)

const getTarget = (targetNode, key, retArray = []) => {
  targetNode.childNodes.forEach((node) => {
    if (node.tagName === key) {
      retArray.push(node)
    } else if (!!node.childNodes && 0 < node.childNodes.length) {
      getTarget(node, key, retArray)
    }
  })
  return retArray
}

// replace script tags src attribute
getTarget(document, 'script', []).forEach((elem) => {
  elem.attrs.forEach((attr) => {
    if (attr.name === 'src' && attr.value !== 'js/flowpaper.js') {
      attr.value = `${addHost}${attr.value}`
    }
  })

  // convert object value's path
  elem.childNodes.forEach((elem) => {
    if (!!elem.nodeName && elem.nodeName === '#text') {
      elem.value = elem.value.replace(/docs\//g, `${addHost}docs/`)
    }
  })
})

// replace css tags src attribute
getTarget(document, 'link', []).forEach((elem) => {
  elem.attrs.forEach((attr) => {
    if (attr.name === 'href') {
      attr.value = `${addHost}${attr.value}`
    }
  })
})

// replace meta tag content attribute
getTarget(document, 'meta', []).filter((elem) => {
  return elem.attrs.some((attr) => {
    return attr.name === 'property' && attr.value === 'og:image'
  })
}).forEach((elem) => {
  elem.attrs.forEach((attr) => {
    if (attr.name === 'content') {
      attr.value = `${addHost}${attr.value}`
    }
  })
})

fs.writeFileSync('./index.html', parse5.serialize(document))