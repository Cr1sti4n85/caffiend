import { useState } from "react";
import { coffeeOptions } from "../utils";
import Modal from "./Modal";
import Authentication from "./Authentication";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

function CoffeeForm(props) {
  const { isAuthenticated } = props;
  const [showModal, setShowModal] = useState(false);

  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showCoffeeTypes, setShowCoffeeTypes] = useState(false);
  const [coffeeCost, setCoffeeCost] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);

  const { globalData, setGlobalData, globalUser } = useAuth();

  async function handleSubmitForm() {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    try {
      //submit form only if it is completed
      if (!selectedCoffee) return;

      //create new data object
      const newGlobalData = {
        ...(globalData || {}),
      };

      const nowTime = Date.now();

      const timeToSubstract = hour * 60 * 60 * 1000 + min * 60 * 100;

      const timestamp = nowTime - timeToSubstract;

      const newData = { name: selectedCoffee, cost: coffeeCost };

      newGlobalData[timestamp] = newData;
      //update global state

      setGlobalData(newGlobalData);

      //persist data in firestore
      const userRef = doc(db, "users", globalUser.uid);
      await setDoc(
        userRef,
        {
          [timestamp]: newData,
        },
        { merge: true } //not overwrite info, but merge it
      );

      setSelectedCoffee(null);
      setHour(0);
      setMin(0);
      setCoffeeCost(0);
    } catch (error) {
      console.log(error);
    }
  }

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <Authentication handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className="section-header">
        <i className="fa-solid fa-pencil"></i>
        <h2>Start Tracking Today</h2>
      </div>
      <h4>Select coffee type</h4>
      <div className="coffee-grid">
        {coffeeOptions.slice(0, 5).map((option, optindex) => {
          return (
            <button
              onClick={() => {
                setSelectedCoffee(option.name);
                setShowCoffeeTypes(false);
              }}
              className={
                "button-card " +
                (option.name === selectedCoffee ? "coffee-button-selected" : "")
              }
              key={optindex}
            >
              <h4>{option.name}</h4>
              <p>{option.caffeine} mg</p>
            </button>
          );
        })}
        <button
          onClick={() => {
            setShowCoffeeTypes(true);
            setSelectedCoffee(null);
          }}
          className={
            "button-card " + (showCoffeeTypes ? "coffee-button-selected" : "")
          }
        >
          <h4>Other</h4>
          <p>n/a</p>
        </button>
      </div>
      {showCoffeeTypes && (
        <select
          onChange={(e) => {
            setSelectedCoffee(e.target.value);
          }}
          name="coffee-list"
          id="coffee-list"
        >
          <option value={null}>Select Type</option>
          {coffeeOptions.map((option, optIndex) => {
            return (
              <option value={option.name} key={optIndex}>
                {option.name} ({option.caffeine}mg)
              </option>
            );
          })}
        </select>
      )}
      <h4>Add the cost ($)</h4>
      <input
        type="number"
        className="w-full"
        placeholder="4.50"
        value={coffeeCost}
        onChange={(e) => {
          setCoffeeCost(e.target.value);
        }}
      />
      <h4>Time since consumption</h4>
      <div className="time-entry">
        <div>
          <h6>Hours</h6>
          <select
            onChange={(e) => {
              setHour(e.target.value);
            }}
            name="hours-select"
            id="hours-select"
          >
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
          <select
            onChange={(e) => {
              setMin(e.target.value);
            }}
            name="mins-select"
            id="mins-select"
          >
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
      <button onClick={handleSubmitForm}>
        <p>Add entry</p>
      </button>
    </>
  );
}

export default CoffeeForm;
