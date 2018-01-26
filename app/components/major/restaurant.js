import React from 'react';
import ReactDOM from 'react-dom';
import {GlobalStar} from './../independant/star';

export class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'globalGrade': 4.2, 'starColor': ''};
    }

    componentWillMount() {
        let grade = this.state.globalGrade;

        if (grade >= 1 && grade <= 2) {
            this.setState({starColor: 'red-star'});
        } else if (grade > 2 && grade < 4) {
            this.setState({starColor: 'orange-star'});
        } else if (grade >= 4 && grade <= 5) {
            this.setState({starColor: 'green-star'});
        } else {
            console.log('Error: rating must be  between 1 and 5')
        }
    }
  
    render() {
        /*let src = this.props.src //ressources/pictures/orange-star.png --  <img src={src} className="img-fluid" alt="star-picture">*/

        return (
            <div>
                <GlobalStar globalGrade={this.state.globalGrade} starColor={this.state.starColor} />
            </div>
        );
    }
}

ReactDOM.render(
    <Restaurant />,
    document.getElementById('restaurant-test')
);