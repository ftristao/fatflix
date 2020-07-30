import React from "react";
import "./App.css";
import Menu from "./components/Menu/index";
import dadosIniciais from "./data/dados_iniciais.json";
import Carousel from "./components/Carousel/index";
import BannerMain from "./components/BannerMain/index";
import Footer from "./components/Footer/index";
function App() {
  const random = Math.floor(Math.random() * (5 - 0) + 0);

  return (
    <div className="body2">
      <Menu></Menu>
      <BannerMain
        videoTitle={dadosIniciais.categorias[random].videos[random].titulo}
        url={dadosIniciais.categorias[random].videos[random].url}
        videoDescription={""}
      />
      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[0]} />

      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[1]} />

      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[2]} />

      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[3]} />

      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[4]} />

      <Carousel ignoreFirstVideo category={dadosIniciais.categorias[5]} />

      <Footer />
    </div>
  );
}

export default App;