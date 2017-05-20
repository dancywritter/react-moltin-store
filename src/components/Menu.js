import React, { Component } from 'react'
import { MoltinGateway } from 'moltin'

class Menu extends Component {

    constructor() {
        super()
        this.state = {
            categories: []
        }
    }

    componentWillMount() {
      const Moltin = MoltinGateway({
          clientId: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
      });
      Moltin.Categories.List().then((categories) => {
          this.setState({ categories: categories.result })
      });
    }

    renderCategories() {
        return this.state.categories.map(category => <li key={ category.id }>{ category.title }</li>);
    }

    render() {
        return(
            <nav className="menu">
                <ul className="header-categories">
                    { this.renderCategories() }
                </ul>
            </nav>
        );
    }
}

export default Menu;
