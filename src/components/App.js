import React, { Component } from 'react'
import { gateway as MoltinGateway } from 'moltin'
import '../app.css'

import Header from './Header'
import ProductList from './ProductList'
// import Menu from './Menu'

class App extends Component {

  componentDidMount() {
      const Moltin = MoltinGateway({
          client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
      })
      Moltin.Authenticate().then((response) => {
          console.log("Authenticated")
      })
  }

  render() {
      return (
          <div className="App">
              <Header />
              {/*<Menu />*/}
              <ProductList />
          </div>
      )
  }
}

export default App
