import React, { useState, useEffect, useReducer } from 'react'

// 添加fruit状态维护fruitReducer 
function fruitReducer(state, action) {
  switch (action.type) { 
  case "init":
    return action.payload;
  case "add":
    return [...state, action.payload]; 
  default:
    return state;
  }
}

// 声明列表组件
function FruitList({fruits, onSetFruit}) {
  return ( 
    <ul>
      {fruits.map(f => (
        <li key={f} onClick={() => onSetFruit(f)}> {f} </li>
      ))}
    </ul>
  )
}


// 声明输入组件
function FruitAdd(props) {
  // 输入内容状态及设置内容状态的方法
  const [pname, setPname] = useState(""); // 键盘事件处理
  const onAddFruit = e => {
    if (e.key === "Enter") { 
      props.onAddFruit(pname); 
      setPname("");
    }
  }

  return (
    <div> 
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)} 
        onKeyDown={onAddFruit}
      /> 
    </div>
  )
}


export default function Hook() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组 
  const [fruit, setFruit] = useState("");
  // const [fruits, setFruits] = useState([]);
  const [fruits, dispatch] = useReducer(fruitReducer, []);

  // 给函数组件增加了执行副作用操作的能力。
  useEffect(()=>{
    setTimeout(() => {
      // setFruits(['香蕉','西瓜','芒果']) 
      dispatch({ type: "init", payload: ['香蕉','西瓜','芒果'] });
    }, 1000);
  },[])// 设置空数组意为没有依赖，则副作用操作仅执行一次

  // 
  useEffect(() => { 
    document.title = fruit;
  }, [fruit]); // 依赖fruit

  return (
    <div>
      <p>{fruit === "" ? "请选择喜爱的水果:" : `您的选择是:${fruit}`}</p>
      <br/>
      <FruitList fruits={fruits} onSetFruit={setFruit}/>
      <br/>
      <FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})} />
    </div>
  )
}
