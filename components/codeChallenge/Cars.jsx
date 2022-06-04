import React, { useState, useEffect } from "react";
import Car from "./Car";

function Cars() {
  const carData = [
    {
      id: 1,
      make: "Kia",
      model: "Sorento",
      year: 2020,
    },
    {
      id: 2,
      make: "Kia",
      model: "Optima",
      year: 2019,
    },
    {
      id: 3,
      make: "Tesla",
      model: "Model 3",
      year: 2021,
    },
    {
      id: 4,
      make: "Honda",
      model: "Civic",
      year: 2019,
    },
    {
      id: 5,
      make: "Honda",
      model: "Accord",
      year: 2018,
    },
    {
      id: 6,
      make: "Volkswagen",
      model: "Jetta",
      year: 2021,
    },
    {
      id: 7,
      make: "Toyota",
      model: "Camry",
      year: 2021,
    },
    {
      id: 8,
      make: "Ford",
      model: "Mustang",
      year: 2019,
    },
    {
      id: 9,
      make: "Ford",
      model: "F-150",
      year: 2019,
    },
    {
      id: 10,
      make: "Toyota",
      model: "Camry",
      year: 2020,
    },
    {
      id: 11,
      make: "Ford",
      model: "F-150",
      year: 2021,
    },
  ];

  const [filteredList, setFilteredList] = useState(carData);

  const [selectedYear, setSelectedYear] = useState();

  const [toggle, setToggle] = useState(true);

  const toggleContent = () => {
    setToggle(!toggle);
  };

  const mappingCars = (aCar) => {
    return <Car cars={aCar} key={aCar.id} />;
  };

  const filterByYear = (filteredData) => {
    if (!selectedYear) {
      return filteredData;
    }
    const filteredCars = filteredData.filter(
      (car) => car.year === selectedYear
    );
    console.log(filteredCars);
    return filteredCars;
  };

  const handleYearChange = (event) => {
    console.log(event);
    const inputYear = parseInt(event.target.value);
    console.log(inputYear);
    setSelectedYear(inputYear);
  };

  useEffect(() => {
    let filteredData = filterByYear(carData);
    setFilteredList(filteredData);
  }, [selectedYear]);

  return (
    <>
      <div className="container">
        <div className="row mt-3 ">
          <div className="col-md-3 mb-3">
            <button
              type="button"
              name="btnToggle"
              className="btn me-3 mb-3 btn-dark bg-gradient text-warning"
              onClick={toggleContent}
            >
              {!toggle ? "Show Cars" : "Hide Cars"}
            </button>
            <div>Filter by Year :</div>
            <select
              id="year-input"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">All</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
        <div className="row">{toggle && filteredList.map(mappingCars)}</div>
      </div>
    </>
  );
}

export default Cars;
