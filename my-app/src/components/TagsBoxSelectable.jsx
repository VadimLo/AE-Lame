import './TagsBox.css';
import React, {useEffect, useState} from 'react';
import PresignService from '../API/PresignService';
import ImportService from '../AEService/ImportService';

function TagsBoxSelectable(props) {
    const [tags, setTags] = useState([]);
    const [imId, setImId] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const tgs = JSON.parse(JSON.stringify(props.tags));
        tgs.forEach((v) => v.selected = false);
        setTags(tgs);
    }, [props.tags]);

    const onTagClick = (tagEl) => {
        let copy = {...tagEl, children: []}
        setSelectedTags([...selectedTags, copy]);
        console.log(selectedTags)
    };
    const selectTag = (tag) => {
        console.log('asdasdasda')
        tags.forEach((v) => {
            if (v.id === tag.id) {
                v.selected = !v.selected;
            }
        },
        );
        setTags([...tags]);
    };

    const drawTags = (tags, fun) => {
        return tags.map((tag) => {
            const rows = [];
            rows.push(<div key={tag.id.toString() + tag.parentId + "x"} className={tag.selected ? 'tag-selected' : 'tag'}
                           onClick={() => fun(tag)}>{tag.name}</div>)
            if (tag.children.length > 0) {
                rows.push(drawTags(tag.children, fun));
            }
            return rows;
        });
    };
    const downloadBulk = () => {
        const ids = selectedTags
            // .filter((tag) => tag.selected)
            .map((tag) => tag.id);
        PresignService.getFileLinksBulk(ids)
            .then((res) => res.json())
            .then((res) => {
                Promise.all(res.map((url, ind) => {
                    const path = props.projectPath + '\\\\' + ind + '.mp4';
                    return downloadVideoLame(url, path);
                })).then((links) => {
                    return Promise.all(links.map((link, ind) =>
                        ImportService.importFile(props.projectPath + '\\\\' + ind + '.mp4', props.folderId)));
                }).then((values) => {
                    setImId(values);
                    props.updateId(values);
                });
            });
    };
    return (
        <div>
            {/*{tags.map((tag) =>*/}
            {/*    <div key={tag.id + 'x'} className={tag.selected ? 'tag-selected' : 'tag'}*/}
            {/*        onClick={() => selectTag(tag)}>*/}
            {/*        <div>{tag.name}</div>*/}
            {/*    </div>,*/}
            {/*)}*/}
            {
                drawTags(tags, onTagClick)
            }
            <button onClick={downloadBulk}>Download by tags</button>
        </div>


    );
}

export default TagsBoxSelectable;
