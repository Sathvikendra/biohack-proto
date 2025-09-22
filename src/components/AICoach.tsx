'use client';
import React, { useState } from 'react';

export default function AICoach() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setAnswer(null);

    const res = await fetch('/api/aicoach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.reply);
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">AI Health Coach</h2>
      <textarea
        className="w-full border rounded p-2 mb-3"
        rows={3}
        placeholder="Ask about diet, workout, stress..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Generate Plan'}
      </button>

      {answer && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">Recommendation</h3>
          <p className="whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}
