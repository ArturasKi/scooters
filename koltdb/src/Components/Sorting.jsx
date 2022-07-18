import { useContext } from "react";
import { scootersSort } from "../Functions/localStorage";
import ScooterContext from "./ScooterContext";

function Sorting() {

  const { sortScooters, setSortScooters } = useContext(ScooterContext);

  return (
    <>

          <div className="form-group">
            <h5>Sort{' '}</h5>
            <select
              className="select-opt"
              value={sortScooters}
              onChange={(e) => {
                setSortScooters(e.target.value);
                scootersSort(e.target.value);
                console.log("Opa");
              }}
            >
              <option value="1">ID</option>
              <option value="2">Max km</option>
              <option value="3">Min km</option>
              <option value="4">Last used</option>
              <option value="5">Availability</option>
            </select>
          </div>

    </>
  );
}

export default Sorting;

// const handleSort = () => {
//     const sortedData = [...sortScooters].sort((a, b) => {
//         return (b.totalRideKilometres - a.totalRideKilometres)
//     });
//     setSortScooters(sortedData);
//     console.log('Kuku')
// }

// const listScooters = sortScooters.map((object) => {
//     return <Scooter key={object.id} sc={sc} setDeleteData={setDeleteData} setModalData={setModalData}></Scooter>
// });
