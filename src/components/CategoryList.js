import React, { Component } from 'react'
import { MoltinClient } from 'moltin-react'

import Category from './Category'

class CategoryList extends Component {

    constructor(props) {
      super(props)
      this.renderCategories = this.renderCategories.bind(this)
      this.state = {
        categories: []
      };
    }

    componentDidMount() {
      const Moltin = MoltinClient({
        clientId: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
      });
      Moltin.Categories.List().then((categories) => {
        this.setState({ categories: categories.result })
      });
    }

    renderCategories() {
        return this.state.categories.map(category => <Category key={ category.id } category={ category } />);
    }

    render() {
        const { categories } = this.props;
        if (!categories) return null;

        return (
            <ul>
                { this.renderCategories() }
            </ul>
        )
    }
}

export default CategoryList;
