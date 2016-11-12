'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.SortablePane = exports.Pane = undefined;

const _createClass = function () { function defineProperties(target, props) { for (const i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _reactMotion = require('react-motion');

const _reactResizableBox = require('react-resizable-box');

const _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

const _lodash = require('lodash.isequal');

const _lodash2 = _interopRequireDefault(_lodash);

const _pane = require('./pane');

const _pane2 = _interopRequireDefault(_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === 'object' || typeof call === 'function') ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const reinsert = function reinsert(array, from, to) {
  const a = array.slice(0);
  const v = a[from];
  a.splice(from, 1);
  a.splice(to, 0, v);
  return a;
};

const clamp = function clamp(n) {
  const min = arguments.length <= 1 || arguments[1] === undefined ? n : arguments[1];
  const max = arguments.length <= 2 || arguments[2] === undefined ? n : arguments[2];
  return Math.max(Math.min(n, max), min);
};

const springConfig = [500, 30];

const SortablePane = (_Component) => {
  _inherits(SortablePane, _Component);

  function SortablePane(props) {
    _classCallCheck(this, SortablePane);

    const _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SortablePane).call(this, props));

    _this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      isResizing: false,
      panes: _this.props.children.map((child, order) => ({
        id: child.props.id,
        width: child.props.width,
        height: child.props.height,
        order
      }))
    };
    _this.hasAdded = false;
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);

    window.addEventListener('touchmove', _this.handleTouchMove);
    window.addEventListener('touchend', _this.handleMouseUp);
    window.addEventListener('mousemove', _this.handleMouseMove);
    window.addEventListener('mouseup', _this.handleMouseUp);
    return _this;
  }

  _createClass(SortablePane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setSize();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(next) {
      const panes = this.state.panes;

      if (next.children.length > panes.length) return this.addPane(next);
      if (next.children.length < panes.length) return this.removePane(next);
      return null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.hasAdded) {
        this.hasAdded = false;
        this.setSize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
    }
  }, {
    key: 'onResize',
    value: function onResize(i, dir, size, rect) {
      let panes = this.state.panes;

      const order = this.getPanePropsArrayOf('order');
      panes = panes.map((pane, index) => {
        if (order.indexOf(i) === index) {
          return {
            width: rect.width,
            height: rect.height,
            order: pane.order,
            id: pane.id
          };
        }
        return pane;
      });
      this.setState({ panes });
      this.props.onResize({ id: panes[order.indexOf(i)].id, dir, size, rect });
    }
  }, {
    key: 'getPanePropsArrayOf',
    value: function getPanePropsArrayOf(key) {
      return this.state.panes.map((pane) => pane[key]);
    }
  }, {
    key: 'getPaneSizeList',
    value: function getPaneSizeList() {
      const width = this.getPanePropsArrayOf('width');
      const height = this.getPanePropsArrayOf('height');
      return this.isHorizontal() ? width : height;
    }
  }, {
    key: 'getItemCountByPosition',
    value: function getItemCountByPosition(position) {
      const size = this.getPaneSizeList();
      const margin = this.props.margin;

      let sum = 0;
      if (position < 0) return 0;
      for (let i = 0; i < size.length; i++) {
        sum += size[i] + margin;
        if (sum >= position) return i + 1;
      }
      return size.length;
    }
  }, {
    key: 'setSize',
    value: function setSize() {
      const _this2 = this;

      const panes = this.props.children.map((child, i) => {
        const _refs$panes$children$ = _this2.refs.panes.children[i].getBoundingClientRect();

        const width = _refs$panes$children$.width;
        const height = _refs$panes$children$.height;

        return {
          id: child.props.id,
          width,
          height,
          order: i
        };
      });
      if (!(0, _lodash2.default)(panes, this.state.panes)) this.setState({ panes });
    }
  }, {
    key: 'getItemPositionByIndex',
    value: function getItemPositionByIndex(index) {
      const size = this.getPaneSizeList();
      let sum = 0;
      for (let i = 0; i < index; i++) {
        sum += size[i] + this.props.margin;
      } return sum;
    }
  }, {
    key: 'isHorizontal',
    value: function isHorizontal() {
      return this.props.direction === 'horizontal';
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(panes, index, mode) {
      return panes.map((pane) => {
        if (pane.order >= index) {
          const id = pane.id;
          const width = pane.width;
          const height = pane.height;
          const order = pane.order;

          return { id, width, height, order: mode === 'add' ? order + 1 : order - 1 };
        }
        return pane;
      });
    }
  }, {
    key: 'addPane',
    value: function addPane(next) {
      const _this3 = this;

      let newPanes = this.state.panes;
      next.children.forEach((child, i) => {
        const ids = _this3.state.panes.map((pane) => pane.id);
        if (ids.indexOf(child.props.id) === -1) {
          newPanes = _this3.updateOrder(newPanes, i, 'add');
          const _child$props = child.props;
          const id = _child$props.id;
          const width = _child$props.width;
          const height = _child$props.height;

          const pane = { id, width, height, order: i };
          newPanes.splice(i, 0, pane);
        }
      });
      this.setState({ panes: newPanes });
      this.hasAdded = true;
    }
  }, {
    key: 'removePane',
    value: function removePane(next) {
      const _this4 = this;

      let newPanes = void 0;
      this.state.panes.forEach((pane, i) => {
        const ids = next.children.map(child => child.props.id);
        if (ids.indexOf(pane.id) === -1) {
          newPanes = _this4.updateOrder(_this4.state.panes, i, 'remove');
          newPanes.splice(i, 1);
        }
      });
      this.setState({ panes: newPanes });
    }
  }, {
    key: 'handleResizeStart',
    value: function handleResizeStart(i) {
      const order = this.getPanePropsArrayOf('order');
      this.setState({ isResizing: true });
      this.props.onResizeStart({ id: this.state.panes[order.indexOf(i)].id });
    }
  }, {
    key: 'handleResizeStop',
    value: function handleResizeStop(i, dir, size, rect) {
      const panes = this.state.panes;

      const order = this.getPanePropsArrayOf('order');
      this.setState({ isResizing: false });
      this.props.onResizeStop({ id: panes[order.indexOf(i)].id, dir, size, rect });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(_ref2) {
      const pageX = _ref2.pageX;
      const pageY = _ref2.pageY;
      const _state = this.state;
      const isPressed = _state.isPressed;
      const delta = _state.delta;
      const lastPressed = _state.lastPressed;
      const isResizing = _state.isResizing;
      const panes = _state.panes;
      const onOrderChange = this.props.onOrderChange;

      if (isPressed && !isResizing) {
        const mouse = this.isHorizontal() ? pageX - delta : pageY - delta;
        const length = this.props.children.length;

        const order = this.getPanePropsArrayOf('order');
        const row = clamp(Math.round(this.getItemCountByPosition(mouse)), 0, length - 1);
        const newPanes = reinsert(panes, order.indexOf(lastPressed), row);
        this.setState({ mouse, panes: newPanes });
        if (!(0, _lodash2.default)(panes, newPanes)) onOrderChange(panes, newPanes);
      }
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(key, pressLocation, e) {
      this.handleMouseDown(key, pressLocation, e.touches[0]);
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      this.handleMouseMove(e.touches[0]);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp() {
      this.setState({ isPressed: false, delta: 0 });
    }
  }, {
    key: 'renderPanes',
    value: function renderPanes() {
      const _this5 = this;

      const _state2 = this.state;
      const mouse = _state2.mouse;
      const isPressed = _state2.isPressed;
      const lastPressed = _state2.lastPressed;

      const order = this.getPanePropsArrayOf('order');
      const _props = this.props;
      const children = _props.children;
      const disableEffect = _props.disableEffect;

      return children.map((child, i) => {
        const springPosition = (0, _reactMotion.spring)(_this5.getItemPositionByIndex(order.indexOf(i)), springConfig);
        const style = lastPressed === i && isPressed ? {
          scale: disableEffect ? 1 : (0, _reactMotion.spring)(1.05, springConfig),
          shadow: disableEffect ? 0 : (0, _reactMotion.spring)(16, springConfig),
          x: _this5.isHorizontal() ? mouse : 0,
          y: !_this5.isHorizontal() ? mouse : 0
        } : {
          scale: (0, _reactMotion.spring)(1, springConfig),
          shadow: (0, _reactMotion.spring)(0, springConfig),
          x: _this5.isHorizontal() ? springPosition : 0,
          y: !_this5.isHorizontal() ? springPosition : 0
        };
        return _react2.default.createElement(
          _reactMotion.Motion,
          { style, key: child.props.id },
          (_ref3) => {
            const scale = _ref3.scale;
            const shadow = _ref3.shadow;
            const x = _ref3.x;
            const y = _ref3.y;

            const onResize = _this5.onResize.bind(_this5, i);
            const onMouseDown = _this5.handleMouseDown.bind(_this5, i, x, y);
            const onTouchStart = _this5.handleTouchStart.bind(_this5, i, x, y);
            const onResizeStart = _this5.handleResizeStart.bind(_this5, i);
            const onResizeStop = _this5.handleResizeStop.bind(_this5, i);
            return _react2.default.createElement(
              _reactResizableBox2.default,
              {
                customClass: child.props.className,
                onResize,
                isResizable: _this5.props.isResizable,
                width: child.props.width,
                height: child.props.height,
                minWidth: child.props.minWidth,
                minHeight: child.props.minHeight,
                maxWidth: child.props.maxWidth,
                maxHeight: child.props.maxHeight,
                customStyle: Object.assign(child.props.style, {
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px ' + shadow + 'px ' + 2 * shadow + 'px 0px',
                  transform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
                  WebkitTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
                  MozTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
                  MsTransform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ')',
                  zIndex: i === lastPressed ? 99 : i, // TODO: Add this.props.zIndex
                  position: 'absolute'
                }),
                onMouseDown,
                onTouchStart,
                onResizeStart,
                onResizeStop
              },
              child.props.children
            );
          }
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      const _props2 = this.props;
      const style = _props2.style;
      const className = _props2.className;

      return _react2.default.createElement(
        'div',
        {
          ref: 'panes',
          className,
          style
        },
        this.renderPanes()
      );
    }
  }]);

  return SortablePane;
}(_react.Component);

SortablePane.propTypes = {
  direction: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  margin: _react.PropTypes.number,
  style: _react.PropTypes.object,
  children: _react.PropTypes.array,
  onResizeStart: _react.PropTypes.func,
  onResize: _react.PropTypes.func,
  onResizeStop: _react.PropTypes.func,
  disableEffect: _react.PropTypes.bool,
  onOrderChange: _react.PropTypes.func,
  className: _react.PropTypes.string,
  isResizable: _react.PropTypes.shape({
    x: _react2.default.PropTypes.bool,
    y: _react2.default.PropTypes.bool,
    xy: _react2.default.PropTypes.bool
  })
};
SortablePane.defaultProps = {
  direction: 'horizontal',
  margin: 0,
  onClick: function onClick() {
    return null;
  },
  onTouchStart: function onTouchStart() {
    return null;
  },
  onResizeStart: function onResizeStart() {
    return null;
  },
  onResize: function onResize() {
    return null;
  },
  onResizeStop: function onResizeStop() {
    return null;
  },
  onOrderChange: function onOrderChange() {
    return null;
  },
  customStyle: {},
  className: '',
  disableEffect: false,
  isResizable: {
    x: true,
    y: true,
    xy: true
  }
};
exports.Pane = _pane2.default;
exports.SortablePane = SortablePane;
