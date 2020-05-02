import React from 'react';
import '../css/Message.css';

const addedMsg = name => `Added ${name}`;
const updatedMsg = name => `Updated number for ${name}`;
const deletedMsg = name => `Deleted ${name}`;
const alreadyRemovedMsg = name => `Information of ${name} has already been removed from server`;

const ErrorMessages = props => {
  if(props.errors.length > 1){
    return props.errors[0].message
  }
  else if(props.errors.length === 1){
    return (<ul>
           {props.errors.map((error, i) => <li key={i}>{error.message}</li>)}
         </ul>)
  }
  else{
    return props.errors.message;
  }
}

const Message = props => {

  const switchMsg = (message) => {
    switch(message.type){
    case 'added':
      return addedMsg(message.name);
    case 'deleted':
      return deletedMsg(message.name);
    case 'updated':
      return updatedMsg(message.name);
    case 'error':

      return message.errors ? message.errors.response.data.error.message : 'something went wrong'
      // return <ErrorMessages errors={message.errors.response.data.error} />;
    default:
      return '';
    }
  }

  return (<div className={`message ${props.message.type}`}>
  {switchMsg(props.message)}
</div>)
};

export default Message;
