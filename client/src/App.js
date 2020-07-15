import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';
import ToDoList from './components/ToDoList';


function App() {
  return (
    <div className="App">
    <AppNavbar />
    <Container>
    <ToDoList />
     </Container>
    </div>
  );
}

export default App;
