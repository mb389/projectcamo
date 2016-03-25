
export function insertNewColInRows (state, newColumn){
  state.grid.forEach(row => {
    row[newColumn.id] = {
      type: newColumn.type,
      data: null,
      id: newColumn.id + Math.floor((Math.random() * (99999999 - 111111) + 111111))
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
  console.log(columnDefs,funcText)

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
    return str.replace(/[-\/\\^$?.()|[\]{}]/g, '\\$&')
}