import "./App.css";
import data from "./data";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowDropDown";
import HierarchyMenu from "./Menu";

function App() {
  return (
    <div className="App">
      <div className="mainSection">
        <header className="App-header">
          <h1>Hierarchy Menu</h1>

          {/* <HierarchyMenu /> */}

          <Menu JsonData={data} />
        </header>
      </div>
    </div>
  );
}

// function handleParentClick(e) {
//   try {
//     let allInput = e.target
//       .closest(".header")
//       .nextSibling.querySelectorAll("input");
//     console.log(allInput);
//     // .querySelector(".App")
//     // .querySelectorAll("input");

//     // console.log(allInput);
//     if (e.target.checked) {
//       allInput.forEach((item) => {
//         item.checked = true;
//       });
//     } else {
//       allInput.forEach((item) => {
//         console.log("item", item);
//         item.checked = false;
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

function Menu({ JsonData }) {
  //states
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);
  const [count, setCount] = useState(0);

  const [selectionArray, setSelectionArray] = useState([]);
  const [selectionResultArray, setSelectionResultArray] = useState([]);

  const initialItem = JsonData.filter((item) => item.parentTypeId === null);

  useEffect(() => {}, [selectedEventId]);
  // console.log("selectionArray by checkbox clickeing ", selectionArray);
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
                {/* <input
                  onClick={(e) => {
                    seteventTypeId(item.eventTypeId);
                    // console.log("events", e.target.checked);
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

                    // console.log("LeftSelection", LeftSelection);

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
                      // handleParentClick(e);
                    }, 10);
                  }}
                  // onClick={}
                  type="checkbox"
                /> */}
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
      <br />
      <hr />
      <hr />
      <h1>Results</h1>
      <div className="result-main">
        {selectionResultArray.length !== 0 ? (
          <div className="showResult">
            {selectionResultArray.map((item) => (
              <p>{item.eventTypeName}</p>
            ))}
          </div>
        ) : (
          <p>No Data You are selected yet</p>
        )}
        <div>
          <input
            // onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            placeholder="Search"
            className="search"
          />
        </div>
        <br />
        {selectionArray.map((selection) => (
          <CheckedResult
            setSelectionResultArray={setSelectionResultArray}
            selectionResultArray={selectionResultArray}
            selection={selection}
          />
        ))}
      </div>
    </div>
  );
}

function CheckedResult({
  selection,
  setSelectionResultArray,
  selectionResultArray,
}) {
  return (
    <div className="result">
      <input
        type="checkbox"
        onChange={(e) => {
          var isFind = selectionResultArray.find(
            (singleSelectedItem) =>
              singleSelectedItem.extContentTypeId === selection.extContentTypeId
          );
          // if checked not done before then added into array
          e.target.checked &&
            isFind === undefined &&
            setSelectionResultArray([...selectionResultArray, selection]);

          // else removed from array
          let filtedArray = selectionResultArray.filter(
            (singleSelectedItem) =>
              singleSelectedItem.extContentTypeId !== selection.extContentTypeId
          );

          e.target.checked === false &&
            setSelectionResultArray([...filtedArray]);
        }}
      />
      <p>{selection.eventTypeName}</p>
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

  // console.log("event id: ", eventTypeId, selectedEventId);
  // console.log("JsonData", JsonData);

  const CheckHandler = (e, item) => {
    var isFind = selectionArray.find(
      (singleSelectedItem) =>
        singleSelectedItem.extContentTypeId === item.extContentTypeId
    );
    // if checked not done before then added into array
    e.target.checked &&
      isFind === undefined &&
      setSelectionArray([...selectionArray, item]);

    // else removed from array
    let filtedArray = selectionArray.filter(
      (singleSelectedItem) =>
        singleSelectedItem.extContentTypeId !== item.extContentTypeId
    );

    e.target.checked === false && setSelectionArray([...filtedArray]);
  };

  useEffect(() => {}, [selectionArray]);
  return (
    <div className="App">
      {JsonData.map((item) => (
        <div
          className="singleContainer subContainer"
          key={item.extContentTypeId}
        >
          {/* <p>{item.hierarchyLevel}</p> */}
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
              {/* {item.hierarchyLevel} */}

              <small
                style={{
                  marginLeft:
                    item.hierarchyLevel === "L2"
                      ? "20px"
                      : "L3"
                      ? "50px"
                      : "L4"
                      ? "70px"
                      : "L5"
                      ? "90px"
                      : "L6"
                      ? "40px"
                      : "",
                }}
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
                  onChange={(e) => CheckHandler(e, item)}
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
                  setCount={setCount}
                  setSelectionArray={setSelectionArray}
                  selectionArray={selectionArray}
                  parentOrigin={item.parentTypeId}
                />
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
