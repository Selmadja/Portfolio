(function(){
  // rulers
  var rt=document.getElementById('rt'),rl=document.getElementById('rl');
  function rulers(){
    rt.querySelectorAll('span').forEach(function(n){n.remove()});
    rl.querySelectorAll('span').forEach(function(n){n.remove()});
    for(var x=0;x<innerWidth-32;x+=64){var s=document.createElement('span');s.style.left=(32+x)+'px';s.textContent=x;rt.appendChild(s)}
    for(var y=0;y<innerHeight-32;y+=64){var t=document.createElement('span');t.style.top=(32+y+14)+'px';t.textContent=y;rl.appendChild(t)}
  }
  rulers();addEventListener('resize',rulers);
  // coordinate readout (follows the pointer; never blocks clicks)
  var rd=document.getElementById('read');
  addEventListener('pointermove',function(e){
    if(e.pointerType==='touch')return;
    var x=Math.max(0,Math.round((e.clientX-32)/8)*8),y=Math.max(0,Math.round((e.clientY+scrollY-32)/8)*8);
    rd.textContent='x '+x+' · y '+y;
  });
  // embeds: fill data-embed on each .embed with a real URL to show it inside the page
  document.querySelectorAll('.embed').forEach(function(box){
    var src=(box.getAttribute('data-embed')||'').trim();
    if(!src||/^YOUR_/.test(src))return;
    var f=document.createElement('iframe');
    var h3=box.closest('.card')&&box.closest('.card').querySelector('h3');
    f.title=h3?h3.textContent:'Embedded preview';
    f.src=src;f.loading='lazy';f.allowFullscreen=true;
    f.setAttribute('allow','autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen');
    box.appendChild(f);box.classList.add('live');
  });
  // website screenshot: use website-screenshot.png when it exists, else keep the drawn thumbnail
  document.querySelectorAll('.shot').forEach(function(img){
    function ok(){var p=img.nextElementSibling;if(p)p.style.display='none'}
    function bad(){img.remove()}
    if(img.complete){img.naturalWidth?ok():bad()}
    else{img.addEventListener('load',ok);img.addEventListener('error',bad)}
  });
})();