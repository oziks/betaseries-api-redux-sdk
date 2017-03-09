/**
 * Retrieve movies from state
 */
export const getMovies = state => state.movies;

/**
 * Retrieve member movies from state
 */
export const getMemberMovies = state => state.moviesMembers;

/**
 * Retrieve member ID from parameters
 */
export const getMemberId = (state, { memberId }) => parseInt(memberId, 10);

/**
 * Retrieve state from parameters
 */
export const getMovieState = (state, props) => {
  const movieState = parseInt(props.state, 10);

  return Number.isInteger(movieState) ? movieState : null;
};