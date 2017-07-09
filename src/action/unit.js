import Store from '../store';

const dispatch = Store.dispatch;

const actions = {
    addUnit: (name) => dispatch({ type: 'AddUnit', name }),
    editUnit: (id, prop, value) => dispatch({ type: 'EditUnit', id, prop, value }),
    removeUnit: (id) => dispatch({ type: 'RemoveUnit', id })
};

export default actions;
