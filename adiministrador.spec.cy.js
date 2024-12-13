describe('Cadastro de usuário com email e checkbox', () => {
    it('Deve preencher o email, marcar a checkbox de consentimento e clicar em cadastrar', () => {
  
      // Defina o e-mail como variável
      const email = 'evlintavares5@gmail.com'; // Altere este valor para o e-mail desejado
  
      // Acessa a página de cadastro
      cy.visit('https://front.serverest.dev/login'); 
  
      // Clicar no link para acessar a página de cadastro
      cy.get('.btn.btn-link').click(); // Seletor correto para acessar a página de cadastro
  
      // Preencher o formulário de cadastro com dados válidos
      cy.get('#nome').type('tavares'); // Preenche o campo nome com id "nome"
      cy.get('#email').type(email); // Preenche o campo email com a variável "email"
      cy.get('#password').type('qwerty123'); // Preenche o campo senha com id "password"
  
      // Clica no label associado à checkbox para marcá-la
      cy.get('.form-check-label').click(); // Clica no label que é associado ao checkbox
  
      // Verifica se o botão de cadastrar está visível e habilitado antes de clicar
      cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled'); // Verifica se o botão está visível e habilitado
  
      // Submete o formulário de cadastro clicando no botão de "Cadastrar"
      cy.get('button[type="submit"]').click(); // Aqui você clica no botão de cadastrar (submit)
    });
  });
  