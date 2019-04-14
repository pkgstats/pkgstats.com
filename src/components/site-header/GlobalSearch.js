import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchInput = styled.input`
  appearance: none;
  background: transparent;
  border: 0;
  border-radius: 0;
  margin: 0;
  padding: 1rem 2rem;

  flex: 1;
  font-family: var(--font-family-mono);
  font-size: 1.6rem;
  color: var(--color-white);
  // width: 100%;
  height: 6rem;
  transition: background-color 0.2s ease-in-out;

  &:focus {
    outline: none;
    background-color: #111;
  }
`;

class GlobalSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.search,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.search !== this.state.text) {
    //   this.setState({
    //     text: this.props.search,
    //   });
    // }
  }

  onInputChange(evt)  {
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
      <SearchInput
        type="text"
        name="text"
        placeholder="Search packages | pkg:[package-name] | @[username]"
        value={text}
        onChange={this.onInputChange}
      />
    );
  }
}

GlobalSearch.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func,
};

GlobalSearch.defaultProps = {
  search: '',
  onChange: () => {},
};

export default GlobalSearch;
