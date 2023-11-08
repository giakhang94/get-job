import { BarChart as BarCharts, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const BarChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarCharts data={data} margin={{ top: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#2cb1bc" barSize={75} />
            </BarCharts>
        </ResponsiveContainer>
    );
};
export default BarChart;
