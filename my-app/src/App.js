import './App.css';
import React, {useEffect, useState} from 'react';
import UploadVideo from './components/UploadVideo';
import CreateTag from './components/CreateTag';
import Posts from './components/Posts';
import TagService from './API/TagService';
import PostService from './API/PostService';
import GeneralAe from './components/AE/GeneralAe';

function App() {
    const [tags, setTags] = useState([]);
    const [posts, setPosts] = useState([]);
    const [aeMod, setAeMod] = useState(true);


    useEffect(() => {
        loadTags();
    }, []);


    async function loadTags() {
        const response = await TagService.getAllTags();
        console.log(response.data);
        response.data.forEach((s) => s.isHovering = false);
        // const posts = await PostService.getAllPosts()
        // setPosts(posts.data);
        setTags(response.data);
    }


    return (<div className="App">
        <button onClick={() => setAeMod(!aeMod)}>Change mod</button>
        {aeMod ?
            <div>
                <div className="b2">
                    <UploadVideo
                        tags={tags}

                    />
                    <CreateTag
                        tags={tags}
                        updateTags={setTags}
                    />
                </div>
                {/* <Posts tags={tags} posts={posts}></Posts>*/}
            </div> :
            <GeneralAe tags={tags}/>
        }
    </div>

    );
}

export default App;
