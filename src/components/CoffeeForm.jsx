import { coffeeOptions } from "../utils";

function CoffeeForm() {
  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-pencil"></i>
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optindex) => {
          return (
            <button className="button-card" key={optindex}>
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button className="button-card">
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      <select name="coffee-list" id="coffee-list">
        <option value={null}>Select Type</option>
        {coffeeOptions.map((option, optIndex) => {
          return (
            <option value={option.name} key={optIndex}>
              {option.name} ({option.caffeine}mg)
            </option>
          );
        })}
      </select>
      <h4>ADd the cost ($)</h4>
      <input type="number" className="w-full" placeholder="4.50" />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select name="hours-select" id="hours-select">
            {hours.map((hour, index) => {
              return (
                <option key={index} value={hour}>
                  {hour}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h6>Mins</h6>
          <select name="mins-select" id="mins-select">
            {mins.map((min, index) => {
              return (
                <option key={index} value={min}>
                  {min}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button>
        <p>Add entry</p>
      </button>
    </>
  );
}

export default CoffeeForm;
