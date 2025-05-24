import React, { useState, useEffect } from 'react';
import { fetchImportedRepositories, importRepositories } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const ImportView: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [repos, setRepos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [polling, setPolling] = useState(false);

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

        try {
            await importRepositories(file);
            setPolling(true); // inicia o polling após importar
        } catch (err: any) {
            setError(err.message || 'Failed to import data');
        } finally {
            setLoading(false);
        }
    };

    // buscar os repositórios importados
     useEffect(() => {
        let interval: NodeJS.Timeout;
        if (polling) {
            interval = setInterval(async () => {
                try {
                    const data = await fetchImportedRepositories();
                    if (Array.isArray(data)) {
                        setRepos(data);
                        setPolling(false);
                        toast.success('Dados processados com sucesso!');
                    } else {
                        setRepos([]);
                    }
                } catch (err: any) {
                    setError('Erro ao buscar repositórios importados');
                }
            }, 2000); // consulta a cada 2 segundos
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [polling]);


    // Buscar repositórios ao montar o componente
    useEffect(() => {
        const fetchRepos = async () => {
            try {
               const data = await fetchImportedRepositories();
                if (Array.isArray(data)) {
                    setRepos(data);
                } else {
                    setRepos([]);
                }
            } catch (err: any) {
                setError('Erro ao buscar repositórios importados');
            }
        };
        fetchRepos();
    }, []);

    return (
        <div className="import-view-container">
            <h2>Import and View Repositories</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleImport} className="import-btn">Import Repositories</button>
            <button onClick={async () => {
                setLoading(true);
                try {
                    const data = await fetchImportedRepositories();
                    if (Array.isArray(data)) {
                        setRepos(data);
                    } else {
                        setRepos([]);
                    }
                } catch (err: any) {
                    setError('Erro ao buscar repositórios importados');
                }
                setLoading(false);
            }} className="import-btn" style={{ marginLeft: 8 }}>Atualizar</button>
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
            <ToastContainer />
        </div>
    );
};

export default ImportView;