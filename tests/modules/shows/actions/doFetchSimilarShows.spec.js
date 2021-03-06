import similarsReducer from '../../../../lib/modules/shows/reducers/similars';

const actionFile = '../lib/modules/shows/actions/doFetchSimilarShows';
const showsFixture = require('../../../fixtures/shows.json');

describe('Retrieve similar shows', () => {
  /**
   * getInstance method
   */
  function getInstance(promise) {
    return proxyquire.noCallThru().load(actionFile, {
      '../../../utils/fetch/ApiFetch': { get: () => promise },
      './doFetchManyShows': proxyquire
        .noCallThru()
        .load('../lib/modules/shows/actions/doFetchManyShows', {
          '../../../utils/fetch/ApiFetch': { get: () => promise }
        }).default
    }).default;
  }

  describe('call api with show ID', () => {
    let action;

    const actionToDispatch = getInstance(
      Promise.resolve({
        similars: showsFixture.slice(0, 5).map(show => ({
          ...show,
          show_id: show.id
        }))
      })
    );

    before(async () => {
      const store = mockStore({
        shows: {}
      });
      action = await store.dispatch(actionToDispatch({ showId: 481 }));
    });

    it('validate action', () => {
      expect(action.type).to.equal('FETCH_SIMILAR_SHOWS');
      expect(action.payload.showId).to.deep.equal(481);
      expect(action.payload.similars).to.have.lengthOf(5);
    });

    it('validate similars reducer', () => {
      const stateSimilarsReducer = similarsReducer(undefined, action);
      expect(stateSimilarsReducer).to.have.ownProperty('481');
      expect(stateSimilarsReducer[481]).to.deep.equal([
        10212,
        982,
        481,
        716,
        8251
      ]);
    });
  });
});
