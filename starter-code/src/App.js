import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import contacts from './contacts.json'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      contacts: contacts, 
      firstContacts: contacts.slice(0,5),
    }
  }

  showContacts(){
    // const firstContacts = this.state.contacts.slice(0,5);
    return this.state.firstContacts.map((eachContact, index)=>{
      return (
        <tr key={index}>
          <td> <img className="img-fluid img-thumbnail celebImg" src={eachContact.pictureUrl} alt="celebrity photo" /> </td>
          <td>{eachContact.name}</td>
          <td>{eachContact.popularity.toFixed(2)}</td>
          <td><button className="btn btn-secondary" onClick={()=>this.deleteContact(index)}>Delete</button></td>
        </tr>
       )
    })
  }

  deleteContact(item) {
    const currentList = this.state.firstContacts;
    currentList.splice(item, 1) 
    this.setState({
      firstContacts: currentList
    })
  }
  showRandomContact () {
    console.log('random clicked')
    const randomNum = 5+ Math.floor(Math.random()*(this.state.contacts.length)-5);
    const randomContact = contacts[randomNum];
    const newList = [...this.state.firstContacts];
    newList.unshift(randomContact);
    this.setState({
      firstContacts: newList,
    })
  }

  showPopularitySort() {
    const sortedList = this.state.firstContacts;
    console.log(sortedList)
    sortedList.sort((a, b)=> { return b.popularity - a.popularity});
    console.log(sortedList)
      this.setState({
      firstContacts: sortedList
    })
  }

  showNameSort() {
    const sortedList = this.state.firstContacts;
    console.log(sortedList)
    sortedList.sort((a, b)=> { 
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
    console.log(sortedList)
      this.setState({
      firstContacts: sortedList
    })
  }

  render() {
    return (
      <div className="container-fluid">
      <h1>IronContacts</h1>
      <button className="btn btn-secondary" onClick={()=>this.showRandomContact()}>Add random</button>
      <button className="btn btn-primary" onClick={()=>this.showPopularitySort()}>sort by popularity</button>
      <button className="btn btn-success" onClick={()=>this.showNameSort()}>sort by name</button>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Popularity</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {this.showContacts()}
        </table>
      </div>
    );
  }
}

export default App;
