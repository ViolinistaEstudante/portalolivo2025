document.addEventListener('DOMContentLoaded', function () {
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
        ],
        mat: [
            {
                id: 7,
                title: "Premiação - Matfic",
                description: "A premiação Matfic reconhece o desempenho e dedicação dos alunos nas atividades da plataforma Matific",
                author: "Profª Karol Isabelle",
                url: "https://www.youtube.com/embed/jDCdwRi9Ciw",
                thumbnail: "https://github.com/user-attachments/assets/6099228a-0613-4990-98ab-14003d9da884",
                downloads: []
            }
        ]
    }

    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoAuthor = document.getElementById('videoAuthor');
    const videoDescription = document.getElementById('videoDescription');
    const downloadLinks = document.getElementById('downloadLinks');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoriasContainer = document.getElementById('categoriasContainer');

    function loadVideoLists() {
        categoriasContainer.innerHTML = '';

        for (const categoria in videoData) {
            const categoriaNome = categoria === "aulas" ? "Colégios Cívico-Militares" :
                                  categoria === "mat" ? "Matemática" : 
                                  categoria === "port" ? "Português" : categoria;

            const categorySection = document.createElement('div');
            categorySection.className = 'category active';

            const header = document.createElement('div');
            header.className = 'category-header';
            header.innerHTML = `<h3>${categoriaNome}</h3><i class="fas fa-chevron-down"></i>`;
            header.addEventListener('click', () => {
                categorySection.classList.toggle('active');
            });

            const content = document.createElement('div');
            content.className = 'thumbnails horizontal-scroll';

            videoData[categoria].forEach(video => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail';
                thumbnail.innerHTML = `
                    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                    <h4>${video.title}</h4>
                `;
                thumbnail.addEventListener('click', () => playVideo(video));
                content.appendChild(thumbnail);
            });

            categorySection.appendChild(header);
            categorySection.appendChild(content);
            categoriasContainer.appendChild(categorySection);
        }
    }

    function playVideo(video) {
        mainVideo.src = '';
        videoTitle.textContent = 'Carregando...';
        videoAuthor.textContent = '';
        videoDescription.textContent = '';
        downloadLinks.innerHTML = '<p class="no-downloads">Carregando materiais...</p>';

        setTimeout(() => {
            mainVideo.src = video.url;
            videoTitle.textContent = video.title;
            videoAuthor.textContent = `Por: ${video.author}`;
            videoDescription.textContent = video.description;
            updateDownloadLinks(video.downloads);
        }, 300);
    }

    function updateDownloadLinks(downloads) {
        if (downloads.length > 0) {
            downloadLinks.innerHTML = downloads.map(d => `
                <a href="${d.url}" class="download-link" target="_blank">
                    <i class="fas fa-${d.icon}"></i> ${d.name}
                </a>
            `).join('');
        } else {
            downloadLinks.innerHTML = '<p class="no-downloads">Nenhum material disponível para download.</p>';
        }
    }

    function searchVideos() {
        const term = searchInput.value.toLowerCase().trim();
        categoriasContainer.innerHTML = '';

        if (term === '') {
            loadVideoLists();
            return;
        }

        for (const categoria in videoData) {
            const resultados = videoData[categoria].filter(video =>
                video.title.toLowerCase().includes(term) ||
                video.description.toLowerCase().includes(term) ||
                video.author.toLowerCase().includes(term)
            );

            if (resultados.length > 0) {
                const categorySection = document.createElement('div');
                categorySection.className = 'category active';

                const header = document.createElement('div');
                header.className = 'category-header';
                header.innerHTML = `<h3>${categoria}</h3><i class="fas fa-chevron-down"></i>`;
                header.addEventListener('click', () => {
                    categorySection.classList.toggle('active');
                });

                const content = document.createElement('div');
                content.className = 'thumbnails horizontal-scroll';

                resultados.forEach(video => {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'thumbnail';
                    thumbnail.innerHTML = `
                        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                        <h4>${video.title}</h4>
                    `;
                    thumbnail.addEventListener('click', () => playVideo(video));
                    content.appendChild(thumbnail);
                });

                categorySection.appendChild(header);
                categorySection.appendChild(content);
                categoriasContainer.appendChild(categorySection);
            }
        }
    }

    searchBtn.addEventListener('click', searchVideos);
    searchInput.addEventListener('keyup', e => {
        if (e.key === 'Enter') searchVideos();
    });
    searchInput.addEventListener('input', function () {
        if (this.value === '') loadVideoLists();
    });

    const tipsButton = document.getElementById('tipsButton');
    const teamButton = document.getElementById('teamButton');
    const tipsBanner = document.getElementById('tipsBanner');
    const teamBanner = document.getElementById('teamBanner');
    const closeButtons = document.querySelectorAll('.close-banner');

    if (tipsButton && teamButton && tipsBanner && teamBanner) {
        tipsButton.addEventListener('click', () => tipsBanner.classList.remove('hidden'));
        teamButton.addEventListener('click', () => teamBanner.classList.remove('hidden'));
        closeButtons.forEach(btn => btn.addEventListener('click', () => {
            tipsBanner.classList.add('hidden');
            teamBanner.classList.add('hidden');
        }));
    }

    loadVideoLists();
    const firstCategory = Object.keys(videoData)[0];
    if (videoData[firstCategory].length > 0) playVideo(videoData[firstCategory][0]);
});