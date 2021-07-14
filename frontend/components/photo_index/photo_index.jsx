import React from 'react';

import PhotoIndexItem from './photo_index_item';


class PhotoIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
        this.loadedList = 0;
        this.handleLoading = this.handleLoading.bind(this);
        this.interval;
    }

    componentDidMount() {
        this.props.fetchAllUsers();
        this.props.fetchAllPhotos();
        let loadedCheck = () => {
            if (this.props.photos.length <= this.loadedList) {
                this.setState({ loaded: true });
                clearInterval(this.interval);
            }
        };
        const check = loadedCheck.bind(this);
        this.interval = setInterval(() => { check() }, 5000);
    }

    componentWillUnmount() {
        //Fixes bug where user navigates away from page before setInterval
        //has been cleared
        clearInterval(this.interval);
    }
    
    handleLoading() {
        this.loadedList++;
    }

    render() {
        let content;

        if (this.props.photos.length <= this.loadedList) {
            content = this.props.photos.map((photo) => {
                return (
                    <PhotoIndexItem
                        key={photo.id}
                        photo={photo}
                        user={this.props.users[photo.userId]}/>
                )
            })
        } else {
            content = <div className="loader" >
                        {this.props.photos.map((photo) => (
                            <img className='secret-load' key={photo.id}
                            src={photo.photoUrl}
                            onLoad={this.handleLoading(photo)}/>
                        ))}
                    </div>
        }

        return(
            <>
                <ul className="photo-index">
                    {content}
                </ul>
            </>
        )
    }
}

export default PhotoIndex;