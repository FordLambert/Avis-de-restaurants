import {Conductor} from './conductor';

import './components/parents/navigation';
import './components/parents/restaurant-list';
import './components/parents/sliding-aside';

import './components/independant/range-input'

const conductor = new(Conductor);
conductor.initialiseData();