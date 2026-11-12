import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const app=express();
const port=process.env.PORT||10000;
const origin=process.env.HQ_ORIGIN||'https://bk-corp-club-hq.onrender.com';
const authBase=process.env.NEON_AUTH_URL;
const jwksUrl=process.env.NEON_JWKS_URL;
if(!process.env.DATABASE_URL||!authBase||!jwksUrl) throw new Error('Missing required HQ server configuration');
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:5});
const JWKS=createRemoteJWKSet(new URL(jwksUrl));
const allowedProjects=new Set(['ea-marketing','saas-licensing','ai-nft','autonomon','revenue-engine','cash-ecosystem','capital-intelligence','review-system','website-services','youtube-growth','agent-hq','client-operations']);
app.use(cors({origin,credentials:true,methods:['GET','PUT','OPTIONS'],allowedHeaders:['Authorization','Content-Type']}));
app.use(express.json({limit:'32kb'}));
async function ownerOnly(req,res,next){
 try{
  const h=req.headers.authorization||'';
  if(!h.startsWith('Bearer ')) return res.status(401).json({error:'Authentication required'});
  const {payload}=await jwtVerify(h.slice(7),JWKS);
  const email=String(payload.email||payload.user?.email||'').toLowerCase();
  const subject=String(payload.sub||payload.userId||'');
  if(subject!=='efad7efe-6b40-48f2-9a5a-91af6609d25f'&&email!=='brevisketley@gmail.com') return res.status(403).json({error:'HQ owner access required'});
  req.ownerEmail=email;next();
 }catch(e){return res.status(401).json({error:'Invalid or expired HQ session'});}
}
app.get('/health',async(_req,res)=>{try{await pool.query('SELECT 1');res.json({ok:true,service:'bk-corp-club-hq-api',database:'connected'});}catch(e){res.status(503).json({ok:false,database:'unavailable'});}});
app.get('/api/portfolio',ownerOnly,async(req,res)=>{try{const r=await pool.query('SELECT active_project_ids FROM hq_owner_settings WHERE owner_email=$1',[req.ownerEmail]);res.json({activeProjectIds:r.rows[0]?.active_project_ids||[]});}catch(e){res.status(500).json({error:'Unable to load HQ portfolio'});}});
app.put('/api/portfolio',ownerOnly,async(req,res)=>{try{const ids=req.body?.activeProjectIds;if(!Array.isArray(ids)||ids.length>50||ids.some(x=>typeof x!=='string'||!allowedProjects.has(x)))return res.status(400).json({error:'Invalid project selection'});const r=await pool.query('INSERT INTO hq_owner_settings(owner_email,active_project_ids,updated_at) VALUES($1,$2,now()) ON CONFLICT(owner_email) DO UPDATE SET active_project_ids=EXCLUDED.active_project_ids,updated_at=now() RETURNING active_project_ids',[req.ownerEmail,ids]);await pool.query('INSERT INTO hq_activity(actor,action,entity_type,entity_id,details) VALUES($1,$2,$3,$4,$5)',[req.ownerEmail,'portfolio_updated','portfolio','owner',{activeProjectIds:ids}]);res.json({activeProjectIds:r.rows[0].active_project_ids});}catch(e){res.status(500).json({error:'Unable to save HQ portfolio'});}});
app.listen(port,'0.0.0.0',()=>process.stdout.write('BK HQ API listening on '+port+'\n'));
