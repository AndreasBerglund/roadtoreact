import React from 'react'

const styles = {

  color: '#202020',
  fontSize: '4em',
  width: '100%',
  textAlign: 'center'

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

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

  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    document.title = 'You clicked :' + count;
  }, [count])

  //async
  const getAsyncStories = () =>
    new Promise(resolve => {
      setTimeout(() => resolve({ data: { stories: initialStories } }), 500)
    })


  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => {
      setStories(result.data.stories)
      setIsLoading(false)
    }).catch(() => setIsError(true));
  }, []);

  const handleRemoveStory = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    )
    setStories(newStories)
  }

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div style={styles}>
      <Thing thingsprops={ThingsProps} />
      <h1>{welcome.greeting} {getTitle('Bittttte')}</h1>

      <InputWithLabel id="search" label="Search" value={searchTerm} isFocused onInputChange={handleChange} ><strong>Search:</strong></InputWithLabel >
      <hr />

      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) :

        <List list={searchedStories} other="Beautiful" onRemoveItem={handleRemoveStory} />

      }
      <button onClick={() => setCount(count + 1)}>Clic m,e</button>

    </div>
  )
}

export default App