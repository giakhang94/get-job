import Wrapper from '../assets/wrappers/ChartsContainer';
import { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

const ChartsContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button
                className=""
                type="button"
                onClick={() => {
                    setBarChart((prev) => !prev);
                }}
            >
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    );
};
export default ChartsContainer;
