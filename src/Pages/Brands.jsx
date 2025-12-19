import React from 'react'

function Brands() {
  const brands = ['PureLife', 'GreenRoots', 'NutriCore']
  return (
    <div className="container">
      <h2>Brands</h2>
      <ul className="brand-list">
        {brands.map(b => <li key={b}>{b}</li>)}
      </ul>
    </div>
  )
}

export default Brands
