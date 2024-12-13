describe('Pesquisa por Produto', () => {
  
  let token; // Variável para armazenar o token de autenticação
  
  // Executa antes de cada teste
  beforeEach(() => {
    // Realiza a requisição POST para login
    cy.request('POST', 'https://serverest.dev/login', {
      "email": "fulano@qa.com",  // Email do usuário
      "password": "teste"        // Senha do usuário
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
  
  // Teste para buscar o produto "Televisão - Samsung 4K UHD 50"
  it('Deve retornar o produto "Televisão - Samsung 4K UHD 50" com os dados corretos', () => {
    // Certifique-se de que o token foi configurado corretamente antes de realizar a requisição GET
    cy.window().then((window) => {
      const token = window.localStorage.getItem('Servicerest/userToken');
      expect(token).to.exist;  // Verifica se o token está armazenado no localStorage
    
      // Realiza a requisição GET para verificar os produtos, passando o token no cabeçalho Authorization
      cy.request({
        method: 'GET',
        url: 'https://front.serverest.dev/admin/listarprodutos',  // URL para listar os produtos (ajustada)
        headers: {
          'Authorization': `Bearer ${token}`  // Usando o token no cabeçalho Authorization
        }
      }).then((response) => {
        // Verifica se a resposta foi bem-sucedida (status 200)
        expect(response.status).to.eq(200);
    
        // Verifica se a resposta contém a lista de produtos
        expect(response.body).to.have.property('produtos');
        expect(response.body.produtos).to.be.an('array').that.is.not.empty;
    
        // Busca pelo produto "Televisão - Samsung 4K UHD 50" na resposta
        const produto = response.body.produtos.find(p => p.nome === "Televisão - Samsung 4K UHD 50'' - 1734033110689");
        
        // Verifica se o produto foi encontrado e se os dados estão corretos
        expect(produto).to.exist;
        expect(produto.nome).to.eq("Televisão - Samsung 4K UHD 50'' - 1734033110689");
        expect(produto.preco).to.eq(2599);
        expect(produto.descricao).to.eq("Conheça mais sobre a TV Samsung 4K UHD, com tela de 50 polegadas e imagem ultradefinida.");
        expect(produto.quantidade).to.eq(70); // Ajuste a quantidade conforme esperado
      });
    });
  });

});
