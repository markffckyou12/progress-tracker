// app/progress/page.js

'use client';

import { useState, useEffect } from 'react';

export const metadata = {
  title: 'Your Progress - Progress Tracker',
  description: 'View and update your progress entries.',
};

export default function ProgressPage() {
  const [progress, setProgress] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/progress');
      const data = await res.json();
      if (data.success) {
        setEntries(data.data);
      } else {
        setMessage('Error fetching entries.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Progress saved!');
        setProgress('');
        fetchEntries(); // Refresh entries
      } else {
        setMessage('Error saving progress.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <main>
      <h1>Your Progress</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Progress:
          <input
            type="text"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          />
        </label>
        <button type="submit">Save Progress</button>
      </form>
      <p>{message}</p>
      <h2>Previous Entries:</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.entry} (on {new Date(entry.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </main>
  );
}

