import { BOSSES, SIZES, SPECS, MONTHS, CLASSES, SPECS_SELECT_OPTIONS, ICON_CDN_LINK, AURAS_ICONS } from "/static/appConstants.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyA6PVRxq6DOMj3mIVk6ZWsINkcXF8dNfSA",
  authDomain: "uwu-logs-top.firebaseapp.com",
  databaseURL: "https://uwu-logs-top-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "uwu-logs-top",
  storageBucket: "uwu-logs-top.appspot.com",
  messagingSenderId: "171275248830",
  appId: "1:171275248830:web:775b829ebfb7aacf3f6aef",
  measurementId: "G-SB4EW88G5G"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const LOC = window.location;
const mainTableBody = document.getElementById("main-table-body");

const classSelect = document.getElementById('class-select');
const specSelect = document.getElementById('spec-select');

const instanceSelect = document.getElementById('instance-select');
const bossSelect = document.getElementById('boss-select');
const sizeSelect = document.getElementById('size-select');
const difficultyCheckbox = document.getElementById('difficulty-checkbox');
const combineCheckbox = document.getElementById('combine-checkbox');
const loading = document.getElementById('loading-info');
const headDPS = document.getElementById('head-dps');

const screenX = window.matchMedia("(min-width: 1100px)");

const PARAMS_LIST = ['raid', 'boss', 'size', 'mode', 'all', 'cls', 'spec'];
const INTERACTABLES = [instanceSelect, bossSelect, sizeSelect, difficultyCheckbox, combineCheckbox, classSelect, specSelect];
// const LOGS_URL = "http://localhost:5000";
const LOGS_URL = "https://uwu-logs.xyz";
const AURAS_COLUMNS = ['ext', 'self'];
const GUID = 'i';
const DPS = 'd';
const USEFUL = 'u';
const SPEC = 's';
const AURAS = 'a';
const REPORT = 'r';
const DURATION = 't';
const NAME = 'n';


function newOption(value, index) {
  const _option = document.createElement('option');
  _option.value = index === undefined ? value : index;
  _option.innerHTML = value;
  return _option
}

function addBosses() {
  bossSelect.innerHTML = "";
  BOSSES[instanceSelect.value].forEach(boss_name => bossSelect.appendChild(newOption(boss_name)));
};

function addSpecs() {
  specSelect.innerHTML = "";
  const class_ = CLASSES[classSelect.value];
  const specs = SPECS_SELECT_OPTIONS[class_];
  specSelect.appendChild(newOption('All specs', -1));
  if (!specs) return;

  specs.forEach((spec_name, i) => specSelect.appendChild(newOption(spec_name, i+1)));
};

function newLink(report_ID) {
  const _a = document.createElement('a');
  _a.href = `${LOGS_URL}/reports/${report_ID}/`;
  _a.target = "_blank";
  return _a
}

function numberWithSeparator(x, sep=" ") {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}
function add_inner_text(cell, text) {
  if (!isNaN(text)) text = numberWithSeparator(text);
  
  const innerText = document.createTextNode(text);
  cell.appendChild(innerText);
}

function addNameCell(row, data) {
  const cell = document.createElement('td');
  const data_value = data[NAME];

  const [spec_name, spec_icon, spec_class_id] = SPECS[data[SPEC]];
  const imgsrc = `${ICON_CDN_LINK}/${spec_icon}.jpg`;
  cell.innerHTML = `<img src="${imgsrc}">${data_value}`;
  cell.title = spec_name;
  cell.className = `${spec_class_id} table-n`;
  row.appendChild(cell);
}

function addDPSCell(row, data) {
  const cell = document.createElement('td');
  const data_value = data[DPS];
  cell.value = data_value;
  let _inside_data = data_value.toFixed(1);

  add_inner_text(cell, _inside_data);
  cell.classList.add(`table-d`);
  row.appendChild(cell);
}

function addUsefulCell(row, data) {
  const cell = document.createElement('td');
  const data_value = data[USEFUL];
  cell.value = data_value;
  let _inside_data = data_value;

  add_inner_text(cell, _inside_data);
  cell.classList.add(`table-u`);
  row.appendChild(cell);
}

function formatDuration(dur) {
  const minutes = Math.floor(dur/60);
  const seconds = Math.floor(dur%60);
  const m_str = minutes.toString().padStart(2, '0');
  const s_str = seconds.toString().padStart(2, '0');
  return `${m_str}:${s_str}`;
}
function addDurationCell(row, data) {
  const cell = document.createElement('td');
  const data_value = data[DURATION];
  cell.value = data_value;
  let _inside_data = formatDuration(data_value);

  add_inner_text(cell, _inside_data);
  cell.classList.add(`table-t`);
  row.appendChild(cell);
}

function addDateCell(row, data) {
  const cell = document.createElement('td');
  const data_value = data[REPORT];

  const report_date = data_value.toString().slice(0, 15);
  cell.value = report_date.replaceAll('-', '');
  cell.className = "table-r";

  const _link = newLink(data_value);
  const [year, month, day, _, hour, minute] = report_date.split('-');
  const months_str = MONTHS[Number(month) - 1];
  if (screenX.matches) {
    _link.innerText = `${day} ${months_str} ${year} ${hour}:${minute}`;
  } else {
    _link.innerText = `${day} ${months_str} ${year}`;
  }
  cell.appendChild(_link);

  row.appendChild(cell);
}

function new_li(spell_id, count, uptime) {
  const li = document.createElement('li');
  const imgsrc = `${ICON_CDN_LINK}/${AURAS_ICONS[spell_id]}.jpg`;
  li.innerHTML = `<img src="${imgsrc}" alt="${spell_id}"><span>${count}</span><span>${uptime}%</span>`;
  return li
}

function addAurasCells(row, data) {
  const AURAS_COUNT = [];
  const AURAS_TABLE = [];
  const AURAS_CELLS = [];
  for (let i=0; i<AURAS_COLUMNS.length; i++) {
    AURAS_COUNT.push(0);
    const td = document.createElement('td');
    AURAS_CELLS.push(td);
    const table = document.createElement('ul');
    AURAS_TABLE.push(table);
  }

  const data_value = data[AURAS];
  for (let spell_id in data_value) {
    const [count, uptime, type] = data_value[spell_id];
    const li = new_li(spell_id, count, uptime);
    AURAS_COUNT[type] += count;
    AURAS_TABLE[type].appendChild(li);
  }

  
  for (let i=0; i<AURAS_COLUMNS.length; i++) {
    const cell = AURAS_CELLS[i];
    cell.appendChild(AURAS_TABLE[i]);
    cell.value = AURAS_COUNT[i];
    add_inner_text(cell, AURAS_COUNT[i]);
    cell.classList.add(`table-${AURAS_COLUMNS[i]}`);
    row.appendChild(cell);
  }
}

function newRow(data) {
  const row = document.createElement('tr');

  addNameCell(row, data);
  addDPSCell(row, data);
  addUsefulCell(row, data);
  addDurationCell(row, data);
  addAurasCells(row, data);
  addDateCell(row, data);

  return row
}

let last_column = -1;
let sorting_order = 1;
const getCellValue = (tr, idx) => tr.children[idx].value;
const tableSort = idx => (a, b) => (getCellValue(b, idx) - getCellValue(a, idx)) * sorting_order;
function sort_table_by_column(event) {
  const th = event && event.target || headDPS;
  const column_n = th.cellIndex;
  sorting_order = !event ? 1 : column_n == last_column ? -sorting_order : th.id == "head-duration" ? -1 : 1;
  Array.from(mainTableBody.querySelectorAll('tr:nth-child(n+1)')).sort(tableSort(column_n)).forEach(tr => mainTableBody.appendChild(tr));
  last_column = column_n;
}

function newClassFilter(class_i) {
  return x => class_i <= x[SPEC] && x[SPEC] < class_i+4;
}

function newSpecFilter(spec_i) {
  return x => x[SPEC] == spec_i;
}

function filterDataByClass(data) {
  const class_i = Number(classSelect.value);
  if (class_i === -1) return data;
  const spec_i = Number(specSelect.value);
  const _filter = spec_i === -1 ? newClassFilter(class_i*4) : newSpecFilter(class_i*4 + spec_i);
  return data.filter(_filter);
}

function noDublicates(data) {
  let data2 = {}
  for (let i=0; i < data.length; i++) {
    const current = data[i];
    const guid = current[GUID];
    const best = data2[guid];
    if (!best || current[DPS] > best[DPS]) {
      data2[guid] = current;
    }
  }
  return Object.values(data2);
}


let mainTimeout;
function tableAddNewData(data) {
  mainTableBody.innerHTML = "";
  clearTimeout(mainTimeout);
  if (!data) return;
  data = filterDataByClass(data)
  if (!data) return;
  data = combineCheckbox.checked ? noDublicates(data) : data;
  if (!data) return;

  let i = 0;
  (function chunk() {
    const end = Math.min(i+250, data.length)
    for ( ; i < end; i++) {
      const row = newRow(data[i]);
      mainTableBody.appendChild(row);
    }
    if (i<data.length) {
      loading.innerText = `Done: ${i}/${data.length}`
      mainTimeout = setTimeout(chunk);
    } else {
      loading.innerText = '';
    }
  })();
}

const CACHE = {}
const sortNewData = (a, b) => b.d - a.d;
function queryDB(query) {
  const newDBref = ref(database, query);
  onValue(newDBref, snapshot => {
    const newData = snapshot.val();
    const sorted = newData.sort(sortNewData);
    CACHE[query] = sorted;
    tableAddNewData(sorted);
  });
}

function fetchData() {
  const bossValue = bossSelect.value;
  const sizeValue = sizeSelect.value;
  const diffValue = difficultyCheckbox.checked ? 'H' : 'N';
  const diff = `${sizeValue}${diffValue}`
  const query = `${bossValue}/${diff}`;
  const data = CACHE[query];
  data ? tableAddNewData(data) : queryDB(query);
}

function searchChanged() {
  const __diff = difficultyCheckbox.checked ? 'H' : "N";
  const title = `UwU Logs - Top - ${bossSelect.value} - ${sizeSelect.value}${__diff}`;
  document.title = title;

  const parsed = {
    raid: instanceSelect.value,
    boss: bossSelect.value,
    size: sizeSelect.value,
    mode: difficultyCheckbox.checked ? 1 : 0,
    best: combineCheckbox.checked ? 1 : 0,
    cls: classSelect.value,
    spec: specSelect.value,
  };

  const new_params = new URLSearchParams(parsed).toString();
  const url = `?${new_params}`;
  history.pushState(parsed, title, url);

  fetchData();
}

function main() {
  const currentParams = new URLSearchParams(LOC.search);

  Object.keys(BOSSES).forEach(name => instanceSelect.appendChild(newOption(name)));
  CLASSES.forEach((name, i) => classSelect.appendChild(newOption(name, i)));

  SIZES.forEach(s => sizeSelect.appendChild(newOption(s)));
  for (let i=0; i < PARAMS_LIST.length; i++) {
    const par = currentParams.get(PARAMS_LIST[i]);
    const elm = INTERACTABLES[i]
    if (elm.nodeName == "INPUT") {
      elm.checked = par ? par == 1 : true;
    } else {
      const vrf = [...elm.options].map(o => o.value).includes(par);
      const index = elm.id == 'class-select' ? 2 : 0;
      vrf && par ? elm.value = par : elm.selectedIndex = index;
    }
    if (elm.id == 'instance-select') {
      addBosses();
    } else if (elm.id == 'class-select') {
      addSpecs();
    }
  };
  
  classSelect.addEventListener('change', addSpecs);
  instanceSelect.addEventListener('change', addBosses);
  INTERACTABLES.forEach(e => e.addEventListener('change', searchChanged));

  searchChanged();
  document.querySelectorAll('th.sortable').forEach(th => th.addEventListener('click', sort_table_by_column));
}

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
