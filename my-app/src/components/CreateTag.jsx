import './Tags.css';
import React, {useState} from 'react';
import TagService from '../API/TagService';

function CreateTag({updateTags, tags}) {
    const rootParent = {id: 1, name: 'root', type: 'DEFAULT'};
    const [tag, setTag] = useState({id: Date.now(), name: '', type: 'DEFAULT'});
    const [parentTag, setParentTag] = useState(rootParent);

    const removeTag = async (tag) => {
        const removeRecursive = (tags, tagToRemove) => {
            return tags.filter((tag) => {
                if (tag.id !== tagToRemove.id) {
                    if (tag.children.length > 0) {
                        tag.children = removeRecursive(tag.children, tagToRemove);
                    }
                    return true;
                }
                return false;
            });
        };

        const response = await TagService.deleteTag(tag.id);
        response.data === 'true' ?
            updateTags(removeRecursive(tags, tag)) :
            console.log('cant delete');
    };


    const addNewTag = async () => {
        const recursiveFind = (tags, tagToFind) => {
            return tags.findIndex((tag) => {
                if (tag.id !== tagToFind.id) {
                    if (tag.children.length > 0) {
                        recursiveFind(tag.children, tagToFind);
                    }
                    return true;
                }
                return false;
            });
        };

        const recursiveUpdate = (tags, parent, data) => {
            tags.forEach((tag) => {
                if (tag.id === parent.id) {
                    tag.children.push(data);
                    console.log(tag);
                    return;
                }
                if (tag.children.length > 0) {
                    recursiveUpdate(tag.children, parent, data);
                }
            });
        };
        const parentTagIndex = recursiveFind(tags, parentTag);// исправить это
        const response = await TagService.postTag({name: tag.name, parentId: parentTag.id, type: tag.type});

        if (parentTagIndex !== -1) {
            // tags[parentTagIndex].children.push(response.data);
            console.log(tags);
            if (parentTag.id === 1) {
                tags.push(response.data);
            } else {
                recursiveUpdate(tags, parentTag, response.data);
            }

            console.log(parentTagIndex);
            updateTags([...tags]);
            // console.log(parentTag)
        } else {
            // console.log(parentTag)
            // console.log(tags)
            updateTags([...tags, response.data]);
        }
        setTag({id: Date.now(), name: '', type: 'DEFAULT'});
    };

    const changeType = () => {
        setTag({...tag, type: 'COMPLEX'});
    };

    const drawTags = (tags, level = 0) => {
        return (
            tags.map((tag) => {
                const rows = [
                    <tr key={tag.id} style={{'--level': level}}>
                        <td>
                            <button onClick={() => setParentTag(tag)}>p</button>
                        </td>
                        <td>
                            <button onClick={() => removeTag(tag)}>d</button>
                        </td>
                        <td>{tag.name}</td>
                        {tag.type === 'COMPLEX' && <td>{tag.type}</td>}
                    </tr>,
                ];
                if (tag.children.length > 0) {
                    rows.push(drawTags(tag.children, level + 1));
                }
                return rows;
            })
        );
    };


    return (
        <div className="box">
            <div className="tagForm">
                <input value={tag.name}
                    onChange={(e) => setTag({...tag, name: e.target.value})}
                    type="text"
                    placeholder="Name"
                />

                <button onClick={addNewTag}>Create tag</button>
                <div>{parentTag.name}</div>
                <div>{tag.type}</div>
                <button onClick={() => setParentTag(rootParent)}>Set root</button>
                <button onClick={changeType}>complex</button>
            </div>

            <table>
                <tbody>
                    {
                        drawTags(tags)
                    }
                </tbody>
            </table>
        </div>
    );
}

export default CreateTag;
