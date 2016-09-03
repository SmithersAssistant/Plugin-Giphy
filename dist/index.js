'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var GIPHY_COMPONENT = 'com.robinmalfait.giphy';

exports.default = function (robot) {
  var React = robot.dependencies.React;
  var Images = robot.cards.Images;


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
        var images = res.data.map(function (img) {
          return img.images.fixed_height.url;
        });

        _this.setState({ images: images });
      });
    },
    renderTitle: function renderTitle() {
      return React.createElement(
        'span',
        null,
        'Giphy',
        React.createElement(
          'small',
          { style: { marginLeft: 8, color: "#ccc" } },
          '(',
          this.props.q,
          ')'
        )
      );
    },
    render: function render() {
      var other = _objectWithoutProperties(this.props, []);

      var images = this.state.images;


      return React.createElement(Images, _extends({}, other, {
        title: this.renderTitle(),
        images: images
      }));
    }
  });

  robot.registerComponent(Giphy, GIPHY_COMPONENT);

  robot.listen(/^giphy (.*)$/, {
    description: "search for gifs",
    usage: 'giphy <search_query>'
  }, function (res) {
    robot.addCard(GIPHY_COMPONENT, {
      q: (res.matches[1] || '').trim()
    });
  });
};