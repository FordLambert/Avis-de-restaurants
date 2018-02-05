import React from 'react';

export class SectionBreaker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'restaurantNumber': 0};
    }

    listenForChanges() {
        document.addEventListener('restaurantList-updated', function(restaurantList) {
            this.setState({restaurantNumber: restaurantList.detail.length});
        }.bind(this));
    }

    render() {
        this.listenForChanges();

        return (
            <div className={'section-breaker col-12 text-center'}>
                <p>{this.state.restaurantNumber}  résultats trouvés</p>
            </div>
        );
    }
}