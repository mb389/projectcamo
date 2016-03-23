
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'constants/index';

polyfill();


export const drag = (draggedCol, targetCol) => {
	return { type: types.DRAG, draggedCol, targetCol }
}
