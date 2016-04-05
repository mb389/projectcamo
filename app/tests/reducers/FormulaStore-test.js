import expect from 'expect';
import md5 from 'spark-md5';
import reducer from 'reducers/formulaStore';
import * as types from 'constants';

describe('Formula Store reducers', () => {
  const initialState = {
    formula: []
  } 

  it('FORMULA_FETCH should add all formula to current state', () => {

    const action = {
      type: types.FORMULA_FETCH
      allFormulas: {
        {
          "_id": ObjectId("56fb354c72d9aae525fb5267"),
          "name": "Codiesfunk",
          "functionStr": "Col1 + \" Codies Funk\"",
          "createdBy": "c@c.com",
          "creationDate": ISODate("2016-03-30T02:09:16.257Z"),
          "__v": 0
        }
        {
          "_id": ObjectId("56fb361572d9aae525fb5268"),
          "name": "Assafunk",
          "functionStr": "Col1 + \" Assaf Funk\"",
          "createdBy": "a@a.com",
          "creationDate": ISODate("2016-03-30T02:12:37.136Z"),
          "__v": 0
        }
      }
    }

    const nextState = reducer(initialState, action);
    
    expect(nextState.formulas).toEqual(action.allFormulas)
  })

  it('FORMULA_UPLOAD should add one formula to current state', () => {
    
  type: types.FORMULA_UPLOAD
  addedFormula: {
      {
        "_id": ObjectId("56f703bfeeee0474426fa5af"),
        "name": "Oscarfunk",
        "functionStr": "Col4/Col3",
        "createdBy": "Assaf",
        "creationDate": ISODate("2016-03-26T21:48:47.967Z"),
        "__v": 0
      }
    }

    const nextState = reducer(initialState, {type: types.FORMULA_UPLOAD})

    expect(nextState.columnHeaders.length).toEqual(2)  
    expect(nextState.grid[0]['101']).toExist()  

  })


});
