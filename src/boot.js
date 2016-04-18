
const style = document.createElement('style')
style.innerText = require('./style/index.css')
document.getElementsByTagName('head')[0].appendChild(style)


document.getElementsByTagName('body')[0].innerHTML = require('html!./index.html')

require('file?name=index.html!./boot.html')

const script = document.createElement('script')
script.src = 'app.js'
document.getElementsByTagName('head')[0].appendChild(script)
