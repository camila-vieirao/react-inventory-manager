import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Carousel() {
  const [discos, setDiscos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 6

  useEffect(() => {
    fetch('http://localhost:8800/products')
      .then(res => res.json())
      .then(data => setDiscos(data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (discos.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % discos.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [discos])

  function prev() {
    setCurrentIndex((currentIndex - 1 + discos.length) % discos.length)
  }

  function next() {
    setCurrentIndex((currentIndex + 1) % discos.length)
  }

  const visibleDiscos = discos.slice(currentIndex, currentIndex + visibleCount)
    .concat(discos.slice(0, Math.max(0, (currentIndex + visibleCount) - discos.length)))

  return (
    <div className="carousel-row">
      <button onClick={prev} className="carousel-arrow">&#8592;</button>
      <div className="carousel-container">
        {visibleDiscos.map((disco, idx) => (
          <Link key={idx} to={`/disco/${disco.id}`} className="carousel-disco">
            <img src={disco.imageUrl} alt={disco.title} />
            <h3>{disco.title}</h3>
            <p>{disco.artist}</p>
          </Link>
        ))}
      </div>
      <button onClick={next} className="carousel-arrow">&#8594;</button>
    </div>
  )
}

export default Carousel
