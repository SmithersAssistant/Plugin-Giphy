'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var GIPHY_COMPONENT = 'com.robinmalfait.giphy';

exports.default = function (robot) {
  var enhance = robot.enhance;
  var restorableComponent = robot.restorableComponent;
  var withStyles = robot.withStyles;
  var A = robot.UI.A;
  var React = robot.dependencies.React;
  var Blank = robot.cards.Blank;


  var Giphy = React.createClass({
    displayName: 'Giphy',
    getInitialState: function getInitialState() {
      return {
        q: this.props.q,
        images: []
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      var params = robot.httpBuildQuery({
        q: this.state.q,
        api_key: 'dc6zaTOxFJmzC' // The public beta key is "dc6zaTOxFJmzC" ref: https://github.com/Giphy/GiphyAPI
      });

      robot.fetchJson('http://api.giphy.com/v1/gifs/search?' + params).then(function (res) {
        _this.setState({
          images: res.data.map(function (img) {
            return {
              src: img.images.fixed_height.url,
              url: img.url
            };
          })
        });
      });
    },
    renderTitle: function renderTitle() {
      return React.createElement(
        'span',
        null,
        'Giphy',
        React.createElement(
          'small',
          { className: this.props.styles.searchQuery },
          '(',
          this.props.q,
          ')'
        )
      );
    },
    render: function render() {
      var _props = this.props;
      var styles = _props.styles;
      var q = _props.q;

      var other = _objectWithoutProperties(_props, ['styles', 'q']);

      var images = this.state.images;


      return React.createElement(
        Blank,
        _extends({}, other, {
          title: this.renderTitle()
        }),
        React.createElement(
          'ul',
          { className: styles.cardImagesStyles },
          React.createElement(
            'div',
            { className: styles.imagesStyles },
            images && images.map(function (img, i) {
              return React.createElement(
                A,
                { target: '_blank', href: img.url },
                React.createElement('img', { className: styles.imgStyles, key: i, src: img.src })
              );
            })
          )
        )
      );
    }
  });

  robot.registerComponent(enhance(Giphy, [restorableComponent, withStyles(_styles2.default)]), GIPHY_COMPONENT);

  robot.listen(/^giphy (.*)$/, {
    description: "search for gifs",
    usage: 'giphy <search_query>'
  }, function (res) {
    robot.addCard(GIPHY_COMPONENT, {
      q: (res.matches[1] || '').trim()
    });
  });
};