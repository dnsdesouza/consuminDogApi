document.addEventListener('DOMContentLoaded', function() {
    // Aqui é o ponto de entrada do código, onde esperamos que a página esteja totalmente carregada.
    // É usado o evento 'DOMContentLoaded' para garantir que todos os elementos da página estejam disponíveis para manipulação.
  
    // Aqui são feitas as seleções dos elementos do DOM que serão utilizados ao longo do código.
    const breedSelect = document.getElementById('breed-select');
    const searchBtn = document.getElementById('search-btn');
    const galleryContainer = document.getElementById('gallery-container');
    const gallery = document.getElementById('gallery');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const saveBtn = document.getElementById('save-btn');
    const clearListBtn = document.getElementById('clear-list-btn');
    const message = document.getElementById('message');
    const dogList = document.getElementById('dog-list');
  
    let breedImages = [];
    let currentImageIndex = 0;
  
    // Função para fazer a requisição à API e retornar as imagens da raça selecionada
    function fetchBreedImages() {
      // Obtém o valor da raça selecionada no elemento select
      const breed = breedSelect.value;
      const apiUrl = `https://dog.ceo/api/breed/${breed}/images`;
  
      // Faz uma requisição à API utilizando o valor da raça selecionada
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Verifica se a resposta da API é bem-sucedida
          if (data.status === 'success') {
            breedImages = data.message;
            showImage(currentImageIndex);
            message.textContent = '';
          } else {
            message.textContent = 'Falha ao carregar as imagens. Tente novamente.';
          }
        })
        .catch(error => {
          message.textContent = 'Ocorreu um erro na requisição. Verifique sua conexão e tente novamente.';
          console.error(error);
        });
    }
  
    // Função para exibir a imagem atual
    function showImage(index) {
      gallery.innerHTML = '';
      const img = document.createElement('img');
      img.src = breedImages[index];
      gallery.appendChild(img);
    }
  
    // Função para exibir a imagem anterior
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + breedImages.length) % breedImages.length;
      showImage(currentImageIndex);
    }
  
    // Função para exibir a próxima imagem
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % breedImages.length;
      showImage(currentImageIndex);
    }
  



Essa função é usada em um programa que permite escolher uma raça de cachorro e salvar uma imagem dessa raça.
 Vamos ver como funciona passo a passo:

Primeiro, o programa verifica qual raça de cachorro foi selecionada.
 Por exemplo, imagine que a pessoa tenha escolhido a raça "Labrador ".

Em seguida, o programa verifica qual é a imagem atualmente mostrada na tela para essa raça. 
Vamos imaginar que a imagem atual seja uma foto de um labrador.
O programa verifica se uma imagem foi selecionada. Isso significa que ele verifica se existe uma imagem para ser salva. 
Se não houver uma imagem selecionada, ele mostra uma mensagem dizendo "Nenhuma imagem selecionada".


Caso haja uma imagem selecionada, o programa armazena a imagem e a raça selecionadas. 
Nesse exemplo, ele guarda a foto do labrador e a raça "Labrador ".
Em seguida, o programa verifica se já existem outras imagens de cachorros salvas anteriormente. 
Se existirem, ele pega essas informações salvas e as coloca em uma lista.


Depois disso, o programa adiciona a nova imagem e raça à lista de cachorros salvos.
A lista atualizada é então armazenada novamente para que as informações sejam salvas para uso futuro.
O programa mostra uma mensagem na tela dizendo "Imagem salva com sucesso!" 

Depois de salvar a imagem, o programa limpa a seleção, ou seja, 
ele limpa as informações da raça e imagem selecionadas para que uma nova escolha possa ser feita


Por fim, o programa exibe todas as imagens de cachorros que foram salvas, 
para que a pessoa possa ver todas as fotos de cachorros que ela salvou até o momento.
