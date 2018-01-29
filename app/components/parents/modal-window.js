import React from 'react';

import {ModalHeader} from './../childs/modal-header';
import {ModalBody} from './../childs/modal-body';
import {Link} from './../independant/link';

export class ModalWindow extends React.Component {

    render() {
        return (
            <div id={this.props.id} className={this.props.className}>

                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="popUpContainer">

                            <ModalHeader 
                                className={'modal-header'}
                            />

                            <ModalBody 
                                className={'modal-body'}
                            />

                        </div>
                    </div>
                </div>

                <Link 
                    href={'#!'}
                    linkClass={'closePopUpOutSide'}
                />
                
            </div>
        );
    }
}