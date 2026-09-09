
// Pega todos os botões de filtro (todos os <button> com classe 'filtro-btn')
const botoesFiltro = document.querySelectorAll('.filtro-btn');

// Pega todos os itens da galeria (cada filme)
const itensGaleria = document.querySelectorAll('.galeria-item');

// Pega o elemento que mostra o contador de filmes
const contadorFilmes = document.getElementById('contadorFilmes');

// Guarda qual categoria está ativa (começa com 'todos')
let categoriaAtiva = 'todos';

// ============================================
// FUNÇÃO PARA FILTRAR FILMES
// ============================================

// Essa função é chamada quando o usuário clica em um botão
function filtrarFilmes(categoria) {
    categoriaAtiva = categoria; // Atualiza a categoria ativa
    let filmesVisiveis = 0; // Contador de filmes que vão aparecer

    // Percorre cada filme da galeria
    itensGaleria.forEach(item => {
        // Pega a categoria que está no atributo 'data-categoria' do filme
        const categoriaItem = item.dataset.categoria;
        
        // Remove as classes de visibilidade que podem ter sido aplicadas antes
        item.classList.remove('visivel', 'oculto');
        
        // Verifica se o filme pertence à categoria selecionada
        // Se for 'todos' ou se a categoria do filme for igual à selecionada
        if (categoria === 'todos' || categoriaItem === categoria) {
            item.classList.add('visivel'); // Mostra o filme
            filmesVisiveis++; // Aumenta o contador
            
            // Adiciona um pequeno atraso para cada filme aparecer em sequência (efeito cascata)
            item.style.animationDelay = `${(filmesVisiveis - 1) * 0.05}s`;
        } else {
            item.classList.add('oculto'); // Esconde o filme
        }
    });

    // Atualiza o contador na tela
    atualizarContador(categoria, filmesVisiveis);
}

// ============================================
// FUNÇÃO PARA ATUALIZAR O CONTADOR
// ============================================

// Essa função atualiza o texto que mostra quantos filmes estão visíveis
function atualizarContador(categoria, visiveis) {
    const total = itensGaleria.length; // Total de filmes (10)
    
    if (categoria === 'todos') {
        // Se está mostrando todos, mostra o total
        contadorFilmes.textContent = `🎬 ${total} filmes disponíveis`;
    } else {
        // Se está filtrado, mostra quantos filmes daquela categoria
        const nomeCategoria = {
            'acao': 'Ação',
            'terror': 'Terror',
            'ficcao': 'Ficção',
            'drama': 'Drama',
            'animacao': 'Animação'
        };
        contadorFilmes.textContent = `🎯 ${visiveis} filme(s) de ${nomeCategoria[categoria]}`;
    }
}

// ============================================
// EVENTO DE CLIQUE NOS BOTÕES
// ============================================

// Para cada botão de filtro, adiciona um 'ouvinte' de clique
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', function() {
        // Tira o destaque
        botoesFiltro.forEach(btn => btn.classList.remove('active'));
        
        // Destaca o botão 
        this.classList.add('active');
        
        // Pega a categoria que está no atributo 'data-categoria' do botão
        const categoria = this.dataset.categoria;
        
        // Chama a função que filtra os filmes
        filtrarFilmes(categoria);
    });
});