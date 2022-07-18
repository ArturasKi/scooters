// import { useEffect, useState, useRef } from 'react';
import List from "./Components/List";
import "./Crud.scss";
import { useEffect, useState } from "react";
import Create from "./Components/Create";
import Edit from "./Components/Edit";
import ScooterContext from "./Components/ScooterContext";
import Message from "./Components/Message";
import axios from "axios";
import ColorContext from "./Components/colors/ColorContext";
import Nav from './Components/Nav';

import CreateColors from "./Components/colors/Create";
import ListColors from "./Components/colors/List";

function Back() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // SCOOTERS
  const [scooters, setScooters] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [sortScooters, setSortScooters] = useState("1");

  // COLOR
  const [colors, setColors] = useState(null);
  const [createDataColors, setCreateDataColors] = useState(null);
  const [deleteDataColors, setDeleteDataColors] = useState(null);

  const [message, setMessage] = useState(null);

  // S C O O T E R S //

  // READ SCOOTER
  useEffect(() => {
    axios
      .get("http://localhost:3003/kolts")
      .then((res) => setScooters(res.data));
  }, [lastUpdate]);

  // CREATE SCOOTER
  useEffect(() => {
    if (null === createData) return;
    axios
      .post("http://localhost:3003/kolts", createData)
      .then((res) => {
        showMessage(res.data.msg); // iš serverio ateina ats;
        setLastUpdate(Date.now());
        console.log("Created!");
      })
      .catch((error) => {
        showMessage({ text: error.message, type: "danger" }); // kai bus error, bus rodoma žinutė;
      });
  }, [createData]);

  // DELETE SCOOTER
  useEffect(() => {
    if (null === deleteData) return;
    axios.delete("http://localhost:3003/kolts/" + deleteData.id).then((res) => {
      showMessage(res.data.msg);
      setLastUpdate(Date.now());
      console.log("Deleted!");
    });
  }, [deleteData]);

  // EDIT SCOOTER
  useEffect(() => {
    if (null === editData) return;
    axios
      .put("http://localhost:3003/kolts/" + editData.id, editData)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
        console.log("Edited!");
      });
  }, [editData]);

  // C O L O R S //

  // CREATE COLOR
  useEffect(() => {
    if (null === createDataColors) return;
    axios.post("http://localhost:3003/colors", createDataColors).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createDataColors]);

  // READ COLOR
  useEffect(() => {
    axios.get("http://localhost:3003/colors").then((res) => {
      console.log(res.data);
      setColors(res.data);
    });
  }, [lastUpdate]);

  // DELETE COLOR
  useEffect(() => {
    if (null === deleteDataColors) return;
    axios
      .delete("http://localhost:3003/colors/" + deleteDataColors.id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
        console.log("Deleted!");
      });
  }, [deleteDataColors]);


  // DELETE COMMENT
  const handleDeleteComment = id => {
    axios
      .delete("http://localhost:3003/comments/" + id)
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
        console.log("Deleted!");
      });
  }

  const showMessage = (msg) => {
    setMessage(msg); // set'inam msg, kad pasirodytų;
    setTimeout(() => setMessage(null), 5000); // vienkartinis intervalas, žinutė dingsta už 5s;
  };

  // SORT
  useEffect(() => {
    localStorage.getItem("sort_type")
      ? setSortScooters(localStorage.getItem("sort_type"))
      : setSortScooters("1");
  }, []);

  // useEffect(() => {
  // axios.get('http://localhost:3003/kolts')
  //   .then(res => setSortScooters(res.data.sort_type));
  // }, []);

  return (
    <ScooterContext.Provider
      value={{
        scooters,
        setCreateData,
        setDeleteData,
        setModalData,
        modalData,
        setEditData,
        message,
        sortScooters,
        setSortScooters,
        setColors,
        colors,
        handleDeleteComment
      }}
    >
      <ColorContext.Provider
        value={{
          setCreateData: setCreateDataColors,
          colors,
          setDeleteData: setDeleteDataColors
        }}
      >
        <Nav/>
        <div className="container">
          <div className="row">
            <div className="col-left">
              <Create />
              <CreateColors />
              <ListColors />
            </div>
            <div className="col-right">
              <List />
            </div>
          </div>
        </div> 
        <Edit />
        <Message />
      </ColorContext.Provider>
    </ScooterContext.Provider>
  );
}

export default Back;

// Paspirtuko modelis;
//
