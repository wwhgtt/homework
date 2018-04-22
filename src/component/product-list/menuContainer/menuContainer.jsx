const React = require('react');
import { Table, Icon } from 'antd';
require('./menuContainer.scss');

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '条码',
    dataIndex: 'newId',
    key: 'newId',
  }, {
    title: '规格',
    dataIndex: 'newName',
    key: 'newName',
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
        let url = 'edit?id=' + record.key;
        return (
            <span>
                <Icon type="edit" />
                <a href={url}>编辑</a>
            </span>   
        )
    },
  }];

module.exports = React.createClass({
  displayName: 'MenuContainer',
  propTypes: {
    // MapedActionsToProps
    // MapedStatesToProps
    menuList: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      
    }
  },

  componentDidMount() {

  },

  render() {
    const { menuList } = this.props;
    return (
      <div className="container">
        <Table dataSource={menuList} columns={columns} />
      </div>
    );
  },
});
