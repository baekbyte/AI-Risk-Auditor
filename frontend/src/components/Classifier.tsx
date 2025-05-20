import React, { useState } from 'react';

const Classifier: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('http://localhost:8080/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      setResult(data.classification);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error processing request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="text-input"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: 'var(--text-dark)',
                fontWeight: 500
              }}
            >
              Enter text to classify:
            </label>
            <textarea
              id="text-input"
              className="input-field"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Type or paste your text here..."
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn"
            disabled={loading || !text.trim()}
            style={{
              opacity: loading || !text.trim() ? 0.7 : 1,
              cursor: loading || !text.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Classify Text'}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--light-blue)',
            borderRadius: '8px',
            border: '1px solid var(--primary-blue)'
          }}>
            <h3 style={{ 
              color: 'var(--primary-blue)',
              marginBottom: '0.5rem'
            }}>
              Classification Result:
            </h3>
            <p style={{ margin: 0 }}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Classifier; 