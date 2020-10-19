import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import App, { List, Item, storiesReducer, SearchForm } from './App';

const storyOne = {
  title : 'React',
  url : 'https://reactjs.org/',
  author : 'Jordan Walke',
  num_comments: 3,
  points : 4,
  objectID : 0
}


const storyTwo = {
  title : 'Redux',
  url : 'https://reactjs.org/',
  author : 'Jordan Walke',
  num_comments: 3,
  points : 4,
  objectID : 1
}

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
  test('remove a story from all stories', () => {
    const action = { type : 'REMOVE_STORY', payload : storyOne }; // TODO: som aciotn
    const state = { data: stories, isLoading : false, isError : false }// some state

    const newState = storiesReducer(state, action);
    const expecedState = {
      data : [storyTwo],
      isLoading : false,
      isError : false,
    }// exptecdsf
    expect(newState).toStrictEqual(expecedState);
  })
})


describe('somthing truthy and falsy', () => {
  test('true to be true', () => {
    expect(true).toBe(true);
  });

  test('false to be false', () => {
    expect(false).toBe(false);
  });

})

describe('App components', () => {
  test('removes an item when clicking dismiss', () => {

  });

  test('request initial stories from API', ()=> {

  });
})


describe('Item', ()=> {
  test('renders all properties',  ()=> {
    render( <Item item={storyOne} />);
    //screen.debug();
    
    
    //assertive testing
    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );
  });

  test('renaders a clickable dismiss button', ()=> {
    render(<Item item={storyOne} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });


  test('clicking calls the handler', ()=> {
    const handleRemoveItem = jest.fn();
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleRemoveItem).toHaveBeenCalledTimes(1); });

});


describe('SearchForm', ()=> {

  const searchFormProps = {
    searchTerm : 'React',
    onSearchInput : jest.fn(),
    onSearchSubmit : jest.fn()
  }

 test('reander the input field with its value', ()=> {
  render(<SearchForm {...searchFormProps} />);
  //screen.debug();
  expect( screen.getByDisplayValue('React') ).toBeInTheDocument();

})

test('renders the coorect lavbel', () => {
  render(<SearchForm {...searchFormProps} />);
  expect(screen.getByLabelText(/Search/)).toBeInTheDocument();

})
  
test('calls onSearchInput on input field change',  ()=> {
  render(<SearchForm {...searchFormProps} />);
  fireEvent.change(screen.getByDisplayValue('React'), {
    target : { value : 'Redux'}
  });

  expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);

});

test('calls onSearchSubmit on button submit click',  ()=> {
  render(<SearchForm {...searchFormProps} />);
  fireEvent.submit(screen.getByRole('button'));

  expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);

});

})