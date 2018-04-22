const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/delivery-note/delivery-note.js');

require('./application.scss');


const DeliveryNoteApplication = React.createClass({
  displayName: 'DeliveryNoteApplication',
  propTypes: {
    // MapedActionsToProps
    // MapedStatesToProps
  },

  componentDidMount() {

  },

  render() {
    return (
      <div className="container">
        
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(DeliveryNoteApplication);
