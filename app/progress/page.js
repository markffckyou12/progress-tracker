// app/entry/page.js

'use client';

import { useState, useEffect } from 'react';

export const metadata = {
  title: 'Your entry - entry Tracker',
  description: 'View and update your entry entries.',
};

export default function entryPage() {
  const [entry, setEntry] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/entry');
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
      const res = await fetch('/api/entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage('Entry saved!');
        setEntry('');
        fetchEntries(); // Refresh entries
      } else {
        setMessage('Error saving entry.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <main>
      <h1>Your entry</h1>
      <form onSubmit={handleSubmit}>
        <label>
          entry:
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </label>
        <button type="submit">Save Progress</button>
      </form>
      <p>{message}</p>
      <h2>Previous Entries:</h2>
      <ul>
        {entries.map((item) => (
          <li key={entry.id}>
            {entry.entry} (on {new Date(item.created_at).toLocaleString()})
          </li>
        ))}
      </ul>
    </main>
  );
}

