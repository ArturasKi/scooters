import { useContext } from "react";
import ScooterContext from "./ScooterContext";

function Scooter({ scooter }) {

  const {setDeleteData, setModalData, handleDeleteComment} = useContext(ScooterContext);

  const handleDelete = () => {
    setDeleteData(scooter);
  };

  const handleEdit = () => {
    setModalData(scooter);
  };

  return (
    <li className="list-group-item">
      <div className="item">
        <div className="content">
          <span>
            ID: <i><b>{scooter.id}</b></i>
          </span>
          <span>
            Reg.Code: <i><b>{scooter.regCode}</b></i>
          </span>
          <span>
            Availability: <b></b>
          </span>
          <span
            className="aps"
            style={
              scooter.isBusy
                ? { backgroundColor: "#FF0000", marginLeft: "-15px" }
                : { backgroundColor: "#00FF21", marginLeft: "-15px" }
            }
          ></span>
          <span>Last Use Time: <i><b>{scooter.lastTimeUsed}</b></i></span>
          <span>
            Total Ride Kilometers: <i><b>{scooter.totalRideKilometres.toFixed(2)}</b></i>km
          </span>
          <span>Color:</span>
          <span className="kv" style={{backgroundColor: scooter.color}}></span>
        </div>
        <div className="buttons">
          <button className="button" onClick={handleEdit}>
            Edit
          </button>
          <button className="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <ul className="comment-list list-group">
        {
          scooter.comments ? scooter.comments?.slice(0, -5).split('-^o^-,').map((c, i) => (

          <li className="list-group-item" key={i}>
            <div className="comment">{c} {scooter.comments_id.split(',')[i]}</div>
            <button className="button" onClick={() => handleDeleteComment(scooter.comments_id.split(',')[i])}>Delete</button>
          </li>
          
          )) : null
        }
      </ul>
    </li>
  );
}

export default Scooter;

//{sc.isBusy ? 'Free' : 'Busy'}
// style={sc.isBusy ? {color: 'green'} : {color: 'red'}}
