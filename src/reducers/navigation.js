export const getTitle = (state, currentPath) => {
  const section_match = currentPath.match('^/s/([^/]+)$');
  const article_match = currentPath.match('^/a/([^/]+)$');
  let ret;

  if (currentPath === '/') {
    ret = 'Accueil';
  } else if (section_match) {
    const sectionId = section_match[1];
    const section = state.entities.sections[sectionId] || {};
    ret = section.name || sectionId;
  } else if (article_match) {
    const articleId = article_match[1];
    const article = state.entities.articles[articleId] || {};
    ret = article.name || articleId;
  }

  return ret;
};

export const getPreviousPage = (state, currentPath) => {
  const section_match = currentPath.match('^/s/([^/]+)$');
  const article_match = currentPath.match('^/a/([^/]+)$');
  let ret;

  if (
    state.entities === undefined
    || state.entities.articles === undefined
    || state.entities.sections === undefined
  ) {
    return undefined;
  }

  if (section_match) {
    const sectionId = section_match[1];
    const section = state.entities.sections[sectionId];

    if (section === undefined) {
      return undefined;
    }

    const idx_section_in_book = state.book.indexOf(section.id);

    if (idx_section_in_book > 0) {
      const prev_section_id = state.book[idx_section_in_book - 1];
      const prev_section = state.entities.sections[prev_section_id];

      if (prev_section.articles.length > 0) {
        ret = '/a/' + prev_section.articles[prev_section.articles.length - 1];
      } else {
        ret = '/s/' + prev_section.id;
      }
    } else if (idx_section_in_book == 0) {
      ret = '/';
    }
  } else if (article_match) {
    const articleId = article_match[1];
    const article = state.entities.articles[articleId];

    if (article === undefined) {
      return undefined;
    }

    const section = state.entities.sections[article.section];

    if (section === undefined) {
      return undefined;
    }

    const idx_article_in_section = section.articles.indexOf(articleId);

    if (idx_article_in_section == 0) {
      ret = '/s/' + section.id;
    } else {
      ret = '/a/' + section.articles[idx_article_in_section - 1];
    }
  }

  return ret;
};

export const getNextPage = (state, currentPath) => {
  const section_match = currentPath.match('^/s/([^/]+)$');
  const article_match = currentPath.match('^/a/([^/]+)$');
  let ret;

  if (
    state.entities === undefined
    || state.entities.articles === undefined
    || state.entities.sections === undefined
  ) {
    return undefined;
  }

  if (currentPath === '/') {
    if (state.book.length > 0) {
      ret = '/s/' + state.book[0];
    }
  } else if (section_match) {
    const sectionId = section_match[1];
    const section = state.entities.sections[sectionId];

    if (section === undefined) {
      return undefined;
    }

    if (section.articles.length > 0) {
      ret = '/a/' + section.articles[0];
    } else {
      const idx_section_in_book = state.book.indexOf(sectionId);

      if (idx_section_in_book < state.book.length - 1) {
        ret = '/s/' + state.book[idx_section_in_book + 1];
      }
    }
  } else if (article_match) {
    const articleId = article_match[1];
    const article = state.entities.articles[articleId];

    if (article === undefined) {
      return undefined;
    }

    const section = state.entities.sections[article.section];

    if (section === undefined) {
      return undefined;
    }

    if (article === undefined) {
      return undefined;
    }
    const idx_article_in_section = section.articles.indexOf(articleId);

    if (idx_article_in_section == section.articles.length - 1) {
      const idx_section_in_book = state.book.indexOf(section.id);

      if (idx_section_in_book < state.book.length - 1) {
        ret = '/s/' + state.book[idx_section_in_book + 1];
      }
    } else {
      ret = '/a/' + section.articles[idx_article_in_section + 1];
    }
  }

  return ret;
};
