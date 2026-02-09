import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import config from '../config';

const Careers = () => {
    const [careersData, setCareersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        fetch(`${config.API_URL}/careers`)
            .then(res => res.json())
            .then(data => {
                setCareersData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch careers", err);
                setLoading(false);
            });
    }, []);

    const filteredCareers = careersData.filter(career => {
        const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            career.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'All' || career.type === filterType;
        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="section container">Loading careers...</div>;

    const types = ['All', 'R', 'I', 'A', 'S', 'E', 'C'];
    const typeNames = {
        'All': 'All Types',
        'R': 'Realistic',
        'I': 'Investigative',
        'A': 'Artistic',
        'S': 'Social',
        'E': 'Enterprising',
        'C': 'Conventional'
    };

    return (
        <div className="page careers-page section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>Explore Careers</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Find your future among {careersData.length}+ career options</p>
                </div>

                {/* Search and Filter */}
                <div className="card" style={{ padding: '1.5rem', marginBottom: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search careers (e.g. Engineer, Doctor)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '1rem' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`btn ${filterType === type ? 'btn-primary' : 'btn-secondary'} `}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}
                            >
                                {typeNames[type]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-3">
                    {filteredCareers.map((career) => (
                        <motion.div
                            key={career.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="card"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{career.title}</h3>
                                <span style={{
                                    background: '#f1f5f9',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    color: 'var(--text-muted)'
                                }}>
                                    {typeNames[career.type]}
                                </span>
                            </div>

                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flex: 1 }}>{career.description}</p>

                            <Link to={`/careers/${career.id}`} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                View Details
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {filteredCareers.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        <p>No careers found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Careers;
