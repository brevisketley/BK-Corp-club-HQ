const DATA_API=import.meta.env.VITE_NEON_DATA_API_URL;
export async function dataApi(authClient,path,{method='GET',body,prefer='return=representation'}={}){
 if(!DATA_API)throw new Error('HQ Data API is not configured');
 const token=await authClient.getJWTToken?.();
 if(!token)throw new Error('Owner session token unavailable');
 const headers={Authorization:'Bearer '+token,Accept:'application/json'};
 if(body!==undefined)headers['Content-Type']='application/json';
 if(prefer)headers.Prefer=prefer;
 const response=await fetch(DATA_API+'/'+path,{method,headers,body:body===undefined?undefined:JSON.stringify(body)});
 const raw=await response.text();
 let data=null;try{data=raw?JSON.parse(raw):null;}catch{data=raw;}
 if(!response.ok)throw new Error(data?.message||data?.details||data?.hint||('HQ database request failed ('+response.status+')'));
 return data;
}
export async function recordActivity(authClient,action,entityType,entityId,details={}){
 try{await dataApi(authClient,'hq_activity',{method:'POST',body:{actor:'HQ Owner',action,entity_type:entityType,entity_id:String(entityId||''),details}});}catch(e){console.error('HQ audit event could not be written',e);}
}
