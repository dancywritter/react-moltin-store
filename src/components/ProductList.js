import React, { Component } from 'react'
import { gateway as MoltinGateway } from 'moltin';

import Product from './Product'

class ProductList extends Component {

    constructor(props) {
      super(props)
      this.renderProducts = this.renderProducts.bind(this)
      this.state = {
          products: []
      };
    }

    componentWillMount() {
        const Moltin = MoltinGateway({
            client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
        });
        Moltin.Products.All().then((products) => {
            console.log(products.data)
            this.setState({ products: products.data })
        })
    }

    renderProducts() {
        return this.state.products.map(product => <Product key={ product.id } product={ product } />);
    }

    render() {
        return (
            <div className="product-wrapper">
                { this.renderProducts() }
            </div>
        )
    }
}

export default ProductList
