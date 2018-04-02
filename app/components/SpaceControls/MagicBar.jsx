import React from 'react';
import SearchButton from './SearchButton';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';
import DeleteSheetButton from './DeleteSheetButton';
import AutoSave from './AutoSave';
import HistoryModal from '../Sheet/HistoryModal';
import SuperBar from './SuperBar';
import HistoryButton from './HistoryButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';

const cx = classNames.bind(styles);

const MagicBar = (props) => (
  <div className={cx('MagicBar')}>
    <SearchButton {...props} />
    <SuperBar className={cx('SuperBar')} {...props} />
    <SaveButton saveSheet={props.saveSheet} />
    <AutoSave />
    <HistoryButton />
    <ShareButton dispatch={props.dispatch} />
    <DeleteSheetButton deleteSheet={props.deleteSheet} />
    <HistoryModal />
  </div>
);

export default MagicBar;
