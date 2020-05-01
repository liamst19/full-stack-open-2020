import React from 'react';

const Person = props => {

  const handleDelete = e => {
    if(window.confirm(`Delete ${props.person.name}?`)) props.handleDelete(props.person);
  }

  return (
  <li key={props.person.id}>
      {props.person.name} {props.person.number}
      <button onClick={handleDelete}>delete</button>
  </li>
  )
};

const PhoneBook = props => {
    return (
      <div>
        <h2>Numbers</h2> 
        <ul>
          {props.persons.map(person => <Person key={person.id} person={person} handleDelete={props.handleDelete} />)}  
        </ul>
      </div>
    );
}

export default PhoneBook