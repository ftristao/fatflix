import config from '../config';

const url_categories = `${config.url}/categorias`;

function getAllWithVideos() {
  return fetch(`${url_categories}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :( ');
    });
}

function getAll() {
  return fetch(url_categories)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :( ');
    });
}

export default {
  getAllWithVideos,
  getAll,
};
