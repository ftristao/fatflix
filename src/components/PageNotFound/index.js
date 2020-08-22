/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PageDefault from '../PageDefault';
import './pnf.css';

class Pagina404 extends React.Component {
  render() {
    return (
      <PageDefault height="100%">
        <h3 align="center">Página não entrada! Aproveite e vença o Jogo!</h3>
        <iframe title="Jogo" style={{ padding: 0, margin: 0, height: 475 }} frameBorder="0" src="/Jogo/" width="100%" height="80%" align="center" />
      </PageDefault>
    );
  }
}

export default Pagina404;
