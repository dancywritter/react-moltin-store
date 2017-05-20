import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gateway as MoltinGateway } from 'moltin'
import { updateCart } from '../actions/actions'

//import Modal from './modal';
import Button from './Button';

class Product extends Component {

  constructor() {
      super();
      this.state = {
          show: false,
          image: null
      };
      this.toggleModal = this.toggleModal.bind(this)
      this.addToCart = this.addToCart.bind(this)
      this.getDefaultImage = this.getDefaultImage.bind(this)
  }

  toggleModal() {
      this.setState({ show: !this.state.show })
  }

  addToCart(id) {
      const Moltin = MoltinGateway({
          client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
      })
      Moltin.Cart.AddProduct(id, 1).then((cart) => {
          this.props.dispatch(updateCart(cart))
      });
  }

  getDefaultImage(id) {
      const Moltin = MoltinGateway({
          client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
      })
      Moltin.Files.Get(id).then((image) => {
          this.setState({ image: image.data.link.href })
      })
  }

  render() {
      const product = this.props.product
      this.getDefaultImage(product.relationships.files.data[0].id)

      return (
          <div className="product">
              <img src={ this.state.image } alt={ product.name } />
              <span className="product-title">{ product.name }</span>
              <span className="product-price">{ product.meta.display_price.with_tax.formatted }</span>
              <div className="product-actions">
                  <Button label="More info"/>
                  <Button onClick={ () => this.addToCart(product.id) } label="Add to cart"/>
              </div>
              {/*<Modal show={ this.state.show } toggleModal={ this.toggleModal } product={product}/>*/}
          </div>
      );
  }
}

export default connect()(Product)
