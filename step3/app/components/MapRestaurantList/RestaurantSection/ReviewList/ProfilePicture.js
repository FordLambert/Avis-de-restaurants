import React, {Component} from 'react';
import PropTypes from 'prop-types';

import UserPicture from './UserPicture';

export default class ProfilePicture extends Component {
    static propTypes = {
        src: PropTypes.string,
        username: PropTypes.string
    }

    defineUserName() {
        if (this.props.userName == undefined) {
            return 'utilisateur';
        } else {
            return this.props.userName;
        }
    }

    render() {
        return (
            <div className='offset-1 col-10'>
                <div className='row justify-content-center justify-content-md-start text-center'>
                    <div className='col-5 col-sm-3'>
                        <UserPicture
                            src={this.props.src}
                            className='user-thumbnail rounded-circle img-fluid'
                            alt='user-picture'
                        />
                        <figcaption>
                            {this.defineUserName()}
                        </figcaption>
                    </div>
                </div>
            </div>
        );
    }
}