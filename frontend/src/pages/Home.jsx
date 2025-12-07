import React, {useEffect, useState} from 'react';
import { list } from '../api/client';
import { Link } from 'react-router-dom';


export default function Home(){
const [articles, setArticles] = useState([]);
useEffect(()=>{ list().then(setArticles).catch(console.error); },[]);
return (
<div>
<ul>
{articles.map(a => (
<li key={a.id}><Link to={`/article/${a.id}`}>{a.title}</Link></li>
))}
</ul>
</div>
);
}