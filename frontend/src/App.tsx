import React from 'react';

import { useEffect, useState } from 'react';
import { API_BASE } from './api/config';

type Restaurant = { _id: string; name: string; location?: string };
type Dish = { _id: string; name: string; description?: string };

export default function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [dishId, setDishId] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    fetch(`${API_BASE}/restaurants`)
      .then((r) => r.json())
      .then(setRestaurants)
      .catch(console.error);
  }, []);

  const loadDishes = (rest: Restaurant) => {
    setSelected(rest);
    fetch(`${API_BASE}/restaurants/${rest._id}/dishes`)
      .then((r) => r.json())
      .then(setDishes)
      .catch(console.error);
  };

  const submitReview = async () => {
    if (!dishId) return alert('Select a dish');
    await fetch(`${API_BASE}/dishes/${dishId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, text })
    });
    alert('Review submitted (refresh dishes in console)');
    setText('');
  };

  return (
    <div className="app-root">
      <header style={{ padding: '1rem', textAlign: 'center' }}>
        <h1>Incredibles — Foodie (Demo)</h1>
        <p>Simple demo: list restaurants, view dishes, submit a review.</p>
      </header>
      <main style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <section style={{ flex: 1 }}>
          <h2>Restaurants</h2>
          <ul>
            {restaurants.map((r) => (
              <li key={r._id}>
                <button onClick={() => loadDishes(r)}>{r.name} — {r.location}</button>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ flex: 2 }}>
          <h2> {selected ? `Dishes @ ${selected.name}` : 'Select a restaurant'}</h2>
          {dishes.length === 0 && selected && <p>No dishes found</p>}
          <ul>
            {dishes.map((d) => (
              <li key={d._id}>
                <label>
                  <input type="radio" name="dish" value={d._id} onChange={(e) => setDishId(e.target.value)} />
                  <strong>{d.name}</strong> — {d.description}
                </label>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '1rem' }}>
            <h3>Submit a review</h3>
            <div>
              <label>Rating: </label>
              <input type="number" value={rating} min={1} max={10} onChange={(e) => setRating(Number(e.target.value))} />
            </div>
            <div>
              <label>Text: </label>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button onClick={submitReview}>Submit</button>
          </div>
        </section>
      </main>
    </div>
  );
}
