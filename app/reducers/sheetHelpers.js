
export function insertNewColInRows (state, newColumn){
  state.grid.forEach(row => {
    row[newColumn.id] = {
      type: newColumn.type,
      data: null,
    }
  });
  return state;
}

    // TODO remove the column that we're adding to to prevent errors?
export function runCustomFunc (state, row, funcText) {
  let columnDefs = 'let document = undefined, window = undefined, alert = undefined; ';

  state.columnHeaders.forEach((elem, idx) => { 
    funcText = funcText.replace(new RegExp(regexEscape(elem.name), 'g'), 'Col' + (idx+1));
    let cellUsed = decorationType(row[elem.id]);
    columnDefs += `let Col${idx+1} = ${cellUsed}; `;
    });

  return eval(columnDefs+funcText);
}

function decorationType (cell) {
  switch (cell.type) {
    case 'Images': return `["${cell.data.join('","')}"]`;
    case 'Formula': case 'Link': case 'Text': return `"${cell.data}"`;
    default: return cell.data;
  }
}

function regexEscape(str) {
    return str.replace(/[-\/\\^$?.()|[\]{}]/g, '\\$&')
}

export function navToNewCell(keyCode, newSheet) {
  console.log(newSheet.currentCell);
  let colId = newSheet.currentCell.cellKey;
  let rowIdx = newSheet.currentCell.cellIdx;
  console.log(arguments);
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
      case 40:
        if(newSheet.grid[rowIdx+1]) newRowIdx = rowIdx+1;
        return {
          newRowIdx,
          newColId: colId
        }
      case 39:
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