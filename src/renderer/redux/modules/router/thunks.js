import { clone } from 'ramda';
import { actions as routerActions } from 'redux-router5';

import { resetToast } from 'redux-modules/layout/toast/thunks';
import { select, setstate } from 'redux-modules/general';

import { lastMainRoute } from 'redux-modules/router/paths';
import { ROUTE_VIEW_MAP } from 'redux-modules/router/constants';

export function goTo(scene, params = {}) {
  return dispatch =>
    new Promise(resolve => {
      const newParams = clone(params);

      dispatch(resetToast());
      dispatch(setstate({ name: scene, params }, lastMainRoute));
      resolve(dispatch(routerActions.navigateTo(scene, newParams)));
    });
}

export function returnFromRoute() {
  return (dispatch, getState) =>
    new Promise(resolve => {
      const lastMainRouteInfo = select(lastMainRoute, getState()) || {
        name: ROUTE_VIEW_MAP,
      };
      resolve(dispatch(goTo(lastMainRouteInfo.name, lastMainRouteInfo.params)));
    });
}

export default {
  goTo,
  returnFromRoute,
};
