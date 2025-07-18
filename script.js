 const form = document.getElementById('form-user');
  const nomeInput = document.getElementById('nome');
  const sobrenomeInput = document.getElementById('sobrenome');
  const idadeInput = document.getElementById('idade');
  const emailInput = document.getElementById('email');
  const lista = document.getElementById('lista-usuarios');
  const apagarTodosBtn = document.getElementById('apagar-todos');

  let usuarios = [];

  // Carregar dados do localStorage ao iniciar
  function carregarUsuarios() {
    const dadosSalvos = localStorage.getItem('usuarios');
    if (dadosSalvos) {
      usuarios = JSON.parse(dadosSalvos);
      mostrarUsuarios();
    }
  }

  // Salvar no localStorage
  function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Mostrar usuários na tela
  function mostrarUsuarios() {
    lista.innerHTML = ''; // Limpa tudo

    if (usuarios.length === 0) {
      lista.innerHTML = '<p class="empty-message">Nenhum usuário cadastrado ainda.</p>';
      return;
    }

    usuarios.forEach((usuario, index) => {
      const div = document.createElement('div');
      div.classList.add('user-card');
      div.innerHTML = `
        <span><strong>Nome:</strong> ${usuario.nome} ${usuario.sobrenome}</span>
        <span><strong>Idade:</strong> ${usuario.idade}</span>
        <span><strong>Email:</strong> ${usuario.email}</span>
        <button class="delete-btn" data-index="${index}">🗑</button>
      `;

      // Adiciona o evento de deletar
      div.querySelector('.delete-btn').addEventListener('click', () => {
        apagarUsuario(index);
      });

      lista.appendChild(div);
    });
  }

  // Apagar um usuário específico
  function apagarUsuario(index) {
    usuarios.splice(index, 1);
    salvarUsuarios();
    mostrarUsuarios();
  }

  // Apagar todos os usuários
  apagarTodosBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja apagar todos os cadastros?')) {
      usuarios = [];
      salvarUsuarios();
      mostrarUsuarios();
    }
  });

  // Cadastrar novo usuário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const sobrenome = sobrenomeInput.value.trim();
    const idade = idadeInput.value.trim();
    const email = emailInput.value.trim();

    if (!nome || !sobrenome || !idade || !email) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novoUsuario = { nome, sobrenome, idade, email };
    usuarios.push(novoUsuario);

    salvarUsuarios();
    mostrarUsuarios();
    form.reset();
  });

  // Iniciar
  carregarUsuarios();
 