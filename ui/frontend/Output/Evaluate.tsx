import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import { State } from '../reducers';

import Section from './Section';
import SimplePane from './SimplePane';

import styles from './Evaluate.module.css';

function base64ToByteArray(src: string) {
  const decode = atob(src);
  const byteNumbers = new Array(decode.length);
  for (let i = 0; i < decode.length; i++) {
    byteNumbers[i] = decode.charCodeAt(i);
  }
  return new Uint8Array(byteNumbers);
}

function createObjectURL(src: ArrayBuffer | string, mime: string) {
  return URL.createObjectURL(new Blob([src], { type: mime }));
}

function createEntryURL({ js, wasm }) {
  const jsBytes = atob(js);
  const wasmBytes = base64ToByteArray(wasm);

  const jsURL = createObjectURL(jsBytes, 'application/javascript');
  const wasmURL = createObjectURL(wasmBytes, 'application/wasm');

  const source = `
    import init from '${jsURL}';
    await init('${wasmURL}');
    `;

  return createObjectURL(source, 'application/javascript');
}

const Evaluate: React.SFC = () => {
  const { code, ...details } = useSelector((state: State) => state.output.evaluate);
  const dispatch = useDispatch();

  return (
    <SimplePane {...details} kind="evaluate">
      <Section kind="code" label="Result">{code}</Section>
    </SimplePane>
  );
};

export default Evaluate;
