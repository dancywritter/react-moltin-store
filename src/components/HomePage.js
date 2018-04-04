import React, { Component } from 'react'

import ProductList from './ProductList'

class HomePage extends Component {

  render() {
    return (
      <div className="product-list">
        <ProductList />
      </div>
    )
  }
}

export default HomePage
