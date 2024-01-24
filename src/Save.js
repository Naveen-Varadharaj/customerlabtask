import React, {  useState } from 'react'
import Select from 'react-select';
export default function Save({toogle}) {

const[single,setSingle]=useState({ value: '', label: 'Add schema to segment'});
const[name,setName]=useState("");

const[data,setData]=useState([]);


const options = [
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'gender', label: 'Gender' },
  { value: 'age', label: 'Age' },
  { value: 'account_name', label: 'Account Name' },
  { value: 'city', label: 'City' },
  { value: 'state', label: 'State' },
 ];

const [newOptions, setNewOptions]=useState(options);

const handleClick=(e)=>{
    e.preventDefault();
    if(data.includes(single)!==true ){
        if(single.label!=="Add schema to segment"){setData([...data,single])}
    }
    setSingle({ value: '', label: 'Add schema to segment'})  
    const filteredPeople = newOptions.filter((item) => item.value !== single.value);
    setNewOptions(filteredPeople);

    }
  
  const handleDelete=(val)=>{
  const filteredData = data.filter((item) => item.value !== val.value);
  console.log(filteredData);
  setData(filteredData);
  setNewOptions([...newOptions,val]) 
   
    }

    const handleChange=(selectedOption,index)=>{
       let array=data;
       let newop=newOptions;
       let ind=newop.indexOf(selectedOption);
       newop[ind]=array[index];
       array[index]=selectedOption;
       setNewOptions(newop);
       setData(array)
       
    }
    
const handleSave=async()=>{
  let result=[]
  for(let i=0;i<data.length;i++){
    let obj={};
    obj[data[i].value]=data[i].label;
    result.push(obj);
  
  }

  let finalValue={
    "segment_name": name,
    "schema": result
    }

    setData([]);


    try {
    await fetch('https://webhook.site/4a2f01c8-2b0a-48c1-955b-b135a36f7d1f', {
    method: 'POST',
    body: JSON.stringify(finalValue)
  });

  
}
catch (error) {
     console.error('Error sending data to webhook:', error);
}

setName("");
};
  



  return (
    <div className=''>
    
    <div className='col-4 position-absolute top-0 end-0  bg-white  h-100 '>
      <header className='fs-5 text-white bg-primary p-2  w-100'><h3><i className="bi bi-chevron-left me-2"></i>Save Segment</h3></header>
      <div className='container mt-3'>
      <div className="row ">
    <div className="col-10">
        <label htmlFor='input1'>Enter the Name of the Segment</label>
      
    </div>
    <div className=" mt-2 ">
        <input id='input1' type='text' placeholder='Name of the segment'value={name} onChange={(e)=>{setName(e.target.value)}} className='w-75' ></input>
    </div>
  </div>


  <div className="row mt-3">
    <div className="col">
       To save your segament, you need to add the schemas to built the query
    </div>
    
  </div>
  <div className="row mt-2">
    <div className="col-3">
    </div>
    <div className="col-4 ">
    <i className="bi bi-record-fill text-success"></i> -User Traits
       </div>
       <div className="col-5">
       <i className="bi bi-record-fill text-danger"></i> -Group Traits
       </div>   
  </div>
 
  <div className="row mt-2 p-3 ">
  {data.length>0 && <div className="container border border-4 border-info p-2   ">
       {
        data.map((item,index)=>(
          <div className='d-flex gx-2 mb-1'    >  
         <Select 
           
            className='w-75'
            value={item} 
            onChange={(selectedOption) => handleChange(selectedOption, index)}   
            options={newOptions}  
          />
          <button className='border-0 ms-2' onClick={()=> handleDelete(item)}><i className="bi bi-dash"></i></button>
          </div>
        ))
       } 
      
    </div>}
</div>

<div className="mt-2  d-flex gx-2  ">
   
    <Select className='w-75' defaultValue={single }
        value={single}
        onChange={setSingle}
            options={newOptions }
          />
     <button className='border-0 ms-2' ><i className="bi bi-dash"></i></button>
</div>
<div className=" mt-2  ">
  
    <button className='btn btn-link' onClick={(e)=>handleClick(e)}>+Add new schema</button>
</div>




      </div>
      <footer className='position-absolute bottom-0 start-0 d-inline-flex gx-2 p-4 mb-2 bg-light w-100'>
        <button className='btn bg-success text-white p-2  me-3' onClick={handleSave} >Save the Segment</button>
        <button className='text-danger border-0 bg-white p-2' onClick={toogle}>Cancel</button>
      </footer>
    </div>
    </div>
  )
}

