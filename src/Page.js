import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router'

import Paper from 'material-ui/Paper';

import AppBar from './AppBar';
import PageTemplate from './PageTemplate';
import * as pages from './reducers/pages';

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

const mapStateToProps = (state, { pageId }) => ({
  page: pages.getPage(state, pageId),
});

const ConnectedPage = compose(
  connect(mapStateToProps)
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
    const { page, ratio } = this.props;
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

export default PageWrapper;
