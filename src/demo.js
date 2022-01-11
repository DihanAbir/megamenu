import "./App.css";
import data from "./data";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function App() {
  return (
    <div style={{ width: "400px" }} className="App">
      <header className="App-header">
        <h1>Hierarchy Menu</h1>

        <Menu data1={data} />
      </header>
    </div>
  );
}

function Menu({ data1 }) {
  const [secondLayer, setSecondLayer] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 2nd layer
  // const [secondLayer1, setSecondLayer1] = useState(null);
  // const [selected1, setSelected1] = useState(false);
  // const [selectedId1, setSelectedId1] = useState(null);

  // // 3rd layer
  // const [secondLayer3, setSecondLayer3] = useState(null);
  // const [selected3, setSelected3] = useState(false);
  // const [selectedId3, setSelectedId3] = useState(null);

  // // 4th layer
  // const [secondLayer4, setSecondLayer4] = useState(null);
  // const [selected4, setSelected4] = useState(false);
  // const [selectedId4, setSelectedId4] = useState(null);

  // // 5th layer
  // const [secondLayer5, setSecondLayer5] = useState(null);
  // const [selected5, setSelected5] = useState(false);
  // const [selectedId5, setSelectedId5] = useState(null);

  const nextLayerData = data1.filter(
    (item1) => item1.parentTypeId === secondLayer
  );

  console.log(secondLayer, selectedId);
  const initialItem = data1.filter((item) => item.parentTypeId === null);
  return (
    <div style={{ position: "relative" }} className="App">
      {initialItem.map((item) => (
        <div
          style={{
            border: "1px solid #9f88ff",
            margin: "25px",
            marginLeft: "30px",
            textAlign: "left",
          }}
        >
          <div style={{}}>
            <div style={{ position: "absolute", left: "10px" }}>
              {data.filter((item1) => item1.parentTypeId === item.parentTypeId)
                .length > 1 && <ArrowRightIcon />}
            </div>
            {/* //1st layer data  */}
            <small
              style={{
                border: "1px solid #9f88ff",
                borderRadius: "5px",
                // padding: "10px",
                textAlign: "left",
              }}
              onClick={() => {
                setSecondLayer(item.eventTypeId);
                setSelected(!selected);
                setSelectedId(item.extContentTypeId);
              }}
            >
              {item.eventTypeName}
            </small>

            {
              selectedId === item.extContentTypeId &&
                selected &&
                // .length > 0 && <Menu data1={data} />
                data1.filter((item1) => item1.parentTypeId === secondLayer)
                  .length > 0 && (
                  <SubMenu
                    data1={data1.filter(
                      (item1) => item1.parentTypeId === secondLayer
                    )}
                  />
                )
              // data1
              //   .filter((item1) => item1.parentTypeId === secondLayer)
              //   .map((item1) => <p>{item1.eventTypeName}</p>)
              // secondLayer
            }

            {/* 2nd  layer data logic  */}

            {/* {selected && selectedId === item.extContentTypeId && (
              <ul>
                {data1?.map((item) => {
                  if (item.parentTypeId === secondLayer) {
                    return (
                      <li
                        style={{
                          margin: "25px",
                          marginLeft: "30px",
                          textAlign: "left",
                        }}
                      >
                        2nd layer data 
                        <div style={{ display: "flex" }}>
                          <p style={{ position: "absolute", left: "10px" }}>
                            <ArrowRightIcon />
                          </p>
                          <small
                            style={{
                              backgroundColor: "fff",
                              border: "1px solid #9f88ff",
                              borderRadius: "5px",
                              padding: "10px",
                              textAlign: "left",
                              height: "20px",
                            }}
                            onClick={() => {
                              setSecondLayer1(item.eventTypeId);
                              setSelected1(!selected1);
                              setSelectedId1(item.extContentTypeId);
                            }}
                          >
                            {item.eventTypeName}
                          </small>

                          2nd layer data 
                          {selected1 && selectedId1 === item.extContentTypeId && (
                            <ul>
                              {data1?.map((item) => {
                                if (item.parentTypeId === secondLayer1) {
                                  return (
                                    <li
                                      style={{
                                        margin: "25px",
                                        marginLeft: "30px",
                                        textAlign: "left",
                                      }}
                                    >
                                      <div>
                                        <p
                                          style={{
                                            position: "absolute",
                                            left: "10px",
                                          }}
                                        >
                                          <ArrowRightIcon />
                                        </p>
                                        3rd layer data 
                                        <small
                                          style={{
                                            backgroundColor: "fff",
                                            border: "1px solid #9f88ff",
                                            borderRadius: "5px",
                                            padding: "10px",
                                            textAlign: "left",
                                          }}
                                        >
                                          {item.eventTypeName}
                                        </small>
                                        <small
                                          style={{
                                            position: "absolute",
                                            right: "100px",
                                          }}
                                        >
                                          <Checkbox />
                                        </small>
                                      </div>
                                    </li>
                                  );
                                }
                              })}
                            </ul>
                          )}
                          <small
                            style={{ position: "absolute", right: "100px" }}
                          >
                            <Checkbox />
                          </small>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            )} */}
            <small style={{ position: "absolute", right: "100px" }}>
              <Checkbox />
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubMenu({ data1 }) {
  const [secondLayer, setSecondLayer] = useState(null);
  const [selected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  console.log(secondLayer, selectedId);
  console.log("data1", data1);
  return (
    <div style={{ position: "relative" }} className="App">
      {data1.map((item) => (
        <div
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
            {/* //1st layer data  */}
            <small
              style={{
                border: "1px solid #9f88ff",
                borderRadius: "5px",
                // padding: "10px",
                textAlign: "left",
              }}
              onClick={() => {
                setSecondLayer(item.eventTypeId);
                setSelected(!selected);
                setSelectedId(item.extContentTypeId);
              }}
            >
              {item.eventTypeName}
            </small>

            {
              selectedId === item.extContentTypeId &&
                selected &&
                // .length > 0 && <Menu data1={data} />
                data.filter((item1) => item1.parentTypeId === secondLayer)
                  .length > 0 && (
                  <SubMenu
                    data1={data.filter(
                      (item1) => item1.parentTypeId === secondLayer
                    )}
                  />
                )
              // data1
              //   .filter((item1) => item1.parentTypeId === secondLayer)
              //   .map((item1) => <p>{item1.eventTypeName}</p>)
              // secondLayer
            }

            <small style={{ position: "absolute", right: "100px" }}>
              <Checkbox />
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
