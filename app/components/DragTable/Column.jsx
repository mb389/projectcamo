
import React, { Component as C} from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'

const headingSource = {
	beginDrag(props) {
		return {
			name: props.column.name
		}
	}
}

const headingTarget = {
	drop(props, monitor, component) {
		let draggedCol = monitor.getItem()
		let targetCol = component.props.column
		// trigger drag action
		props.drag(draggedCol, targetCol)
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

function collectDrop(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	}
}

const Column = ({ column, connectDropTarget, connectDragSource, isOver, isDragging }) => (
	<th style={{
			opacity: isOver ? 0.5 : 1,
			backgroundColor: isOver ? 'yellow' : 'inherit'
		}}>
		{
			connectDropTarget(connectDragSource(
				<div>
					{column.name}
				</div>
			))
		}
	</th>
)

export default pipe(DragSource('column', headingSource, collect), DropTarget('column', headingTarget, collectDrop))(Column)
