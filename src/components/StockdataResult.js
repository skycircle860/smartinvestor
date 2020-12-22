import { dbService, storageService } from "fbase";
import React, { useState } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Table from 'react-bootstrap/Table';

const StockdataResult = ({stockobject,checkVal}) =>{
    console.log("checkVal is " , stockobject.peg_percent);
    console.log("per is " , stockobject.per);
    console.log("name is " , stockobject.name);
    
    return (     
        <tbody>
            {checkVal && ( <>
            <tr>
            <td>{stockobject.code}</td>
            <td>{stockobject.name}</td>
            <td>{stockobject.total_income}</td>
            <td>{stockobject.peg_percent}</td>
            <td>{stockobject.per}</td>
            <td>{stockobject.pbr}</td>
            <td>{stockobject.b1yprice}</td>
            <td>{stockobject.nowprice}</td>
            <td>{stockobject.price_percent}%</td>
            </tr></>
            ) 
            }

        </tbody>
    
      
    );
};
export default StockdataResult;