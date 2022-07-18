function Color({ color }) {

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <span>{color.color}</span>
          <span className="kv" style={{backgroundColor: color.color}}></span>
          <ul className="list-group">
            {
            color.kolt_id ? color.kolt_id.split(',').map((k, i) => <li className="element" key={i}>{k}</li>) : null
            }
          </ul>
        </div>
      </div>
    </li>
  );
}

export default Color;

//{sc.isBusy ? 'Free' : 'Busy'}
// style={sc.isBusy ? {color: 'green'} : {color: 'red'}}
