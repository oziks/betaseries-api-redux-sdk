import { createSelector } from 'reselect';
import _filter from 'lodash/filter';
import * as commons from './commons';

/**
 * Select similar shows from state
 *
 * @alias module:Shows.getSimilarShows
 * @category selectors
 *
 * @example
 * const mapStateToProps = (state, props) => ({
 *   show: BetaSeries.getSelector('shows', 'getSimilarShows')(state, { showId: props.showId });
 * });
 *
 * @param {Object}  [state]           Redux state
 * @param {Object}  [obj]             Accept the following:
 * @param {Object}  [obj.showId]      Show ID
 *
 * @returns {Array}                  Shows list or `undefined`
 */
const getSimilarShows = createSelector(
  [commons.getShows, commons.getSimilarShows, commons.getShowId],
  (shows, similarShows, showId) => {
    const similarShowIds = !Object.prototype.hasOwnProperty.call(
      similarShows,
      showId
    )
      ? null
      : similarShows[showId];

    if (!similarShowIds) {
      return undefined;
    }

    return _filter(shows, show => similarShowIds.indexOf(show.id) !== -1) ||
      undefined;
  }
);

export default getSimilarShows;
