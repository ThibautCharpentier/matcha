import { useState, useMemo, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AgeStep({nextStep, infosUser}) {

    const titleSection = infosUser.gender === "men" ? "Je suis né" : "Je suis née";

    // Utiliser useMemo pour mémoriser les valeurs calculées
    const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
    const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
    const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let year = currentYear - 18; year >= currentYear - 100; year--) {
        years.push(year);
    }
    return years;
    }, []);

    // État pour les sélections d'utilisateur
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');

    const validateDate = (d, m, y) => {
        if (!d || !m || !y) return false;
        const date = new Date(y, m - 1, d); // Les mois en JavaScript sont indexés à partir de 0
        return date.getFullYear() == y && date.getMonth() == m - 1 && date.getDate() == d;
    };
    
    useEffect(() => {
        if (day && month && year) {
            if (validateDate(day, month, year)) {
                setError('');
            } else {
                setError('La date sélectionnée est invalide.');
            }
        }
    }, [day, month, year]);
    
    function handleSubmit() {
        const date = new Date(year, month - 1, day);
        infosUser.age = date; 
    
        nextStep()
    }
    
    return (
        <>
            <div className="strike mb-10"> 
                <span>{titleSection}</span>
            </div>
            <div className="flex space-x-2 justify-center">
                <select 
                value={day} 
                onChange={(e) => setDay(e.target.value)} 
                className="border border-gray-300 rounded p-2">
                <option value="">Jour</option>
                {days.map(d => (
                    <option key={d} value={d}>{d}</option>
                ))}
                </select>        
                <select 
                value={month} 
                onChange={(e) => setMonth(e.target.value)} 
                className="border border-gray-300 rounded p-2">
                <option value="">Mois</option>
                {months.map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
                </select>       
                <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
                className="border border-gray-300 rounded p-2"
                >
                <option value="">Année</option>
                {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                ))}
                </select>
            </div>
            {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
            {day && month && year && !error && (
            <div className="flex justify-center mt-4">
                <button className="btn" onClick={handleSubmit}>Valider</button>
            </div>)}

        </>
    )
}