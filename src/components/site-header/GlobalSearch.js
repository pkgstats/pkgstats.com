import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GlobalSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(evt)  {
    console.debug('onInputChange', evt);

    this.setState({
      [evt.target.name]: evt.target.value,
    }, () => {
      this.props.onChange(this.state.text);
    });
  }

  render() {
    const {
      text,
    } = this.state;

    return (
      <input
        type="text"
        name="text"
        value={text}
        onChange={this.onInputChange}
      />
    );
  }
}

GlobalSearch.propTypes = {
  onChange: PropTypes.func,
};

GlobalSearch.defaultProps = {
  onChange: () => {},
};

export default GlobalSearch;
