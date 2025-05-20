document.addEventListener('DOMContentLoaded', function() {
    // Dados organizados por categorias
    const videoData = {
        aulas: [
            {
                id: 1,
                title: "O que são os colégios cívico-militares?",
                description: "As escolas cívico-militares do Paraná fazem parte de um modelo de gestão escolar que une a administração pedagógica de educadores civis com a participação de militares da Polícia Militar ou do Corpo de Bombeiros na organização e disciplina. Esse formato busca combinar o ensino tradicional com uma estrutura mais rígida, baseada em valores como hierarquia, ordem e civismo.",
                author: "Secretaria da Educação do Paraná",
                url: "https://www.youtube.com/embed/OXS5ZTVHdYY",
                thumbnail: "./img/thumbs/thumb_civicomilitar.png",
                downloads: [
                    { 
                        name: "Guia de padronização da atividades", 
                        url: "https://drive.google.com/file/d/1SgHfhjc2rW-oJzJxbKcXHavsKPkjTlt3/view?usp=sharing",
                        icon: "file-pdf" 
                    },
                    { 
                        name: "Manual dos Colégios Cívico-Militares", 
                        url: "https://drive.google.com/file/d/1fVt_PaPW-81y0cILN6-BQewyhRfuYSuA/view?usp=sharing",
                        icon: "file-pdf" 
                    },
                    { 
                        name: "Guia de uso do brasão - CCMPR", 
                        url: "https://drive.google.com/file/d/1mdQmbyuIOghZyJYYD87sLbTtSCaaOF5b/view?usp=sharing",
                        icon: "file-pdf" 
                    }
                ]
            },
            {
                id: 2,
                title: "Hino Nacional Brasileiro",
                description: "Hino Nacional Brasileiro em sua versão completa com letra e melodia oficiais.",
                author: "Banda do Exército Brasileiro",
                url: "https://www.youtube.com/embed/Z7pFwsX6UVc",
                thumbnail: "./img/thumbs/thumb_hinonacional.png",
                downloads: []
            },
            {
                id: 3,
                title: "Hino da Independência do Brasil",
                description: "Hino composto por Dom Pedro I em 1822 para celebrar a independência do Brasil.",
                author: "Orquestra Sinfônica Brasileira",
                url: "https://www.youtube.com/embed/W-GCpz4I0CM",
                thumbnail: "./img/thumbs/thumb_hinoindependencia.png",
                downloads: []
            },
            {
                id: 4,
                title: "Hino à Bandeira do Brasil",
                description: "Hino em homenagem à bandeira nacional brasileira, símbolo máximo da pátria.",
                author: "Coral da PMPR",
                url: "https://www.youtube.com/embed/RzFtkbqqwxU",
                thumbnail: "./img/thumbs/thumb_hinobandeira.png",
                downloads: []
            },
            {
                id: 5,
                title: "Hino à Proclamação da República",
                description: "Hino que celebra a Proclamação da República do Brasil em 15 de novembro de 1889.",
                author: "Banda da Aeronáutica",
                url: "https://www.youtube.com/embed/PK-3bMS_M34",
                thumbnail: "./img/thumbs/thumb_hinoproclamacao.png",
                downloads: []
            },
            {
                id: 6,
                title: "Hino do Estado do Paraná",
                description: "Hino oficial do estado do Paraná, composto por Domingos Nascimento e Ciro Silva.",
                author: "Coral do Paraná",
                url: "https://www.youtube.com/embed/ulTZsnTI_JQ",
                thumbnail: "./img/thumbs/thumb_hinoparana.png",
                downloads: []
            },
        ]
    };

    // Elementos DOM
    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoAuthor = document.getElementById('videoAuthor');
    const videoDescription = document.getElementById('videoDescription');
    const downloadLinks = document.getElementById('downloadLinks');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const videoThumbnails = document.getElementById('videoThumbnails');
    const categories = document.querySelectorAll('.category');

    // Carrega os vídeos
    function loadVideoLists() {
        videoThumbnails.innerHTML = '';
        videoData.aulas.forEach(video => {
            createThumbnail(video);
        });
    }

    // Cria um elemento thumbnail com event listener
    function createThumbnail(video) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <h4>${video.title}</h4>
        `;
        thumbnail.addEventListener('click', () => playVideo(video));
        videoThumbnails.appendChild(thumbnail);
    }

    // Reproduz o vídeo selecionado
    function playVideo(video) {
        // Mostra estado de loading
        mainVideo.src = '';
        videoTitle.textContent = 'Carregando...';
        videoAuthor.textContent = '';
        videoDescription.textContent = '';
        downloadLinks.innerHTML = '<p class="no-downloads">Carregando materiais...</p>';
        
        // Simula um pequeno delay para melhor experiência
        setTimeout(() => {
            mainVideo.src = video.url;
            videoTitle.textContent = video.title;
            videoAuthor.textContent = `Por: ${video.author}`;
            videoDescription.textContent = video.description;
            
            // Atualiza os downloads
            updateDownloadLinks(video.downloads);
        }, 300);
    }

    // Atualiza os links de download
    function updateDownloadLinks(downloads) {
        if (downloads.length > 0) {
            downloadLinks.innerHTML = downloads.map(download => `
                <a href="${download.url}" class="download-link" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-${download.icon}"></i>
                    <span>${download.name}</span>
                </a>
            `).join('');
        } else {
            downloadLinks.innerHTML = '<p class="no-downloads">Nenhum material disponível para download.</p>';
        }
    }

    // Filtra vídeos
    function searchVideos() {
        const term = searchInput.value.toLowerCase().trim();
        
        if (term === '') {
            loadVideoLists();
            return;
        }
        
        const filtered = videoData.aulas.filter(video => 
            video.title.toLowerCase().includes(term) || 
            video.description.toLowerCase().includes(term) ||
            video.author.toLowerCase().includes(term)
        );
        
        videoThumbnails.innerHTML = '';
        
        if (filtered.length > 0) {
            filtered.forEach(video => {
                createThumbnail(video);
            });
        } else {
            videoThumbnails.innerHTML = '<p class="no-downloads">Nenhum vídeo encontrado com esse termo.</p>';
        }
    }

    // Event listeners
    searchBtn.addEventListener('click', searchVideos);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchVideos();
    });
    
    categories.forEach(category => {
        category.querySelector('.category-header').addEventListener('click', () => {
            category.classList.toggle('active');
        });
    });

    // Inicialização
    loadVideoLists();
    if (videoData.aulas.length > 0) playVideo(videoData.aulas[0]);

    // Adiciona evento para limpar pesquisa ao clicar no ícone X no input (quando estiver em navegadores modernos)
    searchInput.addEventListener('input', function() {
        if (this.value === '') {
            loadVideoLists();
        }
    });
});