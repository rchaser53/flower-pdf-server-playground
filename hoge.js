const fs = require('fs')
const parse5 = require('parse5');

const htmlString = fs.readFileSync('./test.html', { encoding: 'utf8' })
// const htmlString = '<body>Hi there!</body>'
const document = parse5.parse(htmlString)

const getTarget = (targetNode, key, retArray) => {
  targetNode.childNodes.forEach((node) => {
    if (node.tagName === key) {
      retArray.push(node)
    } else if (!!node.childNodes && 0 < node.childNodes.length) {
      getTarget(node, key, retArray)
    }
  })
  return retArray
}

getTarget(document, 'script', []).forEach((elem) => {
  elem.attrs.forEach((attr) => {
    if (attr.name === 'src') {
      attr.value = `gyan/${attr.value}`
    }
  })
})

console.log(
  parse5.serialize(document)
)