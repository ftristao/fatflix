/* eslint-disable no-console */
import config from '../config';

const urlCategories = `${config.url}/categorias`;

function getAllWithVideos() {
  console.log(`url= ${urlCategories}`);
  return fetch(`${urlCategories}?_embed=videos`)
    .then(async (respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        const resposta = await respostaDoServidor.json();
        return resposta;
      }
      throw new Error('Não foi possível pegar os dados :( ');
    });
}

function getAll() {
  return fetch(urlCategories)
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
