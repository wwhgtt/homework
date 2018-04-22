const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/delivery-note/delivery-note.js');

import { Table, Input, Popconfirm, Button, Icon } from 'antd';

const Toast = require('../../component/mui/toast.jsx');

require('./application.scss');

const getTotalPrice = (noteInfo) => {
    let prices = [];
    noteInfo.map(item => prices.push(item.price * item.number));
    return prices.reduce((a,b) => a + b, 0)
};

const DeliveryNoteApplication = React.createClass({
  displayName: 'DeliveryNoteApplication',
  propTypes: {
    // MapedActionsToProps
    fetchDeliveryInfo: React.PropTypes.func.isRequired,
    saveDeliveryNote: React.PropTypes.func.isRequired,
    clearErrorMsg: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    noteInfo: React.PropTypes.array,
    errorMessage: React.PropTypes.string,
  },
  getInitialState() {
    return {
        noteInfo: null,
        totalPrice: 0
    }
  },
  componentDidMount() {
    const { fetchDeliveryInfo } = this.props;
    fetchDeliveryInfo().then(() => {
        const noteInfo = this.props.noteInfo.asMutable({ deep:true });
        let totalPrice = getTotalPrice(noteInfo);
        this.setState({
            noteInfo: noteInfo,
            totalPrice: totalPrice
        })
    });
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.saveStatus) {
        // 表示保存成功了
        alert('保存成功');
        window.location.href = "/product-list.html"
    }
    return false;
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
      let totalPrice = getTotalPrice(newData);
      this.setState({
        noteInfo: newData,
        totalPrice: totalPrice
      });
    }
  },
  saveDeliveryNote() {
    const { noteInfo } = this.state;
    const { saveDeliveryNote } = this.props;
    saveDeliveryNote(noteInfo);
  },
  render() {
    const { errorMessage, clearErrorMsg } = this.props;
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
                <div>
                    <div className="total-price">
                        商品总价： {this.state.totalPrice}
                    </div>
                    <Table bordered dataSource={noteInfo} columns={columns} />
                    <div className="operation">
                        <Button type="danger" onClick={() => window.history.go(-1)}>返回</Button>
                        <Button type="primary" onClick={this.saveDeliveryNote}>保存</Button>
                    </div>
                </div>
            ) 
            :
            false
        }
        {errorMessage ?
          <Toast errorMessage={errorMessage} clearErrorMsg={clearErrorMsg} />
          :
          false
        }

      </div>
    );
  },
});

module.exports = connect(state => state, actions)(DeliveryNoteApplication);
