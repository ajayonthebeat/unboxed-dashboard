import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ComposedChart, Line, PieChart, Pie, Cell } from "recharts";
import * as Papa from "papaparse";

const S_D={"2026-01-01":{"AJAY":544,"DEREK":2491,"SHARED":98,"LJ":474,"MARIANNA":3,"ARTURO":71,"JANELY":45},"2026-01-02":{"AJAY":649,"DEREK":2998,"SHARED":21,"LJ":437,"MARIANNA":15,"JANELY":82,"DYLAN":8,"ALEX":159,"CARTER":1},"2026-01-03":{"AJAY":689,"DEREK":2018,"SHARED":30,"LJ":107,"MARIANNA":24,"JANELY":72,"ALEX":351},"2026-01-04":{"AJAY":567,"DEREK":2216,"LJ":267,"MARIANNA":19,"JANELY":93,"DYLAN":1,"ALEX":8,"CARTER":2},"2026-01-05":{"AJAY":362,"DEREK":1835,"LJ":231,"MARIANNA":3,"ARTURO":2,"JANELY":6},"2026-01-06":{"AJAY":456,"DEREK":1056,"LJ":592,"MARIANNA":8,"JANELY":7,"DYLAN":6},"2026-01-07":{"AJAY":453,"DEREK":1102,"SHARED":16,"LJ":141,"MARIANNA":15,"ARTURO":4,"JANELY":20,"DYLAN":3,"ALEX":83},"2026-01-08":{"AJAY":453,"DEREK":1845,"SHARED":532,"LJ":259,"MARIANNA":24,"JANELY":5,"ALEX":54},"2026-01-09":{"AJAY":561,"DEREK":716,"SHARED":263,"LJ":424,"MARIANNA":5,"JANELY":8,"DYLAN":5,"ALEX":28},"2026-01-10":{"AJAY":920,"DEREK":2339,"SHARED":593,"LJ":116,"MARIANNA":137,"JANELY":48,"ALEX":314,"CARTER":1},"2026-01-11":{"AJAY":1295,"DEREK":3487,"SHARED":343,"LJ":434,"MARIANNA":32,"ARTURO":65,"JANELY":10,"ALEX":32},"2026-01-12":{"AJAY":332,"DEREK":1585,"SHARED":803,"LJ":136,"MARIANNA":12,"JANELY":49,"DYLAN":8,"ALEX":108},"2026-01-13":{"AJAY":844,"DEREK":1971,"SHARED":608,"LJ":320,"MARIANNA":73,"JANELY":108,"DYLAN":6,"ALEX":439},"2026-01-14":{"AJAY":1185,"DEREK":1671,"SHARED":331,"LJ":902,"MARIANNA":128,"ARTURO":224,"JANELY":24,"DYLAN":1,"ALEX":99},"2026-01-15":{"AJAY":455,"DEREK":1769,"SHARED":96,"LJ":61,"MARIANNA":2,"JANELY":25,"DYLAN":5,"ALEX":160,"CARTER":2},"2026-01-16":{"AJAY":1392,"DEREK":1651,"SHARED":471,"LJ":321,"MARIANNA":5,"JANELY":23,"ALEX":146},"2026-01-17":{"AJAY":1033,"DEREK":2346,"SHARED":640,"LJ":290,"MARIANNA":74,"JANELY":109,"DYLAN":30,"ALEX":34},"2026-01-18":{"AJAY":555,"DEREK":1743,"SHARED":279,"LJ":268,"MARIANNA":16,"ARTURO":4,"DYLAN":7,"ALEX":42},"2026-01-19":{"AJAY":480,"DEREK":3915,"SHARED":191,"LJ":311,"MARIANNA":37,"JANELY":53,"ALEX":93},"2026-01-20":{"AJAY":356,"DEREK":884,"SHARED":147,"LJ":164,"MARIANNA":10,"JANELY":4,"ALEX":93,"CARTER":3},"2026-01-21":{"AJAY":434,"DEREK":1467,"SHARED":157,"LJ":279,"ARTURO":3,"JANELY":2,"DYLAN":3,"ALEX":31},"2026-01-22":{"AJAY":618,"DEREK":1701,"SHARED":500,"LJ":445,"MARIANNA":38,"JANELY":73,"DYLAN":2,"ALEX":235},"2026-01-23":{"AJAY":416,"DEREK":3188,"SHARED":367,"LJ":139,"MARIANNA":50,"ARTURO":3,"JANELY":65,"DYLAN":3,"ALEX":111,"CARTER":1},"2026-01-24":{"AJAY":474,"DEREK":4692,"SHARED":266,"LJ":277,"MARIANNA":32,"ARTURO":115,"JANELY":65,"DYLAN":2,"ALEX":65,"CARTER":1},"2026-01-25":{"AJAY":527,"DEREK":2428,"SHARED":144,"LJ":247,"MARIANNA":21,"JANELY":13,"EVAN":5},"2026-01-26":{"AJAY":340,"DEREK":1445,"SHARED":239,"LJ":134,"MARIANNA":10,"ARTURO":300,"JANELY":10,"ALEX":612,"EVAN":5},"2026-01-27":{"AJAY":476,"DEREK":1279,"SHARED":137.97,"LJ":143,"MARIANNA":18,"JANELY":8},"2026-01-28":{"AJAY":179,"DEREK":2305,"SHARED":400,"LJ":62,"JANELY":8,"EVAN":5},"2026-01-29":{"AJAY":478,"DEREK":2183,"SHARED":216,"LJ":36,"JANELY":31,"CARTER":2},"2026-01-30":{"AJAY":217,"DEREK":2754,"SHARED":220,"LJ":654,"MARIANNA":36,"JANELY":96,"ALEX":248},"2026-01-31":{"AJAY":662,"DEREK":2094,"SHARED":1369,"LJ":585,"MARIANNA":22,"JANELY":61,"DYLAN":20,"ALEX":193},"2026-02-01":{"AJAY":595,"DEREK":674,"SHARED":20,"LJ":66,"JANELY":38,"ALEX":215},"2026-02-02":{"AJAY":158,"DEREK":1115,"SHARED":25,"LJ":78,"ALEX":70},"2026-02-03":{"AJAY":274,"DEREK":486,"SHARED":9,"LJ":131,"EVAN":14},"2026-02-04":{"AJAY":1224,"DEREK":1373,"SHARED":182,"LJ":217,"MARIANNA":56,"JANELY":55,"ALEX":206,"EVAN":43},"2026-02-05":{"AJAY":144,"DEREK":797,"SHARED":164,"LJ":16.25,"MARIANNA":3,"JANELY":3,"EVAN":34},"2026-02-06":{"AJAY":491,"DEREK":1555,"SHARED":159,"LJ":237,"JANELY":4,"ALEX":370,"NESHA":8},"2026-02-07":{"AJAY":399,"DEREK":4065,"SHARED":190.5,"LJ":484,"JANELY":45,"EVAN":110,"NESHA":1},"2026-02-08":{"AJAY":183,"DEREK":1080,"SHARED":269,"LJ":455,"JANELY":6},"2026-02-09":{"AJAY":134,"DEREK":2948,"SHARED":287,"LJ":131,"MARIANNA":4,"JANELY":21,"DYLAN":2},"2026-02-10":{"AJAY":315,"DEREK":1605,"SHARED":100,"LJ":601,"MARIANNA":1,"JANELY":4,"ALEX":25,"CARTER":3,"EVAN":7},"2026-02-11":{"AJAY":206,"DEREK":830,"SHARED":48,"LJ":52,"MARIANNA":3,"JANELY":40},"2026-02-12":{"AJAY":229,"DEREK":2078,"SHARED":369,"LJ":377,"MARIANNA":3,"JANELY":106,"DYLAN":1,"CARTER":3,"NESHA":19},"2026-02-13":{"AJAY":254,"DEREK":2986,"SHARED":327,"LJ":85,"JANELY":66,"DYLAN":2,"NESHA":23},"2026-02-14":{"AJAY":625,"DEREK":3008,"SHARED":610.5,"LJ":524,"JANELY":175,"ALEX":121,"EVAN":21},"2026-02-15":{"AJAY":237,"DEREK":1495,"SHARED":415,"LJ":354,"MARIANNA":3,"JANELY":100,"DYLAN":5,"ALEX":30,"CARTER":2,"EVAN":70},"2026-02-16":{"AJAY":694,"DEREK":1731,"SHARED":360,"LJ":369,"MARIANNA":2,"JANELY":37,"ALEX":40,"EVAN":48},"2026-02-17":{"AJAY":80,"DEREK":91,"SHARED":40,"LJ":6},"2026-02-18":{"AJAY":14,"DEREK":1109,"SHARED":35,"LJ":13,"JANELY":39},"2026-02-19":{"AJAY":287.5,"DEREK":713,"SHARED":21,"LJ":106,"JANELY":28,"ALEX":30},"2026-02-20":{"AJAY":545,"DEREK":714,"SHARED":308,"LJ":174,"MARIANNA":1,"JANELY":40,"NESHA":10},"2026-02-21":{"AJAY":446,"DEREK":2478,"SHARED":324,"LJ":163.5,"MARIANNA":4,"ARTURO":3,"JANELY":29,"DYLAN":2,"ALEX":7,"CARTER":2,"EVAN":37}};
const S_C={"2026-01-01":{"shopify":3727},"2026-01-02":{"shopify":4445,"amex":50},"2026-01-03":{"shopify":3471,"cash":158},"2026-01-04":{"shopify":3173},"2026-01-05":{"shopify":2439,"cash":61},"2026-01-06":{"shopify":2191,"cash":20,"amex":66},"2026-01-07":{"shopify":1864,"amex":330},"2026-01-08":{"shopify":3172,"amex":60},"2026-01-09":{"shopify":2010,"cash":55},"2026-01-10":{"shopify":4468,"cash":445},"2026-01-11":{"shopify":5698},"2026-01-12":{"shopify":3063,"cash":13.6},"2026-01-13":{"shopify":4369,"amex":1045},"2026-01-14":{"shopify":4579,"cash":1500,"amex":90},"2026-01-15":{"shopify":2575,"amex":112.5},"2026-01-16":{"shopify":4051,"cash":253,"amex":240},"2026-01-17":{"shopify":4556,"cash":625,"amex":70},"2026-01-18":{"shopify":2914,"cash":774,"amex":440},"2026-01-19":{"shopify":5080,"cash":1020,"amex":218},"2026-01-20":{"shopify":1661,"cash":2,"amex":105},"2026-01-21":{"shopify":2376,"cash":599,"amex":80},"2026-01-22":{"shopify":3612,"cash":665.5,"amex":160},"2026-01-23":{"shopify":4370,"cash":817,"amex":67},"2026-01-24":{"shopify":6022,"cash":114},"2026-01-25":{"shopify":3385,"cash":330,"amex":130},"2026-01-26":{"shopify":3145,"cash":156},"2026-01-27":{"shopify":2061.97,"cash":303},"2026-01-28":{"shopify":2959,"cash":1373},"2026-01-29":{"shopify":2946,"cash":38},"2026-01-30":{"shopify":4225,"cash":1063.2},"2026-01-31":{"shopify":5006,"cash":502},"2026-02-01":{"shopify":1608,"cash":324.3},"2026-02-02":{"shopify":1446,"cash":642},"2026-02-03":{"shopify":914,"square":16,"cash":36,"amex":10},"2026-02-04":{"shopify":3356,"square":144,"cash":104},"2026-02-05":{"shopify":1161.25,"square":123,"cash":242},"2026-02-06":{"shopify":2869,"square":194,"cash":1553.5},"2026-02-07":{"shopify":5556.5,"square":200,"cash":197},"2026-02-08":{"shopify":1993,"square":31,"cash":2217.55},"2026-02-09":{"shopify":3657,"square":75,"cash":706,"amex":116.26},"2026-02-10":{"shopify":2661,"square":92,"cash":63},"2026-02-11":{"shopify":1236,"square":76,"cash":595},"2026-02-12":{"shopify":3185,"square":32,"cash":1182.5},"2026-02-13":{"shopify":3743,"square":76,"cash":1336.5},"2026-02-14":{"shopify":5153.5,"square":214,"cash":786},"2026-02-15":{"shopify":2712,"square":80,"cash":893.25},"2026-02-16":{"shopify":3333,"square":144,"cash":2148},"2026-02-17":{"shopify":217,"square":201,"cash":15},"2026-02-18":{"shopify":1210,"square":702,"cash":132},"2026-02-19":{"shopify":1185.5,"square":745,"cash":1760},"2026-02-20":{"shopify":1792,"square":1180,"cash":682},"2026-02-21":{"shopify":3641.5,"square":540.27}};
const S_B={"AJAY":{"cash":1703.25,"amex":5078.49,"overall":6781.74},"DEREK":{"cash":7258.06,"amex":13231.44,"overall":20489.5},"SHARED":{"cash":-1679.85,"amex":-2172.75,"overall":-3852.6},"LJ":{"cash":-452.2,"amex":938.25,"overall":486.05},"MARIANNA":{"cash":0,"amex":5.95,"overall":5.95},"ARTURO":{"cash":0,"amex":2.55,"overall":2.55},"JANELY":{"cash":-51.35,"amex":182.75,"overall":131.4},"ALEX":{"cash":607.11,"amex":146.2,"overall":753.31},"EVAN":{"cash":0,"amex":330.36,"overall":330.36},"DYLAN":{"cash":0,"amex":7.65,"overall":7.65},"CARTER":{"cash":5.1,"amex":11.05,"overall":16.15},"NESHA":{"cash":22.95,"amex":31.88,"overall":54.83}};
const SNACKS=[{"n":"MR. BEAST TENDER BITES","p":3},{"n":"HELLO PANDA","p":1},{"n":"LITTLE BITES","p":1},{"n":"POP CORNERS","p":2},{"n":"JAYONE SEAWEED","p":1},{"n":"TAKIS","p":2},{"n":"NABISCO CLASSIC MIX","p":1},{"n":"RITZ CRACKER & CHEESE","p":1},{"n":"FRITO FLAMIN","p":2},{"n":"PIRATE BOOTY","p":1},{"n":"WONDERFUL PISTACHIOS","p":2},{"n":"PLANTERS VARIETY","p":2},{"n":"QUAKER RICE CRISPS","p":2},{"n":"CORN NUTS CHILI","p":2},{"n":"SABRITAS VARIETY","p":1}];
const SEAL_GAMES=["Pokemon","One Piece","Magic","Sports","Other"];
const SEAL_DATA={"Pokemon":{"Mega Evolution":["Base Set","Phantasmal Flames","Perfect Order"],"Scarlet & Violet":["Prismatic Evolutions","Surging Sparks","Stellar Crown","Shrouded Fable","Twilight Masquerade","Temporal Forces","Paldean Fates","Obsidian Flames","151","Paradox Rift","Scarlet & Violet Base"],"Sword & Shield":["Crown Zenith","Silver Tempest","Lost Origin","Astral Radiance","Brilliant Stars","Fusion Strike","Evolving Skies","Chilling Reign","Battle Styles","Shining Fates","Vivid Voltage","Darkness Ablaze","Rebel Clash","Sword & Shield Base"],"Sun & Moon":["Cosmic Eclipse","Hidden Fates","Unified Minds","Unbroken Bonds","Team Up","Lost Thunder","Dragon Majesty","Celestial Storm","Forbidden Light","Ultra Prism","Crimson Invasion","Burning Shadows","Guardians Rising","Sun & Moon Base"],"XY":["Evolutions","Steam Siege","Fates Collide","BREAKpoint","BREAKthrough","Ancient Origins","Roaring Skies","Primal Clash","Phantom Forces","Furious Fists","Flashfire","XY Base"],"Black & White":["Legendary Treasures","Plasma Blast","Plasma Freeze","Plasma Storm","Boundaries Crossed","Dragons Exalted","Dark Explorers","Next Destinies","Noble Victories","Emerging Powers","Black & White Base"],"Classic":["Base Set","Jungle","Fossil","Team Rocket","Gym Heroes","Gym Challenge","Neo Genesis","Neo Discovery","Neo Revelation","Neo Destiny"]},"One Piece":{"One Piece":["OP-09","OP-08","OP-07","OP-06","OP-05","OP-04","OP-03","OP-02","OP-01"]},"Magic":{"Magic":["Foundations","Duskmourn","Bloomburrow","Outlaws","Murders at Karlov","Lost Caverns","Wilds of Eldraine","Lord of the Rings","March of the Machine"]},"Sports":{"Sports":["Baseball","Basketball","Football","Hockey","Soccer"]}};
const SEAL_TYPES=["Booster Pack","Booster Box","ETB","Booster Bundle","Collection Box","Tin","Blister","Binder","Starter Deck"];
const ROLES={"AJAY":"OWNER","DEREK":"OWNER","LJ":"MANAGER","PATTY":"ASST MANAGER","JANELY":"ASST MANAGER","EVAN":"CONSIGNER","DYLAN":"CONSIGNER","NESHA":"CONSIGNER","BLUM":"CONSIGNER"};
const ROLE_ORDER=["OWNER","MANAGER","ASST MANAGER","EMPLOYEE","CONSIGNER"];
const ROLE_LABELS={"OWNER":"👑 Owners","MANAGER":"⭐ Manager","ASST MANAGER":"🌟 Assistant Managers","EMPLOYEE":"🏪 Employees","CONSIGNER":"📦 Consigners"};
const ROLE_COLORS={"OWNER":"#f59e0b","MANAGER":"#8b5cf6","ASST MANAGER":"#ec4899","EMPLOYEE":"#10b981","CONSIGNER":"#71717a"};
const S_SC={"2026-01-01":{"LJ":2,"ALEX":21,"ARTURO":3,"GUEST":37,"_t":63},"2026-01-02":{"DEREK":1,"PATTY":10,"JANELY":20,"CARTER":29,"MYKA":1,"_t":61},"2026-01-03":{"AJAY":2,"PATTY":4,"JANELY":34,"CARTER":28,"_t":68},"2026-01-04":{"AJAY":1,"DEREK":2,"LJ":5,"PATTY":15,"MARIANNA":22,"_t":45},"2026-01-05":{"LJ":21,"ARTURO":4,"_t":25},"2026-01-06":{"AJAY":3,"DEREK":4,"LJ":9,"ARTURO":5,"_t":21},"2026-01-07":{"DEREK":1,"ALEX":15,"HANNAH":14,"_t":30},"2026-01-08":{"AJAY":5,"DEREK":1,"LJ":10,"ALEX":7,"HANNAH":26,"_t":49},"2026-01-09":{"DEREK":1,"LJ":6,"JANELY":22,"MARIANNA":1,"CARTER":3,"_t":33},"2026-01-10":{"DEREK":11,"JANELY":19,"ARTURO":8,"CARTER":31,"_t":69},"2026-01-11":{"DEREK":1,"PATTY":39,"MARIANNA":32,"_t":72},"2026-01-12":{"AJAY":1,"DEREK":3,"LJ":2,"ALEX":11,"PATTY":7,"JANELY":6,"_t":30},"2026-01-13":{"AJAY":3,"DEREK":1,"_t":4},"2026-01-14":{"AJAY":1,"PATTY":44,"_t":45},"2026-01-15":{"DEREK":3,"ALEX":9,"PATTY":1,"MARIANNA":2,"HANNAH":22,"_t":37},"2026-01-16":{"DEREK":7,"LJ":4,"JANELY":26,"CARTER":21,"_t":58},"2026-01-17":{"DEREK":2,"LJ":6,"JANELY":25,"MARIANNA":22,"CARTER":21,"_t":76},"2026-01-18":{"AJAY":1,"DEREK":8,"LJ":14,"PATTY":22,"MYKA":11,"_t":56},"2026-01-19":{"AJAY":8,"DEREK":12,"LJ":29,"_t":49},"2026-01-20":{"DEREK":3,"LJ":2,"ALEX":9,"PATTY":8,"HANNAH":9,"_t":31},"2026-01-21":{"DEREK":1,"PATTY":24,"HANNAH":5,"_t":30},"2026-01-22":{"DEREK":11,"ARTURO":17,"HANNAH":14,"_t":42},"2026-01-23":{"AJAY":5,"DEREK":22,"LJ":2,"JANELY":23,"_t":52},"2026-01-24":{"AJAY":1,"DEREK":7,"JANELY":38,"MARIANNA":17,"CARTER":21,"_t":84},"2026-01-25":{"DEREK":3,"LJ":16,"MARIANNA":14,"MYKA":18,"_t":51},"2026-01-26":{"AJAY":2,"LJ":9,"JANELY":18,"_t":29},"2026-01-27":{"DEREK":4,"PATTY":10,"MARIANNA":8,"_t":22},"2026-01-28":{"DEREK":4,"LJ":6,"PATTY":3,"JANELY":25,"HANNAH":7,"_t":45},"2026-01-29":{"AJAY":1,"DEREK":1,"LJ":1,"PATTY":15,"MARIANNA":11,"ARTURO":9,"_t":38},"2026-01-30":{"LJ":13,"JANELY":26,"_t":39},"2026-01-31":{"AJAY":3,"LJ":4,"JANELY":25,"MARIANNA":12,"CARTER":26,"_t":70},"2026-02-01":{"AJAY":1,"DEREK":4,"JANELY":11,"MYKA":5,"_t":21},"2026-02-02":{"AJAY":2,"DEREK":1,"LJ":2,"JANELY":13,"_t":18},"2026-02-03":{"AJAY":1,"DEREK":1,"LJ":3,"PATTY":4,"JANELY":7,"_t":16},"2026-02-04":{"AJAY":4,"DEREK":1,"LJ":13,"ALEX":2,"MARIANNA":7,"_t":27},"2026-02-05":{"AJAY":5,"ALEX":8,"PATTY":6,"_t":19},"2026-02-06":{"LJ":15,"JANELY":16,"CARTER":7,"_t":38},"2026-02-07":{"AJAY":3,"DEREK":4,"LJ":10,"PATTY":1,"JANELY":32,"ARTURO":3,"CARTER":16,"MYKA":1,"_t":70},"2026-02-08":{"DEREK":1,"LJ":6,"JANELY":16,"MARIANNA":3,"_t":26},"2026-02-09":{"DEREK":1,"LJ":14,"JANELY":12,"MARIANNA":5,"_t":32},"2026-02-10":{"AJAY":2,"LJ":7,"PATTY":4,"JANELY":10,"_t":23},"2026-02-11":{"DEREK":2,"LJ":6,"ALEX":6,"HANNAH":4,"_t":18},"2026-02-12":{"AJAY":5,"DEREK":2,"LJ":4,"ALEX":9,"PATTY":5,"_t":25},"2026-02-13":{"AJAY":2,"LJ":20,"JANELY":18,"CARTER":6,"_t":46},"2026-02-14":{"AJAY":3,"LJ":6,"PATTY":3,"MARIANNA":17,"CARTER":32,"MYKA":19,"_t":80},"2026-02-15":{"LJ":4,"JANELY":22,"MARIANNA":17,"_t":43},"2026-02-16":{"DEREK":1,"LJ":12,"JANELY":22,"_t":35},"2026-02-17":{"PATTY":2,"JANELY":4,"MARIANNA":1,"_t":7},"2026-02-18":{"AJAY":2,"DEREK":3,"ALEX":1,"_t":6},"2026-02-19":{"AJAY":4,"DEREK":2,"ALEX":5,"_t":11},"2026-02-20":{"AJAY":2,"DEREK":1,"LJ":9,"JANELY":10,"_t":22},"2026-02-21":{"AJAY":2,"DEREK":7,"LJ":9,"PATTY":5,"JANELY":24,"_t":47}};
const S_RB={"2026-01-01":{"A":544,"D":2491,"S":98,"L":474},"2026-01-02":{"A":1193,"D":5489,"S":119,"L":911},"2026-01-03":{"A":1882,"D":7507,"S":149,"L":1018},"2026-01-04":{"A":2449,"D":9723,"S":149,"L":1285},"2026-01-05":{"A":2811,"D":11558,"S":149,"L":1516},"2026-01-06":{"A":3267,"D":12614,"S":149,"L":2108},"2026-01-07":{"A":3720,"D":13716,"S":165,"L":2249},"2026-01-08":{"A":4173,"D":15561,"S":697,"L":2508},"2026-01-09":{"A":4734,"D":16277,"S":960,"L":2932},"2026-01-10":{"A":5654,"D":18616,"S":1553,"L":3048},"2026-01-11":{"A":6949,"D":22103,"S":1896,"L":3482},"2026-01-12":{"A":7281,"D":23688,"S":2699,"L":3618},"2026-01-13":{"A":8125,"D":25659,"S":3307,"L":3938},"2026-01-14":{"A":9310,"D":27330,"S":3638,"L":4840},"2026-01-15":{"A":9765,"D":29099,"S":3734,"L":4901},"2026-01-16":{"A":11157,"D":30750,"S":4205,"L":5222},"2026-01-17":{"A":12190,"D":33096,"S":4845,"L":5512},"2026-01-18":{"A":12745,"D":34839,"S":5124,"L":5780},"2026-01-19":{"A":13225,"D":38754,"S":5315,"L":6091},"2026-01-20":{"A":13581,"D":39638,"S":5462,"L":6255},"2026-01-21":{"A":14015,"D":41105,"S":5619,"L":6534},"2026-01-22":{"A":14633,"D":42806,"S":6119,"L":6979},"2026-01-23":{"A":15049,"D":45994,"S":6486,"L":7118},"2026-01-24":{"A":15523,"D":50686,"S":6752,"L":7395},"2026-01-25":{"A":16050,"D":53114,"S":6896,"L":7642},"2026-01-26":{"A":16390,"D":54559,"S":7135,"L":7776},"2026-01-27":{"A":16866,"D":55838,"S":7273,"L":7919},"2026-01-28":{"A":17045,"D":58143,"S":7673,"L":7981},"2026-01-29":{"A":17523,"D":60326,"S":7889,"L":8017},"2026-01-30":{"A":17740,"D":63080,"S":8109,"L":8671},"2026-01-31":{"A":18402,"D":65174,"S":9478,"L":9256},"2026-02-01":{"A":18997,"D":65848,"S":9498,"L":9322},"2026-02-02":{"A":19155,"D":66963,"S":9523,"L":9400},"2026-02-03":{"A":19429,"D":67449,"S":9532,"L":9531},"2026-02-04":{"A":20653,"D":68822,"S":9714,"L":9748},"2026-02-05":{"A":20797,"D":69619,"S":9878,"L":9764},"2026-02-06":{"A":21288,"D":71174,"S":10037,"L":10001},"2026-02-07":{"A":21687,"D":75239,"S":10227,"L":10485},"2026-02-08":{"A":21870,"D":76319,"S":10496,"L":10940},"2026-02-09":{"A":22004,"D":79267,"S":10783,"L":11071},"2026-02-10":{"A":22319,"D":80872,"S":10883,"L":11672},"2026-02-11":{"A":22525,"D":81702,"S":10931,"L":11724},"2026-02-12":{"A":22754,"D":83780,"S":11300,"L":12101},"2026-02-13":{"A":23008,"D":86766,"S":11627,"L":12186},"2026-02-14":{"A":23633,"D":89774,"S":12238,"L":12710},"2026-02-15":{"A":23870,"D":91269,"S":12653,"L":13064},"2026-02-16":{"A":24564,"D":93000,"S":13013,"L":13433},"2026-02-17":{"A":24644,"D":93091,"S":13053,"L":13439},"2026-02-18":{"A":24658,"D":94200,"S":13088,"L":13452},"2026-02-19":{"A":24946,"D":94913,"S":13109,"L":13558},"2026-02-20":{"A":25491,"D":95627,"S":13417,"L":13732},"2026-02-21":{"A":25937,"D":98105,"S":13741,"L":13896}};
const S_SA={"AJAY":{"o":75,"a":7872,"po":105,"h":97},"DEREK":{"o":146,"a":13170,"po":90,"h":53},"LJ":{"h":210,"o":301,"a":25568,"po":85},"MARIANNA":{"h":92,"o":191,"a":15989,"po":84},"ARTURO":{"h":60,"o":49,"a":5394,"po":110},"HANNAH":{"h":113,"o":101,"a":6323,"po":63},"JANELY":{"h":204,"o":524,"a":41088,"po":78},"PATTY":{"h":149,"o":232,"a":17465,"po":75},"ALEX":{"h":84,"o":103,"a":6595,"po":64},"CARTER":{"h":80,"o":241,"a":13237,"po":55},"MYKA":{"h":54,"o":37,"a":2247,"po":61},"GUEST":{"o":37,"a":2247,"po":61}};
const S_X={"2026-01-02":{"DEREK":50.0},"2026-01-03":{"AJAY":38.0,"DEREK":120.0},"2026-01-05":{"AJAY":8.0,"DEREK":53.0},"2026-01-06":{"DEREK":25.0,"JANELY":1.0,"AJAY":60.0},"2026-01-07":{"DEREK":130.0,"LJ":200.0},"2026-01-08":{"DEREK":60.0},"2026-01-09":{"SHARED":55.0},"2026-01-10":{"AJAY":120.0,"DEREK":277.0,"SHARED":41.0,"LJ":6.0,"JANELY":1.0},"2026-01-12":{"DEREK":13.6},"2026-01-13":{"DEREK":1000.0,"LJ":45.0},"2026-01-14":{"AJAY":1500.0,"LJ":90.0},"2026-01-15":{"LJ":112.5},"2026-01-16":{"AJAY":31.0,"DEREK":130.0,"SHARED":84.0,"LJ":248.0},"2026-01-17":{"AJAY":464.0,"DEREK":61.0,"SHARED":110.0,"LJ":60.0},"2026-01-18":{"DEREK":892.0,"SHARED":22.0,"LJ":160.0,"AJAY":140.0},"2026-01-19":{"AJAY":314.0,"DEREK":816.0,"SHARED":23.0,"LJ":85.0},"2026-01-20":{"SHARED":2.0,"AJAY":30.0,"DEREK":75.0},"2026-01-21":{"DEREK":655.0,"SHARED":10.0,"LJ":14.0},"2026-01-22":{"AJAY":473.0,"DEREK":333.5,"SHARED":15.0,"LJ":4.0},"2026-01-23":{"AJAY":230.0,"DEREK":577.0,"SHARED":9.0,"LJ":68.0},"2026-01-24":{"AJAY":21.0,"DEREK":16.0,"SHARED":11.0,"LJ":26.0,"JANELY":40.0},"2026-01-25":{"AJAY":127.0,"DEREK":278.0,"JANELY":55.0},"2026-01-26":{"AJAY":2.0,"DEREK":154.0},"2026-01-27":{"AJAY":4.0,"DEREK":144.0,"SHARED":130.0,"LJ":25.0},"2026-01-28":{"AJAY":74.0,"DEREK":755.0,"SHARED":131.0,"LJ":413.0},"2026-01-29":{"AJAY":18.0,"DEREK":20.0},"2026-01-30":{"AJAY":317.0,"DEREK":533.0,"SHARED":102.0,"LJ":17.0,"JANELY":15.0,"ALEX":79.2},"2026-01-31":{"AJAY":18.0,"DEREK":231.0,"SHARED":84.0,"LJ":169.0},"2026-02-01":{"AJAY":37.5,"DEREK":200.0,"SHARED":40.0,"LJ":31.0,"JANELY":9.0,"ALEX":6.8},"2026-02-02":{"AJAY":119.0,"DEREK":115.0,"SHARED":336.0,"LJ":72.0},"2026-02-03":{"DEREK":13.0,"SHARED":33.0,"LJ":3.0,"AJAY":10.0,"DYLAN":3.0},"2026-02-04":{"AJAY":43.0,"DEREK":171.0,"SHARED":34.0},"2026-02-05":{"AJAY":111.0,"DEREK":160.0,"SHARED":43.0,"LJ":51.0},"2026-02-06":{"AJAY":238.0,"DEREK":657.0,"SHARED":532.5,"LJ":205.0,"JANELY":112.0,"MARIANNA":1.0,"DYLAN":2.0},"2026-02-07":{"AJAY":112.0,"DEREK":268.0,"LJ":10.0,"SHARED":7.0},"2026-02-08":{"AJAY":890.5,"DEREK":1060.5,"SHARED":218.0,"LJ":72.0,"MARIANNA":4.55,"JANELY":3.0},"2026-02-09":{"AJAY":387.26,"DEREK":208.0,"SHARED":202.0,"LJ":92.0,"ALEX":8.0},"2026-02-10":{"AJAY":32.0,"DEREK":60.0,"LJ":52.0,"SHARED":9.0,"JANELY":2.0},"2026-02-11":{"AJAY":14.0,"DEREK":153.0,"SHARED":402.0,"LJ":100.0,"JANELY":2.0},"2026-02-12":{"AJAY":355.0,"DEREK":793.5,"SHARED":20.0,"LJ":43.0,"JANELY":3.0},"2026-02-13":{"AJAY":171.0,"DEREK":1061.5,"SHARED":103.0,"LJ":77.0},"2026-02-14":{"AJAY":46.0,"DEREK":811.0,"SHARED":30.0,"LJ":101.0,"JANELY":10.0,"ARTURO":2.0},"2026-02-15":{"AJAY":32.0,"DEREK":391.5,"SHARED":436.0,"LJ":84.0,"JANELY":29.75},"2026-02-16":{"AJAY":286.0,"DEREK":1570.0,"SHARED":146.0,"LJ":238.0,"JANELY":52.0},"2026-02-17":{"AJAY":99.0,"JANELY":3.0,"DEREK":81.0,"SHARED":33.0},"2026-02-18":{"AJAY":159.0,"SHARED":72.0,"LJ":64.0,"JANELY":51.0,"DEREK":479.0,"EVAN":9.0},"2026-02-19":{"AJAY":722.0,"DEREK":1073.0,"SHARED":542.0,"LJ":93.0,"ALEX":65.0,"EVAN":10.0},"2026-02-20":{"AJAY":119.0,"DEREK":1414.0,"SHARED":201.0,"LJ":91.0,"JANELY":5.0,"DYLAN":2.0,"ALEX":30.0},"2026-02-21":{"AJAY":95.0,"DEREK":357.0,"SHARED":47.27,"LJ":27.0,"EVAN":14.0}};
const STF=["JANELY","LJ","CARTER","PATTY","MARIANNA","DEREK","ALEX","AJAY","HANNAH","ARTURO","MYKA","GUEST"];
const STC={"JANELY":"#ec4899","LJ":"#ef4444","CARTER":"#14b8a6","PATTY":"#f472b6","MARIANNA":"#f97316","DEREK":"#3b82f6","ALEX":"#a78bfa","AJAY":"#f59e0b","HANNAH":"#c084fc","ARTURO":"#84cc16","MYKA":"#818cf8","GUEST":"#78716c"};
const CID={"0001":"DEREK","0002":"AJAY","0012":"SHARED","0063":"LJ","0003":"DEREK","0004":"MARIANNA","0005":"ARTURO","0006":"HANNAH","0007":"JANELY","0008":"BLUM","0009":"DYLAN","0010":"ALEX","0011":"CARTER","0013":"EVAN","0014":"NESHA"};

const PP=["DEREK","AJAY","SHARED","LJ","ALEX","JANELY","EVAN","MARIANNA","ARTURO","DYLAN","CARTER","NESHA","HANNAH","BLUM","PATTY","MYKA"];
const CO={"DEREK":"#3b82f6","AJAY":"#f59e0b","SHARED":"#10b981","LJ":"#ef4444","ALEX":"#a78bfa","JANELY":"#ec4899","EVAN":"#06b6d4","MARIANNA":"#f97316","ARTURO":"#84cc16","DYLAN":"#818cf8","CARTER":"#14b8a6","NESHA":"#fb7185","HANNAH":"#c084fc","BLUM":"#78716c","PATTY":"#f472b6","MYKA":"#818cf8","GUEST":"#78716c"};
const CC={"shopify":"#96bf48","square":"#555d63","cash":"#22c55e","amex":"#3b82f6"};
const CL={"shopify":"Shopify","square":"Square","cash":"Cash","amex":"Amex"};
const CSG={"JC":"JANELY","EVD":"EVAN","DG":"DYLAN","DC":"CARTER","MR":"MARIANNA"};
const DM={"JANELY":"JANELY","DEREKS 16":"DEREK","KINGLY 16":"DEREK","PATRICIA 14":"SHARED","VEROS IPHONE":"AJAY"};
const F=v=>v>=1000?`$${(v/1000).toFixed(1)}K`:`$${Math.round(v)}`;
const FF=v=>`$${v.toLocaleString("en-US",{maximumFractionDigits:0})}`;
const FX=v=>`$${v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const SD=d=>{const[,m,day]=d.split("-");return["","Jan","Feb","Mar"][+m]+" "+(+day);};

function parseOwner(name){if(!name)return"SHARED";const s=String(name).toUpperCase();
  const cm=s.match(/\b(000[1-9]|001[0-4]|0063)\b/);if(cm&&CID[cm[1]])return CID[cm[1]];
  const ab=s.match(/\(\s*(JC|DG|DC|MR|EVD)\s*\)/);if(ab&&CSG[ab[1]])return CSG[ab[1]];
  const tm=s.match(/[-]\s*-?\s*(DEREK|AJAY|SHARED|LJ|MARIANNA|ARTURO|HANNAH|JANELY|BLUM|DYLAN|ALEX|CARTER|EVAN|NESHA)\s*$/);if(tm)return tm[1];
  const pm=s.match(/\(([^)]+)\)\s*$/);if(pm){const i=pm[1].trim();if(PP.includes(i))return i;if(i==="SHOP")return"SHARED";if(CSG[i])return CSG[i];}
  for(const k of PP)if(s.includes(k+" ")||s.includes(" "+k)||s.endsWith(k)||s.startsWith(k))return k;
  if(s.includes("(SHOP)"))return"SHARED";return"UNKNOWN";}
function parseSqOwner(n,dev,pplInfo){const s=String(n||"").toUpperCase();
  const pm=s.match(/\(([^)]+)\)/);if(pm)for(const p of PP)if(pm[1].includes(p))return{o:p,c:"hi"};
  for(const k of PP)if(s.includes(k))return{o:k,c:"hi"};
  for(const[a,o]of Object.entries(CSG))if(s.includes(a))return{o,c:"hi"};
  if(pplInfo)for(const[name,info]of Object.entries(pplInfo)){if(info.consignId&&s.includes(info.consignId.toUpperCase()))return{o:name,c:"hi"};}
  if(dev){const d=String(dev).toUpperCase().trim();if(DM[d])return{o:DM[d],c:"dev"};}
  return{o:"UNKNOWN",c:"no"};}
function parseShopifyCSV(t){const{data:rows}=Papa.parse(t,{header:true,skipEmptyLines:true});const items=[];const om={};
  for(const r of rows){const ord=r["Name"]||"";const cr=r["Created at"]||"";if(!cr)continue;const date=cr.substring(0,10);
    const amt=(parseFloat(r["Lineitem price"])||0)*(parseInt(r["Lineitem quantity"])||1);if(amt<=0)continue;
    const pm=r["Payment Method"]||"";const owner=parseOwner(r["Lineitem name"]);const finStatus=(r["Financial Status"]||"").toLowerCase();
    if(!om[ord])om[ord]={m:new Set(),owners:new Set(),count:0,hasSplitPay:false,refunded:false};if(pm)om[ord].m.add(pm);om[ord].owners.add(owner);om[ord].count++;
    if(pm.includes("+"))om[ord].hasSplitPay=true;
    if(finStatus==="refunded"||finStatus==="partially_refunded")om[ord].refunded=true;
    const fl=[];if(owner==="UNKNOWN")fl.push("unknown");if(finStatus==="refunded"||finStatus==="partially_refunded")fl.push("refunded");
    items.push({id:items.length,order:ord,date,name:String(r["Lineitem name"]||"").substring(0,80),amt,owner,pm,fl});}
  for(const it of items){const o=om[it.order];if(!o)continue;const m=[...o.m];
    if(m.some(x=>x.includes("Custom")&&x.includes("POS")))it.fl.push("trade_credit");
    if(m.every(x=>x==="Cash"))it.fl.push("cash_order");
    if(o.hasSplitPay)it.fl.push("split_pay");
    if(o.refunded&&!it.fl.includes("refunded"))it.fl.push("refunded");}
  return{items,channel:"shopify"};}
function parseSquareCSV(t,pplInfo){const{data:rows}=Papa.parse(t,{header:true,skipEmptyLines:true});const items=[];
  for(const r of rows){const date=r["Date"];if(!date)continue;
    const amt=parseFloat(String(r["Net Sales"]||"0").replace(/[$,]/g,""))||0;if(amt<=0)continue;
    const n=r["Notes"]||"";const dev=r["Device Name"]||"";const{o:owner,c:conf}=parseSqOwner(n,dev,pplInfo);
    const fl=[];if(owner==="UNKNOWN")fl.push("unknown");else if(conf==="dev")fl.push("device_guess");
    if(!n||n==="nan")fl.push("no_notes");
    items.push({id:items.length,date,name:n||"Custom Amount",amt,owner,fl,device:dev,order:""});}
  return{items,channel:"square"};}
function parseDiscord(text){const blocks=text.split(/(?=🛒)/);const allItems=[];let mainCh="cash";const date=new Date().toISOString().slice(0,10);
  for(const block of blocks){if(!block.trim())continue;const lines=block.split('\n').map(l=>l.trim());let channel="cash";let txnId="";
    const txIdM=block.match(/Transaction:\s*(POS-[A-Z0-9]+)/i);if(txIdM)txnId=txIdM[1];
    for(let i=0;i<lines.length;i++){const l=lines[i];
      if(/^payment$/i.test(l)&&lines[i+1]){const pm=lines[i+1].toLowerCase().trim();if(pm.includes("square"))channel="square";else if(pm.includes("amex"))channel="amex";else if(pm.includes("shopify"))channel="shopify";else channel="cash";}
      const pmM=l.match(/^payment[:\s]+(.+)/i);if(pmM){const pm=pmM[1].toLowerCase().trim();if(pm.includes("square"))channel="square";else if(pm.includes("amex"))channel="amex";else if(pm.includes("shopify"))channel="shopify";else channel="cash";}
      const im=l.match(/^[•·\-]\s*(.+?)\s*(?:—|=)\s*\$([0-9,.]+)\s*\((\w+)\)\s*$/);
      if(im){const name=im[1].split('—')[0].trim().substring(0,80);const amt=parseFloat(im[2].replace(/,/g,""))||0;const ow=im[3].toUpperCase();const owner=PP.includes(ow)?ow:"UNKNOWN";
        if(amt>0)allItems.push({id:allItems.length,date,name,amt,owner,fl:owner==="UNKNOWN"?["unknown"]:[],order:txnId,device:""});}}
    const txM=block.match(/\+\s*\$([0-9,.]+)\s*tax/i);
    if(txM){const tax=parseFloat(txM[1].replace(/,/g,""))||0;if(tax>0)allItems.push({id:allItems.length,date,name:"Tax",amt:tax,owner:"SHARED",fl:["tax"],order:txnId,device:""});}
    if(allItems.length>0)mainCh=channel;}
  return{items:allItems,channel:mainCh};}
const TT=({active,payload,label})=>{if(!active||!payload)return null;const it=payload.filter(p=>p.value>0&&p.dataKey!=="_t"&&p.dataKey!=="_total").sort((a,b)=>b.value-a.value);const tot=it.reduce((s,p)=>s+p.value,0);
  return(<div style={{background:"#27272a",border:"1px solid #3f3f46",borderRadius:10,padding:"12px 16px",boxShadow:"0 8px 32px rgba(0,0,0,.5)",minWidth:150}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,gap:16}}><span style={{color:"#fafafa",fontWeight:700,fontSize:12}}>{label}</span><span style={{color:AC,fontWeight:700,fontSize:11,fontFamily:"monospace"}}>{FF(tot)}</span></div>
    {it.map((p,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",gap:16,padding:"1px 0"}}><div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:6,height:6,borderRadius:"50%",background:p.stroke||p.fill}}/><span style={{color:"#d4d4d8",fontSize:10}}>{p.dataKey}</span></div><span style={{color:"#ddd",fontFamily:"monospace",fontSize:10}}>{FF(p.value)}</span></div>))}</div>);};
const FC={"unknown":"#ef4444","trade_credit":"#a78bfa","cash_order":"#f59e0b","device_guess":"#06b6d4","no_notes":"#666","split_order":"#ec4899","multi_item":"#818cf8","split_pay":"#f97316","refunded":"#dc2626","tax":"#71717a"};
const FL={"unknown":"⚠ Unknown","trade_credit":"💳 Trade/Credit","cash_order":"💵 Cash Only","device_guess":"📱 Device","no_notes":"📝 No Notes","split_order":"👥 Split Owner","multi_item":"📦 Multi-Item","split_pay":"💰 Split Pay","refunded":"🔴 Refunded","tax":"🧾 Tax"};

export default function App(){
  const SHOP_FEE=0.03;const SHOP_FEE_START="2026-02-14";
  const ownSet0=new Set(["AJAY","DEREK","SHARED"]);
  const NOW=new Date();const _ld=new Date(NOW.toLocaleString("en-US",{timeZone:"America/Los_Angeles"}));const TODAY=`${_ld.getFullYear()}-${String(_ld.getMonth()+1).padStart(2,"0")}-${String(_ld.getDate()).padStart(2,"0")}`;
  const daysAgo=(n)=>{const d=new Date(_ld);d.setDate(d.getDate()-n);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;};
  const monthStart=(d=NOW)=>d.toISOString().slice(0,8)+"01";
  const LAST_BACKEND_DATE=Object.keys(S_D).sort().pop()||TODAY;
  const S_ALL=useMemo(()=>{const m={};Object.entries(S_D).forEach(([d,pp])=>{m[d]={};Object.entries(pp).forEach(([p,v])=>{if(d>=SHOP_FEE_START&&ownSet0.has(p)){m[d][p]=Math.round(v*(1-SHOP_FEE)*100)/100;}else{m[d][p]=v;}});});Object.entries(S_X||{}).forEach(([d,pp])=>{if(!m[d])m[d]={};Object.entries(pp).forEach(([p,v])=>{m[d]={...m[d]};m[d][p]=(m[d][p]||0)+v;});});return m;},[]);
  const S_C_NET=useMemo(()=>{const m={};Object.entries(S_C).forEach(([d,chs])=>{m[d]={...chs};if(d>=SHOP_FEE_START&&m[d].shopify)m[d].shopify=Math.round(m[d].shopify*(1-SHOP_FEE)*100)/100;});return m;},[]);
  const[dd,sDD]=useState(S_ALL);const[cd,sCD]=useState(S_C_NET);const[entries,sE]=useState([]);
  const[df,sDF]=useState(daysAgo(7));const[dt,sDT]=useState(TODAY);
  const[sp,sSP]=useState(["DEREK","AJAY","LJ","SHARED"]);const[search,sSR]=useState("");
  const[authed,sAuthed]=useState(false);const[viewOnly,sViewOnly]=useState(false);const[loginPw,sLoginPw]=useState("");const[showPw,sShowPw]=useState(false);
  const[pwStore,sPwStore]=useState({});
  const[upStatus,sUpStatus]=useState(null);const[lastBackup,sLastBackup]=useState(null);
  const[ejsCfg,sEjsCfg]=useState({serviceId:"",templateId:"",publicKey:"",fromEmail:""});
  const UI_DEF={accent:"#f59e0b",fontSize:"md",density:"normal",theme:"dark",tabPos:"top",hidden:{}};
  const[uiCfg,sUiCfg]=useState(()=>{try{return{...UI_DEF,...JSON.parse(localStorage.getItem("ub-ui"))}}catch(e){return{...UI_DEF}}});
  const setUI=(k,v)=>sUiCfg(c=>{const n={...c,[k]:v};try{localStorage.setItem("ub-ui",JSON.stringify(n))}catch(e){}return n});
  const AC=uiCfg.accent;
  const T=uiCfg.theme==="light"?{bg:"#f4f4f5",card:"#ffffff",border:"#d4d4d8",text:"#18181b",muted:"#71717a",subtle:"#a1a1aa",hover:"#e4e4e7",inputBg:"#f4f4f5",scheme:"light",overlay:"rgba(255,255,255,.85)",tabBg:"rgba(228,228,231,.5)",tabActive:"#d4d4d8",loginBg:"#e4e4e7",toast:"#ffffff"}:{bg:"#18181b",card:"#27272a",border:"#3f3f46",text:"#fafafa",muted:"#71717a",subtle:"#a1a1aa",hover:"#3f3f46",inputBg:"#27272a",scheme:"dark",overlay:"rgba(0,0,0,.85)",tabBg:"rgba(63,63,70,.3)",tabActive:"#3f3f46",loginBg:"#09090b",toast:"#27272a"};
  const FM=uiCfg.fontSize==="sm"?0.85:uiCfg.fontSize==="lg"?1.15:1;
  const fs=n=>Math.round(n*FM);
  const DM=uiCfg.density==="compact"?0.7:uiCfg.density==="spacious"?1.3:1;
  const ds=n=>Math.round(n*DM);
  const[zoomLvl,sZoomLvl]=useState(()=>{try{return parseFloat(localStorage.getItem("ub-zoom"))||1;}catch(e){return 1;}});
  useEffect(()=>{document.body.style.zoom=zoomLvl;},[zoomLvl]);
  useEffect(()=>{const h=e=>{if(!e.ctrlKey)return;if(e.key==="="||e.key==="+"){e.preventDefault();sZoomLvl(z=>{const n=Math.min(Math.round((z+0.1)*10)/10,2);try{localStorage.setItem("ub-zoom",String(n));}catch(x){}return n;});}
    if(e.key==="-"){e.preventDefault();sZoomLvl(z=>{const n=Math.max(Math.round((z-0.1)*10)/10,0.5);try{localStorage.setItem("ub-zoom",String(n));}catch(x){}return n;});}
    if(e.key==="0"){e.preventDefault();sZoomLvl(1);try{localStorage.setItem("ub-zoom","1");}catch(x){}}};
    window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[]);
  useEffect(()=>{if(!authed)return;let timer=setTimeout(()=>{try{localStorage.removeItem("ub-auth");}catch(e){}sAuthed(false);sLoginPw("");},5*60*1000);
    const reset=()=>{clearTimeout(timer);timer=setTimeout(()=>{try{localStorage.removeItem("ub-auth");}catch(e){}sAuthed(false);sLoginPw("");},5*60*1000);};
    const evts=["mousemove","mousedown","keydown","touchstart","scroll"];evts.forEach(e=>window.addEventListener(e,reset));
    return()=>{clearTimeout(timer);evts.forEach(e=>window.removeEventListener(e,reset));};},[authed]);
  useEffect(()=>{(async()=>{try{const r=(() => { try { const v = localStorage.getItem("ub-auth"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r?.value){sAuthed(true);if(r.value==="view")sViewOnly(true);}}catch(e){}
    try{const r=(() => { try { const v = localStorage.getItem("ub-vault"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r?.value)sPwStore(JSON.parse(r.value));}catch(e){}
    try{const r=(() => { try { const v = localStorage.getItem("ub-ejs"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r?.value)sEjsCfg(JSON.parse(r.value));}catch(e){}})();},[]);
  const svVault=async v=>{try{(() => { try { localStorage.setItem("ub-vault", JSON.stringify(v)); return { value: JSON.stringify(v) }; } catch(e) { return null; } })();}catch(e){}};
  const svEjs=cfg=>{try{localStorage.setItem("ub-ejs",JSON.stringify(cfg));}catch(e){}};
  const sendPayoutEmail=async(toEmail,toName,amount,fromDate,toDate)=>{
    if(!ejsCfg.serviceId||!ejsCfg.templateId||!ejsCfg.publicKey){tw("⚠ Set up EmailJS in Settings first");return false;}
    try{const res=await fetch("https://api.emailjs.com/api/v1.0/email/send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({service_id:ejsCfg.serviceId,template_id:ejsCfg.templateId,user_id:ejsCfg.publicKey,template_params:{to_email:toEmail,to_name:toName,from_email:ejsCfg.fromEmail||"noreply@unboxedtcg.com",amount:amount.toFixed(2),from_date:fromDate,to_date:toDate}})});if(!res.ok){const t=await res.text();throw new Error(t);}return true;}catch(e){tw(`⚠ Email failed: ${e?.message||"unknown error"}`);return false;}
  };
  const PINS={full:"2026",view:"0201"};
  const tryLogin=(pw)=>{if(pw===PINS.full){sAuthed(true);sViewOnly(false);try{localStorage.setItem("ub-auth","full");}catch(e){}}else if(pw===PINS.view){sAuthed(true);sViewOnly(true);try{localStorage.setItem("ub-auth","view");}catch(e){}}else{sLoginPw("");alert("Wrong PIN");}};
  const loginScreen=(<div style={{minHeight:"100vh",background:T.loginBg,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{width:"100%",maxWidth:340,textAlign:"center"}}>
      <div style={{fontSize:fs(28),fontWeight:900,color:T.text,marginBottom:4}}>UNBOXED TCG</div>
      <div style={{color:T.muted,fontSize:fs(10),marginBottom:32}}>Arden Fair Mall · Sacramento</div>
      <div style={{background:T.card,borderRadius:12,padding:ds(24),border:`1px solid ${T.border}`}}>
        <div style={{color:T.subtle,fontSize:fs(10),fontWeight:600,letterSpacing:1,marginBottom:12}}>ENTER PIN</div>
        <input type="password" value={loginPw} onChange={e=>sLoginPw(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")tryLogin(loginPw);}} placeholder="••••" style={{width:"100%",padding:"12px",borderRadius:8,border:`1px solid ${T.border}`,background:T.bg,color:T.text,fontSize:fs(18),textAlign:"center",letterSpacing:8,outline:"none",fontFamily:"monospace",marginBottom:12}}/>
        <button onClick={()=>tryLogin(loginPw)} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:AC,color:"#000",cursor:"pointer",fontSize:fs(13),fontWeight:700,marginBottom:16}}>Unlock</button>
        <div style={{borderTop:"1px solid #27272a",paddingTop:16,marginTop:8}}>
          <div style={{color:"#71717a",fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:10}}>🔒 SECURE NOTES</div>
          {Object.entries(pwStore).map(([k,v])=>(<div key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
            <span style={{color:"#a1a1aa",fontSize:9,fontWeight:600,minWidth:70}}>{k}</span>
            <span style={{color:"#fafafa",fontSize:10,fontFamily:"monospace",flex:1,wordBreak:"break-all"}}>{showPw?v:"••••••••"}</span>
            <button onClick={()=>{const nv={...pwStore};delete nv[k];sPwStore(nv);svVault(nv);}} style={{background:"transparent",border:"none",color:"#52525b",cursor:"pointer",fontSize:10}}>×</button>
          </div>))}
          <button onClick={()=>sShowPw(!showPw)} style={{background:"transparent",border:"1px solid #3f3f46",borderRadius:4,color:"#52525b",cursor:"pointer",fontSize:8,padding:"2px 8px",marginBottom:8}}>{showPw?"Hide":"Show"}</button>
          <div style={{display:"flex",gap:4,marginTop:6}}>
            <input id="vk" placeholder="Label" style={{flex:1,padding:"6px",borderRadius:4,border:"1px solid #3f3f46",background:"#18181b",color:"#fafafa",fontSize:9,outline:"none"}}/>
            <input id="vv" placeholder="Password / Key" style={{flex:2,padding:"6px",borderRadius:4,border:"1px solid #3f3f46",background:"#18181b",color:"#fafafa",fontSize:9,outline:"none"}}/>
            <button onClick={()=>{const k=document.getElementById("vk").value.trim();const v=document.getElementById("vv").value.trim();if(k&&v){const nv={...pwStore,[k]:v};sPwStore(nv);svVault(nv);document.getElementById("vk").value="";document.getElementById("vv").value="";}}} style={{padding:"6px 10px",borderRadius:4,border:"none",background:"#3f3f46",color:"#fafafa",cursor:"pointer",fontSize:9,fontWeight:600}}>Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>);
  const[ct,sCT]=useState("area");const[tab,sTB]=useState("home");const[cv,sCV]=useState("stacked");const[bv,sBV]=useState("grouped");const[showTot,sSTot]=useState(false);const[visCh,sVisCh]=useState(["shopify","square","cash","amex"]);const[stgExp,sStgExp]=useState(new Set());
  const[toast,sT]=useState(null);const[impItems,sII]=useState(null);const[impCh,sIC]=useState("");const[impFilter,sIF]=useState("all");const[discMode,sDiscMode]=useState(false);
  const[stfP,sSTP]=useState(null);const[gV,sGV]=useState("cum");const[sec,sSEC]=useState("daily");
  const[gPP,sGPP]=useState(["AJAY","DEREK","SHARED","LJ"]);const[sdf,sSDF]=useState("2026-01-01");const[sdt,sSDT]=useState(TODAY);const[goalP,sGoalP]=useState("AJAY");
  const[cart,sCart]=useState([]);const[ciP,sCIP]=useState("AJAY");const[ciN,sCIN]=useState("");const[ciQ,sCIQ]=useState("1");const[ciA,sCIA]=useState("");const[ciIO,sCIIO]=useState("IN");const[cartCh,sCartCh]=useState("cash");const[cartDt,sCartDt]=useState(TODAY);const[bkSort,sBkSort]=useState({col:"date",dir:"desc"});const[itemCat,sItemCat]=useState("");const[sealGame,sSealGame]=useState("");const[sealSeries,sSealSeries]=useState("");const[sealSub,sSealSub]=useState("");const[sealType,sSealType]=useState("");const[cartImg,sCartImg]=useState(null);const[viewImg,sViewImg]=useState(null);
  const[bankTxns,sBankTxns]=useState([]);const[bkAcct,sBkAcct]=useState("AMEX");const[bkType,sBkType]=useState("deposit");const[bkAmt,sBkAmt]=useState("");const[bkNote,sBkNote]=useState("");const[bkDt,sBkDt]=useState(TODAY);const[bkPerson,sBkPerson]=useState("AJAY");
  const[xfFrom,sXfFrom]=useState("AJAY");const[xfTo,sXfTo]=useState("DEREK");const[xfFromCh,sXfFromCh]=useState("cash");const[xfToCh,sXfToCh]=useState("cash");const[xfAmt,sXfAmt]=useState("");const[xfNote,sXfNote]=useState("");const[xfDt,sXfDt]=useState(TODAY);const[xfRecips,sXfRecips]=useState([]);const[xfSenders,sXfSenders]=useState([{p:"AJAY",amt:""}]);
  const[poP,sPOP]=useState("AJAY");const[poCh,sPOCh]=useState("cash");const[poAmt,sPOAmt]=useState("");const[poNote,sPONote]=useState("");const[poDt,sPODt]=useState(TODAY);const[poType,sPOType]=useState("BUY");const[poFrom,sPOFrom]=useState(daysAgo(7));const[poSel,sPOSel]=useState(new Set());const[poSplitOn,sPOSplitOn]=useState(false);const[poSplitPpl,sPOSplitPpl]=useState(new Set(["AJAY","DEREK"]));const[payExp,sPayExp]=useState(null);const[payAmt,sPayAmt]=useState("");const[payCash,sPayCash]=useState("");const[payAmex,sPayAmex]=useState("");const[payXfer,sPayXfer]=useState("");
  const[logCh,sLogCh]=useState("all");const[logP,sLogP]=useState("all");const[logIO,sLogIO]=useState("all");const[logDF,sLogDF]=useState("");const[logDT,sLogDT]=useState("");const[confirmDel,sConfirmDel]=useState(null);const[logSel,sLogSel]=useState(new Set());const[logSelMode,sLogSelMode]=useState(false);const[logExp,sLogExp]=useState(new Set());const[logQ,sLogQ]=useState("");const[logSort,sLogSort]=useState("newest");const[selPerson,sSelPerson]=useState(null);const[pplInfo,sPplInfo]=useState({});const[pplTab,sPplTab]=useState("directory");const[prodView,sProdView]=useState("all");const[prodSort,sProdSort]=useState("revenue");
  // Reactive person balances: base S_B + manual entries affect cash/amex per channel
  const balances=useMemo(()=>{const b={};Object.entries(S_B).forEach(([p,v])=>{b[p]={cash:v.cash,amex:v.amex,overall:v.overall};});
    entries.forEach(e=>{if(!b[e.p])b[e.p]={cash:0,amex:0,overall:0};
      if(e.io==="REFUND"){const amt=-e.a;if(e.c==="cash"){b[e.p].cash+=amt;}else if(e.c==="amex"||e.c==="square"||e.c==="trade"){b[e.p].amex+=amt;}else{b[e.p].cash+=amt;}b[e.p].overall+=amt;return;}
      const isIn=e.io==="IN"||e.io==="CONSIGNMENT"||e.io==="TRADE_IN"||e.io==="XFER_IN";const amt=isIn?e.a:-e.a;
      if(e.c==="cash"){b[e.p].cash+=amt;}else if(e.c==="amex"||e.c==="square"||e.c==="trade"){b[e.p].amex+=amt;}else{b[e.p].cash+=amt;}
      b[e.p].overall+=amt;});
    return b;},[entries]);
  // Separate bank account balances (AMEX card, CHASE checking)
  const AMEX_CUTOFF="2026-02-25T00:00:00";
  const bankBals=useMemo(()=>{const b={AMEX:15868.64,CHASE:0,CASH:0};
    bankTxns.forEach(t=>{b[t.acct]+=(t.type==="deposit"?t.amt:-t.amt);});
    entries.forEach(e=>{if(e.c==="amex"&&(e.io==="OUT"||e.io==="PYOUT")&&e.t&&e.t>=AMEX_CUTOFF)b.AMEX-=e.a;});
    return b;},[bankTxns,entries]);

  useEffect(()=>{(async()=>{try{const r=(() => { try { const v = localStorage.getItem("ub-e3"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r?.value){let p=JSON.parse(r.value);
    // ONE-TIME MIGRATION: Fix consignment entries that don't have commission splits
    const MCOMM={LJ:{rate:0.10,split:"AJAY"},EVAN:{rate:0.25,split:"BOTH"}};const MDEF={rate:0.15,split:"BOTH"};
    const MOW=new Set(["AJAY","DEREK","SHARED"]);
    const toAdd=[];const toFix=new Set();
    p.forEach(e=>{
      if(e.io==="CONSIGNMENT"&&!MOW.has(e.p)&&!e._migrated){
        // Check if commission entries already exist for this grp/ordId
        const hasComm=e.grp?p.some(x=>x.grp===e.grp&&x.p!==e.p&&x.r&&x.r.includes("comm")):false;
        if(!hasComm){
          const cfg=MCOMM[e.p]||MDEF;
          const origAmt=Math.round(e.a/(1-cfg.rate)*100)/100; // reverse: consigner got (1-rate), so orig = a/(1-rate)
          // But if the entry was never split, e.a IS the original full amount
          // Check: if e.a looks like the full amount (no "%" in r), use it directly
          const fullAmt=(e.r&&e.r.includes("%"))?origAmt:e.a;
          const commAmt=Math.round(fullAmt*cfg.rate*100)/100;
          const consignerAmt=Math.round((fullAmt-commAmt)*100)/100;
          // Fix the consigner amount
          toFix.add(e.id);
          e.a=consignerAmt;
          e.r=(e.r||"")+(e.r?"":" ")+ `(${((1-cfg.rate)*100).toFixed(0)}%)`;
          e._migrated=true;
          // Create commission entries
          const gid=e.grp||("MIG"+e.id);
          if(!e.grp)e.grp=gid;
          if(cfg.split==="AJAY"){
            toAdd.push({id:Date.now()+Math.random(),c:e.c,d:e.d,p:"AJAY",a:commAmt,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% comm ${e.p}`,grp:gid,_migrated:true,t:new Date().toISOString()});
          } else if(cfg.split==="DEREK"){
            toAdd.push({id:Date.now()+Math.random(),c:e.c,d:e.d,p:"DEREK",a:commAmt,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% comm ${e.p}`,grp:gid,_migrated:true,t:new Date().toISOString()});
          } else {
            const half=Math.round(commAmt/2*100)/100;
            toAdd.push({id:Date.now()+Math.random(),c:e.c,d:e.d,p:"AJAY",a:half,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% split comm ${e.p}`,grp:gid,_migrated:true,t:new Date().toISOString()});
            toAdd.push({id:Date.now()+Math.random(),c:e.c,d:e.d,p:"DEREK",a:Math.round((commAmt-half)*100)/100,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% split comm ${e.p}`,grp:gid,_migrated:true,t:new Date().toISOString()});
          }
        }
      }
    });
    if(toAdd.length>0){p=[...p,...toAdd];try{(() => { try { localStorage.setItem("ub-e3", JSON.stringify(p)); return { value: JSON.stringify(p) }; } catch(e) { return null; } })();}catch(e){}}
    // Migration: fix old balance/payout entries that used IN/OUT instead of XFER/PYOUT
    let migFixed=false;
    p.forEach(e=>{
      if((e.r||"").includes("Balance: cash")&&(e.io==="IN"||e.io==="OUT")){e.io=e.io==="IN"?"XFER_IN":"XFER_OUT";migFixed=true;}
      if((e.r||"").includes("Payout: balance")&&(e.io==="IN"||e.io==="OUT")){e.io=e.io==="IN"?"XFER_IN":"XFER_OUT";migFixed=true;}
      if((e.r||"").startsWith("PAYOUT:")&&e.io==="OUT"){e.io="PYOUT";migFixed=true;}
    });
    if(migFixed){try{(() => { try { localStorage.setItem("ub-e3", JSON.stringify(p)); return { value: JSON.stringify(p) }; } catch(e) { return null; } })();}catch(e){}}
    // One-time: add $4225 pending draw for AJAY and DEREK
    if(!p.find(e=>e.r==="Pending draw: AMEX split"&&e.p==="AJAY")){
      p.push({id:Date.now()+.991,c:"amex",d:TODAY,p:"AJAY",a:4225,io:"XFER_IN",r:"Pending draw: AMEX split",t:new Date().toISOString()});
      p.push({id:Date.now()+.992,c:"amex",d:TODAY,p:"DEREK",a:4225,io:"XFER_IN",r:"Pending draw: AMEX split",t:new Date().toISOString()});
      try{(() => { try { localStorage.setItem("ub-e3", JSON.stringify(p)); return { value: JSON.stringify(p) }; } catch(e) { return null; } })();}catch(e){}
    }
    sE(p);
    const nd={...S_ALL},nc={...S_C_NET};p.forEach(e=>{if(e.io==="IN"||e.io==="CONSIGNMENT"){if(!nd[e.d])nd[e.d]={};nd[e.d][e.p]=(nd[e.d][e.p]||0)+e.a;if(!nc[e.d])nc[e.d]={};nc[e.d][e.c]=(nc[e.d][e.c]||0)+e.a;}});
    sDD({...nd});sCD({...nc});}}catch(e){}
    // Load bank txns from local
    try{const r2=(() => { try { const v = localStorage.getItem("ub-bank"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r2?.value)sBankTxns(JSON.parse(r2.value));}catch(e){}
    // Load people info from local
    try{const r3=(() => { try { const v = localStorage.getItem("ub-ppl"); return v ? { value: v } : null; } catch(e) { return null; } })();if(r3?.value)sPplInfo(JSON.parse(r3.value));}catch(e){}
    })();},[]);
  const sv=useCallback(async ne=>{try{(() => { try { localStorage.setItem("ub-e3", JSON.stringify(ne)); return { value: JSON.stringify(ne) }; } catch(e) { return null; } })();}catch(e){}},[]);
  const svBank=useCallback(async nt=>{try{(() => { try { localStorage.setItem("ub-bank", JSON.stringify(nt)); return { value: JSON.stringify(nt) }; } catch(e) { return null; } })();}catch(e){}},[]);
  const svPpl=useCallback(async info=>{try{(() => { try { localStorage.setItem("ub-ppl", JSON.stringify(info)); return { value: JSON.stringify(info) }; } catch(e) { return null; } })();}catch(e){}},[]);
  const backupDataRef=useRef({entries:[],bankTxns:[],pplInfo:{}});
  useEffect(()=>{backupDataRef.current={entries,bankTxns,pplInfo};},[entries,bankTxns,pplInfo]);
  useEffect(()=>{const doAutoBackup=()=>{try{const d=backupDataRef.current;const bk={entries:d.entries,bankTxns:d.bankTxns,pplInfo:d.pplInfo,savedAt:new Date().toISOString()};localStorage.setItem("ub-autobackup",JSON.stringify(bk));sLastBackup(new Date().toLocaleTimeString());}catch(e){}};const id=setInterval(doAutoBackup,10*60*1000);return()=>clearInterval(id);},[]);
  const tw=(m,ms=3000)=>{sT(m);setTimeout(()=>sT(null),ms);};
  const compressImg=(file)=>new Promise((res)=>{const reader=new FileReader();reader.onload=ev=>{const img=new Image();img.onload=()=>{const MAX=300;let w=img.width,h=img.height;if(w>MAX||h>MAX){if(w>h){h=Math.round(h*(MAX/w));w=MAX;}else{w=Math.round(w*(MAX/h));h=MAX;}}const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);res(c.toDataURL("image/jpeg",0.6));};img.src=ev.target.result;};reader.readAsDataURL(file);});
  const handleCartImg=async(e)=>{const f=e.target.files[0];if(!f)return;const d=await compressImg(f);sCartImg(d);e.target.value="";};
  const handleImgDrop=async(e)=>{e.preventDefault();e.stopPropagation();const f=e.dataTransfer?.files?.[0];if(!f||!f.type.startsWith("image/"))return;const d=await compressImg(f);sCartImg(d);};
  const addCart=()=>{
    // Support comma or + separated prices: "5,10,3" or "5+10+3" = $18
    const raw=String(ciA).replace(/\s/g,"");
    const parts=raw.split(/[,+]/).map(s=>parseFloat(s)).filter(n=>n>0);
    const a=parts.length>0?parts.reduce((s,v)=>s+v,0):0;
    if(!a||a<=0){tw("⚠ Enter price",2000);return;}const q=parseInt(ciQ)||1;
    const name=ciN||(itemCat==="Single"?"Single":itemCat==="Snack"?"Snack":itemCat==="Sealed"?"Sealed":"Item");
    sCart(c=>[...c,{id:Date.now(),p:ciP,name,qty:q,price:a,total:a*q,io:ciIO}]);sCIN("");sCIA("");sCIQ("1");sSealGame("");sSealSeries("");sSealSub("");sSealType("");};
  const rmCart=id=>sCart(c=>c.filter(x=>x.id!==id));
  const submitCart=()=>{if(cart.length===0){tw("⚠ Cart empty",2000);return;}
    const ne=[...entries];const nd={...dd},nc={...cd};
    const gid="C"+Date.now();
    // Group by person+io type
    const grouped={};cart.forEach(it=>{const k=`${it.p}|${it.io}`;grouped[k]=(grouped[k]||{p:it.p,io:it.io,amt:0,items:[]});grouped[k].amt+=it.total;grouped[k].items.push(it);});
    Object.values(grouped).forEach(({p,io,amt,items})=>{
      // Consolidate duplicate item names
      const merged={};items.forEach(c=>{const k=c.name;if(!merged[k])merged[k]={name:c.name,qty:0};merged[k].qty+=c.qty;});
      const desc=Object.values(merged).map(c=>`${c.name} x${c.qty}`).join(", ");
      const isOwner=OWNERS.has(p);
      if(io==="CONSIGNMENT"&&!isOwner){
        // Apply commission split for consigners
        const cfg=COMM[p]||DEF_COMM;
        const commAmt=Math.round(amt*cfg.rate*100)/100;
        const consignerAmt=Math.round((amt-commAmt)*100)/100;
        // Consigner gets their cut
        ne.push({id:Date.now()+Math.random(),c:cartCh,d:cartDt,p,a:consignerAmt,io:"CONSIGNMENT",r:`${desc} (${((1-cfg.rate)*100).toFixed(0)}%)`,grp:gid,t:new Date().toISOString()});
        if(!nd[cartDt])nd[cartDt]={};nd[cartDt][p]=(nd[cartDt][p]||0)+consignerAmt;
        // Commission to owners
        if(cfg.split==="AJAY"){
          ne.push({id:Date.now()+Math.random(),c:cartCh,d:cartDt,p:"AJAY",a:commAmt,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% comm ${p} · ${desc}`,grp:gid,t:new Date().toISOString()});
          if(!nd[cartDt])nd[cartDt]={};nd[cartDt]["AJAY"]=(nd[cartDt]["AJAY"]||0)+commAmt;
        } else if(cfg.split==="DEREK"){
          ne.push({id:Date.now()+Math.random(),c:cartCh,d:cartDt,p:"DEREK",a:commAmt,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% comm ${p} · ${desc}`,grp:gid,t:new Date().toISOString()});
          if(!nd[cartDt])nd[cartDt]={};nd[cartDt]["DEREK"]=(nd[cartDt]["DEREK"]||0)+commAmt;
        } else {
          const half=Math.round(commAmt/2*100)/100;
          ne.push({id:Date.now()+Math.random(),c:cartCh,d:cartDt,p:"AJAY",a:half,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% split comm ${p} · ${desc}`,grp:gid,t:new Date().toISOString()});
          ne.push({id:Date.now()+Math.random(),c:cartCh,d:cartDt,p:"DEREK",a:Math.round((commAmt-half)*100)/100,io:"IN",r:`${(cfg.rate*100).toFixed(0)}% split comm ${p} · ${desc}`,grp:gid,t:new Date().toISOString()});
          if(!nd[cartDt])nd[cartDt]={};nd[cartDt]["AJAY"]=(nd[cartDt]["AJAY"]||0)+half;nd[cartDt]["DEREK"]=(nd[cartDt]["DEREK"]||0)+(commAmt-half);
        }
        if(!nc[cartDt])nc[cartDt]={};nc[cartDt][cartCh]=(nc[cartDt][cartCh]||0)+amt;
      } else {
        const e={id:Date.now()+Math.random(),c:cartCh,d:cartDt,p,a:Math.round(amt*100)/100,io,r:desc,grp:gid,t:new Date().toISOString()};ne.push(e);
        if(io==="IN"||io==="CONSIGNMENT"){if(!nd[cartDt])nd[cartDt]={};nd[cartDt][p]=(nd[cartDt][p]||0)+amt;if(!nc[cartDt])nc[cartDt]={};nc[cartDt][cartCh]=(nc[cartDt][cartCh]||0)+amt;}
      }
    });
    if(cartImg){for(let i=entries.length;i<ne.length;i++){ne[i]={...ne[i],img:cartImg};}}
    sE(ne);sv(ne);sDD({...nd});sCD({...nc});if(cartDt>dt)sDT(cartDt);
    tw(`✓ Order: ${cart.length} items, ${FF(cart.reduce((s,c)=>s+c.total,0))} → ${Object.keys(Object.fromEntries(cart.map(c=>[c.p,1]))).join(", ")}`);sCart([]);sCartImg(null);};
  const delE=id=>{const e=entries.find(x=>x.id===id);const ne=entries.filter(x=>x.id!==id);sE(ne);sv(ne);
    if(e&&(e.io==="IN"||e.io==="CONSIGNMENT")){sDD(p=>{const d={...p};if(d[e.d]){d[e.d]={...d[e.d]};d[e.d][e.p]=Math.max(0,(d[e.d][e.p]||0)-e.a);}return d;});sCD(p=>{const d={...p};if(d[e.d]){d[e.d]={...d[e.d]};d[e.d][e.c]=Math.max(0,(d[e.d][e.c]||0)-e.a);}return d;});}tw("Deleted",2000);};
  const addImgToEntry=async(id,file)=>{if(!file||!file.type.startsWith("image/"))return;const d=await compressImg(file);const ne=entries.map(x=>x.id===id?{...x,img:d}:x);sE(ne);sv(ne);tw("📷 Photo added");};
  const addImgToGroup=async(grpKey,file)=>{if(!file||!file.type.startsWith("image/"))return;const d=await compressImg(file);const ne=entries.map(x=>x.grp===grpKey?{...x,img:d}:x);sE(ne);sv(ne);tw("📷 Photo added to group");};
  const[lastRefund,sLastRefund]=useState(null);
  const refundEntries=(ids)=>{
    // Save original state for undo
    const originals=entries.filter(e=>ids.includes(e.id)).map(e=>({...e}));
    sLastRefund({ids,originals});
    const ne=entries.map(e=>ids.includes(e.id)?{...e,io:"REFUND",r:`REFUNDED · ${e.r||""}`}:e);
    sE(ne);sv(ne);
    ids.forEach(id=>{const e=entries.find(x=>x.id===id);
      if(e&&(e.io==="IN"||e.io==="CONSIGNMENT")){
        sDD(p=>{const d={...p};if(d[e.d]){d[e.d]={...d[e.d]};d[e.d][e.p]=Math.max(0,(d[e.d][e.p]||0)-e.a);}return d;});
        sCD(p=>{const d={...p};if(d[e.d]){d[e.d]={...d[e.d]};d[e.d][e.c]=Math.max(0,(d[e.d][e.c]||0)-e.a);}return d;});
      }});
    tw(`🔴 Refunded ${ids.length} entries`);
  };
  const undoRefund=()=>{
    if(!lastRefund)return;
    const ne=entries.map(e=>{const orig=lastRefund.originals.find(o=>o.id===e.id);return orig?{...orig}:e;});
    sE(ne);sv(ne);
    lastRefund.originals.forEach(e=>{
      if(e.io==="IN"||e.io==="CONSIGNMENT"){
        sDD(p=>{const d={...p};if(!d[e.d])d[e.d]={};d[e.d]={...d[e.d]};d[e.d][e.p]=(d[e.d][e.p]||0)+e.a;return d;});
        sCD(p=>{const d={...p};if(!d[e.d])d[e.d]={};d[e.d]={...d[e.d]};d[e.d][e.c]=(d[e.d][e.c]||0)+e.a;return d;});
      }});
    tw(`↩ Undid refund on ${lastRefund.ids.length} entries`);
    sLastRefund(null);
  };
  const refundByOrder=(ord)=>{
    const ids=entries.filter(e=>e.ord===ord&&e.io!=="REFUND").map(e=>e.id);
    if(ids.length===0){tw("No entries found for that order");return;}
    refundEntries(ids);
  };
  const handleFile=(e,type)=>{const file=e.target.files[0];if(!file)return;const reader=new FileReader();
    reader.onload=ev=>{const r=type==="shopify"?parseShopifyCSV(ev.target.result):parseSquareCSV(ev.target.result,pplInfo);sII(r.items);sIC(r.channel);sIF("all");sSEC("manual");};reader.readAsText(file);e.target.value="";};
  const editOwner=(id,nw)=>{sII(prev=>prev.map(it=>it.id===id?{...it,owner:nw,fl:it.fl.filter(f=>f!=="unknown")}:it));};
  const editSplit=(id,field,val)=>{sII(prev=>prev.map(it=>it.id===id?{...it,[field]:val}:it));};
  const editSplits=(id,splits)=>{sII(prev=>prev.map(it=>it.id===id?{...it,splits}:it));};
  const COMM={LJ:{rate:0.10,split:"AJAY"},EVAN:{rate:0.25,split:"BOTH"}};const DEF_COMM={rate:0.15,split:"BOTH"};
  const OWNERS=new Set(["AJAY","DEREK","SHARED"]);
  const SQ_FEE=0.026;
  const applyImport=()=>{if(!impItems)return;const ne=[...entries];let cnt=0;let refCnt=0;
    const ts=()=>Date.now()+cnt++;
    for(const it of impItems){if(it.owner==="UNKNOWN"&&(!it.splits||it.splits.length===0))continue;
      if(it.fl.includes("refunded")){refCnt++;continue;}
      if(it.fl.includes("tax"))continue;
      if(it.splits&&it.splits.length>0){
        const label=(it.order?`${it.order} · ${it.name||impCh}`:`${impCh} import`)+(it.note?` — ${it.note}`:"");
        for(const splt of it.splits){if(!splt.owner||splt.owner==="UNKNOWN"||!(splt.amt>0))continue;
          const isOwner=OWNERS.has(splt.owner);const fee=Math.round(splt.amt*SQ_FEE*100)/100;const net=Math.round((splt.amt-fee)*100)/100;
          if(isOwner){ne.push({id:ts(),c:"amex",d:it.date,p:splt.owner,a:net,io:"IN",r:`${label} (split, net after ${(SQ_FEE*100).toFixed(1)}% fee)`,ord:it.order||"",t:new Date().toISOString()});}
          else{const cfg=COMM[splt.owner]||DEF_COMM;const commAmt=Math.round(splt.amt*cfg.rate*100)/100;const consignerAmt=Math.round((splt.amt-commAmt)*100)/100;const netComm=Math.round((commAmt-fee)*100)/100;
            ne.push({id:ts(),c:"amex",d:it.date,p:splt.owner,a:consignerAmt,io:"IN",r:`${label} (split, ${((1-cfg.rate)*100).toFixed(0)}% consigner)`,ord:it.order||"",t:new Date().toISOString()});
            if(cfg.split==="AJAY")ne.push({id:ts(),c:"amex",d:it.date,p:"AJAY",a:Math.max(0,netComm),io:"IN",r:`${label} (split comm ${splt.owner})`,ord:it.order||"",t:new Date().toISOString()});
            else if(cfg.split==="DEREK")ne.push({id:ts(),c:"amex",d:it.date,p:"DEREK",a:Math.max(0,netComm),io:"IN",r:`${label} (split comm ${splt.owner})`,ord:it.order||"",t:new Date().toISOString()});
            else{const half=Math.round(Math.max(0,netComm)/2*100)/100;ne.push({id:ts(),c:"amex",d:it.date,p:"AJAY",a:half,io:"IN",r:`${label} (split comm ${splt.owner})`,ord:it.order||"",t:new Date().toISOString()});ne.push({id:ts(),c:"amex",d:it.date,p:"DEREK",a:half,io:"IN",r:`${label} (split comm ${splt.owner})`,ord:it.order||"",t:new Date().toISOString()});}
          }}continue;}

      const isSpl=it.fl.includes("split_pay");
      const shopA=isSpl?(it.shopAmt!=null?it.shopAmt:it.amt):(it.personAmt!=null?it.personAmt:it.amt);
      const cashA=isSpl?(it.cashAmt||0):0;
      const tradeA=isSpl?(it.tradeAmt||0):0;
      const label=(it.order?`${it.order} · ${it.name||impCh}`:`${impCh} import`)+(it.note?` — ${it.note}`:"");
      const isOwner=OWNERS.has(it.owner);
      const ch=impCh;// "shopify" or "square"
      const procFee=ch==="shopify"?SHOP_FEE:ch==="square"?SQ_FEE:0;
      // Determine actual payment channel from payment method
      const pmUp=(it.pm||"").toUpperCase();
      // For non-split: detect channel from payment method
      const actualCh=ch==="shopify"?(pmUp.includes("CASH")?"cash":pmUp.includes("AMEX")||pmUp.includes("AMERICAN EXPRESS")?"amex":"shopify"):"amex";
      // For split payments, detect what each split portion is
      // Parse payment methods to figure out cash vs card vs amex
      const pmParts=pmUp.split("+").map(s=>s.trim());
      const hasCashPM=pmParts.some(p=>p==="CASH");
      const hasAmexPM=pmParts.some(p=>p.includes("AMEX")||p.includes("AMERICAN EXPRESS"));
      const hasCustomPOS=pmParts.some(p=>p.includes("CUSTOM")&&p.includes("POS"));
      // Cash split channel: if AMEX is the other payment, cash portion is still cash
      const cashSplitCh="cash";
      // Trade credit is NOT real money — it's store credit
      // Shopify portion channel: if amex is in the mix use amex, otherwise shopify
      const shopSplitCh=hasAmexPM?"amex":"shopify";

      // For each payment portion (shop, cash, trade)
      const portions=[
        {amt:shopA,c:isSpl?shopSplitCh:actualCh,lbl:label},
        {amt:cashA,c:cashSplitCh,lbl:`${label} (cash split)`}
      ];
      // Handle trade credit separately as a transfer
      if(tradeA>0){
        const tradeFrom=it.tradeFrom||"SELF";
        const tradeTo=it.owner;
        const isConsigner=!OWNERS.has(tradeTo);
        const cfg=COMM[tradeTo]||DEF_COMM;
        const consignerPortion=isConsigner?Math.round(tradeA*(1-cfg.rate)*100)/100:tradeA;
        const hint=isConsigner?` (consign portion: ${FX(consignerPortion)})`:"";
        if(tradeFrom==="SELF"){
          // Self trade credit — just credited to the item owner's amex account
          ne.push({id:ts(),c:"amex",d:it.date,p:tradeTo,a:tradeA,io:"IN",r:`${label} (trade credit${hint})`,ord:it.order||"",t:new Date().toISOString()});
        } else {
          // Transfer: FROM person's amex pays, TO person's amex receives
          ne.push({id:ts(),c:"amex",d:it.date,p:tradeTo,a:tradeA,io:"IN",r:`${label} (trade credit from ${tradeFrom}${hint})`,ord:it.order||"",t:new Date().toISOString()});
          if(tradeFrom!==tradeTo){
            ne.push({id:ts(),c:"amex",d:it.date,p:tradeFrom,a:tradeA,io:"OUT",r:`${label} (trade credit → ${tradeTo})`,ord:it.order||"",t:new Date().toISOString()});
          }
        }
      }
      // Processing fee only applies to digital channels (shopify/square), not cash/amex
      const hasProcFee=(ch==="shopify"||ch==="square");
      for(const pt of portions){
        if(pt.amt<=0)continue;
        const ptFee=(ch==="square"||pt.c==="shopify")?procFee:0;
        if(isOwner){
          const fee=ptFee>0?Math.round(pt.amt*ptFee*100)/100:0;
          const net=Math.round((pt.amt-fee)*100)/100;
          ne.push({id:ts(),c:pt.c,d:it.date,p:it.owner,a:net,io:"IN",r:fee>0?`${pt.lbl} (net after ${(ptFee*100).toFixed(1)}% fee)`:pt.lbl,ord:it.order||"",t:new Date().toISOString()});
        } else {
          const cfg=COMM[it.owner]||DEF_COMM;
          const commAmt=Math.round(pt.amt*cfg.rate*100)/100;
          const consignerAmt=Math.round((pt.amt-commAmt)*100)/100;
          const fee=ptFee>0?Math.round(pt.amt*ptFee*100)/100:0;
          const netComm=Math.round((commAmt-fee)*100)/100;
          // Consigner gets their full cut
          ne.push({id:ts(),c:pt.c,d:it.date,p:it.owner,a:consignerAmt,io:"IN",r:`${pt.lbl} (${((1-cfg.rate)*100).toFixed(0)}% consigner)`,ord:it.order||"",t:new Date().toISOString()});
          // Commission to owners
          if(cfg.split==="AJAY"){
            ne.push({id:ts(),c:pt.c,d:it.date,p:"AJAY",a:Math.max(0,netComm),io:"IN",r:`${pt.lbl} (${(cfg.rate*100).toFixed(0)}% comm ${it.owner}${fee>0?` -${(ptFee*100).toFixed(1)}% fee`:""})`,ord:it.order||"",t:new Date().toISOString()});
          } else if(cfg.split==="DEREK"){
            ne.push({id:ts(),c:pt.c,d:it.date,p:"DEREK",a:Math.max(0,netComm),io:"IN",r:`${pt.lbl} (${(cfg.rate*100).toFixed(0)}% comm ${it.owner}${fee>0?` -${(ptFee*100).toFixed(1)}% fee`:""})`,ord:it.order||"",t:new Date().toISOString()});
          } else {
            const half=Math.round(Math.max(0,netComm)/2*100)/100;
            ne.push({id:ts(),c:pt.c,d:it.date,p:"AJAY",a:half,io:"IN",r:`${pt.lbl} (${(cfg.rate*100).toFixed(0)}% split comm ${it.owner}${fee>0?` -${(ptFee*100).toFixed(1)}% fee`:""})`,ord:it.order||"",t:new Date().toISOString()});
            ne.push({id:ts(),c:pt.c,d:it.date,p:"DEREK",a:half,io:"IN",r:`${pt.lbl} (${(cfg.rate*100).toFixed(0)}% split comm ${it.owner}${fee>0?` -${(ptFee*100).toFixed(1)}% fee`:""})`,ord:it.order||"",t:new Date().toISOString()});
          }
        }
      }
    }
    if(impCh==="square"){for(let i=entries.length;i<ne.length;i++){ne[i]={...ne[i],src:"square"};}}
    sE(ne);sv(ne);const nd={...dd},nc={...cd};
    for(const e of ne.slice(entries.length)){if(e.io==="IN"){if(!nd[e.d])nd[e.d]={};nd[e.d][e.p]=(nd[e.d][e.p]||0)+e.a;if(!nc[e.d])nc[e.d]={};nc[e.d][e.c]=(nc[e.d][e.c]||0)+e.a;}}
    sDD({...nd});sCD({...nc});const remaining=impItems.filter(it=>it.owner==="UNKNOWN"&&(!it.splits||it.splits.length===0)&&!it.fl.includes("refunded"));
    tw(`✓ Imported ${ne.length-entries.length} entries${refCnt>0?` (${refCnt} refunded skipped)`:""}${remaining.length?` · ${remaining.length} still unassigned`:""}`);sII(remaining.length>0?remaining:null);};

  const stfTot=useMemo(()=>{const t={};STF.forEach(s=>{t[s]={o:0}});Object.entries(S_SC).forEach(([d,day])=>{if(d>=sdf&&d<=sdt)STF.forEach(s=>{t[s].o+=(day[s]||0)})});STF.forEach(s=>{if(S_SA[s])Object.assign(t[s],S_SA[s])});return t},[sdf,sdt]);
  const stfD=useMemo(()=>Object.keys(S_SC).sort().filter(d=>d>=sdf&&d<=sdt).map(d=>{const r={day:SD(d)};STF.forEach(s=>{r[s]=S_SC[d]?.[s]||0});return r}),[sdf,sdt]);
  const stfCum=useMemo(()=>{const c={};return Object.keys(S_SC).sort().filter(d=>d>=sdf&&d<=sdt).map(d=>{const r={day:SD(d)};STF.forEach(s=>{c[s]=(c[s]||0)+(S_SC[d]?.[s]||0);r[s]=c[s]});return r})},[sdf,sdt]);
  const cumAll=useMemo(()=>{const dates=Object.keys(dd).sort();const cum={};const result={};
    dates.forEach(d=>{PP.forEach(p=>{cum[p]=(cum[p]||0)+(dd[d]?.[p]||0);});result[d]={...cum};});return result;},[dd]);
  const grD=useMemo(()=>{const ds=Object.keys(cumAll).sort().filter(d=>d>=sdf&&d<=sdt);
    if(gV==="cum")return ds.map(d=>({day:SD(d),...Object.fromEntries(gPP.map(p=>[p,cumAll[d]?.[p]||0])),_t:gPP.reduce((s,p)=>s+(cumAll[d]?.[p]||0),0)}));
    return ds.map((d,i)=>{const prev=i>0?cumAll[ds[i-1]]:{};return{day:SD(d),...Object.fromEntries(gPP.map(p=>[p,(cumAll[d]?.[p]||0)-(prev[p]||0)])),_t:0}})},[gV,gPP,sdf,sdt,cumAll]);
  const lastB=useMemo(()=>{const allDates=Object.keys(cumAll).sort();const last=cumAll[allDates[allDates.length-1]]||{};const t=PP.reduce((s,p)=>s+(last[p]||0),0);return{...last,total:t};},[cumAll]);
  const ad=useMemo(()=>Object.keys(dd).sort(),[dd]);
  const fd=useMemo(()=>ad.filter(d=>d>=df&&d<=dt),[ad,df,dt]);
  const[dCh,sDCh]=useState("all");
  const chD=useMemo(()=>fd.map(d=>{const r={day:SD(d)};
    if(dCh==="all"){sp.forEach(p=>{r[p]=dd[d]?.[p]||0;});r._t=Object.values(dd[d]||{}).reduce((a,b)=>a+b,0);}
    else{
      // Channel filter: use channel total for the day, distribute proportionally by person
      const chTot=cd[d]?.[dCh]||0;const dayTot=Object.values(dd[d]||{}).reduce((a,b)=>a+b,0);
      const ratio=dayTot>0?chTot/dayTot:0;
      sp.forEach(p=>{r[p]=Math.round((dd[d]?.[p]||0)*ratio*100)/100;});r._t=chTot;}
    return r;}),[fd,sp,dd,cd,dCh]);
  const chC=useMemo(()=>fd.map(d=>({day:SD(d),shopify:cd[d]?.shopify||0,square:cd[d]?.square||0,cash:cd[d]?.cash||0,amex:cd[d]?.amex||0})),[fd,cd]);
  const chCCum=useMemo(()=>{const c={shopify:0,square:0,cash:0,amex:0};return fd.map(d=>{["shopify","square","cash","amex"].forEach(k=>{c[k]+=(cd[d]?.[k]||0);});return{day:SD(d),...c};});},[fd,cd]);
  const rs=useMemo(()=>{const s={};PP.forEach(p=>{s[p]=0;});
    if(dCh==="all"){fd.forEach(d=>PP.forEach(p=>{s[p]+=dd[d]?.[p]||0;}));}
    else{fd.forEach(d=>{const chTot=cd[d]?.[dCh]||0;const dayTot=Object.values(dd[d]||{}).reduce((a,b)=>a+b,0);const ratio=dayTot>0?chTot/dayTot:0;PP.forEach(p=>{s[p]+=Math.round((dd[d]?.[p]||0)*ratio*100)/100;});});}
    return s;},[fd,dd,cd,dCh]);
  const rc=useMemo(()=>{const c={shopify:0,square:0,cash:0,amex:0};fd.forEach(d=>{Object.entries(cd[d]||{}).forEach(([k,v])=>{c[k]=(c[k]||0)+v;});});return c;},[fd,cd]);
  const rT=Object.values(rs).reduce((a,b)=>a+b,0);
  const gT=useMemo(()=>{if(dCh==="all")return ad.reduce((s,d)=>s+Object.values(dd[d]||{}).reduce((a,b)=>a+b,0),0);
    return ad.reduce((s,d)=>s+(cd[d]?.[dCh]||0),0);},[ad,dd,cd,dCh]);
  const sbr=useMemo(()=>PP.map(p=>({n:p,t:rs[p]})).filter(p=>p.t>0).sort((a,b)=>b.t-a.t),[rs]);
  const so=useMemo(()=>PP.map(p=>({n:p,t:ad.reduce((s,d)=>s+(dd[d]?.[p]||0),0)})).filter(p=>p.t>0).sort((a,b)=>b.t-a.t),[ad,dd]);
  const sr=useMemo(()=>search.trim()?so.filter(p=>p.n.toLowerCase().includes(search.toLowerCase())):[],[search,so]);
  const tp=p=>sSP(v=>v.includes(p)?v.filter(x=>x!==p):[...v,p]);
  const s1=p=>{sSP([p]);sTB("sales");sSEC("daily");};
  const bd=useMemo(()=>{let b={d:"",t:0};fd.forEach(d=>{const t=sp.reduce((s,p)=>s+(dd[d]?.[p]||0),0);if(t>b.t)b={d,t};});return b;},[fd,sp,dd]);
  const insights=useMemo(()=>{if(fd.length===0)return[];const msgs=[];
    // Current range totals per person
    const cur={};PP.forEach(p=>{cur[p]=0;fd.forEach(d=>{cur[p]+=dd[d]?.[p]||0;});});
    const ranked=PP.filter(p=>cur[p]>0).sort((a,b)=>cur[b]-cur[a]);
    // Previous period of same length
    const len=fd.length;const firstD=fd[0];const allD=Object.keys(dd).sort();const fi=allD.indexOf(firstD);
    const prevDays=fi>=len?allD.slice(fi-len,fi):[];
    const prev={};PP.forEach(p=>{prev[p]=0;prevDays.forEach(d=>{prev[p]+=dd[d]?.[p]||0;});});
    const prevTotal=Object.values(prev).reduce((a,b)=>a+b,0);const curTotal=Object.values(cur).reduce((a,b)=>a+b,0);
    // Ajay comparison
    if(prev.AJAY>0){const ch=((cur.AJAY/prev.AJAY)-1)*100;
      if(Math.abs(ch)>5)msgs.push({t:ch>0?`AJAY up ${Math.abs(ch).toFixed(0)}% vs prev period (${FF(cur.AJAY)} → was ${FF(prev.AJAY)})`:`AJAY down ${Math.abs(ch).toFixed(0)}% vs prev period (${FF(cur.AJAY)} → was ${FF(prev.AJAY)})`,c:ch>0?"#10b981":"#ef4444"});}
    // Who improved most
    const changes=ranked.filter(p=>prev[p]>100).map(p=>({p,ch:((cur[p]/(prev[p]||1))-1)*100})).sort((a,b)=>b.ch-a.ch);
    if(changes.length>1){const best=changes[0];const worst=changes[changes.length-1];
      if(best.ch>10&&best.p!=="AJAY")msgs.push({t:`${best.p} surged ${best.ch.toFixed(0)}% vs last period`,c:"#10b981"});
      if(worst.ch<-15)msgs.push({t:`${worst.p} dropped ${Math.abs(worst.ch).toFixed(0)}%`,c:"#ef4444"});}
    // Flips — someone overtook someone else
    const prevRanked=PP.filter(p=>prev[p]>0).sort((a,b)=>prev[b]-prev[a]);
    if(prevRanked.length>=2&&ranked.length>=2){
      for(let i=0;i<Math.min(4,ranked.length);i++){const p=ranked[i];const oldIdx=prevRanked.indexOf(p);
        if(oldIdx>i&&oldIdx-i>=2)msgs.push({t:`${p} jumped from #${oldIdx+1} to #${i+1}`,c:"#f59e0b"});
        if(oldIdx>=0&&oldIdx<i&&i-oldIdx>=2)msgs.push({t:`${p} slipped from #${oldIdx+1} to #${i+1}`,c:"#ef4444"});}}
    // Overall period comparison
    if(prevTotal>0&&curTotal>0){const ch=((curTotal/prevTotal)-1)*100;
      if(Math.abs(ch)>5)msgs.push({t:`Total revenue ${ch>0?"up":"down"} ${Math.abs(ch).toFixed(0)}% vs previous ${len}d`,c:ch>0?"#10b981":"#ef4444"});}
    // Daily average vs YTD
    const curAvg=fd.length>0?curTotal/fd.length:0;const ytdAvg=ad.length>0?gT/ad.length:0;
    if(ytdAvg>0){const vs=((curAvg/ytdAvg)-1)*100;
      if(Math.abs(vs)>10)msgs.push({t:`Avg ${FF(Math.round(curAvg))}/day — ${vs>0?Math.abs(vs).toFixed(0)+"% above":""+Math.abs(vs).toFixed(0)+"% below"} YTD average`,c:vs>0?"#10b981":"#ef4444"});}
    // Best day callout
    if(bd.t>0&&bd.d){const who=PP.filter(p=>(dd[bd.d]?.[p]||0)>0).sort((a,b)=>(dd[bd.d]?.[b]||0)-(dd[bd.d]?.[a]||0))[0];
      if(who)msgs.push({t:`Best day: ${SD(bd.d)} at ${FF(bd.t)} — ${who} led with ${FF(dd[bd.d]?.[who]||0)}`,c:"#f59e0b"});}
    return msgs.slice(0,4);},[fd,dd,sp,bd,ad,gT]);
  const ma=useMemo(()=>{const m={};ad.forEach(d=>{const mo=d.substring(5,7)==="01"?"Jan":"Feb";if(!m[mo])m[mo]={};PP.forEach(p=>{m[mo][p]=(m[mo][p]||0)+(dd[d]?.[p]||0);});});return Object.entries(m).map(([month,data])=>({month,...data}));},[ad,dd]);
  const impStats=useMemo(()=>{if(!impItems)return null;const fl=impItems.filter(i=>i.fl.length>0);const unk=impItems.filter(i=>i.owner==="UNKNOWN"&&(!i.splits||i.splits.length===0));const spl=impItems.filter(i=>i.fl.includes("split_pay"));const ref=impItems.filter(i=>i.fl.includes("refunded"));
    return{fl,unk,spl,ref,total:impItems.reduce((s,i)=>s+i.amt,0),dates:[...new Set(impItems.map(i=>i.date))].length,count:impItems.length};},[impItems]);
  const filtImp=useMemo(()=>{if(!impItems)return[];if(impFilter==="all")return impItems;if(impFilter==="flags")return impItems.filter(i=>i.fl.length>0);if(impFilter==="split")return impItems.filter(i=>i.fl.includes("split_pay"));if(impFilter==="refunded")return impItems.filter(i=>i.fl.includes("refunded"));return impItems.filter(i=>i.owner==="UNKNOWN"&&(!i.splits||i.splits.length===0));},[impItems,impFilter]);
  const impBreakdown=useMemo(()=>{if(!impItems)return{};
    const totals={};const add=(p,v)=>{if(v>0)totals[p]=(totals[p]||0)+Math.round(v*100)/100;};
    const lFee=impCh==="square"?SQ_FEE:impCh==="shopify"?SHOP_FEE:0;
    for(const it of impItems){if(it.fl.includes("refunded"))continue;if(it.owner==="UNKNOWN"&&(!it.splits||it.splits.length===0))continue;
      if(it.splits&&it.splits.length>0){
        for(const splt of it.splits){if(!splt.owner||splt.owner==="UNKNOWN"||!(splt.amt>0))continue;
          if(OWNERS.has(splt.owner)){add(splt.owner,splt.amt*(1-lFee));}
          else{const cfg=COMM[splt.owner]||DEF_COMM;add(splt.owner,splt.amt*(1-cfg.rate));const cn=Math.max(0,splt.amt*cfg.rate-splt.amt*lFee);
            if(cfg.split==="AJAY")add("AJAY",cn);else if(cfg.split==="DEREK")add("DEREK",cn);else{add("AJAY",cn/2);add("DEREK",cn/2);}}}
      }else{const eff=it.personAmt!=null?it.personAmt:it.amt;
        if(OWNERS.has(it.owner)){add(it.owner,eff*(1-lFee));}
        else{const cfg=COMM[it.owner]||DEF_COMM;add(it.owner,eff*(1-cfg.rate));const cn=Math.max(0,eff*cfg.rate-eff*lFee);
          if(cfg.split==="AJAY")add("AJAY",cn);else if(cfg.split==="DEREK")add("DEREK",cn);else{add("AJAY",cn/2);add("DEREK",cn/2);}}}}
    return totals;},[impItems,impCh]);

  const is={background:T.inputBg,border:`1px solid ${T.border}`,borderRadius:8,padding:`${ds(8)}px ${ds(12)}px`,color:T.text,fontSize:fs(13),outline:"none"};
  const pl=(a,c=AC)=>({padding:`${ds(4)}px ${ds(12)}px`,borderRadius:20,border:"1px solid",borderColor:a?`${c}60`:T.border,background:a?`${c}15`:"transparent",color:a?c:T.muted,cursor:"pointer",fontSize:fs(11),fontWeight:600});
  const bt=a=>({padding:`${ds(4)}px ${ds(14)}px`,borderRadius:6,border:`1px solid ${a?`${AC}33`:T.border}`,background:a?`${AC}18`:"transparent",color:a?AC:T.subtle,cursor:"pointer",fontSize:fs(11),fontWeight:600});
  const cr={background:T.card,borderRadius:10,padding:`${ds(14)}px ${ds(16)}px`,border:`1px solid ${T.border}`};
  const sx={background:T.card,borderRadius:10,border:`1px solid ${T.border}`,padding:`${ds(20)}px ${ds(10)}px ${ds(10)}px`};
  const presets=[{l:"Today",f:TODAY,t:TODAY},{l:"Week",f:daysAgo(7),t:TODAY},{l:"14d",f:daysAgo(14),t:TODAY},{l:"Feb",f:"2026-02-01",t:TODAY},{l:"Jan",f:"2026-01-01",t:"2026-01-31"},{l:"All",f:"2026-01-01",t:TODAY}];
  const iv=Math.floor(fd.length>14?fd.length/8:0);const iv2=Math.max(1,Math.floor(stfD.length/8));

  if(!authed)return loginScreen;
  const isLeft=uiCfg.tabPos==="left";const isBottom=uiCfg.tabPos==="bottom";
  return(<div style={{minHeight:"100vh",background:T.bg,padding:`${ds(12)}px ${ds(16)}px`,fontFamily:"'Segoe UI',system-ui,sans-serif",color:T.text,fontSize:fs(13),paddingBottom:isBottom?60:undefined}}>
    <div style={{maxWidth:1400,margin:"0 auto",display:isLeft?"flex":"block",gap:isLeft?ds(16):undefined}}>
      {toast&&<div style={{position:"fixed",top:20,right:20,background:T.toast,border:"1px solid #22c55e40",borderRadius:10,padding:"12px 20px",color:"#22c55e",fontSize:fs(13),fontWeight:600,zIndex:1000}}>{toast}</div>}
      {viewImg&&<div onClick={()=>sViewImg(null)} style={{position:"fixed",inset:0,background:T.overlay,zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><img src={viewImg} style={{maxWidth:"90%",maxHeight:"90%",borderRadius:8,boxShadow:"0 4px 30px rgba(0,0,0,.6)"}}/><button onClick={()=>sViewImg(null)} style={{position:"absolute",top:16,right:16,background:"transparent",border:"none",color:T.text,fontSize:24,cursor:"pointer"}}>×</button></div>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><img src="data:image/png;base64,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" style={{width:38,height:38,borderRadius:8,objectFit:"contain"}}/><div><h1 style={{fontSize:20,fontWeight:800,margin:0}}>UNBOXED TCG</h1><p style={{color:AC,fontSize:fs(10),fontWeight:600,margin:0,letterSpacing:2.5}}>SALES DASHBOARD</p></div></div>
        <div style={{position:"relative",minWidth:200}}><input type="text" placeholder="Search..." value={search} onChange={e=>sSR(e.target.value)} style={{...is,width:"100%",paddingLeft:32}}/><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#71717a",fontSize:13}}>🔍</span>
          {search&&sr.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,marginTop:4,background:"#16162a",border:"1px solid #3f3f46",borderRadius:10,overflow:"hidden",zIndex:100}}>
            {sr.map(({n:p,t})=>(<div key={p} onClick={()=>{s1(p);sSR("");}} style={{padding:"10px 14px",cursor:"pointer",display:"flex",justifyContent:"space-between",borderBottom:"1px solid rgba(63,63,70,.5)"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(63,63,70,.6)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:"50%",background:CO[p]}}/><span style={{fontWeight:600,fontSize:13}}>{p}</span></div><span style={{color:"#a1a1aa",fontFamily:"monospace",fontSize:12}}>{FF(t)}</span></div>))}</div>}</div>
      </div>
      {(()=>{const tabItems=[["home","🏠 Home"],["input","💳 Transactions"],["sales","📊 Analytics"],["people","👥 People"],["settings","⚙️ Settings"]].filter(([id])=>!(viewOnly&&id==="input"));
        const tabBtns=tabItems.map(([id,lb])=>(<button key={id} onClick={()=>{sTB(id);if(id==="sales")sSEC("daily");if(id==="input")sSEC("manual");}} style={{flex:isLeft?"none":"0 0 auto",padding:isLeft?`${ds(10)}px ${ds(14)}px`:`${ds(10)}px ${ds(14)}px`,borderRadius:8,border:"none",background:tab===id?T.tabActive:"transparent",color:tab===id?T.text:T.muted,cursor:"pointer",fontSize:fs(12),fontWeight:600,whiteSpace:"nowrap",textAlign:isLeft?"left":"center",width:isLeft?"100%":"auto"}}>{lb}</button>));
        const voTag=viewOnly?<div style={{display:"flex",alignItems:"center",marginLeft:isLeft?0:"auto",padding:"4px 10px",borderRadius:6,background:"rgba(139,92,246,.15)",border:"1px solid rgba(139,92,246,.3)",marginTop:isLeft?4:0}}><span style={{color:"#a78bfa",fontSize:9,fontWeight:700,letterSpacing:1}}>👁 VIEW ONLY</span></div>:null;
        if(isBottom)return <div style={{position:"fixed",bottom:0,left:0,right:0,display:"flex",gap:2,background:T.card,borderTop:`1px solid ${T.border}`,padding:3,zIndex:900,justifyContent:"center"}}>{tabBtns}{voTag}</div>;
        if(isLeft)return <div style={{minWidth:160,display:"flex",flexDirection:"column",gap:2,background:T.tabBg,borderRadius:10,padding:3,position:"sticky",top:12,alignSelf:"flex-start"}}>{tabBtns}{voTag}</div>;
        return <div style={{display:"flex",gap:2,marginBottom:20,background:T.tabBg,borderRadius:10,padding:3}}>{tabBtns}{voTag}</div>;
      })()}
      <div style={isLeft?{flex:1,minWidth:0}:{}}>

{/* ===== HOME ===== */}
{tab==="home"&&<>
  {!uiCfg.hidden?.["home.ytd"]&&<div style={{...cr,padding:"20px",marginBottom:16}}>

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div><div style={{color:AC,fontSize:10,fontWeight:600,letterSpacing:1.5}}>YTD REVENUE</div><div style={{color:"#fafafa",fontSize:32,fontWeight:800,fontFamily:"monospace"}}>{FF(lastB.total)}</div></div>
      <div style={{textAlign:"right"}}><div style={{color:"#71717a",fontSize:11}}>52 days</div><div style={{color:"#a1a1aa",fontFamily:"monospace",fontSize:13}}>{FF(Math.round(lastB.total/52))}/day</div></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
      {[["AJAY",lastB.AJAY],["DEREK",lastB.DEREK],["SHARED",lastB.SHARED],["LJ",lastB.LJ]].map(([n,v])=>{const rank=["AJAY","DEREK","SHARED","LJ"].sort((a,b)=>(a==="AJAY"?lastB.AJAY:a==="DEREK"?lastB.DEREK:a==="SHARED"?lastB.SHARED:lastB.LJ)>(b==="AJAY"?lastB.AJAY:b==="DEREK"?lastB.DEREK:b==="SHARED"?lastB.SHARED:lastB.LJ)?-1:1).indexOf(n)+1;
        return(<div key={n} style={{padding:"10px 12px",borderRadius:10,background:"rgba(63,63,70,.4)",border:`1px solid ${CO[n]}20`}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:CO[n],fontSize:10,fontWeight:600}}>{n}</span><span style={{color:"#52525b",fontSize:9}}>#{rank}</span></div>
        <div style={{color:"#fafafa",fontSize:17,fontWeight:800,fontFamily:"monospace"}}>{F(v)}</div>
        <div style={{color:"#71717a",fontSize:10}}>{(v/lastB.total*100).toFixed(0)}%</div>
      </div>)})}
    </div>
  </div>}
  {!uiCfg.hidden?.["home.bank"]&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:16}}>
    {(()=>{const totalAmex=Object.values(balances).reduce((s,b)=>s+b.amex,0);const extraAmex=bankBals.AMEX-totalAmex;return(
    <div style={{...cr,padding:"12px",borderLeft:"3px solid #06b6d4"}}><div style={{color:"#06b6d4",fontSize:9,fontWeight:700}}>AMEX ACCT</div><div style={{color:bankBals.AMEX>=0?"#10b981":"#ef4444",fontSize:17,fontWeight:800,fontFamily:"monospace"}}>{FX(bankBals.AMEX)}</div><div style={{color:extraAmex>=0?"#52525b":"#ef4444",fontSize:9,fontFamily:"monospace",marginTop:2}}>({extraAmex>=0?"+":""}{FX(extraAmex)} extra)</div></div>);})()}
    <div style={{...cr,padding:"12px",borderLeft:"3px solid #3b82f6"}}><div style={{color:"#3b82f6",fontSize:9,fontWeight:700}}>CHASE ACCT</div><div style={{color:bankBals.CHASE>=0?"#10b981":"#ef4444",fontSize:17,fontWeight:800,fontFamily:"monospace"}}>{FX(bankBals.CHASE)}</div></div>
    {(()=>{const totalCash=Object.values(balances).reduce((s,b)=>s+b.cash,0);return(
    <div style={{...cr,padding:"12px",borderLeft:`3px solid ${AC}`}}><div style={{color:AC,fontSize:9,fontWeight:700}}>CASH ON HAND</div><div style={{color:"#fafafa",fontSize:17,fontWeight:800,fontFamily:"monospace"}}>{FF(totalCash)}</div></div>);})()}
  </div>}
  {!uiCfg.hidden?.["home.balances"]&&<><div style={{color:T.muted,fontSize:11,fontWeight:600,letterSpacing:1,marginBottom:8}}>ACCOUNT BALANCES</div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:8,marginBottom:16}}>
    {Object.entries(balances).filter(([,b])=>b.cash||b.amex||b.overall).sort(([,a],[,b])=>b.overall-a.overall).map(([n,b])=>(<div key={n} style={{...cr,padding:"12px 14px",borderLeft:`3px solid ${CO[n]||"#555"}`}}>
      <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:CO[n]||"#999",fontSize:11,fontWeight:700}}>{n}</span><span style={{color:b.overall<0?"#ef4444":T.text,fontSize:15,fontWeight:800,fontFamily:"monospace"}}>{FX(b.overall)}</span></div>
      <div style={{display:"flex",gap:10,marginTop:3,fontSize:10}}><span style={{color:"#a1a1aa"}}>Cash <span style={{color:b.cash<0?"#ef4444":"#555",fontFamily:"monospace"}}>{FX(b.cash)}</span></span><span style={{color:"#a1a1aa"}}>Amex <span style={{color:b.amex<0?"#ef4444":"#555",fontFamily:"monospace"}}>{FX(b.amex)}</span></span></div>
    </div>))}
  </div></>}
</>}

{/* ===== ANALYTICS ===== */}
{tab==="sales"&&<>
  <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>{[["daily","📊 Daily"],["breakdown","📋 Breakdown"],["channels","💳 Channels"],["products","🏷️ Products"],["consign","📦 Consign"],["monthly","📅 Monthly"],["growth","📈 Growth"],["goal","🎯 Goal"]].filter(([k])=>!uiCfg.hidden?.[`analytics.${k}`]).map(([k,l])=>(<button key={k} onClick={()=>sSEC(k)} style={bt(sec===k)}>{l}</button>))}</div>
  <div style={{...cr,marginBottom:12,padding:"12px 14px"}}><div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",marginBottom:8}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>RANGE</span>{presets.map(p=>(<button key={p.l} onClick={()=>{sDF(p.f);sDT(p.t);}} style={bt(df===p.f&&dt===p.t)}>{p.l}</button>))}</div>
    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}><input type="date" value={df} onChange={e=>sDF(e.target.value)} style={{...is,fontSize:11,flex:1,minWidth:110,colorScheme:"dark"}}/><span style={{color:"#a1a1aa"}}>→</span><input type="date" value={dt} onChange={e=>sDT(e.target.value)} style={{...is,fontSize:11,flex:1,minWidth:110,colorScheme:"dark"}}/><span style={{color:"#71717a",fontSize:11}}>{fd.length}d</span></div></div>
  {sec==="daily"&&<>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
      {[["all","All"],["shopify","Shopify"],["square","Square"],["cash","Cash"],["amex","Amex"]].map(([k,l])=>(<button key={k} onClick={()=>sDCh(k)} style={{padding:"4px 12px",borderRadius:20,border:"1px solid",borderColor:dCh===k?(k==="all"?"rgba(255,255,255,.2)":`${CC[k]}60`):"rgba(63,63,70,.7)",background:dCh===k?(k==="all"?"#3f3f46":`${CC[k]}15`):"transparent",color:dCh===k?(k==="all"?"#fff":CC[k]):"#444",cursor:"pointer",fontSize:11,fontWeight:600}}>{l}</button>))}
    </div>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{sbr.map(({n:p})=>(<button key={p} onClick={()=>tp(p)} style={pl(sp.includes(p),CO[p])}>{p}</button>))}</div>
    {(()=>{const selT=sp.reduce((s,p)=>s+(rs[p]||0),0);const selYTD=sp.reduce((s,p)=>{let t=0;ad.forEach(d=>{if(dCh==="all"){t+=dd[d]?.[p]||0;}else{const chTot=cd[d]?.[dCh]||0;const dayTot=Object.values(dd[d]||{}).reduce((a,b)=>a+b,0);t+=dayTot>0?Math.round((dd[d]?.[p]||0)*chTot/dayTot*100)/100:0;}});return s+t;},0);return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:10}}>{[{l:"RANGE",v:F(selT)},{l:"AVG/DAY",v:F(fd.length>0?selT/fd.length:0)},{l:"BEST",v:F(bd.t),s:bd.d?SD(bd.d):"—"},{l:"YTD",v:F(selYTD)}].map((s,i)=>(<div key={i} style={cr}><div style={{color:"#71717a",fontSize:9,fontWeight:600}}>{s.l}</div><div style={{color:s.l==="BEST"?"#f59e0b":"#fff",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{s.v}</div>{s.s&&<div style={{color:"#71717a",fontSize:10}}>{s.s}</div>}</div>))}</div>);})()}
    {insights.length>0&&<div style={{marginBottom:10,padding:"10px 14px",background:"rgba(63,63,70,.3)",borderRadius:10,border:"1px solid rgba(63,63,70,.5)",display:"flex",flexDirection:"column",gap:4}}>
      {insights.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:m.c,fontSize:10}}>●</span><span style={{color:"#d4d4d8",fontSize:11}}>{m.t}</span></div>))}</div>}
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:10,alignItems:"center"}}>
      <div><ResponsiveContainer width={160} height={160}>
        <PieChart><Pie data={sbr.filter(({n,t})=>t>0&&sp.includes(n)).map(({n,t})=>({name:n,value:Math.round(t)}))} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={64} paddingAngle={2} strokeWidth={0}>
          {sbr.filter(({n,t})=>t>0&&sp.includes(n)).map(({n})=>(<Cell key={n} fill={CO[n]}/>))}
        </Pie><Tooltip formatter={v=>FF(v)}/></PieChart>
      </ResponsiveContainer></div>
      <div style={{width:"100%"}}>{(()=>{const vis=sbr.filter(({n})=>sp.includes(n)).slice(0,6);const visT=vis.reduce((s,{t})=>s+t,0);return vis.map(({n:p,t})=>(<div key={p} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0"}}><div style={{width:8,height:8,borderRadius:"50%",background:CO[p],flexShrink:0}}/><span style={{color:CO[p],fontSize:11,fontWeight:600,minWidth:50}}>{p}</span><span style={{color:"#71717a",fontSize:10,minWidth:28,textAlign:"right"}}>{visT>0?`${(t/visT*100).toFixed(0)}%`:""}</span><div style={{flex:1,height:3,background:"rgba(63,63,70,.5)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${sbr[0]?.t>0?(t/sbr[0].t)*100:0}%`,background:CO[p],borderRadius:2,opacity:.5}}/></div><span style={{color:"#a1a1aa",fontFamily:"monospace",fontSize:10,minWidth:48,textAlign:"right"}}>{FF(t)}</span></div>));})()}</div>
    </div>
    <div style={{display:"flex",gap:6,marginBottom:8,justifyContent:"flex-end"}}>{["area","bar"].map(t=>(<button key={t} onClick={()=>sCT(t)} style={bt(ct===t)}>{t[0].toUpperCase()+t.slice(1)}</button>))}<div style={{width:1,height:18,background:"rgba(63,63,70,.7)",alignSelf:"center"}}/><button onClick={()=>sSTot(!showTot)} style={bt(showTot)}>Σ Total</button></div>
    <div style={sx}><ResponsiveContainer width="100%" height={320}>
      {ct==="area"?<ComposedChart data={chD}><defs>{sp.map(p=>(<linearGradient key={p} id={`g-${p}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CO[p]} stopOpacity={.25}/><stop offset="100%" stopColor={CO[p]} stopOpacity={0}/></linearGradient>))}</defs><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#888",fontSize:10}} axisLine={{stroke:"#3f3f46"}} tickLine={false} interval={iv}/><YAxis tick={{fill:"#555",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={50}/><Tooltip content={<TT/>}/>{sp.map(p=>(<Area key={p} type="monotone" dataKey={p} stroke={CO[p]} fill={`url(#g-${p})`} strokeWidth={2} dot={fd.length<=14?{fill:CO[p],r:3,strokeWidth:0}:false}/>))}{showTot&&<Line type="monotone" dataKey="_t" stroke="#ffffff40" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Total"/>}</ComposedChart>
      :<BarChart data={chD} barCategoryGap="15%"><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#888",fontSize:10}} axisLine={{stroke:"#3f3f46"}} tickLine={false} interval={iv}/><YAxis tick={{fill:"#555",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={50}/><Tooltip content={<TT/>}/>{sp.map(p=>(<Bar key={p} dataKey={p} fill={CO[p]} radius={[2,2,0,0]} maxBarSize={24}/>))}</BarChart>}
    </ResponsiveContainer></div>
    <div style={{...cr,marginTop:10,overflow:"hidden",padding:0}}><div style={{padding:"8px 16px",borderBottom:"1px solid rgba(63,63,70,.5)"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>LEADERBOARD</span></div>
      {sbr.slice(0,8).map(({n:p,t},i)=>(<div key={p} onClick={()=>tp(p)} style={{display:"flex",alignItems:"center",padding:"7px 16px",gap:8,borderBottom:"1px solid rgba(63,63,70,.3)",cursor:"pointer"}}><span style={{color:"#52525b",fontSize:11,fontWeight:800,width:16}}>#{i+1}</span><div style={{width:6,height:6,borderRadius:"50%",background:CO[p]}}/><span style={{color:sp.includes(p)?CO[p]:"#888",fontWeight:600,fontSize:11,flex:1}}>{p}</span><div style={{flex:2,height:3,background:"rgba(63,63,70,.4)",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${(t/sbr[0].t)*100}%`,background:CO[p],borderRadius:2,opacity:.5}}/></div><span style={{color:"#a1a1aa",fontFamily:"monospace",fontSize:10,minWidth:50,textAlign:"right"}}>{FF(t)}</span></div>))}</div>
    <div style={{...cr,marginTop:10,padding:"10px 16px"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>CUMULATIVE REVENUE</span></div>
    <div style={sx}><ResponsiveContainer width="100%" height={240}>
      <AreaChart data={(()=>{const allD=Object.keys(dd).sort();const pre={};allD.filter(x=>x<fd[0]).forEach(x=>{sp.forEach(p=>{pre[p]=(pre[p]||0)+(dd[x]?.[p]||0);});});const c={...pre};return fd.map(d=>{sp.forEach(p=>{c[p]=(c[p]||0)+(dd[d]?.[p]||0);});return{day:SD(d),...Object.fromEntries(sp.map(p=>[p,c[p]||0]))};});})()}><defs>{sp.map(p=>(<linearGradient key={p} id={`gd-${p}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CO[p]} stopOpacity={.15}/><stop offset="100%" stopColor={CO[p]} stopOpacity={0}/></linearGradient>))}</defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={iv}/><YAxis tick={{fill:"#444",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={48}/><Tooltip content={<TT/>}/>
        {sp.map(p=>(<Area key={p} type="monotone" dataKey={p} stroke={CO[p]} fill={`url(#gd-${p})`} strokeWidth={1.5} dot={false}/>))}
      </AreaChart></ResponsiveContainer></div>
  </>}
  {sec==="breakdown"&&(()=>{
    const chs=["shopify","square","cash","amex"];
    const ppl=sbr.filter(({t})=>t>0).map(({n})=>n);
    const rawRows=fd.map(d=>({d,ppl:ppl.map(p=>dd[d]?.[p]||0),chs:chs.map(k=>cd[d]?.[k]||0),pTot:ppl.reduce((s,p)=>s+(dd[d]?.[p]||0),0),chTot:chs.reduce((s,k)=>s+(cd[d]?.[k]||0),0)}));
    // Sort
    const togSort=(col)=>sBkSort(s=>s.col===col?{col,dir:s.dir==="desc"?"asc":"desc"}:{col,dir:"desc"});
    const sortedRows=[...rawRows].sort((a,b)=>{const m=bkSort.dir==="desc"?-1:1;
      if(bkSort.col==="date")return a.d>b.d?-m:m;
      if(bkSort.col==="total")return(a.pTot-b.pTot)*-m;
      if(bkSort.col==="chTot")return(a.chTot-b.chTot)*-m;
      const ci=chs.indexOf(bkSort.col);if(ci>=0)return(a.chs[ci]-b.chs[ci])*-m;
      const pi=ppl.indexOf(bkSort.col);if(pi>=0)return(a.ppl[pi]-b.ppl[pi])*-m;
      return 0;});
    const grandP=ppl.map((_,i)=>rawRows.reduce((s,r)=>s+r.ppl[i],0));
    const grandC=chs.map((_,i)=>rawRows.reduce((s,r)=>s+r.chs[i],0));
    const hd=(col,label,color)=>{const active=bkSort.col===col;return(<th key={col} onClick={()=>togSort(col)} style={{padding:"8px 6px",textAlign:"right",color:active?"#fff":color,fontWeight:700,cursor:"pointer",userSelect:"none",whiteSpace:"nowrap"}}>{label}{active?(bkSort.dir==="desc"?" ▼":" ▲"):""}</th>);};
    return(<>
      <div style={{...cr,overflow:"hidden",padding:0}}>
        <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:10,minWidth:500}}>
            <thead><tr style={{borderBottom:"1px solid rgba(63,63,70,.7)"}}>
              <th onClick={()=>togSort("date")} style={{padding:"8px 10px",textAlign:"left",color:bkSort.col==="date"?"#fff":"#555",fontWeight:700,position:"sticky",left:0,background:"#27272a",zIndex:1,cursor:"pointer"}}>DATE{bkSort.col==="date"?(bkSort.dir==="desc"?" ▼":" ▲"):""}</th>
              {chs.map(k=>hd(k,k.slice(0,4).toUpperCase(),CC[k]))}
              {hd("chTot","CH TOT","#555")}
              {ppl.map(p=>hd(p,p.slice(0,4),CO[p]))}
              {hd("total","TOTAL","#fff")}
            </tr></thead>
            <tbody>
              {sortedRows.map(r=>(<tr key={r.d} style={{borderBottom:"1px solid rgba(63,63,70,.3)"}}>
                <td style={{padding:"6px 10px",color:"#a1a1aa",fontWeight:600,position:"sticky",left:0,background:"#27272a",zIndex:1}}>{SD(r.d)}</td>
                {r.chs.map((v,i)=>(<td key={i} style={{padding:"6px 6px",textAlign:"right",fontFamily:"monospace",color:v>0?CC[chs[i]]:"#222"}}>{v>0?FF(v):"—"}</td>))}
                <td style={{padding:"6px 6px",textAlign:"right",fontFamily:"monospace",color:"#71717a"}}>{FF(r.chTot)}</td>
                {r.ppl.map((v,i)=>(<td key={i} style={{padding:"6px 6px",textAlign:"right",fontFamily:"monospace",color:v>0?CO[ppl[i]]:"#222",fontSize:9}}>{v>0?FF(v):"—"}</td>))}
                <td style={{padding:"6px 6px",textAlign:"right",fontFamily:"monospace",color:"#fafafa",fontWeight:700}}>{FF(r.pTot)}</td>
              </tr>))}
            </tbody>
            <tfoot><tr style={{borderTop:"2px solid #3f3f46"}}>
              <td style={{padding:"8px 10px",color:"#fafafa",fontWeight:800,position:"sticky",left:0,background:"#27272a",zIndex:1}}>TOTAL</td>
              {grandC.map((v,i)=>(<td key={i} style={{padding:"8px 6px",textAlign:"right",fontFamily:"monospace",color:CC[chs[i]],fontWeight:700}}>{FF(v)}</td>))}
              <td style={{padding:"8px 6px",textAlign:"right",fontFamily:"monospace",color:"#a1a1aa",fontWeight:700}}>{FF(grandC.reduce((s,v)=>s+v,0))}</td>
              {grandP.map((v,i)=>(<td key={i} style={{padding:"8px 6px",textAlign:"right",fontFamily:"monospace",color:CO[ppl[i]],fontWeight:700,fontSize:9}}>{FF(v)}</td>))}
              <td style={{padding:"8px 6px",textAlign:"right",fontFamily:"monospace",color:"#fafafa",fontWeight:800}}>{FF(grandP.reduce((s,v)=>s+v,0))}</td>
            </tr></tfoot>
          </table>
        </div>
      </div>
    </>);
  })()}
  {sec==="channels"&&<>
    <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:12}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {["shopify","square","cash","amex"].map(k=>(<div key={k} style={{...cr,borderLeft:`3px solid ${CC[k]}`,padding:"10px 12px"}}><div style={{color:"#71717a",fontSize:9,fontWeight:600}}>{k.toUpperCase()}</div><div style={{color:"#fafafa",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{F(rc[k]||0)}</div><div style={{color:"#a1a1aa",fontSize:10}}>{rT>0?`${((rc[k]||0)/rT*100).toFixed(0)}%`:""}</div></div>))}
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart><Pie data={["shopify","square","cash","amex"].filter(k=>rc[k]>0).map(k=>({name:CL[k],value:Math.round(rc[k]),fill:CC[k]}))} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={2} strokeWidth={0}>
            {["shopify","square","cash","amex"].filter(k=>rc[k]>0).map(k=>(<Cell key={k} fill={CC[k]}/>))}
          </Pie><Tooltip formatter={v=>FF(v)}/></PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div style={{display:"flex",gap:5,marginBottom:10}}>{["shopify","square","cash","amex"].map(k=>(<button key={k} onClick={()=>sVisCh(v=>v.includes(k)?v.filter(x=>x!==k):[...v,k])} style={pl(visCh.includes(k),CC[k])}>{CL[k]}</button>))}</div>
    <div style={{...cr,marginBottom:4,padding:"10px 16px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>DAILY BY CHANNEL</span><div style={{display:"flex",gap:6}}>{["stacked","grouped"].map(v=>(<button key={v} onClick={()=>sCV(v)} style={bt(cv===v)}>{v[0].toUpperCase()+v.slice(1)}</button>))}</div></div></div>
    <div style={sx}><ResponsiveContainer width="100%" height={260}><BarChart data={chC} barCategoryGap="15%"><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#888",fontSize:10}} axisLine={{stroke:"#3f3f46"}} tickLine={false} interval={iv}/><YAxis tick={{fill:"#555",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={50}/><Tooltip content={<TT/>}/>{visCh.map(ch=>(<Bar key={ch} dataKey={ch} fill={CC[ch]} stackId={cv==="stacked"?"s":undefined} radius={cv==="stacked"?0:[2,2,0,0]} maxBarSize={cv==="stacked"?undefined:20}/>))}</BarChart></ResponsiveContainer></div>
    <div style={{...cr,marginTop:12,marginBottom:4,padding:"10px 16px"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>CUMULATIVE BY CHANNEL</span></div>
    <div style={sx}><ResponsiveContainer width="100%" height={240}>
      <AreaChart data={chCCum}><defs>{visCh.map(k=>(<linearGradient key={k} id={`gc-${k}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CC[k]} stopOpacity={.2}/><stop offset="100%" stopColor={CC[k]} stopOpacity={0}/></linearGradient>))}</defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#888",fontSize:10}} axisLine={{stroke:"#3f3f46"}} tickLine={false} interval={iv}/><YAxis tick={{fill:"#555",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={50}/><Tooltip content={<TT/>}/>
        {visCh.map(k=>(<Area key={k} type="monotone" dataKey={k} stroke={CC[k]} fill={`url(#gc-${k})`} strokeWidth={2} dot={false}/>))}
      </AreaChart></ResponsiveContainer></div>
    <div style={{display:"grid",gridTemplateColumns:visCh.length<=2?"1fr":"1fr",gap:10,marginTop:12}}>
      {visCh.map(ch=>{const chData=fd.map(d=>({day:SD(d),v:cd[d]?.[ch]||0}));const chTotal=chData.reduce((s,d)=>s+d.v,0);
        return(<div key={ch} style={{...cr,padding:"12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{color:CC[ch],fontSize:11,fontWeight:700}}>{CL[ch]} Daily</span><span style={{color:"#fafafa",fontFamily:"monospace",fontSize:13,fontWeight:700}}>{FF(chTotal)}</span></div>
          <ResponsiveContainer width="100%" height={120}><BarChart data={chData} barCategoryGap="20%"><XAxis dataKey="day" tick={false} axisLine={false}/><YAxis hide/><Tooltip formatter={v=>FF(v)}/><Bar dataKey="v" fill={CC[ch]} radius={[2,2,0,0]} maxBarSize={12} name={CL[ch]}/></BarChart></ResponsiveContainer>
        </div>)})}
    </div>
  </>}
  {sec==="products"&&(()=>{
    // Classify items from entries
    const SEALED_KW=["ETB","BOOSTER","BOX","BUNDLE","BLISTER","TIN","COLLECTION","PACK","DISPLAY","CASE","CRATE","TRAY","BINDER","STARTER","TOOLKIT","PREMIUM","PALDEA","PRISMATIC","SURGING","OBSIDIAN","TWILIGHT","PALDEAN","TEMPORAL","STELLAR","SHROUDED","PARADOX","SCARLET","VIOLET","CROWN","ZENITH","EVOLUTION","ASTRAL","BRILLIANT","FUSION","CHILLING","VIVID","CHAMPION","DARKNESS","SHINING","CELEBRATIONS","HIDDEN","ULTRA","UNIFIED","UNBROKEN","COSMIC","TEAM UP","LOST","SILVER"];
    const isSealed=(r)=>{if(!r)return false;const u=r.toUpperCase();if(u.includes("(SHOP)"))return true;if(u.includes("COMM ")||u.includes("% SPLIT")||u.includes("FEE)"))return false;for(const kw of SEALED_KW)if(u.includes(kw))return true;return false;};
    const isSingle=(r)=>{if(!r)return false;const u=r.toUpperCase();if(u.includes("COMM ")||u.includes("% SPLIT")||u.includes("FEE)"))return false;if(isSealed(r))return false;if(u.includes("SNACK")||u.includes("CANDY")||u.includes("DRINK")||u.includes("SODA")||u.includes("WATER"))return false;return true;};
    const cleanName=(r)=>{if(!r)return"Unknown";let n=r;n=n.replace(/^#\d+\s*·\s*/,"");n=n.replace(/\s*\(SHOP\)\s*/gi,"");n=n.replace(/\s*\(net after.*?\)\s*/gi,"");n=n.replace(/\s*\(cash split\)\s*/gi,"");n=n.replace(/\s*\(trade split\)\s*/gi,"");n=n.replace(/shopify import|square import/gi,"").trim();return n||"Unknown";};
    // Only count IN and CONSIGNMENT entries (revenue), exclude commissions/fees
    const prodEntries=entries.filter(e=>(e.io==="IN"||e.io==="CONSIGNMENT")&&e.d>=df&&e.d<=dt&&e.r&&!e.r.match(/^\d+% (comm|split comm)/));
    const prodMap={};
    prodEntries.forEach(e=>{
      const name=cleanName(e.r);const type=isSealed(e.r)?"sealed":"single";
      if(!prodMap[name])prodMap[name]={name,type,count:0,total:0,dates:new Set(),owners:{}};
      prodMap[name].count++;prodMap[name].total+=e.a;prodMap[name].dates.add(e.d);
      prodMap[name].owners[e.p]=(prodMap[name].owners[e.p]||0)+e.a;
    });
    const products=Object.values(prodMap).sort((a,b)=>b.total-a.total);
    const sealedItems=products.filter(p=>p.type==="sealed");
    const singleItems=products.filter(p=>p.type==="single");
    const sealedTotal=sealedItems.reduce((s,p)=>s+p.total,0);
    const singleTotal=singleItems.reduce((s,p)=>s+p.total,0);
    const sealedCount=sealedItems.reduce((s,p)=>s+p.count,0);
    const singleCount=singleItems.reduce((s,p)=>s+p.count,0);
    const grandTotal=sealedTotal+singleTotal;
    const shown=prodView==="sealed"?sealedItems:prodView==="single"?singleItems:products;
    const sorted=prodSort==="count"?[...shown].sort((a,b)=>b.count-a.count):prodSort==="avg"?[...shown].sort((a,b)=>(b.total/b.count)-(a.total/a.count)):shown;
    return(<>
      {/* Sealed vs Singles comparison */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{...cr,borderTop:"3px solid #a78bfa",padding:"14px"}}>
          <div style={{color:"#a78bfa",fontSize:10,fontWeight:700,marginBottom:6}}>📦 SEALED</div>
          <div style={{color:"#fafafa",fontSize:20,fontWeight:900,fontFamily:"monospace"}}>{FF(sealedTotal)}</div>
          <div style={{color:"#71717a",fontSize:10,marginTop:2}}>{sealedCount} sales · {sealedItems.length} products</div>
          <div style={{color:"#a78bfa",fontSize:11,fontWeight:700,marginTop:4}}>{grandTotal>0?((sealedTotal/grandTotal)*100).toFixed(0):0}% of revenue</div>
        </div>
        <div style={{...cr,borderTop:"3px solid #06b6d4",padding:"14px"}}>
          <div style={{color:"#06b6d4",fontSize:10,fontWeight:700,marginBottom:6}}>🃏 SINGLES/SLABS</div>
          <div style={{color:"#fafafa",fontSize:20,fontWeight:900,fontFamily:"monospace"}}>{FF(singleTotal)}</div>
          <div style={{color:"#71717a",fontSize:10,marginTop:2}}>{singleCount} sales · {singleItems.length} products</div>
          <div style={{color:"#06b6d4",fontSize:11,fontWeight:700,marginTop:4}}>{grandTotal>0?((singleTotal/grandTotal)*100).toFixed(0):0}% of revenue</div>
        </div>
      </div>
      {/* Comparison bar */}
      {grandTotal>0&&<div style={{...cr,padding:"10px 14px",marginBottom:12}}>
        <div style={{display:"flex",borderRadius:6,overflow:"hidden",height:18}}>
          <div style={{width:`${(sealedTotal/grandTotal)*100}%`,background:"#a78bfa",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#000",fontSize:8,fontWeight:700}}>{((sealedTotal/grandTotal)*100).toFixed(0)}%</span></div>
          <div style={{width:`${(singleTotal/grandTotal)*100}%`,background:"#06b6d4",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#000",fontSize:8,fontWeight:700}}>{((singleTotal/grandTotal)*100).toFixed(0)}%</span></div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <span style={{color:"#a78bfa",fontSize:9}}>📦 Sealed</span>
          <span style={{color:"#71717a",fontSize:9}}>Avg sealed: {sealedCount>0?FX(sealedTotal/sealedCount):"-"} · Avg single: {singleCount>0?FX(singleTotal/singleCount):"-"}</span>
          <span style={{color:"#06b6d4",fontSize:9}}>🃏 Singles</span>
        </div>
      </div>}
      {/* Filters and sort */}
      <div style={{display:"flex",gap:5,marginBottom:8,flexWrap:"wrap"}}>
        {[["all",`All (${products.length})`],["sealed",`📦 Sealed (${sealedItems.length})`],["single",`🃏 Singles (${singleItems.length})`]].map(([k,l])=>(<button key={k} onClick={()=>sProdView(k)} style={pl(prodView===k,"#f59e0b")}>{l}</button>))}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:10}}>
        <span style={{color:"#52525b",fontSize:9,alignSelf:"center"}}>Sort:</span>
        {[["revenue","💰 Revenue"],["count","🔢 Qty"],["avg","📊 Avg Price"]].map(([k,l])=>(<button key={k} onClick={()=>sProdSort(k)} style={{padding:"3px 10px",borderRadius:5,border:`1px solid ${prodSort===k?`${AC}40`:T.border}`,background:prodSort===k?`${AC}18`:"transparent",color:prodSort===k?AC:"#52525b",cursor:"pointer",fontSize:9,fontWeight:600}}>{l}</button>))}
      </div>
      {/* Top products */}
      {products.length===0?<div style={{textAlign:"center",padding:20,color:"#52525b",fontSize:12}}>No product data in entries for this range. Import some CSVs first.</div>
      :<div style={{...cr,padding:0,overflow:"hidden"}}><div style={{maxHeight:400,overflowY:"auto"}}>
        {sorted.slice(0,50).map((p,i)=>{const pct=grandTotal>0?(p.total/grandTotal*100):0;
          return(<div key={i} style={{padding:"8px 14px",borderBottom:"1px solid rgba(63,63,70,.3)",display:"flex",alignItems:"center",gap:8}}>
            <span style={{color:"#52525b",fontSize:10,fontWeight:700,minWidth:20,textAlign:"right"}}>{i+1}</span>
            <span style={{fontSize:8,color:p.type==="sealed"?"#a78bfa":"#06b6d4"}}>{p.type==="sealed"?"📦":"🃏"}</span>
            <div style={{flex:1,minWidth:0}}>
              <div style={{color:"#d4d4d8",fontSize:11,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}</div>
              <div style={{display:"flex",gap:6,marginTop:2}}>
                {Object.entries(p.owners).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([o,v])=>(<span key={o} style={{color:CO[o],fontSize:8,fontWeight:600}}>{o}: {FX(v)}</span>))}
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{color:"#22c55e",fontFamily:"monospace",fontSize:12,fontWeight:700}}>{FX(p.total)}</div>
              <div style={{color:"#71717a",fontSize:9}}>{p.count}x · {pct.toFixed(1)}%</div>
            </div>
          </div>);})}
      </div></div>}
      {/* Frequent sellers - top by count */}
      {products.length>0&&<>
        <div style={{...cr,marginTop:12,padding:"12px 14px"}}>
          <div style={{color:AC,fontSize:10,fontWeight:700,marginBottom:8}}>🔥 MOST FREQUENT SELLERS</div>
          {[...products].sort((a,b)=>b.count-a.count).slice(0,5).map((p,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:i<4?"1px solid rgba(63,63,70,.2)":"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:p.type==="sealed"?"#a78bfa":"#06b6d4",fontSize:8}}>{p.type==="sealed"?"📦":"🃏"}</span>
              <span style={{color:"#d4d4d8",fontSize:11}}>{p.name.length>30?p.name.slice(0,30)+"…":p.name}</span>
            </div>
            <span style={{color:AC,fontSize:11,fontWeight:700,fontFamily:"monospace"}}>{p.count}x</span>
          </div>))}
        </div>
        <div style={{...cr,marginTop:8,padding:"12px 14px"}}>
          <div style={{color:"#22c55e",fontSize:10,fontWeight:700,marginBottom:8}}>💎 HIGHEST REVENUE ITEMS</div>
          {products.slice(0,5).map((p,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:i<4?"1px solid rgba(63,63,70,.2)":"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:p.type==="sealed"?"#a78bfa":"#06b6d4",fontSize:8}}>{p.type==="sealed"?"📦":"🃏"}</span>
              <span style={{color:"#d4d4d8",fontSize:11}}>{p.name.length>30?p.name.slice(0,30)+"…":p.name}</span>
            </div>
            <span style={{color:"#22c55e",fontSize:11,fontWeight:700,fontFamily:"monospace"}}>{FF(p.total)}</span>
          </div>))}
        </div>
      </>}
    </>);
  })()}
  {sec==="consign"&&(()=>{
    const ownSet=new Set(["AJAY","DEREK","SHARED"]);
    const commRates={LJ:{rate:0.10,split:"AJAY"},EVAN:{rate:0.25,split:"BOTH"}};
    const defaultRate={rate:0.15,split:"BOTH"};
    const consigners=PP.filter(p=>!ownSet.has(p));
    const rangeTotals={};const allTimeTotals={};
    consigners.forEach(p=>{rangeTotals[p]=0;allTimeTotals[p]=0;});
    fd.forEach(d=>{consigners.forEach(p=>{rangeTotals[p]+=(dd[d]?.[p]||0);});});
    Object.keys(dd).sort().forEach(d=>{consigners.forEach(p=>{allTimeTotals[p]+=(dd[d]?.[p]||0);});});
    const rangeTotal=Object.values(rangeTotals).reduce((s,v)=>s+v,0);
    const allTotal=Object.values(allTimeTotals).reduce((s,v)=>s+v,0);
    const calcComm=(tots)=>{
      let ajE=0,dkE=0;const det=[];
      consigners.filter(p=>tots[p]>0).sort((a,b)=>tots[b]-tots[a]).forEach(p=>{
        const cfg=commRates[p]||defaultRate;const fee=tots[p]*cfg.rate;
        if(cfg.split==="AJAY"){ajE+=fee;det.push({p,sales:tots[p],rate:cfg.rate,fee,aj:fee,dk:0});}
        else if(cfg.split==="DEREK"){dkE+=fee;det.push({p,sales:tots[p],rate:cfg.rate,fee,aj:0,dk:fee});}
        else{ajE+=fee/2;dkE+=fee/2;det.push({p,sales:tots[p],rate:cfg.rate,fee,aj:fee/2,dk:fee/2});}
      });return{ajE,dkE,totFee:ajE+dkE,det};};
    const rC=calcComm(rangeTotals);const aC=calcComm(allTimeTotals);
    return(<>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <div style={{...cr,padding:"12px",borderLeft:`3px solid ${AC}`}}><div style={{color:"#71717a",fontSize:9,fontWeight:600}}>CONSIGN SALES (RANGE)</div><div style={{color:AC,fontSize:18,fontWeight:800,fontFamily:"monospace"}}>{FF(rangeTotal)}</div><div style={{color:"#a1a1aa",fontSize:9}}>Our fee: {FF(rC.totFee)}</div></div>
        <div style={{...cr,padding:"12px",borderLeft:"3px solid #10b981"}}><div style={{color:"#71717a",fontSize:9,fontWeight:600}}>CONSIGN SALES (ALL-TIME)</div><div style={{color:"#10b981",fontSize:18,fontWeight:800,fontFamily:"monospace"}}>{FF(allTotal)}</div><div style={{color:"#a1a1aa",fontSize:9}}>Our fee: {FF(aC.totFee)}</div></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        <div style={{...cr,padding:"12px"}}><div style={{color:CO.AJAY,fontSize:10,fontWeight:700}}>AJAY EARNED</div>
          <div style={{color:"#fafafa",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{FF(aC.ajE)}</div>
          <div style={{color:"#a1a1aa",fontSize:9}}>This range: {FF(rC.ajE)}</div></div>
        <div style={{...cr,padding:"12px"}}><div style={{color:CO.DEREK,fontSize:10,fontWeight:700}}>DEREK EARNED</div>
          <div style={{color:"#fafafa",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{FF(aC.dkE)}</div>
          <div style={{color:"#a1a1aa",fontSize:9}}>This range: {FF(rC.dkE)}</div></div>
      </div>
      <div style={{...cr,overflow:"hidden",padding:0}}>
        <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(63,63,70,.5)",display:"flex",justifyContent:"space-between"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>CONSIGNER BREAKDOWN</span><span style={{color:"#71717a",fontSize:10}}>{aC.det.length} consigners</span></div>
        {aC.det.map(({p,sales,rate,fee,aj,dk})=>{const rS=rangeTotals[p]||0;const rF=rS*rate;
          return(<div key={p} style={{padding:"12px 14px",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:CO[p]}}/><span style={{color:CO[p],fontSize:12,fontWeight:700,flex:1}}>{p}</span>
              <span style={{color:AC,fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10,background:`${AC}18`,border:"1px solid rgba(245,158,11,.2)"}}>{(rate*100).toFixed(0)}%{commRates[p]?.split==="AJAY"?" → Ajay only":" → Split"}</span>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              <div style={{background:"rgba(63,63,70,.3)",borderRadius:6,padding:"8px 10px"}}>
                <div style={{color:"#a1a1aa",fontSize:8,marginBottom:2}}>RANGE</div>
                <div style={{color:"#fafafa",fontSize:14,fontWeight:800,fontFamily:"monospace"}}>{FF(rS)}</div>
                <div style={{color:"#10b981",fontSize:10,marginTop:2}}>Fee: {FF(rF)}</div></div>
              <div style={{background:"rgba(63,63,70,.3)",borderRadius:6,padding:"8px 10px"}}>
                <div style={{color:"#a1a1aa",fontSize:8,marginBottom:2}}>ALL-TIME</div>
                <div style={{color:"#fafafa",fontSize:14,fontWeight:800,fontFamily:"monospace"}}>{FF(sales)}</div>
                <div style={{color:"#10b981",fontSize:10,marginTop:2}}>Fee: {FF(fee)}</div></div>
            </div>
            <div style={{display:"flex",gap:12,marginTop:6}}>
              <span style={{color:CO.AJAY,fontSize:9}}>Ajay: {FF(aj)}</span>
              {dk>0&&<span style={{color:CO.DEREK,fontSize:9}}>Derek: {FF(dk)}</span>}
              <span style={{color:"#71717a",fontSize:9,marginLeft:"auto"}}>{allTotal>0?`${(sales/allTotal*100).toFixed(1)}% of consignment`:"" }</span>
            </div>
            <div style={{height:3,background:"rgba(63,63,70,.5)",borderRadius:2,marginTop:6,overflow:"hidden"}}><div style={{height:"100%",width:`${allTotal>0?(sales/allTotal*100):0}%`,background:CO[p],borderRadius:2,opacity:.5}}/></div>
          </div>)})}
      </div>
    </>);
  })()}
  {sec==="monthly"&&<>
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>{so.slice(0,8).map(({n:p})=>(<button key={p} onClick={()=>tp(p)} style={pl(sp.includes(p),CO[p])}>{p}</button>))}<div style={{flex:1}}/>{["grouped","stacked"].map(v=>(<button key={v} onClick={()=>sBV(v)} style={bt(bv===v)}>{v[0].toUpperCase()+v.slice(1)}</button>))}</div>
    <div style={sx}><ResponsiveContainer width="100%" height={320}><BarChart data={ma} barCategoryGap="25%"><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.5)"/><XAxis dataKey="month" tick={{fill:"#999",fontSize:13,fontWeight:600}} axisLine={{stroke:"#3f3f46"}} tickLine={false}/><YAxis tick={{fill:"#666",fontSize:11}} axisLine={false} tickLine={false} tickFormatter={F} width={55}/><Tooltip content={<TT/>}/>{sp.filter(p=>ma.some(m=>m[p]>0)).map(p=>(<Bar key={p} dataKey={p} fill={CO[p]} stackId={bv==="stacked"?"s":undefined} radius={bv==="stacked"?0:[3,3,0,0]} maxBarSize={40}/>))}</BarChart></ResponsiveContainer></div>
  </>}
  {sec==="growth"&&<>
    <div style={{color:"#71717a",fontSize:11,fontWeight:600,letterSpacing:1,marginBottom:8}}>REVENUE GROWTH</div>
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{PP.filter(p=>(lastB[p]||0)>0).sort((a,b)=>(lastB[b]||0)-(lastB[a]||0)).map(p=>(<button key={p} onClick={()=>sGPP(v=>v.includes(p)?v.filter(x=>x!==p):[...v,p])} style={pl(gPP.includes(p),CO[p])}>{p}</button>))}</div>
    <div style={sx}><ResponsiveContainer width="100%" height={220}>
      <AreaChart data={grD}><defs>{PP.map(p=>(<linearGradient key={p} id={`gh-${p}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CO[p]} stopOpacity={.15}/><stop offset="100%" stopColor={CO[p]} stopOpacity={0}/></linearGradient>))}</defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={6}/><YAxis tick={{fill:"#444",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={F} width={45}/><Tooltip content={<TT/>}/>
        {gPP.map(p=>(<Area key={p} type="monotone" dataKey={p} stroke={CO[p]} fill={`url(#gh-${p})`} strokeWidth={1.5} dot={false}/>))}
      </AreaChart></ResponsiveContainer></div>
  </>}
  {sec==="goal"&&(()=>{const goal=100000;const startDate=new Date("2026-01-01");const today=new Date();const daysSoFar=Math.floor((today-startDate)/(86400000));
    const estMo=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const eFmt=d=>`${estMo[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    const dailyTarget=goal/365;
    const myT=lastB[goalP]||0;const avgD=myT/daysSoFar;const remain=goal-myT;const daysNeeded=remain>0?Math.ceil(remain/avgD):0;
    const estDate=new Date(today);estDate.setDate(estDate.getDate()+daysNeeded);
    const pct=(myT/goal*100);const expectedLinear=dailyTarget*daysSoFar;const aheadBehind=myT-expectedLinear;
    const onTrack=myT>=expectedLinear;
    const janCum=cumAll["2026-01-31"]?.[goalP]||0;const febCum=(lastB[goalP]||0)-janCum;
    const janD=janCum/31;const febD=febCum/21;
    const d14ago=cumAll["2026-02-07"]?.[goalP]||0;const d7ago=cumAll["2026-02-14"]?.[goalP]||0;
    const last14=((lastB[goalP]||0)-d14ago)/14;const last7=((lastB[goalP]||0)-d7ago)/7;
    const projData=Object.keys(cumAll).sort().map(d=>({day:SD(d),actual:cumAll[d]?.[goalP]||0,target:Math.round(dailyTarget*((new Date(d)-startDate)/(86400000))+dailyTarget)}));
    const allProj=PP.filter(p=>(lastB[p]||0)>0).map(p=>{const t=lastB[p]||0;const avg=t/daysSoFar;const exp=dailyTarget*daysSoFar;const rem=goal-t;const dn=avg>0?Math.ceil(rem/avg):9999;const ed=new Date(today);ed.setDate(ed.getDate()+dn);
      return{p,t,avg,onTrack:t>=exp,pct:t/goal*100,estDate:ed,eFmt:rem<=0?"DONE":eFmt(ed)};}).sort((a,b)=>b.t-a.t);
    return(<>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{color:"#71717a",fontSize:11,fontWeight:600,letterSpacing:1}}>🎯 $100K GOAL</span>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{allProj.slice(0,6).map(({p})=>(<button key={p} onClick={()=>sGoalP(p)} style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${goalP===p?CO[p]+"60":"rgba(63,63,70,.7)"}`,background:goalP===p?`${CO[p]}15`:"transparent",color:goalP===p?CO[p]:"#444",cursor:"pointer",fontSize:10,fontWeight:600}}>{p}</button>))}</div>
      </div>
      <div style={{...cr,padding:"18px",background:onTrack?"rgba(16,185,129,.03)":"rgba(239,68,68,.03)",border:`1px solid ${onTrack?"#10b98120":"#ef444420"}`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
          <div><div style={{color:onTrack?"#10b981":"#ef4444",fontSize:10,fontWeight:700,letterSpacing:1}}>{goalP} — {onTrack?"ON PACE":"BEHIND PACE"}</div>
            <div style={{color:"#fafafa",fontSize:28,fontWeight:800,fontFamily:"monospace"}}>{FF(myT)}<span style={{color:"#71717a",fontSize:14}}> / {FF(goal)}</span></div></div>
          <div style={{textAlign:"right"}}><div style={{color:aheadBehind>=0?"#10b981":"#ef4444",fontSize:18,fontWeight:800,fontFamily:"monospace"}}>{aheadBehind>=0?"+":"−"}{FF(Math.abs(Math.round(aheadBehind)))}</div>
            <div style={{color:"#71717a",fontSize:10}}>{aheadBehind>=0?"ahead of":"behind"} pace</div></div>
        </div>
        <div style={{height:6,background:"rgba(63,63,70,.6)",borderRadius:4,overflow:"hidden",marginBottom:14}}>
          <div style={{height:"100%",width:`${Math.min(pct,100)}%`,background:onTrack?"linear-gradient(90deg,#10b981,#22c55e)":"linear-gradient(90deg,#ef4444,#f59e0b)",borderRadius:4}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
          {[{l:"PROGRESS",v:`${pct.toFixed(1)}%`},{l:"AVG/DAY",v:FF(Math.round(avgD))},{l:"REMAINING",v:FF(remain),c:"#f59e0b"},{l:"EST. DATE",v:remain<=0?"DONE!":eFmt(estDate),c:onTrack?"#10b981":"#ef4444"}].map(s=>(<div key={s.l} style={{background:"rgba(63,63,70,.4)",borderRadius:8,padding:"8px 10px"}}><div style={{color:"#a1a1aa",fontSize:9}}>{s.l}</div><div style={{color:s.c||"#fff",fontSize:s.l==="EST. DATE"?13:16,fontWeight:800,fontFamily:s.l==="EST. DATE"?undefined:"monospace"}}>{s.v}</div></div>))}</div>
        <div style={{color:"#71717a",fontSize:10,fontWeight:600,marginBottom:6}}>PACE BY PERIOD</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6}}>
          {[["Jan",janD],["Feb",febD],["Last 14d",last14],["Last 7d",last7]].map(([lbl,daily])=>{
            const hits=(daily*365)>=goal;return(<div key={lbl} style={{background:"rgba(63,63,70,.3)",borderRadius:8,padding:"8px 10px",borderLeft:`2px solid ${hits?"#10b981":"#ef4444"}`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#a1a1aa",fontSize:10,fontWeight:600}}>{lbl}</span><span style={{color:hits?"#10b981":"#ef4444",fontSize:9,fontWeight:700}}>{hits?"✓":"✕"}</span></div>
              <div style={{color:"#e4e4e7",fontFamily:"monospace",fontSize:12,fontWeight:700}}>{FF(Math.round(daily))}/day</div>
              <div style={{color:"#a1a1aa",fontSize:9}}>→ {FF(Math.round(daily*365))}/yr</div>
            </div>)})}
        </div>
      </div>
      <div style={{marginTop:8,...sx}}><ResponsiveContainer width="100%" height={150}>
        <ComposedChart data={projData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#555",fontSize:8}} axisLine={false} tickLine={false} interval={6}/><YAxis tick={{fill:"#444",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={F} width={40}/><Tooltip content={<TT/>}/>
          <Line type="monotone" dataKey="target" stroke="#ffffff15" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="$100K Pace"/>
          <Area type="monotone" dataKey="actual" stroke={CO[goalP]} fill={`url(#gh-${goalP})`} strokeWidth={2} dot={false} name={`${goalP} Actual`}/>
        </ComposedChart></ResponsiveContainer></div>
      {/* Milestone Timestamps */}
      {(()=>{
        const milestones=[10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000,250000,500000,750000,1000000];
        const sortedDays=Object.keys(cumAll).sort();
        // Calculate when each person hit each milestone
        const pplMilestones={};
        allProj.forEach(({p,t,avg})=>{
          pplMilestones[p]={};
          milestones.forEach(m=>{
            // Check historical data first
            let hitDate=null;
            for(const d of sortedDays){
              if((cumAll[d]?.[p]||0)>=m){hitDate=d;break;}
            }
            if(hitDate){
              pplMilestones[p][m]={date:hitDate,type:"hit"};
            } else if(avg>0&&t<m){
              // Project future date
              const daysNeeded=Math.ceil((m-t)/avg);
              const est=new Date(today);est.setDate(est.getDate()+daysNeeded);
              pplMilestones[p][m]={date:eFmt(est),type:"est"};
            }
          });
        });
        // Only show milestones that at least one person has hit or is close to
        const relevantMs=milestones.filter(m=>allProj.some(({p})=>pplMilestones[p]?.[m]));
        if(relevantMs.length===0)return null;
        const topPpl=allProj.slice(0,6).map(a=>a.p);
        return(<div style={{...cr,marginTop:10,padding:"14px 16px"}}>
          <div style={{color:AC,fontSize:10,fontWeight:700,marginBottom:10}}>🏆 MILESTONE TRACKER</div>
          <div style={{overflowX:"auto"}}>
            <div style={{display:"grid",gridTemplateColumns:`80px repeat(${topPpl.length},1fr)`,gap:0,minWidth:topPpl.length*70+80}}>
              {/* Header */}
              <div style={{padding:"4px 6px",borderBottom:"1px solid #3f3f46"}}/>
              {topPpl.map(p=>(<div key={p} style={{padding:"4px 6px",borderBottom:"1px solid #3f3f46",textAlign:"center"}}>
                <span style={{color:CO[p],fontSize:9,fontWeight:700}}>{p}</span>
              </div>))}
              {/* Rows */}
              {relevantMs.map(m=>(<React.Fragment key={m}>
                <div style={{padding:"6px",borderBottom:"1px solid rgba(63,63,70,.2)",display:"flex",alignItems:"center"}}>
                  <span style={{color:AC,fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{m>=1000000?`$${(m/1000000).toFixed(0)}M`:m>=1000?`$${(m/1000).toFixed(0)}K`:FF(m)}</span>
                </div>
                {topPpl.map(p=>{const ms=pplMilestones[p]?.[m];return(<div key={p} style={{padding:"6px",borderBottom:"1px solid rgba(63,63,70,.2)",textAlign:"center"}}>
                  {ms?<span style={{color:ms.type==="hit"?"#22c55e":"#71717a",fontSize:9,fontWeight:ms.type==="hit"?600:400}}>
                    {ms.type==="hit"?SD(ms.date):<span style={{fontStyle:"italic"}}>~{ms.date}</span>}
                  </span>:<span style={{color:"#333",fontSize:9}}>—</span>}
                </div>);})}
              </React.Fragment>))}
            </div>
          </div>
        </div>);
      })()}
      {/* Milestone Timestamps */}
      {(()=>{
        const milestones=[10000,20000,30000,40000,50000,60000,70000,80000,90000,100000,150000,200000,250000,500000,1000000];
        const sortedDays=Object.keys(cumAll).sort();
        // Find when each person hit each milestone
        const pplMilestones={};
        PP.filter(p=>(lastB[p]||0)>0).forEach(p=>{
          pplMilestones[p]={};
          let prevVal=0;
          for(const d of sortedDays){
            const val=cumAll[d]?.[p]||0;
            for(const m of milestones){
              if(val>=m&&prevVal<m&&!pplMilestones[p][m]){
                pplMilestones[p][m]=d;
              }
            }
            prevVal=val;
          }
          // For milestones not yet hit, estimate
          const avg=(lastB[p]||0)/daysSoFar;
          for(const m of milestones){
            if(!pplMilestones[p][m]&&avg>0){
              const remaining=m-(lastB[p]||0);
              if(remaining>0){
                const ed=new Date(today);ed.setDate(ed.getDate()+Math.ceil(remaining/avg));
                pplMilestones[p][m]="~"+eFmt(ed);
              }
            }
          }
        });
        // Only show milestones that at least one person has hit or is close to
        const relevantMs=milestones.filter(m=>PP.some(p=>(lastB[p]||0)>=m*0.5||pplMilestones[p]?.[m]));
        const topPpl=PP.filter(p=>(lastB[p]||0)>0).sort((a,b)=>(lastB[b]||0)-(lastB[a]||0)).slice(0,6);
        return relevantMs.length>0&&<div style={{...cr,marginTop:10,padding:"14px 16px"}}>
          <div style={{color:AC,fontSize:10,fontWeight:700,marginBottom:10}}>🏆 MILESTONE TIMESTAMPS</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:9}}>
              <thead><tr>
                <th style={{textAlign:"left",padding:"4px 6px",color:"#71717a",fontWeight:600,borderBottom:"1px solid #3f3f46"}}>MILESTONE</th>
                {topPpl.map(p=>(<th key={p} style={{textAlign:"center",padding:"4px 4px",color:CO[p],fontWeight:700,borderBottom:"1px solid #3f3f46",minWidth:65}}>{p}</th>))}
              </tr></thead>
              <tbody>{relevantMs.map(m=>(<tr key={m}>
                <td style={{padding:"5px 6px",color:AC,fontWeight:700,fontFamily:"monospace",borderBottom:"1px solid rgba(63,63,70,.3)"}}>{m>=1000000?`$${(m/1000000)}M`:m>=1000?`$${m/1000}K`:`$${m}`}</td>
                {topPpl.map(p=>{const hit=pplMilestones[p]?.[m];const isEst=typeof hit==="string"&&hit.startsWith("~");const val=(lastB[p]||0);const pct=val/m*100;
                  return(<td key={p} style={{textAlign:"center",padding:"5px 4px",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
                    {hit?<span style={{color:isEst?"#52525b":"#22c55e",fontSize:8,fontWeight:isEst?400:600}}>{isEst?hit:SD(hit)}</span>
                    :val>0?<span style={{color:"#333",fontSize:8}}>{pct.toFixed(0)}%</span>
                    :<span style={{color:"#333"}}>—</span>}
                  </td>);})}
              </tr>))}</tbody>
            </table>
          </div>
        </div>;
      })()}
    </>);})()}
</>}
{/* ===== INPUT ===== */}
{tab==="input"&&<>
  <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>{[["manual","✏️ Order"],["money","💸 Money"],["trade","🔄 Trade"],["log","📜 Log"]].map(([k,l])=>(<button key={k} onClick={()=>sSEC(k)} style={bt(sec===k)}>{l}</button>))}
    <button onClick={()=>sSEC(sec==="bank"||sec==="sync"?"manual":"bank")} style={{...bt(sec==="bank"||sec==="sync"),opacity:sec==="bank"||sec==="sync"?1:0.5}}>••• More</button></div>
  {(sec==="bank"||sec==="sync")&&<div style={{display:"flex",gap:6,marginBottom:14}}>{[["bank","🏦 Bank"],["sync","🔄 Sync"]].map(([k,l])=>(<button key={k} onClick={()=>sSEC(k)} style={bt(sec===k)}>{l}</button>))}</div>}
  {sec==="manual"&&<div style={{...cr,padding:"20px"}}>
    {/* CSV Import - drag & drop + buttons */}
    <div
      onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=AC;e.currentTarget.style.background=`${AC}0d`;}}
      onDragLeave={e=>{e.preventDefault();e.currentTarget.style.borderColor="#3f3f46";e.currentTarget.style.background="transparent";}}
      onDrop={e=>{e.preventDefault();e.currentTarget.style.borderColor="#3f3f46";e.currentTarget.style.background="transparent";const f=e.dataTransfer.files[0];if(!f)return;const reader=new FileReader();reader.onload=ev=>{try{const txt=ev.target.result;const type=txt.includes("Lineitem name")||txt.includes("Financial Status")?"shopify":"square";const r=type==="shopify"?parseShopifyCSV(txt):parseSquareCSV(txt);sII(r.items);sIC(r.channel);sIF("all");tw(`✓ Detected ${type==="shopify"?"Shopify":"Square"} CSV`);}catch(err){tw("⚠ Error reading file")}};reader.readAsText(f);}}
      style={{display:"flex",gap:6,marginBottom:14,alignItems:"center",flexWrap:"wrap",padding:"8px 12px",borderRadius:8,border:"1px dashed #3f3f46",transition:"all .2s"}}>
      <span style={{color:"#71717a",fontSize:9,fontWeight:600}}>📁 Drop CSV or:</span>
      {[["shopify","🛒 Shopify"],["square","⬛ Square"]].map(([type,label])=>(
        <label key={type} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${CC[type]}40`,background:`${CC[type]}10`,color:CC[type],fontSize:10,fontWeight:600,cursor:"pointer",position:"relative",overflow:"hidden"}}>{label}<input type="file" accept=".csv" onChange={e=>{try{handleFile(e,type)}catch(err){tw("⚠ Error reading file")}}} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}}/></label>
      ))}
      <button onClick={()=>sDiscMode(v=>!v)} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${discMode?"#7c3aed40":"#3f3f46"}`,background:discMode?"rgba(124,58,237,.1)":"transparent",color:discMode?"#7c3aed":"#71717a",fontSize:10,fontWeight:600,cursor:"pointer"}}>📋 Discord</button>
      {impItems&&<button onClick={()=>sII(null)} style={{padding:"4px 10px",borderRadius:5,border:"1px solid #ef444430",background:"transparent",color:"#ef4444",cursor:"pointer",fontSize:9,fontWeight:600}}>✕ Clear</button>}
    </div>
    {discMode&&<div style={{...cr,padding:"12px",marginBottom:10}}>
      <div style={{color:"#7c3aed",fontSize:10,fontWeight:600,marginBottom:6}}>📋 Paste Discord Order</div>
      <textarea id="disc-paste" placeholder="Paste Discord order message here..." style={{...is,width:"100%",minHeight:100,resize:"vertical",fontFamily:"monospace",fontSize:10,marginBottom:8}}/>
      <button onClick={()=>{const txt=document.getElementById("disc-paste").value;if(!txt.trim()){tw("⚠ Paste an order first");return;}const r=parseDiscord(txt);if(r.items.length===0){tw("⚠ No items found");return;}sII(r.items);sIC(r.channel);sIF("all");sDiscMode(false);tw(`✓ Parsed ${r.items.length} items from Discord`);}} style={{padding:"6px 16px",borderRadius:6,border:"none",background:"#7c3aed",color:"#fafafa",cursor:"pointer",fontSize:11,fontWeight:700}}>Import</button>
    </div>}
    {/* === IMPORT PREVIEW === */}
    {impItems&&impStats&&<>
      <div style={{...cr,padding:"14px 18px",marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <span style={{fontSize:13,fontWeight:700}}>{CL[impCh]} — {impStats.count} items</span>
          <div style={{display:"flex",gap:6}}><button onClick={()=>sII(null)} style={{padding:"5px 12px",borderRadius:6,border:"1px solid #3f3f46",background:"transparent",color:"#a1a1aa",cursor:"pointer",fontSize:11}}>Cancel</button><button onClick={applyImport} style={{padding:"5px 16px",borderRadius:6,border:"none",background:"#10b981",color:"#fafafa",cursor:"pointer",fontSize:11,fontWeight:700}}>✓ Apply</button></div>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <div style={{...cr,flex:1,minWidth:70,padding:"8px 12px"}}><div style={{color:"#71717a",fontSize:9}}>TOTAL</div><div style={{color:"#22c55e",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{FF(impStats.total)}</div></div>
          <div style={{...cr,flex:1,minWidth:70,padding:"8px 12px"}}><div style={{color:"#71717a",fontSize:9}}>DATES</div><div style={{color:"#fafafa",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{impStats.dates}</div></div>
          {impStats.unk.length>0&&<div style={{...cr,flex:1,minWidth:70,padding:"8px 12px",borderColor:"#ef444430"}}><div style={{color:"#ef4444",fontSize:9}}>UNKNOWN</div><div style={{color:"#ef4444",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{impStats.unk.length}</div></div>}
        </div>
        {Object.keys(impBreakdown).length>0&&<div style={{marginTop:10,borderTop:"1px solid #3f3f46",paddingTop:10}}>
          <div style={{color:"#71717a",fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:6}}>WILL BE CREDITED</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {PP.filter(p=>impBreakdown[p]>0).map(p=>(
              <div key={p} style={{background:`${CO[p]}12`,border:`1px solid ${CO[p]}30`,borderRadius:7,padding:"5px 10px",display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                <span style={{color:CO[p],fontSize:9,fontWeight:700}}>{p}</span>
                <span style={{color:"#fafafa",fontFamily:"monospace",fontSize:12,fontWeight:800}}>{FX(impBreakdown[p])}</span>
              </div>
            ))}
          </div>
        </div>}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:8,flexWrap:"wrap"}}>{[["all",`All (${impStats.count})`],["flags",`⚠ Flagged (${impStats.fl.length})`],["split",`⚡ Split (${impStats.spl.length})`],["refunded",`🔴 Refunded (${impStats.ref.length})`],["unk",`Unknown (${impStats.unk.length})`]].map(([k,l])=>(<button key={k} onClick={()=>sIF(k)} style={pl(impFilter===k,"#f59e0b")}>{l}</button>))}</div>
      <div style={{...cr,padding:0,overflow:"hidden"}}><div style={{maxHeight:380,overflowY:"auto"}}>
        {(()=>{const ordGrp={};filtImp.forEach(it=>{const o=it.order||`_${it.id}`;if(!ordGrp[o])ordGrp[o]=[];ordGrp[o].push(it);});
          return filtImp.map((it,idx)=>{
            const isU=it.owner==="UNKNOWN";const isSplit=it.fl.includes("split_pay");
            const prevOrd=idx>0?filtImp[idx-1].order:null;const newOrd=it.order!==prevOrd;
            const grp=ordGrp[it.order||`_${it.id}`]||[];
            const ordTotal=grp.reduce((s,i)=>s+i.amt,0);const ordShop=grp.reduce((s,i)=>s+(i.shopAmt!=null?i.shopAmt:(i.fl.includes("split_pay")?Math.max(0,i.amt-(i.cashAmt||0)-(i.tradeAmt||0)):i.amt)),0);const ordCash=grp.reduce((s,i)=>s+(i.cashAmt||0),0);const ordTrade=grp.reduce((s,i)=>s+(i.tradeAmt||0),0);const hasSplitInGrp=grp.some(i=>i.fl.includes("split_pay"));
            return(<div key={it.id}>
              {newOrd&&it.order&&grp.length>1&&<div style={{padding:"6px 14px",background:"rgba(6,182,212,.04)",borderTop:idx>0?"2px solid #52525b":"none",marginTop:idx>0?4:0,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                <span style={{color:"#06b6d4",fontSize:12,fontWeight:800,fontFamily:"monospace"}}>{it.order}</span><span style={{color:"#71717a",fontSize:9}}>{grp.length} items</span><span style={{color:"#fafafa",fontSize:10,fontWeight:700,fontFamily:"monospace"}}>{FX(ordTotal)}</span>
                {hasSplitInGrp&&<><span style={{color:"#96bf48",fontSize:9}}>Shop: <b>{FX(ordShop)}</b></span>{ordCash>0&&<span style={{color:AC,fontSize:9}}>Cash: <b>{FX(ordCash)}</b></span>}{ordTrade>0&&<span style={{color:"#a78bfa",fontSize:9}}>Trade: <b>{FX(ordTrade)}</b></span>}</>}
              </div>}
              {newOrd&&it.order&&grp.length<=1&&<div style={{borderTop:idx>0?"2px solid #52525b":"none",marginTop:idx>0?4:0}}/>}
              <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(63,63,70,.3)",background:isU?"rgba(239,68,68,.03)":isSplit?"rgba(249,115,22,.04)":it.fl.length?"rgba(245,158,11,.02)":"transparent"}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:isSplit?6:0}}>
            {it.order&&<span style={{color:"#06b6d4",fontSize:11,fontWeight:800,fontFamily:"monospace",minWidth:48}}>{it.order}</span>}
            {it.fl.includes("tax")?<span style={{color:"#71717a",fontSize:10,fontWeight:600,padding:"3px 6px"}}>🧾 Tax</span>:!(it.splits&&it.splits.length>0)&&<select value={it.owner} onChange={e=>editOwner(it.id,e.target.value)} style={{background:isU?"rgba(239,68,68,.15)":"rgba(63,63,70,.6)",border:`1px solid ${isU?"#ef444440":"#3f3f46"}`,borderRadius:6,padding:"3px 6px",color:isU?"#ef4444":CO[it.owner]||"#ccc",fontSize:10,fontWeight:600,cursor:"pointer",outline:"none",minWidth:75}}>
              {isU&&<option value="UNKNOWN">⚠ ???</option>}<optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select>}
            {impCh==="square"?<input type="number" value={it.amt} onChange={e=>{const v=parseFloat(e.target.value);if(!isNaN(v)&&v>=0){editSplit(it.id,"amt",v);if(it.personAmt!=null&&it.personAmt>v)editSplit(it.id,"personAmt",v);}}} style={{...is,width:62,padding:"2px 6px",fontSize:12,fontWeight:700,color:"#22c55e",fontFamily:"monospace",borderRadius:5,textAlign:"right"}}/>:<span style={{color:"#22c55e",fontFamily:"monospace",fontSize:12,fontWeight:700,minWidth:50}}>{FX(it.amt)}</span>}
            {impCh==="square"&&!(it.splits&&it.splits.length>0)&&<div style={{display:"flex",alignItems:"center",gap:3,flexShrink:0}}>
              <span style={{color:"#71717a",fontSize:8,fontWeight:600}}>AMT:</span>
              <input type="number" value={it.personAmt!=null?it.personAmt:""} placeholder={String(it.amt)} onChange={e=>{const v=parseFloat(e.target.value);editSplit(it.id,"personAmt",isNaN(v)?null:Math.min(v,it.amt));}} style={{...is,width:52,padding:"2px 5px",fontSize:10,borderRadius:5,textAlign:"right"}}/>
              {it.personAmt!=null&&it.personAmt<it.amt&&<span style={{color:"#71717a",fontSize:9,fontFamily:"monospace",whiteSpace:"nowrap"}}>tax {FX(it.amt-it.personAmt)}</span>}
            </div>}
            <input value={it.note||""} onChange={e=>editSplit(it.id,"note",e.target.value)} placeholder="note..." style={{...is,flex:1,minWidth:60,maxWidth:140,padding:"2px 6px",fontSize:10,borderRadius:5,color:"#a1a1aa"}}/>
            <div style={{minWidth:0,flexShrink:0}}><div style={{color:"#d4d4d8",fontSize:10,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:120}}>{it.name}</div><div style={{color:"#a1a1aa",fontSize:9}}>{SD(it.date)}{it.pm&&` · ${it.pm}`}</div></div>
            {it.fl.map(f=>(<span key={f} style={{padding:"1px 6px",borderRadius:8,fontSize:8,fontWeight:600,background:`${FC[f]}15`,color:FC[f],border:`1px solid ${FC[f]}30`}}>{FL[f]}</span>))}
            {impCh==="square"&&<button onClick={()=>editSplits(it.id,it.splits&&it.splits.length>0?[]:[{owner:isU?"UNKNOWN":it.owner,amt:it.personAmt!=null?it.personAmt:it.amt}])} style={{padding:"2px 8px",borderRadius:4,border:`1px solid ${it.splits&&it.splits.length>0?"#a78bfa50":"#3f3f4660"}`,background:it.splits&&it.splits.length>0?"rgba(167,139,250,.18)":"transparent",color:it.splits&&it.splits.length>0?"#a78bfa":"#52525b",cursor:"pointer",fontSize:8,fontWeight:700,whiteSpace:"nowrap",flexShrink:0}}>± Split</button>}
          </div>
          {it.splits&&it.splits.length>0&&(()=>{const sTotal=Math.round(it.splits.reduce((s,sp)=>s+(sp.amt||0),0)*100)/100;const taxRem=Math.round(Math.max(0,it.amt-sTotal)*100)/100;const isOver=sTotal>it.amt+0.01;return(
          <div style={{marginLeft:48,paddingTop:5,paddingBottom:2,display:"flex",flexDirection:"column",gap:4}}>
            <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap"}}>
              <span style={{color:"#a78bfa",fontSize:9,fontWeight:700}}>SPLIT:</span>
              <span style={{color:"#fafafa",fontSize:9,fontFamily:"monospace"}}>{FX(sTotal)}</span>
              {taxRem>0&&<><span style={{color:"#52525b",fontSize:9}}>+</span><span style={{color:"#22c55e",fontSize:9,fontFamily:"monospace"}}>TAX {FX(taxRem)}</span></>}
              <span style={{color:"#52525b",fontSize:9}}>=</span>
              <span style={{color:isOver?"#ef4444":"#10b981",fontSize:9,fontFamily:"monospace"}}>{FX(it.amt)}{isOver&&" ⚠ over"}</span>
              <button onClick={()=>editSplits(it.id,[...it.splits,{owner:"UNKNOWN",amt:0}])} style={{padding:"1px 7px",borderRadius:4,border:"1px solid #a78bfa40",background:"rgba(167,139,250,.1)",color:"#a78bfa",cursor:"pointer",fontSize:8,fontWeight:700}}>+ Add</button>
            </div>
            {it.splits.map((sp,si)=>(<div key={si} style={{display:"flex",alignItems:"center",gap:4}}>
              <select value={sp.owner} onChange={e=>editSplits(it.id,it.splits.map((s,i)=>i===si?{...s,owner:e.target.value}:s))} style={{background:sp.owner==="UNKNOWN"?"rgba(239,68,68,.15)":"rgba(63,63,70,.6)",border:`1px solid ${sp.owner==="UNKNOWN"?"#ef444440":"#3f3f46"}`,borderRadius:5,padding:"2px 5px",color:sp.owner==="UNKNOWN"?"#ef4444":CO[sp.owner]||"#ccc",fontSize:10,fontWeight:600,cursor:"pointer",outline:"none"}}>
                <option value="UNKNOWN" style={{background:"#27272a",color:"#ef4444"}}>⚠ ???</option>
                <optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup>
                <optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup>
              </select>
              <input type="number" value={sp.amt||""} placeholder="0" onChange={e=>editSplits(it.id,it.splits.map((s,i)=>i===si?{...s,amt:parseFloat(e.target.value)||0}:s))} style={{...is,width:65,padding:"2px 6px",fontSize:11,borderRadius:5,textAlign:"right"}}/>
              <button onClick={()=>editSplits(it.id,it.splits.filter((_,i)=>i!==si))} style={{padding:"1px 5px",borderRadius:4,border:"1px solid #ef444430",background:"transparent",color:"#ef4444",cursor:"pointer",fontSize:11,lineHeight:1}}>×</button>
            </div>))}
          </div>);})()}
          {isSplit&&(()=>{const orig=it.amt;const ca=it.cashAmt||0;const ta=it.tradeAmt||0;const sa=it.shopAmt!=null?it.shopAmt:Math.max(0,orig-ca-ta);const sum=Math.round((sa+ca+ta)*100)/100;const match=Math.abs(sum-orig)<0.01;return(
          <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:48,padding:"4px 0",flexWrap:"wrap"}}>
            <span style={{color:match?"#555":"#ef4444",fontSize:9,fontWeight:match?400:700}}>Total: <b style={{color:match?"#fff":"#ef4444"}}>{FX(orig)}</b>{!match&&` ⚠ =${FX(sum)}`}</span>
            <div style={{display:"flex",alignItems:"center",gap:3}}><span style={{color:"#96bf48",fontSize:9,fontWeight:600}}>SHOP:</span><input type="number" value={sa||""} placeholder="$0" onChange={e=>{const v=parseFloat(e.target.value)||0;editSplit(it.id,"shopAmt",v);}} style={{...is,width:55,padding:"3px 6px",fontSize:11,borderRadius:6,borderColor:!match?"#ef444440":"#3f3f46"}}/></div>
            <div style={{display:"flex",alignItems:"center",gap:3}}><span style={{color:AC,fontSize:9,fontWeight:600}}>CASH:</span><input type="number" value={ca||""} placeholder="$0" onChange={e=>{const v=parseFloat(e.target.value)||0;editSplit(it.id,"cashAmt",v);const newShop=Math.max(0,orig-v-ta);editSplit(it.id,"shopAmt",newShop);}} style={{...is,width:55,padding:"3px 6px",fontSize:11,borderRadius:6}}/></div>
            <div style={{display:"flex",alignItems:"center",gap:3}}><span style={{color:"#a78bfa",fontSize:9,fontWeight:600}}>TRADE:</span><input type="number" value={ta||""} placeholder="$0" onChange={e=>{const v=parseFloat(e.target.value)||0;editSplit(it.id,"tradeAmt",v);const newShop=Math.max(0,orig-ca-v);editSplit(it.id,"shopAmt",newShop);}} style={{...is,width:55,padding:"3px 6px",fontSize:11,borderRadius:6}}/>
              {ta>0&&<><span style={{color:"#a78bfa",fontSize:8}}>from:</span><select value={it.tradeFrom||"SELF"} onChange={e=>editSplit(it.id,"tradeFrom",e.target.value)} style={{background:"rgba(167,139,250,.1)",border:"1px solid #a78bfa40",borderRadius:4,padding:"2px 4px",color:"#a78bfa",fontSize:9,fontWeight:600,cursor:"pointer",outline:"none"}}><option value="SELF" style={{background:"#27272a",color:"#a78bfa"}}>SELF</option>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{background:"#27272a",color:CO[p]}}>{p}</option>))}</select>
                {(it.tradeFrom||"SELF")!=="SELF"&&<span style={{color:"#a78bfa",fontSize:8}}>→ {it.owner}</span>}
                {!OWNERS.has(it.owner)&&(()=>{const cfg=COMM[it.owner]||DEF_COMM;const cp=Math.round(ta*(1-cfg.rate)*100)/100;return <span style={{color:"#71717a",fontSize:8}}>(consign: {FX(cp)})</span>;})()}
              </>}
            </div>
          </div>);})()}
              </div></div>);})
        })()}</div></div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,padding:"8px 14px",background:"rgba(63,63,70,.3)",borderRadius:8}}>
        <span style={{color:impStats.unk.length?"#ef4444":"#10b981",fontSize:11}}>{impStats.unk.length?`${impStats.unk.length} unknown → skipped`:"✓ All assigned"}</span>
        <button onClick={applyImport} style={{padding:"8px 24px",borderRadius:8,border:"none",background:"#10b981",color:"#fafafa",cursor:"pointer",fontSize:12,fontWeight:700}}>Apply {impStats.count-impStats.unk.length}</button>
      </div>
    </>}
    {/* === MANUAL ORDER FORM === */}
    {impItems&&<div style={{borderTop:`1px solid ${T.border}`,margin:"16px 0",position:"relative"}}><span style={{position:"absolute",top:-9,left:16,background:T.card,padding:"0 8px",color:"#71717a",fontSize:9,fontWeight:600,letterSpacing:1}}>MANUAL ORDER</span></div>}
    <>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
      <div><div style={{color:"#71717a",fontSize:10,fontWeight:600,marginBottom:4}}>CHANNEL</div><select value={cartCh} onChange={e=>sCartCh(e.target.value)} style={{...is,width:"100%"}}>{Object.entries(CL).map(([k,v])=>(<option key={k} value={k}>{v}</option>))}</select></div>
      <div><div style={{color:"#71717a",fontSize:10,fontWeight:600,marginBottom:4}}>DATE</div><input type="date" value={cartDt} onChange={e=>sCartDt(e.target.value)} style={{...is,width:"100%",colorScheme:"dark"}}/></div>
    </div>
    <div onDrop={handleImgDrop} onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=AC;}} onDragLeave={e=>{e.currentTarget.style.borderColor="#3f3f46";}} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",borderRadius:6,border:"1px dashed #3f3f46",transition:"border-color .15s"}}>
      <label style={{color:"#71717a",cursor:"pointer",fontSize:10,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}>
        📷 {cartImg?"Change":"Drop or click"}<input type="file" accept="image/*" onChange={handleCartImg} style={{display:"none"}}/>
      </label>
      {cartImg&&<><img src={cartImg} onClick={()=>sViewImg(cartImg)} style={{height:36,borderRadius:4,cursor:"pointer",border:"1px solid #3f3f46"}}/><button onClick={()=>sCartImg(null)} style={{background:"transparent",border:"none",color:"#ef4444",cursor:"pointer",fontSize:14}}>×</button></>}
    </div>
    <div style={{color:"#a1a1aa",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:8}}>ADD ITEMS TO ORDER</div>
    <div style={{display:"flex",gap:6,alignItems:"flex-end",flexWrap:"wrap",marginBottom:10}}>
      <div style={{minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>PERSON</div><select value={ciP} onChange={e=>sCIP(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:12,color:CO[ciP]||"#fff"}}><optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select></div>
      <div style={{minWidth:70}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>TYPE</div><select value={ciIO} onChange={e=>sCIIO(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}><option value="IN">Sale</option><option value="CONSIGNMENT">Consign</option><option value="OUT">Out</option><option value="XFER_IN">Xfer In</option><option value="XFER_OUT">Xfer Out</option></select></div>
      <div style={{flex:2,minWidth:120}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>ITEM</div>
        <div style={{display:"flex",gap:3,marginBottom:4}}>{["Sealed","Single","Snack"].map(q=>(<button key={q} onClick={()=>{const nv=itemCat===q?"":q;sItemCat(nv);sCIN("");sSealGame("");sSealSeries("");sSealSub("");sSealType("");if(nv==="")sCIA("");}} style={{padding:"4px 10px",borderRadius:5,border:`1px solid ${itemCat===q?"#f59e0b40":"#3f3f46"}`,background:itemCat===q?`${AC}18`:"transparent",color:itemCat===q?"#f59e0b":"#71717a",cursor:"pointer",fontSize:10,fontWeight:600}}>{q}</button>))}</div>
        {itemCat===""&&<input value={ciN} onChange={e=>sCIN(e.target.value)} placeholder="or type custom..." style={{...is,width:"100%",padding:"6px 8px",fontSize:12}}/>}
        {itemCat==="Sealed"&&(()=>{
          const gameData=SEAL_DATA[sealGame]||{};const seriesKeys=Object.keys(gameData);const subs=gameData[sealSeries]||[];
          const buildName=()=>[sealSub||sealSeries,sealType].filter(Boolean).join(" ");
          return(<div style={{display:"flex",flexDirection:"column",gap:4}}>
            <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{SEAL_GAMES.map(g=>(<button key={g} onClick={()=>{const nv=sealGame===g?"":g;sSealGame(nv);sSealSeries("");sSealSub("");sSealType("");sCIN("");}} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${sealGame===g?`${AC}40`:T.border}`,background:sealGame===g?`${AC}18`:"transparent",color:sealGame===g?AC:"#52525b",cursor:"pointer",fontSize:9,fontWeight:600}}>{g}</button>))}</div>
            {sealGame&&seriesKeys.length>1&&<select value={sealSeries} onChange={e=>{sSealSeries(e.target.value);sSealSub("");sSealType("");sCIN("");}} style={{...is,padding:"5px 8px",fontSize:10}}><option value="">— Series —</option>{seriesKeys.map(s=>(<option key={s} value={s}>{s}</option>))}</select>}
            {sealGame&&seriesKeys.length===1&&<select value={sealSeries||seriesKeys[0]} onChange={e=>{sSealSeries(e.target.value);sSealSub("");sSealType("");sCIN("");}} style={{...is,padding:"5px 8px",fontSize:10}}><option value={seriesKeys[0]}>{seriesKeys[0]}</option></select>}
            {(()=>{const activeSeries=sealSeries||(seriesKeys.length===1?seriesKeys[0]:"");const activeSubs=gameData[activeSeries]||[];return activeSeries&&activeSubs.length>0?<select value={sealSub} onChange={e=>{const v=e.target.value;sSealSub(v);sCIN([v,sealType].filter(Boolean).join(" "));}} style={{...is,padding:"5px 8px",fontSize:10}}><option value="">— Sub Set —</option>{activeSubs.map(s=>(<option key={s} value={s}>{s}</option>))}</select>:null;})()}
            {(sealSub||(sealSeries||(seriesKeys.length===1?seriesKeys[0]:"")))&&<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{SEAL_TYPES.map(t=>(<button key={t} onClick={()=>{const nt=sealType===t?"":t;sSealType(nt);const base=sealSub||(sealSeries||(seriesKeys.length===1?seriesKeys[0]:""));sCIN([base,nt].filter(Boolean).join(" "));}} style={{padding:"2px 7px",borderRadius:4,border:`1px solid ${sealType===t?"#a78bfa40":"#3f3f46"}`,background:sealType===t?"rgba(167,139,250,.1)":"transparent",color:sealType===t?"#a78bfa":"#52525b",cursor:"pointer",fontSize:8,fontWeight:600}}>{t}</button>))}</div>}
            {ciN&&<div style={{color:AC,fontSize:9,marginTop:2}}>→ {ciN}</div>}
            <input value={ciN} onChange={e=>sCIN(e.target.value)} placeholder="or type custom..." style={{...is,width:"100%",padding:"4px 8px",fontSize:10}}/>
          </div>);
        })()}
        {itemCat==="Single"&&<input value={ciN} onChange={e=>sCIN(e.target.value)} placeholder="Single name (or leave blank)" style={{...is,width:"100%",padding:"6px 8px",fontSize:12}}/>}
        {itemCat==="Snack"&&<div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{SNACKS.map(s=>(<button key={s.n} onClick={()=>{sCIN(s.n);sCIA(String(s.p));}} style={{padding:"3px 7px",borderRadius:4,border:`1px solid ${ciN===s.n?"#22c55e40":"#3f3f46"}`,background:ciN===s.n?"rgba(34,197,94,.1)":"transparent",color:ciN===s.n?"#22c55e":"#52525b",cursor:"pointer",fontSize:8,fontWeight:500}}>{s.n} <span style={{color:"#71717a"}}>${s.p}</span></button>))}</div>}
      </div>
      <div style={{width:45}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>QTY</div><input type="number" value={ciQ} onChange={e=>sCIQ(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:12,textAlign:"center"}}/></div>
      <div style={{width:85}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>PRICE <span style={{color:"#52525b"}}>(+,)</span></div><input type="text" inputMode="decimal" value={ciA} onChange={e=>sCIA(e.target.value)} placeholder="5+10+3" onKeyDown={e=>e.key==="Enter"&&addCart()} style={{...is,width:"100%",padding:"6px 8px",fontSize:12}}/>
        {ciA&&ciA.match(/[,+]/)&&(()=>{const s=String(ciA).replace(/\s/g,"").split(/[,+]/).map(s=>parseFloat(s)).filter(n=>n>0);return s.length>1?<div style={{color:AC,fontSize:8,marginTop:2}}>= ${s.reduce((a,v)=>a+v,0).toFixed(2)}</div>:null;})()}</div>
      <button onClick={addCart} style={{padding:"6px 12px",borderRadius:6,border:"none",background:AC,color:"#000",cursor:"pointer",fontSize:12,fontWeight:700}}>+</button>
    </div>
    {cart.length>0&&<>
      <div style={{background:"rgba(63,63,70,.3)",borderRadius:10,border:"1px solid rgba(63,63,70,.6)",overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(63,63,70,.5)",display:"flex",justifyContent:"space-between"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>ORDER — {cart.length} items</span><span style={{color:AC,fontWeight:700,fontFamily:"monospace",fontSize:12}}>{FF(cart.reduce((s,c)=>s+c.total,0))}</span></div>
        {cart.map(it=>{const ioC={"IN":"#10b981","CONSIGNMENT":"#f59e0b","OUT":"#ef4444","XFER_IN":"#06b6d4","XFER_OUT":"#a78bfa"};const updCart=(field,val)=>{sCart(c=>c.map(x=>x.id===it.id?{...x,[field]:val}:x));};return(<div key={it.id} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:CO[it.p]}}/><select value={it.p} onChange={e=>updCart("p",e.target.value)} style={{background:"transparent",border:"none",color:CO[it.p],fontSize:10,fontWeight:600,cursor:"pointer",outline:"none",minWidth:50,padding:0}}><optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select>
          <select value={it.io} onChange={e=>updCart("io",e.target.value)} style={{fontSize:8,fontWeight:700,padding:"1px 4px",borderRadius:4,border:`1px solid ${ioC[it.io]}40`,background:`${ioC[it.io]}10`,color:ioC[it.io],cursor:"pointer",outline:"none"}}><option value="IN">Sale</option><option value="CONSIGNMENT">Consign</option><option value="OUT">Out</option><option value="XFER_IN">Xfer In</option><option value="XFER_OUT">Xfer Out</option></select>
          <span style={{color:"#d4d4d8",fontSize:10,flex:1}}>{it.name}</span>
          <span style={{color:"#71717a",fontSize:10}}>×{it.qty}</span>
          <span style={{color:"#22c55e",fontFamily:"monospace",fontSize:10,fontWeight:700,minWidth:45,textAlign:"right"}}>{FX(it.total)}</span>
          <button onClick={()=>rmCart(it.id)} style={{background:"transparent",border:"none",color:"#a1a1aa",cursor:"pointer",fontSize:12}} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color="#444"}>×</button>
        </div>)})}
        {Object.keys(cart.reduce((g,c)=>{g[c.p]=(g[c.p]||0)+c.total;return g},{})).length>1&&<div style={{padding:"6px 14px",borderTop:"1px solid rgba(63,63,70,.5)",display:"flex",gap:12,flexWrap:"wrap"}}>
          {Object.entries(cart.reduce((g,c)=>{g[c.p]=(g[c.p]||0)+c.total;return g},{})).map(([p,t])=>(<span key={p} style={{fontSize:10}}><span style={{color:CO[p],fontWeight:600}}>{p}</span> <span style={{color:"#71717a",fontFamily:"monospace"}}>{FX(t)}</span></span>))}</div>}
      </div>
      <button onClick={submitCart} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#10b981,#059669)",color:"#fafafa",cursor:"pointer",fontSize:14,fontWeight:700}}>Submit Order ({cart.length} items · {FF(cart.reduce((s,c)=>s+c.total,0))})</button>
    </>}
    {cart.length===0&&!impItems&&<div style={{textAlign:"center",padding:"20px",color:"#52525b",fontSize:12}}>Add items above to build an order — each item can be Sale, Consignment, Out, or Transfer</div>}
    </>
  </div>}
  {sec==="money"&&<div style={{...cr,padding:"20px"}}>
    <div style={{display:"flex",gap:4,marginBottom:14}}>{[["BUY","💸 Buy/Pull"],["CONSIGN_PAY","📦 Consigner Payout"],["PAY_LOG","📜 Payout Log"],["XFER","↔ Transfer"]].map(([k,l])=>(<button key={k} onClick={()=>sPOType(k)} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${poType===k?`${AC}40`:T.border}`,background:poType===k?`${AC}18`:"transparent",color:poType===k?AC:"#52525b",cursor:"pointer",fontSize:10,fontWeight:600}}>{l}</button>))}</div>

    {poType==="BUY"&&<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>💸 BUY / PULL OUT / EXPENSE</div>
      <button onClick={()=>sPOSplitOn(v=>!v)} style={{padding:"4px 10px",borderRadius:5,border:`1px solid ${poSplitOn?`${AC}40`:T.border}`,background:poSplitOn?`${AC}18`:"transparent",color:poSplitOn?AC:"#52525b",cursor:"pointer",fontSize:9,fontWeight:600}}>± Split</button>
    </div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
      {!poSplitOn&&<div style={{minWidth:90}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>PERSON</div>
        <select value={poP} onChange={e=>sPOP(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:12,color:CO[poP]||"#fff"}}><optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select></div>}
      <div style={{minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>CHANNEL</div>
        <select value={poCh} onChange={e=>sPOCh(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}><option value="cash">Cash</option><option value="amex">Amex</option><option value="shopify">Shopify</option><option value="square">Square</option></select></div>
      <div style={{minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>AMOUNT</div>
        <input type="text" inputMode="decimal" value={poAmt} onChange={e=>sPOAmt(e.target.value)} placeholder="0.00" style={{...is,width:"100%",padding:"6px 8px",fontSize:12}}/></div>
      <div style={{flex:1,minWidth:100}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>NOTE</div>
        <input value={poNote} onChange={e=>sPONote(e.target.value)} placeholder="What did you buy / reason?" style={{...is,width:"100%",padding:"6px 8px",fontSize:12}}/></div>
      <div style={{minWidth:100}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>DATE</div>
        <input type="date" value={poDt} onChange={e=>sPODt(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11,colorScheme:"dark"}}/></div>
    </div>
    <div onDrop={handleImgDrop} onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=AC;}} onDragLeave={e=>{e.currentTarget.style.borderColor="#3f3f46";}} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",borderRadius:6,border:"1px dashed #3f3f46",transition:"border-color .15s"}}>
      <label style={{color:"#71717a",cursor:"pointer",fontSize:10,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}>
        📷 {cartImg?"Change":"Drop or click"}<input type="file" accept="image/*" onChange={handleCartImg} style={{display:"none"}}/>
      </label>
      {cartImg&&<><img src={cartImg} onClick={()=>sViewImg(cartImg)} style={{height:36,borderRadius:4,cursor:"pointer",border:"1px solid #3f3f46"}}/><button onClick={()=>sCartImg(null)} style={{background:"transparent",border:"none",color:"#ef4444",cursor:"pointer",fontSize:14}}>×</button></>}
    </div>
    {poSplitOn&&<div style={{...cr,padding:"12px",marginBottom:12}}>
      <div style={{color:"#a1a1aa",fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>SPLIT BETWEEN</div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
        {[...["AJAY","DEREK","SHARED","LJ"],...PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort()].map(p=>{const on=poSplitPpl.has(p);return(<button key={p} onClick={()=>sPOSplitPpl(s=>{const n=new Set(s);n.has(p)?n.delete(p):n.add(p);return n;})} style={{padding:"4px 10px",borderRadius:5,border:`1px solid ${on?CO[p]+"60":"#3f3f46"}`,background:on?CO[p]+"18":"transparent",color:on?CO[p]:"#52525b",cursor:"pointer",fontSize:10,fontWeight:600}}>{p}</button>);})}
      </div>
      {poSplitPpl.size>0&&(()=>{const a=parseFloat(poAmt)||0;const each=a>0?Math.round(a/poSplitPpl.size*100)/100:0;
        return <div style={{color:"#71717a",fontSize:10}}>
          <span style={{color:AC,fontWeight:700}}>{poSplitPpl.size}</span> people × <span style={{color:"#ef4444",fontFamily:"monospace",fontWeight:700}}>{FX(each)}</span> each = <span style={{color:"#ef4444",fontFamily:"monospace",fontWeight:700}}>{FX(each*poSplitPpl.size)}</span>
        </div>;
      })()}
    </div>}
    {(()=>{const a=parseFloat(poAmt)||0;
      if(poSplitOn){
        if(a<=0||poSplitPpl.size===0)return null;
        const each=Math.round(a/poSplitPpl.size*100)/100;const ppl=[...poSplitPpl];
        return <div style={{...cr,padding:"14px",marginBottom:12,border:"1px solid rgba(239,68,68,.2)",background:"rgba(239,68,68,.03)"}}>
          {ppl.map(p=>{const bal=balances[p]||{cash:0,amex:0,overall:0};const chBal=poCh==="cash"?bal.cash:poCh==="amex"?bal.amex:bal.overall;
            return <div key={p} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:CO[p]}}/><span style={{color:CO[p],fontSize:10,fontWeight:600,minWidth:50}}>{p}</span></div>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <span style={{color:"#71717a",fontSize:9}}>{FX(chBal)}</span>
                <span style={{color:"#ef4444",fontFamily:"monospace",fontSize:10,fontWeight:700}}>-{FX(each)}</span>
                <span style={{color:chBal-each>=0?"#22c55e":"#ef4444",fontFamily:"monospace",fontSize:10,fontWeight:700}}>{FX(chBal-each)}</span>
              </div>
            </div>;})}
        </div>;
      } else {
        const bal=balances[poP]||{cash:0,amex:0,overall:0};const chBal=poCh==="cash"?bal.cash:poCh==="amex"?bal.amex:bal.overall;
        return a>0?<div style={{...cr,padding:"14px",marginBottom:12,border:"1px solid rgba(239,68,68,.2)",background:"rgba(239,68,68,.03)"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#a1a1aa",fontSize:10}}>Current {poCh.toUpperCase()} balance</span><span style={{color:AC,fontFamily:"monospace",fontSize:12,fontWeight:700}}>{FX(chBal)}</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{color:"#ef4444",fontSize:10}}>Amount</span><span style={{color:"#ef4444",fontFamily:"monospace",fontSize:12,fontWeight:700}}>-{FX(a)}</span></div>
          <div style={{borderTop:"1px solid rgba(63,63,70,.5)",paddingTop:6,display:"flex",justifyContent:"space-between"}}><span style={{color:"#a1a1aa",fontSize:10}}>After</span><span style={{color:chBal-a>=0?"#22c55e":"#ef4444",fontFamily:"monospace",fontSize:13,fontWeight:700}}>{FX(chBal-a)}</span></div>
        </div>:null;
      }
    })()}
    <button onClick={()=>{const a=parseFloat(poAmt)||0;if(a<=0){tw("⚠ Enter amount",2000);return;}
      const desc=poNote||"Pull Out";
      if(poSplitOn){
        if(poSplitPpl.size===0){tw("⚠ Select people to split",2000);return;}
        const ppl=[...poSplitPpl];const each=Math.round(a/ppl.length*100)/100;
        const ne=[...entries];const gid="S"+Date.now();
        ppl.forEach(p=>{ne.push({id:Date.now()+Math.random(),c:poCh,d:poDt,p,a:each,io:"OUT",r:`BUY: ${desc} (split ${ppl.length}-way)`,grp:gid,t:new Date().toISOString(),...(cartImg?{img:cartImg}:{})});});
        sE(ne);sv(ne);tw(`✓ -${FX(each)} × ${ppl.length} = -${FX(each*ppl.length)} split (${poCh})`);sPOAmt("");sPONote("");sCartImg(null);
      } else {
        const e={id:Date.now()+Math.random(),c:poCh,d:poDt,p:poP,a:Math.round(a*100)/100,io:"OUT",r:`BUY: ${desc}`,t:new Date().toISOString(),...(cartImg?{img:cartImg}:{})};
        const ne=[...entries,e];sE(ne);sv(ne);
        tw(`✓ -${FX(a)} from ${poP} (${poCh})`);sPOAmt("");sPONote("");sCartImg(null);
      }
    }} style={{padding:"10px 24px",borderRadius:8,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:13,fontWeight:700,width:"100%"}}>{poSplitOn?`💸 Split -${FX((parseFloat(poAmt)||0)/Math.max(poSplitPpl.size,1))} × ${poSplitPpl.size}`:"💸 Record Buy / Pull Out"}</button>
    </>}

    {poType==="CONSIGN_PAY"&&(()=>{
      const consigners=PP.filter(p=>!OWNERS.has(p)).map(p=>{const b=balances[p]||{cash:0,amex:0,overall:0};return{p,cash:b.cash,amex:b.amex,overall:b.overall};}).filter(c=>Math.abs(c.overall)>0.01).sort((a,b)=>b.overall-a.overall);
      return(<>
      <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:10}}>📦 CONSIGNER PAYOUTS</div>
      <div style={{color:"#52525b",fontSize:9,marginBottom:12}}>Pay out consigners weekly. Use Balance to move cash→amex first, then Pay Out to zero their account.</div>
      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"end"}}>
        <div style={{minWidth:100}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>FROM DATE</div>
          <input type="date" value={poFrom} onChange={e=>sPOFrom(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11,colorScheme:"dark"}}/></div>
        <div style={{minWidth:100}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>TO DATE</div>
          <input type="date" value={poDt} onChange={e=>sPODt(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11,colorScheme:"dark"}}/></div>
      </div>
      {consigners.length===0?<div style={{textAlign:"center",padding:20,color:"#52525b",fontSize:12}}>No consigner balances to pay out</div>:<>
      <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>
        <button onClick={()=>sPOSel(prev=>prev.size===consigners.length?new Set():new Set(consigners.map(c=>c.p)))} style={{padding:"4px 10px",borderRadius:4,border:"1px solid #3f3f46",background:poSel.size===consigners.length?`${AC}18`:"transparent",color:poSel.size===consigners.length?AC:"#52525b",cursor:"pointer",fontSize:8,fontWeight:600}}>{poSel.size===consigners.length?"Deselect All":"Select All"}</button>
        {consigners.map(c=>(<button key={c.p} onClick={()=>sPOSel(prev=>{const n=new Set(prev);n.has(c.p)?n.delete(c.p):n.add(c.p);return n;})} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${poSel.has(c.p)?CO[c.p]+"60":"#3f3f46"}`,background:poSel.has(c.p)?`${CO[c.p]}15`:"transparent",color:poSel.has(c.p)?CO[c.p]:"#52525b",cursor:"pointer",fontSize:8,fontWeight:600}}>{c.p} {FX(c.overall)}</button>))}
      </div>
      {poSel.size>0&&(()=>{const selected=consigners.filter(c=>poSel.has(c.p));const selTotal=selected.reduce((s,c)=>s+Math.abs(c.overall),0);return(
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{color:"#a1a1aa",fontSize:9}}>{selected.length} selected · {FX(selTotal)}</span>
        {selected.some(c=>Math.abs(c.cash)>0.01)&&<button onClick={()=>{
          let ne=[...entries];
          selected.forEach(c=>{if(Math.abs(c.cash)>0.01){
            const amt=Math.round(Math.abs(c.cash)*100)/100;
            ne.push({id:Date.now()+Math.random(),c:"cash",d:poDt,p:c.p,a:amt,io:c.cash>0?"XFER_OUT":"XFER_IN",r:"Balance: cash→amex",t:new Date().toISOString()});
            ne.push({id:Date.now()+Math.random()+.001,c:"amex",d:poDt,p:c.p,a:amt,io:c.cash>0?"XFER_IN":"XFER_OUT",r:"Balance: cash→amex",t:new Date().toISOString()});
          }});
          sE(ne);sv(ne);tw(`✓ Balanced ${selected.length} cash→amex`);
        }} style={{padding:"5px 10px",borderRadius:5,border:"1px solid #3b82f640",background:"rgba(59,130,246,.1)",color:"#3b82f6",cursor:"pointer",fontSize:9,fontWeight:700}}>⚖️ Balance Selected</button>}
        <button onClick={async()=>{
          let ne=[...entries];const fmtFrom=SD(poFrom);const fmtTo=SD(poDt);
          const texts=[];
          selected.forEach((c,idx)=>{
            const gid="PAY"+Date.now()+idx;
            if(Math.abs(c.cash)>0.01){
              const cashAmt=Math.round(Math.abs(c.cash)*100)/100;
              ne.push({id:Date.now()+Math.random(),c:"cash",d:poDt,p:c.p,a:cashAmt,io:c.cash>0?"XFER_OUT":"XFER_IN",r:"Payout: balance cash→amex",grp:gid,t:new Date().toISOString()});
              ne.push({id:Date.now()+Math.random()+.001,c:"amex",d:poDt,p:c.p,a:cashAmt,io:c.cash>0?"XFER_IN":"XFER_OUT",r:"Payout: balance cash→amex",grp:gid,t:new Date().toISOString()});
            }
            const totalAmex=Math.round(Math.abs(c.overall)*100)/100;
            ne.push({id:Date.now()+Math.random()+.002,c:"amex",d:poDt,p:c.p,a:totalAmex,io:"PYOUT",r:`PAYOUT: Weekly consigner payout`,grp:gid,pyout:true,t:new Date().toISOString()});
            if(pplInfo[c.p]?.email){texts.push({email:pplInfo[c.p].email,amt:totalAmex,name:c.p});}
          });
          sE(ne);sv(ne);sPOSel(new Set());
          tw(`✓ Paid out ${selected.length} consigners: ${FX(selTotal)}`);
          if(texts.length>0){
            let sent=0;
            for(const t of texts){const ok=await sendPayoutEmail(t.email,t.name,t.amt,fmtFrom,fmtTo);if(ok)sent++;}
            if(sent>0)tw(`✓ ${sent}/${texts.length} payout emails sent`);
          }
        }} style={{padding:"5px 12px",borderRadius:5,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:9,fontWeight:700}}>💰📧 Pay + Email Selected ({selected.length})</button>
      </div>);})()}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {consigners.map(c=>{const isExp=payExp===c.p;return(<div key={c.p} style={{...cr,padding:"14px 16px",border:`1px solid ${poSel.has(c.p)?CO[c.p]+"60":CO[c.p]+"20"}`,background:poSel.has(c.p)?"rgba(245,158,11,.03)":"transparent"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <button onClick={()=>sPOSel(prev=>{const n=new Set(prev);n.has(c.p)?n.delete(c.p):n.add(c.p);return n;})} style={{width:16,height:16,borderRadius:3,border:`1px solid ${poSel.has(c.p)?CO[c.p]:"#3f3f46"}`,background:poSel.has(c.p)?CO[c.p]:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#000",fontWeight:900,padding:0}}>{poSel.has(c.p)?"✓":""}</button>
                <div style={{width:8,height:8,borderRadius:"50%",background:CO[c.p]}}/><span style={{color:CO[c.p],fontWeight:700,fontSize:13}}>{c.p}</span></div>
              <span style={{color:AC,fontFamily:"monospace",fontSize:14,fontWeight:700}}>{FX(c.overall)}</span>
            </div>
            <div style={{display:"flex",gap:16,marginBottom:10}}>
              <div><span style={{color:"#52525b",fontSize:8}}>CASH</span><div style={{color:"#22c55e",fontFamily:"monospace",fontSize:11,fontWeight:600}}>{FX(c.cash)}</div></div>
              <div><span style={{color:"#52525b",fontSize:8}}>AMEX</span><div style={{color:"#3b82f6",fontFamily:"monospace",fontSize:11,fontWeight:600}}>{FX(c.amex)}</div></div>
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button onClick={()=>{if(isExp){sPayExp(null);}else{sPayExp(c.p);sPayAmt(Math.abs(c.overall).toFixed(2));const cashAvail=Math.max(0,c.cash);const amexAvail=Math.max(0,c.amex);const total=Math.abs(c.overall);const fromCash=Math.min(cashAvail,total);sPayCash(fromCash.toFixed(2));sPayAmex(Math.max(0,total-fromCash).toFixed(2));sPayXfer("");}}} style={{padding:"5px 14px",borderRadius:5,border:`1px solid ${isExp?"#f59e0b40":"#ef444440"}`,background:isExp?`${AC}18`:"rgba(239,68,68,.1)",color:isExp?"#f59e0b":"#ef4444",cursor:"pointer",fontSize:9,fontWeight:700}}>{isExp?"▼ Close":"💰 Pay Out"}</button>
              <button onClick={()=>{if(payExp===c.p+"_xfer"){sPayExp(null);}else{sPayExp(c.p+"_xfer");sPayXfer("");}}} style={{padding:"5px 10px",borderRadius:5,border:"1px solid #3b82f640",background:"rgba(59,130,246,.1)",color:"#3b82f6",cursor:"pointer",fontSize:9,fontWeight:600}}>↔ Transfer</button>
            </div>
            {payExp===c.p+"_xfer"&&<div style={{marginTop:10,padding:"12px",background:"rgba(59,130,246,.05)",borderRadius:8,border:"1px solid #3b82f620"}}>
              <div style={{color:"#3b82f6",fontSize:9,fontWeight:700,marginBottom:8}}>↔ TRANSFER BETWEEN ACCOUNTS</div>
              <div style={{display:"flex",gap:6,alignItems:"flex-end",flexWrap:"wrap"}}>
                <div style={{width:80}}><div style={{color:"#a1a1aa",fontSize:8,marginBottom:3}}>AMOUNT</div>
                  <input type="number" value={payXfer} onChange={e=>sPayXfer(e.target.value)} placeholder="0.00" style={{...is,width:"100%",padding:"5px 8px",fontSize:11}}/></div>
                <button onClick={()=>{const a=parseFloat(payXfer)||0;if(a<=0){tw("⚠ Enter amount");return;}
                  const ne=[...entries,
                    {id:Date.now()+Math.random(),c:"cash",d:poDt,p:c.p,a:Math.round(a*100)/100,io:"XFER_OUT",r:"Transfer: cash→amex",t:new Date().toISOString()},
                    {id:Date.now()+Math.random()+.001,c:"amex",d:poDt,p:c.p,a:Math.round(a*100)/100,io:"XFER_IN",r:"Transfer: cash→amex",t:new Date().toISOString()}
                  ];sE(ne);sv(ne);tw(`✓ ${c.p}: ${FX(a)} cash → amex`);sPayXfer("");
                }} style={{padding:"5px 10px",borderRadius:5,border:"none",background:"#22c55e",color:"#000",cursor:"pointer",fontSize:9,fontWeight:700}}>Cash → Amex</button>
                <button onClick={()=>{const a=parseFloat(payXfer)||0;if(a<=0){tw("⚠ Enter amount");return;}
                  const ne=[...entries,
                    {id:Date.now()+Math.random(),c:"amex",d:poDt,p:c.p,a:Math.round(a*100)/100,io:"XFER_OUT",r:"Transfer: amex→cash",t:new Date().toISOString()},
                    {id:Date.now()+Math.random()+.001,c:"cash",d:poDt,p:c.p,a:Math.round(a*100)/100,io:"XFER_IN",r:"Transfer: amex→cash",t:new Date().toISOString()}
                  ];sE(ne);sv(ne);tw(`✓ ${c.p}: ${FX(a)} amex → cash`);sPayXfer("");
                }} style={{padding:"5px 10px",borderRadius:5,border:"none",background:"#3b82f6",color:"#fff",cursor:"pointer",fontSize:9,fontWeight:700}}>Amex → Cash</button>
              </div>
            </div>}
            {isExp&&<div style={{marginTop:10,padding:"12px",background:"rgba(239,68,68,.03)",borderRadius:8,border:"1px solid #ef444420"}}>
              <div style={{color:"#ef4444",fontSize:9,fontWeight:700,marginBottom:8}}>💰 PAYOUT</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
                <div style={{width:90}}><div style={{color:"#a1a1aa",fontSize:8,marginBottom:3}}>TOTAL PAYOUT</div>
                  <input type="number" value={payAmt} onChange={e=>{const v=e.target.value;sPayAmt(v);const a=parseFloat(v)||0;const cashAvail=Math.max(0,c.cash);const fromCash=Math.min(cashAvail,a);sPayCash(fromCash.toFixed(2));sPayAmex(Math.max(0,a-fromCash).toFixed(2));}} placeholder="0.00" style={{...is,width:"100%",padding:"5px 8px",fontSize:11}}/></div>
                <div style={{width:80}}><div style={{color:"#22c55e",fontSize:8,marginBottom:3}}>FROM CASH</div>
                  <input type="number" value={payCash} onChange={e=>{sPayCash(e.target.value);const cv=parseFloat(e.target.value)||0;const total=parseFloat(payAmt)||0;sPayAmex(Math.max(0,total-cv).toFixed(2));}} placeholder="0.00" style={{...is,width:"100%",padding:"5px 8px",fontSize:11}}/></div>
                <div style={{width:80}}><div style={{color:"#3b82f6",fontSize:8,marginBottom:3}}>FROM AMEX</div>
                  <input type="number" value={payAmex} onChange={e=>{sPayAmex(e.target.value);const av=parseFloat(e.target.value)||0;const total=parseFloat(payAmt)||0;sPayCash(Math.max(0,total-av).toFixed(2));}} placeholder="0.00" style={{...is,width:"100%",padding:"5px 8px",fontSize:11}}/></div>
              </div>
              {(()=>{const total=parseFloat(payAmt)||0;const fromCash=parseFloat(payCash)||0;const fromAmex=parseFloat(payAmex)||0;const sum=Math.round((fromCash+fromAmex)*100)/100;const match=Math.abs(sum-total)<0.01;
                return total>0?<div style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:3}}><span style={{color:"#a1a1aa"}}>Payout total</span><span style={{color:"#ef4444",fontFamily:"monospace",fontWeight:700}}>{FX(total)}</span></div>
                  {fromCash>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#71717a"}}>From cash</span><span style={{color:"#22c55e",fontFamily:"monospace"}}>{FX(fromCash)}</span></div>}
                  {fromAmex>0&&<div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{color:"#71717a"}}>From amex</span><span style={{color:"#3b82f6",fontFamily:"monospace"}}>{FX(fromAmex)}</span></div>}
                  {!match&&<div style={{color:AC,fontSize:8,marginTop:4}}>⚠ Cash + Amex ({FX(sum)}) ≠ Total ({FX(total)})</div>}
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginTop:4,paddingTop:4,borderTop:"1px solid rgba(63,63,70,.3)"}}>
                    <span style={{color:"#a1a1aa"}}>Remaining balance</span><span style={{color:c.overall-total>=0?"#22c55e":"#ef4444",fontFamily:"monospace",fontWeight:700}}>{FX(c.overall-total)}</span></div>
                </div>:null;
              })()}
              <button onClick={async()=>{const total=parseFloat(payAmt)||0;const fromCash=parseFloat(payCash)||0;const fromAmex=parseFloat(payAmex)||0;
                if(total<=0){tw("⚠ Enter payout amount");return;}
                const sum=Math.round((fromCash+fromAmex)*100)/100;if(Math.abs(sum-total)>0.01){tw("⚠ Cash + Amex must equal total");return;}
                const ne=[...entries];const gid="PAY"+Date.now();
                if(fromCash>0)ne.push({id:Date.now()+Math.random(),c:"cash",d:poDt,p:c.p,a:Math.round(fromCash*100)/100,io:"PYOUT",r:`PAYOUT: Consigner payout (cash)`,grp:gid,pyout:true,t:new Date().toISOString()});
                if(fromAmex>0)ne.push({id:Date.now()+Math.random()+.001,c:"amex",d:poDt,p:c.p,a:Math.round(fromAmex*100)/100,io:"PYOUT",r:`PAYOUT: Consigner payout (amex)`,grp:gid,pyout:true,t:new Date().toISOString()});
                sE(ne);sv(ne);sPayExp(null);tw(`✓ Paid ${c.p}: ${FX(total)}`);
                if(pplInfo[c.p]?.email){await sendPayoutEmail(pplInfo[c.p].email,c.p,total,SD(poFrom),SD(poDt));}
              }} style={{padding:"6px 16px",borderRadius:5,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:10,fontWeight:700,width:"100%"}}>{pplInfo[c.p]?.email?"💰📧 Pay + Email":"💰 Pay Out"} {FX(parseFloat(payAmt)||0)}</button>
            </div>}
          </div>);})}
      </div></>}
      </>);
    })()}

    {poType==="PAY_LOG"&&(()=>{
      const payouts=entries.filter(e=>e.pyout||e.io==="PYOUT"||e.r?.startsWith("PAYOUT:")).sort((a,b)=>(b.d||"").localeCompare(a.d||""));
      const byDate={};payouts.forEach(e=>{if(!byDate[e.d])byDate[e.d]=[];byDate[e.d].push(e);});
      return(<>
      <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:10}}>📜 CONSIGNMENT PAYOUT LOG</div>
      {payouts.length===0?<div style={{textAlign:"center",padding:20,color:"#52525b",fontSize:12}}>No payouts recorded yet</div>:
      <div style={{display:"flex",flexDirection:"column",gap:2}}>
        {Object.entries(byDate).sort(([a],[b])=>b.localeCompare(a)).map(([d,es])=>(<div key={d}>
          <div style={{padding:"8px 12px",background:"rgba(63,63,70,.15)",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#a1a1aa",fontSize:10,fontWeight:600}}>{SD(d)}</span>
              <span style={{color:"#ef4444",fontFamily:"monospace",fontSize:11,fontWeight:700}}>-{FX(es.reduce((s,e)=>s+e.a,0))}</span>
            </div>
          </div>
          {es.map(e=>(<div key={e.id} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px 6px 24px",borderBottom:"1px solid rgba(63,63,70,.15)"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:CO[e.p]}}/><span style={{color:CO[e.p],fontSize:10,fontWeight:600,minWidth:50}}>{e.p}</span>
            <span style={{color:"#ef4444",fontFamily:"monospace",fontSize:10,fontWeight:700}}>-{FX(e.a)}</span>
            <span style={{color:"#52525b",fontSize:8,flex:1}}>{e.r}</span>
            {pplInfo[e.p]?.email&&e.pyout&&<button onClick={async()=>{
              await sendPayoutEmail(pplInfo[e.p].email,e.p,e.a,SD(poFrom),SD(e.d));
            }} style={{padding:"2px 6px",borderRadius:3,border:"1px solid #22c55e40",background:"rgba(34,197,94,.1)",color:"#22c55e",cursor:"pointer",fontSize:8,fontWeight:600,whiteSpace:"nowrap"}}>📧 Resend</button>}
            <button onClick={()=>{const ne=entries.filter(x=>x.id!==e.id);sE(ne);sv(ne);tw("Deleted");}} style={{background:"transparent",border:"none",color:"#52525b",cursor:"pointer",fontSize:10}}>×</button>
          </div>))}
        </div>))}
      </div>}
      </>);
    })()}

    {poType==="XFER"&&<>
    <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:14}}>💸 TRANSFER / MULTI-PAYOUT</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,alignItems:"start"}}>
      <div style={{minWidth:140}}>
        <div style={{color:"#ef4444",fontSize:9,fontWeight:700,marginBottom:4}}>FROM (tap to add)</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>{const has=xfSenders.find(s=>s.p===p);return(<button key={p} onClick={()=>{sXfSenders(prev=>has?prev.filter(s=>s.p!==p):[...prev,{p,amt:""}]);}} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${has?CO[p]+"60":"#3f3f46"}`,background:has?`${CO[p]}15`:"transparent",color:has?CO[p]:"#52525b",cursor:"pointer",fontSize:8,fontWeight:600}}>{p}</button>);})}</div>
        <div style={{display:"flex",gap:4,marginBottom:6}}>{["cash","amex"].map(c=>(<button key={c} onClick={()=>sXfFromCh(c)} style={{flex:1,padding:"5px",borderRadius:5,border:`1px solid ${xfFromCh===c?"#ef444440":"rgba(63,63,70,.7)"}`,background:xfFromCh===c?"rgba(239,68,68,.08)":"transparent",color:xfFromCh===c?"#ef4444":"#555",cursor:"pointer",fontSize:9,fontWeight:600}}>{c.toUpperCase()}</button>))}</div>
        {xfSenders.length>1&&<div style={{display:"flex",flexDirection:"column",gap:4}}>
          {xfSenders.map((s,i)=>{const bal=balances[s.p]||{cash:0,amex:0};return(<div key={s.p} style={{display:"flex",alignItems:"center",gap:4}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:CO[s.p]}}/><span style={{color:CO[s.p],fontSize:9,fontWeight:600,minWidth:40}}>{s.p}</span>
            <input type="text" inputMode="decimal" value={s.amt} onChange={e=>sXfSenders(prev=>prev.map((x,j)=>j===i?{...x,amt:e.target.value}:x))} placeholder="$" style={{...is,width:60,padding:"3px 5px",fontSize:10}}/>
            <span style={{color:"#52525b",fontSize:7}}>({FX(bal[xfFromCh]||0)})</span>
          </div>);})}
          <button onClick={()=>{const total=(xfRecips||[]).reduce((s,r)=>s+(parseFloat(r.amt)||0),0);if(total>0&&xfSenders.length>0){const split=Math.round(total/xfSenders.length*100)/100;sXfSenders(prev=>prev.map((s,i)=>({...s,amt:String(i===prev.length-1?Math.round((total-split*(prev.length-1))*100)/100:split)})));}}} style={{padding:"2px 6px",borderRadius:3,border:"1px solid #3f3f46",background:"transparent",color:"#71717a",cursor:"pointer",fontSize:7,fontWeight:600}}>Split Evenly</button>
        </div>}
      </div>
      <div style={{color:"#71717a",fontSize:18,padding:"10px 4px 0"}}>→</div>
      <div style={{flex:1,minWidth:120}}>
        <div style={{color:"#10b981",fontSize:9,fontWeight:700,marginBottom:4}}>TO (tap to add)</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:6}}>{PP.map(p=>{const isSender=xfSenders.find(s=>s.p===p);if(isSender)return null;return(<button key={p} onClick={()=>{const cur=xfRecips||[];const has=cur.find(r=>r.p===p);sXfRecips(has?cur.filter(r=>r.p!==p):[...cur,{p,amt:"",ch:xfToCh}]);}} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${(xfRecips||[]).find(r=>r.p===p)?CO[p]+"60":"#3f3f46"}`,background:(xfRecips||[]).find(r=>r.p===p)?`${CO[p]}15`:"transparent",color:(xfRecips||[]).find(r=>r.p===p)?CO[p]:"#52525b",cursor:"pointer",fontSize:8,fontWeight:600}}>{p}</button>);})}</div>
      </div>
    </div>
    <div style={{display:"flex",gap:4,marginBottom:10}}>{["cash","amex"].map(c=>(<button key={c} onClick={()=>{sXfToCh(c);sXfRecips((xfRecips||[]).map(r=>({...r,ch:c})));}} style={{padding:"4px 12px",borderRadius:5,border:`1px solid ${xfToCh===c?"#10b98140":"rgba(63,63,70,.7)"}`,background:xfToCh===c?"rgba(16,185,129,.08)":"transparent",color:xfToCh===c?"#10b981":"#555",cursor:"pointer",fontSize:9,fontWeight:600}}>TO: {c.toUpperCase()}</button>))}</div>

    {(xfRecips||[]).length>0&&<>
    <div style={{color:"#a1a1aa",fontSize:9,fontWeight:600,marginBottom:6}}>CONSIGNMENT CALCULATOR</div>
    <div style={{color:"#52525b",fontSize:8,marginBottom:8}}>Enter card value — consigner portion auto-calculated based on commission rate</div>
    <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:12}}>
      {(xfRecips||[]).map((r,i)=>{const cfg=(COMM[r.p]||DEF_COMM);const isOwner=OWNERS.has(r.p);const full=r.full||isOwner;const consignerRate=full?1:(1-cfg.rate);
        return(<div key={r.p} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 12px",borderRadius:8,background:"rgba(63,63,70,.2)",border:`1px solid ${CO[r.p]}20`,flexWrap:"wrap"}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:CO[r.p]}}/><span style={{color:CO[r.p],fontWeight:600,fontSize:11,minWidth:50}}>{r.p}</span>
          {!isOwner&&<button onClick={()=>{sXfRecips(prev=>prev.map((x,j)=>{if(j!==i)return x;const nf=!x.full;const rate=nf?1:(1-cfg.rate);return{...x,full:nf,amt:x.cardVal?String(Math.round(parseFloat(x.cardVal||0)*rate*100)/100):x.amt};}));}} style={{padding:"2px 6px",borderRadius:3,border:`1px solid ${full?`${AC}40`:T.border}`,background:full?`${AC}18`:"transparent",color:full?AC:"#52525b",cursor:"pointer",fontSize:7,fontWeight:600}}>{full?"FULL":"CONSIGNED"}</button>}
          <div style={{flex:1,display:"flex",gap:6,alignItems:"center"}}>
            <div><div style={{color:"#52525b",fontSize:7}}>{full?"AMOUNT":"CARD VALUE"}</div><input type="text" inputMode="decimal" value={r.cardVal||""} onChange={e=>{const v=e.target.value;sXfRecips(prev=>prev.map((x,j)=>j===i?{...x,cardVal:v,amt:String(Math.round(parseFloat(v||0)*consignerRate*100)/100)}:x));}} placeholder="$" style={{...is,width:70,padding:"4px 6px",fontSize:11}}/></div>
            {!full&&!isOwner&&<div style={{color:"#71717a",fontSize:8,textAlign:"center"}}><div>×{(consignerRate*100).toFixed(0)}%</div><div style={{fontSize:7}}>({(cfg.rate*100).toFixed(0)}% comm)</div></div>}
            {!full&&!isOwner&&<div style={{color:"#52525b",fontSize:7,textAlign:"center"}}>=</div>}
            {!full&&!isOwner&&<div><div style={{color:"#52525b",fontSize:7}}>PAYOUT</div><input type="text" inputMode="decimal" value={r.amt} onChange={e=>{sXfRecips(prev=>prev.map((x,j)=>j===i?{...x,amt:e.target.value}:x));}} style={{...is,width:70,padding:"4px 6px",fontSize:11,color:"#22c55e"}}/></div>}
          </div>
          <button onClick={()=>sXfRecips(prev=>prev.filter((_,j)=>j!==i))} style={{background:"transparent",border:"none",color:"#52525b",cursor:"pointer",fontSize:12}}>×</button>
          <div style={{width:"100%",paddingLeft:12,marginTop:4}}><input value={r.note||""} onChange={e=>{sXfRecips(prev=>prev.map((x,j)=>j===i?{...x,note:e.target.value}:x));}} placeholder={full?"What item? e.g. Plushie":"Card name / description"} style={{...is,width:"100%",padding:"3px 6px",fontSize:9}}/></div>
        </div>);
      })}
    </div>

    {(()=>{const total=(xfRecips||[]).reduce((s,r)=>s+(parseFloat(r.amt)||0),0);const senders=xfSenders||[];
      const multiFrom=senders.length>1;
      return total>0?<div style={{padding:"12px",borderRadius:8,background:"rgba(63,63,70,.4)",border:"1px solid rgba(63,63,70,.7)",marginBottom:14}}>
        <div style={{color:"#a1a1aa",fontSize:10,marginBottom:8,fontWeight:600}}>PREVIEW</div>
        {senders.map(s=>{const a=multiFrom?(parseFloat(s.amt)||0):total;const bal=balances[s.p]||{cash:0,amex:0};return(<div key={s.p} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <span style={{color:CO[s.p],fontSize:11,fontWeight:600}}>{s.p} {xfFromCh.toUpperCase()}</span>
          <span style={{color:"#ef4444",fontFamily:"monospace",fontSize:11,fontWeight:700}}>-{FX(a)}</span>
          <span style={{color:"#71717a",fontSize:9}}>({FX(bal[xfFromCh]||0)} → {FX((bal[xfFromCh]||0)-a)})</span>
        </div>);})}
        <div style={{borderTop:"1px solid rgba(63,63,70,.5)",marginTop:4,paddingTop:4}}>
        {(xfRecips||[]).map(r=>{const a=parseFloat(r.amt)||0;return a>0?<div key={r.p} style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
          <span style={{color:CO[r.p],fontSize:10}}>{r.p} {xfToCh.toUpperCase()}</span>
          <span style={{color:"#10b981",fontFamily:"monospace",fontSize:10}}>+{FX(a)}</span>
        </div>:null;})}
        </div>
      </div>:null;
    })()}
    </>}

    <div style={{display:"flex",gap:8,alignItems:"flex-end",marginBottom:14}}>
      <div><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>DATE</div><input type="date" value={xfDt} onChange={e=>sXfDt(e.target.value)} style={{...is,padding:"8px",colorScheme:"dark",fontSize:11}}/></div>
      <div style={{flex:1}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>NOTE</div><input value={xfNote} onChange={e=>sXfNote(e.target.value)} placeholder="e.g. Trade payout, Collection buy" style={{...is,width:"100%",padding:"8px",fontSize:12}}/></div>
    </div>
    <button onClick={()=>{const recips=(xfRecips||[]);const senders=xfSenders||[];
      if(recips.length===0){tw("⚠ Select recipients");return;}
      const total=recips.reduce((s,r)=>s+(parseFloat(r.amt)||0),0);if(total<=0){tw("⚠ Enter amounts");return;}
      const multiFrom=senders.length>1;
      if(multiFrom){const sTotal=senders.reduce((s,x)=>s+(parseFloat(x.amt)||0),0);if(Math.abs(sTotal-total)>0.02){tw(`⚠ FROM total (${FX(sTotal)}) ≠ TO total (${FX(total)})`);return;}}
      const ne=[...entries];const gid="XF"+Date.now();const label=xfNote||`Transfer ${senders.map(s=>s.p).join("+")}→${recips.map(r=>r.p).join(",")}`;
      senders.forEach((s,i)=>{const a=multiFrom?(parseFloat(s.amt)||0):total;if(a>0){ne.push({id:Date.now()+i,c:xfFromCh==="cash"?"cash":"amex",d:xfDt,p:s.p,a:Math.round(a*100)/100,io:"XFER_OUT",r:label,grp:gid,t:new Date().toISOString()});}});
      recips.forEach((r,i)=>{const a=parseFloat(r.amt)||0;if(a>0){const rlbl=r.note?`${label} · ${r.note}`:label;ne.push({id:Date.now()+senders.length+i+1,c:xfToCh==="cash"?"cash":"amex",d:xfDt,p:r.p,a:Math.round(a*100)/100,io:"XFER_IN",r:rlbl,grp:gid,t:new Date().toISOString()});}});
      sE(ne);sv(ne);sXfAmt("");sXfNote("");sXfRecips([]);tw(`✓ Transferred ${FX(total)} from ${senders.map(s=>s.p).join("+")} → ${recips.length} people`);
    }} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#ef4444,#10b981)",color:"#fafafa",cursor:"pointer",fontSize:13,fontWeight:700}}>Transfer {(xfRecips||[]).reduce((s,r)=>s+(parseFloat(r.amt)||0),0)>0?FX((xfRecips||[]).reduce((s,r)=>s+(parseFloat(r.amt)||0),0)):""}</button>
  </>}
  </div>}
  {sec==="trade"&&<div style={{...cr,padding:"20px"}}>
    <div style={{color:"#a1a1aa",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:10}}>LOG A TRADE</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
      <div><div style={{color:"#71717a",fontSize:10,fontWeight:600,marginBottom:4}}>DATE</div><input type="date" value={cartDt} onChange={e=>sCartDt(e.target.value)} style={{...is,width:"100%",colorScheme:"dark"}}/></div>
      <div><div style={{color:"#71717a",fontSize:10,fontWeight:600,marginBottom:4}}>CHANNEL</div><select value={cartCh} onChange={e=>sCartCh(e.target.value)} style={{...is,width:"100%"}}>{Object.entries(CL).map(([k,v])=>(<option key={k} value={k}>{v}</option>))}</select></div>
    </div>
    <div onDrop={handleImgDrop} onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=AC;}} onDragLeave={e=>{e.currentTarget.style.borderColor="#3f3f46";}} style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,padding:"8px 12px",borderRadius:6,border:"1px dashed #3f3f46",transition:"border-color .15s"}}>
      <label style={{color:"#71717a",cursor:"pointer",fontSize:10,fontWeight:600,display:"inline-flex",alignItems:"center",gap:4}}>
        📷 {cartImg?"Change":"Drop or click"}<input type="file" accept="image/*" onChange={handleCartImg} style={{display:"none"}}/>
      </label>
      {cartImg&&<><img src={cartImg} onClick={()=>sViewImg(cartImg)} style={{height:36,borderRadius:4,cursor:"pointer",border:"1px solid #3f3f46"}}/><button onClick={()=>sCartImg(null)} style={{background:"transparent",border:"none",color:"#ef4444",cursor:"pointer",fontSize:14}}>×</button></>}
    </div>
    <div style={{background:"rgba(63,63,70,.3)",borderRadius:10,border:"1px solid rgba(63,63,70,.6)",padding:14,marginBottom:12}}>
      <div style={{color:"#10b981",fontSize:10,fontWeight:700,marginBottom:8}}>⬆ GAVE (Trade Out)</div>
      <div style={{display:"flex",gap:6,alignItems:"flex-end",flexWrap:"wrap",marginBottom:6}}>
        <div style={{minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>FROM</div><select value={ciP} onChange={e=>sCIP(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}><optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select></div>
        <div style={{flex:2,minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>ITEM</div><input value={ciN} onChange={e=>sCIN(e.target.value)} placeholder="Card/item given" style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}/></div>
        <div style={{width:60}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>VALUE</div><input type="number" value={ciA} onChange={e=>sCIA(e.target.value)} placeholder="$" style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}/></div>
        <button onClick={()=>{const a=parseFloat(ciA);if(!a){tw("⚠ Enter value");return;}sCart(c=>[...c,{id:Date.now(),p:ciP,name:ciN||"Item",qty:1,price:a,total:a,io:"TRADE_OUT"}]);sCIN("");sCIA("");}} style={{padding:"6px 10px",borderRadius:6,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:11,fontWeight:700}}>+</button>
      </div>
    </div>
    <div style={{background:"rgba(63,63,70,.3)",borderRadius:10,border:"1px solid rgba(63,63,70,.6)",padding:14,marginBottom:12}}>
      <div style={{color:AC,fontSize:10,fontWeight:700,marginBottom:8}}>⬇ RECEIVED (Trade In)</div>
      <div style={{display:"flex",gap:6,alignItems:"flex-end",flexWrap:"wrap",marginBottom:6}}>
        <div style={{minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>TO</div><select value={ciP} onChange={e=>sCIP(e.target.value)} style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}><optgroup label="MAIN" style={{background:"#27272a"}}>{["AJAY","DEREK","SHARED","LJ"].map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup><optgroup label="CONSIGNERS" style={{background:"#27272a"}}>{PP.filter(p=>!["AJAY","DEREK","SHARED","LJ"].includes(p)).sort().map(p=>(<option key={p} value={p} style={{color:CO[p],background:"#27272a"}}>{p}</option>))}</optgroup></select></div>
        <div style={{flex:2,minWidth:80}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>ITEM</div><input value={ciN} onChange={e=>sCIN(e.target.value)} placeholder="Card/item received" style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}/></div>
        <div style={{width:60}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>VALUE</div><input type="number" value={ciA} onChange={e=>sCIA(e.target.value)} placeholder="$" style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}/></div>
        <button onClick={()=>{const a=parseFloat(ciA);if(!a){tw("⚠ Enter value");return;}sCart(c=>[...c,{id:Date.now(),p:ciP,name:ciN||"Item",qty:1,price:a,total:a,io:"TRADE_IN"}]);sCIN("");sCIA("");}} style={{padding:"6px 10px",borderRadius:6,border:"none",background:"#10b981",color:"#fafafa",cursor:"pointer",fontSize:11,fontWeight:700}}>+</button>
      </div>
    </div>
    {cart.length>0&&<>
      <div style={{background:"rgba(63,63,70,.3)",borderRadius:10,border:"1px solid rgba(63,63,70,.6)",overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"8px 14px",borderBottom:"1px solid rgba(63,63,70,.5)"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>TRADE — {cart.length} items</span></div>
        {cart.map(it=>{const isOut=it.io==="TRADE_OUT";return(<div key={it.id} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
          <span style={{color:isOut?"#ef4444":"#10b981",fontSize:10,fontWeight:700}}>{isOut?"OUT":"IN"}</span>
          <div style={{width:6,height:6,borderRadius:"50%",background:CO[it.p]}}/><span style={{color:CO[it.p],fontSize:10,fontWeight:600,minWidth:50}}>{it.p}</span>
          <span style={{color:"#d4d4d8",fontSize:10,flex:1}}>{it.name}</span>
          <span style={{color:isOut?"#ef4444":"#10b981",fontFamily:"monospace",fontSize:10,fontWeight:700}}>{isOut?"-":"+"}{FX(it.total)}</span>
          <button onClick={()=>rmCart(it.id)} style={{background:"transparent",border:"none",color:"#a1a1aa",cursor:"pointer",fontSize:12}}>×</button>
        </div>)})}
        <div style={{padding:"8px 14px",borderTop:"1px solid rgba(63,63,70,.5)",display:"flex",justifyContent:"space-between"}}>
          <span style={{color:"#ef4444",fontSize:10}}>Gave: {FF(cart.filter(c=>c.io==="TRADE_OUT").reduce((s,c)=>s+c.total,0))}</span>
          <span style={{color:"#10b981",fontSize:10}}>Got: {FF(cart.filter(c=>c.io==="TRADE_IN").reduce((s,c)=>s+c.total,0))}</span>
        </div>
      </div>
      <button onClick={submitCart} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:"linear-gradient(135deg,#10b981,#059669)",color:"#fafafa",cursor:"pointer",fontSize:14,fontWeight:700}}>Log Trade</button>
    </>}
    {cart.length===0&&<div style={{textAlign:"center",padding:"20px",color:"#52525b",fontSize:12}}>Add items given and received above to log a trade</div>}
  </div>}
  {sec==="bank"&&(()=>{
    const accts=["AMEX","CHASE","CASH"];
    const addBankTxn=()=>{const a=parseFloat(bkAmt);if(!a||a<=0){tw("⚠ Enter amount");return;}
      const nt=[...bankTxns,{id:Date.now(),acct:bkAcct,type:bkType,amt:a,note:bkNote||"",d:bkDt,t:new Date().toISOString()}];
      sBankTxns(nt);svBank(nt);sBkAmt("");sBkNote("");tw(`✓ ${bkType==="deposit"?"Deposited":"Withdrew"} ${FX(a)} → ${bkAcct}`);};
    const delBankTxn=(id)=>{const nt=bankTxns.filter(t=>t.id!==id);sBankTxns(nt);svBank(nt);tw("Deleted");};
    const acctTxns=bankTxns.filter(t=>t.acct===bkAcct).sort((a,b)=>b.d>a.d?1:b.d<a.d?-1:b.t>a.t?1:-1);
    return(<div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:12}}>
        {accts.map(a=>(<div key={a} onClick={()=>sBkAcct(a)} style={{...cr,padding:"14px",cursor:"pointer",borderLeft:`3px solid ${a==="AMEX"?"#06b6d4":a==="CASH"?"#22c55e":"#3b82f6"}`,background:bkAcct===a?"rgba(63,63,70,.7)":"rgba(63,63,70,.3)"}}>
          <div style={{color:a==="AMEX"?"#06b6d4":a==="CASH"?"#22c55e":"#3b82f6",fontSize:10,fontWeight:700}}>{a} ACCOUNT</div>
          <div style={{color:bankBals[a]>=0?"#10b981":"#ef4444",fontSize:22,fontWeight:800,fontFamily:"monospace"}}>{FX(bankBals[a])}</div>
          <div style={{color:"#a1a1aa",fontSize:9}}>{bankTxns.filter(t=>t.acct===a).length} transactions</div>
        </div>))}
      </div>
      <div style={{...cr,padding:"16px",marginBottom:12}}>
        <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:10}}>NEW TRANSACTION</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <div><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>ACCOUNT</div><select value={bkAcct} onChange={e=>sBkAcct(e.target.value)} style={{...is,width:"100%"}}>{accts.map(a=>(<option key={a} value={a}>{a}</option>))}</select></div>
          <div><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>DATE</div><input type="date" value={bkDt} onChange={e=>sBkDt(e.target.value)} style={{...is,width:"100%",colorScheme:"dark"}}/></div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:10}}>{["deposit","withdrawal"].map(t=>(<button key={t} onClick={()=>sBkType(t)} style={{...bt(bkType===t),flex:1,padding:"8px",color:bkType===t?(t==="deposit"?"#10b981":"#ef4444"):"#555",borderColor:bkType===t?(t==="deposit"?"#10b98140":"#ef444440"):"rgba(63,63,70,.7)"}}>{t==="deposit"?"⬆ Deposit":"⬇ Withdrawal"}</button>))}</div>
        {/* Bill Calculator */}
        {bkType==="deposit"&&(()=>{
          const bills=[{l:"$100",v:100},{l:"$50",v:50},{l:"$20",v:20},{l:"$10",v:10},{l:"$5",v:5},{l:"$2",v:2},{l:"$1",v:1},{l:"25¢",v:0.25},{l:"10¢",v:0.10},{l:"5¢",v:0.05},{l:"1¢",v:0.01}];
          return(<div style={{background:"rgba(34,197,94,.05)",border:"1px solid #22c55e20",borderRadius:8,padding:"10px 12px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{color:"#22c55e",fontSize:9,fontWeight:700}}>💵 BILL COUNTER</span>
              <button onClick={()=>{bills.forEach(b=>{const el=document.getElementById(`bill-${b.v}`);if(el)el.value="";});sBkAmt("");}} style={{padding:"2px 8px",borderRadius:4,border:"1px solid #3f3f46",background:"transparent",color:"#71717a",cursor:"pointer",fontSize:8}}>Clear</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}}>
              {bills.map(b=>(<div key={b.v} style={{display:"flex",alignItems:"center",gap:3}}>
                <span style={{color:"#22c55e",fontSize:9,fontWeight:600,minWidth:28}}>{b.l}</span>
                <span style={{color:"#52525b",fontSize:9}}>×</span>
                <input id={`bill-${b.v}`} type="number" min="0" placeholder="0" onChange={()=>{
                  let total=0;bills.forEach(bi=>{const el=document.getElementById(`bill-${bi.v}`);const ct=parseInt(el?.value)||0;total+=ct*bi.v;});
                  sBkAmt(total>0?total.toFixed(2):"");
                }} style={{...is,width:"100%",padding:"3px 5px",fontSize:11,textAlign:"center"}}/>
              </div>))}
            </div>
            {bkAmt&&parseFloat(bkAmt)>0&&<div style={{marginTop:6,textAlign:"center",color:"#22c55e",fontSize:14,fontWeight:800,fontFamily:"monospace"}}>{FX(parseFloat(bkAmt))}</div>}
          </div>);
        })()}
        <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
          <div style={{width:100}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>AMOUNT</div><input type="number" value={bkAmt} onChange={e=>sBkAmt(e.target.value)} placeholder="$" onKeyDown={e=>e.key==="Enter"&&addBankTxn()} style={{...is,width:"100%",padding:"8px",fontSize:13}}/></div>
          <div style={{flex:1}}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>NOTE</div><input value={bkNote} onChange={e=>sBkNote(e.target.value)} placeholder="e.g. Deposit, Rent, Restock" style={{...is,width:"100%",padding:"8px",fontSize:12}}/></div>
          <button onClick={addBankTxn} style={{padding:"8px 16px",borderRadius:6,border:"none",background:bkType==="deposit"?"#10b981":"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:12,fontWeight:700}}>{bkType==="deposit"?"+ Dep":"- Wtd"}</button>
        </div>
      </div>
      {acctTxns.length>0&&<div style={{...cr,overflow:"hidden",padding:0}}>
        <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(63,63,70,.5)",display:"flex",justifyContent:"space-between"}}>
          <span style={{color:bkAcct==="AMEX"?"#06b6d4":bkAcct==="CASH"?"#22c55e":"#3b82f6",fontSize:11,fontWeight:700}}>{bkAcct} HISTORY</span>
          <span style={{color:"#71717a",fontSize:10}}>{acctTxns.length} txns</span>
        </div>
        <div style={{maxHeight:300,overflowY:"auto"}}>
          {acctTxns.map(t=>(<div key={t.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",borderBottom:"1px solid rgba(63,63,70,.3)"}}>
            <span style={{color:t.type==="deposit"?"#10b981":"#ef4444",fontSize:10,fontWeight:700,minWidth:16}}>{t.type==="deposit"?"⬆":"⬇"}</span>
            <span style={{color:t.type==="deposit"?"#10b981":"#ef4444",fontFamily:"monospace",fontSize:11,fontWeight:700,minWidth:55}}>{t.type==="deposit"?"+":"-"}{FX(t.amt)}</span>
            <span style={{color:"#a1a1aa",fontSize:9,flex:1}}>{t.note||"—"}</span>
            <span style={{color:"#a1a1aa",fontSize:9}}>{SD(t.d)}</span>
            <button onClick={()=>delBankTxn(t.id)} style={{background:"transparent",border:"none",color:"#52525b",cursor:"pointer",fontSize:12}}>×</button>
          </div>))}
        </div>
      </div>}
      {acctTxns.length===0&&<div style={{textAlign:"center",padding:"20px",color:"#52525b",fontSize:12}}>No {bkAcct} transactions yet</div>}
    </div>);
  })()}
  
  {sec==="sync"&&<div style={{...cr,padding:"20px"}}>
    <div style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:14}}>🔄 SYNC BETWEEN DEVICES</div>
    <div style={{color:"#52525b",fontSize:9,marginBottom:16}}>Export all data from one device, then import on the other to sync.</div>
    <div style={{marginBottom:20}}>
      <div style={{color:"#10b981",fontSize:10,fontWeight:700,marginBottom:8}}>EXPORT</div>
      <button onClick={()=>{
        const data={entries,bankTxns,pplInfo,exported:new Date().toISOString()};
        const json=JSON.stringify(data);
        const ta=document.getElementById("ub-export-ta");
        if(ta){ta.value=json;ta.style.display="block";ta.focus();ta.select();try{document.execCommand("copy");tw("✓ Copied! If not, manually select all + copy from box below.");}catch(e){tw("Select all text in box below and copy manually");}}
      }} style={{width:"100%",padding:"12px",borderRadius:8,border:"1px solid #10b98140",background:"rgba(16,185,129,.1)",color:"#10b981",cursor:"pointer",fontSize:12,fontWeight:700,marginBottom:6}}>📋 Copy All Data to Clipboard</button>
      <textarea id="ub-export-ta" readOnly style={{display:"none",width:"100%",height:120,padding:8,borderRadius:6,border:"1px solid #3f3f46",background:"#27272a",color:"#fafafa",fontSize:7,fontFamily:"monospace",marginBottom:6}} onFocus={e=>e.target.select()}/>
      <div style={{color:"#52525b",fontSize:8}}>Copies {entries.length} entries, {bankTxns.length} bank txns, and people info</div>
    </div>
    <div>
      <div style={{color:"#3b82f6",fontSize:10,fontWeight:700,marginBottom:8}}>IMPORT</div>
      <textarea id="syncImport" rows={4} placeholder="Paste exported data here..." style={{...is,width:"100%",padding:"8px",fontSize:10,resize:"vertical",fontFamily:"monospace",marginBottom:8}}/>
      <button onClick={()=>{
        try{
          const raw=document.getElementById("syncImport").value.trim();
          if(!raw){tw("⚠ Paste data first");return;}
          const data=JSON.parse(raw);
          if(!data.entries||!Array.isArray(data.entries)){tw("⚠ Invalid data");return;}
          const count=data.entries.length;
          if(!confirm(`Import ${count} entries, ${(data.bankTxns||[]).length} bank txns, and people info? This will REPLACE all current data.`))return;
          sE(data.entries);sv(data.entries);
          if(data.bankTxns){sBankTxns(data.bankTxns);svBank(data.bankTxns);}
          if(data.pplInfo){sPplInfo(data.pplInfo);svPpl(data.pplInfo);}
          document.getElementById("syncImport").value="";
          tw(`✓ Imported ${count} entries`);
        }catch(e){tw("⚠ Invalid JSON: "+e.message);}
      }} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:"#3b82f6",color:"#fafafa",cursor:"pointer",fontSize:12,fontWeight:700,marginBottom:6}}>📥 Import & Replace Data</button>
      <div style={{color:"#ef4444",fontSize:8}}>⚠ This replaces ALL existing data on this device</div>
    </div>
  </div>}
  {sec==="log"&&(()=>{
    const qRaw=logQ.trim();
    const isExact=qRaw.startsWith('"')&&qRaw.endsWith('"')&&qRaw.length>1;
    const q=isExact?qRaw.slice(1,-1).toLowerCase():qRaw.toLowerCase();
    const qWords=isExact?null:q.split(/\s+/).filter(Boolean);
    const matchQ=(e)=>{const hay=[(e.r||""),(e.p||""),(e.ord||""),(e.io||""),String(e.a)].join(" ").toLowerCase();if(isExact)return hay.includes(q);return qWords.every(w=>hay.includes(w));};
    const filtered=entries.filter(e=>{
      if(logCh!=="all"&&!(e.c===logCh||(logCh==="square"&&e.src==="square")))return false;
      if(logP!=="all"&&e.p!==logP)return false;
      if(logIO==="in"&&!(e.io==="IN"||e.io==="CONSIGNMENT"||e.io==="TRADE_IN"||e.io==="XFER_IN"))return false;
      if(logIO==="out"&&(e.io==="IN"||e.io==="CONSIGNMENT"||e.io==="TRADE_IN"||e.io==="XFER_IN"||e.io==="REFUND"))return false;
      if(logIO==="refund"&&e.io!=="REFUND")return false;
      if(logDF&&e.d<logDF)return false;
      if(logDT&&e.d>logDT)return false;
      if(q&&!matchQ(e))return false;
      return true;});
    const fTotal=filtered.reduce((s,e)=>s+e.a,0);
    const logPeople=[...new Set(entries.map(e=>e.p))].sort();
    return(<div style={{...cr,overflow:"hidden",padding:0}}>
      <div style={{padding:"10px 14px",borderBottom:"1px solid rgba(63,63,70,.5)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{color:"#71717a",fontSize:10,fontWeight:600}}>{filtered.length} of {entries.length} ENTRIES</span>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{color:AC,fontFamily:"monospace",fontSize:11,fontWeight:700}}>{FF(fTotal)}</span>
            {!viewOnly&&<button onClick={()=>{sLogSelMode(!logSelMode);sLogSel(new Set());}} style={{padding:"3px 8px",borderRadius:4,border:"1px solid #3f3f46",background:logSelMode?"rgba(239,68,68,.1)":"transparent",color:logSelMode?"#ef4444":"#555",cursor:"pointer",fontSize:9,fontWeight:600}}>{logSelMode?"Cancel":"Select"}</button>}
          </div>
        </div>
        <div style={{position:"relative",marginBottom:8}}>
          <input value={logQ} onChange={e=>sLogQ(e.target.value)} placeholder="Search orders, items, people..." style={{...is,width:"100%",padding:"6px 28px 6px 8px",fontSize:11}}/>
          {logQ&&<button onClick={()=>sLogQ("")} style={{position:"absolute",right:6,top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"#71717a",cursor:"pointer",fontSize:11}}>×</button>}
        </div>
        {logQ.startsWith("#")&&entries.some(e=>e.ord===logQ&&e.io!=="REFUND")&&<button onClick={()=>{refundByOrder(logQ);sLogQ("");}} style={{width:"100%",padding:"6px",borderRadius:6,border:"1px solid #dc262640",background:"rgba(220,38,38,.1)",color:"#dc2626",cursor:"pointer",fontSize:10,fontWeight:700,marginBottom:8}}>🔴 Refund Order {logQ} ({entries.filter(e=>e.ord===logQ&&e.io!=="REFUND").length} entries)</button>}
        {lastRefund&&<button onClick={undoRefund} style={{width:"100%",padding:"6px",borderRadius:6,border:`1px solid ${AC}40`,background:`${AC}18`,color:AC,cursor:"pointer",fontSize:10,fontWeight:700,marginBottom:8}}>↩ Undo Last Refund ({lastRefund.ids.length} entries)</button>}
        {logSelMode&&<div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
          <button onClick={()=>{const ids=new Set([...filtered].reverse().slice(0,100).map(e=>e.id));sLogSel(ids);}} style={{padding:"3px 8px",borderRadius:4,border:"none",background:"rgba(63,63,70,.7)",color:"#a1a1aa",cursor:"pointer",fontSize:9,fontWeight:600}}>Select All ({Math.min(filtered.length,100)})</button>
          <button onClick={()=>sLogSel(new Set())} style={{padding:"3px 8px",borderRadius:4,border:"none",background:"rgba(63,63,70,.7)",color:"#a1a1aa",cursor:"pointer",fontSize:9,fontWeight:600}}>Deselect</button>
          {logSel.size>0&&<button onClick={()=>{const ne=entries.filter(x=>!logSel.has(x.id));sE(ne);sv(ne);
            const nd={...S_ALL},nc={...S_C_NET};ne.forEach(e=>{if(e.io==="IN"||e.io==="CONSIGNMENT"){if(!nd[e.d])nd[e.d]={};nd[e.d][e.p]=(nd[e.d][e.p]||0)+e.a;if(!nc[e.d])nc[e.d]={};nc[e.d][e.c]=(nc[e.d][e.c]||0)+e.a;}});
            sDD({...nd});sCD({...nc});tw(`✓ Deleted ${logSel.size} entries`);sLogSel(new Set());sLogSelMode(false);}} style={{padding:"3px 10px",borderRadius:4,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:9,fontWeight:700}}>Delete {logSel.size} selected</button>}
        </div>}
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
          {["all","shopify","square","cash","amex"].map(k=>(<button key={k} onClick={()=>sLogCh(k)} style={{padding:"3px 8px",borderRadius:4,border:"none",background:logCh===k?"#3f3f46":"transparent",color:logCh===k?(k==="all"?"#fff":CC[k]):"#444",cursor:"pointer",fontSize:9,fontWeight:600}}>{k==="all"?"All":CL[k]}</button>))}
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
          <button onClick={()=>sLogP("all")} style={{padding:"3px 8px",borderRadius:4,border:"none",background:logP==="all"?"#3f3f46":"transparent",color:logP==="all"?"#fff":"#444",cursor:"pointer",fontSize:9,fontWeight:600}}>All</button>
          {logPeople.map(p=>(<button key={p} onClick={()=>sLogP(p)} style={{padding:"3px 8px",borderRadius:4,border:"none",background:logP===p?`${CO[p]}20`:"transparent",color:logP===p?CO[p]:"#444",cursor:"pointer",fontSize:9,fontWeight:600}}>{p}</button>))}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {["all","in","out","refund"].map(k=>(<button key={k} onClick={()=>sLogIO(k)} style={{padding:"3px 8px",borderRadius:4,border:"none",background:logIO===k?"#3f3f46":"transparent",color:logIO===k?(k==="in"?"#22c55e":k==="out"?"#ef4444":k==="refund"?"#dc2626":"#fff"):"#444",cursor:"pointer",fontSize:9,fontWeight:600}}>{k==="all"?"All":k==="in"?"⬆ In":k==="out"?"⬇ Out":"🔴 Refund"}</button>))}
          <div style={{flex:1}}/>
          <input type="date" value={logDF} onChange={e=>sLogDF(e.target.value)} style={{...is,fontSize:9,padding:"3px 6px",colorScheme:"dark",width:110}}/><span style={{color:"#52525b",fontSize:9}}>→</span><input type="date" value={logDT} onChange={e=>sLogDT(e.target.value)} style={{...is,fontSize:9,padding:"3px 6px",colorScheme:"dark",width:110}}/>
          {(logDF||logDT)&&<button onClick={()=>{sLogDF("");sLogDT("");}} style={{background:"transparent",border:"none",color:"#a1a1aa",cursor:"pointer",fontSize:10}}>✕</button>}
          <button onClick={()=>sLogSort(s=>s==="newest"?"oldest":s==="oldest"?"dateNew":s==="dateNew"?"dateOld":s==="dateOld"?"high":"high"===s?"low":"newest")} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${T.border}`,background:"rgba(63,63,70,.3)",color:"#a1a1aa",cursor:"pointer",fontSize:9,fontWeight:600,whiteSpace:"nowrap"}}>{logSort==="newest"?"⬇ Newest":logSort==="oldest"?"⬆ Oldest":logSort==="dateNew"?"⬇ Date New":logSort==="dateOld"?"⬆ Date Old":logSort==="high"?"⬇ $High":"⬆ $Low"}</button>
        </div>
      </div>
      <div style={{maxHeight:400,overflowY:"auto"}}>
        {(()=>{
          const sorted=logSort==="newest"?[...filtered].reverse():logSort==="oldest"?[...filtered]:logSort==="dateNew"?[...filtered].sort((a,b)=>b.d>a.d?1:b.d<a.d?-1:0):logSort==="dateOld"?[...filtered].sort((a,b)=>a.d>b.d?1:a.d<b.d?-1:0):logSort==="high"?[...filtered].sort((a,b)=>b.a-a.a):[...filtered].sort((a,b)=>a.a-b.a);
          const rev=sorted.slice(0,200);
          // Build groups: cart orders by grp, shopify/square by day, others standalone
          const groups=[];const seen=new Set();
          rev.forEach(e=>{
            if(seen.has(e.id))return;
            // Cart order group (new entries with grp field)
            if(e.grp){const siblings=rev.filter(x=>x.grp===e.grp);siblings.forEach(x=>seen.add(x.id));
              groups.push({type:"cart",key:e.grp,ch:e.c,d:e.d,entries:siblings,total:siblings.reduce((s,x)=>s+x.a,0)});
            // Old cart entries with cartItems but no grp - also group by ordId
            } else if(e.ordId){const siblings=rev.filter(x=>x.ordId===e.ordId&&!seen.has(x.id));siblings.forEach(x=>seen.add(x.id));
              groups.push({type:"cart",key:e.ordId,ch:e.c,d:e.d,entries:siblings,total:siblings.reduce((s,x)=>s+x.a,0)});
            // Shopify/Square import group by day — include all channels from same day (cash splits etc)
            } else if((e.c==="shopify"||e.c==="square"||e.src==="square")&&e.ord){
              const dayKey=`imp-${e.d}`;const siblings=rev.filter(x=>!x.grp&&!x.ordId&&x.d===e.d&&x.ord&&!seen.has(x.id));
              if(siblings.length>1){siblings.forEach(x=>seen.add(x.id));
                groups.push({type:"import",key:dayKey,ch:"multi",d:e.d,entries:siblings,total:siblings.reduce((s,x)=>{const isI=x.io==="IN"||x.io==="CONSIGNMENT";return s+(isI?x.a:0);},0)});
              } else {seen.add(e.id);groups.push({type:"single",key:e.id,entries:[e]});}
            } else {seen.add(e.id);groups.push({type:"single",key:e.id,entries:[e]});}
          });
          return groups.map((g,gi)=>{
            if(g.type==="single"){
              const e=g.entries[0];const isIn=e.io==="IN"||e.io==="CONSIGNMENT"||e.io==="TRADE_IN"||e.io==="XFER_IN";const sel=logSel.has(e.id);
              const itemText=e.cartItems?e.cartItems.map(ci=>`${ci.name} x${ci.qty}`).join(", "):e.r;
              return(<div key={e.id} onClick={logSelMode?()=>sLogSel(s=>{const n=new Set(s);n.has(e.id)?n.delete(e.id):n.add(e.id);return n;}):undefined} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",borderBottom:"1px solid rgba(63,63,70,.3)",background:sel?"rgba(239,68,68,.08)":"transparent",cursor:logSelMode?"pointer":"default",flexWrap:"wrap"}}>
                {logSelMode&&<div style={{width:16,height:16,borderRadius:4,border:`2px solid ${sel?"#ef4444":"#333"}`,background:sel?"#ef4444":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<span style={{color:"#fafafa",fontSize:10,fontWeight:900}}>✓</span>}</div>}
                <span style={{color:e.src==="square"?CC.square:CC[e.c],fontSize:8,fontWeight:700}}>{e.src==="square"?"SQ":CL[e.c]}</span>
                <div style={{width:5,height:5,borderRadius:"50%",background:CO[e.p]}}/><span style={{color:CO[e.p],fontSize:10,fontWeight:600}}>{e.p}</span>
                <span style={{color:isIn?"#22c55e":"#ef4444",fontSize:8,fontWeight:600}}>{e.io}</span>
                <span style={{color:isIn?"#22c55e":"#ef4444",fontFamily:"monospace",fontSize:10,fontWeight:700}}>{isIn?"+":"-"}{FX(e.a)}</span>
                {e.ord&&<span style={{color:"#06b6d4",fontSize:8,fontWeight:600}}>{e.ord}</span>}
                <span style={{flex:1}}/>
                <span style={{color:"#a1a1aa",fontSize:9}}>{SD(e.d)}</span>
                {!viewOnly&&!logSelMode&&(confirmDel===e.id?<div style={{display:"flex",gap:4}}>
                  <button onClick={()=>{delE(e.id);sConfirmDel(null);}} style={{padding:"2px 8px",borderRadius:4,border:"none",background:"#ef4444",color:"#fafafa",cursor:"pointer",fontSize:9,fontWeight:700}}>Delete</button>
                  <button onClick={()=>sConfirmDel(null)} style={{padding:"2px 6px",borderRadius:4,border:"1px solid #3f3f46",background:"transparent",color:"#a1a1aa",cursor:"pointer",fontSize:9}}>Cancel</button>
                </div>:<button onClick={()=>sConfirmDel(e.id)} style={{background:"transparent",border:"none",color:"#52525b",cursor:"pointer",fontSize:12}} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color="#333"}>×</button>)}
                {itemText&&<div style={{width:"100%",paddingLeft:2}}><span style={{color:"#71717a",fontSize:8}}>{itemText}</span></div>}
                <div style={{width:"100%",paddingLeft:2,marginTop:3,display:"flex",alignItems:"center",gap:6}}>
                  {e.img&&<img src={e.img} onClick={ev=>{ev.stopPropagation();sViewImg(e.img);}} style={{height:40,borderRadius:4,cursor:"pointer",border:"1px solid #3f3f46"}}/>}
                  {!viewOnly&&!logSelMode&&<label onClick={ev=>ev.stopPropagation()} style={{color:"#52525b",cursor:"pointer",fontSize:9,display:"inline-flex",alignItems:"center",gap:2}}>📷 {e.img?"change":"add"}<input type="file" accept="image/*" onChange={ev=>{const f=ev.target.files[0];if(f)addImgToEntry(e.id,f);ev.target.value="";}} style={{display:"none"}}/></label>}
                </div>
              </div>);
            }
            // Grouped row (cart or import)
            const isExp=logExp.has(g.key);const people=[...new Set(g.entries.map(e=>e.p))];
            const allSel=g.entries.every(e=>logSel.has(e.id));
            const itemSummary=g.type==="cart"?g.entries.map(e=>e.r).filter(Boolean).join(" · "):"";
            const channels=g.type==="import"?[...new Set(g.entries.map(e=>e.src==="square"?"square":e.c))]:[];
            return(<div key={g.key}>
              <div onClick={logSelMode?()=>{sLogSel(s=>{const n=new Set(s);g.entries.forEach(e=>{allSel?n.delete(e.id):n.add(e.id);});return n;});}:()=>sLogExp(s=>{const n=new Set(s);n.has(g.key)?n.delete(g.key):n.add(g.key);return n;})} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderBottom:isExp?"none":"1px solid rgba(63,63,70,.3)",background:allSel&&logSelMode?"rgba(239,68,68,.08)":"rgba(63,63,70,.15)",cursor:"pointer",flexWrap:"wrap"}}>
                {logSelMode&&<div style={{width:16,height:16,borderRadius:4,border:`2px solid ${allSel?"#ef4444":"#52525b"}`,background:allSel?"#ef4444":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{allSel&&<span style={{color:"#fafafa",fontSize:10,fontWeight:900}}>✓</span>}</div>}
                <span style={{color:isExp?AC:T.muted,fontSize:10,transition:"transform 0.15s",transform:isExp?"rotate(90deg)":"none",display:"inline-block"}}>▶</span>
                {g.type==="import"?<div style={{display:"flex",gap:3}}>{channels.map(ch=>(<span key={ch} style={{color:CC[ch]||"#a1a1aa",fontSize:8,fontWeight:700}}>{CL[ch]}</span>))}</div>
                :<span style={{color:CC[g.ch]||"#a1a1aa",fontSize:8,fontWeight:700}}>{CL[g.ch]||"Cash"}</span>}
                <div style={{display:"flex",gap:3,alignItems:"center"}}>{people.slice(0,4).map(p=>(<div key={p} style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:5,height:5,borderRadius:"50%",background:CO[p]}}/><span style={{color:CO[p],fontSize:9,fontWeight:600}}>{p}</span></div>))}{people.length>4&&<span style={{color:"#71717a",fontSize:8}}>+{people.length-4}</span>}</div>
                <span style={{color:"#22c55e",fontFamily:"monospace",fontSize:10,fontWeight:700}}>{FX(g.total)}</span>
                <span style={{color:"#a1a1aa",fontSize:8,background:"rgba(63,63,70,.5)",padding:"1px 6px",borderRadius:4}}>{g.entries.length}</span>
                <span style={{color:"#a1a1aa",fontSize:9}}>{SD(g.d)}</span>
                {g.entries[0]?.ord&&g.entries[0].io!=="REFUND"&&!logSelMode&&<button onClick={ev=>{ev.stopPropagation();refundEntries(g.entries.map(e=>e.id));}} style={{padding:"1px 6px",borderRadius:3,border:"1px solid #dc262640",background:"rgba(220,38,38,.1)",color:"#dc2626",cursor:"pointer",fontSize:7,fontWeight:600,whiteSpace:"nowrap"}}>🔴 Refund</button>}
                {g.entries[0]?.io==="REFUND"&&<span style={{padding:"1px 6px",borderRadius:3,background:"rgba(220,38,38,.15)",color:"#dc2626",fontSize:7,fontWeight:700}}>REFUNDED</span>}
                {itemSummary&&<div style={{width:"100%",paddingLeft:20,marginTop:2}}><span style={{color:"#71717a",fontSize:8}}>{itemSummary}</span></div>}
                {(()=>{const img=g.entries.find(e=>e.img)?.img;const grpKey=g.type==="cart"?g.key:null;return(<div style={{width:"100%",paddingLeft:20,marginTop:3,display:"flex",alignItems:"center",gap:6}}>
                  {img&&<img src={img} onClick={ev=>{ev.stopPropagation();sViewImg(img);}} style={{height:40,borderRadius:4,cursor:"pointer",border:"1px solid #3f3f46"}}/>}
                  {!viewOnly&&!logSelMode&&grpKey&&<label onClick={ev=>ev.stopPropagation()} style={{color:"#52525b",cursor:"pointer",fontSize:9,display:"inline-flex",alignItems:"center",gap:2}}>📷 {img?"change":"add"}<input type="file" accept="image/*" onChange={ev=>{const f=ev.target.files[0];if(f)addImgToGroup(grpKey,f);ev.target.value="";}} style={{display:"none"}}/></label>}
                </div>);})()}
              </div>
              {isExp&&<div style={{borderBottom:"1px solid rgba(63,63,70,.3)"}}>
                {g.entries.map(e=>{const isIn=e.io==="IN"||e.io==="CONSIGNMENT"||e.io==="TRADE_IN"||e.io==="XFER_IN";const sel=logSel.has(e.id);
                return(<div key={e.id} onClick={logSelMode?ev=>{ev.stopPropagation();sLogSel(s=>{const n=new Set(s);n.has(e.id)?n.delete(e.id):n.add(e.id);return n;});}:undefined} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 14px 5px 30px",borderBottom:"1px solid rgba(63,63,70,.15)",background:sel?"rgba(239,68,68,.05)":"transparent",cursor:logSelMode?"pointer":"default",fontSize:9,flexWrap:"wrap"}}>
                  {logSelMode&&<div style={{width:12,height:12,borderRadius:3,border:`1.5px solid ${sel?"#ef4444":"#52525b"}`,background:sel?"#ef4444":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{sel&&<span style={{color:"#fafafa",fontSize:7,fontWeight:900}}>✓</span>}</div>}
                  {g.type==="import"&&<span style={{color:e.src==="square"?CC.square:(CC[e.c]||"#71717a"),fontSize:7,fontWeight:700,minWidth:28}}>{e.src==="square"?"SQ":CL[e.c]}</span>}
                  <div style={{width:4,height:4,borderRadius:"50%",background:CO[e.p]}}/><span style={{color:CO[e.p],fontWeight:600,minWidth:42}}>{e.p}</span>
                  <span style={{color:e.io==="REFUND"?"#dc2626":isIn?"#22c55e":"#ef4444",fontWeight:600,fontSize:7,minWidth:16}}>{e.io}</span>
                  <span style={{color:e.io==="REFUND"?"#dc2626":isIn?"#22c55e":"#ef4444",fontFamily:"monospace",fontWeight:700,minWidth:40,textAlign:"right"}}>{e.io==="REFUND"?"⤺":isIn?"+":"-"}{FX(e.a)}</span>
                  {e.ord&&<span style={{color:"#06b6d4",fontSize:7,fontWeight:600}}>{e.ord}</span>}
                  {e.r&&<span style={{color:"#a1a1aa",flex:1,fontSize:8}}>{e.r}</span>}
                  {!e.r&&<span style={{flex:1}}/>}
                  {!logSelMode&&<button onClick={ev=>{ev.stopPropagation();if(confirmDel===e.id){delE(e.id);sConfirmDel(null);}else{sConfirmDel(e.id);}}} style={{background:"transparent",border:"none",color:confirmDel===e.id?"#ef4444":"#52525b",cursor:"pointer",fontSize:10}}>{confirmDel===e.id?"✓ Del":"×"}</button>}
                </div>);})}
              </div>}
            </div>);
          });
        })()}
      </div>
    </div>);
  })()}
</>}

{/* ===== PEOPLE ===== */}
{tab==="people"&&<>
  <div style={{display:"flex",gap:6,marginBottom:14}}>{[["directory","👥 Directory"],["staff","🏪 Staff Analytics"]].map(([k,l])=>(<button key={k} onClick={()=>{sPplTab(k);if(k==="directory")sSelPerson(null);}} style={bt(pplTab===k)}>{l}</button>))}</div>

  {pplTab==="staff"&&<>
  <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
    {STF.filter(s=>stfTot[s].o>0).sort((a,b)=>stfTot[b].o-stfTot[a].o).map(s=>{const t=stfTot[s];
      return(<div key={s} onClick={()=>sSTP(stfP===s?null:s)} style={{...cr,borderLeft:`3px solid ${CO[s]||"#555"}`,cursor:"pointer",background:stfP===s?"rgba(63,63,70,.7)":"rgba(63,63,70,.4)"}}>
        <div style={{color:CO[s]||"#999",fontSize:12,fontWeight:700}}>{s}</div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          <div><div style={{color:"#71717a",fontSize:9}}>SALES</div><div style={{color:"#fafafa",fontSize:16,fontWeight:800,fontFamily:"monospace"}}>{t.o}</div></div>
          <div style={{textAlign:"right"}}><div style={{color:"#71717a",fontSize:9}}>MADE</div><div style={{color:"#22c55e",fontSize:12,fontWeight:800,fontFamily:"monospace"}}>{F(t.a||0)}</div></div>
        </div>
        {t.h&&<div style={{fontSize:10,color:"#a1a1aa",marginTop:3}}>{t.h}hrs · {(t.o/t.h).toFixed(1)}/hr · {FF(Math.round((t.a||0)/t.h))}/hr</div>}
        <div style={{fontSize:10,color:"#a1a1aa",marginTop:1}}>~{FX(t.po||0)}/order</div>
      </div>)})}
  </div>
  {stfP&&<button onClick={()=>sSTP(null)} style={{marginBottom:10,padding:"4px 14px",borderRadius:6,border:"1px solid #ef444430",background:"transparent",color:"#ef4444",cursor:"pointer",fontSize:11}}>✕ Clear {stfP}</button>}
  <div style={{...cr,marginBottom:10,padding:"12px 16px"}}><div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600}}>RANGE</span>{[{l:"All",f:"2026-01-01",t:TODAY},{l:"Feb",f:"2026-02-01",t:TODAY},{l:"Jan",f:"2026-01-01",t:"2026-01-31"},{l:"14d",f:daysAgo(14),t:TODAY}].map(p=>(<button key={p.l} onClick={()=>{sSDF(p.f);sSDT(p.t);}} style={bt(sdf===p.f&&sdt===p.t)}>{p.l}</button>))}<input type="date" value={sdf} onChange={e=>sSDF(e.target.value)} style={{...is,fontSize:11,padding:"4px 8px",colorScheme:"dark"}}/><span style={{color:"#a1a1aa"}}>→</span><input type="date" value={sdt} onChange={e=>sSDT(e.target.value)} style={{...is,fontSize:11,padding:"4px 8px",colorScheme:"dark"}}/></div></div>
  <div style={{...cr,marginBottom:4,padding:"10px 16px"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>{stfP||"ALL STAFF"} — DAILY SALES</span></div>
  <div style={sx}><ResponsiveContainer width="100%" height={260}>
    <BarChart data={stfD} barCategoryGap="10%"><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={iv2}/><YAxis tick={{fill:"#444",fontSize:10}} axisLine={false} tickLine={false} width={30}/><Tooltip content={<TT/>}/>
      {stfP?<Bar dataKey={stfP} fill={CO[stfP]||"#888"} radius={[2,2,0,0]} maxBarSize={16}/>
      :STF.filter(s=>stfTot[s].o>0).sort((a,b)=>stfTot[b].o-stfTot[a].o).slice(0,8).map(s=>(<Bar key={s} dataKey={s} fill={CO[s]||"#888"} stackId="s"/>))}
    </BarChart></ResponsiveContainer></div>
  <div style={{...cr,marginTop:12,marginBottom:4,padding:"10px 16px"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>CUMULATIVE ORDERS</span></div>
  <div style={sx}><ResponsiveContainer width="100%" height={230}>
    <AreaChart data={stfCum}><defs>{STF.filter(s=>stfTot[s].o>0).map(s=>(<linearGradient key={s} id={`gs-${s}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CO[s]||"#888"} stopOpacity={.15}/><stop offset="100%" stopColor={CO[s]||"#888"} stopOpacity={0}/></linearGradient>))}</defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={iv2}/><YAxis tick={{fill:"#444",fontSize:10}} axisLine={false} tickLine={false} width={35}/><Tooltip content={<TT/>}/>
      {(stfP?[stfP]:STF.filter(s=>stfTot[s].o>0).sort((a,b)=>stfTot[b].o-stfTot[a].o).slice(0,6)).map(s=>(<Area key={s} type="monotone" dataKey={s} stroke={CO[s]||"#888"} fill={`url(#gs-${s})`} strokeWidth={1.5} dot={false}/>))}
    </AreaChart></ResponsiveContainer></div>
  <div style={{...cr,marginTop:14,padding:"14px 16px",marginBottom:4}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{color:"#71717a",fontSize:10,fontWeight:600,letterSpacing:1}}>OVERALL BALANCE — {gV==="cum"?"RUNNING TOTAL":"DAILY"}</span>
      <div style={{display:"flex",gap:6}}>{[["cum","Cumulative"],["daily","Daily"]].map(([k,l])=>(<button key={k} onClick={()=>sGV(k)} style={bt(gV===k)}>{l}</button>))}</div></div>
    <div style={{display:"flex",gap:4,marginTop:8,flexWrap:"wrap"}}>{PP.filter(p=>(lastB[p]||0)>0).sort((a,b)=>(lastB[b]||0)-(lastB[a]||0)).map(p=>(<button key={p} onClick={()=>sGPP(v=>v.includes(p)?v.filter(x=>x!==p):[...v,p])} style={pl(gPP.includes(p),CO[p])}>{p}</button>))}</div>
  </div>
  <div style={sx}><ResponsiveContainer width="100%" height={280}>
    {gV==="cum"?<ComposedChart data={grD}><defs>{gPP.map(p=>(<linearGradient key={p} id={`gg-${p}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={CO[p]} stopOpacity={.15}/><stop offset="100%" stopColor={CO[p]} stopOpacity={0}/></linearGradient>))}</defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={5}/><YAxis tick={{fill:"#444",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={48}/><Tooltip content={<TT/>}/>
      {gPP.map(p=>(<Area key={p} type="monotone" dataKey={p} stroke={CO[p]} fill={`url(#gg-${p})`} strokeWidth={1.5} dot={false}/>))}
    </ComposedChart>
    :<BarChart data={grD} barCategoryGap="15%"><CartesianGrid strokeDasharray="3 3" stroke="rgba(63,63,70,.4)"/><XAxis dataKey="day" tick={{fill:"#666",fontSize:9}} axisLine={false} tickLine={false} interval={5}/><YAxis tick={{fill:"#444",fontSize:10}} axisLine={false} tickLine={false} tickFormatter={F} width={48}/><Tooltip content={<TT/>}/>
      {gPP.map(p=>(<Bar key={p} dataKey={p} fill={CO[p]} stackId="g"/>))}
    </BarChart>}
  </ResponsiveContainer></div>
  </>}

  {pplTab==="directory"&&<>
  {!selPerson&&<div>
    {ROLE_ORDER.map(role=>{
      const members=PP.filter(p=>p!=="SHARED"&&(ROLES[p]||"EMPLOYEE")===role);
      if(members.length===0)return null;
      const totals={};so.forEach(({n,t})=>{totals[n]=t;});
      return(<div key={role} style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
          <span style={{color:ROLE_COLORS[role],fontSize:11,fontWeight:700}}>{ROLE_LABELS[role]}</span>
          <div style={{flex:1,height:1,background:"rgba(63,63,70,.4)"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
          {members.map(p=>{const t=totals[p]||0;return(<div key={p} onClick={()=>sSelPerson(p)} style={{...cr,cursor:"pointer",borderLeft:`3px solid ${CO[p]}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:CO[p]}}/>
                <span style={{color:CO[p],fontSize:12,fontWeight:700}}>{p}</span>
              </div>
              <span style={{color:"#fafafa",fontSize:14,fontWeight:800,fontFamily:"monospace"}}>{F(t)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:6}}>
              <span style={{color:ROLE_COLORS[role],fontSize:8,fontWeight:600,padding:"1px 6px",borderRadius:3,border:`1px solid ${ROLE_COLORS[role]}30`,background:`${ROLE_COLORS[role]}10`}}>{role}</span>
              <div style={{display:"flex",gap:4,alignItems:"center"}}>
                {pplInfo[p]?.email&&<span style={{color:"#52525b",fontSize:8}}>📧</span>}
                <span style={{color:"#52525b",fontSize:9}}>→</span>
              </div>
            </div>
          </div>);})}
        </div>
      </div>);
    })}
  </div>}
  {selPerson&&(()=>{
    const p=selPerson;const info=pplInfo[p]||{};const bal=balances[p]||{cash:0,amex:0,overall:0};
    const isOwner=OWNERS.has(p);const cfg=COMM[p]||DEF_COMM;const role=ROLES[p]||"EMPLOYEE";
    const fields=[
      {k:"phone",l:"📱 Phone",ph:"e.g. 9165551234"},
      {k:"email",l:"📧 Email",ph:"e.g. name@email.com"},
      {k:"address",l:"📍 Address",ph:"e.g. 123 Main St, Sacramento"},
      {k:"venmo",l:"💸 Venmo / CashApp",ph:"e.g. @username"},
      {k:"consignId",l:"🏷 Consignment #",ph:"e.g. 0002"},
      {k:"notes",l:"📝 Notes",ph:"Anything to remember...",multi:true}
    ];
    const updateField=(k,v)=>{const ni={...pplInfo,[p]:{...info,[k]:v}};sPplInfo(ni);svPpl(ni);};
    return(<div>
      <button onClick={()=>sSelPerson(null)} style={{padding:"6px 12px",borderRadius:6,border:"1px solid #3f3f46",background:"transparent",color:"#71717a",cursor:"pointer",fontSize:10,fontWeight:600,marginBottom:12}}>← Back to All</button>
      <div style={{...cr,padding:"18px",borderLeft:`4px solid ${CO[p]}`,marginBottom:12}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,borderRadius:"50%",background:CO[p]}}/><span style={{color:CO[p],fontSize:18,fontWeight:800}}>{p}</span><span style={{color:ROLE_COLORS[role],fontSize:9,fontWeight:600,padding:"2px 8px",borderRadius:4,border:`1px solid ${ROLE_COLORS[role]}30`,background:`${ROLE_COLORS[role]}10`}}>{role}</span></div>
          <button onClick={()=>{s1(p);sSelPerson(null);}} style={{padding:"4px 10px",borderRadius:5,border:"1px solid #3f3f46",background:"transparent",color:"#71717a",cursor:"pointer",fontSize:9}}>View Sales →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
          <div style={{...cr,padding:"10px",textAlign:"center"}}><div style={{color:"#52525b",fontSize:8}}>CASH</div><div style={{color:"#22c55e",fontFamily:"monospace",fontSize:13,fontWeight:700}}>{FX(bal.cash)}</div></div>
          <div style={{...cr,padding:"10px",textAlign:"center"}}><div style={{color:"#52525b",fontSize:8}}>AMEX</div><div style={{color:"#3b82f6",fontFamily:"monospace",fontSize:13,fontWeight:700}}>{FX(bal.amex)}</div></div>
          <div style={{...cr,padding:"10px",textAlign:"center"}}><div style={{color:"#52525b",fontSize:8}}>TOTAL</div><div style={{color:AC,fontFamily:"monospace",fontSize:13,fontWeight:700}}>{FX(bal.overall)}</div></div>
        </div>
        {!isOwner&&<div style={{...cr,padding:"10px",marginBottom:14,border:"1px solid rgba(63,63,70,.5)"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{color:"#71717a",fontSize:10}}>Commission Rate</span><span style={{color:AC,fontFamily:"monospace",fontSize:11,fontWeight:700}}>{(cfg.rate*100).toFixed(0)}%</span></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}><span style={{color:"#71717a",fontSize:10}}>Commission Split</span><span style={{color:"#a1a1aa",fontSize:10}}>{cfg.split==="BOTH"?"AJAY + DEREK":cfg.split}</span></div>
        </div>}
      </div>
      <div style={{...cr,padding:"18px"}}>
        <div style={{color:"#a1a1aa",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:12}}>ℹ️ INFO</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {fields.map(f=>(<div key={f.k}>
            <div style={{color:"#71717a",fontSize:9,fontWeight:600,marginBottom:3}}>{f.l}</div>
            {f.multi?<textarea value={info[f.k]||""} onChange={e=>{if(!viewOnly)updateField(f.k,e.target.value);}} readOnly={viewOnly} placeholder={viewOnly?"":f.ph} rows={3} style={{...is,width:"100%",padding:"6px 8px",fontSize:11,resize:"vertical",fontFamily:"inherit",opacity:viewOnly&&!info[f.k]?0.3:1}}/>
            :<input value={info[f.k]||""} onChange={e=>{if(!viewOnly)updateField(f.k,e.target.value);}} readOnly={viewOnly} placeholder={viewOnly?"":f.ph} style={{...is,width:"100%",padding:"6px 8px",fontSize:11,opacity:viewOnly&&!info[f.k]?0.3:1}}/>}
          </div>))}
        </div>
        {info.email&&<div style={{marginTop:12,display:"flex",gap:6}}>
          <button onClick={()=>window.open(`mailto:${info.email}`)} style={{padding:"6px 12px",borderRadius:5,border:"1px solid #3b82f640",background:"rgba(59,130,246,.1)",color:"#3b82f6",cursor:"pointer",fontSize:9,fontWeight:600}}>📧 Email</button>
        </div>}
        {info.phone&&<div style={{marginTop:8,display:"flex",gap:6}}>
          <button onClick={()=>window.open(`tel:${info.phone}`)} style={{padding:"6px 12px",borderRadius:5,border:"1px solid #22c55e40",background:"rgba(34,197,94,.1)",color:"#22c55e",cursor:"pointer",fontSize:9,fontWeight:600}}>📞 Call</button>
          <button onClick={()=>window.open(`sms:${info.phone}`)} style={{padding:"6px 12px",borderRadius:5,border:"1px solid #22c55e40",background:"rgba(34,197,94,.1)",color:"#22c55e",cursor:"pointer",fontSize:9,fontWeight:600}}>💬 Text</button>
        </div>}
      </div>
    </div>);
  })()}
  </>}
</>}

{tab==="settings"&&(()=>{
  const isElectron=!!window.electronAPI;
  const doBackupDownload=()=>{try{const bk={entries,bankTxns,pplInfo,uiCfg,exportedAt:new Date().toISOString(),version:"1.0"};const blob=new Blob([JSON.stringify(bk,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`unboxed-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(url);}catch(e){}};
  const doRestore=(ev)=>{const file=ev.target.files[0];if(!file)return;const reader=new FileReader();reader.onload=(e)=>{try{const d=JSON.parse(e.target.result);if(d.entries){sE(d.entries);sv(d.entries);}if(d.bankTxns){sBankTxns(d.bankTxns);svBank(d.bankTxns);}if(d.pplInfo){sPplInfo(d.pplInfo);svPpl(d.pplInfo);}if(d.uiCfg){sUiCfg({...UI_DEF,...d.uiCfg});try{localStorage.setItem("ub-ui",JSON.stringify({...UI_DEF,...d.uiCfg}))}catch(x){}}tw("✓ Backup restored — reloading...");setTimeout(()=>window.location.reload(),800);}catch(err){tw("⚠ Invalid backup file");}};reader.readAsText(file);ev.target.value="";};
  const doUpdate=()=>{
    if(!isElectron)return;
    sUpStatus({status:"building",msg:"Building app..."});
    window.electronAPI.updateApp(data=>sUpStatus(data));
  };
  const togStg=k=>sStgExp(s=>{const n=new Set(s);n.has(k)?n.delete(k):n.add(k);return n;});
  const SH=({id,icon,label,children,badge})=>(<div style={{...cr,marginBottom:8,overflow:"hidden"}}>
    <div onClick={()=>togStg(id)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",cursor:"pointer",userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:12}}>{icon}</span>
        <span style={{color:"#a1a1aa",fontSize:10,fontWeight:600,letterSpacing:1}}>{label}</span>
        {badge}
      </div>
      <span style={{color:"#52525b",fontSize:10,transition:"transform .2s",transform:stgExp.has(id)?"rotate(180deg)":"rotate(0)"}}>{"\u25BC"}</span>
    </div>
    {stgExp.has(id)&&<div style={{padding:"0 16px 16px"}}>{children}</div>}
  </div>);
  return(<div style={{maxWidth:480}}>
    <div style={{color:AC,fontSize:10,fontWeight:700,letterSpacing:1.5,marginBottom:16}}>⚙️ SETTINGS</div>
    <SH id="ui" icon="🎨" label="CUSTOMIZE UI">
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>ACCENT COLOR</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {[["#f59e0b","Amber"],["#3b82f6","Blue"],["#10b981","Green"],["#a78bfa","Purple"],["#ef4444","Red"],["#06b6d4","Cyan"]].map(([c,n])=>(<button key={c} onClick={()=>setUI("accent",c)} title={n} style={{width:28,height:28,borderRadius:"50%",border:AC===c?`3px solid ${T.text}`:`2px solid ${T.border}`,background:c,cursor:"pointer",transition:"transform .15s",transform:AC===c?"scale(1.15)":"scale(1)"}}/>))}
          </div>
        </div>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>FONT SIZE</div>
          <div style={{display:"flex",gap:6}}>
            {[["sm","Small"],["md","Medium"],["lg","Large"]].map(([k,l])=>(<button key={k} onClick={()=>setUI("fontSize",k)} style={{padding:"5px 14px",borderRadius:6,border:`1px solid ${uiCfg.fontSize===k?`${AC}40`:T.border}`,background:uiCfg.fontSize===k?`${AC}18`:"transparent",color:uiCfg.fontSize===k?AC:T.subtle,cursor:"pointer",fontSize:11,fontWeight:600}}>{l}</button>))}
          </div>
        </div>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>LAYOUT DENSITY</div>
          <div style={{display:"flex",gap:6}}>
            {[["compact","Compact"],["normal","Normal"],["spacious","Spacious"]].map(([k,l])=>(<button key={k} onClick={()=>setUI("density",k)} style={{padding:"5px 14px",borderRadius:6,border:`1px solid ${uiCfg.density===k?`${AC}40`:T.border}`,background:uiCfg.density===k?`${AC}18`:"transparent",color:uiCfg.density===k?AC:T.subtle,cursor:"pointer",fontSize:11,fontWeight:600}}>{l}</button>))}
          </div>
        </div>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>THEME</div>
          <div style={{display:"flex",gap:6}}>
            {[["dark","Dark"],["light","Light"]].map(([k,l])=>(<button key={k} onClick={()=>setUI("theme",k)} style={{padding:"5px 14px",borderRadius:6,border:`1px solid ${uiCfg.theme===k?`${AC}40`:T.border}`,background:uiCfg.theme===k?`${AC}18`:"transparent",color:uiCfg.theme===k?AC:T.subtle,cursor:"pointer",fontSize:11,fontWeight:600}}>{l}</button>))}
          </div>
        </div>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>TAB POSITION</div>
          <div style={{display:"flex",gap:6}}>
            {[["top","Top"],["bottom","Bottom"],["left","Left Sidebar"]].map(([k,l])=>(<button key={k} onClick={()=>setUI("tabPos",k)} style={{padding:"5px 14px",borderRadius:6,border:`1px solid ${uiCfg.tabPos===k?`${AC}40`:T.border}`,background:uiCfg.tabPos===k?`${AC}18`:"transparent",color:uiCfg.tabPos===k?AC:T.subtle,cursor:"pointer",fontSize:11,fontWeight:600}}>{l}</button>))}
          </div>
        </div>
        <div>
          <div style={{color:T.muted,fontSize:9,fontWeight:600,letterSpacing:1,marginBottom:8}}>VISIBLE SECTIONS</div>
          <div style={{color:T.subtle,fontSize:9,marginBottom:6}}>Uncheck to hide sections</div>
          <div style={{marginBottom:8}}>
            <div style={{color:T.text,fontSize:10,fontWeight:700,marginBottom:4}}>Home</div>
            {[["home.ytd","YTD Revenue"],["home.bank","Bank Accounts"],["home.balances","Account Balances"]].map(([k,l])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,cursor:"pointer",fontSize:10,color:T.subtle}}><input type="checkbox" checked={!uiCfg.hidden?.[k]} onChange={()=>{const h={...(uiCfg.hidden||{})};if(h[k])delete h[k];else h[k]=true;setUI("hidden",h);}} style={{accentColor:AC}}/>{l}</label>))}
          </div>
          <div>
            <div style={{color:T.text,fontSize:10,fontWeight:700,marginBottom:4}}>Analytics</div>
            {[["analytics.daily","Daily"],["analytics.breakdown","Breakdown"],["analytics.channels","Channels"],["analytics.products","Products"],["analytics.consign","Consign"],["analytics.monthly","Monthly"],["analytics.growth","Growth"],["analytics.goal","Goal"]].map(([k,l])=>(<label key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:4,cursor:"pointer",fontSize:10,color:T.subtle}}><input type="checkbox" checked={!uiCfg.hidden?.[k]} onChange={()=>{const h={...(uiCfg.hidden||{})};if(h[k])delete h[k];else h[k]=true;setUI("hidden",h);}} style={{accentColor:AC}}/>{l}</label>))}
          </div>
        </div>
        <button onClick={()=>{sUiCfg({...UI_DEF});try{localStorage.setItem("ub-ui",JSON.stringify(UI_DEF))}catch(e){}}} style={{padding:"6px 14px",borderRadius:6,border:`1px solid ${T.border}`,background:"transparent",color:T.muted,cursor:"pointer",fontSize:10,fontWeight:600,alignSelf:"flex-start"}}>Reset to Defaults</button>
      </div>
    </SH>
    <SH id="app" icon="📱" label="APP" badge={<span style={{color:"#52525b",fontSize:9,fontFamily:"monospace"}}>{__APP_VERSION__}</span>}>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#71717a",fontSize:11}}>Version</span>
          <span style={{color:"#fafafa",fontFamily:"monospace",fontSize:11}}>{__APP_VERSION__}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:"#71717a",fontSize:11}}>Platform</span>
          <span style={{color:"#fafafa",fontFamily:"monospace",fontSize:11}}>{isElectron?"Electron Desktop":"Browser"}</span>
        </div>
        {!viewOnly&&<div style={{borderTop:"1px solid #3f3f46",paddingTop:12,marginTop:2}}>
          <div style={{color:"#a1a1aa",fontSize:10,fontWeight:600,letterSpacing:1,marginBottom:10}}>UPDATE APP</div>
          <div style={{color:"#71717a",fontSize:10,marginBottom:12,lineHeight:1.6}}>Rebuilds the app with the latest code changes. The window will reload automatically when done.</div>
          {isElectron?(
            <div>
              <button onClick={doUpdate} disabled={upStatus?.status==="building"} style={{padding:"8px 20px",borderRadius:7,border:"none",background:upStatus?.status==="building"?"#3f3f46":AC,color:upStatus?.status==="building"?"#71717a":"#000",cursor:upStatus?.status==="building"?"not-allowed":"pointer",fontSize:12,fontWeight:700,marginBottom:upStatus?8:0}}>
                {upStatus?.status==="building"?"⏳ Building...":"🔄 Update App"}
              </button>
              {upStatus&&<div style={{padding:"8px 12px",borderRadius:6,background:upStatus.status==="error"?"rgba(239,68,68,.1)":upStatus.status==="success"?"rgba(16,185,129,.1)":`${AC}14`,border:`1px solid ${upStatus.status==="error"?"#ef444430":upStatus.status==="success"?"#10b98130":"#f59e0b30"}`,color:upStatus.status==="error"?"#ef4444":upStatus.status==="success"?"#10b981":"#f59e0b",fontSize:10,fontFamily:"monospace",wordBreak:"break-word"}}>{upStatus.msg}</div>}
            </div>
          ):(
            <div style={{padding:"10px 14px",borderRadius:6,background:"rgba(63,63,70,.4)",border:"1px solid #3f3f46"}}>
              <div style={{color:"#a1a1aa",fontSize:10,marginBottom:6}}>Run this in your terminal:</div>
              <code style={{color:AC,fontSize:11,display:"block"}}>npm run electron:build</code>
              <div style={{color:"#52525b",fontSize:9,marginTop:6}}>Then reopen the app from <code style={{color:"#71717a"}}>release/win-unpacked/</code></div>
            </div>
          )}
        </div>}
      </div>
    </SH>
    <SH id="log" icon="📋" label="UPDATE LOG">
      {[
        {v:"1.2.0",items:["Consignment # field in People — assign consignment numbers per person","Square import auto-detects owners by consignment number","Manual order form stays visible during pending Square/Shopify imports","Discord order paste import — copy from Discord, edit owners & amounts, then apply","Sort log by date (newest/oldest date) in addition to entry order"]},
        {v:"1.1.0",items:["View-only PIN (0201) for read-only access","Collapsible settings dropdowns","Auto-lock after 5 minutes of inactivity","Backup restore now reloads page so all data appears","Transaction log search by dollar amount","Keyword search in log — searches all words separately, use quotes for exact match","Sort log by newest, oldest, highest $, or lowest $","Customize UI — accent color, font size, density, dark/light theme, tab position, toggle page sections"]},
        {v:"1.0.9",items:["Consigner payout with custom amount — choose how much to pay","Choose payout source — split between cash and amex accounts","Transfer between cash ↔ amex per consigner","Square imports: only assigned items apply, unassigned stay for later","Bank transactions and account balances now show decimals (.00)","Add photos to existing entries from the log","Consigners in Buy/Pull dropdown, split purchases, photo in Buy/Pull"]},
        {v:"1.0.7",items:["Export data as CSV — transactions, account balances, bank transactions, log","Export All button downloads all 4 CSVs at once","Drag-and-drop photo upload for orders & trades","Update log added to Settings"]},
        {v:"1.0.6",items:["Added photo attachment for manual orders & trades","Photos display as thumbnails in log, click to view full-size","Photos included in backup/restore"]},
        {v:"1.0.5",items:["Square imports now go to AMEX account balances","Square imports grouped separately in logs with SQ tag","Added source tracking for Square import entries"]},
        {v:"1.0.4",items:["Added note/description field on Square import items","Notes display in entry labels in the log"]},
        {v:"1.0.3",items:["Auto version increment on each build","Version displayed in Settings","Added Vercel deployment config & cross-device instructions"]},
        {v:"1.0.2",items:["Split option available on all Square orders (not just unknown)","Tax auto-calculated as remainder of total minus person amounts","Editable order amount on Square imports","Main owner dropdown hidden when splits active","Auto-backup every 10 minutes","Backup download & restore buttons in Settings"]},
        {v:"1.0.1",items:["Square CSV import with owner assignment","Shopify CSV import with payment method detection","Commission splits for consigners","Processing fee calculation (2.6% Square, 3% Shopify)"]},
        {v:"1.0.0",items:["Initial release — manual orders, trades, transfers, payouts","Person balances (cash & AMEX)","Daily/cumulative revenue charts","Bank transaction tracking","Log with filtering, grouping, and bulk actions"]},
      ].map(rel=>(
        <div key={rel.v} style={{marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <span style={{color:rel.v===__APP_VERSION__?AC:T.muted,fontFamily:"monospace",fontSize:11,fontWeight:700}}>{rel.v}</span>
            {rel.v===__APP_VERSION__&&<span style={{color:AC,fontSize:8,fontWeight:700,background:`${AC}18`,padding:"1px 6px",borderRadius:4}}>CURRENT</span>}
          </div>
          <div style={{paddingLeft:8,borderLeft:"1px solid #3f3f4640"}}>
            {rel.items.map((it,i)=>(<div key={i} style={{color:"#a1a1aa",fontSize:10,lineHeight:1.7}}>• {it}</div>))}
          </div>
        </div>
      ))}
    </SH>
    {!viewOnly&&<SH id="email" icon="📧" label="EMAIL NOTIFICATIONS" badge={<span style={{color:ejsCfg.serviceId&&ejsCfg.templateId&&ejsCfg.publicKey?"#22c55e":"#ef4444",fontSize:8}}>●</span>}>
      <div style={{color:"#71717a",fontSize:10,marginBottom:12,lineHeight:1.6}}>Auto-send payout confirmation emails to consigners. Sign up at <span style={{color:"#60a5fa"}}>emailjs.com</span> (free 200 emails/month), create a service + template, then paste your keys below.</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12}}>
        {[{k:"serviceId",l:"Service ID",ph:"e.g. service_abc123"},{k:"templateId",l:"Template ID",ph:"e.g. template_xyz789"},{k:"publicKey",l:"Public Key",ph:"e.g. aBcDeFgHiJkLm"},{k:"fromEmail",l:"Your Email (reply-to)",ph:"e.g. you@gmail.com"}].map(f=>(
          <div key={f.k}><div style={{color:"#a1a1aa",fontSize:9,marginBottom:3}}>{f.l}</div>
            <input value={ejsCfg[f.k]||""} onChange={e=>{const nc={...ejsCfg,[f.k]:e.target.value};sEjsCfg(nc);svEjs(nc);}} placeholder={f.ph} style={{...is,width:"100%",padding:"6px 8px",fontSize:11}}/></div>
        ))}
      </div>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <span style={{color:ejsCfg.serviceId&&ejsCfg.templateId&&ejsCfg.publicKey?"#22c55e":"#ef4444",fontSize:9,fontWeight:600}}>{ejsCfg.serviceId&&ejsCfg.templateId&&ejsCfg.publicKey?"✓ Configured":"⚠ Not configured"}</span>
        {ejsCfg.serviceId&&ejsCfg.templateId&&ejsCfg.publicKey&&<button onClick={async()=>{
          const ok=await sendPayoutEmail(ejsCfg.fromEmail||"test@test.com","Test",0.01,"Jan 1","Jan 7");
          if(ok)tw("✓ Test email sent!");
        }} style={{padding:"4px 10px",borderRadius:5,border:"1px solid #3b82f640",background:"rgba(59,130,246,.1)",color:"#3b82f6",cursor:"pointer",fontSize:9,fontWeight:600}}>Send Test</button>}
      </div>
      <div style={{marginTop:10,background:"rgba(63,63,70,.4)",borderRadius:8,padding:"10px 14px"}}>
        <div style={{color:"#a1a1aa",fontSize:9,fontWeight:700,letterSpacing:1,marginBottom:6}}>EMAILJS TEMPLATE VARIABLES</div>
        <div style={{color:"#71717a",fontSize:9,lineHeight:1.8}}>Use these in your EmailJS template:<br/>
          <code style={{color:AC}}>{"{{to_email}}"}</code> — consigner's email<br/>
          <code style={{color:AC}}>{"{{to_name}}"}</code> — consigner's name<br/>
          <code style={{color:AC}}>{"{{from_email}}"}</code> — your reply-to email<br/>
          <code style={{color:AC}}>{"{{amount}}"}</code> — payout amount<br/>
          <code style={{color:AC}}>{"{{from_date}}"}</code> — period start<br/>
          <code style={{color:AC}}>{"{{to_date}}"}</code> — period end
        </div>
      </div>
    </SH>}
    {!viewOnly&&<SH id="backup" icon="💾" label="DATA BACKUP" badge={lastBackup&&<span style={{color:"#52525b",fontSize:8}}>{lastBackup}</span>}>
      <div style={{color:"#71717a",fontSize:10,marginBottom:10,lineHeight:1.6}}>Saves entries, bank transactions, and people data. Auto-backup runs every 10 minutes in the background.</div>
      {lastBackup&&<div style={{color:"#52525b",fontSize:9,marginBottom:10}}>Last auto-backup: <span style={{color:"#71717a",fontFamily:"monospace"}}>{lastBackup}</span></div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button onClick={doBackupDownload} style={{padding:"8px 16px",borderRadius:7,border:"none",background:"#22c55e",color:"#000",cursor:"pointer",fontSize:11,fontWeight:700}}>⬇ Download Backup</button>
        <label style={{padding:"8px 16px",borderRadius:7,border:"none",background:"#3b82f6",color:"#fff",cursor:"pointer",fontSize:11,fontWeight:700,display:"inline-block",lineHeight:1}}>
          ⬆ Restore Backup
          <input type="file" accept=".json" style={{display:"none"}} onChange={doRestore}/>
        </label>
      </div>
    </SH>}
    <SH id="export" icon="📤" label="EXPORT DATA">
      <div style={{color:"#71717a",fontSize:10,marginBottom:12,lineHeight:1.6}}>Export your data as CSV files for spreadsheets or record-keeping.</div>
      {(()=>{
        const dl=(name,csv)=>{const blob=new Blob([csv],{type:"text/csv"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${name}-${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(url);};
        const esc=v=>{const s=String(v??"");return s.includes(",")||s.includes('"')||s.includes("\n")?`"${s.replace(/"/g,'""')}"`:s;};
        const expTxns=()=>{const rows=[["Date","Person","Channel","Type","Amount","Description","Order","Group","Timestamp"].join(",")];
          entries.forEach(e=>{rows.push([e.d,e.p,e.src==="square"?"square":e.c,e.io,e.a.toFixed(2),esc(e.r),esc(e.ord||""),esc(e.grp||""),e.t].join(","));});dl("transactions",rows.join("\n"));};
        const expBal=()=>{const rows=[["Person","Cash","AMEX","Overall"].join(",")];
          Object.entries(balances).sort(([a],[b])=>a.localeCompare(b)).forEach(([p,b])=>{rows.push([p,b.cash.toFixed(2),b.amex.toFixed(2),b.overall.toFixed(2)].join(","));});dl("balances",rows.join("\n"));};
        const expBank=()=>{const rows=[["Date","Account","Type","Amount","Note","Timestamp"].join(",")];
          bankTxns.forEach(t=>{rows.push([t.d,t.acct,t.type,t.amt.toFixed(2),esc(t.note||""),t.t].join(","));});dl("bank-transactions",rows.join("\n"));};
        const expLog=()=>{const rows=[["Date","Person","Channel","Source","Type","Amount","Description","Order","Group","Timestamp"].join(",")];
          [...entries].sort((a,b)=>b.d.localeCompare(a.d)||b.t.localeCompare(a.t)).forEach(e=>{rows.push([e.d,e.p,e.c,e.src||"",e.io,e.a.toFixed(2),esc(e.r),esc(e.ord||""),esc(e.grp||""),e.t].join(","));});dl("log",rows.join("\n"));};
        const expAll=()=>{expTxns();expBal();expBank();expLog();};
        const btnS={padding:"7px 14px",borderRadius:6,border:"1px solid #3f3f46",background:"transparent",color:"#a1a1aa",cursor:"pointer",fontSize:10,fontWeight:600};
        return(<div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <button onClick={expTxns} style={btnS}>Transactions</button>
          <button onClick={expBal} style={btnS}>Account Balances</button>
          <button onClick={expBank} style={btnS}>Bank Transactions</button>
          <button onClick={expLog} style={btnS}>Log (sorted)</button>
          <button onClick={expAll} style={{...btnS,background:AC,color:"#000",border:"none",fontWeight:700}}>Export All</button>
        </div>);
      })()}
    </SH>
    {!viewOnly&&<SH id="device" icon="🖥" label="GET ON ANOTHER DEVICE">
      <div style={{color:"#71717a",fontSize:10,marginBottom:12,lineHeight:1.6}}>Deploy the web version so you can open it in any browser on your iMac or another PC. Your data stays local — use Download Backup then Restore Backup to move it across devices.</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <div style={{background:"rgba(63,63,70,.4)",borderRadius:8,padding:"10px 14px"}}>
          <div style={{color:"#a1a1aa",fontSize:9,fontWeight:700,letterSpacing:1,marginBottom:6}}>STEP 1 — PUSH TO GITHUB</div>
          <div style={{color:"#71717a",fontSize:10,marginBottom:4}}>Create a repo at <span style={{color:"#60a5fa"}}>github.com/new</span>, then run in terminal:</div>
          <code style={{display:"block",color:AC,fontSize:10,lineHeight:1.8}}>{"git remote add origin https://github.com/YOU/REPO.git"}<br/>{"git push -u origin main"}</code>
        </div>
        <div style={{background:"rgba(63,63,70,.4)",borderRadius:8,padding:"10px 14px"}}>
          <div style={{color:"#a1a1aa",fontSize:9,fontWeight:700,letterSpacing:1,marginBottom:6}}>STEP 2 — DEPLOY ON VERCEL</div>
          <div style={{color:"#71717a",fontSize:10,lineHeight:1.6}}>Go to <span style={{color:"#60a5fa"}}>vercel.com</span> → New Project → import your GitHub repo. Vercel auto-detects Vite. Hit Deploy — you get a URL like <span style={{color:"#22c55e",fontFamily:"monospace"}}>your-app.vercel.app</span> that works on any device.</div>
        </div>
        <div style={{background:"rgba(63,63,70,.4)",borderRadius:8,padding:"10px 14px"}}>
          <div style={{color:"#a1a1aa",fontSize:9,fontWeight:700,letterSpacing:1,marginBottom:6}}>ANOTHER WINDOWS PC</div>
          <div style={{color:"#71717a",fontSize:10,lineHeight:1.6}}>Copy the <code style={{color:AC}}>release\win-unpacked</code> folder to the other PC — no install needed, just run the .exe inside.</div>
        </div>
      </div>
    </SH>}
    <SH id="account" icon="🔒" label="ACCOUNT">
      <button onClick={async()=>{try{localStorage.removeItem("ub-auth");}catch(e){}sAuthed(false);sLoginPw("");}} style={{padding:"8px 16px",borderRadius:7,border:"1px solid #ef444430",background:"rgba(239,68,68,.08)",color:"#ef4444",cursor:"pointer",fontSize:11,fontWeight:600}}>🔒 Lock App</button>
    </SH>
  </div>);})()}
      <div style={{color:T.muted,fontSize:10,marginTop:28,textAlign:"center",opacity:.4}}>UNBOXED TCG · Arden Fair Mall<br/><button onClick={async()=>{try{(() => { try { localStorage.removeItem("ub-auth"); return true; } catch(e) { return null; } })();}catch(e){}sAuthed(false);sLoginPw("");}} style={{background:"transparent",border:"none",color:T.muted,cursor:"pointer",fontSize:8,marginTop:4}}>🔒 Lock</button></div>
      </div>{/* close content wrapper */}
    </div>
  </div>);
}
