import  { useState, useEffect, useContext } from 'react';
import axiosInstance from '../api/axios'; // Import the Axios instance
import { AuthContext } from '../context/AuthContext';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState('');
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axiosInstance.get('/api/goals');
      setGoals(response.data);
    };

    if (token) {
      fetchGoals();
    }
  }, [token]);

  const addGoal = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post('/api/goals', { text });
    setGoals([...goals, response.data]);
    setText('');
  };

  const deleteGoal = async (id) => {
    await axiosInstance.delete(`/api/goals/${id}`);
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
