class Validacao {

  ValidarEmail(email){
		const usuario = email.substring(0, email.indexOf("@"));
		const dominio = email.substring(email.indexOf("@")+ 1, email.length);
    if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@")==-1) &&
      (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) &&
      (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) &&
      (dominio.indexOf(".") >=1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
				return false
    }else{
			return {erro: 'Email Inválido'}
		}
  }

  ValidarDados(user){
    if(!user.password)
      return {erro: 'Insira uma Senha!'}
    if(!user.email) 
      return {erro: 'Insira um Email!'}
    if(!user.name) 
      return {erro: 'Insira um Nome!'}
    return false
  }

  ValidacaoGeral(user){
    const resValidacaoDados = this.ValidarDados(user)
    if(resValidacaoDados)
      return resValidacaoDados
    const resEmail = this.ValidarEmail(user.email)
    if(resEmail)
      return resEmail
    return true
  }
}

module.exports = new Validacao()