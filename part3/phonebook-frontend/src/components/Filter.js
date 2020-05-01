import React from 'react';

const Filter = props => {
    return(<div>
      <form>
        filter shown with <input value={props.filterName} onChange={props.handleFilterChange} />
      </form>
    </div>);
}

export default Filter