import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'

export default class AddFolder extends Component {
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' />
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



























// import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
// import './AddFolder.css'
// import context from '../Context'
// import config from '../config'


// export default class AddFolder extends Component {
//   static defaultProps = {
//     history: {
//       push: () => { }
//     },
//   }
//   static contextType = context;

//   handleClickAdd = e => {
//     e.preventDefault()

//     const { folderName } = e.target

//     const newFolder = {
//       name: folderName.value,
//     }

//     fetch(`${config.API_ENDPOINT}/folders`, {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(newFolder)
//     })
//       .then(res => {
//         if (!res.ok)
//           return res.json().then(e => Promise.reject(e))
//         return res.json()
//       })
//       .then(newFolder => {
//         this.context.addFolder(newFolder)
//         this.props.history.push(`/folder/${newFolder.id}`)
//         console.log(newFolder.id)
//       })
//       .catch(error => {
//         console.error({ error })
//       })
//   }







//   render() {
//     return (
//       <section className='AddFolder'>
//         <h2>Create a folder</h2>
//         <NotefulForm to='/' onSubmit={this.handleClickAdd}>
//           <div className='field'>
//             <label htmlFor='folder-name-input'>
//               Name
//             </label>
//             <input type='text' id='folder-name-input' name='folderName' />
//           </div>
//           <div className='buttons'>
//             <button type='submit'>
//               Add folder
//             </button>
//           </div>
//         </NotefulForm>
//       </section>
//     )
//   }
// }
