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
    let allInput = e.target
      .closest(".header")
      .nextSibling.querySelectorAll("input");
    console.log(allInput);
    // .querySelector(".App")
    // .querySelectorAll("input");

    // console.log(allInput);
    if (e.target.checked) {
      allInput.forEach((item) => {
        item.checked = true;
      });
    } else {
      allInput.forEach((item) => {
        console.log("item", item);
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
  const [count, setCount] = useState(0);

  const [selectionArray, setSelectionArray] = useState([]);

  const initialItem = JsonData.filter((item) => item.parentTypeId === null);

  useEffect(() => {}, [selectedEventId]);
  console.log("selectionArray by checkbox clickeing ", selectionArray);
  return (
    <div className="App">
      {initialItem.map((item) => (
        <div className="singleContainer" key={item.extContentTypeId}>
          <div className="parent">
            <div className="header">
              {data.filter((item1) => item1.parentTypeId === item.parentTypeId)
                .length > 1 && (
                <div className="icon">
                  {selectedEventId !== item.extContentTypeId ||
                  selectedEvent !== true ? (
                    <ArrowRightIcon />
                  ) : (
                    <ArrowLeftIcon />
                  )}
                </div>
              )}

              {/* //1st layer data  */}
              <small
                className="eventName"
                onClick={(e) => {
                  seteventTypeId(item.eventTypeId);
                  setselectedEvent(!selectedEvent);
                  setselectedEventId(item.extContentTypeId);
                }}
              >
                {item.eventTypeName}
                <span className="spnSpace">
                  (
                  {
                    data.filter(
                      (dataItem) => dataItem.parentTypeId === item.eventTypeId
                    ).length
                  }
                  )
                </span>
              </small>
              <small className="eventInput">
                <input
                  onClick={(e) => {
                    seteventTypeId(item.eventTypeId);
                    console.log("events", e.target.checked);
                    // e.target.checked = true && setselectedEvent(true);
                    const isExist = selectionArray.find(
                      (selectedItme) =>
                        selectedItme.extContentTypeId === item.extContentTypeId
                    );
                    // check exiting  on array or not
                    !isExist && setSelectionArray([...selectionArray, item]);

                    isExist &&
                      setSelectionArray([
                        selectionArray.filter(
                          (qsingle) =>
                            qsingle.extContentTypeId !== item.extContentTypeId
                        ),
                      ]);

                    const LeftSelection =
                      item.parentTypeId === null &&
                      data.filter((i) => i.parentTypeId === item.eventTypeId);

                    // const isLeftSelection = LeftSelection.filter(i => i.extContentTypeId === item.eventTypeId);

                    console.log("LeftSelection", LeftSelection);

                    // LeftSelection.map((i) => {
                    //   console.log("loh", i.extContentTypeId);
                    //   const remain = selectionArray.filter(
                    //     (single) =>
                    //       single.extContentTypeId !== i.extContentTypeId
                    //   );

                    //   setSelectionArray([...remain]);
                    // });

                    setSelectionArray([...selectionArray, ...LeftSelection]);

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
            </div>

            {selectedEventId === item.extContentTypeId &&
              selectedEvent &&
              JsonData.filter((item1) => item1.parentTypeId === eventTypeId)
                .length > 0 && (
                <SubMenu
                  setCount={setCount}
                  setSelectionArray={setSelectionArray}
                  selectionArray={selectionArray}
                  JsonData={JsonData.filter(
                    (item1) => item1.parentTypeId === eventTypeId
                  )}
                  parentOrigin={item.parentTypeId}
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

function SubMenu({
  JsonData,
  setSelectionArray,
  selectionArray,
  parentOrigin,
  setCount,
}) {
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);

  console.log("event id: ", eventTypeId, selectedEventId);
  console.log("JsonData", JsonData);
  console.log("On subarray selectionArray", selectionArray);

  useEffect(() => {}, [selectionArray]);
  return (
    <div className="App">
      {JsonData.map((item) => (
        <div
          className="singleContainer subContainer"
          key={item.extContentTypeId}
        >
          <div className="parent">
            <div className="header">
              <div className="arrow">
                {data.filter((item1) => item1.parentTypeId === item.eventTypeId)
                  .length > 0 && (
                  <div className="icon">
                    {selectedEventId !== item.extContentTypeId ||
                    selectedEvent !== true ? (
                      <ArrowRightIcon />
                    ) : (
                      <ArrowLeftIcon />
                    )}
                  </div>
                )}
              </div>

              <small
                className="eventName"
                onClick={() => {
                  seteventTypeId(item.eventTypeId);
                  setselectedEvent(!selectedEvent);
                  setselectedEventId(item.extContentTypeId);
                }}
              >
                {item.eventTypeName}
                <span className="spnSpace">
                  {data.filter(
                    (dataItem) => dataItem.parentTypeId === item.eventTypeId
                  ).length === 0 ? (
                    ""
                  ) : (
                    <span>
                      (
                      {
                        data.filter(
                          (dataItem) =>
                            dataItem.parentTypeId === item.eventTypeId
                        ).length
                      }
                      )
                    </span>
                  )}
                </span>
              </small>
              <small className="eventInput">
                <input
                  checked={
                    parentOrigin === null &&
                    selectionArray.find(
                      (singleFiltered) =>
                        singleFiltered.extContentTypeId ===
                        item.extContentTypeId
                    ) &&
                    true
                  }
                  onChange={(e) => {
                    handleParentClick(e);

                    const isFind = selectionArray.find(
                      (i) => i.extContentTypeId === item.extContentTypeId
                    );

                    !isFind &&
                      setSelectionArray([
                        ...selectionArray,
                        item,
                        // item.extContentTypeId,
                      ]);

                    isFind &&
                      setSelectionArray(
                        selectionArray.filter(
                          (i) => i.extContentTypeId !== item.extContentTypeId
                        )
                      );
                  }}
                  type="checkbox"
                />
              </small>
            </div>

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
