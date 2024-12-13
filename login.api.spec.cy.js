describe('template spec', () => {

  // Executa antes de cada teste
  beforeEach(() => {
    // Realiza a requisição POST para login
    cy.request('POST', 'https://serverest.dev/login', {
      "email": "fulano@qa.com",   // Email do usuário
      "password": "teste"         // Senha do usuário
    }).then((response) => {
      // Após o login bem-sucedido, armazena o token de autorização no localStorage
      window.localStorage.setItem('Servicerest/userToken', response.body.authorization);  
    });
  });

  // Teste específico
  it('passes', () => {
    // Visita a página inicial após o login
    cy.visit('https://front.serverest.dev/');
  });

});
