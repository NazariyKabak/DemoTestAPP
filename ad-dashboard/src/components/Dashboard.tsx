import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface AdData {
    date: string;
    clicks: number;
    impressions: number;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<AdData[]>([]);
    const [sortKey, setSortKey] = useState<string>('date');
    const [filterKey, setFilterKey] = useState<string>('all');
    const [chartType, setChartType] = useState<string>('line');

    useEffect(() => {
        axios.get<AdData[]>('http://localhost:8080/api/ads')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const sortedData = [...data].sort((a, b) => {
        if (sortKey === 'date') {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortKey === 'clicks') {
            return a.clicks - b.clicks;
        } else if (sortKey === 'impressions') {
            return a.impressions - b.impressions;
        }
        return 0;
    });

    const filteredData = sortedData.filter((item) => {
        if (filterKey === 'all') return true;
        if (filterKey === 'highClicks') return item.clicks > 100;
        if (filterKey === 'highImpressions') return item.impressions > 2000;
        return true;
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h2>Панель метрик реклами</h2>
            <div>
                <label>Сортувати за: </label>
                <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
                    <option value="date">Дата</option>
                    <option value="clicks">Кліки</option>
                    <option value="impressions">Покази</option>
                </select>
                <label>Фільтрувати за: </label>
                <select onChange={(e) => setFilterKey(e.target.value)} value={filterKey}>
                    <option value="all">Всі</option>
                    <option value="highClicks">Багато кліків</option>
                    <option value="highImpressions">Багато показів</option>
                </select>
                <label>Тип діаграми: </label>
                <select onChange={(e) => setChartType(e.target.value)} value={chartType}>
                    <option value="line">Лінійна</option>
                    <option value="pie">Кругова</option>
                    <option value="bar">Гістограма</option>
                </select>
            </div>
            {chartType === 'line' && (
                <LineChart width={600} height={300} data={filteredData}>
                    <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            )}
            {chartType === 'pie' && (
                <PieChart width={400} height={400}>
                    <Pie
                        data={filteredData}
                        dataKey="clicks"
                        nameKey="date"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {filteredData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            )}
            {chartType === 'bar' && (
                <BarChart width={600} height={300} data={filteredData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#8884d8" />
                </BarChart>
            )}
        </div>
    );
};

export default Dashboard;
