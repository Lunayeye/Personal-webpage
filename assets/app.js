
function navTo(id){var el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}

(function(){
  var canvas=document.getElementById('hero-canvas');if(!canvas)return;
  if(window.innerWidth<768 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches))return;
  var ctx;try{ctx=canvas.getContext('2d');}catch(e){return;}if(!ctx || !window.requestAnimationFrame)return;
  var W,H,mouse={x:-999,y:-999};
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  window.addEventListener('mousemove',function(e){var r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  var COLORS=['rgba(99,102,241,','rgba(139,92,246,','rgba(167,139,250,','rgba(236,72,153,'];
  var particles=[];
  for(var i=0;i<45;i++)particles.push({x:Math.random()*1000,y:Math.random()*1000,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.4,color:COLORS[Math.floor(Math.random()*COLORS.length)],alpha:Math.random()*.6+.2,pulse:Math.random()*Math.PI*2,ps:.008+Math.random()*.012});
  function draw(){
    ctx.clearRect(0,0,W,H);
    var dark=document.documentElement.getAttribute('data-theme')==='dark';
    var g=ctx.createRadialGradient(W*.2,H*.3,0,W*.2,H*.3,W*.45);g.addColorStop(0,'rgba(99,102,241,'+(dark?.09:.04)+')');g.addColorStop(1,'rgba(99,102,241,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    particles.forEach(function(p,i){
      p.x+=p.vx;p.y+=p.vy;p.pulse+=p.ps;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      var dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);if(d<100){p.x+=dx*(100-d)/100*.04;p.y+=dy*(100-d)/100*.04;}
      var a=p.alpha*(.7+.3*Math.sin(p.pulse));
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=p.color+a+')';ctx.fill();
      for(var j=i+1;j<particles.length;j++){var q=particles[j],dd=Math.sqrt(Math.pow(p.x-q.x,2)+Math.pow(p.y-q.y,2));if(dd<90){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(99,102,241,'+(0.1*(1-dd/90))+')';ctx.lineWidth=.5;ctx.stroke();}}
    });
    requestAnimationFrame(draw);
  }
  try{draw();}catch(e){canvas.style.display='none';}
})();

var themeBtn=document.getElementById('theme-btn');
var saved='light';
try{saved=localStorage.getItem('theme')==='dark'?'dark':'light';}catch(e){}
document.documentElement.setAttribute('data-theme',saved);
themeBtn.textContent=saved==='dark'?'☀️':'🌙';
themeBtn.addEventListener('click',function(){var cur=document.documentElement.getAttribute('data-theme');var next=cur==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',next);try{localStorage.setItem('theme',next);}catch(e){}themeBtn.textContent=next==='dark'?'☀️':'🌙';});

var lang='zh';var langBtn=document.getElementById('lang-btn');
function applyLang(){Array.prototype.forEach.call(document.querySelectorAll('[data-zh]'),function(el){var v=el.getAttribute('data-'+lang);if(v!==null)el.innerHTML=v;});langBtn.textContent=lang==='zh'?'English':'中文';document.documentElement.lang=lang==='zh'?'zh':'en';}
langBtn.addEventListener('click',function(){lang=lang==='zh'?'en':'zh';applyLang();});

// Content stays visible even when scripts or browser APIs are unavailable.


const tarotData={
  t1:{icon:'🏋️',roman:'I',title:{zh:'PHYSICAL',en:'PHYSICAL'},
    desc:{
      zh:'规律健身是我的生活方式。\n我深信对身体的精准管理是培养极致专注力的基石。\n在汗水中打磨韧性，在专注中沉淀价值。<img src="assets/images/2aa37bfac242ae1a.jpg" class="tm-img" alt="健身">',
      en:'Regular training is my lifestyle.\nPrecise physical management is the foundation of extreme focus.\nForging resilience through sweat, distilling value through concentration.'
    },keywords:{zh:[],en:[]}},
  t2:{icon:'📖',roman:'II',title:{zh:'MINDSET',en:'MINDSET'},
    desc:{
      zh:'我时常对世界抱有轻微的迷茫，忍不住去追问那些庞大而抽象的命题：\n生命的意义何在？爱是否只是人类的集体想象？理想国究竟有无可能？正因如此，心理学与哲学成了我生活的理论基石。\n\n所以我喜欢学习心理学，是为了拆解自身每一个行为的前因后果。正如弗洛伊德所言，那些我以为的自由选择，其实早有来处；\n\n所以我喜欢学习哲学，是为了在宏大问题没有标准答案时，依然能找到一种站得住脚的方式，建立自己的思考模式。<img src="assets/images/69fe54bbca01f856.jpg" class="tm-img" alt="读书"><img src="assets/images/624f3136a264cc38.jpg" class="tm-img" alt="读书2">',
      en:'I often feel a mild confusion about the world — unable to stop asking enormous questions: What is the meaning of life? Is love merely a collective imagination?\n\nPsychology: to deconstruct the origins of my every behavior. As Freud noted, what I think of as free choices often has earlier roots.\n\nPhilosophy: to stand firm when grand questions have no standard answers — to build my own thinking framework.'
    },keywords:{zh:[],en:[]}},
  t3:{icon:'⚙️',roman:'III',title:{zh:'METHODOLOGY',en:'METHODOLOGY'},
    desc:{
      zh:'我曾花不少时间复盘，为什么自己能在不同领域幸运地拿到一些还不错的反馈——\n无论是学业上的专业第一、大二拿到腾讯offer、大三参加顶会，还是操盘的新媒体账号都能实现飞轮增长，亦或是三个月内跑通创业的PMF、带项目拿到融资。\n\n客观得出的结论是：这并非因为我有什么过人的天赋，而是得益于一种思维习惯。我深受马斯克"第一性原理"启发：\n在面对新问题时，尽量不去盲目依赖既有经验，而是努力拆解出事物的底层逻辑，然后再去重塑流程。',
      en:'I have spent time reflecting on why I have received decent results across different domains — top of department, Tencent offer sophomore year, top conference paper as junior, viral accounts, PMF in three months.\n\nThe honest conclusion: not exceptional talent, but a thinking habit. Deeply inspired by Musk\'s first principles: when facing a new problem, deconstruct the underlying logic — then rebuild the process.'
    },keywords:{zh:[],en:[]}},
  t4:{icon:'🎭',roman:'IV',title:{zh:'AESTHETICS',en:'AESTHETICS'},
    desc:{
      zh:'现实世界追求效率，难免会剥离掉生活的质感；\n而音乐剧，是我用来抵抗平庸、安放审美的精神场域。\n\n我迷恋剧场里那种没有算法与数据裹挟的纯粹。看着舞台上的人唱着哭、跳着爱，用极致的舞台语言将复杂的悲欢推向顶峰。我着迷于这种笨拙却充满张力的艺术表达，以及一群人在黑暗中同时屏住呼吸的静谧。\n\n我相信道家的"无用之美"。\n我相信，一个人对世界的感知不仅需要冷峻的理性，更需要保留一份去欣赏那些不实用、不高效的极致热情的品位。这构成了我丰盈且完整的底色。<img src="assets/images/3ec5c46f1ce2b0da.jpg" class="tm-img" alt="音乐剧">',
      en:'The real world demands efficiency — inevitably stripping away the texture of living.\nMusicals are my spiritual space to resist mediocrity and anchor aesthetics.\n\nI am drawn to the purity of the theatre — unfiltered by algorithms or data. Watching performers cry while singing, love while dancing, pushing joy and sorrow to their peak.\n\nI believe in the Taoist concept of the beauty of the useless. A person needs not only cold rationality, but also the taste to appreciate things that are impractical yet extraordinary.'
    },keywords:{zh:[],en:[]}},
  t5:{icon:'🌱',roman:'V',title:{zh:'VISION',en:'VISION'},
    desc:{
      zh:'对于未来，我有一张非常清晰的时间表。\n\n眼下，我更愿意利用好现有的试错成本，多去不同的场域里泡一泡，去感知、去碰撞，找到那个真正让我兴奋的赛道。\n\n之后，我会踏踏实实地走入职场，找一个值得长期奉献的地方。我准备好用十年的时间去沉淀自己：去读懂产业运作的逻辑，去建立坚实的信任关系，去磨砺直击本质的判断力。去认识真正厉害的人，也让自己成长为那样的人。\n\n而十年后的终局，是我自己的事业。无论那是一个深度挖掘金融逻辑的财经IP，一家探索人机交互的AI公司，还是一间金融机构，它们都将指向同一个核心：立足于商业、内容与前沿技术的交汇处。无论载体如何，我都将做那个坚持创造长期价值的人。',
      en:'For the future, I have a very clear timeline.\n\nRight now, I want to make the most of the room I have to experiment — exploring different fields, finding the track that truly excites me.\n\nThen, commit fully to a workplace worth long-term dedication. I am prepared to spend a decade building: understanding industries, forging trust, sharpening judgment — meeting genuinely excellent people, and becoming one myself.\n\nThe endgame, a decade later, is my own venture. Whether a finance IP, an AI company, or a financial institution — all pointing to the same core: standing at the intersection of business, content, and frontier technology, creating long-term value.'
    },keywords:{zh:[],en:[]}}
};
const modalData={
  r1:{title:{zh:'AI虚拟网红透明度与信任机制',en:'AI Influencer Transparency & Trust'},emoji:'📄',custom:'r1',
    venue:{zh:'上海交大-IAMCR新兴媒体论坛收录 · 第一学生作者',en:'SJTU-IAMCR 2026 · 1st Student Author'},
    venueColor:'rgba(99,102,241,.1)',venueTxt:'#6366F1',
    desc:{zh:'',en:''},tags:['智能传播','虚拟网红','实验设计','人机交互','SSCI投稿中'],links:[]},
  r2:{title:{zh:'艺术化表达对健康公益广告效果的影响',en:'Artistic Expression in Health PSA'},emoji:'📄',custom:'r2',
    venue:{zh:'AEJMC 2026年会收录 · 第一作者',en:'AEJMC 2026 · 1st Author'},
    venueColor:'rgba(16,185,129,.1)',venueTxt:'#059669',
    desc:{zh:'',en:''},tags:['健康传播','ELM模型','叙事框架','N=452'],links:[]},
  r3:{title:{zh:'广深两地家用智能健康设备市场研究',en:'Smart Health Device Market Research'},emoji:'📊',custom:'r3',
    venue:{zh:'省级大创项目 · 项目负责人',en:'Provincial Innovation Project · PI'},
    venueColor:'rgba(245,158,11,.1)',venueTxt:'#D97706',
    desc:{zh:'',en:''},tags:['正大杯省一等奖','市场现状','决策路径','混合研究','N=1192'],links:[]},
  r4:{image:'assets/images/1b42be03dfec6655.png',title:{zh:'国家社科青年基金项目 · 研究助理',en:'NSSFC Youth Project · RA'},emoji:'🔬',
    venue:{zh:'国家社会科学基金青年项目（24CXW041）',en:'NSSFC Youth Project (24CXW041)'},
    venueColor:'rgba(139,92,246,.1)',venueTxt:'#7C3AED',
    desc:{zh:'课题：人与生成式人工智能交互下的信任度曲线与实践效应研究\n\n参与工作\n• 参与组会20+次，负责文献整理与前沿综述\n• 协助完成多项人机交互实验，操作眼动仪、EEG设备\n• 参与数据分析、报告撰写等产出工作',
          en:'Topic: Trust Curve in Human-GenAI Interaction\n\n• 20+ team meetings, literature review\n• Assisted experiments using eye-tracking, EEG\n• Data analysis and report writing'},
    tags:['国家社科青年基金','人机交互','人机信任','眼动仪','EEG脑电'],links:[]},
  w1:{custom:'w1',title:{zh:'南方财经全媒体集团 · 金融资管研究员',en:'Southern Finance · Research Analyst'},emoji:'💹',
    venue:{zh:'21金融圈工作室 · 2026.01—2026.04',en:'21 Finance Studio · 2026.01—2026.04'},
    venueColor:'rgba(245,158,11,.1)',venueTxt:'#D97706',
    desc:{zh:'财经采编\n署名刊发8篇行业原创稿件，覆盖宏观经济、银行理财、跨境汇率、地方政府债务、资管策略。\n\n内容运营\n重构公众号专题内容矩阵，策划多场视频号财经直播。\n\n数据增长\nPython爬虫+文本分析完成全号历史推文复盘，双公众号累计涨粉5w+，日均阅读+30%。',
          en:'8 bylined articles. Restructured WeChat content matrix. +50k followers, +30% daily reads.'},
    tags:['财经采编','内容运营','Python爬虫','文本分析'],links:[]},
  w2:{custom:'w2',title:{zh:'广东省广告集团 · 广东大学生广告节媒介组负责人',en:'Guangdong Ad Festival · Media Lead'},emoji:'🎡',
    venue:{zh:'广东省广告集团 · 2025.09—2026.04',en:'Guangdong Ad Group · 2025.09—2026.04'},
    venueColor:'rgba(236,72,153,.1)',venueTxt:'#DB2777',
    desc:{zh:'制定赛事全周期内容策略，管理团队，累计产出138篇官方推文，赛事账号粉丝+8000。',
          en:'Full-cycle content strategy. 138 official posts, +8k followers.'},
    tags:['内容策划','团队管理','品牌传播'],links:[]},
  w3:{custom:'w3',title:{zh:'腾讯 · 集团市场与公关部',en:'Tencent · Market & PR'},emoji:'🐧',
    venue:{zh:'腾讯 · 2025.01—2025.06',en:'Tencent · 2025.01—2025.06'},
    venueColor:'rgba(99,102,241,.1)',venueTxt:'#6366F1',
    desc:{zh:'参与第一期「鹅创营」，担任小组组长，带领小组完成多个公关与营销方案策划。小组获评「优秀小组」，个人获得腾讯集团市场与公关部暑期实习 Offer（4/40，10%）。\n\n参与下一期线上「鹅创营」活动运营，负责跟进「每周趋势洞察」板块。制定内容评估标准，筛选200余名营员提交的高质量趋势观点。',
          en:'Led a team in the first Goose Camp to develop PR and marketing proposals. The group was named an Outstanding Team; received a summer internship offer from Tencent Market & PR (4/40, 10%).\n\nSupported operations for the next online camp, following up on Weekly Trend Insights, defining content evaluation criteria, and selecting high-quality trend insights submitted by over 200 participants.'},
    tags:['腾讯','公关策划','项目运营'],links:[]},
  w4:{custom:'w4',title:{zh:'纯真星球文化传媒 · 新媒体运营',en:'Innocence Planet · New Media'},emoji:'📱',
    venue:{zh:'纯真星球文化传媒 · 2024.01—2024.06',en:'Innocence Planet · 2024.01—2024.06'},
    venueColor:'rgba(16,185,129,.1)',venueTxt:'#059669',
    desc:{zh:'「果敢计划」小红书账号负责人，带领8人团队，粉丝从2000+增长至3280+（增幅60%），阅读互动+50%。',
          en:'Xiaohongshu account lead. 8-person team. Followers +60%, interactions +50%.'},
    tags:['小红书','竞品分析','内容运营','团队管理'],links:[]},
  a1:{"custom":"a1","title":{"zh":"深圳萌动森林＆深圳梦橱科技 · AI陪伴硬件","en":"Mengdong Forest & Mengchu Technology · AI Companion Hardware"},"emoji":"🤖","venue":{"zh":"深圳萌动森林＆深圳梦橱科技 · 2025.06—2025.10","en":"Mengdong Forest & Mengchu Technology · 2025.06—2025.10"},"venueColor":"rgba(236,72,153,.1)","venueTxt":"#DB2777","desc":{"zh":"主导PRD全周期：市场调研→用户画像→PRD撰写→研发落地。\n技术选型：智谱GLM + 火山引擎TTS。\n全网粉丝3w+，单品销量1000+，营收突破六位数，净利率70%，PMF验证完成。","en":"Led full-cycle PRD. Tech: GLM + Volcano Engine TTS. 6-figure revenue, 70% net margin, PMF validated."},"tags":["AI陪伴","PRD全周期","智谱GLM","火山引擎","PMF"],"links":[{"text":"梦橱科技 · 公司官网","url":"https://mengchutech.com/"}]},
  a2:{custom:'a2',title:{zh:'AIGC数字人矩阵 · 新媒体操盘手',en:'AIGC Digital Avatar Matrix'},emoji:'🎬',
    venue:{zh:'茉莉茉莉等账号 · 2025.03—2025.12',en:'Mojimoji etc. · 2025.03—2025.12'},
    venueColor:'rgba(245,158,11,.1)',venueTxt:'#D97706',
    desc:{zh:'搭建「文案-生成-包装」标准化工作流，生产耗时从5h→30min（效率+100%）。\n一周内观看量+29452%，孵化4个爆款账号，粉丝1.6w+，总浏览550w+，对接50+商业合作。',
          en:'AIGC pipeline: 5h→30min. +29452% views in one week. 4 viral accounts, 16k+ followers, 50+ brand deals.'},
    tags:['AIGC工作流','数字人','A/B测试','矩阵运营'],
    links:[{text:'▶ 三九胃泰',url:'https://www.bilibili.com/video/BV1JvqbBkESX'},{text:'▶ 泡泡玛特',url:'https://www.bilibili.com/video/BV1cvqbBkEFL'}]},
  a3:{"custom":"a3","title":{"zh":"AIGC品牌广告创作 · 学院奖与大广赛全国获奖","en":"AIGC Brand Films · National Advertising Awards"},"emoji":"🎥","venue":{"zh":"学院奖全国金奖 · 大广赛全国二等奖、三等奖","en":"Academy Awards Gold · National College Ad Competition 2nd & 3rd Prizes"},"venueColor":"rgba(245,158,11,.1)","venueTxt":"#D97706","desc":{"zh":"结合产品卖点、社会情绪与用户痛点提炼传播概念；以毓美丽为例，提出“我存在我美丽”的悦己主张。搭建完整AIGC工作流，横评7款AI工具。\n毓美丽《我存在我美丽》→学院奖全国金奖\n三九胃泰《被爱的器官才能陪你打持久战》→大广赛全国二等奖\n泡泡玛特《Nyota漫游云端》→大广赛全国三等奖","en":"Developed campaign concepts from brand benefits, social sentiment and audience needs. Built an AIGC production workflow and evaluated 7 AI tools. Yumeili: Academy Awards Gold; Sanjiu: National 2nd Prize; Pop Mart: National 3rd Prize."},"tags":["学院奖全国金奖","大广赛全国二等奖","大广赛全国三等奖","品牌洞察","AIGC视频"],"links":[{"text":"▶ 毓美丽","url":"https://www.bilibili.com/video/BV1kYKh6kE7a?vd_source=def42dece5352279e8fbe093ba414c6c"},{"text":"▶ 三九胃泰","url":"https://www.bilibili.com/video/BV1JvqbBkESX"},{"text":"▶ 泡泡玛特","url":"https://www.bilibili.com/video/BV1cvqbBkEFL"}]},
  a4:{"custom":"a4","title":{"zh":"白牌家居增长实验 · 广告投放与优化","en":"Home Goods Growth Lab · Ad Testing & Optimization"},"emoji":"🛒","venue":{"zh":"计算广告课程实战 · 舜飞科技带教","en":"Computational Advertising Practicum"},"desc":{"zh":"两轮真实投放，累计92次转化，整体转化成本降低12.2%。","en":"Two live ad tests, 92 conversions, 12.2% lower cost per conversion."},"tags":["选品验证","广告投放","策略复盘"],"links":[]}
};

const R1_IMGS={ai:'assets/images/72eac55e8cb081bc.png',real:'assets/images/eca9c84d0fd8b643.jpg',c1:'assets/images/f41334e6c72878a3.png',c2:'assets/images/17ead185e7cef9cb.png',c3:'assets/images/78095bfcb52a5222.png'};
const R2_IMGS={na1:'assets/images/fe9d1dc4ec663f67.jpg',c1:'assets/images/d2df70b894006c5c.png',c7:'assets/images/d1edaec353ec5553.png',c9:'assets/images/b84398a4fab1f25b.png',bw1:'assets/images/d7a0f31c3be50701.png',bw7:'assets/images/018f5464bf885136.png',bw9:'assets/images/70a08e9e616957e5.png',narr:'assets/images/a01d4420cb7f2b85.png',nnarr:'assets/images/ccdb06efe3a0bba9.png',expo_w:'assets/images/e21da7d1a9b887ea.png',expo_c:'assets/images/9761c3183668a8d9.png',clocks_g:'assets/images/fd4f359e81df0cc0.png'};
const R3_IMGS={room:'assets/images/b1027b020392c863.png',light:'assets/images/6fdc374be6a27063.png',eye:'assets/images/67e163d9bb9f7cc6.png'};

function buildR1Modal(){
  document.getElementById('modal-title').textContent=lang==='zh'?'AI虚拟网红透明度与信任机制':'AI Influencer Transparency & Trust';
  var body=document.getElementById('modal-body');
  body.className='r1-modal-body';
  body.innerHTML=`
  <div class="r1-section">
    <div class="r1-sec-label">互动实验 · 先做再看</div>
    <div class="r1-q">如果你在小红书刷到这两位博主，你更愿意和哪个互动？</div>
    <div class="r1-quiz">
      <div class="r1-choice" id="r1-choice-a" onclick="r1Pick('a')">
        <div class="r1-choice-img-wrap"><img src="${R1_IMGS.ai}" alt="博主A" style="object-position:center top;"></div>
        <div class="r1-choice-label" id="r1-label-a">博主 A</div>
      </div>
      <div class="r1-choice" id="r1-choice-b" onclick="r1Pick('b')">
        <div class="r1-choice-img-wrap"><img src="${R1_IMGS.real}" alt="博主B" style="object-position:center 18%;"></div>
        <div class="r1-choice-label" id="r1-label-b">博主 B</div>
      </div>
    </div>
    <div class="r1-reveal-box" id="r1-reveal">
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
        <span class="r1-reveal-badge rb-ai">🤖 博主 A 是 AI 生成</span>
        <span class="r1-reveal-badge rb-real">👤 博主 B 是真实人物</span>
      </div>
      <strong>现在你知道了——再想一想：</strong>
    </div>
    <div id="r1-q2-wrap" style="display:none;">
      <div class="r1-q">知道身份后，你现在更愿意和谁互动？</div>
      <div class="r1-quiz">
        <div class="r1-choice" id="r1-choice-a2" onclick="r1Pick2('a')">
          <div class="r1-choice-img-wrap"><img src="${R1_IMGS.ai}" alt="博主A" style="object-position:center top;"></div>
          <div class="r1-choice-label" id="r1-label-a2">博主 A（AI）</div>
        </div>
        <div class="r1-choice" id="r1-choice-b2" onclick="r1Pick2('b')">
          <div class="r1-choice-img-wrap"><img src="${R1_IMGS.real}" alt="博主B" style="object-position:center 18%;"></div>
          <div class="r1-choice-label" id="r1-label-b2">博主 B（真人）</div>
        </div>
      </div>
    </div>
    <div class="r1-reveal-box" id="r1-result">
      <strong>这正是这项研究想研究的：</strong><br>拟人化程度和AI身份披露对用户互动意愿的影响是什么？
      <button class="r1-continue-btn" onclick="r1ShowNext()">了解研究缘起 ↓</button>
    </div>
  </div>
  <div class="r1-section" id="r1-origin" style="display:none;">
    <div class="r1-sec-label">研究缘起 · 来自真实恶评</div>
    <div class="r1-block-body" style="margin-bottom:14px;">运营AIGC数字人账号期间，账号数据亮眼，却同时收到了这些私信——是什么激发了用户的负面情绪？是没有事先声明使用了AI工具，还是激发了大家的<strong>恐怖谷效应</strong>？</div>
    <div class="r1-comments">
      <div class="r1-comment"><img src="${R1_IMGS.c1}" alt="恶评1"></div>
      <div class="r1-comment"><img src="${R1_IMGS.c2}" alt="恶评2"></div>
      <div class="r1-comment"><img src="${R1_IMGS.c3}" alt="恶评3"></div>
    </div>
    <button class="r1-continue-btn" onclick="r1ShowResearch()" style="margin-top:12px;">查看研究内容 ↓</button>
  </div>
  <div id="r1-research-wrap" style="display:none;">
    <div class="r1-section"><div class="r1-sec-label">研究背景</div><div class="r1-block-body">AI虚拟网红身份披露后引发信任危机。现有研究缺乏对拟人化程度与身份披露<strong>交互效应</strong>的系统考察。</div></div>
    <div class="r1-section"><div class="r1-sec-label">研究方法</div><div class="r1-block-body">两项 <strong>2（拟人化：低/高）×2（披露：前/后）</strong>混合实验（总有效N=149），方差分析 + 中介效应检验 + AI归因编码分组。</div></div>
    <div class="r1-section"><div class="r1-sec-label">核心发现</div>
      <div class="r1-finding"><div class="r1-finding-label">Finding 01</div><div class="r1-finding-text">披露前高拟人化显著提升互动意愿，披露后优势<strong style="color:#fde68a">完全消失</strong></div></div>
      <div class="r1-path-grid" style="margin-top:8px;">
        <div class="r1-path"><div class="r1-path-title">🤖 初始归为AI</div><div class="r1-path-body">通过<strong>感知人性度下降</strong>完全中介</div></div>
        <div class="r1-path"><div class="r1-path-title">👤 初始归为真人</div><div class="r1-path-body">通过<strong>感知吸引力下降</strong>完全中介</div></div>
      </div>
      <div class="r1-finding" style="margin-top:8px;background:var(--surface2);border:0.5px solid var(--border);">
        <div class="r1-finding-label" style="color:var(--accent);">Finding 02</div>
        <div class="r1-finding-text" style="color:var(--text);">用户<strong style="color:var(--accent)">初始AI归因</strong>决定中介路径，AI标签独立于内容客观质量存在</div>
      </div>
    </div>
    <div class="r1-section"><div class="r1-sec-label">研究价值</div>
      <div class="r1-block-body">明确AI身份披露的边界条件与双路径心理机制。为平台虚拟网红拟人化设计、AI身份披露合规提供实证依据。</div>
      <div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap;">
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(99,102,241,.1);color:#6366F1;border:0.5px solid rgba(99,102,241,.2);">上海交大-IAMCR 2026</span>
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(16,185,129,.1);color:#059669;border:0.5px solid rgba(16,185,129,.2);">第一学生作者</span>
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(139,92,246,.1);color:#7C3AED;border:0.5px solid rgba(139,92,246,.2);">SSCI投稿中</span>
      </div>
    </div>
  </div>`;
  window._r1Step=0;
}
function r1Pick(choice){
  if(window._r1Step!==0)return;window._r1Pick1=choice;window._r1Step=1;
  var a=document.getElementById('r1-choice-a'),b=document.getElementById('r1-choice-b');
  var la=document.getElementById('r1-label-a'),lb=document.getElementById('r1-label-b');
  if(choice==='a'){a.classList.add('selected-yes');b.classList.add('selected-no');la.textContent='✓ 你选了A';lb.textContent='— 跳过B';}
  else{b.classList.add('selected-yes');a.classList.add('selected-no');lb.textContent='✓ 你选了B';la.textContent='— 跳过A';}
  setTimeout(function(){
    var rev=document.getElementById('r1-reveal');rev.classList.add('show');
    rev.scrollIntoView({behavior:'smooth',block:'nearest'});
    document.getElementById('r1-q2-wrap').style.display='block';window._r1Step=2;
  },500);
}
function r1Pick2(choice){
  if(window._r1Step!==2)return;window._r1Step=3;
  var a2=document.getElementById('r1-choice-a2'),b2=document.getElementById('r1-choice-b2');
  if(choice==='a'){a2.classList.add('selected-yes');b2.classList.add('selected-no');}
  else{b2.classList.add('selected-yes');a2.classList.add('selected-no');}
  setTimeout(function(){var res=document.getElementById('r1-result');res.classList.add('show');res.scrollIntoView({behavior:'smooth',block:'nearest'});},400);
}
function r1ShowNext(){var el=document.getElementById('r1-origin');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function r1ShowResearch(){var el=document.getElementById('r1-research-wrap');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function buildR2Modal(){
  document.getElementById('modal-title').textContent=lang==='zh'?'艺术化表达对健康公益广告效果的影响':'Artistic Expression in Health PSA';
  var body=document.getElementById('modal-body');body.className='r1-modal-body';
  body.innerHTML=`
  <div class="r1-section">
    <div class="r1-sec-label">互动测试 · 先感受再研究</div>
    <div class="r1-q">面对阿尔茨海默症公益广告，你更愿意看哪种？</div>
    <div class="r2-art-grid">
      <div class="r2-art-opt" id="r2-opt-art" onclick="r2Pick('art')">
        <div class="img-wrap"><img src="${R2_IMGS.c1}" alt="艺术化"></div>
        <div class="r2-art-opt-label">A 组 · 艺术化表达</div>
      </div>
      <div class="r2-art-opt" id="r2-opt-nonart" onclick="r2Pick('nonart')">
        <div class="img-wrap"><img src="${R2_IMGS.na1}" alt="非艺术"></div>
        <div class="r2-art-opt-label">B 组 · 信息化表达</div>
      </div>
    </div>
    <div class="r1-reveal-box" id="r2-reveal1">A组艺术化（叙事+彩色），B组信息化（医学事实+图表）。<strong>艺术化表达真的更有说服力吗？</strong>
      <button class="r1-continue-btn" onclick="r2ShowStep2()">再做一个测试 ↓</button>
    </div>
  </div>
  <!-- STEP 2: Narrative vs Non-narrative TEXT -->
  <div class="r1-section" id="r2-step2" style="display:none;">
    <div class="r1-sec-label">互动测试 · 第二轮 · 叙事 vs 非叙事</div>
    <div class="r1-q">同一个公益广告，两种不同的文案框架——哪个更让你想采取行动？</div>
    <div class="r2-text-compare">
      <div class="r2-text-side r2-side-narr" id="r2-ts-narr" onclick="r2VoteText('narr')">
        <div class="r2-text-tag">📖 叙事版</div>
        <div class="r2-text-thumb"><img src="${R2_IMGS.c1}" alt="叙事配图"></div>
        <div class="r2-text-content">陈爷爷曾是一名钟表匠，双手能修复世间最精密的时钟。<br><br>九年前，他被诊断为阿尔茨海默症。时间——他最熟悉的老友——开始反噬他。<br><br>第一年，他画的钟只是数字轻微倾斜；到第七年，指针成了迷宫的入口；第九年，那个钟坍缩为一道无法闭合的弧线。<br><br><em>他在寻找那个已不存在的发条，试图修复这段已经彻底停摆的时光。</em></div>
        <div class="r2-text-footer r2-footer-narr">↑ 这版更打动我</div>
      </div>
      <div class="r2-text-side r2-side-nonnarr" id="r2-ts-nonnarr" onclick="r2VoteText('nonnarr')">
        <div class="r2-text-tag">📋 非叙事版</div>
        <div class="r2-text-thumb"><img src="${R2_IMGS.bw1}" alt="非叙事配图"></div>
        <div class="r2-text-content">阿尔茨海默症是以β-淀粉样蛋白沉积和tau蛋白过度磷酸化为核心病理特征的进行性神经退行性疾病。<br><br>画钟测试（CDT）是国际公认的最有效筛查工具之一，通过评估视空间结构、执行功能、数字记忆等认知域敏感反映认知损害。<br><br>病程1年：结构完整，认知损害较轻。7年：显著结构混乱，中度受损。9年：已无法完成基本构图。</div>
        <div class="r2-text-footer r2-footer-nonnarr">↑ 这版更打动我</div>
      </div>
    </div>
    <div class="r1-reveal-box" id="r2-reveal2">
      <strong>研究发现有点反常识：</strong>叙事版通过<strong>缩短心理距离</strong>正向提升行为意向；但在阿尔茨海默症这类<strong>高熟知度疾病</strong>情境下，彩色+叙事反而通过激活<strong>积极认知反应</strong>产生负向间接效应——太美了，反而忘了行动。
      <button class="r1-continue-btn" onclick="r2ShowOrigin()">看研究缘起 ↓</button>
    </div>
  </div>
  <div class="r1-section" id="r2-origin" style="display:none;">
    <div class="r1-sec-label">研究缘起 · 外婆与一支广告</div>
    <div class="r1-block-body" style="margin-bottom:14px;">外婆确诊阿尔茨海默症之后，对我越来越冷漠，记不住我的名字。直到看到《迷失的时钟》这个公益广告，我才真正理解了她的世界。<strong>她不是不爱我了，是她的时钟停了。</strong></div>
    <div class="r2-expose-imgs"><img src="${R2_IMGS.expo_w}" alt="迷失的时钟展览"><img src="${R2_IMGS.expo_c}" alt="迷失的时钟展览近景"></div>
    <div class="r2-expose-full"><img src="${R2_IMGS.clocks_g}" alt="各患者画的时钟"></div>
    <div class="r1-block-body" style="margin-top:10px;">这支广告让我共情了这种疾病，也让我开始思考：<strong>艺术化表达到底是如何影响行为意向的？</strong></div>
    <button class="r1-continue-btn" onclick="r2ShowResearch()">查看研究内容 ↓</button>
  </div>
  <div id="r2-research-wrap" style="display:none;">
    <div class="r1-section"><div class="r1-sec-label">研究背景</div><div class="r1-block-body">本研究将艺术化表达分解为<strong>叙事框架</strong>与<strong>色彩呈现</strong>两个维度，基于ELM进行系统考察。</div></div>
    <div class="r1-section"><div class="r1-sec-label">研究方法</div><div class="r1-block-body"><strong>实验一</strong>（N=171，阿尔茨海默症）：2×2设计，探索叙事与色彩对行为意向的中介路径。<br><br><strong>实验二</strong>（N=145，三种疾病情境）：引入<strong>心理距离</strong>作为新中介，检验推广性。<br><br><strong>实验三</strong>（N=136，艺术化 vs 非艺术化对比）：引入控制组，检验感知感官价值的完全中介效应。</div></div>
    <div class="r1-section"><div class="r1-sec-label">核心发现</div>
      <div class="r1-finding"><div class="r1-finding-label">三项实验一致</div><div class="r1-finding-text">艺术化表达对行为意向<strong style="color:#fde68a">均无显著直接效应</strong>，但通过情境化间接路径发挥作用</div></div>
      <div class="r1-path-grid" style="margin-top:8px;">
        <div class="r1-path"><div class="r1-path-title">📖 叙事框架 → 心理距离↓</div><div class="r1-path-body">缩短心理距离，提升行为意向（β=0.126, 95%CI [0.030, 0.241]）</div></div>
        <div class="r1-path"><div class="r1-path-title">🎨 艺术化表达 → 感知感官价值↑</div><div class="r1-path-body">完全中介行为意向（β=0.318, 95%CI [0.141, 0.519]）</div></div>
      </div>
      <div class="r1-finding" style="margin-top:8px;background:var(--surface2);border:0.5px solid var(--border);">
        <div class="r1-finding-label" style="color:#EF4444;">反常识发现</div>
        <div class="r1-finding-text" style="color:var(--text);">高熟知度疾病情境下，彩色+叙事通过激活<strong style="color:#EF4444;">积极认知反应</strong>产生负向间接效应（β=−0.239）</div>
      </div>
    </div>
    <div class="r1-section"><div class="r1-sec-label">研究价值</div>
      <div class="r1-block-body"><strong>理论：</strong>延伸ELM模型，验证中心与边缘双路径共存，引入心理距离新中介。<br><strong>实践：</strong>健康公益广告应避免一味追求艺术效果；叙事框架比色彩更稳定地促进行为意向。</div>
      <div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap;">
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(16,185,129,.1);color:#059669;border:0.5px solid rgba(16,185,129,.2);">AEJMC 2026</span>
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(99,102,241,.1);color:#6366F1;border:0.5px solid rgba(99,102,241,.2);">第一作者</span>
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(245,158,11,.1);color:#D97706;border:0.5px solid rgba(245,158,11,.2);">N=452 · 三项实验</span>
      </div>
    </div>
  </div>`;
  window._r2step=0;window._r2voted=false;
}
function r2Pick(choice){
  if(window._r2step!==0)return;window._r2step=1;
  var a=document.getElementById('r2-opt-art'),b=document.getElementById('r2-opt-nonart');
  if(choice==='art'){a.classList.add('chosen');b.classList.add('unchosen');}
  else{b.classList.add('chosen');a.classList.add('unchosen');}
  setTimeout(function(){var rev=document.getElementById('r2-reveal1');rev.classList.add('show');rev.scrollIntoView({behavior:'smooth',block:'nearest'});},400);
}
function r2ShowStep2(){var el=document.getElementById('r2-step2');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function r2VoteText(choice){
  if(window._r2voted)return;window._r2voted=true;
  var narr=document.getElementById('r2-ts-narr'),nnarr=document.getElementById('r2-ts-nonnarr');
  if(choice==='narr'){narr.classList.add('r2-text-chosen');nnarr.classList.add('r2-text-unchosen');}
  else{nnarr.classList.add('r2-text-chosen');narr.classList.add('r2-text-unchosen');}
  setTimeout(function(){var rev=document.getElementById('r2-reveal2');rev.classList.add('show');rev.scrollIntoView({behavior:'smooth',block:'nearest'});},400);
}
function r2ShowOrigin(){var el=document.getElementById('r2-origin');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function r2ShowResearch(){var el=document.getElementById('r2-research-wrap');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function buildR3Modal(){
  document.getElementById('modal-title').textContent=lang==='zh'?'广深两地家用智能健康设备市场研究':'Smart Health Device Market Research';
  var body=document.getElementById('modal-body');body.className='r1-modal-body';
  body.innerHTML=`
  <div class="r1-section">
    <div class="r1-sec-label">互动测试 · 你会买吗？</div>
    <div class="r1-q">这是一款家用智能健康设备——频谱治疗房，售价 ¥98,500。看完介绍，回答两个问题。</div>
    <div class="r3-product-card">
      <div class="r3-product-img"><img src="${R3_IMGS.room}" alt="频谱治疗房"></div>
      <div class="r3-product-info"><div class="r3-product-name">频谱治疗房</div><div class="r3-product-price">¥98,500</div><div class="r3-product-desc">11个专利频谱发生器·360°环绕照射·人体工学座椅·双屏操控<br>主要功效：促进血液循环、改善代谢、缓解骨关节炎、颈椎病等</div></div>
    </div>
    <div class="r3-vote-group"><div class="r3-vote-q">Q1：你会购买这款产品吗？</div><div class="r3-vote-opts"><button class="r3-vbtn" id="r3-q1-y" onclick="r3Vote(1,'y')">会买</button><button class="r3-vbtn" id="r3-q1-n" onclick="r3Vote(1,'n')">不会买</button><button class="r3-vbtn" id="r3-q1-m" onclick="r3Vote(1,'m')">可能考虑</button></div></div>
    <div class="r3-vote-group" id="r3-q2-wrap" style="display:none;"><div class="r3-vote-q">Q2：如果买了，你觉得自己能坚持使用吗？</div><div class="r3-vote-opts"><button class="r3-vbtn" id="r3-q2-y" onclick="r3Vote(2,'y')">能坚持</button><button class="r3-vbtn" id="r3-q2-n" onclick="r3Vote(2,'n')">可能用几次就搁置</button><button class="r3-vbtn" id="r3-q2-m" onclick="r3Vote(2,'m')">不确定</button></div></div>
    <div class="r1-reveal-box" id="r3-reveal1"><strong>你的判断和研究结论高度吻合——</strong><br>智能健康设备了解的人少、买了也难坚持使用，症结在哪里？
      <button class="r1-continue-btn" onclick="r3ShowOrigin()">看研究缘起 ↓</button>
    </div>
  </div>
  <div class="r1-section" id="r3-origin" style="display:none;">
    <div class="r1-sec-label">研究缘起 · 家里那些用了一两次的设备</div>
    <div class="r1-block-body" style="margin-bottom:14px;">家里长辈买了很多类似的智能健康设备——频谱仪、眼部按摩仪……几乎都在用了一两次之后就落灰了。我开始好奇：为什么了解的人少？买了又为什么无法坚持用？</div>
    <div class="r3-family-items">
      <div class="r3-family-item"><img src="${R3_IMGS.room}" alt="频谱治疗房"><div class="r3-family-item-name">频谱治疗房</div></div>
      <div class="r3-family-item"><img src="${R3_IMGS.light}" alt="频谱仪"><div class="r3-family-item-name">频谱仪</div></div>
      <div class="r3-family-item"><img src="${R3_IMGS.eye}" alt="眼部按摩仪"><div class="r3-family-item-name">眼部按摩仪</div></div>
    </div>
    <button class="r1-continue-btn" onclick="r3ShowResearch()">查看研究内容 ↓</button>
  </div>
  <div id="r3-research-wrap" style="display:none;">
    <div class="r1-section"><div class="r1-sec-label">研究规模</div>
      <div class="r3-stat-grid"><div class="r3-stat"><div class="r3-stat-n">35</div><div class="r3-stat-l">深度访谈</div></div><div class="r3-stat"><div class="r3-stat-n">4万+</div><div class="r3-stat-l">文本挖掘</div></div><div class="r3-stat"><div class="r3-stat-n">1192</div><div class="r3-stat-l">有效问卷</div></div><div class="r3-stat"><div class="r3-stat-n">3次</div><div class="r3-stat-l">专家座谈</div></div></div>
    </div>
    <div class="r1-section"><div class="r1-sec-label">市场现状核心发现</div><div class="r1-block-body">① 市场品类三级阶梯分布，智能穿戴普及率89.7%<br>② 千元以下产品占一半以上，高端市场具有潜力<br>③ 新用户占比大，使用习惯有待提升<br>④ 效果与性价比是核心关注因素<br>⑤ 续航能力差是最普遍使用痛点</div></div>
    <div class="r1-section"><div class="r1-sec-label">用户聚类画像</div>
      <div class="r3-cluster-row">
        <div class="r3-cluster"><div class="r3-cluster-title">🏥 低端市场 · 中高龄被动保健派</div><div class="r3-cluster-body">多为子女购买赠送，操作复杂导致停用率高，适老化设计严重缺失。</div></div>
        <div class="r3-cluster"><div class="r3-cluster-title">⚡ 中端市场 · 新锐性价比先锋（消费主力）</div><div class="r3-cluster-body">有主动购买意愿，但缺乏持续激励，效果感知不明显时易停用。</div></div>
        <div class="r3-cluster"><div class="r3-cluster-title">💎 高端市场 · 高端健康追求者</div><div class="r3-cluster-body">平均购入价格最高，健康意识强，使用黏性最高。</div></div>
      </div>
    </div>
    <div class="r1-section"><div class="r1-sec-label">研究价值</div>
      <div class="r1-block-body">首次将<strong>个人消费观念</strong>纳入智能健康设备购买决策模型，验证UTAUT2在该领域的适用性；构建本土化用户购买决策路径。</div>
      <div style="margin-top:10px;display:flex;gap:7px;flex-wrap:wrap;">
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(245,158,11,.1);color:#D97706;border:0.5px solid rgba(245,158,11,.2);">正大杯广东省一等奖</span>
        <span style="font-size:11px;padding:4px 10px;border-radius:99px;background:rgba(16,185,129,.1);color:#059669;border:0.5px solid rgba(16,185,129,.2);">N=1192 · 混合研究</span>
      </div>
    </div>
  </div>`;
  window._r3q1done=false;window._r3q2done=false;
}
function r3Vote(q,choice){
  if(q===1){if(window._r3q1done)return;window._r3q1done=true;['r3-q1-y','r3-q1-n','r3-q1-m'].forEach(function(id){var btn=document.getElementById(id);btn.classList.add(id.split('-').pop()===choice?'picked':'picked-no');});setTimeout(function(){document.getElementById('r3-q2-wrap').style.display='block';document.getElementById('r3-q2-wrap').scrollIntoView({behavior:'smooth',block:'nearest'});},400);}
  else{if(window._r3q2done)return;window._r3q2done=true;['r3-q2-y','r3-q2-n','r3-q2-m'].forEach(function(id){var btn=document.getElementById(id);btn.classList.add(id.split('-').pop()===choice?'picked':'picked-no');});setTimeout(function(){var rev=document.getElementById('r3-reveal1');rev.classList.add('show');rev.scrollIntoView({behavior:'smooth',block:'nearest'});},400);}
}
function r3ShowOrigin(){var el=document.getElementById('r3-origin');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}
function r3ShowResearch(){var el=document.getElementById('r3-research-wrap');el.style.display='block';setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},50);}


/* ── WORK/AIGC MODAL HTML MAP ── */
const DETAIL_HTML = {
  w1: '<div class="md-wrap"><div class="md-left"><div class="md-logo-wrap">💹</div><div class="md-company">南方财经<small>Southern Finance Media</small></div><div class="md-dept">全媒体集团 · 21金融圈工作室</div><div class="md-period-badge">2026.01 — 2026.04</div><div class="md-metrics"><div class="md-metric"><div class="md-metric-n">8篇</div><div class="md-metric-l">署名原创财经稿件</div></div><div class="md-metric"><div class="md-metric-n">5w+</div><div class="md-metric-l">双公众号累计涨粉</div></div><div class="md-metric"><div class="md-metric-n">+30%</div><div class="md-metric-l">日均阅读流量提升</div></div></div></div><div class="md-right"><div class="md-block"><div class="md-block-title"><div class="md-block-icon">✍️</div>财经采编</div><div class="md-bullets"><div class="md-bullet">署名刊发 <strong>8篇</strong> 行业原创稿件，覆盖宏观经济、银行理财、跨境汇率、地方政府债务、资管策略等核心赛道</div><div class="md-bullet">全程独立完成选题策划、数据挖掘、采写发布全链路</div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">📊</div>内容运营</div><div class="md-bullets"><div class="md-bullet">重构公众号专题矩阵：新增《机警理财日报》《21财小圈》普惠理财专题，保留B/G端专业壁垒</div><div class="md-bullet">配套上线资管行业报告、金融合规月报垂直专题，策划执行多场视频号财经直播</div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">🐍</div>数据驱动</div><div class="md-bullets"><div class="md-bullet">Python爬虫 + 文本分析完成全号历史推文复盘，输出内部运营优化报告</div><div class="md-bullet">双公众号累计涨粉 <strong>5w+</strong>，日均阅读流量提升 <strong>30%</strong></div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">📰</div>署名作品</div><ol class="md-work-links"><li><a href="https://mp.weixin.qq.com/s/D1BgttOLrH3X0B342V89Tg" target="_blank" rel="noopener noreferrer"><span>外资机构解读政府工作报告：后续聚焦四大投资主线</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://m.21jingji.com/article/20260305/herald/6232fcfafc7bd59d117de70686dc9303.html" target="_blank" rel="noopener noreferrer"><span>理财公司规模普增 含权产品成为新宠</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/BZ76_Bh9CuMGpN-5AZJBQQ" target="_blank" rel="noopener noreferrer"><span>监管关注达标率！33万亿银行理财正修改业绩比较基准</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/MsKTbJXNFOb5H9jt0GuKVQ" target="_blank" rel="noopener noreferrer"><span>香港、香港、还是香港！外资行财资战略重心南移</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/hOgM7cIjIdRgj0C94LGWvA" target="_blank" rel="noopener noreferrer"><span>专访广开首席连平：“去美元化”浪潮下黄金或长期高位震荡</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://m.21jingji.com/article/20260113/herald/379542812d3c87b633c6426f6336cbc5.html" target="_blank" rel="noopener noreferrer"><span>浦发银行2025年净利增长10.52% 资产规模突破10万亿</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/BRqVV_8LKXKF2CREYpbMAw" target="_blank" rel="noopener noreferrer"><span>美元理财不香了！去年8成美元理财收益不抵汇率损失</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/6myzIM_ANDIMqj-Eo_7PjA" target="_blank" rel="noopener noreferrer"><span>地方化债成绩单出炉：多地超额完成任务，甘肃、辽宁退平台逾八成</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li></ol></div></div></div>',

  w2: '<div class="md-wrap"><div class="md-left"><div class="md-logo-wrap">🎡</div><div class="md-company">广东省广告集团<small>Guangdong Ad Group</small></div><div class="md-dept">广东大学生广告节 · 媒介组负责人</div><div class="md-period-badge">2025.09 — 2026.04</div><div class="md-metrics"><div class="md-metric"><div class="md-metric-n">138</div><div class="md-metric-l">篇官方推文统筹产出</div></div><div class="md-metric"><div class="md-metric-n">8000+</div><div class="md-metric-l">赛事官方账号涨粉</div></div></div></div><div class="md-right"><div class="md-block"><div class="md-block-title"><div class="md-block-icon">🗂️</div>内容全案策划</div><div class="md-bullets"><div class="md-bullet">围绕校园赛事传播全周期，制定招新宣发、校园大使招募、活动开幕仪式等节点的公众号全域内容策略</div><div class="md-bullet">累计统筹产出 <strong>138篇</strong> 官方推文，覆盖赛事全程各关键节点</div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">👥</div>团队统筹管理</div><div class="md-bullets"><div class="md-bullet">拆解项目传播目标，精细化分配组内任务，协同文案、设计、宣发多方</div><div class="md-bullet">搭建标准化内容交付流程，赛事官方账号粉丝增长 <strong>8000+</strong></div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">💡</div>创意策划专题</div><ol class="md-work-links"><li><a href="https://mp.weixin.qq.com/s/euWutNwWuKa4cW-yZJTITw" target="_blank" rel="noopener noreferrer"><span>第五届粤港澳大湾区国际广告节校园大使招新啦！</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/_PDrz_yK4Zp36-GOtWY6Mw" target="_blank" rel="noopener noreferrer"><span>广告圈那些事儿（1）| 这种天赋原来不是人人都有吗?</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/nx5FOR0EOrCTZQumH34zCA" target="_blank" rel="noopener noreferrer"><span>广告圈那些事儿（2） | 广告人保持“体面”，在第99稿之后</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/W_m4Smt2IJDoixScM_wykw" target="_blank" rel="noopener noreferrer"><span>广告圈那些事儿（3）| 欢迎登陆广告人的第一视角</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/OGs0L8KI_MUTT2Wt8uT3Mg" target="_blank" rel="noopener noreferrer"><span>广告圈那些事儿（4） | 土味广告鉴赏！广告人“懂”设计，更“懂”人心！</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li><li><a href="https://mp.weixin.qq.com/s/SHvesPUTC9Uq8lQq5vywIA" target="_blank" rel="noopener noreferrer"><span>广告圈那些事儿（5）| 广告史上的12月，藏着四个穿越时光的经典</span><span class="md-work-arrow" aria-hidden="true">↗</span></a></li></ol></div></div></div>',

  w3: '<div class="md-wrap"><div class="md-left"><div class="md-logo-wrap">🐧</div><div class="md-company">腾讯 Tencent<small>集团市场与公关部</small></div><div class="md-period-badge">2025.01 — 2025.06</div><div class="md-metrics"><div class="md-metric accent-gold-border"><div class="md-metric-n accent-gold">10%</div><div class="md-metric-l">Offer 获得比例<br>获暑期实习 Offer（4/40）</div></div><div class="md-metric"><div class="md-metric-n plain">优秀小组</div><div class="md-metric-l">担任组长，带领小组获评</div></div><div class="md-metric"><div class="md-metric-n">200+ 营员</div><div class="md-metric-l">参与筛选营员提交的趋势观点</div></div></div></div><div class="md-right"><div class="md-block"><div class="md-block-title"><div class="md-block-icon">💡</div>公关与营销方案策划</div><div class="md-bullets"><div class="md-bullet">参与第一期<strong>「鹅创营」</strong>，担任小组组长，带领小组完成多个<strong>公关与营销方案策划</strong>。</div><div class="md-bullet">小组获评<strong>「优秀小组」</strong>，个人获得腾讯集团市场与公关部<strong>暑期实习 Offer</strong>。</div></div></div><div class="md-block"><div class="md-block-title"><div class="md-block-icon">📋</div>线上活动运营</div><div class="md-bullets"><div class="md-bullet">参与下一期线上「鹅创营」活动运营，负责跟进<strong>「每周趋势洞察」</strong>板块。</div><div class="md-bullet">制定<strong>内容评估标准</strong>，筛选 <strong>200 余名营员</strong>提交的高质量趋势观点。</div></div></div></div><section class="tencent-gallery" aria-label="鹅创营活动记录"><div class="md-block-title"><div class="md-block-icon">📷</div>鹅创营 · 活动记录</div><div class="tencent-gallery-grid"><figure class="tencent-photo tencent-photo-main"><img src="assets/images/c6f7163ff42a622f.jpg" alt="鹅创营小组方案展示与现场交流" loading="lazy" width="1706" height="1279"><figcaption>方案展示与现场交流</figcaption></figure><figure class="tencent-photo"><img src="assets/images/4bc6ff1efdec371c.jpg" alt="佩戴鹅创营证件的个人活动留影" loading="lazy" width="1080" height="1396"><figcaption>活动留影</figcaption></figure><figure class="tencent-photo"><img src="assets/images/f56c8588acd5ffc2.jpg" alt="手持课程完结证书的结营合影" loading="lazy" width="1706" height="1279"><figcaption>结营合影</figcaption></figure></div></section></div>',

  w4: "<article class=\"ip-case\"><header class=\"ip-hero\"><div class=\"ip-hero-copy\"><div class=\"ip-eyebrow\">内容策略 · 团队协作 · 账号运营</div><h2>纯真星球<span>Innocence Planet</span></h2><p>「果敢计划」小红书账号负责人</p><div class=\"ip-period\">2024.01 — 2024.06</div></div><div class=\"ip-orbit\" aria-hidden=\"true\"><div class=\"ip-orbit-core\"></div><div class=\"ip-orbit-ring\"></div><i></i><b></b></div></header><section class=\"ip-results\" aria-label=\"运营成果\"><div class=\"ip-stat\"><span class=\"ip-stat-label\">账号粉丝增幅</span><strong>60%<small>+</small></strong><span class=\"ip-stat-note\">粉丝增长超 60%</span></div><div class=\"ip-stat\"><span class=\"ip-stat-label\">阅读互动提升</span><strong><small>≈</small>50%</strong><span class=\"ip-stat-note\">内容表现提升</span></div><div class=\"ip-stat\"><span class=\"ip-stat-label\">内容团队管理</span><strong>8<small>人</small></strong><span class=\"ip-stat-note\">协作与内容交付</span></div></section><section class=\"ip-growth\" aria-label=\"粉丝规模变化\"><div class=\"ip-growth-heading\"><span class=\"ip-section-label\">账号成长</span><h3>从内容打磨，到用户积累</h3></div><div class=\"ip-growth-values\"><div><span>起始粉丝</span><strong>2000<small>+</small></strong></div><span class=\"ip-growth-arrow\" aria-hidden=\"true\">⟶</span><div><span>增长至</span><strong>3280<small>+</small></strong></div></div></section><section class=\"ip-work\" aria-label=\"主要工作\"><div class=\"ip-work-heading\"><span class=\"ip-section-label\">主要工作</span><span class=\"ip-work-subtitle\">分析策略与内容执行</span></div><div class=\"ip-work-grid\"><article class=\"ip-work-card\"><div class=\"ip-card-top\"><span class=\"ip-card-number\">01</span><span class=\"ip-card-category\">策略分析</span></div><h3>竞品生态分析</h3><p>系统拆解垂直领域竞品账号的爆款内容逻辑、商业定价体系与流量转化路径。</p><div class=\"ip-card-output\"><span>工作产出</span><p>输出差异化运营分析报告，为账号策略迭代提供数据依据。</p></div></article><article class=\"ip-work-card\"><div class=\"ip-card-top\"><span class=\"ip-card-number\">02</span><span class=\"ip-card-category\">内容执行</span></div><h3>团队与内容管理</h3><p>带领 <strong>8 人内容团队</strong>，搭建全链路标准化生产体系，把控内容出品质量与更新效率。</p><div class=\"ip-card-output\"><span>负责账号</span><p>「果敢计划」小红书账号，统筹团队协作与内容生产。</p></div></article></div></section></article>",

  a1: "<div class=\"md-wrap companion-case\"><div class=\"md-left\"><div class=\"md-logo-wrap\">🤖</div><div class=\"md-company companion-company\"><span>深圳萌动森林</span><span class=\"companion-amp\">＆</span><span>深圳梦橱科技</span><small>AI Companion Hardware</small></div><div class=\"md-dept\">联合创始人 · 产品负责人</div><a class=\"companion-website\" href=\"https://mengchutech.com/\" target=\"_blank\" rel=\"noopener noreferrer\"><span>梦橱科技 · 公司官网</span><span aria-hidden=\"true\">↗</span><small>mengchutech.com</small></a><div class=\"md-period-badge\">2025.06 — 2025.10</div><div class=\"md-metrics\"><div class=\"md-metric\"><div class=\"md-metric-n\">六位数</div><div class=\"md-metric-l\">三个月营收突破</div></div><div class=\"md-metric\"><div class=\"md-metric-n\">70%</div><div class=\"md-metric-l\">净利润率</div></div><div class=\"md-metric\"><div class=\"md-metric-n\">3w+</div><div class=\"md-metric-l\">全网粉丝</div></div><div class=\"md-metric\"><div class=\"md-metric-n plain\">PMF ✓</div><div class=\"md-metric-l\">跑通产品市场契合</div></div></div></div><div class=\"md-right\"><div class=\"md-block\"><div class=\"md-block-title\"><div class=\"md-block-icon\">📋</div>产品设计全周期</div><div class=\"md-bullets\"><div class=\"md-bullet\">主导面向乙女人群的AI语音陪伴硬件及配套小程序 <strong>PRD 全周期管理</strong>：市场调研 → 用户画像 → PRD撰写 → 研发落地 → 推广</div><div class=\"md-bullet\">技术选型：语音合成选 <strong>火山引擎</strong>（延迟可控）；LLM 横评豆包、月之暗面、minimax 后选 <strong>智谱GLM</strong>（情感表现最优）</div></div></div><div class=\"md-block\"><div class=\"md-block-title\"><div class=\"md-block-icon\">📈</div>用户获取与商业化</div><div class=\"md-bullets\"><div class=\"md-bullet\">主导六个账号内容分发与私域引流，全网粉丝 <strong>3w+</strong>，单品销量 <strong>1000+</strong></div><div class=\"md-bullet\">营收突破六位数，净利润率 <strong>70%</strong>；低成本 MVP 验证 PMF，制作 BP 与多家 VC / FA 展开沟通</div></div></div><section class=\"project-resource companion-bp\" aria-labelledby=\"companion-bp-title\"><div class=\"project-resource-copy\"><span class=\"project-resource-kicker\">BUSINESS PLAN / 项目 BP</span><h3 id=\"companion-bp-title\">从产品构想到商业实践</h3><h4>梦橱科技 · 项目商业计划书</h4><p>关于产品与商业化的更多思考，整理在这份项目 BP 中。欢迎扫码了解。</p></div><figure class=\"project-resource-qr\"><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大项目 BP二维码\"><img src=\"assets/images/f35c2f38a98d7763.png\" alt=\"项目 BP二维码\" width=\"500\" height=\"500\" loading=\"lazy\"></button><figcaption>扫码查看项目 BP<span>点击二维码可放大</span></figcaption></figure></section></div><section class=\"companion-product\" aria-label=\"AI陪伴硬件产品展示\"><div class=\"md-block-title\"><div class=\"md-block-icon\">🖼️</div>产品展示</div><figure><img src=\"assets/images/94f4f37160996d12.jpg\" alt=\"与梦对话机产品介绍：基础版与Pro版AI陪伴硬件\" loading=\"lazy\"><figcaption>与梦对话机 · 基础版与 Pro 版</figcaption></figure></section></div>",

  a2: "<article class=\"mx-case\"><header class=\"mx-hero\"><div class=\"mx-eyebrow\">AIGC CONTENT STUDIO</div><div class=\"mx-hero-line\"><h2>从内容生产，到账号增长</h2><span class=\"mx-period\">2025.03 — 2025.12</span></div><p>新媒体操盘手 · 情侣 / 情感 / 美妆多赛道内容探索</p><div class=\"mx-hero-tags\"><span>4 个孵化账号</span><span>AIGC 标准化生产</span><span>商业广告合作</span></div></header><section class=\"mx-metrics\" aria-label=\"项目成果\"><div><strong>800w<small>+</small></strong><span>累计内容浏览量</span></div><div><strong>1.6w<small>+</small></strong><span>累计账号粉丝</span></div><div><strong>50<small>+</small></strong><span>商业广告合作</span></div></section><div class=\"mx-method-grid\"><section class=\"mx-method\"><div class=\"mx-section-label\">01 / 内容生产</div><h3>AIGC工作流搭建</h3><div class=\"mx-pipeline\"><span>AI 文案</span><b>→</b><span>数字人生成</span><b>→</b><span>剪辑包装</span></div><p>整合 AI 生文案、数字人合成及自动化剪辑工具，搭建标准化生产流程。</p><div class=\"mx-efficiency\"><span>单条视频制作耗时</span><div><s>5 小时</s><span aria-hidden=\"true\">→</span><strong>30 分钟</strong></div></div></section><section class=\"mx-method\"><div class=\"mx-section-label\">02 / 运营增长</div><h3>用反馈迭代内容</h3><p>A/B 测试对比数字人在知识、情感等场景的表现，基于完播率与互动率迭代内容策略；筛选匹配广告主，推进商业合作。</p><div class=\"mx-weekly\"><div><strong>+29452%</strong><span>一周内观看量</span></div><div><strong>+94866%</strong><span>一周内互动数</span></div></div></section></div><section class=\"mx-showcase\" aria-label=\"账号矩阵与代表内容\"><div class=\"mx-showcase-head\"><div><div class=\"mx-section-label\">ACCOUNT PORTFOLIO</div><h3>四个账号，四种内容表达</h3></div><p>点击图片或按钮访问主页<br>账号数据以所附截图为准</p></div><div class=\"mx-account-grid\"><article class=\"mx-account mx-tone-pink\"><header class=\"mx-account-head\"><div class=\"mx-account-index\">01</div><div><span class=\"mx-category\">情侣赛道</span><h3>茉莉茉莉</h3></div><span class=\"mx-platform\">小红书</span></header><p class=\"mx-account-desc\">情侣日常与聊天叙事，以互动情境呈现亲密关系中的趣味与共鸣。</p><div class=\"mx-account-proof\"><span><strong>7427</strong> 粉丝</span><span><strong>10.6万</strong> 获赞与收藏</span></div><div class=\"mx-gallery mx-gallery-pair\"><figure class=\"mx-sample\"><a class=\"mx-picture-link\" href=\"https://www.xiaohongshu.com/user/profile/68a6b9a6000000001901715e?xsec_token=ABdf5Q59DCY2T-7ic5UTA5k8AwIWalu0dMuEK9lpqov00%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看茉莉茉莉账号主页：代表内容1\"><img src=\"assets/images/44a73e2b73d4798a.png\" alt=\"茉莉茉莉 · 情侣赛道代表内容 1\" loading=\"lazy\"></a><figcaption><span>代表内容 1</span><button type=\"button\" onclick=\"openAwardCertificate(this.closest('.mx-sample'))\" aria-label=\"放大茉莉茉莉代表内容1\">放大 ↗</button></figcaption></figure><figure class=\"mx-sample\"><a class=\"mx-picture-link\" href=\"https://www.xiaohongshu.com/user/profile/68a6b9a6000000001901715e?xsec_token=ABdf5Q59DCY2T-7ic5UTA5k8AwIWalu0dMuEK9lpqov00%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看茉莉茉莉账号主页：代表内容2\"><img src=\"assets/images/0be0777f31cb910d.png\" alt=\"茉莉茉莉 · 情侣赛道代表内容 2\" loading=\"lazy\"></a><figcaption><span>代表内容 2</span><button type=\"button\" onclick=\"openAwardCertificate(this.closest('.mx-sample'))\" aria-label=\"放大茉莉茉莉代表内容2\">放大 ↗</button></figcaption></figure></div><details class=\"mx-profile\"><summary>查看账号介绍截图<span aria-hidden=\"true\">＋</span></summary><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看茉莉茉莉账号介绍\"><img src=\"assets/images/dcf3634ab96212e9.png\" alt=\"茉莉茉莉账号介绍截图\" loading=\"lazy\"></button></details><a class=\"mx-home-link\" href=\"https://www.xiaohongshu.com/user/profile/68a6b9a6000000001901715e?xsec_token=ABdf5Q59DCY2T-7ic5UTA5k8AwIWalu0dMuEK9lpqov00%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\"><span>访问 茉莉茉莉 主页</span><span aria-hidden=\"true\">↗</span></a></article><article class=\"mx-account mx-tone-purple\"><header class=\"mx-account-head\"><div class=\"mx-account-index\">02</div><div><span class=\"mx-category\">情侣＋情感赛道</span><h3>芝士分子</h3></div><span class=\"mx-platform\">小红书</span></header><p class=\"mx-account-desc\">结合情侣互动、情绪表达与女性成长，探索兼具陪伴感和共鸣感的内容。</p><div class=\"mx-account-proof\"><span><strong>4016</strong> 粉丝</span><span><strong>3.8万</strong> 获赞与收藏</span></div><div class=\"mx-gallery \"><figure class=\"mx-sample\"><a class=\"mx-picture-link\" href=\"https://www.xiaohongshu.com/user/profile/676cc93a000000001801cc65?xsec_token=ABRTRmeq269KUUw1xVrIq10DHTE6WNChovX6rvK_JKZu8%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看芝士分子账号主页：代表内容1\"><img src=\"assets/images/5c1ef4413a2aefd9.png\" alt=\"芝士分子 · 情侣＋情感赛道代表内容\" loading=\"lazy\"></a><figcaption><span>代表内容</span><button type=\"button\" onclick=\"openAwardCertificate(this.closest('.mx-sample'))\" aria-label=\"放大芝士分子代表内容1\">放大 ↗</button></figcaption></figure></div><details class=\"mx-profile\"><summary>查看账号介绍截图<span aria-hidden=\"true\">＋</span></summary><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看芝士分子账号介绍\"><img src=\"assets/images/c4063740279d5dc8.png\" alt=\"芝士分子账号介绍截图\" loading=\"lazy\"></button></details><a class=\"mx-home-link\" href=\"https://www.xiaohongshu.com/user/profile/676cc93a000000001801cc65?xsec_token=ABRTRmeq269KUUw1xVrIq10DHTE6WNChovX6rvK_JKZu8%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\"><span>访问 芝士分子 主页</span><span aria-hidden=\"true\">↗</span></a></article><article class=\"mx-account mx-tone-green\"><header class=\"mx-account-head\"><div class=\"mx-account-index\">03</div><div><span class=\"mx-category\">情侣赛道</span><h3>黄油不爱小饼干</h3></div><span class=\"mx-platform\">小红书</span></header><p class=\"mx-account-desc\">以校园日常和聊天故事展开叙事，营造有代入感的关系互动。</p><div class=\"mx-account-proof\"><span><strong>3202</strong> 粉丝</span><span><strong>2.3万</strong> 获赞与收藏</span></div><div class=\"mx-gallery \"><figure class=\"mx-sample\"><a class=\"mx-picture-link\" href=\"https://www.xiaohongshu.com/user/profile/5a8e96794eacab1ae5f369eb?xsec_token=ABElRgR-WcdFMgNzqMaCg42xIiYGP7EnBuMLYiX3fcH0Q%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看黄油不爱小饼干账号主页：代表内容1\"><img src=\"assets/images/02197e34dc4f1a72.png\" alt=\"黄油不爱小饼干 · 情侣赛道代表内容\" loading=\"lazy\"></a><figcaption><span>代表内容</span><button type=\"button\" onclick=\"openAwardCertificate(this.closest('.mx-sample'))\" aria-label=\"放大黄油不爱小饼干代表内容1\">放大 ↗</button></figcaption></figure></div><details class=\"mx-profile\"><summary>查看账号介绍截图<span aria-hidden=\"true\">＋</span></summary><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看黄油不爱小饼干账号介绍\"><img src=\"assets/images/82369a630f89ec72.png\" alt=\"黄油不爱小饼干账号介绍截图\" loading=\"lazy\"></button></details><a class=\"mx-home-link\" href=\"https://www.xiaohongshu.com/user/profile/5a8e96794eacab1ae5f369eb?xsec_token=ABElRgR-WcdFMgNzqMaCg42xIiYGP7EnBuMLYiX3fcH0Q%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\"><span>访问 黄油不爱小饼干 主页</span><span aria-hidden=\"true\">↗</span></a></article><article class=\"mx-account mx-tone-peach\"><header class=\"mx-account-head\"><div class=\"mx-account-index\">04</div><div><span class=\"mx-category\">美妆赛道</span><h3>香菜凤梨</h3></div><span class=\"mx-platform\">小红书</span></header><p class=\"mx-account-desc\">围绕清透妆容与日常美妆分享，用直观的视觉呈现吸引关注。</p><div class=\"mx-account-proof\"><span><strong>1299</strong> 粉丝</span><span><strong>1.5万</strong> 获赞与收藏</span></div><div class=\"mx-gallery \"><figure class=\"mx-sample\"><a class=\"mx-picture-link\" href=\"https://www.xiaohongshu.com/user/profile/5c3748ea000000000701a778?xsec_token=ABdEEjILn0bwoaQdLO2tNVlMD6oHZcuCXHKtjspqhf5-4%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"查看香菜凤梨账号主页：代表内容1\"><img src=\"assets/images/776eaf99a00f3f8c.png\" alt=\"香菜凤梨 · 美妆赛道代表内容\" loading=\"lazy\"></a><figcaption><span>代表内容</span><button type=\"button\" onclick=\"openAwardCertificate(this.closest('.mx-sample'))\" aria-label=\"放大香菜凤梨代表内容1\">放大 ↗</button></figcaption></figure></div><details class=\"mx-profile\"><summary>查看账号介绍截图<span aria-hidden=\"true\">＋</span></summary><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看香菜凤梨账号介绍\"><img src=\"assets/images/cf4615bf21a9e4fc.png\" alt=\"香菜凤梨账号介绍截图\" loading=\"lazy\"></button></details><a class=\"mx-home-link\" href=\"https://www.xiaohongshu.com/user/profile/5c3748ea000000000701a778?xsec_token=ABdEEjILn0bwoaQdLO2tNVlMD6oHZcuCXHKtjspqhf5-4%3D&amp;xsec_source=pc_search\" target=\"_blank\" rel=\"noopener noreferrer\"><span>访问 香菜凤梨 主页</span><span aria-hidden=\"true\">↗</span></a></article></div></section><section class=\"mx-resource\" aria-labelledby=\"mx-resource-title\"><div class=\"mx-resource-copy\"><span class=\"mx-resource-kicker\">方法论总结 PPT</span><h3 id=\"mx-resource-title\">毫无保留地分享</h3><h4>AI情感账号运营培训</h4><p>把账号运营中的方法与经验整理成一份培训 PPT，扫码查看完整分享。</p><div class=\"mx-resource-note\"><span aria-hidden=\"true\">↗</span> 从实践出发，把经验分享给更多人。</div></div><figure class=\"mx-resource-qr\"><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大AI情感账号运营培训PPT二维码\"><img src=\"assets/images/5ccf0ecaaf0e0e10.png\" alt=\"AI情感账号运营培训PPT二维码：扫码查看方法论总结\" width=\"500\" height=\"500\" loading=\"lazy\"></button><figcaption>扫码查看 PPT<span>点击二维码可放大</span></figcaption></figure></section></article>",

  a3: "<div class=\"md-wrap aigc-awards\"><div class=\"md-left\"><div class=\"md-logo-wrap\">🎬</div><div class=\"md-company\">AIGC品牌创作<small>Brand Storytelling & AI Video</small></div><div class=\"md-dept\">学院奖 · 大广赛<br>全国获奖作品</div><div class=\"md-period-badge\">2025</div><div class=\"md-metrics\"><div class=\"md-metric accent-gold-border\"><div class=\"md-metric-n plain award-metric-gold\">全国金奖</div><div class=\"md-metric-l\">毓美丽《我存在我美丽》<br>学院奖 · 2025 秋季征集大赛</div></div><div class=\"md-metric\"><div class=\"md-metric-n plain award-metric-silver\">全国二等奖</div><div class=\"md-metric-l\">三九胃泰《被爱的器官才能陪你打持久战》<br>第 17 届大广赛</div></div><div class=\"md-metric\"><div class=\"md-metric-n plain award-metric-bronze\">全国三等奖</div><div class=\"md-metric-l\">泡泡玛特《Nyota漫游云端》<br>第 17 届大广赛</div></div></div></div><div class=\"md-right\"><div class=\"md-block\"><div class=\"md-block-title\"><div class=\"md-block-icon\">💡</div>品牌洞察与传播概念提炼</div><div class=\"md-bullets\"><div class=\"md-bullet\">结合<strong>毓美丽、三九胃泰、泡泡玛特</strong>的产品卖点、社会情绪与用户痛点，提炼兼顾产品价值与情感共鸣的传播概念。</div></div><div class=\"brand-concept\"><div class=\"brand-concept-label\">毓美丽 · 传播主张</div><blockquote>我存在，我美丽</blockquote><p>捕捉年轻女性的容貌焦虑与讨好倾向，将“美”的定义从迎合外界转向自我认同。在创意表达中，把内服保养的功能诉求转译为<strong>关照自我、为自己消费</strong>的悦己主张。</p></div></div><div class=\"md-block\"><div class=\"md-block-title\"><div class=\"md-block-icon\">🔧</div>AIGC工作流设计</div><div class=\"aigc-process\"><span>洞察与创意</span><b>→</b><span>分镜脚本</span><b>→</b><span>图像生成与精修</span><b>→</b><span>图生视频</span><b>→</b><span>剪辑合成</span></div><div class=\"md-bullets\"><div class=\"md-bullet\">细化分镜脚本的景别与时长，使用<strong>即梦生图、星流局部精修、可灵 / 海螺图生视频</strong>，完成后期剪辑合成。</div><div class=\"md-bullet\">横评 <strong>7款 AI 工具</strong>，围绕生成质量、画面可控性与制作成本进行选型。</div></div></div><div class=\"md-block\"><div class=\"md-block-title\"><div class=\"md-block-icon\">🏆</div>获奖作品</div><div class=\"md-bullets\"><div class=\"md-bullet\">毓美丽《我存在我美丽》→ <strong>全国金奖</strong></div><div class=\"md-bullet\">三九胃泰《被爱的器官才能陪你打持久战》→ <strong>全国二等奖</strong></div><div class=\"md-bullet\">泡泡玛特《Nyota漫游云端》→ <strong>全国三等奖</strong></div></div></div></div><section class=\"award-showcase\" aria-label=\"获奖证书与视频\"><div class=\"award-showcase-heading\"><h3>获奖证书与视频</h3><p>点击证书查看大图，点击按钮观看作品</p></div><div class=\"award-work-grid\"><article class=\"award-work-card\"><div class=\"award-work-top\"><span class=\"award-level award-level-gold\">全国金奖</span><div class=\"award-contest\">学院奖 · 2025 秋季征集大赛</div></div><button class=\"award-certificate-button\" type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看毓美丽全国金奖证书\"><img src=\"assets/images/50e44ba49824b961.png\" alt=\"毓美丽《我存在我美丽》全国金奖证书\" loading=\"lazy\"><span class=\"award-zoom-hint\">点击放大证书 ↗</span></button><div class=\"award-work-info\"><div class=\"award-brand\">毓美丽</div><h3>《我存在我美丽》</h3><a class=\"award-video-link\" href=\"https://www.bilibili.com/video/BV1kYKh6kE7a?vd_source=def42dece5352279e8fbe093ba414c6c\" target=\"_blank\" rel=\"noopener noreferrer\">▶ 观看获奖视频 <span aria-hidden=\"true\">↗</span></a></div></article><article class=\"award-work-card\"><div class=\"award-work-top\"><span class=\"award-level award-level-silver\">全国二等奖</span><div class=\"award-contest\">第 17 届大广赛</div></div><button class=\"award-certificate-button\" type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看三九胃泰全国二等奖证书\"><img src=\"assets/images/d4b8f7cae07e65a7.jpg\" alt=\"三九胃泰《被爱的器官才能陪你打持久战》全国二等奖证书\" loading=\"lazy\"><span class=\"award-zoom-hint\">点击放大证书 ↗</span></button><div class=\"award-work-info\"><div class=\"award-brand\">三九胃泰</div><h3>《被爱的器官才能陪你打持久战》</h3><a class=\"award-video-link\" href=\"https://www.bilibili.com/video/BV1JvqbBkESX\" target=\"_blank\" rel=\"noopener noreferrer\">▶ 观看获奖视频 <span aria-hidden=\"true\">↗</span></a></div></article><article class=\"award-work-card\"><div class=\"award-work-top\"><span class=\"award-level award-level-bronze\">全国三等奖</span><div class=\"award-contest\">第 17 届大广赛</div></div><button class=\"award-certificate-button\" type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看泡泡玛特全国三等奖证书\"><img src=\"assets/images/9f7791cd8fdc1c8a.jpg\" alt=\"泡泡玛特《Nyota漫游云端》全国三等奖证书\" loading=\"lazy\"><span class=\"award-zoom-hint\">点击放大证书 ↗</span></button><div class=\"award-work-info\"><div class=\"award-brand\">泡泡玛特</div><h3>《Nyota漫游云端》</h3><a class=\"award-video-link\" href=\"https://www.bilibili.com/video/BV1cvqbBkEFL\" target=\"_blank\" rel=\"noopener noreferrer\">▶ 观看获奖视频 <span aria-hidden=\"true\">↗</span></a></div></article></div></section><section class=\"aigc-outreach\" aria-labelledby=\"aigc-talk-title\"><header class=\"aigc-outreach-head\"><div><span class=\"aigc-sharing-label\">经验分享</span><h3 id=\"aigc-talk-title\">校内讲座与经验分享</h3></div><div class=\"aigc-talk-count\"><strong>3<span>次</span></strong><span>受邀分享</span></div></header><div class=\"aigc-talk-layout\"><figure class=\"aigc-talk-poster\"><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大AI视频制作分享会宣传海报\"><img src=\"assets/images/aa91d60a01e668df.jpg\" alt=\"大广节AI视频制作线上分享会宣传海报\" width=\"1080\" height=\"1920\" loading=\"lazy\"></button><figcaption>分享会宣传海报 · 点击放大</figcaption></figure><div class=\"aigc-talk-copy\"><h4>从创作实践，<br>到经验共享</h4><p>受邀参与 <strong>3 次校内讲座与经验分享</strong>，围绕 AIGC 视频制作与获奖实践，分享从创意策划到成片落地的经验。</p><div class=\"aigc-talk-topics\"><div><span>01</span>作品展示与拆解</div><div><span>02</span>AI 工具与制作技巧</div><div><span>03</span>策划流程与团队分工</div><div><span>04</span>参赛经验与实用建议</div></div></div></div><section class=\"aigc-ppt\" aria-labelledby=\"aigc-ppt-title\"><div class=\"aigc-ppt-copy\"><span class=\"aigc-sharing-label\">方法论总结 PPT</span><h4 id=\"aigc-ppt-title\">毫无保留地分享</h4><p class=\"aigc-ppt-name\">AIGC视频分享</p><p>把视频创作中的方法与经验整理成 PPT，扫码查看完整分享。</p></div><figure class=\"aigc-ppt-qr\"><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大AIGC视频分享PPT二维码\"><img src=\"assets/images/2025416f843d8add.png\" alt=\"AIGC视频分享方法论总结PPT二维码：扫码查看完整分享\" width=\"500\" height=\"500\" loading=\"lazy\"></button><figcaption>扫码查看 PPT<span>点击二维码可放大</span></figcaption></figure></section></section></div>",
  a4: "<article class=\"md-wrap furn-case\"><aside class=\"md-left\"><div class=\"md-logo-wrap\">🛒</div><div class=\"md-company\">白牌家居增长实验<small>Home Goods Growth Lab</small></div><div class=\"md-dept\">计算广告课程实战<br>舜飞科技带教</div><div class=\"md-period-badge\">2026.05 — 2026.06</div><div class=\"md-metrics\"><div class=\"md-metric\"><div class=\"md-metric-n\">92次</div><div class=\"md-metric-l\">两轮累计转化</div></div><div class=\"md-metric\"><div class=\"md-metric-n\">12.2% ↓</div><div class=\"md-metric-l\">整体转化成本降幅</div></div><div class=\"md-metric\"><div class=\"md-metric-n\">43,861</div><div class=\"md-metric-l\">累计广告展示</div></div><div class=\"md-metric\"><div class=\"md-metric-n\">¥1,038.17</div><div class=\"md-metric-l\">累计广告消耗</div></div></div></aside><div class=\"md-right\"><section class=\"md-block furn-intro\"><div class=\"md-block-title\"><div class=\"md-block-icon\">🎯</div>广告投放与增长验证</div><div class=\"furn-team\">带领8人团队：广告投放 · 素材优化 · 策略复盘</div><p>从多品类试投到核心单品聚焦，用两轮真实广告投放，验证「选品 × 人群 × 素材」的组合。</p></section>    <section class=\"furn-section\">\n      <div class=\"md-block-title\"><div class=\"md-block-icon\">📊</div>投放成果与成本优化</div>\n      <div class=\"furn-results\">\n        <div class=\"furn-chart\" role=\"img\" aria-label=\"整体单次转化成本：首轮 12.05 元，第二轮 10.58 元，降低约 12.2%\">\n          <div class=\"furn-chart-title\">整体单次转化成本 <small>元 / 次 · 越低越好</small></div>\n          <div class=\"furn-bar-row\"><span>首轮</span><div class=\"furn-track\"><i style=\"width:100%\"></i></div><b>12.05</b></div>\n          <div class=\"furn-bar-row is-second\"><span>二轮</span><div class=\"furn-track\"><i style=\"width:87.8%\"></i></div><b>10.58</b></div>\n          <p>第二轮在预算略低的情况下，增加了 <strong>4 次转化</strong>。</p>\n        </div>\n        <div class=\"furn-winner\"><span>验证出的核心单品</span><h4>微波炉蒸笼</h4><strong><small>¥</small>7.25</strong><p>第二轮单次转化成本<br>首轮为 ¥7.32，连续两轮保持较优表现。</p></div>\n      </div>\n      <p class=\"furn-note\">数据来自两轮投放汇报；92 次为后台记录的转化数，整体成本与单品成本分别统计。</p>\n    </section>\n    <section class=\"furn-section\">\n      <div class=\"md-block-title\"><div class=\"md-block-icon\">🚀</div>两轮投放与策略迭代</div>\n      <div class=\"furn-rounds\">\n        <div><span class=\"furn-phase\">第一轮 · 05.28—05.31</span><h4>先测试，找出值得继续投的产品</h4><p>尝试旋转笔筒、防撞角、微波炉蒸笼等品类，比较消耗、转化与成本。蒸笼在首轮后期表现突出，成为后续重点。</p></div>\n        <div><span class=\"furn-phase\">第二轮 · 06.18—06.21</span><h4>再收敛，把预算投入有效组合</h4><p>计划将约 70% 预算配置给蒸笼，聚焦 50 岁以上受众，复用有效素材并优化脚本；依据投放反馈调整计划与出价。</p></div>\n      </div>\n      <div class=\"furn-levers\">\n        <div><span>PRODUCT / 选品</span><h4>用转化验证需求</h4><p>对比各品类实际表现，减少低效探索，把蒸笼确立为核心测试产品。</p></div>\n        <div><span>AUDIENCE / 人群</span><h4>让场景贴近使用者</h4><p>根据年龄与性别表现调整定向，围绕家庭使用场景优化表达与利益点。</p></div>\n        <div><span>CREATIVE / 素材</span><h4>从吸引观看到促成行动</h4><p>拆解开头、场景、产品利益与行动引导，用数据反馈迭代脚本和剪辑。</p></div>\n      </div>\n    </section>\n</div>    <section class=\"furn-section furn-proof\">\n      <div class=\"md-block-title\"><div class=\"md-block-icon\">📁</div>让数据与策略都有出处</div>\n      <div class=\"furn-evidence\"><figure><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看：投放成果与两轮数据对比\"><img src=\"assets/images/6afdeed27fb55d8f.jpg\" alt=\"投放成果与两轮数据对比 · 原始汇报第 4 页\" loading=\"lazy\"><span>查看大图 ↗</span></button><figcaption>投放成果与两轮数据对比<small>原始汇报 · P04</small></figcaption></figure><figure><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看：选品、预算与受众策略\"><img src=\"assets/images/08ce2a8c323fec07.jpg\" alt=\"选品、预算与受众策略 · 原始汇报第 12 页\" loading=\"lazy\"><span>查看大图 ↗</span></button><figcaption>选品、预算与受众策略<small>原始汇报 · P12</small></figcaption></figure><figure><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大查看：项目分工与协作执行\"><img src=\"assets/images/9816eeb5b8842fd0.jpg\" alt=\"项目分工与协作执行 · 原始汇报第 16 页\" loading=\"lazy\"><span>查看大图 ↗</span></button><figcaption>项目分工与协作执行<small>原始汇报 · P16</small></figcaption></figure></div>\n    <aside class=\"furn-takeaway\"><span>这次实践留下的方法</span><h4>先验证，再放大；先排障，再加预算。</h4><p>多变量同时测试会增加归因难度；落地页故障与素材审核问题也曾打断投放。复盘后，将「缩小测试范围、投前检查落地页与素材、保留有效组合」纳入后续方法。</p></aside></section>\n<section class=\"project-resource furn-resource\" aria-labelledby=\"furn-resource-title\"><div class=\"project-resource-copy\"><span class=\"project-resource-kicker\">方法论总结 / 经验分享</span><h3 id=\"furn-resource-title\">毫无保留地分享</h3><h4>白牌小家具广告投放经验分享</h4><p>把两轮投放中的选品、人群、素材与复盘经验整理成一份总结。踩过的坑、做过的调整，一起分享给你。</p></div><figure class=\"project-resource-qr\"><button type=\"button\" onclick=\"openAwardCertificate(this)\" aria-label=\"放大白牌小家具广告投放经验分享二维码\"><img src=\"assets/images/0ca4d78afa961325.png\" alt=\"白牌小家具广告投放经验分享二维码\" width=\"500\" height=\"500\" loading=\"lazy\"></button><figcaption>扫码查看完整分享<span>点击二维码可放大</span></figcaption></figure></section></article>"
};

function openTarot(id){var d=tarotData[id];if(!d)return;document.getElementById('tm-icon').textContent=d.icon;document.getElementById('tm-roman').textContent=d.roman;document.getElementById('tm-title').textContent=d.title[lang]||d.title.zh;document.getElementById('tm-desc').innerHTML=(d.desc[lang]||d.desc.zh).replace(/\n/g,'<br>');var kws=d.keywords[lang]||d.keywords.zh;var kwEl=document.getElementById('tm-keywords');if(kws&&kws.length>0){kwEl.innerHTML=kws.map(function(k){return'<span class="tm-kw">'+k+'</span>';}).join('');kwEl.style.display='flex';}else{kwEl.innerHTML='';kwEl.style.display='none';}document.getElementById('tarot-overlay').classList.add('open');document.body.style.overflow='hidden';}
function closeTarot(e){if(e&&e.target!==document.getElementById('tarot-overlay'))return;document.getElementById('tarot-overlay').classList.remove('open');document.body.style.overflow='';}
function openModal(id){var d=modalData[id];if(!d)return;
  if(DETAIL_HTML[d.custom]){
    document.getElementById('modal-title').textContent=d.title[lang]||d.title.zh;
    document.getElementById('modal-body').innerHTML=DETAIL_HTML[d.custom];
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow='hidden';
    return;
  }
  if(d.custom==='r1'){document.getElementById('modal-overlay').classList.add('open');document.body.style.overflow='hidden';buildR1Modal();return;}if(d.custom==='r2'){document.getElementById('modal-overlay').classList.add('open');document.body.style.overflow='hidden';buildR2Modal();return;}if(d.custom==='r3'){document.getElementById('modal-overlay').classList.add('open');document.body.style.overflow='hidden';buildR3Modal();return;}document.getElementById('modal-title').textContent=d.title[lang]||d.title.zh;var b=d.image?'<figure class="research-illustration"><img src="'+d.image+'" alt="'+(lang==='en'?'Concept illustration of human–AI trust research with EEG and eye tracking':'人机信任研究主题插画：EEG脑电、眼动追踪与生成式AI交互')+'"><figcaption>'+(lang==='en'?'Research concept illustration · AI-generated':'研究主题示意图 · AI生成')+'</figcaption></figure>':'<span class="modal-emoji">'+d.emoji+'</span>';b+='<span class="modal-venue" style="background:'+d.venueColor+';color:'+d.venueTxt+';">'+(d.venue[lang]||d.venue.zh)+'</span>';b+='<div class="modal-desc" style="margin-top:14px;">'+(d.desc[lang]||d.desc.zh).replace(/\n/g,'<br>')+'</div>';b+='<div class="modal-tags">'+d.tags.map(function(t){return'<span class="tag">'+t+'</span>';}).join('')+'</div>';if(d.links&&d.links.length)b+='<div class="modal-links">'+d.links.map(function(l){return'<a class="modal-link" href="'+l.url+'" target="_blank">'+l.text+'</a>';}).join('')+'</div>';document.getElementById('modal-body').innerHTML=b;document.getElementById('modal-overlay').classList.add('open');document.body.style.overflow='hidden';}
function closeModal(e){if(e&&e.target!==document.getElementById('modal-overlay'))return;document.getElementById('modal-overlay').classList.remove('open');document.body.style.overflow='';}
function openAwardCertificate(button){var source=button.querySelector('img');var viewer=document.getElementById('award-viewer');var image=document.getElementById('award-viewer-image');image.src=source.src;image.alt=source.alt;document.getElementById('award-viewer-title').textContent=source.alt;if(typeof viewer.showModal==='function'){viewer.showModal();}else{viewer.setAttribute('open','');viewer.classList.add('dialog-fallback');}viewer.scrollTop=0;}
document.getElementById('award-viewer').addEventListener('close',function(){document.getElementById('award-viewer-image').removeAttribute('src');});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(document.getElementById('award-viewer').open)return;closeTarot();closeModal();}});

function closeAwardViewer(){
 var viewer=document.getElementById('award-viewer');
 if(typeof viewer.close==='function'){viewer.close();}
 else{viewer.removeAttribute('open');viewer.classList.remove('dialog-fallback');document.getElementById('award-viewer-image').removeAttribute('src');}
}
document.addEventListener('keydown',function(e){if(e.key==='Escape' && document.getElementById('award-viewer').hasAttribute('open'))closeAwardViewer();});
