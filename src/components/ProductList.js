import React, { Component } from 'react';
import { gateway as MoltinGateway } from '@moltin/sdk';

import Product from './Product';

class ProductList extends Component {

  state = {
    products: []
  };

  componentWillMount() {
    const Moltin = MoltinGateway({
      client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    });
    Moltin.Products.All().then((products) => {
      this.setState({ products: products.data })
    })
  }

  renderProducts() {
    return this.state.products.map(product => <Product key={ product.id } product={ product } />);
  }

  render() {
    return (
      <div className="product-wrapper">
        { this.renderProducts.bind(this) }
      </div>
    )
  }
}

export default ProductList
