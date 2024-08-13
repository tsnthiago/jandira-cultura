import { useState } from 'react';

const AdminForm = ({ onSave }: { onSave: (newPoint: any) => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoId, setVideoId] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const newPoint = {
            title,
            description,
            videoId,
            tags: tags.split(',').map(tag => tag.trim())
        };
        onSave(newPoint);
        setTitle('');
        setDescription('');
        setVideoId('');
        setTags('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
                <label>Video ID:</label>
                <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
            </div>
            <div>
                <label>Tags:</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default AdminForm;
