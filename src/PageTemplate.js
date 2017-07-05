import { compose } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Remarkable from 'remarkable';

import * as templates from './reducers/templates';

const PageTemplate = ({ contents, template }) => {
  let result;

  switch (template.type) {
    case 'cell':
      result = (
        <div
          className="page-template cell"
          dangerouslySetInnerHTML={{ __html: new Remarkable().render(contents) }}
        />
      );
      break;

    case 'column':
      result = (
        <div className="page-template column">
          {template.items.map((item, idx) => (
            <PageTemplate key={idx} contents={contents[idx]} template={item} />
          ))}
        </div>
      );
      break;

    case 'row':
      result = (
        <div className="page-template row">
          {template.items.map((item, idx) => (
            <PageTemplate key={idx} contents={contents[idx]} template={item} />
          ))}
        </div>
      );
      break;

    case 'template':
      result = (
        <ConnectedPageTemplate contents={contents} templateId={template.template} />
      );
      break;

    default:
      result = (
        <div className="page-template debug">
          <pre>{JSON.stringify({ contents, template }, undefined, 2)}</pre>
        </div>
      );
      break;
  }

  return result;
};

PageTemplate.defaultProps = {
  contents: '',
  template: {},
};

const mapStateToProps = (state, { template, templateId }) => ({
  template: templateId ? (templates.getTemplate(state, templateId) || {}).spec : template,
});

const ConnectedPageTemplate = compose(
  connect(mapStateToProps),
)(PageTemplate);

export default ConnectedPageTemplate;
