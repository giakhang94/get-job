import { AreaChart as AreaCharts, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AreaChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaCharts
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#2cb1bc" data={data} />
            </AreaCharts>
        </ResponsiveContainer>
    );
};
export default AreaChart;
