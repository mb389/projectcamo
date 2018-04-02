import expect from 'expect';
import reducer from '../../reducers/formulaStore';
import * as types from '../../constants';

describe('Formula Store reducers', () => {
  const initialState = {
    formulas: [],
  };

  it('FORMULA_FETCH should add all formula to the state', () => {
    const action = {
      type: types.FORMULA_FETCH,
      allFormulas: [
        {
          _id: '56fb354c72d9aae525fb5267',
          name: 'Codiesfunk',
          functionStr: 'Col1 + " Codies Funk"',
          createdBy: 'c@c.com',
          creationDate: '2016-03-30T02:09:16.257Z',
          __v: 0,
        },
        {
          _id: '56fb361572d9aae525fb5268',
          name: 'Assafunk',
          functionStr: 'Col1 + " Assaf Funk"',
          createdBy: 'a@a.com',
          creationDate: '2016-03-30T02:12:37.136Z',
          __v: 0,
        },
      ],
    };

    const nextState = reducer(initialState, action);

    expect(nextState.formulas).toEqual(action.allFormulas);
  });

  it('FORMULA_UPLOAD should add one formula to the state', () => {
    const action = {
      type: types.FORMULA_UPLOAD,
      addedFormula: {
        _id: '56f703bfeeee0474426fa5af',
        name: 'Oscarfunk',
        functionStr: 'Col4/Col3',
        createdBy: 's@s.com',
        creationDate: '2016-03-26T21:48:47.967Z',
        __v: 0,
      },
    };

    const nextState = reducer(initialState, action);

    expect(nextState.formulas.length).toEqual(1);
    expect(nextState.formulas[0].name).toEqual('Oscarfunk');
  });

  it('FORMULA_REMOVE should remove one formula from the state', () => {
    initialState.formulas.push({
      _id: '56f703bfeeee0474426fa5af',
      name: 'Oscarfunk',
      functionStr: 'Col4/Col3',
      createdBy: 's@s.com',
      creationDate: '2016-03-26T21:48:47.967Z',
      __v: 0,
    });

    const action = {
      type: types.FORMULA_REMOVE,
      formulaId: '56f703bfeeee0474426fa5af',
    };

    const nextState = reducer(initialState, action);

    expect(nextState.formulas.length).toEqual(0);
  });
});
