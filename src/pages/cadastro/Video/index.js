/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import PageDefault from '../../../components/PageDefault';
import Button from '../../../components/Button';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForms';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import config from '../../../config';
import {
  Table, Titulo, Container, Conteudo, MultContainer, ContainerRaiz,
} from '../../../components/Tabela';
import './video.css';

const urlTop = `${config.url}/videos`;
function CadastroVideo() {
  const valoresIniciais = {
    titulo: ' ',
    url: ' ',
    categoria: ' ',
  };
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  const { values, handleChange, clearForm } = useForm(valoresIniciais);

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
    fetch(urlTop)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setVideos([
          ...resposta,
        ]);
      });
  // eslint-disable-next-line
  }, []);

  async function handleNewVideo(e) {
    e.preventDefault();
    try {
      // eslint-disable-next-line max-len
      const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);

      videosRepository.create({
        titulo: values.titulo,
        url: values.url,
        categoriaId: categoriaEscolhida.id,
      })
        .then(() => {
          console.log('Cadastrou com SUCESSO');
          history.push('/');
        });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Erro ao cadastrar categoria, tente novamente');
    }
    setVideos([...videos, values]);
    history.push('/');
    clearForm();
  }
  async function handleRemoveVideo(e) {
    const target = String(e.target.getAttribute('target'));
    e.preventDefault();
    const URL_TOP_ID = `${urlTop}/${target}`;
    try {
      await fetch(URL_TOP_ID, {
        method: 'DELETE',
      });
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Erro ao deletar caso, tente novamente');
    }
    setCategorias([...categorias, values]);
    history.push('/');
    clearForm();
  }
  return (
    <PageDefault>
      <h1>Cadastro de vídeo</h1>
      <MultContainer>
        <ContainerRaiz>
          <form onSubmit={handleNewVideo}>
            <FormField
              label="Titulo do Vídeo"
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
            />

            <FormField
              label="URL"
              name="url"
              value={values.url}
              onChange={handleChange}
            />

            <FormField
              label="Categoria"
              name="categoria"
              value={values.categoria}
              onChange={handleChange}
              suggestions={categoryTitles}
            />

            <Button className="formulario" type="submit">
              Cadastrar
            </Button>
          </form>

          <div className="ir-home">
            <Link to="/cadastro/categoria">
              <Button>
                Cadastrar Categoria
              </Button>
            </Link>
          </div>
        </ContainerRaiz>
        <ContainerRaiz>
          {videos.length === 0 && (
          <div>
            Loading...
          </div>
          )}
          <Table>
            <Container>
              <Titulo>Titulo</Titulo>
              <Titulo>URL</Titulo>
              <Titulo className="ultimo">Remover</Titulo>
            </Container>
            {videos.lenght === 0 && <div>Loading...</div>}
            {videos.map((video) => (
              <Container key={uuid()}>
                <Conteudo>{video.titulo}</Conteudo>
                <Conteudo>{video.url}</Conteudo>
                <Conteudo>
                  <Conteudo.Paragrafo
                    target={video.id}
                    onClick={handleRemoveVideo}
                  >
                    Remover
                  </Conteudo.Paragrafo>
                </Conteudo>
              </Container>
            ))}
          </Table>
        </ContainerRaiz>
      </MultContainer>
    </PageDefault>
  );
}

export default CadastroVideo;
