import showsReducer from '../../../../lib/modules/shows/reducers/shows';
import membersReducer from '../../../../lib/modules/shows/reducers/members';
import episodesReducer from '../../../../lib/modules/shows/reducers/episodes';

const actionFile = '../lib/modules/shows/actions/doAddShow';
const showsFixture = require('../../../fixtures/shows.json');

describe('Add a new show', () => {
  /**
   * getInstance method
   */
  function getInstance(promise) {
    return proxyquire.noCallThru().load(actionFile, {
      '../../../utils/fetch/ApiFetch': { post: () => promise }
    }).default;
  }

  describe('call api with show already exist on reducer state', () => {
    let action;

    const store = mockStore({
      shows: {
        [showsFixture[0].id]: showsFixture[0]
      },
      showsEpisodes: {
        1: { id: 1, show: { id: 10212, in_account: false } },
        2: { id: 2, show: { id: 10212, in_account: false } },
        3: { id: 3, show: { id: 10400, in_account: false } },
        4: { id: 3, show: { id: 10400, in_account: true } }
      }
    });

    const actionToDispatch = getInstance(
      Promise.resolve({
        show: showsFixture[0]
      })
    );

    before(async () => {
      await store.dispatch(actionToDispatch({ showId: 10212 }));
      action = store.getActions()[0];
    });

    it('validate action', () => {
      expect(action.type).to.equal('ADD_SHOW');
      expect(action.payload.showId).to.equal(10212);
      expect(action.payload.inAccount).to.equal(true);
    });

    it('validate shows reducer', () => {
      const stateShowsReducer = showsReducer(store.getState().shows, action);
      expect(Object.keys(stateShowsReducer)).to.have.lengthOf(1);
      expect(stateShowsReducer[10212].in_account).to.deep.equal(true);
    });

    it('validate members reducer', () => {
      const stateMembersReducer = membersReducer(
        store.getState().showsMembers,
        action
      );
      expect(stateMembersReducer[1]).to.deep.equal([10212]);
    });

    it('validate episodes reducer', () => {
      const stateEpisodesReducer = episodesReducer(
        store.getState().showsEpisodes,
        action
      );

      expect(stateEpisodesReducer[1].show.in_account).to.deep.equal(true);
      expect(stateEpisodesReducer[2].show.in_account).to.deep.equal(true);
      expect(stateEpisodesReducer[3].show.in_account).to.deep.equal(false);
      expect(stateEpisodesReducer[4].show.in_account).to.deep.equal(true);
    });
  });
});
