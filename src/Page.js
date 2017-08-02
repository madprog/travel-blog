import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Paper from 'material-ui/Paper';

import * as CanadaPropTypes from './PropTypes';
import PageTemplate from './PageTemplate';

const Page = ({ height, page, width }) => (
  <Paper
    className="paper"
    style={{
      height: height,
      width: width,
    }}
    zDepth={3}
  >
    <PageTemplate contents={page.contents} template={page.template} />
  </Paper>
);

Page.defaultProps = {
  height: '100%',
  page: {},
  width: '100%',
};

Page.propTypes = {
  height: PropTypes.number.isRequired,
  page: CanadaPropTypes.page.isRequired,
  width: PropTypes.number.isRequired,
};

const ConnectedPage = compose(
  connect(undefined),
)(Page);

class PageWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.page_wrapper = undefined;
    this.state = {
      wrapper_width: 100,
      wrapper_height: 100,
    };
    this.setSize = this.setSize.bind(this);
  }

  setSize() {
    this.setState({
      wrapper_height: 0.9 * this.page_wrapper.offsetHeight,
      wrapper_width: 0.9 * this.page_wrapper.offsetWidth,
    });
  }

  componentDidMount() {
    this.setSize();
    window.addEventListener('resize', this.setSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize);
    this.page_wrapper = undefined;
  }

  render() {
    const { ratio } = this.props;
    const { wrapper_height, wrapper_width } = this.state;
    const width_from_height = wrapper_height * ratio;
    const height_from_width = wrapper_width / ratio;

    let width, height;
    if (width_from_height > wrapper_width) {
      height = height_from_width;
      width = wrapper_width;
    } else {
      height = wrapper_height;
      width = width_from_height;
    }

    return (
      <div className="page-wrapper" ref={(page_wrapper) => { this.page_wrapper = page_wrapper; }}>
        <ConnectedPage {...this.props} width={width} height={height} />
      </div>
    );
  }
}

PageWrapper.propTypes = {
  pageId: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
};

export default PageWrapper;
