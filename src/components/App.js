import {useEffect, useState} from 'react';
import SearchBar from "./SearchBar.js";
import youtube from "../apis/youtube.js";
import VideoList from "./VideoList.js";
import VideoDetail from "./VideoDetail.js";


const App = () => {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        onTermSubmit('SaveAFox');
    }, []);

    const onTermSubmit = async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term
            }
        });

        setVideos(response.data.items);
        setSelectedVideo(response.data.items[0]);
    };

    return (
        <div className="ui container">
            <SearchBar onFormSubmit={onTermSubmit}/>
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                        <VideoDetail video={selectedVideo}/>
                    </div>
                    <div className="five wide column">
                        <VideoList videos={videos} onVideoSelect={setSelectedVideo}/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default App;