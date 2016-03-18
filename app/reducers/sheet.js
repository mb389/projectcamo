import { 
  UPDATE_CELL
} from 'constants/index';

const columnHeaders = [
      { id: '123', type: 'name', name: 'Names', idx: 0 },
      { id: '124', type: 'url', name: 'Github URL', idx: 1 },
      { id: '125', type: 'ref', name: 'Repos', idx: 2 },
    ]

const row = {
   '123': {
      type: 'string',
      data: 'sdkfajdks'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row1 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row2 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row3 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row4 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row5 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row6 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row7 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row8 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row9 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row10 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row11 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const row12 = {
   '123': {
      type: 'string',
      data: 'Oscar'
    },
    "124": {
      type: 'url',
      data: 'github.com/elpenao'
    },
    "125": {
      type: 'url',
      data: 'linkedIn.com/elpenao'
    }
}

const row13 = {
    '123': {
      type: 'string',
      data: 'Assaf'
    },
    '124': {
      type: 'url',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/apackin'
    }
}

const row14 = {
    '123': {
      type: 'string',
      data: 'Cody'
    },
    '124': {
      type: 'url',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/cschwarz'
    }
}

const row15 = {
    '123': {
      type: 'string',
      data: 'Mike'
    },
    '124': {
      type: 'url',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'url',
      data: 'linkedIn.com/mbushoy'
    }
}

const grid = [row, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15]


const initialState = { grid: grid, columnHeaders: columnHeaders }

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CELL:
      let newState = Object.assign({}, state, {});
      newState.grid[action.cell.idx][action.cell.key].data = action.cell.data
      return newState
    default:
      return state;
  }
}



