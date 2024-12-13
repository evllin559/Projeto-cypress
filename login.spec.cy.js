// Descreve o conjunto de testes relacionados ao login
// primeiro Teste E2E
describe('Usuários devem realizar o login ao acessar', () => {
  
    // Define um caso de teste específico, que neste caso é visitar a página de login
    it('Através da página de login', () => {
      
      // O comando cy.visit() acessa a URL da página de login
      cy.visit('https://front.serverest.dev/login');
      
        // Preencher o formulário de cadastro com dados válidos
        cy.get('#nome').type('Evlin Tavares'); // Preenche o campo nome com id "nome"
        cy.get('#email').type('evlinsouza362@gmail.com'); // Preenche o campo email com id "email" ,
        cy.get('#password').type('qwerty123'); // Preenche o campo senha com id "password"
       
    });
  });
  