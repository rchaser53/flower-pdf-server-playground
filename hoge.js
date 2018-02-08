const fs = require('fs')
const parse5 = require('parse5');

const htmlString = '<body>Hi there!</body>'
const document = parse5.parse(htmlString);

document.childNodes.forEach((child) => {
  child.childNodes.forEach((mago) => {
    mago.childNodes.forEach((himago) => {
      himago.value = 'nya-n'
    })
  })
})

console.log(
  parse5.serialize(document)
)

