import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  handleOnclick() {
    this.props.handleSearchInput(this.state.value);
    this.setState({ value: '' });
  }

  handleKeyInput(e) {
    if (e.key === 'Enter') {
      this.props.handleSearchInput(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
    <div>
      <div type="text" className="form-group">
        <input className="form-control" placeholder="Search"
          type="text" value={this.state.value}
          onKeyPress={this.handleKeyInput.bind(this)}
          onChange={this.handleInputChange.bind(this)} />
      </div>
      <button type="submit" className="btn btn-default" onClick={this.handleOnclick.bind(this)}>Submit</button>
    </div>       

    );
  }
}

export default Search;