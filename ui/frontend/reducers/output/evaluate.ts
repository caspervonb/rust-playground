import { Action, ActionType } from '../../actions';
import { finish, start } from './sharedStateManagement';

const DEFAULT: State = {
  requestsInProgress: 0,
  stdout: null,
  stderr: null,
  error: null,
  code: null,
};

interface State {
  requestsInProgress: number;
  stdout?: string;
  stderr?: string;
  error?: string;
  code?: string;
}

export default function execute(state = DEFAULT, action: Action) {
  switch (action.type) {
    case ActionType.EvaluateRequest:
      return start(DEFAULT, state);
    case ActionType.EvaluateSucceeded: {
      const { code = '', stdout = '', stderr = '' } = action;
      return finish(state, { code, stdout, stderr });
    }
    case ActionType.EvaluateFailed: {
      const { error } = action;
      return finish(state, { error });
    }
    default:
      return state;
  }
}
