import React, { useEffect, useState } from "react";
import {dbService} from "fbase";
import StockdataResult from "components/StockdataResult";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const SearchForm = () => {
  //const [stockname, setStockname] = useState("");
  //const [pegInput, setPegInput] = useState("");
  const [per, setPer] = useState("");
  const [percent, setPercent] = useState("");
  const [testValue,setTestValue] = useState("");
  const [inputs, setInputs] = useState({
    stockname: '',
    pegInput:'',
    perInput: ''
  });
  const [searching,setSearching] = useState(true);

  const { stockname, pegInput,perInput } = inputs;// 비구조화 할당을 통해 값 추출

  const onChange = (event) =>{
    const { value, name } = event.target; // 우선 e.target 에서 name 과 value 를 추출
      setInputs({
        ...inputs, // 기존의 input 객체를 복사한 뒤
        [name]: value // name 키를 가진 값을 value 로 설정. 출처 https://react.vlpt.us/basic/09-multiple-inputs.html
      });
  };
const onClick  = (event) =>{
  setTestValue(stockname);
  

}
const onSubmit = async (event) => {
  event.preventDefault();
  console.log(inputs.pegInput,' and ',inputs.perInput);
  
  {stockdata.map((Data) => { //조건문을 맵 함수 안에 넣으려면 { 안에 넣어야 한다. ( 이걸로 쓰는 경우 에러남.
    if(Data.name === inputs.stockname){
      console.log('test',Data.id,': name : ',Data.name,' pbr : ',Data.pbr)
    };         
  
  }
    
)}
  setSearching(false);
};
const [stockdata,setStockData]= useState([]);

// {
//   b1yprice: '',
//   b2yprice: '',
//   bps: '',
//   code: '',
//   date: '',
//   debt_ratio: '',
//   debt_ratio_percent: '',
//   eps: '',
//   gross_profit: '',
//   gross_profit_percent: '',
//   name: '',
//   net_profit_margin: '',
//   net_profit_margin_percent: '',
//   nowprice: '',
//   pbr: '',
//   peg_percent: '',
//   per: '',
//   per_percent: '',
//   per_share: '',
//   price_percent: '',
//   roe: '',
//   total_income: '',
//   total_income_percent: '',
//   total_revenue: '',
//   total_revenue_percent: '',
//   yield_ratio: '',
//   yield_ratio_percent: '',
//   id:''
// }

const alignFunc = (event)=>{

  console.log('alignFunc =' ,event.stockdata);
  
  //const arr = [5, 100, 20];
  //arr.sort((a, b) => b - a);
  //console.log(arr);
}

    useEffect(() => {
    //    getNweets();
    // 아래방식은 위의 foreach 방식에 비해 re-render 하지 않는 차이가 있다.
        dbService.collection("stockdata").onSnapshot((snapshot) => {
            //firebase 에서 가져온 데이터를 배열로 복사하는것을 확인. ([{ 이 부분의 [ . 
            // 배열로 받지 않으면 map으로 받아진다.  
            const stockArray = snapshot.docs.map((doc) => ({
                id : doc.id, 
                ...doc.data()
                
            }));
            // console.log(stockArray);
            // console.log(typeof(stockArray));
            // const test = [ ...stockArray];
            // console.log(test[0].peg_percent);
          
            
            setStockData(stockArray);
            
        });
       
        

       
    }, []); //useEffect end

  // style={{ position: "absolute", top: "10%" , textAlign : "center"}}

  return (
    
    <>
      <form onSubmit={onSubmit} className="container">
        <h4>StockSearch</h4>
        <input
          name="stockname"
          type="text"
          placeholder="stockname"
          required
          onChange={onChange}
          value={stockname}
        />
        <button name="searchBtn" type="submit">Search</button>
        <br/><br/>
        <h4>peg <input type="number"  name="pegInput" placeholder="peg" onChange={onChange} step="4" value={pegInput}/>이하</h4>
        <h4>per <input type="number" name="perInput" placeholder="per" onChange={onChange} step="4" value={perInput} size="4"/>이하</h4>
       
        <InputGroup>
          
          <InputGroup.Append >
            <Button variant="outline-secondary" id ="descBtn" onClick={alignFunc} >Desc</Button>
            <Button variant="outline-secondary" id ="ascBtn" onClick={alignFunc} >Asc</Button>
          </InputGroup.Append>
        </InputGroup>
  
        {/* 해당 맵 데이터를 제대로 출력할려면 비교값이 있어서 그걸 토대로 뽑아내야한다. 지금방식은 맵의 갯수만큼 반복이 되기는 하나 번호대로 꺼내는것도
        아이디와 같은값의 값을 가져온다던지 하는 조건식을 부여한것도 아니므로 출력이 안된다. */}
        <div id="testDiv">
        {searching ? (
          <>
            
          </>
        ) : (
          <>
          <Table striped bordered hover>
          <thead>
      
              <tr>
                  <th>종목코드</th>
                  <th>종목이름</th>
                  <th>총매출액</th>
                  <th onClick={alignFunc}>PEG</th>
                  <th>PER</th>
                  <th>PBR</th>
                  <th>1년전가격</th>
                  <th>현재가격</th>
                  <th>가격차이</th>

              </tr>
              
          </thead>
          {/* obj 넘겨줄 때   stockobject = {stockdata} 하니까 조건식을 거쳤을때 값이 제대로 안나왔는데, stockobject = {Data} 로 하니까 값이 정상적으로 나온다. 
          map 메소드가 callback 함수이고,여기서 callback인 Data를 사용하지 않고 stockdata를 사용하려고 해서 값을 읽기 전에 출력이 되는 바람에 undefined 가 출력된 것.
           . 지금은 조건식까지 된 상태. */}
           {/* map 의 원리 : map 메소드 안에 반복문을 돌며 배열 안의 요소들과 1:1로 짝을 이룬 구조 */}
              {stockdata.sort((a,b)=>b.price_percent - a.price_percent).map((Data) =>  
         
                  <StockdataResult key = {Data.id} checkVal={inputs.perInput >= Data.per}  stockobject = {Data} code ={Data.code} name={Data.name} total_income = {Data.total_income} pbr={Data.pbr} 
                  peg_percent={Data.peg_percent} per={Data.per} b1yprice = {Data.b1yprice} nowprice={Data.nowprice} price_percent={Data.price_percent}/>   
              )}
            </Table>
          </>
        )}
         
        </div>  
      </form>
      
    </>
  );
};
export default SearchForm;