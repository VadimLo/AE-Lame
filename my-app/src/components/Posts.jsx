import PresignService from '../API/PresignService';
import React from 'react';

function Posts(props) {
    const downloadFile = async (id) => {
        const path = 'C:/Users/vadim/Desktop/k2.mp4';
        const presign = await PresignService.getPresign(id)
            .then((res) => res.text());
        downloadVideoLame(presign, path);
    };


    return (<div className="posts">
        {
            props.posts.map((post) =>
                <div key={post.id}>{post.id}
                    <button onClick={() => downloadFile(post.id)}>Download</button>
                </div>,
            )
        }
    </div>);
}

export default Posts;
