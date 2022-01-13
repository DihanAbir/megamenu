import "./App.css";
import data from "./data";
import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowDropDown";
import ArrowUPIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
// import HierarchyMenu from "./Menu";

// function App() {
//   return (
//     <div className="App">
//       <div>
//         <header className="App-header">
//           <h1>Hierarchy Menu</h1>

//           {/* <HierarchyMenu /> */}

//           <Menu JsonData={data} />
//         </header>
//       </div>
//     </div>
//   );
// }

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

function HierarchyMenu({ JsonData }) {
  //states
  const [eventTypeId, seteventTypeId] = useState(null);
  const [selectedEvent, setselectedEvent] = useState(false);
  const [selectedEventId, setselectedEventId] = useState(null);
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [selectionArray, setSelectionArray] = useState([]);
  const [selectionResultArray, setSelectionResultArray] = useState([]);

  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {}, []);
  const selectionArray2 = searchValue
    ? data.filter((selection) =>
        selection.eventTypeName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    : data;

  const initialItem = JsonData.filter((item) => item.parentTypeId === null);

  const selectionArrayMain = searchValue
    ? data.filter((selection) =>
        selection.eventTypeName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    : initialItem;

  useEffect(() => {}, [selectedEventId]);
  console.log("searchValue", searchValue);
  console.log("selectionResultArray", selectionResultArray);

  const CheckHandler = (e, item) => {
    var isFind = selectionArray.find(
      (singleSelectedItem) =>
        singleSelectedItem.extContentTypeId === item.extContentTypeId
    );
    console.log("Currecnt value ", item);
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
  return (
    <div>
      <div className="App" className="mainSection">
        {initialItem.map((item) => (
          <div className="singleContainer" key={item.extContentTypeId}>
            <div className="parent">
              <div className="header">
                {data.filter(
                  (item1) => item1.parentTypeId === item.parentTypeId
                ).length > 1 && (
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
                <small className="eventInput"></small>
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

      <div className="resultSection">
        <h1>Results</h1>
        <div className="result-main">
          <div className="output">
            {/* //output er array */}
            {selectionArray.length !== 0 ? (
              <div className="showResult">
                {selectionArray.map((item) => (
                  <p key={item.extContentTypeId}>{item.eventTypeName},</p>
                ))}
              </div>
            ) : (
              <p>No Data You are selected yet</p>
            )}

            {toggle ? (
              <ArrowUPIcon
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            ) : (
              <ArrowLeftIcon
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            )}
          </div>
          {toggle && (
            <div>
              <div className="search">
                <p>
                  <SearchIcon />
                </p>
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="search"
                  placeholder="Search"
                  className="SearchInput"
                />
              </div>

              <br />
              {/* {selectionArray2.length === 0 ? (
                <h1>No result Found </h1>
              ) : (
                selectionArray2.map((selection) => (
                  <CheckedResult
                    setSelectionResultArray={setSelectionResultArray}
                    selectionResultArray={selectionResultArray}
                    selection={selection}
                  />
                ))
              )} */}

              {searchValue === null || searchValue === ""
                ? initialItem.map((item) => (
                    <div
                      className="singleContainer"
                      key={item.extContentTypeId}
                    >
                      <div className="parent">
                        <div className="header">
                          {data.filter(
                            (item1) => item1.parentTypeId === item.parentTypeId
                          ).length > 0 && (
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
                            {data.filter(
                              (dataItem) =>
                                dataItem.parentTypeId === item.eventTypeId
                            ).length > 0 && (
                              <span className="spnSpace">
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
                          </small>
                        </div>

                        {selectedEventId === item.extContentTypeId &&
                        selectedEvent &&
                        JsonData.filter(
                          (item1) => item1.parentTypeId === eventTypeId
                        ).length > 0 ? (
                          <SubMenu
                            setCount={setCount}
                            setSelectionArray={setSelectionArray}
                            selectionArray={selectionArray}
                            JsonData={JsonData.filter(
                              (item1) => item1.parentTypeId === eventTypeId
                            )}
                            parentOrigin={item.parentTypeId}
                          />
                        ) : (
                          ""
                        )}

                        {/* <small>
                      <input type="checkbox" />
                    </small> */}
                      </div>
                    </div>
                  ))
                : selectionArrayMain.map((item) => (
                    <div
                      className="singleContainer"
                      key={item.extContentTypeId}
                    >
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="parent"
                      >
                        <div className="header">
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
                          </small>
                          <small className="eventInput"></small>

                          {/* {selectedEventId === item.extContentTypeId &&
                          selectedEvent &&
                          JsonData.filter(
                            (item1) => item1.parentTypeId === eventTypeId
                          ).length > 0 && (
                            <SubMenu
                              setCount={setCount}
                              setSelectionArray={setSelectionArray}
                              selectionArray={selectionArray}
                              JsonData={JsonData.filter(
                                (item1) => item1.parentTypeId === eventTypeId
                              )}
                              parentOrigin={item.parentTypeId}
                            />
                          )} */}

                          <small className="eventInput">
                            <input
                              onChange={(e) => CheckHandler(e, item)}
                              type="checkbox"
                            />
                          </small>
                        </div>
                        {/* <small>
                    <input type="checkbox" />
                  </small> */}
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
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
        checked={
          selectionResultArray.find(
            (item) => item.eventTypeId === selection.eventTypeId
          )
            ? true
            : false
        }
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
    console.log("Currecnt value ", item);

    const isInSameArray = selectionArray.find(
      (item1) => item1.parentTypeId === item.parentTypeId
    );

    if (isInSameArray === undefined) {
      e.target.checked &&
        isFind === undefined &&
        setSelectionArray([...selectionArray, item]);

      // else removed from array
      let filtedArray = selectionArray.filter(
        (singleSelectedItem) =>
          singleSelectedItem.extContentTypeId !== item.extContentTypeId
      );

      e.target.checked === false && setSelectionArray([...filtedArray]);
    }

    if (isInSameArray !== undefined) {
      e.target.checked &&
        isFind === undefined &&
        setSelectionArray([...selectionArray, item]);

      // else removed from array
      let filtedArray = selectionArray.filter(
        (singleSelectedItem) =>
          singleSelectedItem.extContentTypeId !== item.extContentTypeId
      );

      e.target.checked === false && setSelectionArray([...filtedArray]);

      const removePreviousSelected = selectionArray.filter(
        (item1) => item1.parentTypeId !== item.parentTypeId
      );

      // solid  -> removePreviousSelected
      setSelectionArray([...removePreviousSelected, item]);
    }

    // console.log("Currecnt isInSameArray.length ", isInSameArray);
    // isInSameArray.length === 1 && setSelectionArray([...removePreviousSelected]);
    // console.log("Currecnt selectionArray ", selectionArray);

    // if checked not done before then added into array
  };

  console.log("Currecnt selectionArray ", selectionArray);

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

              {data.filter((item1) => item1.parentTypeId === item.eventTypeId)
                .length === 0 && (
                <small className="eventInput">
                  <input
                    checked={
                      selectionArray.find(
                        (item1) => item1.eventTypeId === item.eventTypeId
                      )
                        ? true
                        : false
                    }
                    onChange={(e) => CheckHandler(e, item)}
                    type="checkbox"
                  />
                </small>
              )}

              {/* <small className="eventInput">
                <input
                  onChange={(e) => CheckHandler(e, item)}
                  type="checkbox"
                />
              </small> */}
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

export default HierarchyMenu;
