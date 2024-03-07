   // Aqui é o ponto de entrada do código, onde esperamos que a página esteja totalmente carregada.
document.addEventListener('DOMContentLoaded', function() {

  // Obtendo referências para os elementos do HTML usando seus IDs
  const selecionarRaca = document.getElementById('selecao-raca');
  const botaoBuscar = document.getElementById('btn-buscar');
  const containerGaleria = document.getElementById('container-galeria');
  const galeria = document.getElementById('galeria');
  const botaoAnterior = document.getElementById('btn-anterior');
  const botaoProximo = document.getElementById('btn-proximo');
  const botaoSalvar = document.getElementById('btn-salvar');
  const botaoLimparLista = document.getElementById('btn-limpar-lista');
  const mensagem = document.getElementById('mensagem');
  const listaCachorros = document.getElementById('lista-cachorros');

  // Variáveis para armazenar as imagens e o índice da imagem atual
  let imagensRaca = [];
  let indiceImagemAtual = 0;

  // Função para buscar as imagens da raça selecionada
  function buscarImagensRaca() {
    // Obtendo a raça selecionada  
    const raca = selecionarRaca.value;

    // Construindo a URL da API para buscar as imagens da raça selecionada
    const apiUrl = `https://dog.ceo/api/breed/${raca}/images`;

    // Fazendo uma requisição AJAX para a URL da API
    fetch(apiUrl)
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(data => {
        if (data.status === 'success') {
          // Se a resposta for bem-sucedida, armazena as imagens e exibe a primeira imagem
          imagensRaca = data.message;
          exibirImagem(indiceImagemAtual);
          mensagem.textContent = '';
        } else {
          // Caso contrário, exibe uma mensagem de falha
          mensagem.textContent = 'Falha ao carregar as imagens. Tente novamente.';
        }
      })
      .catch(error => {
        // Tratando erros de requisição e exibindo uma mensagem de erro
        mensagem.textContent = 'Ocorreu um erro na requisição. Verifique sua conexão e tente novamente.';
        console.error(error);
      });
  }

  // Função para exibir a imagem atual
  function exibirImagem(indice) {
    // Limpa o conteúdo atual da galeria
    galeria.innerHTML = '';

    // Cria um elemento de imagem
    const img = document.createElement('img');

    // Define a URL da imagem como a imagem correspondente ao índice atual
    img.src = imagensRaca[indice];

    // Adiciona a imagem à galeria
    galeria.appendChild(img);
  }

  // Função para exibir a imagem anterior
  function exibirImagemAnterior() {
    // Atualiza o índice da imagem atual para exibir a imagem anterior
    indiceImagemAtual = (indiceImagemAtual - 1 + imagensRaca.length) % imagensRaca.length;
    exibirImagem(indiceImagemAtual);
  }

  // Função para exibir a próxima imagem
  function exibirProximaImagem() {
    // Atualiza o índice da imagem atual para exibir a próxima imagem
    indiceImagemAtual = (indiceImagemAtual + 1) % imagensRaca.length;
    exibirImagem(indiceImagemAtual);
  }

  // Função para salvar a imagem atual
  function salvarImagem() {
    // Obtendo a raça selecionada e a imagem atual
    const racaSelecionada = selecionarRaca.value;
    const imagemSelecionada = imagensRaca[indiceImagemAtual];

    // Verifica se uma imagem está selecionada
    if (imagemSelecionada) {
      // Se sim, armazena a imagem e a raça selecionadas
      const imagemASalvar = imagemSelecionada;
      const racaASalvar = racaSelecionada;

      try {
        // Obtendo os dados salvos no armazenamento local (localStorage)
        const dadosSalvos = localStorage.getItem('cachorrosSalvos');
        const cachorrosSalvos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

        // Adicionando a nova imagem e raça aos dados salvos
        cachorrosSalvos.push({ raca: racaASalvar, imagem: imagemASalvar });

        // Salvando os dados atualizados no armazenamento local
        localStorage.setItem('cachorrosSalvos', JSON.stringify(cachorrosSalvos));

        // Exibe uma mensagem de sucesso e limpa a seleção
        mensagem.textContent = 'Imagem salva com sucesso!';
        limparSelecao();

        // Exibe os cachorros salvos
        exibirCachorrosSalvos();
      } catch (error) {
        // Tratando erros ao salvar a imagem e exibindo uma mensagem de erro
        mensagem.textContent = 'Falha ao salvar a imagem. Tente novamente.';
        console.error(error);
      }
    } else {
      // Se nenhuma imagem estiver selecionada, exibe uma mensagem informando isso
      mensagem.textContent = 'Nenhuma imagem selecionada.';
    }
  }

  // Função para limpar a seleção e reiniciar as variáveis relacionadas às imagens
  function limparSelecao() {
    selecionarRaca.value = '';
    imagensRaca = [];
    indiceImagemAtual = 0;
    galeria.innerHTML = '';
  }

  // Função para exibir a lista de cachorros salvos
  function exibirCachorrosSalvos() {
    // Limpa a lista atual de cachorros salvos
    listaCachorros.innerHTML = '';

    try {
      // Obtendo os dados salvos no armazenamento local (localStorage)
      const dadosSalvos = localStorage.getItem('cachorrosSalvos');
      const cachorrosSalvos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      // Invertendo a ordem dos cachorros salvos para exibir os mais recentes primeiro
      cachorrosSalvos.reverse();

      // Percorrendo cada cachorro salvo
      cachorrosSalvos.forEach(cachorro => {
        // Criando um cartão para exibir cada cachorro salvo
        const card = document.createElement('div');
        card.className = 'cartao-cachorro';

        // Criando uma imagem para exibir a imagem do cachorro salvo
        const img = document.createElement('img');
        img.src = cachorro.imagem;
        img.alt = cachorro.raca;
        img.title = cachorro.raca;
        img.width = 100;
        img.height = 100;

        // Criando um botão de remover para cada cachorro salvo
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';

        // Adicionando um evento de clique ao botão de remover para remover o cachorro do armazenamento local
        botaoRemover.addEventListener('click', function() {
          removerCachorroDoLocalStorage(cachorro);
          exibirCachorrosSalvos();
        });

        // Adicionando a imagem e o botão de remover ao cartão do cachorro
        card.appendChild(img);
        card.appendChild(botaoRemover);

        // Adicionando o cartão do cachorro à lista de cachorros
        listaCachorros.appendChild(card);
      });
    } catch (error) {
      // Tratando erros ao exibir os cachorros salvos e exibindo uma mensagem de erro
      console.error(error);
    }
  }

  // Função para remover um cachorro do armazenamento local
  function removerCachorroDoLocalStorage(cachorro) {
    try {
      // Obtendo os dados salvos no armazenamento local (localStorage)
      const dadosSalvos = localStorage.getItem('cachorrosSalvos');
      const cachorrosSalvos = dadosSalvos ? JSON.parse(dadosSalvos) : [];

      // Filtrando os cachorros salvos para remover o cachorro selecionado
      const cachorrosAtualizados = cachorrosSalvos.filter(cachorroSalvo => cachorroSalvo.imagem !== cachorro.imagem);

      // Salvando os cachorros atualizados no armazenamento local
      localStorage.setItem('cachorrosSalvos', JSON.stringify(cachorrosAtualizados));
    } catch (error) {
      // Tratando erros ao remover o cachorro do armazenamento local e exibindo uma mensagem de erro
      console.error(error);
    }
  }

  // Função para limpar a lista de cachorros salvos no armazenamento local
  function limparListaDeCachorros() {
    try {
      // Removendo os dados salvos no armazenamento local
      localStorage.removeItem('cachorrosSalvos');
      exibirCachorrosSalvos();
    } catch (error) {
      // Tratando erros ao limpar a lista de cachorros salvos e exibindo uma mensagem de erro
      console.error(error);
    }
  }

  // Adicionando um evento de clique ao botão "Reproduzir Vídeo"
  const botaoReproduzirVideo = document.getElementById('btn-reproduzir-video');
  botaoReproduzirVideo.addEventListener('click', function() {
    // Criando um modal para reproduzir o vídeo
    const containerVideo = document.createElement('div');
    containerVideo.className = 'modal-video';

    // Criando um iframe para exibir o vídeo do YouTube
    const iframeVideo = document.createElement('iframe');
    iframeVideo.src = 'https://www.youtube.com/embed/GxT3fekwsk8?autoplay=1';
    iframeVideo.width = '1300px';
    iframeVideo.height = '800px';
    iframeVideo.frameBorder = '20';
    iframeVideo.allowFullscreen = true;

    // Adicionando o iframe ao modal
    containerVideo.appendChild(iframeVideo);
    document.body.appendChild(containerVideo);

    // Adicionando um evento de clique ao modal para fechá-lo ao clicar fora do vídeo
    containerVideo.addEventListener('click', function(event) {
      if (event.target === containerVideo) {
        containerVideo.remove();
      }
    });
  });

  // Adicionando eventos de clique aos botões de busca, anterior, próximo, salvar e limpar lista
  botaoBuscar.addEventListener('click', buscarImagensRaca);
  botaoAnterior.addEventListener('click', exibirImagemAnterior);
  botaoProximo.addEventListener('click', exibirProximaImagem);
  botaoSalvar.addEventListener('click', salvarImagem);
  botaoLimparLista.addEventListener('click', limparListaDeCachorros);

  // Exibindo os cachorros salvos ao carregar a página
  exibirCachorrosSalvos();
});
