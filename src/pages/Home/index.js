import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    Products: [],
  }

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    if(response.data) {
      this.setState({ Products: data });
    }
  }

  handleAddProductCart = id => {
    const { addToCartRequest } = this.props;
    addToCartRequest(id);
  }

  render() {
    const { Products } = this.state;
    const { amount } = this.props;

    return (
      <ProductList>
        {
          Products.map(product => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.title}
              />
              <strong>{product.title}</strong>
              <span>{product.priceFormatted}</span>

              <button type="button" onClick={() => this.handleAddProductCart(product.id)}>
                <div>
                  <MdAddShoppingCart size={16} color="#fff" /> {' '}
                  {amount[product.id] || 0}
                </div>
                <span>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))
        }
      </ProductList>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);