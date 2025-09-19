import Header from '../components/Header'
import CatalogoList from '../components/CatalogoList'

function Catalogo() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px' }}>
        <h1 className="heading"><span>Catálogo de Discos</span></h1>
        <CatalogoList />
      </main>
    </>
  )
}

export default Catalogo