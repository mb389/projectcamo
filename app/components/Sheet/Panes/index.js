'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortablePane = exports.Pane = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _reactResizableBox = require('react-resizable-box');

var _reactResizableBox2 = _interopRequireDefault(_reactResizableBox);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _pane = require('./pane');

var _pane2 = _interopRequireDefault(_pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reinsert = function reinsert(array, from, to) {
  var a = array.slice(0);
  var v = a[from];
  a.splice(from, 1);
  a.splice(to, 0, v);
  return a;
};

var clamp = function clamp(n) {
  var min = arguments.length <= 1 || arguments[1] === undefined ? n : arguments[1];
  var max = arguments.length <= 2 || arguments[2] === undefined ? n : arguments[2];
  return Math.max(Math.min(n, max), min);
};

var springConfig = [500, 30];

var SortablePane = function (_Component) {
  _inherits(SortablePane, _Component);

  function SortablePane(props) {
    _classCallCheck(this, SortablePane);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SortablePane).call(this, props));

    _this.state = {
      delta: 0,
      mouse: 0,
      isPressed: false,
      lastPressed: 0,
      isResizing: false,
      panes: _this.props.children.map(function (child, order) {
        return {
          id: child.props.id,
          width: child.props.width,
          height: child.props.height,
          order: order
        };
      })
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
      var panes = this.state.panes;

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
      var panes = this.state.panes;

      var order = this.getPanePropsArrayOf('order');
      panes = panes.map(function (pane, index) {
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
      this.setState({ panes: panes });
      this.props.onResize({ id: panes[order.indexOf(i)].id, dir: dir, size: size, rect: rect });
    }
  }, {
    key: 'getPanePropsArrayOf',
    value: function getPanePropsArrayOf(key) {
      return this.state.panes.map(function (pane) {
        return pane[key];
      });
    }
  }, {
    key: 'getPaneSizeList',
    value: function getPaneSizeList() {
      var width = this.getPanePropsArrayOf('width');
      var height = this.getPanePropsArrayOf('height');
      return this.isHorizontal() ? width : height;
    }
  }, {
    key: 'getItemCountByPosition',
    value: function getItemCountByPosition(position) {
      var size = this.getPaneSizeList();
      var margin = this.props.margin;

      var sum = 0;
      if (position < 0) return 0;
      for (var i = 0; i < size.length; i++) {
        sum += size[i] + margin;
        if (sum >= position) return i + 1;
      }
      return size.length;
    }
  }, {
    key: 'setSize',
    value: function setSize() {
      var _this2 = this;

      var panes = this.props.children.map(function (child, i) {
        var _refs$panes$children$ = _this2.refs.panes.children[i].getBoundingClientRect();

        var width = _refs$panes$children$.width;
        var height = _refs$panes$children$.height;

        return {
          id: child.props.id,
          width: width,
          height: height,
          order: i
        };
      });
      if (!(0, _lodash2.default)(panes, this.state.panes)) this.setState({ panes: panes });
    }
  }, {
    key: 'getItemPositionByIndex',
    value: function getItemPositionByIndex(index) {
      var size = this.getPaneSizeList();
      var sum = 0;
      for (var i = 0; i < index; i++) {
        sum += size[i] + this.props.margin;
      }return sum;
    }
  }, {
    key: 'isHorizontal',
    value: function isHorizontal() {
      return this.props.direction === 'horizontal';
    }
  }, {
    key: 'updateOrder',
    value: function updateOrder(panes, index, mode) {
      return panes.map(function (pane) {
        if (pane.order >= index) {
          var id = pane.id;
          var width = pane.width;
          var height = pane.height;
          var order = pane.order;

          return { id: id, width: width, height: height, order: mode === 'add' ? order + 1 : order - 1 };
        }
        return pane;
      });
    }
  }, {
    key: 'addPane',
    value: function addPane(next) {
      var _this3 = this;

      var newPanes = this.state.panes;
      next.children.forEach(function (child, i) {
        var ids = _this3.state.panes.map(function (pane) {
          return pane.id;
        });
        if (ids.indexOf(child.props.id) === -1) {
          newPanes = _this3.updateOrder(newPanes, i, 'add');
          var _child$props = child.props;
          var id = _child$props.id;
          var width = _child$props.width;
          var height = _child$props.height;

          var pane = { id: id, width: width, height: height, order: i };
          newPanes.splice(i, 0, pane);
        }
      });
      this.setState({ panes: newPanes });
      this.hasAdded = true;
    }
  }, {
    key: 'removePane',
    value: function removePane(next) {
      var _this4 = this;

      var newPanes = void 0;
      this.state.panes.forEach(function (pane, i) {
        var ids = next.children.map(function (child) {
          return child.props.id;
        });
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
      var order = this.getPanePropsArrayOf('order');
      this.setState({ isResizing: true });
      this.props.onResizeStart({ id: this.state.panes[order.indexOf(i)].id });
    }
  }, {
    key: 'handleResizeStop',
    value: function handleResizeStop(i, dir, size, rect) {
      var panes = this.state.panes;

      var order = this.getPanePropsArrayOf('order');
      this.setState({ isResizing: false });
      this.props.onResizeStop({ id: panes[order.indexOf(i)].id, dir: dir, size: size, rect: rect });
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(pos, pressX, pressY, _ref) {
      // var pageX = _ref.pageX;
      // var pageY = _ref.pageY;
      //
      // this.setState({
      //   delta: this.isHorizontal() ? pageX - pressX : pageY - pressY,
      //   mouse: this.isHorizontal() ? pressX : pressY,
      //   isPressed: true,
      //   lastPressed: pos
      // });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(_ref2) {
      var pageX = _ref2.pageX;
      var pageY = _ref2.pageY;
      var _state = this.state;
      var isPressed = _state.isPressed;
      var delta = _state.delta;
      var lastPressed = _state.lastPressed;
      var isResizing = _state.isResizing;
      var panes = _state.panes;
      var onOrderChange = this.props.onOrderChange;

      if (isPressed && !isResizing) {
        var mouse = this.isHorizontal() ? pageX - delta : pageY - delta;
        var length = this.props.children.length;

        var order = this.getPanePropsArrayOf('order');
        var row = clamp(Math.round(this.getItemCountByPosition(mouse)), 0, length - 1);
        var newPanes = reinsert(panes, order.indexOf(lastPressed), row);
        this.setState({ mouse: mouse, panes: newPanes });
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
      var _this5 = this;

      var _state2 = this.state;
      var mouse = _state2.mouse;
      var isPressed = _state2.isPressed;
      var lastPressed = _state2.lastPressed;

      var order = this.getPanePropsArrayOf('order');
      var _props = this.props;
      var children = _props.children;
      var disableEffect = _props.disableEffect;

      return children.map(function (child, i) {
        var springPosition = (0, _reactMotion.spring)(_this5.getItemPositionByIndex(order.indexOf(i)), springConfig);
        var style = lastPressed === i && isPressed ? {
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
          { style: style, key: child.props.id },
          function (_ref3) {
            var scale = _ref3.scale;
            var shadow = _ref3.shadow;
            var x = _ref3.x;
            var y = _ref3.y;

            var onResize = _this5.onResize.bind(_this5, i);
            var onMouseDown = _this5.handleMouseDown.bind(_this5, i, x, y);
            var onTouchStart = _this5.handleTouchStart.bind(_this5, i, x, y);
            var onResizeStart = _this5.handleResizeStart.bind(_this5, i);
            var onResizeStop = _this5.handleResizeStop.bind(_this5, i);
            return _react2.default.createElement(
              _reactResizableBox2.default,
              {
                customClass: child.props.className,
                onResize: onResize,
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
                onMouseDown: onMouseDown,
                onTouchStart: onTouchStart,
                onResizeStart: onResizeStart,
                onResizeStop: onResizeStop
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
      var _props2 = this.props;
      var style = _props2.style;
      var className = _props2.className;

      return _react2.default.createElement(
        'div',
        {
          ref: 'panes',
          className: className,
          style: style
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
