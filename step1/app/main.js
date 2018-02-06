import {DataShaper} from './class/data_shaper';
import './components/index';

export const dataShaper = new(DataShaper);
dataShaper.startApp(); //it does not really start the application, it start the data transformation