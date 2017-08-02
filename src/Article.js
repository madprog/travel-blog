import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import AppBar from './AppBar';
import * as CanadaPropTypes from './PropTypes';
import Page from './Page';

const VirtualSwipeableViews = virtualize(SwipeableViews);

const slideRenderer = article => {
  const SlideRenderer = ({ key, index }) => (
    <Page key={key} pageId={article.pages[index]} ratio={297/210} />
  );

  SlideRenderer.propTypes = {
    key: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return SlideRenderer;
};

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };

    this.onChangeIndex = this.onChangeIndex.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.articleId !== this.props.articleId) {
      this.setState({
        ...this.state,
        index: 0,
      });
    }
  }

  onChangeIndex(index) {
    this.setState({
      ...this.state,
      index,
    });
  }

  onNextPage() {
    const index = Math.min(this.props.article.pages.length - 1, this.state.index + 1);
    this.setState({
      ...this.state,
      index,
    });
  }

  onPreviousPage() {
    const index = Math.max(0, this.state.index - 1);
    this.setState({
      ...this.state,
      index,
    });
  }

  render() {
    const { article } = this.props;
    const { index } = this.state;

    return (
      <div className="article">
        <AppBar />
        {article.pages.length > 0 ? (
          <div className="pages">
            <RaisedButton
              icon={<NavigationChevronLeft />}
              onTouchTap={this.onPreviousPage}
              style={{ minWidth: 36 }}
            />
            <VirtualSwipeableViews
              className="swipeable-views"
              index={index}
              onChangeIndex={this.onChangeIndex}
              slideCount={article.pages.length}
              slideRenderer={slideRenderer(article)}
              slideStyle={{
                display: 'flex',
                flexDirection: 'column',
              }}
            />
            <RaisedButton
              icon={<NavigationChevronRight />}
              onTouchTap={this.onNextPage}
              style={{ minWidth: 36 }}
            />
          </div>
        ) : (
          <div className="pages">No page in this article</div>
        )}
      </div>
    );
  }
}

Article.defaultProps = {
  article: {
    pages: [],
  },
};

Article.propTypes = {
  article: CanadaPropTypes.article.isRequired,
  articleId: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  connect(undefined),
)(Article);
