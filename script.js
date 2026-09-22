const iconOptions = { attrs: { 'stroke-width': 1.7 } };
const renderIcons = () => window.lucide?.createIcons(iconOptions);
renderIcons();

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => mobileNav.classList.remove('open')));

const scenarioData = {
  security: { source: 'AI Camera / Security System', title: '從偵測異常，到完整留下處理紀錄', note: '每一次事件處理，都會形成下一次決策可以理解的新資料。', steps: [['scan-search', '偵測異常', 'AI Camera / Security System'], ['brain-circuit', '理解事件與風險', 'WorkLink AI'], ['user-round-plus', '建立事件 / 指派人員', 'WorkLink FSM'], ['camera', '到場 / 拍照 / 回報', '現場人員'], ['file-check-2', '主管確認 / 簽核', 'WorkLink BPM'], ['database-zap', '完整留下處理紀錄', 'Enterprise Data']] },
  building: { source: 'Building / IoT', title: '從環境異常，到完成維修與確認', note: '設備狀態、現場處理與主管確認，回到 Enterprise Context。', steps: [['triangle-alert', '設備或環境異常', 'Building / IoT'], ['brain-circuit', 'AI 分析風險', 'WorkLink AI'], ['wrench', '建立維修案件', 'WorkLink FSM'], ['hard-hat', '指派工程人員', '現場處理'], ['file-check-2', '主管確認結案', 'WorkLink BPM'], ['database-zap', '回到 Enterprise Context', 'New Data']] },
  fleet: { source: 'GPS / Vehicle Systems', title: '從車隊事件，到可追蹤的處理任務', note: '路線、車況與例外事件讓下一次車隊管理更有依據。', steps: [['map-pin', '異常路線 / 車況 / 事件', 'GPS / Vehicle'], ['brain-circuit', 'AI 分析', 'WorkLink AI'], ['clipboard-list', '建立處理任務', 'WorkLink'], ['bell-ring', '通知管理者 / 駕駛', 'Notifications'], ['list-checks', '追蹤處理', 'WorkLink FSM'], ['database-zap', '完成紀錄', 'Enterprise Data']] },
  retail: { source: 'POS / AI Vision', title: '從門市事件，到可複製的改善任務', note: '門市與區主管的執行結果，成為下一次營運決策的資料。', steps: [['scan-eye', '營運或安全異常', 'POS / AI Vision'], ['brain-circuit', 'AI 分析', 'WorkLink AI'], ['clipboard-check', '建立改善任務', 'WorkLink BPM'], ['store', '門市 / 區主管執行', 'Field Action'], ['list-checks', '追蹤結果', 'WorkLink'], ['database-zap', '形成新資料', 'Enterprise Context']] },
  equipment: { source: 'IoT / Inspection', title: '從設備異常，到形成維修知識', note: '每次派工與結案，讓設備維護從反應走向學習。', steps: [['activity', '設備異常', 'IoT / Inspection'], ['brain-circuit', 'AI Risk Analysis', 'WorkLink AI'], ['wrench', 'FSM 派工', 'WorkLink FSM'], ['hard-hat', '工程師處理', 'Field Service'], ['file-check-2', 'BPM 結案', 'WorkLink BPM'], ['database-zap', '形成維修知識', 'Enterprise Data']] }
};

const updateScenario = (key) => {
  const data = scenarioData[key];
  document.querySelector('#scenario-source').textContent = data.source;
  document.querySelector('#scenario-title').textContent = data.title;
  document.querySelector('#scenario-note').textContent = data.note;
  document.querySelector('#scenario-index').textContent = `${String(Object.keys(scenarioData).indexOf(key) + 1).padStart(2, '0')} / 05`;
  document.querySelector('#scenario-steps').innerHTML = data.steps.map(([icon, title, label], index) => `${index ? '<span>→</span>' : ''}<div><i data-lucide="${icon}"></i><b>${title}</b><small>${label}</small></div>`).join('');
  renderIcons();
};
document.querySelectorAll('.scenario-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.scenario-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  updateScenario(tab.dataset.scenario);
}));
updateScenario('security');

document.querySelector('#create-action').addEventListener('click', () => {
  const demo = document.querySelector('.execution-demo');
  demo.classList.add('completed');
  document.querySelector('#create-action').innerHTML = '已建立 BPM 改善追蹤單 <i data-lucide="check"></i>';
  renderIcons();
});

document.querySelector('#more-apps').addEventListener('click', (event) => {
  const container = event.currentTarget.parentElement;
  container.classList.toggle('open');
  event.currentTarget.querySelector('svg')?.classList.toggle('rotated');
});