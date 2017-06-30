import * as navigation from 'reducers/navigation';
import * as sections from 'reducers/sections';

describe('Helpers', () => {
  const payload = {
    sections: [
      { id: 'first_section', articles: [
        { id: 'id2', section: 'first_section' },
        { id: 'id4', section: 'first_section' },
        { id: 'id6', section: 'first_section' },
      ] },
      { id: 'second_section', articles: [
        { id: 'id3', section: 'second_section' },
      ] },
      { id: 'third_section', articles: [
        { id: 'id8', section: 'third_section' },
        { id: 'id7', section: 'third_section' },
      ] },
      { id: 'fourth_section', articles: [] },
      { id: 'fifth_section', articles: [
        { id: 'id1', section: 'fifth_section' },
        { id: 'id5', section: 'fifth_section' },
        { id: 'id9', section: 'fifth_section' },
      ] },
    ],
  };
  const state = sections.reducer(undefined, { type: `${sections.RETRIEVE_SECTIONS}_FULFILLED`, payload });

  describe('getPreviousPage', () => {
    test('empty state', () => {
      expect(navigation.getPreviousPage({}, '/s/second_section')).toBeUndefined();
      expect(navigation.getPreviousPage({ entities: {} }, '/s/second_section')).toBeUndefined();
      expect(navigation.getPreviousPage({ entities: { sections: { other: { id: 'other' } } } }, '/s/second_section')).toBeUndefined();
      expect(navigation.getPreviousPage({ entities: { articles: { other: { id: 'other' } } } }, '/a/second_section')).toBeUndefined();
    });

    test('index', () => {
      expect(navigation.getPreviousPage(state, '/')).toBeUndefined();
    });

    test('first section', () => {
      expect(navigation.getPreviousPage(state, '/s/first_section')).toBe('/');
    });

    test('middle section', () => {
      expect(navigation.getPreviousPage(state, '/s/third_section')).toBe('/a/id3');
    });

    test('previous section is empty', () => {
      expect(navigation.getPreviousPage(state, '/s/fifth_section')).toBe('/s/fourth_section');
    });

    test('first article of first section', () => {
      expect(navigation.getPreviousPage(state, '/a/id2')).toBe('/s/first_section');
    });

    test('first article of middle section', () => {
      expect(navigation.getPreviousPage(state, '/a/id8')).toBe('/s/third_section');
    });

    test('first article of last section', () => {
      expect(navigation.getPreviousPage(state, '/a/id1')).toBe('/s/fifth_section');
    });

    test('single article of middle section', () => {
      expect(navigation.getPreviousPage(state, '/a/id3')).toBe('/s/second_section');
    });

    test('last article of first section', () => {
      expect(navigation.getPreviousPage(state, '/a/id6')).toBe('/a/id4');
    });

    test('last article of middle section', () => {
      expect(navigation.getPreviousPage(state, '/a/id7')).toBe('/a/id8');
    });

    test('last article of last section', () => {
      expect(navigation.getPreviousPage(state, '/a/id9')).toBe('/a/id5');
    });
  });

  describe('getNextPage', () => {
    test('empty state', () => {
      expect(navigation.getNextPage({}, '/s/first_section')).toBeUndefined();
      expect(navigation.getNextPage({ entities: {} }, '/s/first_section')).toBeUndefined();
      expect(navigation.getNextPage({ entities: { sections: { other: { id: 'other' } } } }, '/s/first_section')).toBeUndefined();
      expect(navigation.getNextPage({ entities: { articles: { other: { id: 'other' } } } }, '/a/first_section')).toBeUndefined();
    });

    test('index', () => {
      expect(navigation.getNextPage(state, '/')).toBe('/s/first_section');
    });

    test('first section', () => {
      expect(navigation.getNextPage(state, '/s/first_section')).toBe('/a/id2');
    });

    test('middle section', () => {
      expect(navigation.getNextPage(state, '/s/third_section')).toBe('/a/id8');
    });

    test('empty section', () => {
      expect(navigation.getNextPage(state, '/s/fourth_section')).toBe('/s/fifth_section');
    });

    test('first article of first section', () => {
      expect(navigation.getNextPage(state, '/a/id2')).toBe('/a/id4');
    });

    test('first article of middle section', () => {
      expect(navigation.getNextPage(state, '/a/id8')).toBe('/a/id7');
    });

    test('first article of last section', () => {
      expect(navigation.getNextPage(state, '/a/id1')).toBe('/a/id5');
    });

    test('single article of middle section', () => {
      expect(navigation.getNextPage(state, '/a/id3')).toBe('/s/third_section');
    });

    test('last article of first section', () => {
      expect(navigation.getNextPage(state, '/a/id6')).toBe('/s/second_section');
    });

    test('last article of middle section', () => {
      expect(navigation.getNextPage(state, '/a/id7')).toBe('/s/fourth_section');
    });

    test('last article of last section', () => {
      expect(navigation.getNextPage(state, '/a/id9')).toBeUndefined();
    });
  });
});
