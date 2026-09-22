const demoContent = {
  people: {
    question: '「找出本月加班異常最高的三個部門。」',
    title: '加班異常集中於三個部門',
    bars: [['北區服務部', '91%'], ['製造二課', '74%'], ['客戶支援組', '62%']],
    action: '建立改善追蹤單',
    detail: 'BPM 自動帶入分析結果，指定部門主管並送出簽核 / 追蹤。',
    status: ['Insight', 'Workflow', 'Action']
  },
  asset: {
    question: '「哪些設備最近的異常頻率最高？」',
    title: '三台設備進入高風險區間',
    bars: [['CNC-204 主軸', '88%'], ['Press-08 液壓系統', '76%'], ['Line-03 馬達', '69%']],
    action: '建立維修案件',
    detail: 'FSM 指派工程人員、記錄現場簽到與維修結果，完成後回寫資料庫。',
    status: ['Detect', 'Assign', 'Execute']
  },
  risk: {
    question: '「整理最近需要主管注意的異常事件。」',
    title: '已整理 8 件高優先事件',
    bars: [['簽核逾期風險', '83%'], ['外勤回報缺漏', '57%'], ['合約條款異常', '46%']],
    action: '建立 Management Brief',
    detail: '主管選擇需要追蹤的項目，WorkLink 建立後續工作與簽核。',
    status: ['Understand', 'Decide', 'Execute']
  }
};

const icons = () => lucide.createIcons({ attrs: { 'stroke-width': 1.7 } });
icons();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
});
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}));

const updateDemo = (key) => {
  const content = demoContent[key];
  document.querySelector('#demo-question').textContent = content.question;
  document.querySelector('#demo-title').textContent = content.title;
  document.querySelector('#demo-action').textContent = content.action;
  document.querySelector('#demo-detail').textContent = content.detail;
  document.querySelector('#response-bars').innerHTML = content.bars.map(([label, value]) => `<div><span>${label}</span><i class="bar-track"><em style="width: ${value}"></em></i><b>${value}</b></div>`).join('');
  document.querySelector('.demo-status').innerHTML = content.status.map((status, index) => `<span class="${index === 2 ? 'status-active' : ''}"><i data-lucide="${index === 2 ? 'arrow-right' : 'check'}"></i> ${status}</span>`).join('');
  icons();
};
document.querySelectorAll('.demo-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.demo-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  updateDemo(tab.dataset.demo);
}));
updateDemo('people');
