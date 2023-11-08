import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
const StatsContainer = ({ defaultStats }) => {
    return (
        <Wrapper>
            <StatItem
                title="Pending Applications"
                count={defaultStats?.pending || 0}
                color="#f59c0b"
                backgroundColor="#fcefc7"
                icon={<FaCalendarCheck />}
            />
            <StatItem
                title="Interview Scheduled"
                count={defaultStats?.interview || 0}
                color="#647acb"
                backgroundColor="#fcefc7"
                icon={<FaSuitcaseRolling />}
            />
            <StatItem
                title="Jobs Declined"
                count={defaultStats?.declined || 0}
                color="#d66a6a"
                backgroundColor="#fcefc7"
                icon={<FaBug />}
            />
        </Wrapper>
    );
};
export default StatsContainer;
