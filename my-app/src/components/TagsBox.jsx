import './TagsBox.css';
import React from 'react';

function TagsBox(props) {
    const deleteClick = (e, tag) => {
        e.stopPropagation();
        props.remove(tag);
    };

    return (
        <div>
            {props.tags.map((tag) =>
                props.deleteIcon ?
                    (<div className="tag" key={tag.id}
                        onClick={() => props.onTagClick(tag)}
                        onMouseOver={() => props.mouseOver(tag)}
                        onMouseOut={() => props.mouseOut(tag)}>
                        <div>{tag.name}</div>
                        {tag.isHovering && props.deleteIcon && (
                            <div className="x" onClick={(e) => deleteClick(e, tag)}>
                                x
                            </div>
                        )}
                    </div>) :
                    (<div className="tag" key={tag.id}
                        onClick={() => props.remove(tag)}>
                        <div>{tag.name}</div>
                    </div>),
            )}
        </div>
    );
}

export default TagsBox;
