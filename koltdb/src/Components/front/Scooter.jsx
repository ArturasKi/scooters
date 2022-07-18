import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Scooter({ scooter }) {

  const {setCreateComment, setRateNow} = useContext(FrontContext);

  const [comment, setComment] = useState('');
  const [rate, setRate] = useState('5');

  const handleComment = () => {
    setCreateComment({comment, scooterId: scooter.id}); 
    // kai paspaudžiamas mygtukas 'comment' nukeliauja į front, useEffect'e pasikeičia createComment;
    // taip pat perduodamas scooterId: scooter.id, kad žinotume, kokiam paspirtukui komentaras priklauso;
    setComment(''); // kai išsiunčiam komentarą - panaikinam textarea komentaro tekstą;
  }

  const rateIt = e => {
    setRate(e.target.value);
    setRateNow({
      rate: parseInt(e.target.value),
      id: scooter.id
    });
  }

  return (
    <li className="list-group-item">
      <div className="item-front">
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
          <div
            className="aps"
            style={
              scooter.isBusy
                ? { backgroundColor: "#FF0000", marginLeft: "-15px" }
                : { backgroundColor: "#00FF21", marginLeft: "-15px" }
            }
          ></div>
          <span>Last Use Time: <i><b>{scooter.lastTimeUsed}</b></i></span>
          <span>
            Total Ride Kilometers: <i><b>{scooter.totalRideKilometres.toFixed(2)}</b></i>km
          </span>
          <span>Color:</span>
          <span className="kv" style={{backgroundColor: scooter.color}}></span>
          <span>
            {
              scooter.rate_sum ? 'Rate: ' + (scooter.rate_sum / scooter.rates).toFixed(2) : 'No rates yet'
            }
          </span>
        </div>
        <div>
          <label className="comment">Rate it: </label> 
          <select value={rate} onChange={e => setRate(e.target.value)}>
            {
              [...Array(10)].map((_, i) => <option key={i} value={10 - i}>{10 - i}</option>)
            }
          </select>
          <button className="button" value={rate} onClick={rateIt}>
            Vote
          </button>
        </div>
        <div className="content">
          <ul>
            {
              scooter.comments ? scooter.comments?.slice(0, -5).split('-^o^-,').map((c, i) => 
              <li key={i}>
                <div className="comment">{c}</div>
              </li>) : null
            }
          </ul>
          <label className="textarea-label">Enter your comment here</label>
            <textarea className="textarea-input" value={comment} onChange={e => setComment(e.target.value)}></textarea>
            <div className="buttons">
              <button className="button" onClick={handleComment}>
                Add comment
              </button>
            </div>
        </div>
      </div>
    </li>
  );
}

export default Scooter;

//{sc.isBusy ? 'Free' : 'Busy'}
// style={sc.isBusy ? {color: 'green'} : {color: 'red'}}
