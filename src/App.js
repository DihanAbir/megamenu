import "./App.css";
import data from "./data";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowDropDown";

function App() {
  return (
    <div className="App">
      <div className="mainSection">
        <header className="App-header">
          <h1>Hierarchy Menu</h1>
          <Menu JsonData={data} />
        </header>
      </div>
    </div>
  );
}

function handleParentClick(e) {
  try {
    let allInput = e.target.parentElement.parentElement
      .querySelector(".App")
      .querySelectorAll("input");
    // console.log(allInput);
    if (e.target.checked) {
      allInput.forEach((item) => {
        item.checked = true;
      });
    } else {
      allInput.forEach((item) => {
        item.checked = false;
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function Menu({ JsonData }) {
  //states
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);

  const initialItem = JsonData.filter((item) => item.parentTypeId === null);

  useEffect(() => {}, [selectedEventId]);
  return (
    <div style={{ position: "relative" }} className="App">
      {initialItem.map((item) => (
        <div
          key={item.extContentTypeId}
          style={{
            border: "1px solid #9f88ff",
            margin: "25px",
            marginLeft: "30px",
            textAlign: "left",
          }}
        >
          <div style={{}}>
            {data.filter((item1) => item1.parentTypeId === item.parentTypeId)
              .length > 1 && (
              <div style={{ position: "absolute", left: "10px" }}>
                {selectedEventId !== item.extContentTypeId ||
                selectedEvent !== true ? (
                  <ArrowRightIcon />
                ) : (
                  <ArrowLeftIcon />
                )}
              </div>
            )}
            <small style={{ position: "absolute", right: "100px" }}>
              <input
                onChange={(e) => {
                  seteventTypeId(item.eventTypeId);
                  setselectedEvent(true);
                  selectedEventId === null
                    ? setselectedEventId(item.extContentTypeId)
                    : setselectedEventId(null);
                  setTimeout(() => {
                    handleParentClick(e);
                  }, 10);
                }}
                // onClick={}
                type="checkbox"
              />
            </small>

            {/* //1st layer data  */}
            <small
              style={{
                border: "1px solid #9f88ff",
                borderRadius: "5px",
                // padding: "10px",
                textAlign: "left",
              }}
              onClick={(e) => {
                seteventTypeId(item.eventTypeId);
                setselectedEvent(!selectedEvent);
                setselectedEventId(item.extContentTypeId);
              }}
            >
              {item.eventTypeName}
            </small>

            {selectedEventId === item.extContentTypeId &&
              selectedEvent &&
              JsonData.filter((item1) => item1.parentTypeId === eventTypeId)
                .length > 0 && (
                <SubMenu
                  JsonData={JsonData.filter(
                    (item1) => item1.parentTypeId === eventTypeId
                  )}
                />
              )}

            {/* <small style={{ position: "absolute", right: "100px" }}>
              <input type="checkbox" />
            </small> */}
          </div>
        </div>
      ))}
    </div>
  );
}

function SubMenu({ JsonData }) {
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);

  console.log("event id: ", eventTypeId, selectedEventId);
  console.log("JsonData", JsonData);
  return (
    <div style={{ position: "relative" }} className="App">
      {JsonData.map((item) => (
        <div
          key={item.extContentTypeId}
          style={{
            border: "1px solid #9f88ff",
            margin: "25px",
            marginLeft: "30px",
            textAlign: "left",
          }}
        >
          <div style={{}}>
            <div style={{ position: "absolute", left: "10px" }}>
              {data.filter((item1) => item1.parentTypeId === item.eventTypeId)
                .length > 0 && (
                <>
                  {selectedEventId !== item.extContentTypeId ||
                  selectedEvent !== true ? (
                    <ArrowRightIcon />
                  ) : (
                    <ArrowLeftIcon />
                  )}
                </>
              )}
            </div>
            <small style={{ position: "absolute", right: "100px" }}>
              <input onChange={(e) => handleParentClick(e)} type="checkbox" />
            </small>
            <small
              style={{
                border: "1px solid #9f88ff",
                borderRadius: "5px",
                textAlign: "left",
              }}
              onClick={() => {
                seteventTypeId(item.eventTypeId);
                setselectedEvent(!selectedEvent);
                setselectedEventId(item.extContentTypeId);
              }}
            >
              {item.eventTypeName}
            </small>

            {selectedEventId === item.extContentTypeId &&
              selectedEvent &&
              data.filter((item1) => item1.parentTypeId === eventTypeId)
                .length > 0 && (
                <SubMenu
                  JsonData={data.filter(
                    (item1) => item1.parentTypeId === eventTypeId
                  )}
                />
              )}

            {/* <small style={{ position: "absolute", right: "100px" }}>
              <input type="checkbox" />
            </small> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
