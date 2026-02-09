import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Colleges = () => {
    const [activeTab, setActiveTab] = useState('exams');
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState({ exams: [], colleges: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/colleges')
            .then(res => res.json())
            .then(data => {
                setData(data); // Expecting { exams: [], colleges: [] } structure from API
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch colleges data", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="section container">Loading data...</div>;

    const filteredItems = activeTab === 'exams'
        ? data.exams.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.stream.toLowerCase().includes(searchTerm.toLowerCase()))
        : data.colleges.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.stream.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="page colleges-page section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1>Find Colleges & Exams</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Discover list of top entrance exams and colleges.</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
                    <button
                        onClick={() => setActiveTab('exams')}
                        className={`btn ${activeTab === 'exams' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        Entrance Exams
                    </button>
                    <button
                        onClick={() => setActiveTab('colleges')}
                        className={`btn ${activeTab === 'colleges' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        Top Colleges
                    </button>
                </div>

                {/* Search */}
                <div style={{ maxWidth: '600px', margin: '0 auto 3rem auto', position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', fontSize: '1rem' }}
                    />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="card"
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{item.name}</h3>
                                <span style={{
                                    background: '#f3e8ff',
                                    color: 'var(--accent)',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold'
                                }}>
                                    {item.stream}
                                </span>
                            </div>

                            {activeTab === 'exams' ? (
                                <>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{item.description}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                        <FaCalendarAlt color="var(--primary)" />
                                        <strong>Exam Date:</strong> {item.date}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                        <FaMapMarkerAlt /> {item.location}
                                    </div>
                                    <p style={{ marginBottom: '1rem' }}><strong>Entrance:</strong> {item.exam}</p>
                                    <div style={{ marginTop: 'auto', textAlign: 'right', fontWeight: 'bold', color: '#eab308' }}>
                                        Rating: {item.rating}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>No results found.</p>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Colleges;
