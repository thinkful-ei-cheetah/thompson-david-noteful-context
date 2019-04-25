import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import config from '../config'
import context from '../Context'
import Note from '../Note/Note'

export default class AddNote extends Component {


 static contextType = context;

  handleClickAdd = e => {
    e.preventDefault()

    const { noteName, contentInput, folder } = e.target
    
    const newNote = {
      name: noteName.value,
      content: contentInput.value,
      folderId: folder.value
    }
  
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.props.history.push(`/folder/${newNote.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  
  render() {
    const { folders = [] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleClickAdd}>
          <div className='noteField'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name="noteName" />
          </div>
          <div className='bodyField'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name="contentInput" />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name="folder">
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
