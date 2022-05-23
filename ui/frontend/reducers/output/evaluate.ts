import { Action, ActionType } from '../../actions';
import { finish, start } from './sharedStateManagement';

const DEFAULT: State = {
  requestsInProgress: 0,
  code: null,
  stdout: null,
  stderr: null,
  error: null,
};

interface State {
  requestsInProgress: number;
  code?: string;
  stdout?: string;
  stderr?: string;
  error?: string;
}

export default function evaluate(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.EvaluateRequest:
      return start(DEFAULT, state);
    case ActionType.EvaluateSucceeded: {
      const { code = '', stdout = '', stderr = '' } = action;
      return finish(state, { code, stdout, stderr });
    }
    case ActionType.EvaluateFailed:
      return finish(state, { error: action.error });
    default:
      return state;
  }
}
