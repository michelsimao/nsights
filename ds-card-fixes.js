/* Correções aplicadas às fichas de componente pelo navegador do design system.
   As fichas são fonte sincronizada; nada aqui altera os arquivos. */
(function(){
  function words(s){
    return s.replace(/([a-z0-9])([A-Z])/g,'$1 $2')
            .replace(/([A-Z]+)([A-Z][a-z])/g,'$1 $2')
            .replace(/\s+/g,' ').trim();
  }
  /* Títulos de story vêm do nome do export ("CoberturaECreditos"): separa em palavras. */
  function fixTitles(){
    document.querySelectorAll('.ds-cell > h4').forEach(function(h){
      if(h.dataset.fixed)return;
      h.dataset.fixed='1';
      h.textContent=words(h.textContent);
    });
  }
  /* Texto central de gauge/pie: ajusta o corpo até caber dentro do arco. */
  function fitCenters(){
    document.querySelectorAll('svg text.ns-chart-center').forEach(function(t){
      var svg=t.ownerSVGElement;if(!svg||!t.getComputedTextLength)return;
      var vb=svg.viewBox&&svg.viewBox.baseVal;
      var w=(vb&&vb.width)||svg.clientWidth;if(!w)return;
      var avail=w*0.56;                      // vão interno do arco
      var size=parseFloat(getComputedStyle(t).fontSize)||24;
      var guard=0;
      while(t.getComputedTextLength()>avail&&size>9&&guard++<40){
        size-=0.5;t.style.fontSize=size+'px';
      }
    });
  }

  /* Verificação em duas etapas: o bundle traz um único campo para o código.
     Reconstrói como seis caixas de um dígito — cola, setas e backspace incluídos. */
  function splitOtp(){
    document.querySelectorAll('input#mfa-code, input[autocomplete="one-time-code"]').forEach(function(src){
      if(src.dataset.otpDone||src.closest('.otp-group'))return;   // nunca reprocessa o que já é grupo
      src.dataset.otpDone='1';
      var seed=(src.value||src.defaultValue||'').replace(/\D/g,'').slice(0,6);
      var group=document.createElement('div');
      group.className='otp-group';
      group.setAttribute('role','group');
      group.setAttribute('aria-label','Código de verificação de seis dígitos');
      var boxes=[];
      for(var i=0;i<6;i++){
        var b=document.createElement('input');
        b.type='text';b.inputMode='numeric';b.maxLength=1;b.autocomplete=i===0?'one-time-code':'off';
        b.id='mfa-code-'+(i+1);b.name='code'+(i+1);b.required=true;b.dataset.otpDone='1';
        b.setAttribute('aria-label','Dígito '+(i+1)+' de 6');
        b.value=seed[i]||'';
        if(b.value)b.dataset.filled='1';
        group.appendChild(b);boxes.push(b);
      }
      function focusAt(n){var t=boxes[Math.max(0,Math.min(5,n))];if(t){t.focus();t.select()}}
      function mark(b){if(b.value)b.dataset.filled='1';else delete b.dataset.filled}
      boxes.forEach(function(b,i){
        b.addEventListener('input',function(){
          var v=b.value.replace(/\D/g,'');
          b.value=v.slice(-1);mark(b);
          if(b.value&&i<5)focusAt(i+1);
        });
        b.addEventListener('keydown',function(e){
          if(e.key==='Backspace'&&!b.value&&i>0){e.preventDefault();boxes[i-1].value='';mark(boxes[i-1]);focusAt(i-1)}
          else if(e.key==='ArrowLeft'&&i>0){e.preventDefault();focusAt(i-1)}
          else if(e.key==='ArrowRight'&&i<5){e.preventDefault();focusAt(i+1)}
        });
        b.addEventListener('focus',function(){b.select()});
        b.addEventListener('paste',function(e){
          e.preventDefault();
          var d=((e.clipboardData||window.clipboardData).getData('text')||'').replace(/\D/g,'');
          if(!d)return;
          for(var k=0;k<d.length&&i+k<6;k++){boxes[i+k].value=d[k];mark(boxes[i+k])}
          focusAt(Math.min(5,i+d.length));
        });
      });
      /* Rótulo do Field aponta para a primeira caixa. */
      var lbl=src.id?document.querySelector('label[for="'+src.id+'"]'):null;
      if(lbl)lbl.setAttribute('for','mfa-code-1');
      /* Código incompleto no envio: grupo em estado de erro e foco na primeira lacuna. */
      var form=src.closest('form');
      if(form)form.addEventListener('submit',function(e){
        var gap=boxes.findIndex(function(x){return !x.value});
        if(gap>-1){e.preventDefault();group.setAttribute('data-invalid','');focusAt(gap)}
        else group.removeAttribute('data-invalid');
      });
      boxes.forEach(function(b){b.addEventListener('input',function(){group.removeAttribute('data-invalid')})});
      src.replaceWith(group);
    });
  }
  /* As correções escrevem no DOM, e o observer vigia o DOM: sem trégua isso é um
     laço. Aqui o observer é desligado durante a escrita e as rajadas de mutação
     do React são fundidas em um quadro. */
  var observer,scheduled=false;
  function apply(){try{fixTitles();fitCenters();splitOtp()}catch(e){}}
  function run(){
    if(observer)observer.disconnect();
    apply();
    if(observer)observer.observe(document.documentElement,{childList:true,subtree:true});
  }
  function schedule(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(function(){scheduled=false;run()});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  run();
  /* Os cards montam React depois do load: observa e reaplica. */
  observer=new MutationObserver(schedule);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  window.addEventListener('load',schedule);
})();
