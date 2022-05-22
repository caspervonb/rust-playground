import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import { State } from '../reducers';

import Section from './Section';
import SimplePane from './SimplePane';

import styles from './Evaluate.module.css';

const Evaluate: React.SFC = () => {
  const details = useSelector((state: State) => state.output.evaluate);
  const dispatch = useDispatch();

  return (
    <SimplePane {...details} kind="evaluate">
    </SimplePane>

  );
};

export default Evaluate;
