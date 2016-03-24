import React, { Component } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';

const paneStyle = {
  fontSize: "40px",
  textAlign:"center",
  paddingTop:"60px",
  height:"200px",
  border: "solid 1px #ccc",
  borderRadius: "5px",
  backgroundColor: "#fff"
};

export default class Example extends Component{
  render() {
    return (
      <SortablePane
          direction="horizontal"
          margin={10}
          onResize={(id, dir, size, rect) => null}
          onOrderChange={(panes) => console.log(panes)}
      >
        <Pane
           width={200}
           height={500}
           style={paneStyle}
        >
          A
        </Pane>
        <Pane
           width={300}
           height={400}
          style={paneStyle}
         >
          B
        </Pane>
        <Pane
           width={100}
           height={250}
           style={paneStyle}
         >
          C
        </Pane>
      </SortablePane>
    );
  }
}
