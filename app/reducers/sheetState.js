const columnHeaders = [
      { id: 100, type: 'Text', name: 'Names', idx: 0, width: 200 },
      { id: 101, type: 'Link', name: 'Github URL', idx: 1, width: 200 },
      { id: 102, type: 'Images', name: 'Pictures', idx: 2, width: 200 },
];

const row = {
  100: {
    type: 'Text',
    data: 'Oscar'
  },
  101: {
    type: 'Link',
    data: 'https://github.com/elpenao'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row1 = {
  100: {
    type: 'Text',
    data: 'Assaf'
  },
  101: {
    type: 'Link',
    data: 'github.com/apackin'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row2 = {
  100: {
    type: 'Text',
    data: 'Cody'
  },
  101: {
    type: 'Link',
    data: 'github.com/cschwarz'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row3 = {
  100: {
    type: 'Text',
    data: 'Mike'
  },
  101: {
    type: 'Link',
    data: 'github.com/mbushoy'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row4 = {
  100: {
    type: 'Text',
    data: 'Oscar'
  },
  101: {
    type: 'Link',
    data: 'github.com/elpenao'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row5 = {
  100: {
    type: 'Text',
    data: 'Assaf'
  },
  101: {
    type: 'Link',
    data: 'github.com/apackin'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row6 = {
  100: {
    type: 'Text',
    data: 'Cody'
  },
  101: {
    type: 'Link',
    data: 'github.com/cschwarz'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row7 = {
  100: {
    type: 'Text',
    data: 'Mike'
  },
  101: {
    type: 'Link',
    data: 'github.com/mbushoy'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row8 = {
  100: {
    type: 'Text',
    data: 'Oscar'
  },
  101: {
    type: 'Link',
    data: 'github.com/elpenao'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row9 = {
  100: {
    type: 'Text',
    data: 'Assaf'
  },
  101: {
    type: 'Link',
    data: 'github.com/apackin'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row10 = {
  100: {
    type: 'Text',
    data: 'Cody'
  },
  101: {
    type: 'Link',
    data: 'github.com/cschwarz'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row11 = {
  100: {
    type: 'Text',
    data: 'Mike'
  },
  101: {
    type: 'Link',
    data: 'github.com/mbushoy'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row12 = {
  100: {
    type: 'Text',
    data: 'Oscar'
  },
  101: {
    type: 'Link',
    data: 'github.com/elpenao'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row13 = {
  100: {
    type: 'Text',
    data: 'Assaf'
  },
  101: {
    type: 'Link',
    data: 'github.com/apackin'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row14 = {
  100: {
    type: 'Text',
    data: 'Cody'
  },
  101: {
    type: 'Link',
    data: 'github.com/cschwarz'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const row15 = {
  100: {
    type: 'Text',
    data: 'Mike'
  },
  101: {
    type: 'Link',
    data: 'github.com/mbushoy'
  },
  102: {
    type: 'Images',
    data: ['http://placehold.it/350x150', 'http://placehold.it/450x250']
  }
};

const grid = [row, row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15];
const initialState = { grid, columnHeaders, showRowModal: false, modalRow: { data: null, rowIdx: null } };

export default initialState;
