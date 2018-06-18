function highlight (conteudo, terms) {
  let newStr = ''
  debugger
  if(terms && terms.length) {
    terms.sort(function(a, b) {
      return b.length - a.length
  })
  let regex = new RegExp('\\s(' + terms.join('|').replace(/[-[\]{}()*+?.,\\/^$#\s]/g, '\\$&') + ')\\b', 'gmi')
  let regex2   = new RegExp('\\b(' + terms.join('|').replace(/[-[\]{}()*+?.,\\/^$#\s]/g, '\\$&') + ')\\b', 'gmi')

  newStr = conteudo.replace(regex, '<mark>$&</mark>')
  newStr = newStr.replace(regex2, '<mark>$&</mark>')
  }
  return newStr
}
export default highlight