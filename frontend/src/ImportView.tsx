import React, { useState } from 'react';
import './App.css';

const ImportView: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleImport = async () => {
        if (!file) {
            setError('Please select a file to import.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:5000/api/import', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Failed to import data');

            const data = await res.json();
            setRepos(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="import-view-container">
            <h2>Import and View Repositories</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleImport} className="import-btn">Import Repositories</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {repos.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Repository Name</th>
                            <th>Owner Name</th>
                            <th>Star Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repos.map((repo, index) => (
                            <tr key={index}>
                                <td>{repo.name}</td>
                                <td>{repo.owner}</td>
                                <td>{repo.stars}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ImportView;