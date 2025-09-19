import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <>
      <Header />
      <section className="home" id="home">
        <div className="content">
          <h3>Disco é cultura!</h3>
          <span>Discos são legais discos são legais.</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem aliquam odit optio qui ut atque vero?
          </p>
          <Link to="/catalogo" className="conhecer-catalogo-btn">
            Conhecer catálogo!
          </Link>
        </div>
      </section>

      <section className="catalogo" id="catalogo">
        <h1 className="heading"><span>Produtos em Destaque</span></h1>
        <Carousel />
        <Link to="/catalogo" className="btn-ctr">Catálogo Completo!</Link>
      </section>

    </>
  )
}

export default Home
