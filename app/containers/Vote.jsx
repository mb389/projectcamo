import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import Scoreboard from 'components/Scoreboard';
import Table from 'components/Table';
import {
  createTopic, typing, incrementCount,
  decrementCount, destroyTopic, fetchTopics } from 'actions/topics';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [
    fetchTopics
  ]

  constructor(props) {
    super(props);
    // event handlers for MainSection component
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    // event handlers for EntryBox component
    this.onEntryChange = this.onEntryChange.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);
  }

  onIncrement(id, index) {
    const { dispatch } = this.props;
    dispatch(incrementCount(id, index));
  }

  onDecrement(id, index) {
    const { dispatch } = this.props;
    dispatch(decrementCount(id, index));
  }

  onDestroy(id, index) {
    const { dispatch } = this.props;
    dispatch(destroyTopic(id, index));
  }

  onEntryChange(text) {
    const { dispatch } = this.props;
    dispatch(typing(text));
  }

  onEntrySave(text) {
    const { dispatch } = this.props;
    dispatch(createTopic(text));
  }


  render() {
    const {newTopic, topics} = this.props;
    const headers = [
      { id: '123', type: 'name', name: 'Names', idx: 0 },
      { id: '124', type: 'url', name: 'Github URL', idx: 1 },
      { id: '125', type: 'ref', name: 'Repos', idx: 2 },
    ]

    const row = {
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


    return (
      <div className={cx('vote')}>
        <Table grid={grid} headers={headers}/>
      </div>
    );
  }
}

Vote.propTypes = {
  topics: PropTypes.array.isRequired,
  newTopic: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Vote);
