import { LIST_TYPES, LIST_CONTENT_TYPES } from './enums';

const MOCKED_LISTS = [
  {
    _id: '01',
    type: LIST_TYPES.FAVORITE,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: []
  },
  {
    _id: '02',
    type: LIST_TYPES.WATCHED,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: []
  },
  {
    _id: '03',
    type: LIST_TYPES.WATCH_LIST,
    contentType: LIST_CONTENT_TYPES.MOVIES,
    content: []
  },
]


function App() {
  return <h1>Movies List!</h1>;
}

export default App;
