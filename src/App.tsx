import { useEffect, useState } from 'react';
import { BookOpen, Compass } from 'lucide-react';
import { ContentViewer } from './viewer/ContentViewer';
import { Gameplay } from './game/Gameplay';
import './game/game.css';

const bundleUrl='/bundles/quadrath.bundle.json';
function currentView(){return new URLSearchParams(location.search).get('view')==='compendium'||Boolean(location.hash)?'compendium':'gameplay';}
export function App(){
  const [view,setView]=useState(currentView);
  useEffect(()=>{const update=()=>setView(currentView());window.addEventListener('popstate',update);return()=>window.removeEventListener('popstate',update);},[]);
  function navigate(next:string){const url=new URL(location.href);url.searchParams.set('view',next);if(next==='gameplay')url.hash='';history.pushState(null,'',url);setView(next);window.scrollTo({top:0});}
  return <div className={'app-with-tabs ' + (view==='gameplay'?'gameplay-active':'')}>{view==='compendium'?<ContentViewer bundleUrl={bundleUrl}/>:<Gameplay bundleUrl={bundleUrl}/>}<nav className="app-tabs" aria-label="App screens"><button aria-current={view==='gameplay'?'page':undefined} onClick={()=>navigate('gameplay')}><Compass size={19}/><span>Gameplay</span></button><button aria-current={view==='compendium'?'page':undefined} onClick={()=>navigate('compendium')}><BookOpen size={19}/><span>Compendium</span></button></nav></div>;
}
