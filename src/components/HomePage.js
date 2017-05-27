import React, { Component } from 'react'
import { gateway as MoltinGateway } from 'moltin'

import ProductList from './ProductList'

class HomePage extends Component {

    componentDidMount() {
        const Moltin = MoltinGateway({
            client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
        })
        Moltin.Authenticate().then((response) => {
            console.info("Authenticated")
        })
    }

    render() {
        return (
            <div className="product-list">
                <ProductList />
            </div>
        )
    }
}

export default HomePage
