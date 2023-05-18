import React from "react";
 

import { useEffect, useState } from "react";
import {  Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import BarChart from  "../components/Barchart";
import LineChart from "../components/Linechart";
import PieChart from "../components/Pichart";
import  {UserData } from "../components/Data/Data";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
 const Chart =()=> {
  // For  Reading Xlsx file
  const [data, setData] = useState([]);
 
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      UserData.push(parsedData);
    };
  }

  // take color from to color plate
  const [backgroundColor, setBackgroundColor] = useState('');
  const handleChangeBackgroundColor = (e) => {
    setBackgroundColor(e.target.value);
  };
  // take index 
  const [bcolor, setBcolor] = useState('');

  // graph funtionality
  
  const [userData, setUserData] = useState({
    labels:[],
    datasets: [
      {
        label: "Users Gained",
        data:[],
        fill: true,
       backgroundColor: [],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
const color = ['blue','green','red']
  // store changes colors in array
  const [colors, setColors] = useState(color);
  useEffect(() => {
    const updatedColors = [...userData.datasets[0].backgroundColor];
    updatedColors[bcolor] = backgroundColor;
    setColors(updatedColors);
    setBackgroundColor('')
  }, [backgroundColor, bcolor]);

   // graph funtionality on changes
  useEffect(() => {
    
    const updatedData = {
      ...userData,
      labels: data.map((data) => data.__EMPTY),
      datasets: [
        {
          ...userData.datasets[0],
          data: data.map((data) => data.__EMPTY_1),
            backgroundColor: colors,
        },
      ],
    };
    setUserData(updatedData);
    
  }, [data,backgroundColor]);

  return (
  <> 
  
    <div className="App">
    <h1>LineChart</h1>
    <p style={{marginBottom:"40px",}}>Excel Data Visualization using Chart</p>
    <input 
    style={{marginBottom:"30px",marginTop:"20px"}}
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />
      <Form.Control
          type="color"
          value={backgroundColor}
          onChange={handleChangeBackgroundColor}
        />
        {/*for  take index  */}
        <input 
    style={{marginBottom:"30px" }}
        type="number"  
        onChange={(e)=>{setBcolor(e.target.value)}} 
      />
{/* <div className="Table_check">
      {data.length > 0 && (
        <table className="table ">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div> */}
      <div style={{ width: 700 ,boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",padding:"20px" }}>
        <Line data={userData} />
      </div>
      {/* <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: 700 }}>
        <PieChart chartData={userData} />
      </div> */}
    </div>
    </>
  )
}

export default Chart;