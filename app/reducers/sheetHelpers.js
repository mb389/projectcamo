import { Map, List } from 'immutable'


// export function insertNewColInRows (state, newColumn){
//   state.grid.forEach(row => {
//     row[newColumn.id] = {
//       type: newColumn.type,
//       data: null,
//       width: newColumn.width,
//       id: newColumn.id + Math.floor((Math.random() * (99999999 - 111111) + 111111))
//     }
//   });
//   return state;
// }

export function insertNewColInRows (state, newColumn) {
  return state.updateIn(['grid'], grid => grid.map(row => {
    return row.set(newColumn.get('id'), Map({
      type: newColumn.get('type'),
      data: null,
      width: newColumn.get('width'),
      id: newColumn.get('id') + Math.floor((Math.random() * (99999999 - 111111) + 111111))
    }))
  }))
}

// TODO remove the column that we're adding to prevent errors?
export function runCustomFunc (state, row, funcText) {
  let columnDefs = 'let document = undefined, window = undefined, alert = undefined; ';

  let columnDefsUpdated = state
                            .get('columnHeaders')
                            .reduce((accum, elem, idx) => {
                              funcText = regexEscape(funcText.replace(new RegExp(elem.name, 'g'), 'Col' + (idx+1)));
                              let cellUsed = decorationType(row.get(elem.get('id')));
                              if(/^\s*$/.test(cellUsed)) cellUsed = "null";
                              return accum += `let Col${idx+1} = ${cellUsed}; `
                            }, columnDefs)

  // state.columnHeaders.forEach((elem, idx) => {
  //   funcText = regexEscape(funcText.replace(new RegExp(elem.name, 'g'), 'Col' + (idx+1)));
  //   let cellUsed = decorationType(row[elem.id]);
  //   if(/^\s*$/.test(cellUsed)) cellUsed = "null";
  //   columnDefs += `let Col${idx+1} = ${cellUsed}; `;
  //   });

  return eval(columnDefsUpdated+funcText);
}

// function decorationType (cell) {
//   switch (cell.type) {
//     case 'Images': return `["${cell.data.join('","')}"]`;
//     case 'Reference': return null;
//     default: return !Number(cell.data) ? `"${cell.data}"` : Number(cell.data);
//   }
// }

function decorationType (cell) {
  switch(cell.get('type')) {
    case 'Images': return `["${cell.get('data').join('","')}"]`;
    case 'Reference': return null;
    default: return !Number(cell.get('data')) ? `"${cell.get('data')}"` : Number(cell.get('data'));
  }
}

function regexEscape(str) {
  return str;
  // return str.replace(/[-\\^$?|\{}]/g, '\\$&')
}

// export function navToNewCell(keyCode, newSheet) {
//   let colId = newSheet.currentCell.cellKey;
//   let rowIdx = newSheet.currentCell.rowIdx;
//   let newColId;
//   let colIdx;
//   let newRowIdx = rowIdx;
//   switch(keyCode) {
//       case 38:
//         if(newSheet.grid[rowIdx-1]) newRowIdx = rowIdx-1;
//         return {
//           newRowIdx,
//           newColId: colId
//         }
//       case 13: case 40:
//         if(newSheet.grid[rowIdx+1]) newRowIdx = rowIdx+1;
//         return {
//           newRowIdx,
//           newColId: colId
//         }
//       case 39: case 9:
//         colIdx = findColumnIdxFromId(colId, newSheet);
//         if(newSheet.columnHeaders[colIdx+1]) newColId = newSheet.columnHeaders[colIdx+1].id;
//         else newColId = colId
//         return {
//           newRowIdx: rowIdx,
//           newColId
//         }
//       case 37:
//         colIdx = findColumnIdxFromId(colId, newSheet);
//         if(newSheet.columnHeaders[colIdx-1]) newColId = newSheet.columnHeaders[colIdx-1].id;
//         else newColId = colId
//         return {
//           newRowIdx: rowIdx,
//           newColId
//         }
//   }
// }

export function navToNewCell(keyCode, state) {
  let colId = state.getIn(['currentCell', 'cellKey']);
  let rowIdx = state.getIn(['currentCell', 'rowIdx'])
  let newColId;
  let colIdx;
  let newRowIdx = rowIdx;
  switch(keyCode) {
      case 38:
        if(state.hasIn(['grid', rowIdx-1])) newRowIdx = rowIdx-1;
        return Map({
          newRowIdx: newRowIdx,
          newColId: colId
        })
      case 13: case 40:
        if(state.hasIn(['grid', rowIdx+1])) newRowIdx = rowIdx+1;
        return Map({
          newRowIdx: newRowIdx,
          newColId: colId
        })
      case 39: case 9:
        colIdx = findColumnIdxFromId(colId, state);
        if(state.hasIn(['columnHeaders', colIdx+1])) newColId = state.getIn(['columnHeaders', colIdx+1, 'id'])
        else newColId = colId
        return Map({
          newRowIdx: rowIdx,
          newColId: newColId
        })
      case 37:
        colIdx = findColumnIdxFromId(colId, state);
        if(state.hasIn(['columnHeaders', colIdx-1])) newColId = state.getIn(['columnHeaders', colIdx-1, 'id'])
        else newColId = colId
        return Map({
          newRowIdx: rowIdx,
          newColId: newColId
        })
  }
}



function findColumnIdxFromId(colId, state){
  return state
          .get('columnHeaders')
          .reduce((accum, col, i) => col.get('id') === colId ? i : accum,'')
}

// export function newColInfo (columns) {
//   let colIdIdx = columns.reduce((accum,col) => {
//     if(col.id>accum[0]) accum[0]=col.id;
//     if(col.idx>accum[1]) accum[1]=col.idx;
//     return accum;
//   },[0,0])
//
//   return {
//     id: (1+Number(colIdIdx[0])).toString(),
//     name: 'Column ' + (1+columns.length),
//     idx: (1+Number(colIdIdx[1])),
//     width: 200
//   }
// }

export function newColInfo (columns) {
  let colIdIdx = columns.reduce((accum, col) => {
    if(col.get('id') > accum.get('0')) return accum.set('0', col.get('id')).set('1', col.get('idx'));
    return accum;
    // if(col.get('idx') > accum.get('1')) accum.set('1', col.get('idx'))
  }, List([0,0]))

  return Map({
    id: (1+Number(colIdIdx.get('0'))).toString(),
    name: 'Column ' + (1+columns.size),
    idx: (1+Number(colIdIdx.get('1'))),
    width: 200
  })
}
