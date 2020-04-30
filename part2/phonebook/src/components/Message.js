import React from 'react';
import '../css/Message.css';

const addedMsg = name => `Added ${name}`;
const updatedMsg = name => `Updated number for ${name}`;
const deletedMsg = name => `Deleted ${name}`;
const alreadyRemovedMsg = name => `Information of ${name} has already been removed from server`;

const Message = props => {

    const switchMsg = (type, name) => {
        switch(type){
            case 'added':
                return addedMsg(name);
            case 'deleted':
                return deletedMsg(name);
            case 'error':
                return alreadyRemovedMsg(name);
            case 'updated':
                return updatedMsg(name);
            default: 
                return '';
        }
    }

    return (<div className={`message ${props.message.type}`}>
       {switchMsg(props.message.type, props.message.name)} 
    </div>)    
};

export default Message;