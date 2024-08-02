import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState('');
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchGoals = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get('/api/goals', config);
      setGoals(response.data);
    };

    if (user) {
      fetchGoals();
    }
  }, [user]);

  const addGoal = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const response = await axios.post('/api/goals', { text }, config);
    setGoals([...goals, response.data]);
    setText('');
  };

  const deleteGoal = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/goals/${id}`, config);
    setGoals(goals.filter((goal) => goal._id !== id));
  };

  return (
    <div>
      <h1>Goals</h1>
      <form onSubmit={addGoal}>
        <input
          type="text"
          placeholder="Add a goal"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id}>
            {goal.text}
            <button onClick={() => deleteGoal(goal._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Goals;