// import { useContext } from "react";
import { useContext } from "react";
import Scooter from "./Scooter";
import FrontContext from "./FrontContext";
// import Sorting from "../Sorting";
// import Stats from "../Stats";

function ScooterList() {

  const {scooters} = useContext(FrontContext);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>List of scooters</h2>
        </div>
        <div className="card-body">
          {/* <Stats scooters={scooters}/>
          <Sorting/> */}
          <ul className="list-group">
          {scooters ? scooters.map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                      ></Scooter>
                    ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ScooterList;
