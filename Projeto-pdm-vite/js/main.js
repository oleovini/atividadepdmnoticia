//registrando a service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator
                .serviceWorker
                .register('./sw.js', {type: "module"});
            console.log('Service worker registrada! reg');
            postNews();
            notPrinc();
        } catch (err) {
            console.log(' Service worker registro falhou:', err);
        }
    });
}


const apiKey = 'de5956d4dcc9475186995d9019602ee8';
var url = `https://newsapi.org/v2/everything?q=nba&apiKey=${apiKey}`;


const main = document.querySelector('main');
const section = document.querySelector('section');

async function notPrinc() {
    const res = await fetch(url); const data = await res.json();
    section.innerHTML = princCreate(  data.articles[0]);
  }
  

async function postNews() {
    const res = await fetch(url); const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article) { 
    console.log(article);
    return `
    <div class="article">
    <a href="${article.url}" target="_blank">
    <img src="${article.urlToImage}" class="image" alt="${article.content}"/>
    <h2>${article.title}</h2>
    <p>${article.description}</p>
    </a>
    </div>
    `
}

function princCreate(principalnot) { 
    console.log(principalnot);
    return `
    <div class="article principal">
    <a href="${principalnot.url}" target="_blank">
    <img src="${principalnot.urlToImage}" class="image" alt="${principalnot.content}"/>
    <h2>${principalnot.title}</h2>
    <p>${principalnot.description}</p>
    </a>
    </div>
    `
  }

function cliqueiBuscaplease() {
    var busca = document.getElementById('barraPesquisa').value;
    url = `https://newsapi.org/v2/everything?q=${busca}&apiKey=${apiKey}`;
    postNews(); // Chama a função postNews para atualizar os resultados com base na nova pesquisa
    notPrinc(); 
    console.log(busca);
}   