describe('Cadastro de usuário com email e checkbox', () => {
  it('Deve preencher o email, marcar a checkbox de consentimento, clicar em cadastrar e validar na API', () => {

    // Defina o e-mail como variável
    const nome = 'Evlin Tavares';  // Nome do usuário
    const email = 'evlintavares5@gmail.com';  // E-mail do usuário
    const password = 'qwerty123';  // Senha do usuário

    // Realiza o cadastro via API
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',  // URL da API para cadastrar o usuário
      body: {
        nome: nome,
        email: email,
        password: password,
        administrador: false  // Assumindo que "administrador" é um campo obrigatório
      }
    }).then((response) => {
      // Verifica se a resposta da API foi bem-sucedida (status 201 - Created)
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('nome', nome);  // Verifica se o nome está correto
      expect(response.body).to.have.property('email', email);  // Verifica se o e-mail está correto
    });

    // Acessa a página de cadastro
    cy.visit('https://front.serverest.dev/login'); 

    // Clicar no link para acessar a página de cadastro
    cy.get('.btn.btn-link').click(); // Seletor correto para acessar a página de cadastro

    // Preencher o formulário de cadastro com dados válidos
    cy.get('#nome').type(nome); // Preenche o campo nome com id "nome"
    cy.get('#email').type(email); // Preenche o campo email com a variável "email"
    cy.get('#password').type(password); // Preenche o campo senha com id "password"

    // Clica no label associado à checkbox para marcá-la
    cy.get('.form-check-label').click(); // Clica no label que é associado ao checkbox

    // Verifica se o botão de cadastrar está visível e habilitado antes de clicar
    cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled'); // Verifica se o botão está visível e habilitado

    // Submete o formulário de cadastro clicando no botão de "Cadastrar"
    cy.get('button[type="submit"]').click(); // Aqui você clica no botão de cadastrar (submit)

    // Valida o cadastro via API após o cadastro na UI
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/usuarios',  // Endpoint para listar todos os usuários
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('Servicerest/userToken')  // Passando o token no cabeçalho (se necessário)
      }
    }).then((response) => {
      // Verifica se a resposta foi bem-sucedida
      expect(response.status).to.eq(200);

      // Verifica se o usuário cadastrado está na lista de usuários
      const createdUser = response.body.find(user => user.email === email);
      expect(createdUser).to.exist;  // O usuário deve existir na resposta da API
      expect(createdUser.nome).to.eq(nome);  // Verifica se o nome é o correto
      expect(createdUser.email).to.eq(email);  // Verifica se o email é o correto
    });
  });
});
