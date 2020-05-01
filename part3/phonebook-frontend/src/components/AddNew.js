import React from 'react';

const AddNew = props => {
    return(<div>
      <h2>add a new</h2>
      <form onSubmit={props.handleAdd}>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.number} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>)
}

export default AddNew