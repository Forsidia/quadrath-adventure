import { useEffect, useState } from 'react';
import { BookOpen, Compass, ScrollText } from 'lucide-react';
import { ContentViewer } from './viewer/ContentViewer';
import { Gameplay } from './game/Gameplay';
import { Campaign } from './campaign/Campaign';
import './game/game.css';

const bundleUrl='/bundles/quadrath.bundle.json';
const views=['gameplay','campaign','compendium'];
function currentView(){const view=new URLSearchParams(location.search).get('view')||'';return views.includes(view)&&view!=='gameplay'?view:location.hash?'compendium':'gameplay';}
export function App(){
  const [view,setView]=useState(currentView);
  useEffect(()=>{const update=()=>setView(currentView());window.addEventListener('popstate',update);return()=>window.removeEventListener('popstate',update);},[]);
  function navigate(next:string){const url=new URL(location.href);url.searchParams.set('view',next);if(next!=='compendium')url.hash='';history.pushState(null,'',url);setView(next);window.scrollTo({top:0});}
  return <div className={'app-with-tabs ' + (view!=='compendium'?'gameplay-active':'')}>{view==='compendium'?<ContentViewer bundleUrl={bundleUrl}/>:view==='campaign'?<Campaign bundleUrl={bundleUrl}/>:<Gameplay bundleUrl={bundleUrl} onCampaign={()=>navigate('campaign')}/>}<nav className="app-tabs" aria-label="App screens"><button aria-current={view==='gameplay'?'page':undefined} onClick={()=>navigate('gameplay')}><Compass size={19}/><span>Gameplay</span></button><button aria-current={view==='campaign'?'page':undefined} onClick={()=>navigate('campaign')}><ScrollText size={19}/><span>Campaign</span></button><button aria-current={view==='compendium'?'page':undefined} onClick={()=>navigate('compendium')}><BookOpen size={19}/><span>Compendium</span></button></nav></div>;
}
