const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/edit/edit.js');

require('./application.scss');


const EditApplication = React.createClass({
  displayName: 'EditApplication',
  propTypes: {
    // MapedActionsToProps
    fetchProductInfo: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    productInfo: React.PropTypes.object,
  },

  componentDidMount() {
    const { fetchProductInfo } = this.props;
    fetchProductInfo();
  },

  render() {
    const { productInfo } = this.props;
    return (
      <div className="container">
        {
            productInfo ? (
                <div className="info"></div>
            )
            :
            false
        }
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(EditApplication);
