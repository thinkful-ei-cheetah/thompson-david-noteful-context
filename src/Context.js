import React from 'react';

export default React.createContext({
  notes: [],
  folders: [],
  deleteNote: (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    }) },
  addNote: (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    }) },
  addFolder: (folder) => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })},
})

