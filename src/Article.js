import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { withRouter } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import AppBar from './AppBar';
import Page from './Page';
import * as articles from './reducers/articles';

const VirtualSwipeableViews = virtualize(SwipeableViews);

const slideRenderer = article => ({ key, index }) => (
  <Page key={key} pageId={article.pages[index]} ratio={297/210} />
);

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
    const { history, article } = this.props;
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

const mapStateToProps = (state, { articleId }) => ({
  article: articles.getArticle(state, articleId),
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Article);
