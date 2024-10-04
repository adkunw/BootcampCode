/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { commentsData } from './data';

const CommentItem = ({ author, avatar, date, text }) => {
    const commentStyle = {
        display: 'flex',
        marginBottom: '20px',
        alignItems: 'flex-start',

        // display: 'flex',
        // alignItems: 'flex-start',
        // margin: '5px 0', // Mengurangi jarak antar komentar
    };

    const avatarStyle = {
        marginRight: '10px',
        // flexShrink: 0,
        // width: '40px',
        // height: '40px',
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: 'column'
    };

    const authorStyle = {
        fontWeight: 'bold',
        color: '#000'
    };

    const metadataStyle = {
        fontSize: '0.85em',
        color: '#888'
    };

    const textStyle = {
        marginTop: '5px',
        textAlign: 'left',
    };

    return (
        <div style={commentStyle}>
            <a className="avatar" style={avatarStyle}>
                <img src={avatar} alt={`${author} Avatar`} />
            </a>
            <div className="content" style={contentStyle}>
                <div>
                    <span className="author" style={authorStyle}>{author}</span>
                    <span className="date" style={metadataStyle}> {date}</span>
                </div>
                <div className="text" style={textStyle}>{text}</div>
            </div>
        </div>
    );
};

const Comments = () => {
    return (
        <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            {commentsData.map((comment, index) => (
                <CommentItem
                    key={index}
                    author={comment.author}
                    avatar={comment.avatar}
                    date={comment.date}
                    text={comment.text}
                />
            ))}
        </div>
    );
};

export default Comments;