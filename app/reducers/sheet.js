import {
} from 'constants/index';

const columnHeaders = [
      { id: '123', type: 'name', name: 'Names', idx: 0 },
      { id: '124', type: 'url', name: 'Github URL', idx: 1 },
      { id: '125', type: 'ref', name: 'Repos', idx: 2 },
    ]

    const row = {
       '123': {
          type: 'string',
          data: 'oscar'
        },
        "124": {
          type: 'url',
          data: ''
        },
        "125": {
          type: 'url',
          data: ''
        }
    }

    const row1 = {
        '123': {
          type: 'string',
          data: ''
        },
        '124': {
          type: 'url',
          data: ''
        },
        '125': {
          type: 'url',
          data: ''
        }
    }

    const row2 = {
        '123': {
          type: 'string',
          data: ''
        },
        '124': {
          type: 'url',
          data: ''
        },
        '125': {
          type: 'url',
          data: ''
        }
    }

const grid = [row, row1, row2]

const initialState = { grid: grid, columnHeaders: columnHeaders }

export default function sheet(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
