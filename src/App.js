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


const Item = ({ title, url, author, num_comments, points, other }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{other}</span>
  </div>
)

const InputWithLabel = ({id, type = 'text', value, onInputChange, isFocused, children}) => {
const inputRef = React.useRef();

React.useEffect( () => {
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

const List = ({ list, other }) => list.map(item => <Item key={item.objectID} {...item} other={other} />)
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

  const stories = [
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

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <div style={styles}>
      <Thing thingsprops={ThingsProps} />
      <h1>{welcome.greeting} {getTitle('Bittttte')}</h1>
    
      <InputWithLabel id="search" label="Search" value={searchTerm} isFocused onInputChange={handleChange} ><strong>Search:</strong></InputWithLabel >
  
      <List list={searchedStories} other="Beautiful" />

    </div>
  )
}

export default App