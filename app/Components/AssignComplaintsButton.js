import { useState } from 'react';

function AssignComplaintButton({ complaintId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAssign = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/assignComplaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complaintId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign complaint');
      }

      const result = await response.json();
      console.log(result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAssign} disabled={loading}>
        {loading ? 'Assigning...' : 'Assign Complaint'}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default AssignComplaintButton;
