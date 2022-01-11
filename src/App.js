import "./App.css";
import data from "./data";
import { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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

function Menu({ JsonData }) {
  //states
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);

  const [checkboxSeection, setCheckboxSeection] = useState(null);

  console.log("checkboxSeection", checkboxSeection);

  const initialItem = JsonData.filter((item) => item.parentTypeId === null);
  return (
    <div style={{ position: "relative" }} className="App">
      {initialItem.map((item) => (
        <div
          className="singleDiv"
          id={(item.extContentTypeId, item.eventTypeId)}
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
                <ArrowRightIcon />
              </div>
            )}

            {/* //1st layer data  */}
            <small
              style={{
                border: "1px solid #9f88ff",
                borderRadius: "5px",
                // padding: "10px",
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
              JsonData.filter((item1) => item1.parentTypeId === eventTypeId)
                .length > 0 && (
                <SubMenu
                  seteventTypeId={seteventTypeId}
                  eventTypeId={eventTypeId}
                  selectedEvent={selectedEvent}
                  setselectedEvent={setselectedEvent}
                  selectedEventId={selectedEventId}
                  setselectedEventId={setselectedEventId}
                  checkboxSeection={checkboxSeection}
                  setCheckboxSeection={setCheckboxSeection}
                  JsonData={JsonData.filter(
                    (item1) => item1.parentTypeId === eventTypeId
                  )}
                />
              )}

            <small style={{ position: "absolute", right: "100px" }}>
              {data.find((item1) => item1.parentTypeId === checkboxSeection) ? (
                <input
                  type="checkbox"
                  // checked
                  onChange={() => setCheckboxSeection(item.eventTypeId)}
                />
              ) : (
                <input
                  type="checkbox"
                  checked
                  onChange={() => setCheckboxSeection(item.eventTypeId)}
                />
              )}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubMenu({
  JsonData,
  seteventTypeId,
  eventTypeId,
  selectedEvent,
  setselectedEvent,
  selectedEventId,
  setselectedEventId,
  setCheckboxSeection,
  checkboxSeection,
}) {
  // const [eventTypeId, seteventTypeId] = useState(null);
  // const [selectedEvent, setselectedEvent] = useState(false);

  console.log("event id: ", eventTypeId, selectedEventId);
  console.log("JsonData", JsonData);
  console.log("checkboxSeection", checkboxSeection);
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
                .length > 0 && <ArrowRightIcon />}
            </div>
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

            <small style={{ position: "absolute", right: "100px" }}>
              <input
                type="checkbox"
                onChange={() => setCheckboxSeection(selectedEventId)}
              />
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
