import React, {useState} from "react";
import './styles/index.css'
//import { data } from "./styles/data";

const Person = ({ id, name, removeItem, handleEdit }) => {
    return (
        <div className="item">
           <h3>{name}</h3>
            <div className="btn-container">
                <button className="btn danger" onClick={() => removeItem(id)}> <i class="fa fa-trash" aria-hidden="true"></i>remove</button>
                <button className="btn" onClick={() => handleEdit(id)}> <i class="fa fa-pencil-square-o" aria-hidden="true"></i>edit</button>
            </div>
        </div>
    )
}


const App = () => {
    const [people, setPeople] = useState([])
    const [ input, setInput ] = useState('')
    const [ isEdit, setIsEdit ] = useState(false)
    const [itemID, setItemID] = useState('')

    const removeItem = (id) => {
        const newPeople = people.filter( person => person.id !== id)
        setPeople( people => newPeople)
    }
   
    const handleEdit = (id) => {
        setIsEdit(true)
        setItemID(id)
        const { name } = people.find( person => person.id === id)
        setInput(name)
    }

     const handleAdd = (e) => {
           e.preventDefault()
           let buttonSubmitText = e.target.textContent
           if(!input) return

           if( buttonSubmitText === 'add') {
              const newItem = { name:input, id:new Date().getTime().toString() } 
                setPeople( people => {
                return [...people, newItem]
              })
            
           }

           if(buttonSubmitText === 'edit') {
                const getPerson = people.find( person => person.id === itemID )
                getPerson.name = input
                setPeople( people => {
                    return [...people]
                })
                setIsEdit(false) 
           }
        setInput('')
    }

    return(
        <center>
              <h2>Base build todo list</h2>
            <form className="item form-control" onSubmit={handleAdd}>
                <input type='search' value={input} placeholder={ isEdit ? 'edit base item': 'add base item'}
                 onChange={ (e) => setInput(e.target.value)} maxLength='10' />
                <button type="submit" className="btn">
                    <i class={`fa  ${  isEdit ? 'fa-pencil-square-o': 'fa-plus' } ` } aria-hidden="true"></i>
                    { isEdit ? 'edit': 'add'}
                </button>
            </form>

           {people.map( person => {
            return <Person key={person.id} {...person} removeItem={removeItem} handleEdit={handleEdit}  />
           })} 
          <div>
             <button type="submit" className="btn" onClick={() => setPeople([])}>clear items </button>
          </div>

         </center>
         
         )
}

export default App
