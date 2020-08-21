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


const Item = ({ title, url, author, num_comments, points }) => (
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
  </div>
)

const List = ({ list }) =>
  list.map(item => <Item key={item.objectID} {...item} />)

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
  const handleChange = event => { console.log(event.target.value); setSearchTerm(event.target.value) }
  const [searchTerm, setSearchTerm] = React.useState('')
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
      <h1>{welcome.greeting} {getTitle('Bittttte')}</h1>
      <Search onSearch={handleChange} search={searchTerm} />

      <List list={searchedStories} />



    </div>
  )
}

export default App