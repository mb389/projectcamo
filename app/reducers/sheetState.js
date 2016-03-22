const columnHeaders = [
      { id: '123', type: 'Text', name: 'Names', idx: 0 },
      { id: '124', type: 'Link', name: 'Github URL', idx: 1 },
      { id: '125', type: 'Images', name: 'Pictures', idx: 2 },
    ]

const row = {
   '123': {
      type: 'Text',
      data: 'Oscar'
    },
    '124': {
      type: 'Link',
      data: 'https://github.com/elpenao'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row1 = {
    '123': {
      type: 'Text',
      data: 'Assaf'
    },
    '124': {
      type: 'Link',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row2 = {
    '123': {
      type: 'Text',
      data: 'Cody'
    },
    '124': {
      type: 'Link',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row3 = {
    '123': {
      type: 'Text',
      data: 'Mike'
    },
    '124': {
      type: 'Link',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row4 = {
   '123': {
      type: 'Text',
      data: 'Oscar'
    },
    '124': {
      type: 'Link',
      data: 'github.com/elpenao'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row5 = {
    '123': {
      type: 'Text',
      data: 'Assaf'
    },
    '124': {
      type: 'Link',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row6 = {
    '123': {
      type: 'Text',
      data: 'Cody'
    },
    '124': {
      type: 'Link',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row7 = {
    '123': {
      type: 'Text',
      data: 'Mike'
    },
    '124': {
      type: 'Link',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row8 = {
   '123': {
      type: 'Text',
      data: 'Oscar'
    },
    '124': {
      type: 'Link',
      data: 'github.com/elpenao'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row9 = {
    '123': {
      type: 'Text',
      data: 'Assaf'
    },
    '124': {
      type: 'Link',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row10 = {
    '123': {
      type: 'Text',
      data: 'Cody'
    },
    '124': {
      type: 'Link',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row11 = {
    '123': {
      type: 'Text',
      data: 'Mike'
    },
    '124': {
      type: 'Link',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row12 = {
   '123': {
      type: 'Text',
      data: 'Oscar'
    },
    '124': {
      type: 'Link',
      data: 'github.com/elpenao'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row13 = {
    '123': {
      type: 'Text',
      data: 'Assaf'
    },
    '124': {
      type: 'Link',
      data: 'github.com/apackin'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row14 = {
    '123': {
      type: 'Text',
      data: 'Cody'
    },
    '124': {
      type: 'Link',
      data: 'github.com/cschwarz'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const row15 = {
    '123': {
      type: 'Text',
      data: 'Mike'
    },
    '124': {
      type: 'Link',
      data: 'github.com/mbushoy'
    },
    '125': {
      type: 'Images',
      data: ['http://placehold.it/350x150','http://placehold.it/450x250']
    }
}

const grid = [row, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15]
const initialState = { grid: grid, columnHeaders: columnHeaders, showRowModal: false, modalRow: { data:null, rowIdx: null} }

export default initialState
