describe('Cadastro de novo usuário no front-end', () => {

    // Antes de cada teste, será visitada a página de login
    beforeEach(() => {
      cy.visit('https://front.serverest.dev/login'); 
    });
  
    it('Deve permitir o cadastro com dados válidos', () => {
      
      // Clicar no link para acessar a página de cadastro
      cy.get('.btn.btn-link').click();  // Seletor correto para o link de cadastro (ajuste conforme necessário)
      
      // Preencher o formulário de cadastro com dados válidos
      cy.get('#nome').type('Evlin Tavares'); // Preenche o campo nome com id "nome"
      cy.get('#email').type('evlinsouza362@gmail.com'); // Preenche o campo email com id "email" ,
      cy.get('#password').type('qwerty123'); // Preenche o campo senha com id "password"
     
      
      // Clicar no botão de cadastrar (submeter o formulário)
      cy.get('button[type="submit"]').click(); // Clica no botão de submit do formulário

        
    });
  
  });
  