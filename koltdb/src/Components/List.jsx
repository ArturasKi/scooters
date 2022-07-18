// import { useContext } from "react";
import { useContext } from "react";
import Scooter from "./Scooter";
import ScooterContext from "./ScooterContext";
import Sorting from "./Sorting";
import Stats from "./Stats";

function List() {

  const {scooters, setDeleteData, setModalData, sortScooters} = useContext(ScooterContext);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>List of scooters</h2>
        </div>
        <div className="card-body">
          <Stats scooters={scooters}/>
          <Sorting/>
          <ul className="list-group">
          {sortScooters === "1"
              ? scooters === null
                ? null
                : [...scooters]
                    .sort((a, b) => a.id - b.id)
                    .map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                        setDeleteData={setDeleteData}
                        setModalData={setModalData}
                      ></Scooter>
                    ))
              : null}
            {sortScooters === "2"
              ? scooters === null
                ? null
                : [...scooters]
                    .sort(
                      (a, b) => b.totalRideKilometres - a.totalRideKilometres
                    )
                    .map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                        setDeleteData={setDeleteData}
                        setModalData={setModalData}
                      ></Scooter>
                    ))
              : null}
            {sortScooters === "3"
              ? scooters === null
                ? null
                : [...scooters]
                    .sort(
                      (a, b) => a.totalRideKilometres - b.totalRideKilometres
                    )
                    .map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                        setDeleteData={setDeleteData}
                        setModalData={setModalData}
                      ></Scooter>
                    ))
              : null}
            {sortScooters === "4"
              ? scooters === null
                ? null
                : [...scooters]
                    .sort((a, b) =>
                      a.lastTimeUsed.localeCompare(b.lastTimeUsed)
                    )
                    .map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                        setDeleteData={setDeleteData}
                        setModalData={setModalData}
                      ></Scooter>
                    ))
              : null}
            {sortScooters === "5"
              ? scooters === null
                ? null
                : [...scooters]
                    .sort((a) =>
                    a.isBusy ? 1 : -1
                    )
                    .map((scooter) => (
                      <Scooter
                        key={scooter.id}
                        scooter={scooter}
                        setDeleteData={setDeleteData}
                        setModalData={setModalData}
                      ></Scooter>
                    ))
              : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default List;
