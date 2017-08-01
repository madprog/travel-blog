import typeToReducer from 'type-to-reducer';

const initialState = {
};

export const reducer = typeToReducer({
}, initialState);

export const getTemplate = (state, templateId) => ((state.entities || {}).templates || {})[templateId];

export default reducer;
