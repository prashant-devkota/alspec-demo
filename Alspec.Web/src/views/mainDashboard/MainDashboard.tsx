import reducer from './store'
import { injectReducer } from '@/store/';
import JobsList from './components/JobsList';

injectReducer('mainDashboard', reducer)

const MainDashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <JobsList />
        </div>
    )
}

export default MainDashboard;