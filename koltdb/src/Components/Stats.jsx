function Stats({ scooters }) {
  return (
    <>
      <div className="form-group">
        <h5>
          Number of scooters:{" "}
          <i><b>{scooters === null ? null : scooters.length}</b></i>
        </h5>
      </div>
      <div className="form-group">
        <h5>
          Number of free scooters:{" "}
          <i><b>
            {scooters === null
              ? null
              : scooters.reduce((total, item) => total + !item.isBusy, 0)}
          </b></i>
        </h5>
      </div>
      <div className="form-group">
        <h5>
          Total kilometers:{" "}
          <i><b>
            {scooters === null
              ? null
              : scooters
                  .reduce((total, item) => total + +item.totalRideKilometres, 0)
                  .toFixed(2)}{" "}
            km
          </b></i>
        </h5>
      </div>
    </>
  );
}

export default Stats;
