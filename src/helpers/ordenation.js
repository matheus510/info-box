function ordenation (vm) {
  const idNoticiaAtual = vm.parametros.idNoticia
  const posicaoNoticiaAtual = vm.parametros.idsNoticiasBook.indexOf(noticiaAtual)
  const idNoticiaAnterior = vm.parametros.idsNoticiasBook[posicaoNoticiaAtual - 1] ? vm.parametros.idsNoticiasBook[posicaoNoticiaAtual - 1] : 0
  const idNoticiaPosterior = vm.parametros.idsNoticiasBook[posicaoNoticiaAtual - 1] ? vm.parametros.idsNoticiasBook[posicaoNoticiaAtual - 1] : 0

  return {
    idNoticiaAnterior,
    idNoticiaPosterior
  }
}

export default {
  ordenation
}