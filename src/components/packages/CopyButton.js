import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import cleanProps from 'clean-react-props';

class CopyButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
    };

    this.copyButton = React.createRef();

    this.onCopySuccess = this.onCopySuccess.bind(this);
  }

  componentDidMount() {
    const {
      textCallback,
    } = this.props;

    this.clipboard = new Clipboard(this.copyButton.current, {
      text: textCallback,
    });

    this.clipboard.on('success', this.onCopySuccess);
  }

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  onCopySuccess() {
    const {
      notificationDelay,
      target,
    } = this.props;

    this.setState({
      copied: true,
    });

    const selection = window.getSelection();
    selection.collapseToEnd();

    setTimeout(() => {
      this.setState({
        copied: false,
      });
    }, notificationDelay);
  }

  render() {
    const {
      children,
      target,
      ...props
    } = this.props;

    const {
      copied,
    } = this.state;

    return (
      <button
        {...cleanProps(props)}
        data-clipboard-target={target}
        data-copied={copied}
        ref={this.copyButton}
      >
        {children}
      </button>
    );
  }
}

CopyButton.propTypes = {
  notificationDelay: PropTypes.number,
  target: PropTypes.string,
  textCallback: PropTypes.func,
};

CopyButton.defaultProps = {
  notificationDelay: 2500,
};

export default CopyButton;
