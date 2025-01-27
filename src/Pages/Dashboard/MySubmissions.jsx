import React, { useEffect, useState } from 'react';

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetch('https://click-n-cash-server.vercel.app/allSubmissions')
            .then(res => res.json())
            .then(data => setSubmissions(data));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>All Submissions</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Worker Name</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Worker Email</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Task Title</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Payable Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{submission.worker_name}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{submission.worker_email}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{submission.task_title}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>${submission.payable_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MySubmissions;
