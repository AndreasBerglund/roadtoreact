import React from 'react'

const styles = {

  color: '#202020',
  fontSize: '4em',
  width: '100%',
  textAlign: 'center'

}



const whyTheHell = () => {
  alert(

    'Why the hell!'
  )
}

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



const Thing = ({ thingsprops: { id, not_super } }) => <div>{id} : {not_super}A beautiful thing</div>

const List = ({ list, other }) => list.map(item => <Item key={item.objectID} {...item} other={other} />)

const Search = ({ search, onSearch }) => {

  return (
    <div>
      <label htmlFor="search">Search:</label>
      <input onChange={onSearch} id="search" type="text"></input>
      <p>Searching for : {search}</p>
      <hr />
    </div>

  )
}

const App = () => {
  const ThingsProps = {
    id: 'MY ID',
    not_super: 'My SUPER'
  }



  const handleChange = ({ target: { value } }) => {
    setSearchTerm(value)
  }

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm)
  }, [searchTerm])


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
      <Search onSearch={handleChange} search={searchTerm} />

      <List list={searchedStories} other="Beautiful" />



    </div>
  )
}

export default App