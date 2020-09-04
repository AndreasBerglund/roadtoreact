import React from 'react';
import axios from 'axios';

const styles = {

  color: '#202020',
  fontSize: '2em',
  width: '100%',
  textAlign: 'center'

}


const storiesReducer = (state, action) => {

  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID != story.objectID
        )
      };
    default:
      throw new Error();
  }

}


/* const whyTheHell = () => {
  alert(

    'Why the hell!'
  )
} */

const welcome = {
  greeting: 'Hey',
  title: 'Bitchass!'
}

function getTitle(title) {

  return title


}


const Item = ({ item, onRemoveItem, other }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{other}</span>
    <button type="button" onClick={() => { onRemoveItem(item) }}>remove</button>
  </div>
)


const InputWithLabel = ({ id, type = 'text', value, onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        onChange={onInputChange}
        id={id}
        type={type}
        // autoFocus={isFocused}
        value={value}
      />
    </>
  )
}


const Thing = ({ thingsprops: { id, not_super } }) => <div>{id} : {not_super}A beautiful thing</div>

const List = ({ list, other, onRemoveItem }) => list.map(item => <Item key={item.objectID} item={item} other={other} onRemoveItem={onRemoveItem} />)
/* 
const Search = ({ searchTerm, onSearch }) => {

  return (
    <>
      <label htmlFor="search">Search:</label>
      <input
        onChange={onSearch}
        id="search"
        type="text"
        value={searchTerm}
      ></input>
      <p>Searching for : {searchTerm}</p>
      <hr />
    </>

  )
}
 */

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )
  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])
  return [value, setValue]
}

const App = () => {
  const ThingsProps = {
    id: 'MY ID',
    not_super: 'My SUPER'
  }

  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value)
  }
  const handleSearchSubmit = () => {
    setUrl( `${API_ENDPOINT}${searchTerm}`)
  }

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', '');
  const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';
  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );


  const initialStories = [
    {
      title: 'React',
      url: 'https://react.org',
      author: 'Some Guy',
      num_comments: 3,
      points: 4,
      objectID: 0
    },

    {
      title: 'Redux',
      url: 'https://react.org',
      author: 'Guy Ritch',
      num_comments: 2,
      points: 5,
      objectID: 1
    }

  ]


  const counterReducer = (state, action) => {
    switch (action.type) {
      case 'COUNTER_INCREASE':
        return state + 1;
      case 'COUNTER_DECREASE':
        return state - 1;
      default:
        throw new Error();
    }
  }



  const [count, countDispatch] = React.useReducer(counterReducer, 0);

  const handleIncrease = () => {
    countDispatch({ type: 'COUNTER_INCREASE' })
  }
  const handleDecrease = () => {
    countDispatch({ type: 'COUNTER_DECREASE' })
  }

  React.useEffect(() => {
    document.title = 'You clicked :' + count;
  }, [count]);


  //async
  const getAsyncStories = () =>
    /* new Promise(resolve => {

    }) */
    new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: { stories: initialStories } }), 500)
      //setTimeout(reject, 2000)
    })


  //const [stories, setStories] = React.useState([]);
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  /* const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
 */


    const handleFetchStories = React.useCallback( () => {
      if (searchTerm == '') return;
      dispatchStories({ type: 'STORIES_FETCH_INIT' });
  
      axios.get(url).then( result => { dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      })}).catch( () => dispatchStories({type:'STORIES_FETCH_FAILURE'}))
  
    }, [url])

  React.useEffect(() => {
handleFetchStories()
/*     getAsyncStories().then(result => {
      //setStories(result.data.stories)
      dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.data.stories })

    }).catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' })); */
  }, [handleFetchStories]);

  const handleRemoveStory = item => {
    const newStories = stories.data.filter(
      story => item.objectID !== story.objectID
    )
    //setStories(newStories)
    dispatchStories({ type: 'REMOVE_STORY', payload: item })
  }

  /* const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
 */

  return (
    <div style={styles}>
      <Thing thingsprops={ThingsProps} />
      <h1>{welcome.greeting} {getTitle('Bittttte')}</h1>

      <InputWithLabel 
        id="search" 
        label="Search" 
        value={searchTerm} 
        isFocused 
        onInputChange={handleChange} >
          
        <strong>Search:</strong>
        </InputWithLabel >
        <button type="button" disabled={!searchTerm} onClick={handleSearchSubmit}>Submit search</button>
      <hr />

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) :

        <List list={stories.data} other="Beautiful" onRemoveItem={handleRemoveStory} />

      }
      <button onClick={handleIncrease}>INCREASE</button>
      <p>Count: {count}</p>
      <button onClick={handleDecrease}>DECREASE</button>


    </div>
  )
}

export default App