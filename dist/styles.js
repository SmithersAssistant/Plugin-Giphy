'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var gap = 16;

exports.default = function (_ref) {
  var px = _ref.px;
  return {
    searchQuery: {
      marginLeft: 8,
      color: "#ccc"
    },
    cardImagesStyles: {
      margin: 0,
      padding: 0
    },
    imagesStyles: {
      lineHeight: 0,
      columnCount: 5,
      columnGap: gap,
      '@media (max-width: 1200px)': {
        columnCount: 4
      },
      '@media (max-width: 1000px)': {
        columnCount: 3
      },
      '@media (max-width: 800px)': {
        columnCount: 2
      },
      '@media (max-width: 400px)': {
        columnCount: 1
      }
    },
    imgStyles: {
      width: '100%',
      height: 'auto',
      margin: px(gap / 2, 0)
    }
  };
};