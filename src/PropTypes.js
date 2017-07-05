import PropTypes from 'prop-types';

export const article = PropTypes.shape({
  pages: PropTypes.arrayOf(PropTypes.string),
});

const pageContentsTypes = [
  PropTypes.string,
];

export const pageContents = PropTypes.oneOfType(pageContentsTypes);
pageContentsTypes.push(PropTypes.arrayOf(pageContents));

const templateTypes = [];
export const pageTemplate = PropTypes.oneOfType(templateTypes);
templateTypes.push(PropTypes.shape({
  type: PropTypes.oneOf(['cell']).isRequired,
}));
templateTypes.push(PropTypes.shape({
  type: PropTypes.oneOf(['column', 'row']).isRequired,
  items: PropTypes.arrayOf(pageTemplate).isRequired,
}));
templateTypes.push(PropTypes.shape({
  type: PropTypes.oneOf(['template']).isRequired,
  template: PropTypes.string.isRequired,
}));

export const page = PropTypes.shape({
  contents: pageContents.isRequired,
  template: pageTemplate.isRequired,
});
