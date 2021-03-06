import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateCart } from '../actions/actions'

import Button from './Button'

class CartItem extends Component {

  constructor() {
    super()
    this.state = {
        image: null
    }
    this.getDefaultImage = this.getDefaultImage.bind(this)
  }

  componentWillMount() {
    this.getDefaultImage(this.props.item.product_id)
  }

  removeFromCart(id) {
    const Moltin = MoltinGateway({
        client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    Moltin.Cart.RemoveItem(id).then((cart) => {
        this.props.dispatch(updateCart(cart))
    })
  }

  getDefaultImage(id) {
    const Moltin = MoltinGateway({
        client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    Moltin.Products.Get(id).then((product) => {
        const image_id = product.data.relationships.files.data[0].id

        Moltin.Files.Get(image_id).then((image) => {
            this.setState({ image: image.data.link.href })
        })
    })
  }

  render() {
    const item = this.props.item

    return (
        <div className="item">
            <img src={ this.state.image } alt={ item.name } />
            <div className="item-info">
                <span className="item-title">{ item.name }</span>
                <span className="item-quantity">Quantity: { item.quantity }</span>
                <span className="item-price">{ item.meta.display_price.with_tax.value.formatted }</span>
            </div>
            <div className="item-action">
                <Button onClick={ () => this.removeFromCart(item.id) } label="Remove"/>
            </div>
        </div>
    )
  }
}

export default connect()(CartItem)
