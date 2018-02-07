import React from 'react';

import SearchInput from './search_input';
import OrderSelect from './order_select';
import SearchLabel from './search_label';

const SearchForm = () => (
    <form className="col-12 col-lg-10">

        <div className="form-group">
            <SearchInput
                id={'location-input'}
                placeholder={'Entrez une ville'}
            />
        </div>

        <div className="form-group">
            <SearchLabel
                labelContent={'Note moyenne minimum:'}
            />
            <SearchInput
                id={'grade-input'}
                type={'range'}
                min={1}
                max={5}
                step={1}
                value={1}
            />
        </div>
        <div className="col-12">
            <div className="row justify-content-between">
                <p className="col-2">1</p>
                <p className="col-2">2</p>
                <p className="col-2">3</p>
                <p className="col-2">4</p>
                <p className="col-2">5</p>
            </div>
        </div>

        <div className="form-group">
            <SearchLabel
                content={'Trier par:'}
            />

            <OrderSelect />
        </div>

        <input type="submit" className="btn btn-secondary" value="C'est parti !"></input>
    </form>
);

export default SearchForm;