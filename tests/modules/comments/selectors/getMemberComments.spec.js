import selector
  from '../../../../lib/modules/comments/selectors/getMemberComments';

describe('Select latest member from state ', () => {
  const state = {
    commentsMembers: {
      3: [3452345, 13251345, 24532],
      4: [345345314]
    },
    comments: {
      3452345: {
        id: 3452345
      },
      13251345: {
        id: 13251345
      }
    }
  };

  it('returns comments list if exist', () => {
    const value = selector(state, { memberId: 3 });
    expect(value).to.be.a('array');
    expect(value).to.have.lengthOf(2);
    expect(value.map(comment => comment.id)).to.deep.equal([3452345, 13251345]);
  });

  it('returns comments list order desc', () => {
    const value = selector(state, { memberId: 3, order: 'desc' });
    expect(value).to.be.a('array');
    expect(value).to.have.lengthOf(2);
    expect(value.map(comment => comment.id)).to.deep.equal([13251345, 3452345]);
  });

  it('returns undefined if member does not exist in comments reducer', () => {
    const value = selector(state, { memberId: 4 });
    expect(value).to.deep.equal(undefined);
  });

  it('returns undefined if member does not exist in comments members reducer', () => {
    const value = selector(state, { memberId: 5 });
    expect(value).to.deep.equal(undefined);
  });
});
