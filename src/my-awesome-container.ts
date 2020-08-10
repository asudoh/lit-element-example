import { bindActionCreators, ActionCreatorsMapObject, Dispatch } from 'redux';
import { customElement } from 'lit-element';
import ConnectMixin from './mixins/connect';
import { loadLanguage } from './store/localeAPIActions';
import LocaleAPIState from './store/localeAPIState';
import MyAwesomeComposite from './my-awesome-composite';

import store from './store/store';

type MyAwesomeContainerActions = ReturnType<typeof loadLanguage>;

interface MyAwesomeContainerState {
  localeAPI?: LocaleAPIState;
}

interface MyAwesomeContainerStateProps {
  requestLanguageInProgress?: boolean;
  errorRequestLanguage?: Error;
  language?: string;
}

function mapStateToProps(state: MyAwesomeContainerState): MyAwesomeContainerStateProps {
  const { localeAPI } = state;
  const { requestLanguageInProgress, errorRequestLanguage, language } = localeAPI ?? {};
  return {
    requestLanguageInProgress,
    errorRequestLanguage,
    language,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators<MyAwesomeContainerActions, ActionCreatorsMapObject<MyAwesomeContainerActions>> (
    {
      _loadLanguage: loadLanguage,
    },
    dispatch
  );
}


@customElement('my-awesome-container')
class MyAwesomeContainer extends ConnectMixin(
  store,
  mapStateToProps,
  mapDispatchToProps
)(MyAwesomeComposite) {}

export default MyAwesomeContainer;
