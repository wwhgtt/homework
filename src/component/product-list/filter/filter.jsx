const React = require('react');

import { Button, Row, Col, Input } from 'antd';

const ButtonGroup = Button.Group;
const Search = Input.Search;

module.exports = React.createClass({
  displayName: 'Filter',
  propTypes: {
    // MapedActionsToProps
    recoverTableState: React.PropTypes.func.isRequired,
    searchMenu: React.PropTypes.func.isRequired,
    generateDeliveryNote: React.PropTypes.func.isRequired
    // MapedStatesToProps
  },

  getInitialState() {
    return {
      
    }
  },

  componentDidMount() {

  },
  // 输入商品名称
  menuNameInput: function(e) {
    this.setState({
      searchMenuName: e.target.value
    })
  },
  // 输入商品条码
  menuCodeInput: function(e) {
    this.setState({
      searchMenuCode: e.target.value
    })
  },
  // 点击搜索按钮
  searchMenu: function() {
    const { searchMenuName, searchMenuCode } = this.state;
    const { searchMenu } = this.props;
    if (searchMenuName || searchMenuCode) {
      searchMenu(searchMenuName, searchMenuCode);
    }
    return false;
  },
  // 重制搜索选项
  recoverTableState: function() {
    const { recoverTableState } = this.props;
    this.setState({
      searchMenuCode: '',
      searchMenuName: ''
    })
  },

  render() {
    const { recoverTableState, generateDeliveryNote } = this.props;
    const { searchMenuCode, searchMenuName } = this.state;
    return (
      <Row gutter={16} type="flex" className="table-filter">
        <Col xl={6} md={6}>
          <Search placeholder="商品名称" value={searchMenuName}  onChange={this.menuNameInput} />
        </Col>
        <Col xl={6} md={6}>
          <Search  placeholder="商品条码" value={searchMenuCode} onChange={this.menuCodeInput} />
        </Col>
        <Col xl={6} md={6}>
          <ButtonGroup>
            <Button type="primary" onClick={this.searchMenu}>
            搜  索
            </Button>
            <Button onClick={this.recoverTableState}>重置</Button>
          </ButtonGroup>
          <Button type="primary" type="ghost" onClick={generateDeliveryNote}>
            生成出货单
          </Button>
        </Col>
      </Row>
    )
  },
});
