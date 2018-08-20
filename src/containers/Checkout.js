import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircleLoader } from 'react-spinners';
import SocialMediaIcons from '../components/Social_Media_Icons';
import CheckOutHeader from '../components/CheckOutHeader';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import '../styles/Checkout.scss';

class Checkout extends React.Component{
  constructor(props){
    super(props)

    this.state = { numOfItems: 0,
                   totalItemPrice: 0 };
    this.displayItems = this.displayItems.bind(this);
    this.addNumOfItems = this.addNumOfItems.bind(this);
    this.subNumOfItems = this.subNumOfItems.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
    this.renderPayPalComponent = this.renderPayPalComponent.bind(this);
  }


  componentDidMount(){
   this.totalPrice();
  }

  addNumOfItems(){
    let { numOfItems } = this.state;
    this.setState({ numOfItems: numOfItems + 1 });
  }

  subNumOfItems(){
    let { numOfItems } = this.state;
    if(numOfItems === 0){
      return;
    } else{
      this.setState({ numOfItems: numOfItems - 1 })
    }
  }

  totalPrice(){
   let { data } = this.props.itemInfo;
   let { totalItemPrice } = this.state;

   if(!data){ return; }

   let total = data
               .map(obj => Number(obj.item_1))
               .reduce((a, b) => a + b);

   this.setState({ totalItemPrice: totalItemPrice + total });
}

  renderPayPalComponent(total){

    const onSuccess = (payment) => { console.log("The payment was succeeded!", payment) };
    const onCancel = (data) => { console.log('The payment was cancelled!', data) };
    const onError = (err) => { console.log("Error!", err) };

        let env = 'sandbox',
            currency = 'USD';

        const client = {
            sandbox: process.env.DB_PAYPAL_SANDBOX_ACCOUNT,
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        return (
            <PaypalExpressBtn
             env={env}
             client={client}
             currency={currency}
             total={total}
             onError={onError}
             onSuccess={onSuccess}
             onCancel={onCancel} />
        );
  }

  displayItems(){
    let { data } = this.props.itemInfo;

    if(!data){
      return(
        <div className="items-timed-out">
          No Items in Cart!
       </div>
      )
    }

    let itemArray = data.map(obj => {
        return(
          <div className="checkout-item" key={obj}>
            <div className="checkout-info">
             <img
              className="item-image"
              src={obj.item_0} />
             <div className="item-description">
              <span className='item-name'>
                { obj.item_3 }
              </span>
              <span className='item-type'>
                { obj.item_2 }
              </span>
              <span className='item-price'>
                { obj.item_1 }
              </span>
            </div>
          </div>
          <div className="checkout-add-item">
           <i onClick={this.addNumOfItems}
              className="fas fa-plus-square"></i>
           <i onClick={this.subNumOfItems}
              className="fas fa-minus-square"></i>
           <span>{ this.state.numOfItems }</span>
          </div>
        </div>
         )
    })
    return itemArray;
  }


  render(){
    let { totalItemPrice } = this.state;
    return(
    <div className="checkout-container">
      <CheckOutHeader />
      <div className="checkout-cart">
      { this.displayItems() }
      </div>
      <div className="total-price-checkout-info">
        <div className="pay-component">
          { this.renderPayPalComponent(totalItemPrice) }
        </div>
        <div className="total-price">
          { totalItemPrice }
        </div>
      </div>
      <SocialMediaIcons />
    </div>
    )
  }
}

const mapStateToProps = state => {
  return {
   itemInfo: state.Store_Reducer
  }
}

export default connect(mapStateToProps, null)(Checkout);
