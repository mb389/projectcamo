
export function insertNewColInRows (state, newColumn){
  state.grid.forEach(row => {
    row[newColumn.id] = {
      type: newColumn.type,
      data: null,
      width: newColumn.width,
      id: newColumn.id + Math.floor((Math.random() * (99999999 - 111111) + 111111))
    }
  });
  return state;
}

    // TODO remove the column that we're adding to to prevent errors?
export function runCustomFunc (state, row, funcText) {
  let columnDefs = 'let document = undefined, window = undefined, alert = undefined; ';

  state.columnHeaders.forEach((elem, idx) => {
    funcText = regexEscape(funcText.replace(new RegExp(elem.name, 'g'), 'Col' + (idx+1)));
    let cellUsed = decorationType(row[elem.id]);
    if(/^\s*$/.test(cellUsed)) cellUsed = "null";
    columnDefs += `let Col${idx+1} = ${cellUsed}; `;
    });

  return eval(columnDefs+funcText);
}

function decorationType (cell) {
  switch (cell.type) {
    case 'Images': return `["${cell.data.join('","')}"]`;
    case 'Formula': case 'Link': case 'Text': case 'ID': return `"${cell.data}"`;
    case 'Reference': return null;
    default: return cell.data;
  }
}

function regexEscape(str) {
    return str.replace(/[-\\^$?|\{}]/g, '\\$&')
}

export function navToNewCell(keyCode, newSheet) {
  let colId = newSheet.currentCell.cellKey;
  let rowIdx = newSheet.currentCell.rowIdx;
  let newColId;
  let colIdx;
  let newRowIdx = rowIdx;
  switch(keyCode) {
      case 38:
        if(newSheet.grid[rowIdx-1]) newRowIdx = rowIdx-1;
        return {
          newRowIdx,
          newColId: colId
        }
      case 13: case 40:
        if(newSheet.grid[rowIdx+1]) newRowIdx = rowIdx+1;
        return {
          newRowIdx,
          newColId: colId
        }
      case 39: case 9:
        colIdx = findColumnIdxFromId(colId, newSheet);
        if(newSheet.columnHeaders[colIdx+1]) newColId = newSheet.columnHeaders[colIdx+1].id;
        else newColId = colId
        return {
          newRowIdx: rowIdx,
          newColId
        }
      case 37:
        colIdx = findColumnIdxFromId(colId, newSheet);
        if(newSheet.columnHeaders[colIdx-1]) newColId = newSheet.columnHeaders[colIdx-1].id;
        else newColId = colId
        return {
          newRowIdx: rowIdx,
          newColId
        }
  }
}

function findColumnIdxFromId(colId, newSheet){
  let colIdx;
  newSheet.columnHeaders.forEach((col,i) => {
    if(col.id === colId) {
      colIdx = i;
    }
  });
  return colIdx;
}

export function newColInfo (columns) {
  let colIdIdx = columns.reduce((accum,col) => {
    if(col.id>accum[0]) accum[0]=col.id;
    if(col.idx>accum[1]) accum[1]=col.idx;
    return accum;
  },[0,0])

  return {
    id: (1+Number(colIdIdx[0])).toString(),
    name: 'Column ' + (1+columns.length),
    idx: (1+Number(colIdIdx[1])),
    width: 200
  }
}
