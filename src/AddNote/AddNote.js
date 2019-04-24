import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import config from '../config'
import context from '../Context'
import Note from '../Note/Note'

export default class AddNote extends Component {
  // static defaultProps = {
    
  // }


 

 static contextType = context;

  handleClickAdd = e => {
    e.preventDefault()

    console.log(e)
    const { name, content, folderId } = e.target
    
    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folderId.value
      
    }
    console.log(e.target)

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
        // this.props.onDeleteNote(noteId)
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
        <NotefulForm>
          <div className='noteField'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' />
          </div>
          <div className='bodyField'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit' onClick={this.handleClickAdd(
              <Note {...this.noteField.value} {...this.bodyField.value} {...`11/11/2019`} />
            )}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
