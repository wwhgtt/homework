const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/delivery-note/delivery-note.js');

require('./application.scss');

const DeliveryNoteApplication = React.createClass({
  displayName: 'DeliveryNoteApplication',
  propTypes: {
    // MapedActionsToProps
    fetchDeliveryInfo: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    noteInfo: React.PropTypes.array
  },

  componentDidMount() {
    const { fetchDeliveryInfo } = this.props;
    fetchDeliveryInfo();
  },

  render() {
    const { noteInfo } = this.props;
    return (
      <div className="container">
        {
            noteInfo ? (
                <div className="info">
                
                </div>
            ) 
            :
            false
        }
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(DeliveryNoteApplication);
