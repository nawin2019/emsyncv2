import React, {Component} from 'react';
import {Feed, Card, Input, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {GiphyResultsList} from './giphyResultsList';
import {search, getTrending} from '../store/giphy';

class GiphySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: '',
      selected: ''
    };
    this.keyPress = this.keyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.onClick = this.onClick.bind(this);
  }
  handleClick = async e => {
    e.preventDefault();
    await this.props.search(this.state.searchParams);
    this.setState({searchParams: ''});
  };

  async componentDidMount() {
    await this.props.getTrending();
  }

  keyPress = async e => {
    if (e.keyCode === 13) {
      await this.props.search(this.state.searchParams);
      this.setState({searchParams: ''});
    }
  };

  handleChange = e => {
    this.setState({searchParams: e.target.value});
  };
  render() {
    return (
      <Feed>
        <Card.Content>
          <Feed.Event>
            <Feed.Content>
              <div className="ui icon input">
                <Input
                  type="text"
                  placeholder="search GIPHY"
                  value={this.state.searchParams}
                  onChange={this.handleChange}
                  onKeyDown={this.keyPress}
                />
                <i
                  className="inverted circular search link icon"
                  onClick={this.handleClick}
                />
              </div>
            </Feed.Content>
          </Feed.Event>
        </Card.Content>
        {this.props.gifs ? (
          <Card.Content>
            <Feed.Event>
              <Feed.Content>
                <Button>
                  <GiphyResultsList
                    results={this.props.gifs}
                    clicker={this.props.clicker}
                  />
                </Button>
              </Feed.Content>
            </Feed.Event>
          </Card.Content>
        ) : (
          <p>Search GIPHY</p>
        )}
      </Feed>
    );
  }
}

const mapStateToProps = state => ({
  gifs: state.giphy.results
});

const mapDispatchToProps = dispatch => ({
  search: searchParams => dispatch(search(searchParams)),
  getTrending: () => dispatch(getTrending())
});

export default connect(mapStateToProps, mapDispatchToProps)(GiphySearch);
