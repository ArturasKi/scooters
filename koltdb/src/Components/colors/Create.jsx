import { useContext } from "react";
import { useState } from "react";
import ColorContext from "./ColorContext";

function Create() {
  const { setCreateData } = useContext(ColorContext);

  const [color, setColor] = useState("");

  const handleCreate = () => {
    const data = { color };
    setCreateData(data);
    setColor("");
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label className="label">Color</label>
            <input
              className="input-1"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button className="button" onClick={handleCreate}>
            Add new color
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
