import { bindActionCreators } from 'redux';
import { customElement } from 'lit-element';
import ConnectMixin from './mixins/connect';
import { loadLanguage } from './store/localeAPIActions';
import MyAwesomeComposite from './my-awesome-composite';

import store from './store/store';

function mapStateToProps(state) {
  const { localeAPI } = state;
  const { language } = localeAPI ?? {};
  return {
    language,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators (
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
