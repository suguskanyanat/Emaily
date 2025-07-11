import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)} //taken back from Stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY} //publisable key
            >
                <button className="btn">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);