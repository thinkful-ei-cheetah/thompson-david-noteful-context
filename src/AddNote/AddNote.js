import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import config from '../config'
import context from '../Context'
import cuid from 'cuid'
import PropTypes from 'prop-types'



export default class AddNote extends Component {
  state = {
    error: null,
  }

  validateNoteName = noteName => {
    
    if (noteName.replace(/[\s-]/g, '') === '') {
      this.setState({ error: 'Note name cannot be all spaces.' })
      return false
    }
    return true
  }  

 static contextType = context;

  handleClickAdd = e => {
    e.preventDefault()

    const { noteName, contentInput, folder } = e.target

    const newNote = {
      id: cuid(),
      name: noteName.value,
      content: contentInput.value,
      folderId: folder.value,
      modified: new Date()
    }

    this.setState({ error: null })
    if (!this.validateNoteName(newNote.name)) {
      console.log(this.state.error)
      return this.render()
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
        this.context.addNote(newNote)
        this.props.history.push(`/folder/${newNote.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { error } = this.state
    const { folders = [] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleClickAdd}>
          <div className='noteField'>
            <div className='AddFolder_error' role='alert'>
              {error && <p>{error}</p>}
            </div>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name="noteName" required />
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
AddNote.propTypes = {history: PropTypes.object}