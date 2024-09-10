import "./App.css";
import Router from "./Router/Router";
import {Provider} from 'react-redux';
import {store} from './store/store.js';
import api from './api.js';
import { useEffect, useState } from "react";

function App() {
  const [scenarioFormData, setScenarioFormData] = useState({})
  const [users, setUsers] = useState({
    id: "",
    security_level: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    level: "",
    next_level: "",
    mmr: "",
    badges: "",
    total_assessments: "",
    number_of_failures: "",
    straight_failures: "",
    assessment_overdue: "",
    total_score: "",
    company_id: "",
    group_id: "",
    profileImguser: "",
  });
  const fetchUsers = async() => {
    const response = await api.get("/users");
    setUsers(response.data)
  };

  useEffect(() => {
    fetchUsers();
  }, [])

  //submitting data for a new test(instead of algorithmic):
  const handleScenarioFormData = async(event) => {
    event.preventDefault();
    await api.post('/users', scenarioFormData);
    fetchUsers();
    setScenarioFormData({
      map:"",
      scenario:"",
      missionType:"", 
      startTime:"", 
      endTime:"",
      wind:"", 
      fog:"", 
      brightness:"", 
    })
  }

  return (
      <Provider store={store}>
        <div>
          <Router />
        </div>
      </Provider>
  );
}

export default App;
