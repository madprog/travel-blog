import typeToReducer from 'type-to-reducer';

const NAME = 'canada_sections';

export const CREATE_SECTION = `${NAME}/CREATE_SECTION`;
export const createSection = (section) => dispatch => dispatch({
  type: CREATE_SECTION,
  meta: { section },
});

export const DELETE_SECTION = `${NAME}/DELETE_SECTION`;
export const deleteSection = (sectionId) => dispatch => dispatch({
  type: DELETE_SECTION,
  meta: { sectionId },
});

export const DESTROY_SECTION = `${NAME}/DESTROY_SECTION`;
export const destroySection = (sectionId) => dispatch => dispatch({
  type: DESTROY_SECTION,
  meta: { sectionId },
});

export const UNDELETE_SECTION = `${NAME}/UNDELETE_SECTION`;
export const undeleteSection = (sectionId) => dispatch => dispatch({
  type: UNDELETE_SECTION,
  meta: { sectionId },
});

const initialState = {
  book: [],
};

export const reducer = typeToReducer({
}, initialState);

export const getSection = (state, sectionId) => state.entities.sections[sectionId];

export default reducer;
