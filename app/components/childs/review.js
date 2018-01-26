import React from 'react';

import {ProfilPicture} from './profil-picture';
import {Rating} from './rating';
import {Paragraphe} from './../independant/paragraphe';

export class Review extends React.Component {

    render() {
        //The following string will be removed, text should come from json and/or API
        let reviewText = 'J\'ai trouvé ça suuuuper bon ! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed leo odio, efficitur eget sagittis eu, suscipit ac magna. Morbi quis sodales neque. ';

        return (
            <div className={this.props.wrapperClass}>
                <div className={'row justify-content-around'}>

                    <ProfilPicture 
                        profilWrapperClass={'col-6 col-sm-3 text-center'}
                        fileName={'loutre'}
                        pictureClass={'user-thumbnail rounded-circle img-fluid'}
                        alt={'user-picture'}
                    />

                    <div className={'col-12 col-sm-9'}>
                        <div className={'row justify-content-start'}>

                        <div className={'col-sm-11 rating-zone'}>
                            
                            <Rating 
                                wrapperClass={'col-sm-12 rating'}
                                starNumber={'4'}
                            />

                            <Paragraphe
                                 className={'col-sm-12 rating-date'}
                                 content={'Date du repas: 17 janvier 2018'}
                            />
                        </div>

                            <Paragraphe 
                                paragrapheClass={'col-sm-11'}
                                content ={reviewText}
                            />

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}