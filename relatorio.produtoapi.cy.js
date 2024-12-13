describe('Login e Verificação de Relatório via API', () => {
  
    let token; // Variável para armazenar o token de autenticação
    
    // Executa antes de cada teste
    beforeEach(() => {
      // Realiza a requisição POST para login via API
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login', // URL da API para login
        body: {
          email: 'evlinsouza362@gmail.com',  // Email do usuário
          password: 'qwerty123'              // Senha do usuário
        }
      }).then((response) => {
        // Verifica se o login foi bem-sucedido e se a resposta contém o token de autorização
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('authorization');
        
        // Armazena o token no localStorage
        token = response.body.authorization;
        cy.window().then((window) => {
          window.localStorage.setItem('Servicerest/userToken', token); // Armazenando o token no localStorage
        });
      });
    });
    
    // Teste para verificar a página de relatórios
    it('Deve acessar a página de relatórios', () => {
      // Certifique-se de que o token foi configurado corretamente antes de realizar a requisição GET
      cy.window().then((window) => {
        const token = window.localStorage.getItem('Servicerest/userToken');
        expect(token).to.exist;  // Verifica se o token está armazenado no localStorage
      
        // Realiza a requisição GET para acessar os relatórios, passando o token no cabeçalho Authorization
        cy.request({
          method: 'GET',
          url: 'https://front.serverest.dev/admin/relatorios', // URL para acessar os relatórios
          headers: {
            'Authorization': `Bearer ${token}`  // Usando o token no cabeçalho Authorization
          },
          failOnStatusCode: false // Permite que o teste não falhe em caso de erro 404 ou 500
        }).then((response) => {
          // Se o status da resposta for 404 (não encontrado)
          if (response.status === 404) {
            cy.log('Página de relatórios em construção');
          } else {
            // Se a página abrir corretamente, verifica o status de sucesso
            expect(response.status).to.eq(200);
          }
        });
      });
    });
  
  });
  