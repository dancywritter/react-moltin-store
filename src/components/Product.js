import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gateway as MoltinGateway } from '@moltin/sdk';
import { updateCart } from '../actions/actions';

//import Modal from './modal';
import Button from './Button';

class Product extends Component {

  state = {
      show: false,
  }

  toggleModal() {
    this.setState({ show: !this.state.show });
  };

  componentWillMount() {
    this.getDefaultImage.bind(this, this.props.product.relationships.files.data[0].id)
  };

  addToCart(id) {
    const Moltin = MoltinGateway({
        client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    Moltin.Cart.AddProduct(id, 1).then((cart) => {
        this.props.dispatch(updateCart(cart))
    })
  }

  getDefaultImage(id) {
    const Moltin = MoltinGateway({
        client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    // Moltin.Files.Get(id).then((image) => {
    //     this.setState({ image: image.data.link.href })
    // })
  }

  render() {
    const product = this.props.product

    return (
      <div className="product">
        <img src={ this.state.image } alt={ product.name } />
        <span className="product-title">{ product.name }</span>
        <span className="product-price">{ product.meta.display_price.with_tax.formatted }</span>
        <div className="product-actions">
          <Button label="More info"/>
          <Button onClick={ () => this.addToCart.bind(this, product.id) } label="Add to cart"/>
        </div>
        {/*<Modal show={ this.state.show } toggleModal={ this.toggleModal.bind(this) } product={product}/>*/}
      </div>
    );
  }
}

export default connect()(Product)
