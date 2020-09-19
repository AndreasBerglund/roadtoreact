import React, { Children } from 'react';
import axios from 'axios';

import './App.scss'

import styled from 'styled-components';





import Button from './components/Button';

import { ReactComponent as Check } from './check.svg';


//import InputWithLabelClass from './components/InputWithLabel';



const styles = {

  color: '#202020',
  fontSize: '2em',
  width: '100%',
  textAlign: 'center'

}


const StyledContainer = styled.div`

height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212;

`;

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: string;
  points: number;
}
type Stories = Array<Story>;


//STORY TYPE STATE FOR STORY rEDUCER
type StoriesState = {
  data: Stories,
  isLoading: boolean,
  isError: boolean
}

//TYPE FOR ACTION TYPE IN REDUCER
interface StoriesFetchInitAction {
  type : 'STORIES_FETCH_INIT';
}
interface StoriesFetchSuccessAction {
  type : 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}
interface StoriesFetchFailureAction {
  type : 'STORIES_FETCH_FAILURE';
}
interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction = 
| StoriesFetchInitAction
| StoriesFetchSuccessAction
| StoriesFetchFailureAction
| StoriesRemoveAction;


type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
}

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};


const storiesReducer = (state: StoriesState, action: StoriesAction) => {

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


/* const getSumComments = (stories : Stories ) => {
  console.log('C');
  return stories.data.reduce(
    (result, value) => result + value.num_comments, 0
  )
}
 */


const Item = ({ item, onRemoveItem }: ItemProps) => (
  <div className='item'>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <button type="button" className="button button_small" onClick={() => { onRemoveItem(item) }}>
      <Check height="18px" width="18px" />
    </button>

  </div>
)

type InputWithLabelProps = {
  id : string;
  label : string;
  type? : string;
  value : string;
  onInputChange : ( event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused : boolean;
  children : React.ReactNode;
};

const InputWithLabel = ({ id, type = 'text', value, onInputChange, isFocused, children }: InputWithLabelProps)  => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused])

  return (
    <>
      <label htmlFor={id} className="label" >{children}</label>
      <input
        ref={inputRef}
        onChange={onInputChange}
        id={id}
        type={type}
        // autoFocus={isFocused}
        value={value}
        className="input"
      />
    </>
  )
}

/* 
const Thing = ({ thingsprops: { id, not_super } }) => <div>{id} : {not_super}A beautiful thing</div>
 */


const List = React.memo(
  ({ list, onRemoveItem }: ListProps) =>
    (
    <>
    {list.map(item => <Item
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />)}
    
    </>
    )
);
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

const useSemiPersistentState = (key: string, initialState: string): [string, (newValue: string) => void] => {

  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log('A');
      localStorage.setItem(key, value)
    }
  }, [value, key])
  return [value, setValue]
}

const App = () => {
  const ThingsProps = {
    id: 'MY ID',
    not_super: 'My SUPER'
  }

  console.log('B:App');

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleSearchSubmit = (event : React.FormEvent<HTMLFormElement> )=> {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    event.preventDefault();
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

  type SearchFormProps = {
    searchTerm : string;
    onSearchInput : ( event : React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit : ( event : React.FormEvent<HTMLFormElement>)  => void;
  }
  
  

  const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit } : SearchFormProps) => {
    return (
      <form onSubmit={onSearchSubmit} className="search-form">
        <InputWithLabel
          id="search"
          label="Search"
          value={searchTerm}
          isFocused
          onInputChange={onSearchInput} >

          <strong>Search:</strong>
        </InputWithLabel >

        <InputWithLabel
          id="search"
          label="Search"
          value={searchTerm}
          isFocused
          onInputChange={onSearchInput} >

          <strong>Search:</strong>
        </InputWithLabel>
        <Button type="submit" disabled={!searchTerm} className="button_large">Submit search</Button>
      </form>
    )
  }

  type counterState = {
    number : number;
  }

  interface CounterIncreaseAction {
    type : 'COUNTER_INCREASE';
  }
  interface CounterDecreaseAction {
    type : 'COUNTER_DECREASE';
  }

  type counterAction = 
  | CounterIncreaseAction
| CounterDecreaseAction;

  const counterReducer = (state : number, action: counterAction) => {
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

  //const [stories, setStories] = React.useState([]);
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  /* const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
 */



  const handleFetchStories = React.useCallback(async () => {
    if (searchTerm == '') return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits
      })
    } catch {
      dispatchStories({
        type: 'STORIES_FETCH_FAILURE'
      });
    }


  }, [url, searchTerm])

  React.useEffect(() => {
    handleFetchStories()
    /*     getAsyncStories().then(result => {
          //setStories(result.data.stories)
          dispatchStories({ type: 'STORIES_FETCH_SUCCESS', payload: result.data.stories })
    
        }).catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' })); */
  }, [handleFetchStories]);

  const handleRemoveStory = React.useCallback((item: Story) => {
    const newStories = stories.data.filter(
      story => item.objectID !== story.objectID
    )
    //setStories(newStories)
    dispatchStories({ type: 'REMOVE_STORY', payload: item })
  }, [])

  /* const searchedStories = stories.data.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
 */

  //const sumComments = React.useMemo(() => getSumComments(stories), []);
  //const sumComments = getSumComments(stories);
  return (

     
    <>
        <h1 className="headline-primary">{ 'shit '}</h1>
        <SearchForm searchTerm={searchTerm} onSearchInput={handleChange} onSearchSubmit={handleSearchSubmit} />


        {stories.isError && <p>Something went wrong...</p>}

        {stories.isLoading ? (
          <p>Loading...</p>
        ) :

          <List list={stories.data} onRemoveItem={handleRemoveStory} />

        }

        <button onClick={handleIncrease}>INCREASE</button>
        <p>Count: {count}</p>
        <button onClick={handleDecrease}>DECREASE</button>


  </>
  
  )
}

export default App