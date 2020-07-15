import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ListGroup, ListGroupItem} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios';

const ToDoList = (props) => {

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);

  // Toggling On Click
  const toggle = () => setModal(!modal);

  // Input Change
  const onChange = (e) => {
    setName(e.target.value);
  }

  const callItems = () => {
   axios.get("/api/items")
      .then(res => res.data)
      .then(res => setItems(res))
      .catch(err => console.log(err))
}

  useEffect(()=>{
    callItems();
  })
  // On Submitting
  const itemList = () => {
    axios.post('/api/items',{name})
          .then(res=> res.data)
          .catch(err =>console.log(err));  
          
    setModal(!modal);
  }

  const deleteItem = (_id) => {
    axios.delete(`/api/items/${_id}`)
   }
  
  // To prevent Reloading of screen
  const onSubmits = (e) => {
      e.preventDefault();
  }

  return (
    <div>
      <Button style={{marginBottom:'1rem'}} color="success" onClick={toggle}>Add Item</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Your Item List </ModalHeader>
        <ModalBody>
        <Form onSubmit={onSubmits} >
        <FormGroup>
        <Label for="item">Item</Label>
        <Input type="text" name="name" id="item" placeholder="Enter Your Task..." onChange={onChange}  />
        <Button type="submit" color="primary" style={{marginTop:'2rem'}}  onClick={itemList}>Add Item</Button>
         </FormGroup>
        </Form>
        </ModalBody>
      </Modal>
      <ListGroup style={{marginBottom: '1rem'}}>
                <TransitionGroup className="todo-list">
                        {items.map(({_id,name})=> (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button className="remove-btn" color="danger" size="sm" onClick={deleteItem.bind(this,_id)}><i className="fa fa-times" aria-hidden="true"></i>
                                </Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                        ))}
                </TransitionGroup>
            </ListGroup>
    </div>
  );
}

export default ToDoList;