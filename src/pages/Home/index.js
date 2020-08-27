/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';
import CategoriasRep from '../../repositories/categorias';

function Home() {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  // eslint-disable-next-line
  useEffect(() => {
    CategoriasRep.getAllWithVideos()
      .then((categoriasComVideos) => {
        // console.log(categoriasComVideos[0].videos[0]);
        setDadosIniciais(categoriasComVideos);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageDefault paddingAll={0}>
      {dadosIniciais.length === 0 && (<div>Loading...</div>)}

      {dadosIniciais.map((categoria, indice) => {
        if (indice === 0) {
          const random = Math.floor(Math.random() * (dadosIniciais.length - 0) + 0);
          return (
            <div key={categoria.id}>
              <BannerMain
                videoTitle={dadosIniciais[random].videos[0].titulo}
                url={dadosIniciais[random].videos[0].url}
                videoDescription={dadosIniciais[random].videos[0].description}
              />
              <Carousel
                ignoreFirstVideo
                category={dadosIniciais[0]}
              />
            </div>
          );
        }

        return (
          <Carousel
            key={categoria.id}
            category={categoria}
          />
        );
      })}

    </PageDefault>
  );
}

export default Home;
