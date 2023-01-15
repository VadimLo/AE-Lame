import React, {useRef, useState} from 'react';
import PostService from '../API/PostService';
import axios from "axios";

const UploadVideo = ({tags}) => {
    const [selectedFile, setSelectedFile] = useState();
    const [selectedTags, setSelectedTags] = useState([]);
    const canvasRef = useRef(null);
    const videoRef = useRef(null);

    const findParentTagsRecursive = (tags, targetTag, result = []) => {
        for (const tag of tags) {
            if (tag.id === targetTag.id && tag.parentId === targetTag.parentId) {
                return result;
            }
            if (tag.children) {
                const foundParents = findParentTagsRecursive(tag.children, targetTag, [...result, {
                    ...tag,
                    children: []
                }]);
                if (foundParents) {
                    return foundParents;
                }
            }
        }
        return null;
    }
    const onTagClick = (tagEl) => {
        let copy = {...tagEl, children: []}
        const s = [...selectedTags, copy, ...findParentTagsRecursive(tags, copy, [])]
        setSelectedTags([...s.filter((tag, index, self) =>
                index === self.findIndex(t => (
                    t.id === tag.id && t.parentId === tag.parentId
                ))
        )]);
    };

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter((p) => p.id !== tag.id));
    };
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const resetState = () => {
        setSelectedFile(null);
        setSelectedTags([])
    };

    const handleUpload = async (file) => {
        const responsePresign = await PostService.postSelectedTags({
            fileName: file.name,
            fileType: file.type,
            tags: selectedTags.map((v) => v.id),
        })
        axios.put(responsePresign.data.file, file, {
            headers: {
                'Content-Type': file.type,
            },
        })
        axios.put(responsePresign.data.img, handleLoadedMetadata(), {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
        resetState()

    };

    const drawTags = (tags, fun) => {
        return tags.map((tag) => {
            const rows = [];
            rows.push(<div key={tag.id.toString() + tag.parentId}
                           onClick={() => fun(tag)}>{tag.name}</div>)
            if (tag.children.length > 0) {
                rows.push(drawTags(tag.children, fun));
            }
            return rows;
        });
    };

    const handleLoadedMetadata = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 3, 3);
        const video1 = canvas.toDataURL('image/jpeg');
        console.log(video1)
        // new File(dataURLtoBlob(video1, "asd.jpeg"))
        return  new File([dataURLtoBlob(video1)], "asd.jpeg");
        // console.log(imageDataUrl)
        // You can now send the image data to another service or do something else with it
    }

    function dataURLtoBlob(dataURL) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }


    return <div>
        Create post clip
        <div>
            {
                selectedFile ?
                    <video ref={videoRef} width="400" controls autoPlay key={selectedFile.name}>
                        <source src={URL.createObjectURL(selectedFile)}/>
                    </video> :
                    <h3>video preview</h3>
            }
            <canvas ref={canvasRef} style={{display: 'none'}}/>
        </div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}>Upload to S3</button>


        <div className="columns">
            <div className="column">{drawTags(tags, onTagClick)}</div>
            <div className="column">{drawTags(selectedTags, removeTag)}</div>
        </div>


    </div>;
};

export default UploadVideo;
