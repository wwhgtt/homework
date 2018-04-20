const React = require('react');
const _findIndex = require('lodash.findindex');
const connect = require('react-redux').connect;
const actions = require('../../action/edit/edit.js');
import { Input, Icon, Button } from 'antd';

require('./application.scss');


const EditApplication = React.createClass({
  displayName: 'EditApplication',
  propTypes: {
    // MapedActionsToProps
    fetchProductInfo: React.PropTypes.func.isRequired,
    saveProductInfo: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    productInfo: React.PropTypes.object,
    changeInfoStatus: React.PropTypes.bool.isRequired,
  },
  getInitialState() {
    return {
        product_name: undefined,
        product_code: [],
        codeElement: undefined
    }
  },

  componentWillReceiveProps(nextProps) {
    let bool = nextProps.changeInfoStatus;
    if (bool) {
        // 表示更新成功
        window.history.go(-1);
    }
    let code = typeof nextProps.productInfo.newId == 'string' ? [nextProps.productInfo.newId] : nextProps.productInfo.newId;
    this.setState({
        product_name: nextProps.productInfo.name,
        product_code: code
    }, () => this.renderCodeInput())
  },

  componentDidMount() {
    const { fetchProductInfo } = this.props;
    fetchProductInfo();
  },
  // 设置商品名字
  setProductName: function(e) {
    this.setState({
        product_name: e.target.value
    })
  },
  // 渲染条形码
  renderCodeInput: function() {
    const { productInfo } = this.props;
    let code = typeof productInfo.newId == 'string' ? [productInfo.newId] : productInfo.newId;
    let elements = [];
    for (let i = 0; i < code.length; i++ ) {
        let codeElement = (
            <div className="singleCodeContainer" key={code[i]}>
                <Input size="small" defaultValue={code[i]} data-key={code[i]} onChange={this.setProductCode} />
                <Icon type="delete" data-key={code[i]} onClick={this.deleteCode} />
            </div>
        )
        elements.push(codeElement);
        if(i == code.length -1) {
            this.setState({
                codeElement: elements
            });
        };
    }
  },
  // 创建code输入框
  createCodeInputElement: function() {
    let key = Math.random() * 1000 * Math.random();
    let element =  (
        <div className="singleCodeContainer" key={key}>
            <Input size="small" data-key={key} onChange={this.setProductCode} />
            <Icon type="delete" data-key={key} onClick={this.deleteCode} />
        </div>
    );
    let oldElement = this.state.codeElement;
    oldElement.push(element);

    let product_code = this.state.product_code;
    product_code.push('');

    this.setState({
        codeElement: oldElement,
        product_code: product_code
    })
  },
  // 删除输入框
  deleteCode: function(e) {
    let elements = this.state.codeElement;
    if (elements.length == 1) {
        return false;
    }
    let key = e.target.dataset.key;
    let index = _findIndex(elements, element => element.key == key);
    elements.splice(index, 1, '');

    let product_code = this.state.product_code;
    product_code[index] = '';

    let arrayKey = 'product_code[' + index + ']';
    this.setState({
        codeElement: elements,
        product_code: product_code
    })
  },
  // 编辑输入框
  setProductCode: function(e) {
    let elements = this.state.codeElement;
    let key = e.target.dataset.key;
    let index = _findIndex(elements, element => element.key == key);
    // 在product_code里面 这个index也是一样的
    let product_code = this.state.product_code;
    product_code[index] = e.target.value;
    this.setState({
        product_code: product_code
    })
  },
  // 保存
  saveCodes: function() {
    let { saveProductInfo } = this.props;
    let { product_code, product_name } = this.state;
    let codes = product_code.filter(code => !!code);
    saveProductInfo(product_name, codes);
  },
  render() {
    const { productInfo } = this.props;
    return (
      <div className="container">
        {
          productInfo ? (
            <div className="info">
                <div className="product-name">
                    <label>商品名称</label>
                    <Input size="small" defaultValue={productInfo.name} onChange={e => this.setProductName} />
                </div>
                <div className="product-code">
                    <label>商品条码</label>
                    {this.state.codeElement}
                </div>
                <Icon type="plus-circle" onClick={this.createCodeInputElement} />

                <Button type="danger" onClick={() => window.history.go(-1)}>返回</Button>
                <Button type="primary" onClick={this.saveCodes}>保存</Button>
            </div>
          )
          :
          false
        }
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(EditApplication);
