import React from 'react'

const GIPHY_COMPONENT = 'com.robinmalfait.giphy';

export default robot => {

  const { Images } = robot.cards;

  const Giphy = React.createClass({
    getInitialState() {
      return {
        q: this.props.q,
        images: []
      }
    },
    componentDidMount() {
      const params = robot.httpBuildQuery({
        q: this.state.q,
        api_key: 'dc6zaTOxFJmzC' // The public beta key is "dc6zaTOxFJmzC" ref: https://github.com/Giphy/GiphyAPI
      });

      robot.fetchJson(`http://api.giphy.com/v1/gifs/search?${params}`)
        .then(res => {
          const images = res.data.map(img => img.images.fixed_height.url);

          this.setState({ images });
        });
    },
    renderTitle() {
      return (
        <span>
          Giphy
          <small style={{marginLeft: 8, color: "#ccc"}}>({this.props.q})</small>
        </span>
      )
    },
    render() {
      let { ...other } = this.props
      let { images } = this.state

      return (
        <Images
          {...other}
          title={this.renderTitle()}
          images={images}
        />
      )
    }
  });

  robot.registerComponent(Giphy, GIPHY_COMPONENT);

  robot.listen(/^giphy (.*)$/, {
    description: "search for gifs",
    usage: 'giphy <search_query>'
  }, (res) => {
    robot.addCard(GIPHY_COMPONENT, {
      q: (res.matches[1] || '').trim()
    });
  });
}
