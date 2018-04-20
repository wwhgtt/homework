const React = require('react');

import { Form, Button, Row, Col, Input } from 'antd';

const ButtonGroup = Button.Group;
const Search = Input.Search;

module.exports = React.createClass({
  displayName: 'Filter',
  propTypes: {
    // MapedActionsToProps
    // MapedStatesToProps
  },

  getInitialState() {
    return {
      
    }
  },

  componentDidMount() {

  },

  render() {
    return (
      <Row gutter={16} type="flex" className="table-filter">
        <Col xl={6} md={6}>
          <Search placeholder="商品名称" />
        </Col>
        <Col xl={6} md={6}>
          <Search  placeholder="商品条码" />
        </Col>
        <Col xl={6} md={6}>
          <ButtonGroup>
            <Button type="primary">
            搜  索
            </Button>
            <Button>重置</Button>
          </ButtonGroup>
          <Button type="primary" type="ghost">
            生成出货单
          </Button>
        </Col>
      </Row>
    )
  },
});
