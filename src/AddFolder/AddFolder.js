import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import context from '../Context'
import config from '../config'

export default class AddFolder extends Component {
  state = {
    error: null,
  }
  
  validateFolderName = folderName => {
    console.log(folderName)
    if (folderName.replace(/[\s-]/g, '') === '') {
      this.setState({ error: 'Folder name cannot be all spaces.' })
      return false
    }
    return true
  }  
    
  static defaultProps = {
    history: {
      push: () => { }
    },
  } 
  static contextType = context;


  handleClickAdd = e => {
    e.preventDefault()

    const { folderName } = e.target

    const newFolder = {
      name: folderName.value,
    }

    this.setState({ error: null })
    if (!this.validateFolderName(newFolder.name)) {
      console.log(this.state.error)
      return this.render()
    }

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addFolder(newFolder)
        this.props.history.push(`/folder/${newFolder.id}`)
      })
      .catch(error => {
        console.error({ error })
        this.setState({ error })
      })
  }

  render() {
    const { error } = this.state
    console.log('rendering')
    console.log(error)

    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm to='/' onSubmit={this.handleClickAdd}>
          <div className='field'>
            <div className='AddFolder_error' role='alert'>
              {error && <p>{error}</p>}
            </div>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folderName' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}