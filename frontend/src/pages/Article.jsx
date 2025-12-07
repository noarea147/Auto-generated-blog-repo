import React, {useEffect, useState} from 'react';
import { get } from '../api/client';
import { useParams, Link } from 'react-router-dom';


export default function Article(){
const { id } = useParams();
const [a, setA] = useState(null);
useEffect(()=>{ get(id).then(setA).catch(console.error); },[id]);
if(!a) return <div>Loading...</div>;
return (
<div>
<Link to="/">← back</Link>
<h2>{a.title}</h2>
<p style={{ whiteSpace: 'pre-wrap' }}>{a.body}</p>
</div>
);
}