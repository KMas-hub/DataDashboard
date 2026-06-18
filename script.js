//時刻表示
setInterval(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const time = now.toLocaleTimeString();

    document.getElementById('clock').textContent = `${month}月${date}日 ${time}`;
}, 1000);

//ハンバーガーメニュー
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.menu-button');
  const nav = document.getElementById('nav-menu');
  const overlay = document.getElementById('overlay');

  if(hamburger && nav && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            const isOpen = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            nav.setAttribute('aria-hidden', !isOpen);
        });

        overlay.addEventListener('click', () => {
          hamburger.classList.remove('active');
          nav.classList.remove('active');
          overlay.classList.remove('active');
          hamburger.setAttribute('aria-expanded', false);
          nav.setAttribute('aria-hidden', true);
        })
  }

  //ダークモード
    const themeCheckbox = document.getElementById('checkbox-theme');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if(themeCheckbox) themeCheckbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        if(themeCheckbox) themeCheckbox.checked = false;
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            if(isDark) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }

            if(typeof sensorDatalog !== 'undefined' && sensorDatalog.length > 0) {
              if(typeof drawMultiChart === 'function') drawMultiChart();
            }
        });
    }
});

//メイン
const sensorEndpoints = {
  /*
  'out-temp': "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=2a0b8401c109ec580d952fa6215d201e",
  'out-humid': "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=2a0b8401c109ec580d952fa6215d201e",
  'out-uv': "https://wiolink.seeed.co.jp/v1/node/GroveSI114XI2C0/UV?access_token=53b6982b898e788cb38a1cf6f82ff378",
  'out-lv': "https://wiolink.seeed.co.jp/v1/node/GroveSI114XI2C0/visiblelight?access_token=53b6982b898e788cb38a1cf6f82ff378",
  'out-ir': "https://wiolink.seeed.co.jp/v1/node/GroveSI114XI2C0/IR?access_token=53b6982b898e788cb38a1cf6f82ff378",
  */
  'tankCa-temp': "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD0/temp?access_token=004185b7eb7199c2d9e249e65a281563",
  'tankNPK-temp': "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=004185b7eb7199c2d9e249e65a281563",
  
  soil10w1: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=2a0b8401c109ec580d952fa6215d201e",
  soil10w0: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD0/temp?access_token=2a0b8401c109ec580d952fa6215d201e",
  soil10s1: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=a09c8ff06cbd72eac1dc922d83e44114",
  soil10s0: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD0/temp?access_token=a09c8ff06cbd72eac1dc922d83e44114",
  soil10e1: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=80fe30f51fbaef1734d80b24ba7edaa9",
  soil10e0: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD0/temp?access_token=80fe30f51fbaef1734d80b24ba7edaa9",
  
  temp1n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=e9d5db461f34659305f7a6bbcbf4a9e3",
  humid1n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=e9d5db461f34659305f7a6bbcbf4a9e3",
  soil1n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=e9d5db461f34659305f7a6bbcbf4a9e3",
  temp2n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=a04e60017fac97b4bfd1da3912ae7ed7",
  humid2n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=a04e60017fac97b4bfd1da3912ae7ed7",
  soil2n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=a04e60017fac97b4bfd1da3912ae7ed7",
  temp3n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=18ea1e37afa57223fc89f81f41e0c890",
  humid3n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=18ea1e37afa57223fc89f81f41e0c890",
  soil3n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=18ea1e37afa57223fc89f81f41e0c890",
  temp4n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=06365a4adf47803f9d5a28aefa3a2792",
  humid4n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=06365a4adf47803f9d5a28aefa3a2792",
  soil4n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=06365a4adf47803f9d5a28aefa3a2792",
  temp5n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=03d5be181d138741fb82ba16c14eb008",
  humid5n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=03d5be181d138741fb82ba16c14eb008",
  soil5n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=03d5be181d138741fb82ba16c14eb008",
  temp6n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C1/temperature?access_token=b2dadcf349719f0486e104e4682bbd3c",
  humid6n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C1/humidity?access_token=b2dadcf349719f0486e104e4682bbd3c",
  soil6n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD0/temp?access_token=b2dadcf349719f0486e104e4682bbd3c",
  temp7n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=c7a78328a4a91c967b5639fe92ba0e68",
  humid7n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=c7a78328a4a91c967b5639fe92ba0e68",
  soil7n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=c7a78328a4a91c967b5639fe92ba0e68",
  temp8n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=fe692e4c823a106599949775150ced82",
  humid8n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=fe692e4c823a106599949775150ced82",
  soil8n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=fe692e4c823a106599949775150ced82",
  temp9n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/temperature?access_token=d45143c70810b21fa4178bb01c4f8677",
  humid9n: "https://wiolink.seeed.co.jp/v1/node/GroveTempHumiSHT35I2C0/humidity?access_token=d45143c70810b21fa4178bb01c4f8677",
  soil9n: "https://wiolink.seeed.co.jp/v1/node/GroveTemp1WireD1/temp?access_token=d45143c70810b21fa4178bb01c4f8677",
};

const sensorKeyMap = {
  "out-temp": "temperature",
  "out-humid": "humidity",
  "out-uv": "UV",
  "out-lv": "visiblelight",
  "out-ir": "IR",

  'tankCa-temp': "temperature",
  'tankNPK-temp': "temperature",

  soil10w1: "temperature",
  soil10w0: "temperature",
  soil10s1: "temperature",
  soil10s0: "temperature",
  soil10e1: "temperature",
  soil10e0: "temperature",
  temp1n: "temperature",
  humid1n: "humidity",
  soil1n: "temperature",
  temp2n: "temperature",
  humid2n: "humidity",
  soil2n: "temperature",
  temp3n: "temperature",
  humid3n: "humidity",
  soil3n: "temperature",
  temp4n: "temperature",
  humid4n: "humidity",
  soil4n: "temperature",
  temp5n: "temperature",
  humid5n: "humidity",
  soil5n: "temperature",
  temp6n: "temperature",
  humid6n: "humidity",
  soil6n: "temperature",
  temp7n: "temperature",
  humid7n: "humidity",
  soil7n: "temperature",
  temp8n: "temperature",
  humid8n: "humidity",
  soil8n: "temperature",
  temp9n: "temperature",
  humid9n: "humidity",
  soil9n: "temperature",
};

const latestValues = {};

function applyColor(id, value) {
  const span = document.getElementById(id);
  if (!span) return;

  span.classList.remove("level-low", "level-mid", "level-high", "level-Slow", "level-midlow");

  if (id.includes("temp")) {
    if (value < 15) span.classList.add("level-Slow");
    else if (value < 30) span.classList.add("level-low");
    else if (value < 35) span.classList.add("level-mid");
    else span.classList.add("level-high");
  } else if (id.includes("humid")) {
    if (value > 85) span.classList.add("level-Slow");
    else if (value > 45) span.classList.add("level-low");
    else if (value > 35) span.classList.add("level-mid");
    else span.classList.add("level-high");
  } else if (id.includes("soil")) {
    if (value < 15) span.classList.add("level-Slow");
    else if (value < 17) span.classList.add("level-midlow");
    else if (value < 21) span.classList.add("level-low");
    else if (value < 25) span.classList.add("level-mid");
    else span.classList.add("level-high");
  }
}

async function fetchSensor(id) {
  const baseUrl = sensorEndpoints[id];
  if (!baseUrl) return null;

  const url = baseUrl + (baseUrl.includes('?') ? '&' : '?') + '_ts=' + Date.now();

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();

    const key = sensorKeyMap[id];
    let value = undefined;
    
    if (key && data[key] !== undefined) value = data[key];
    else if (data.value !== undefined) value = data.value;
    else if (data.data && data.data.value !== undefined) value = data.data.value;

    if (value === undefined) throw new Error('値が見つかりません');

    latestValues[id] = value;

    let displayValue = String(value);
    let digitCount = displayValue.replace(/[^0-9]/g, '').length;
    if (digitCount < 4) {
      if (!displayValue.includes('.')) {
        displayValue += '.';
      }
      while (displayValue.replace(/[^0-9]/g, '').length < 4) {
        displayValue += '0';
      }
    }

    //単位調整
    const unit =
      id.includes("humid") ? "％" :
      id.includes("uv") ? "mw/cm²" :
      id.includes("lv") || id.includes("vl") || id.includes("ir") ? "lm" :
      id.includes("mois") ? "％" :
      "℃";

    const el = document.getElementById(id);
    if (el) el.textContent = displayValue + " " + unit;

    applyColor(id, value);
    return value;

  } catch (e) {
    console.error(id + ' 取得エラー:', e);
    const el = document.getElementById(id);
    if (el) el.textContent = "取得失敗";
    return null;
  }
}

function updateAllSensors() {
  const ids = Object.keys(sensorEndpoints);
  return Promise.all(ids.map(id => fetchSensor(id)))
    .catch(err => console.error('updateAllSensors エラー:', err));
}

updateAllSensors();
setInterval(updateAllSensors, 60 * 1000);
