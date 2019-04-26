import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import Context from '../Context'
import config from '../config'


export default class NoteListNav extends React.Component {
  static defaultProps = {
    onDeleteFolder: () => { },
  }
  static contextType = Context

  handleClickDelete = e => {
  
    const folderId = e.currentTarget.value

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteFolder(folderId)
        this.props.onDeleteFolder(folderId)
        // this.props.notes.map(note => {
        //   if (note.folderId === folderId) {
        //     this.context.deleteNote(note.id)
        //   }})
        })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders = [], notes = [] } = this.context;
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li className="NoteListNav__li" key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
                <br></br>
                <button className="NoteListNav__folder_delete" onClick={this.handleClickDelete} value={folder.id}>
                  <FontAwesomeIcon icon='trash-alt' />
                  {' '}
                  remove
                </button>
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
        </CircleButton>
        </div>
      </div>
    )
  }
}

