const React = require('react');
const connect = require('react-redux').connect;
const actions = require('../../action/product-list/product-list.js');

const Filter = require('../../component/product-list/filter/filter.jsx');
const MenuContainer = require('../../component/product-list/menuContainer/menuContainer.jsx');

require('./application.scss');


const ProductListApplication = React.createClass({
  displayName: 'ProductListApplication',
  propTypes: {
    // MapedActionsToProps
    fetchMenuList: React.PropTypes.func.isRequired,
    // MapedStatesToProps
    menuList: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      // 这个list是用作展示的list
      fakeMenuList: []
    }
  },

  componentDidMount() {
    const { fetchMenuList } = this.props;
    fetchMenuList().then(() => {
      this.setState({
        fakeMenuList: this.props.menuList
      })
    })
  },

  render() {
    const { fakeMenuList } = this.state;

    return (
      <div className="container">
        <Filter />
        {
          fakeMenuList && fakeMenuList.length ? 
            <MenuContainer menuList = {fakeMenuList} /> : '暂时无任何匹配数据'
        }
      </div>
    );
  },
});

module.exports = connect(state => state, actions)(ProductListApplication);
