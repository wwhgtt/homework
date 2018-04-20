const React = require('react');
const connect = require('react-redux').connect;
// const Toast = require('../../component/mui/toast.jsx');
const actions = require('../../action/product-list/product-list.js');
require('./application.scss');


const ProductListApplication = React.createClass({
  displayName: 'ProductListApplication',
  propTypes: {
    // MapedActionsToProps
    // MapedStatesToProps
  },

  componentDidMount() {

  },

  render() {
    const {  } = this.props;

    return (
      <div className="container">
        test
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(ProductListApplication);
