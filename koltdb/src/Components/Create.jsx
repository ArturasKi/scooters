import { useContext } from "react";
import { useState } from "react";
import makeId from "../Functions/makeId";
import ScooterContext from "./ScooterContext";

function Create() {

  const {setCreateData, colors} = useContext(ScooterContext);

  const [regCode, setRegCode] = useState(makeId());
  const [color, setColor] = useState('0');

  const handleCreate = () => {
    const data = {
      regCode,
      isBusy: 0,
      lastTimeUsed: "yyyy-mm-dd",
      totalRideKilometres: 0,
      color
    };
    setCreateData(data);
    setRegCode(makeId());
    setColor('0');
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Welcome to "Kolt" scooters!</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="label">Scooter registration code</label>
            <input
              className="input-1"
              type="text"
              value={regCode}
              onChange={(e) => setRegCode(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label">Select color</label>
            <select className="input-1"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}>
              <option value='0' disabled>Select color</option>
              {
                colors ? colors.map(element => <option key={element.id} value={element.id}>{element.color}</option>) : null
              }
            </select>
          </div>
          <button className="button" onClick={handleCreate}>
            Add new "Kolt"
          </button>
        </div>
      </div>
    </>
  );
}

export default Create;

/* <div className='form-group'>
                <label className='label'>Scooter ...</label>
                <input className='input-1' type='text'></input>
                <small>Enter scooter ... here</small>
              </div>
              <div className='form-group'>
                <label className='label'>Scooter ...</label>
                <input className='input-1' type='text'></input>
                <small>Enter scooter ... here</small>
              </div> */
