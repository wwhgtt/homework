const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/delivery-note/delivery-note.js');

import { Table, Input, Popconfirm, Button, Icon } from 'antd';

require('./application.scss');

const DeliveryNoteApplication = React.createClass({
  displayName: 'DeliveryNoteApplication',
  propTypes: {
    // MapedActionsToProps
    fetchDeliveryInfo: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    noteInfo: React.PropTypes.array
  },
  getInitialState() {
    return {
        noteInfo: null
    }
  },
  componentDidMount() {
    const { fetchDeliveryInfo } = this.props;
    fetchDeliveryInfo().then(() => {
        const noteInfo = this.props.noteInfo.asMutable({ deep:true });
        this.setState({
            noteInfo: noteInfo
        })
    });
  },
  edit(key) {
    const newData = this.state.noteInfo;
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ noteInfo: newData });
    }
  },
  handleChange(value, key, column) {
    const newData = this.state.noteInfo;
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ noteInfo: newData });
    }
  },
  render() {
    const { noteInfo } = this.state;
    const columns = [{
        title: '商品',
        dataIndex: 'name',
        width: '25%'
      }, {
        title: '个数',
        dataIndex: 'number',
        width: '35%',
        render: (text, record) => renderColumns(text, record, 'number'),
      }, {
        title: '价格',
        dataIndex: 'price',
        width: '40%',
        render: (text, record) => renderColumns(text, record, 'price'),
      }, {
        title: '编辑',
        key: 'action',
        render: (text, record) => {
            const { editable } = record;
            return (
                <span>
                    <Icon type="edit" />
                    <Button type="primary" onClick={() => this.edit(record.key)}>编辑</Button>
                </span>   
            )
        }
    }];
    const EditableCell = ({ editable, value, onChange }) => {
        return (
          <div>
            {editable ? 
              <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
              : value
            }
          </div>
        )
    };
    const renderColumns = (text, record, column) => {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
          />
        );
    };
    return (
      <div className="container">
        {
            noteInfo ? (
                <Table bordered dataSource={noteInfo} columns={columns} />
            ) 
            :
            false
        }
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(DeliveryNoteApplication);
