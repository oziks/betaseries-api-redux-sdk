import showsReducer from '../../../../lib/modules/shows/reducers/shows';
import membersReducer from '../../../../lib/modules/shows/reducers/members';

const actionFile = '../lib/modules/shows/actions/doAddShowFavorite';
const showsFixture = require('../../../fixtures/shows.json');

describe('Add a show to favorites', () => {
  /**
   * getInstance method
   */
  function getInstance(promise) {
    return proxyquire.noCallThru().load(actionFile, {
      '../../../utils/fetch/ApiFetch': { post: () => promise }
    }).default;
  }

  describe('call api with new show added to favorites', () => {
    let action;

    const store = mockStore({
      shows: {
        [showsFixture[0].id]: showsFixture[0]
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
      expect(action.type).to.equal('ADD_SHOW_FAVORITE');
      expect(action.payload.showId).to.equal(10212);
      expect(action.payload.show).to.be.an('object');
    });

    it('validate shows reducer', () => {
      const stateShowsReducer = showsReducer(store.getState().shows, action);
      expect(Object.keys(stateShowsReducer)).to.have.lengthOf(1);
    });

    it('validate members reducer', () => {
      const stateMembersReducer = membersReducer(
        store.getState().showsMembers,
        action
      );
      expect(stateMembersReducer[1]).to.have.lengthOf(1);
      expect(stateMembersReducer[1][0]).to.have.all.keys('id', 'infos');
    });
  });

  describe('call api with show already in favorites', () => {
    let action;

    const store = mockStore({
      shows: {
        [showsFixture[0].id]: showsFixture[0]
      },
      showsMembers: {
        1: [
          {
            id: 10212
          }
        ]
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

    it('validate members reducer', () => {
      const stateMembersReducer = membersReducer(
        store.getState().showsMembers,
        action
      );
      expect(stateMembersReducer[1]).to.be.lengthOf(1);
    });
  });
});
