import React,{useMemo,useState} from 'react';
import {ArrowUpRight,BriefcaseBusiness,Layers3,Network,Search,ShieldCheck} from 'lucide-react';
import capabilityMap from '../config/skills.json';

const sourceBase='https://github.com/brevisketley/bk-corp-club-ai-hub/blob/main/';

export default function Capabilities(){
 const [query,setQuery]=useState('');
 const [pack,setPack]=useState('All');
 const skillsById=useMemo(()=>Object.fromEntries(capabilityMap.skills.map(s=>[s.id,s])),[]);
 const visible=(skill)=> (pack==='All'||skill.pack===pack) && (!query || [skill.name,skill.summary,skill.role,skill.department].join(' ').toLowerCase().includes(query.toLowerCase()));
 const count=capabilityMap.skills.filter(visible).length;
 return <div className="capability-page">
  <div className="capability-hero">
   <div>
    <label>BK CORP CLUB · ONE-OWNER OPERATING MODEL</label>
    <h1>One owner.<br/><em>Eight operating floors.</em></h1>
    <p>One command structure coordinates specialist roles, reusable skills, projects and measurable execution. The owner stays in control of approvals and external actions.</p>
   </div>
   <div className="capability-core"><Network size={30}/><b>BK HQ</b><small>COMMAND CENTRE</small></div>
  </div>
  <div className="command-chain">
   {capabilityMap.leadership.map((person,i)=><React.Fragment key={person.id}>
    {i>0&&<span className="command-arrow">→</span>}
    <article className={person.id==='owner'?'command-node owner-node':'command-node'}>
     <small>{person.id==='owner'?'FINAL AUTHORITY':person.id==='spruce'?'COO':'AGENT MANAGER'}</small>
     <b>{person.name}</b><span>{person.role}</span>
    </article>
   </React.Fragment>)}
  </div>
  <div className="capability-stats">
   <div><b>{capabilityMap.skills.length}</b><span>Reusable skills</span></div>
   <div><b>{capabilityMap.departments.length}</b><span>Operating floors</span></div>
   <div><b>17</b><span>Registered specialist roles</span></div>
   <div><b>0</b><span>Autonomous workers enabled</span></div>
  </div>
  <div className="capability-toolbar">
   <div><label>CAPABILITY MAP</label><h2>Skills mapped to the workforce</h2><p>Reusable playbooks are assigned to existing specialist roles. They are capabilities, not autonomous agents.</p></div>
   <div className="capability-filters">
    <div className="capability-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search skills or roles"/></div>
    <select value={pack} onChange={e=>setPack(e.target.value)} aria-label="Filter skill pack"><option>All</option><option>Seed</option><option>Replica</option></select>
   </div>
  </div>
  <div className="capability-grid">
   {capabilityMap.departments.map(dept=>{
    const skills=dept.skillIds.map(id=>skillsById[id]).filter(Boolean).filter(visible);
    const hasSearch=!!query||pack!=='All';
    if(hasSearch&&!skills.length&&!dept.gap)return null;
    return <article className="capability-department" key={dept.id}>
     <div className="capability-dept-head"><div><small>OPERATING FLOOR</small><h3>{dept.name}</h3></div><span>{skills.length} skills</span></div>
     <div className="capability-roles"><BriefcaseBusiness size={13}/><span>{dept.roleIds.length?dept.roleIds.join(' · '):'No mapped specialist role'}</span></div>
     {skills.map(skill=><div className="capability-skill" key={skill.id}>
      <div className="capability-skill-title"><div><span className={skill.pack==='Seed'?'pack-seed':'pack-replica'}>{skill.pack}</span><b>{skill.name}</b></div><a href={sourceBase+skill.sourcePath} target="_blank" rel="noreferrer" aria-label={'Open '+skill.name+' skill in GitHub'}><ArrowUpRight size={14}/></a></div>
      <p>{skill.summary}</p>
      <div className="capability-skill-meta"><span>{skill.role}</span><span>{skill.mode.replaceAll('_',' ')}</span></div>
      <div className="capability-installed"><ShieldCheck size={12}/> Repository installed · runtime not connected</div>
     </div>)}
     {dept.gap&&<div className="capability-gap"><b>Capability gap</b><p>{dept.gap}</p></div>}
     {!skills.length&&!dept.gap&&<p className="capability-empty">No matching skills for this filter.</p>}
    </article>
   })}
  </div>
  <div className="capability-governance"><ShieldCheck size={17}/><div><b>Execution and approval controls remain active</b><p>Seed Closer stays draft-first. External outreach, publishing, payments, production changes and deployments require the applicable owner approval. No EA binary can be released without explicit consent. A skill being installed does not mean its worker runtime is live.</p></div></div>
  <p className="capability-foot"><Layers3 size={14}/> Showing {count} of {capabilityMap.skills.length} skills · Source: BK AI Hub project-scoped skill library</p>
 </div>;
}
