import React, {useState, useEffect} from 'react'
import phonebookdata from './services/phonebookdata'

import Filter from './components/Filter'
import AddNew from './components/AddNew'
import PhoneBook from './components/PhoneBook'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ message, setMessageContent ] = useState({
  })

  useEffect(()=>{
    phonebookdata.getNumbers()
      .then(data=> {
        setPersons(data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.includes(filterName))

  const setMessage = msg => {
    setMessageContent(msg)
    if(msg.type !== 'removed'){
      window.setTimeout(()=> setMessageContent({}), 2000)
    }
  }

  const handleAdd = e => {
    e.preventDefault()

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    const oldPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if(oldPerson){
      if(window.confirm(`${newPerson.name} is already added to phonebook. Replace old number with a new one?`)){
        phonebookdata
          .updateNumber({
            name: newPerson.name,
            number: newPerson.number,
            id: oldPerson.id
          })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person ))
            setMessage({type: 'updated', name: updatedPerson.name})
          })
          .catch(()=>{
            setMessage({type: 'error', name: oldPerson.name})
          })
      }
    }
    else{
      phonebookdata
        .addNumber(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setMessage({type: 'added', name: person.name})
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = personToDelete => {
    phonebookdata
      .deleteNumber(personToDelete)
      .then(() => {
        setPersons(persons.filter(person => person.id !== personToDelete.id))
        setMessage({type: 'deleted', name: personToDelete.name})
      })
  }

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilterName(e.target.value)

  return (<div>
      <h1>Phonebook</h1>
      <Message message={message} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <AddNew 
        name={newName} handleNameChange={handleNameChange} 
        number={newNumber} handleNumberChange={handleNumberChange}
        handleAdd={handleAdd} />
      <PhoneBook persons={personsToShow} handleDelete={handleDelete} />
  </div>)
}

export default App
