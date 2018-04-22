const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/product-list/product-list.js');

const Filter = require('../../component/product-list/filter/filter.jsx');
const MenuContainer = require('../../component/product-list/menuContainer/menuContainer.jsx');

require('./application.scss');

const Toast = require('../../component/mui/toast.jsx');

const ProductListApplication = React.createClass({
  displayName: 'ProductListApplication',
  propTypes: {
    // MapedActionsToProps
    fetchMenuList: React.PropTypes.func.isRequired,
    searchMenu: React.PropTypes.func.isRequired,
    generateDeliveryNote: React.PropTypes.func.isRequired,
    clearErrorMsg: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    menuList: React.PropTypes.array.isRequired,
    searchMenuList: React.PropTypes.array.isRequired,
    delivery_note_id: React.PropTypes.string,
    errorMessage: React.PropTypes.string,
  },

  getInitialState() {
    return {
      // 这个list是用作展示的list
      fakeMenuList: []
    }
  },

  componentDidMount() {
    const { fetchMenuList } = this.props;
    fetchMenuList();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchStatus) {
      this.setState({
        fakeMenuList: nextProps.searchMenuList
      })
    } else {
      this.setState({
        fakeMenuList: nextProps.menuList
      })
    }
  },
  // 初始化搜索状态
  recoverTableState: function() {
    this.setState({
      fakeMenuList: this.props.menuList
    })
  },
  // 生成出货单
  generateDeliveryNote: function() {
    const { fakeMenuList } = this.state;
    this.props.generateDeliveryNote(fakeMenuList).then(() => {
      let { delivery_note_id } = this.props;
      window.location.href = "/delivery-note.html?noteId=" + delivery_note_id
    })
  },
  render() {
    const { fakeMenuList } = this.state;
    const { searchMenu, clearErrorMsg, errorMessage } = this.props;
    return (
      <div className="container">
        <Filter recoverTableState={this.recoverTableState} searchMenu={searchMenu} generateDeliveryNote={this.generateDeliveryNote} />
        {
          fakeMenuList && fakeMenuList.length ? 
            <MenuContainer menuList = {fakeMenuList} /> : '暂时无任何匹配数据'
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

module.exports = connect(state => state, actions)(ProductListApplication);
