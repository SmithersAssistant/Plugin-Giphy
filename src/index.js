import styles from './styles';
const GIPHY_COMPONENT = 'com.robinmalfait.giphy';

export default robot => {
  const { enhance, restorableComponent, withStyles } = robot;
  const { A } = robot.UI;
  const { React } = robot.dependencies
  const { Blank } = robot.cards;

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
          this.setState({
            images: res.data.map(img => {
              return {
                src: img.images.fixed_height.url,
                url: img.url
              };
            })
          });
        });
    },
    renderTitle() {
      return (
        <span>
          Giphy
          <small className={this.props.styles.searchQuery}>({this.props.q})</small>
        </span>
      )
    },
    render() {
      let { styles, q, ...other } = this.props
      let { images } = this.state

      return (
        <Blank
          {...other}
          title={this.renderTitle()}
        >
          <ul className={styles.cardImagesStyles}>
            <div className={styles.imagesStyles}>
              {images && images.map((img, i) => (
                <A target="_blank" href={img.url}>
                  <img className={styles.imgStyles} key={i} src={img.src} />
                </A>
              ))}
            </div>
          </ul>
        </Blank>
      )
    }
  });

  robot.registerComponent(enhance(Giphy, [
    restorableComponent,
    withStyles(styles)
  ]), GIPHY_COMPONENT);

  robot.listen(/^giphy (.*)$/, {
    description: "search for gifs",
    usage: 'giphy <search_query>'
  }, (res) => {
    robot.addCard(GIPHY_COMPONENT, {
      q: (res.matches[ 1 ] || '').trim()
    });
  });
}
