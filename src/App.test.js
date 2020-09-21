import React from 'react';

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