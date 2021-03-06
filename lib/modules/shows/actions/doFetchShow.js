import constants from '../constants';
import ApiFetch from '../../../utils/fetch/ApiFetch';

/**
 * Retrieve show
 *
 * **Dispatch**: `FETCH_SHOW`
 *
 * @alias module:Shows.doFetchShow
 * @category actions
 *
 * @example
 * BetaSeries.getAction('shows', 'doFetchShow')({ showId: 1275 });
 *
 * @param {Object}  [obj]           Accept the following:
 * @param {Number}  [obj.showId]    Show ID
 *
 * @returns {Promise}
 */
const doFetchShow = ({ showId }) =>
  dispatch =>
    ApiFetch.get('shows/display', { id: showId }).then(response =>
      dispatch({
        type: constants.FETCH_MANY_SHOWS,
        payload: {
          showIds: [showId],
          shows: [response.show]
        }
      }));

export default doFetchShow;
