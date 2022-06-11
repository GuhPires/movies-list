import { createContext, useReducer, useEffect } from 'react';
import { LIST_CONTENT_TYPES, LIST_TYPES } from '../enums';

import TMDBClient from '../utils/TMDBClient';

const MOCKED_LISTS = [
  {
    _id: '01',
    type: LIST_TYPES.FAVORITE,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: [],
  },
  {
    _id: '02',
    type: LIST_TYPES.WATCHED,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: [123, 550, 13],
  },
  {
    _id: '03',
    type: LIST_TYPES.WATCH_LIST,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: [],
  },
];

const ACTIONS = {
  MOVIE: 'MOVIE',
  SHOW: 'SHOW',
  SET_LIST: 'SET_LIST',
};

const initialState = {
  movies: {
    [LIST_TYPES.FAVORITE]: new Map(),
    [LIST_TYPES.WATCHED]: new Map(),
    [LIST_TYPES.WATCH_LIST]: new Map(),
  },
  shows: {
    [LIST_TYPES.FAVORITE]: new Map(),
    [LIST_TYPES.WATCHED]: new Map(),
    [LIST_TYPES.WATCH_LIST]: new Map(),
  },
  list: null,
  // both props bellow are used for useEffect purposes only
  listType: null,
  listContentType: null,
};

const client = new TMDBClient();

const reducer = (state, action) => {
  const list = { ...state.list };

  switch (action.type) {
    case ACTIONS.MOVIE:
      console.log('MOVIE');
      const { payload: movie } = action;

      if (!movie || !movie.id) return { ...state };

      const movies = { ...state.movies };
      movies[list.type] = new Map(state.movies[list.type]).set(movie.id, movie);

      // populates the list with the returned movie
      const populated = { ...list };
      populated.content = movies[list.type];

      return { ...state, movies, list: populated };
    case ACTIONS.SHOW:
      console.log('SHOW');
      // TODO: same as MOVIE action (create generic handler)
      if (!action.payload) return { ...state };

      return { ...state };
    case ACTIONS.SET_LIST:
      console.log('SET LIST');
      const { payload: currList } = action;

      if (!currList) return { ...state };

      return {
        ...state,
        list: currList,
        listType: currList.type,
        listContentType: currList.contentType,
      };
    default:
      console.log('DEFAULT');
      return { ...state };
  }
};

export const DataContext = createContext(initialState);

export default function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { list, listType, listContentType } = state;

  const setList = (newList) => {
    if (!newList) return;

    dispatch({ type: ACTIONS.SET_LIST, payload: newList });
  };

  useEffect(() => {
    console.log('CTX MOUNT');
    // TODO: perform request to get the list
    setTimeout(() => {
      dispatch({ type: ACTIONS.SET_LIST, payload: MOCKED_LISTS[1] });
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('CTX FETCH');
    if (!list) return;
    console.log('CTX FETCH OK');

    const ids = list.content;

    let method = 'movie';
    let action = ACTIONS.MOVIE;

    if (list.contentType === LIST_CONTENT_TYPES.SHOWS) {
      method = 'tv';
      action = ACTIONS.SHOW;
    }

    ids.forEach((id) =>
      client[method](id).then((data) =>
        dispatch({
          type: action,
          payload: data,
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listType, listContentType]);

  return (
    <DataContext.Provider value={{ ...state, setList }}>
      {children}
    </DataContext.Provider>
  );
}
