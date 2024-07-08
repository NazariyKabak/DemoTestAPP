import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

interface AdData {
    date: string;
    clicks: number;
    impressions: number;
}

enum SortKey {
    Date = 'date',
    Clicks = 'clicks',
    Impressions = 'impressions'
}

enum FilterKey {
    All = 'all',
    HighClicks = 'highClicks',
    HighImpressions = 'highImpressions'
}

enum ChartType {
    Line = 'line',
    Pie = 'pie',
    Bar = 'bar'
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<AdData[]>([]);
    const [sortKey, setSortKey] = useState<SortKey>(SortKey.Date);
    const [filterKey, setFilterKey] = useState<FilterKey>(FilterKey.All);
    const [chartType, setChartType] = useState<ChartType>(ChartType.Line);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get<AdData[]>('http://localhost:8080/api/ads')
            .then(response => setData(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again later.');
            });
    }, []);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortKey(e.target.value as SortKey);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterKey(e.target.value as FilterKey);
    };

    const handleChartTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChartType(e.target.value as ChartType);
    };

    const resetFiltersAndSorting = () => {
        setSortKey(SortKey.Date);
        setFilterKey(FilterKey.All);
    };

    const sortedData = [...data].sort((a, b) => {
        switch (sortKey) {
            case SortKey.Date:
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            case SortKey.Clicks:
                return a.clicks - b.clicks;
            case SortKey.Impressions:
                return a.impressions - b.impressions;
            default:
                return 0;
        }
    });

    const filteredData = sortedData.filter((item) => {
        switch (filterKey) {
            case FilterKey.All:
                return true;
            case FilterKey.HighClicks:
                return item.clicks > 100;
            case FilterKey.HighImpressions:
                return item.impressions > 2000;
            default:
                return true;
        }
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h2>Панель метрик реклами</h2>
            {error && <div className="error">{error}</div>}
            <div>
                <label>Сортувати за: </label>
                <select onChange={handleSortChange} value={sortKey}>
                    <option value={SortKey.Date}>Дата</option>
                    <option value={SortKey.Clicks}>Кліки</option>
                    <option value={SortKey.Impressions}>Покази</option>
                </select>
                <label>Фільтрувати за: </label>
                <select onChange={handleFilterChange} value={filterKey}>
                    <option value={FilterKey.All}>Всі</option>
                    <option value={FilterKey.HighClicks}>Багато кліків</option>
                    <option value={FilterKey.HighImpressions}>Багато показів</option>
                </select>
                <label>Тип діаграми: </label>
                <select onChange={handleChartTypeChange} value={chartType}>
                    <option value={ChartType.Line}>Лінійна</option>
                    <option value={ChartType.Pie}>Кругова</option>
                    <option value={ChartType.Bar}>Гістограма</option>
                </select>
                <button onClick={resetFiltersAndSorting}>Скинути фільтри та сортування</button>
            </div>
            {chartType === ChartType.Line && (
                <LineChart width={600} height={300} data={filteredData}>
                    <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            )}
            {chartType === ChartType.Pie && (
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
            {chartType === ChartType.Bar && (
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
