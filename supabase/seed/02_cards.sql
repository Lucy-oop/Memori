-- 02_cards.sql: run the files in supabase/seed/ in filename order.
insert into public.cards ("type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags") values
  ('kanji', '予', null, array['beforehand','previous','myself','i']::text[], null, array['ヨ','シャ']::text[], array['あらかじ.め']::text[], 4, '{}'::text[], null, '予習（よしゅう）preparation of lessons (for class)
予定（よてい）plans
予約（よやく）reservation
天気予報（てんきよほう）weather forecast', 3, array['N3']::text[]),
  ('kanji', '反', null, array['anti-']::text[], null, array['ハン','ホン','タン','ホ']::text[], array['そ.る','そ.らす','かえ.す','かえ.る','-かえ.る']::text[], 4, '{}'::text[], null, '反対（はんたい）oppose
違反（いはん）violation (of law)
反る（かえる）to warp
反抗（はんこう）opposition', 3, array['N3']::text[]),
  ('kanji', '新', null, array['new']::text[], null, array['シン']::text[], array['あたら.しい','あら.た','あら-','にい-']::text[], 13, array['親']::text[], 'Same left side. 新 new: 斤 axe on the right. 親 parent: 見 see on the right (parents watch).', '新聞（しんぶん）newspaper
新しい（あたらしい）new
新聞社（しんぶんしゃ）newspaper company
新鮮（しんせん）fresh', 4, array['N4']::text[]),
  ('kanji', '返', null, array['return','answer','fade','repay']::text[], null, array['ヘン']::text[], array['かえ.す','-かえ.す','かえ.る','-かえ.る']::text[], 7, '{}'::text[], null, '返す（かえす）to return something
返事（へんじ）reply
繰り返す（くりかえす）to repeat
裏返す（うらがえす）to turn inside out', 3, array['N3']::text[]),
  ('kanji', '問', null, array['question','ask','problem']::text[], null, array['モン']::text[], array['と.う','と.い','とん']::text[], 11, array['間','聞','門']::text[], 'All inside 門 gate: 間 interval has 日, 問 question has 口 (mouth asks), 聞 hear has 耳 (ear).', '質問（しつもん）question
問題（もんだい）a problem
学問（がくもん）scholarship
疑問（ぎもん）question', 4, array['N4']::text[]),
  ('kanji', '宿', null, array['inn','lodging','relay station','dwell','lodge','be pregnant','home','dwelling']::text[], null, array['シュク']::text[], array['やど','やど.る','やど.す']::text[], 11, '{}'::text[], null, '宿題（しゅくだい）homework
下宿（げしゅく）lodging
宿泊（しゅくはく）lodging', 3, array['N3']::text[]),
  ('kanji', '想', null, array['concept','think','idea','thought']::text[], null, array['ソウ','ソ']::text[], array['おも.う']::text[], 13, '{}'::text[], null, '思想（しそう）thought
感想（かんそう）(one''s) impressions
理想（りそう）ideal
連想（れんそう）association (of ideas)', 3, array['N3']::text[]),
  ('kanji', '感', null, array['emotion','feeling','sensation']::text[], null, array['カン']::text[], '{}'::text[], 13, '{}'::text[], null, '感覚（かんかく）sense
感じ（かんじ）feeling
感謝（かんしゃ）thanks
感情（かんじょう）emotion(s)', 3, array['N3']::text[]),
  ('kanji', '暗', null, array['darkness','disappear','shade','informal','grow dark','be blinded']::text[], null, array['アン']::text[], array['くら.い','くら.む','くれ.る']::text[], 13, array['音','意']::text[], '音 sound. 意 mind: 音 + 心 heart. 暗 dark: 日 + 音.', '暗い（くらい）dark
暗記（あんき）memorization
薄暗い（うすぐらい）dim
真っ暗（まっくら）total darkness', 3, array['N3']::text[]),
  ('kanji', '様', null, array['esq.','way','manner','situation','polite suffix']::text[], null, array['ヨウ','ショウ']::text[], array['さま','さん']::text[], 14, '{}'::text[], null, '～様（～さま）Mr.
様々（さまざま）varied
王様（おうさま）king
模様（もよう）pattern', 3, array['N3']::text[]),
  ('kanji', '橋', null, array['bridge']::text[], null, array['キョウ']::text[], array['はし']::text[], 16, '{}'::text[], null, '鉄橋（てっきょう）iron bridge', 2, array['N2']::text[]),
  ('kanji', '福', null, array['blessing','fortune','luck','wealth']::text[], null, array['フク']::text[], '{}'::text[], 13, '{}'::text[], null, '幸福（こうふく）happiness', 3, array['N3']::text[]),
  ('kanji', '緑', null, array['green']::text[], null, array['リョク','ロク']::text[], array['みどり']::text[], 14, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '練', null, array['practice','gloss','train','drill','polish','refine']::text[], null, array['レン']::text[], array['ね.る','ね.り']::text[], 14, '{}'::text[], null, '練習（れんしゅう (する)）(to) practice
訓練（くんれん）practice', 2, array['N2']::text[]),
  ('kanji', '銀', null, array['silver']::text[], null, array['ギン']::text[], array['しろがね']::text[], 14, '{}'::text[], null, '銀行（ぎんこう）bank', 4, array['N4']::text[]),
  ('kanji', '題', null, array['topic','subject']::text[], null, array['ダイ']::text[], '{}'::text[], 18, '{}'::text[], null, '宿題（しゅくだい）homework
問題（もんだい）a problem
話題（わだい）topic
課題（かだい）subject', 4, array['N4']::text[]),
  ('kanji', '館', null, array['building','mansion','large building','palace']::text[], null, array['カン']::text[], array['やかた','たて']::text[], 16, '{}'::text[], null, '映画館（えいがかん）movie theater
大使館（たいしかん）embassy
図書館（としょかん）library
旅館（りょかん）a Japanese inn', 4, array['N4']::text[]),
  ('kanji', '駅', null, array['station']::text[], null, array['エキ']::text[], '{}'::text[], 14, '{}'::text[], null, null, 4, array['N4']::text[]),
  ('kanji', '億', null, array['hundred million','10**8']::text[], null, array['オク']::text[], '{}'::text[], 15, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '料', null, array['fee','materials']::text[], null, array['リョウ']::text[], '{}'::text[], 10, array['科']::text[], 'Both have 斗. 料 fee/material: 米 rice on the left. 科 subject: 禾 grain on the left.', '料理（りょうり）cooking
食料品（しょくりょうひん）foodstuff
食料（しょくりょう）food
給料（きゅうりょう）salary', 4, array['N4']::text[]),
  ('kanji', '殺', null, array['kill','murder','butcher','slice off','split','diminish','reduce','spoil']::text[], null, array['サツ','サイ','セツ']::text[], array['ころ.す','-ごろ.し','そ.ぐ']::text[], 10, '{}'::text[], null, '自殺（じさつ）suicide
殺す（ころす）to kill', 3, array['N3']::text[]),
  ('kanji', '然', null, array['sort of thing','so','if so','in that case','well']::text[], null, array['ゼン','ネン']::text[], array['しか','しか.り','しか.し','さ']::text[], 12, '{}'::text[], null, '全然（ぜんぜん）not at all
自然（しぜん）nature
偶然（ぐうぜん）(by) chance
依然（いぜん）still', 3, array['N3']::text[]),
  ('kanji', '熱', null, array['heat','temperature','fever','mania','passion']::text[], null, array['ネツ']::text[], array['あつ.い']::text[], 15, '{}'::text[], null, '熱い（あつい）hot (objects)
熱心（ねっしん）enthusiasm
熱帯（ねったい）tropics
熱中（ねっちゅう）enthusiasm', 3, array['N3']::text[]),
  ('kanji', '課', null, array['chapter','lesson','section','department','division','counter for chapters (of a book)']::text[], null, array['カ']::text[], '{}'::text[], 15, '{}'::text[], null, '課長（かちょう）section manager
課程（かてい）course
課題（かだい）subject
課税（かぜい）taxation', 2, array['N2']::text[]),
  ('kanji', '賞', null, array['prize','reward','praise']::text[], null, array['ショウ']::text[], array['ほ.める']::text[], 15, '{}'::text[], null, '賞品（しょうひん）prize
鑑賞（かんしょう）appreciation
賞金（しょうきん）prize', 2, array['N2']::text[]),
  ('kanji', '輪', null, array['wheel','ring','circle','link','loop','counter for wheels and flowers']::text[], null, array['リン']::text[], array['わ']::text[], 15, '{}'::text[], null, '指輪（ゆびわ）(finger) ring
車輪（しゃりん）(car) wheel', 2, array['N2']::text[]),
  ('kanji', '選', null, array['elect','select','choose','prefer']::text[], null, array['セン']::text[], array['えら.ぶ']::text[], 15, '{}'::text[], null, '選ぶ（えらぶ）to choose
選手（せんしゅ）player selected for a team (usually athletic)
選択（せんたく）selection
選挙（せんきょ）election', 3, array['N3']::text[]),
  ('kanji', '願', null, array['petition','request','vow','wish','hope']::text[], null, array['ガン']::text[], array['ねが.う','-ねがい']::text[], 19, '{}'::text[], null, '願い（ねがい）desire
願う（ねがう）to desire
お願いします（おねがいします）Please (lit., I request)', 3, array['N3']::text[]),
  ('kanji', '像', null, array['statue','picture','image','figure','portrait']::text[], null, array['ゾウ']::text[], '{}'::text[], 14, '{}'::text[], null, '想像（そうぞう）imagination', 2, array['N2']::text[]),
  ('kanji', '情', null, array['feelings','emotion','passion','sympathy','circumstances','facts']::text[], null, array['ジョウ','セイ']::text[], array['なさ.け']::text[], 11, '{}'::text[], null, '事情（じじょう）circumstances
情報（じょうほう）information
愛情（あいじょう）love
感情（かんじょう）emotion(s)', 3, array['N3']::text[]),
  ('kanji', '映', null, array['reflect','reflection','projection']::text[], null, array['エイ']::text[], array['うつ.る','うつ.す','は.える','-ば.え']::text[], 9, '{}'::text[], null, '映画（えいが）movie
映画館（えいがかん）movie theater
映す（うつす）to project
映る（うつる）to be reflected', 4, array['N4']::text[]),
  ('kanji', '疑', null, array['doubt','distrust','be suspicious','question']::text[], null, array['ギ']::text[], array['うたが.う']::text[], 14, '{}'::text[], null, '疑う（うたがう）to doubt
疑問（ぎもん）question', 3, array['N3']::text[]),
  ('kanji', '皆', null, array['all','everything']::text[], null, array['カイ']::text[], array['みな','みんな']::text[], 9, '{}'::text[], null, '皆さん（みなさん）all of you', 3, array['N3']::text[]),
  ('kanji', '例', null, array['example','custom','usage','precedent']::text[], null, array['レイ']::text[], array['たと.える']::text[], 8, '{}'::text[], null, '例えば（たとえば）for example
例外（れいがい）exception
例え（たとえ）example
実例（じつれい）example', 3, array['N3']::text[]),
  ('kanji', '卒', null, array['graduate','soldier','private','die']::text[], null, array['ソツ','シュツ']::text[], array['そっ.する','お.える','お.わる','ついに','にわか']::text[], 8, '{}'::text[], null, '卒業（そつぎょう）graduation
卒直（そっちょく）frank', 2, array['N2']::text[]),
  ('kanji', '協', null, array['co-','cooperation']::text[], null, array['キョウ']::text[], '{}'::text[], 8, '{}'::text[], null, '協力（きょうりょく）cooperation
協議（きょうぎ）conference
協調（きょうちょう）co-operation', 2, array['N2']::text[]),
  ('kanji', '参', null, array['nonplussed','three (in documents)','going','coming','visiting','visit','be defeated','die','be madly in love','participate','take part in']::text[], null, array['サン','シン']::text[], array['まい.る','まい-','まじわる','みつ']::text[], 8, '{}'::text[], null, '参る（まいる）humble expression for 行く and 来る
参加（さんか）participation
参考（さんこう）reference
持参（じさん）bringing', 3, array['N3']::text[]),
  ('kanji', '周', null, array['circumference','circuit','lap']::text[], null, array['シュウ']::text[], array['まわ.り']::text[], 8, '{}'::text[], null, '周り（まわり）surroundings
周囲（しゅうい）surroundings
円周（えんしゅう）circumference
周辺（しゅうへん）circumference', 2, array['N2']::text[]),
  ('kanji', '囲', null, array['surround','besiege','store','paling','enclosure','encircle','preserve','keep']::text[], null, array['イ']::text[], array['かこ.む','かこ.う','かこ.い']::text[], 7, '{}'::text[], null, '周囲（しゅうい）surroundings
囲む（かこむ）to surround
範囲（はんい）extent
雰囲気（ふんいき）atmosphere (e.g., musical)', 2, array['N2']::text[]),
  ('kanji', '固', null, array['harden','set','clot','curdle']::text[], null, array['コ']::text[], array['かた.める','かた.まる','かた.まり','かた.い']::text[], 8, '{}'::text[], null, '堅; 硬; 固い（かたい）solid
固まる（かたまる）to harden', 2, array['N2']::text[]),
  ('kanji', '季', null, array['seasons']::text[], null, array['キ']::text[], '{}'::text[], 8, '{}'::text[], null, '季節（きせつ）season (in reference to weather)
四季（しき）four seasons
季刊（きかん）quarterly (e.g., magazine)', 2, array['N2']::text[]),
  ('kanji', '完', null, array['perfect','completion','end']::text[], null, array['カン']::text[], '{}'::text[], 7, '{}'::text[], null, '完成（かんせい）complete
完全（かんぜん）perfection
完了（かんりょう）completion', 3, array['N3']::text[]),
  ('kanji', '希', null, array['hope','beg','request','pray','beseech','greece','dilute (acid)','rare','few','phenomenal']::text[], null, array['キ','ケ']::text[], array['まれ']::text[], 7, '{}'::text[], null, '希望（きぼう）hope', 2, array['N2']::text[]),
  ('kanji', '念', null, array['wish','sense','idea','thought','feeling','desire','attention']::text[], null, array['ネン']::text[], '{}'::text[], 8, '{}'::text[], null, '残念（ざんねん）regret
記念（きねん）commemoration
観念（かんねん）idea', 3, array['N3']::text[]),
  ('kanji', '折', null, array['fold','break','fracture','bend','yield','submit']::text[], null, array['セツ','シャク']::text[], array['お.る','おり','お.り','-お.り','お.れる']::text[], 7, '{}'::text[], null, '折る（おる）to snap
折れる（おれる）to break
骨折（こっせつ）bone fracture
折角（せっかく）with trouble', 3, array['N3']::text[]),
  ('kanji', '望', null, array['ambition','full moon','hope','desire','aspire to','expect']::text[], null, array['ボウ','モウ']::text[], array['のぞ.む','もち']::text[], 11, '{}'::text[], null, '失望（しつぼう）disappointment
希望（きぼう）hope
望み（のぞみ）wish
望む（のぞむ）to desire', 3, array['N3']::text[]),
  ('kanji', '材', null, array['lumber','log','timber','wood','materials','ingredients','talent']::text[], null, array['ザイ']::text[], '{}'::text[], 7, '{}'::text[], null, '材料（ざいりょう）ingredients
材木（ざいもく）lumber
木材（もくざい）lumber', 2, array['N2']::text[]),
  ('kanji', '束', null, array['bundle','sheaf','ream','tie in bundles','govern','manage','control']::text[], null, array['ソク']::text[], array['たば','たば.ねる','つか','つか.ねる']::text[], 7, '{}'::text[], null, '約束（やくそく）arrangement
拘束（こうそく）restriction', 3, array['N3']::text[]),
  ('kanji', '残', null, array['remainder','leftover','balance']::text[], null, array['ザン','サン']::text[], array['のこ.る','のこ.す','そこな.う','のこ.り']::text[], 10, '{}'::text[], null, '残念（ざんねん）regret
残る（のこる）to remain (v.i.)
残す（のこす）to leave (behind, over)
残り（のこり）remaining', 3, array['N3']::text[]),
  ('kanji', '求', null, array['request','want','wish for','require','demand']::text[], null, array['キュウ','グ']::text[], array['もと.める']::text[], 7, '{}'::text[], null, '請求（せいきゅう）claim
要求（ようきゅう）request
求める（もとめる）to request', 3, array['N3']::text[]),
  ('kanji', '約', null, array['promise','approximately','shrink']::text[], null, array['ヤク']::text[], array['つづ.まる','つづ.める','つづま.やか']::text[], 9, '{}'::text[], null, '予約（よやく）reservation
約束（やくそく）arrangement
契約（けいやく）contract
婚約（こんやく）engagement', 3, array['N3']::text[]),
  ('kanji', '芸', null, array['technique','art','craft','performance','acting','trick','stunt']::text[], null, array['ゲイ','ウン']::text[], array['う.える','のり','わざ']::text[], 7, '{}'::text[], null, '芸術（げいじゅつ）(fine) art
園芸（えんげい）horticulture
芸能（げいのう）public entertainment
工芸（こうげい）industrial arts', 2, array['N2']::text[]),
  ('kanji', '性', null, array['sex','gender','nature']::text[], null, array['セイ','ショウ']::text[], array['さが']::text[], 8, '{}'::text[], null, '男性（だんせい）man
女性（じょせい）woman
酸性（さんせい）acidity
性格（せいかく）character', 3, array['N3']::text[]),
  ('kanji', '技', null, array['skill','art','craft','ability','feat','performance','vocation','arts']::text[], null, array['ギ']::text[], array['わざ']::text[], 7, '{}'::text[], null, '技術（ぎじゅつ）technique
演技（えんぎ）acting
技師（ぎし）engineer
競技（きょうぎ）game', 2, array['N2']::text[]),
  ('kanji', '格', null, array['status','rank','capacity','character','case (law, grammar)']::text[], null, array['カク','コウ','キャク','ゴウ']::text[], '{}'::text[], 10, '{}'::text[], null, '格好（かっこう）appearance
性格（せいかく）character
価格（かかく）price
合格（ごうかく）success', 3, array['N3']::text[]),
  ('kanji', '能', null, array['ability','talent','skill','capacity']::text[], null, array['ノウ']::text[], array['よ.く']::text[], 10, '{}'::text[], null, '可能（かのう）possible
機能（きのう）function
才能（さいのう）talent
有能（ゆうのう）able', 3, array['N3']::text[]),
  ('kanji', '術', null, array['art','technique','skill','means','trick','resources','magic']::text[], null, array['ジュツ']::text[], array['すべ']::text[], 11, '{}'::text[], null, '技術（ぎじゅつ）technique
美術館（びじゅつかん）art gallery
手術（しゅじゅつ）surgical operation
芸術（げいじゅつ）(fine) art', 3, array['N3']::text[]),
  ('kanji', '私', null, array['private','i','me']::text[], null, array['シ']::text[], array['わたくし','わたし']::text[], 7, '{}'::text[], null, '私用（しよう）personal use
私鉄（してつ）private railway
私立（しりつ）private (establishment)', 4, array['N4']::text[]),
  ('kanji', '骨', null, array['skeleton','bone','remains','frame']::text[], null, array['コツ']::text[], array['ほね']::text[], 10, '{}'::text[], null, '骨折（こっせつ）bone fracture', 2, array['N2']::text[]),
  ('kanji', '寺', null, array['buddhist temple']::text[], null, array['ジ']::text[], array['てら']::text[], 6, array['持','時']::text[], '寺 temple. 時 time: 日 + 寺. 持 hold: 扌 + 寺.', '～寺（～じ）the name of temple
寺院（じいん）temple', 2, array['N2']::text[]),
  ('kanji', '岩', null, array['boulder','rock','cliff']::text[], null, array['ガン']::text[], array['いわ']::text[], 8, '{}'::text[], null, '溶岩（ようがん）lava', 2, array['N2']::text[]),
  ('kanji', '帰', null, array['homecoming','arrive at','lead to','result in']::text[], null, array['キ']::text[], array['かえ.る','かえ.す','おく.る','とつ.ぐ']::text[], 10, '{}'::text[], null, '帰る（かえる）to go back
帰り（かえり）return
帰す（かえす）to send back
帰宅（きたく）returning home', 4, array['N4']::text[]),
  ('kanji', '春', null, array['springtime','spring (season)']::text[], null, array['シュン']::text[], array['はる']::text[], 9, '{}'::text[], null, null, 4, array['N4']::text[]),
  ('kanji', '昼', null, array['daytime','noon']::text[], null, array['チュウ']::text[], array['ひる']::text[], 9, array['書','画']::text[], '昼 daytime: 尺 + 日 + 一. 書 write: 聿 brush + 日. 画 picture: 一 + 由 inside 凵.', '昼御飯（ひるごはん）lunch
昼間（ひるま）daytime
昼休み（ひるやすみ）lunch break
お昼（おひる）lunch', 4, array['N4']::text[]),
  ('kanji', '晴', null, array['clear up']::text[], null, array['セイ']::text[], array['は.れる','は.れ','は.れ-','-ば.れ','は.らす']::text[], 12, '{}'::text[], null, '晴れ（はれ）clear (sunny) weather
晴れる（はれる）to be sunny
素晴らしい（すばらしい）wonderful
快晴（かいせい）good weather', 3, array['N3']::text[]),
  ('kanji', '秋', null, array['autumn']::text[], null, array['シュウ']::text[], array['あき','とき']::text[], 9, '{}'::text[], null, null, 4, array['N4']::text[]),
  ('kanji', '計', null, array['plot','plan','scheme','measure']::text[], null, array['ケイ']::text[], array['はか.る','はか.らう']::text[], 9, '{}'::text[], null, '時計（とけい）a watch
計画（けいかくする）plan
設計（せっけい）plan
会計（かいけい）account', 4, array['N4']::text[]),
  ('kanji', '列', null, array['file','row','rank','tier','column']::text[], null, array['レツ','レ']::text[], '{}'::text[], 6, '{}'::text[], null, '列車（れっしゃ）train (ordinary)
行列（ぎょうれつ）line
列島（れっとう）chain of islands', 3, array['N3']::text[]),
  ('kanji', '区', null, array['ward','district']::text[], null, array['ク','オウ','コウ']::text[], '{}'::text[], 4, '{}'::text[], null, '～区（～く）~ district
区別（くべつ）distinction
地区（ちく）district
区域（くいき）zone', 2, array['N2']::text[]),
  ('kanji', '坂', null, array['slope','incline','hill']::text[], null, array['ハン']::text[], array['さか']::text[], 7, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '式', null, array['style','ceremony','rite','function','method','system','form','expression']::text[], null, array['シキ']::text[], '{}'::text[], 6, '{}'::text[], null, '～式（～しき）~ ceremony
正式（せいしき）official
儀式（ぎしき）ceremony
形式（けいしき）form', 3, array['N3']::text[]),
  ('kanji', '信', null, array['faith','truth','fidelity','trust']::text[], null, array['シン']::text[], '{}'::text[], 9, '{}'::text[], null, '信仰（しんこう）(religious) faith
信号（しんごう）traffic lights
信用（しんよう）confidence
信頼（しんらい）reliance', 3, array['N3']::text[]),
  ('kanji', '勇', null, array['courage','cheer up','be in high spirits','bravery','heroism']::text[], null, array['ユウ']::text[], array['いさ.む']::text[], 9, '{}'::text[], null, '勇気（ゆうき）courage
勇ましい（いさましい）brave', 2, array['N2']::text[]),
  ('kanji', '単', null, array['simple','one','single','merely']::text[], null, array['タン']::text[], array['ひとえ']::text[], 9, '{}'::text[], null, '簡単（かんたん）simple
単位（たんい）credit (for a course in school)
単語（たんご）word
単純（たんじゅん）simplicity', 3, array['N3']::text[]),
  ('kanji', '変', null, array['unusual','change','strange']::text[], null, array['ヘン']::text[], array['か.わる','か.わり','か.える']::text[], 9, '{}'::text[], null, '大変（たいへん）very
変える（かえる）to change
変わる（かわる）to change (v.i.)
変化（へんか）change', 3, array['N3']::text[]),
  ('kanji', '夫', null, array['husband','man']::text[], null, array['フ','フウ','ブ']::text[], array['おっと','それ']::text[], 4, array['天']::text[], '天 heaven: top line shorter, nothing pokes through. 夫 husband: vertical pokes through the top.', '丈夫（じょうぶ）strong
大丈夫（だいじょうぶ）It''s ok (all right)
夫婦（ふうふ）married couple
夫人（ふじん）wife', 3, array['N3']::text[]),
  ('kanji', '建', null, array['build']::text[], null, array['ケン','コン']::text[], array['た.てる','た.て','-だ.て','た.つ']::text[], 9, '{}'::text[], null, '建物（たてもの）building
建て（～だて）~ storied
建てる（たてる）to build
建設（けんせつ）construction', 4, array['N4']::text[]),
  ('kanji', '昨', null, array['yesterday','previous']::text[], null, array['サク']::text[], '{}'::text[], 9, '{}'::text[], null, '昨日（きのう）yesterday
昨夜（ゆうべ）last night
一昨日（おととい）the day before yesterday
一昨日（いっさくじつ）day before yesterday', 3, array['N3']::text[]),
  ('kanji', '毒', null, array['poison','virus','venom','germ','harm','injury','spite']::text[], null, array['ドク']::text[], '{}'::text[], 8, '{}'::text[], null, '気の毒（きのどく）pitiful
消毒（しょうどく）disinfection
お気の毒に（おきのどくに）I''m sorry to hear that…', 2, array['N2']::text[]),
  ('kanji', '法', null, array['method','law','rule','principle','model','system']::text[], null, array['ホウ','ハッ','ホッ','フラン']::text[], array['のり']::text[], 8, '{}'::text[], null, '文法（ぶんぽう）grammar
法律（ほうりつ）law
作法（さほう）manners
憲法（けんぽう）constitution', 3, array['N3']::text[]),
  ('kanji', '浅', null, array['shallow','superficial','frivolous','wretched','shameful']::text[], null, array['セン']::text[], array['あさ.い']::text[], 9, '{}'::text[], null, '浅い（あさい）shallow', 2, array['N2']::text[]),
  ('kanji', '英', null, array['england','english','hero','outstanding','calyx']::text[], null, array['エイ']::text[], array['はなぶさ']::text[], 8, '{}'::text[], null, '英語（えいご）English (language)
英文（えいぶん）sentence in English
英和（えいわ）English-Japanese (e.g., dictionary)
和英（わえい）Japanese-English', 4, array['N4']::text[]),
  ('kanji', '軍', null, array['army','force','troops','war','battle']::text[], null, array['グン']::text[], array['いくさ']::text[], 9, '{}'::text[], null, '軍隊（ぐんたい）army', 2, array['N2']::text[]),
  ('kanji', '飯', null, array['meal','boiled rice']::text[], null, array['ハン']::text[], array['めし']::text[], 12, '{}'::text[], null, '御飯（ごはん）rice (cooked)
夕飯（ゆうはん）dinner
朝御飯（あさごはん）breakfast
晩御飯（ばんごはん）dinner', 4, array['N4']::text[]),
  ('kanji', '仏', null, array['buddha','the dead','france']::text[], null, array['ブツ','フツ']::text[], array['ほとけ']::text[], 4, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '築', null, array['fabricate','build','construct']::text[], null, array['チク']::text[], array['きず.く']::text[], 16, '{}'::text[], null, '建築（けんちく）construction
築く（きずく）to build', 2, array['N2']::text[]),
  ('kanji', '晩', null, array['nightfall','night']::text[], null, array['バン']::text[], '{}'::text[], 12, '{}'::text[], null, '今晩（こんばん）tonight
毎晩（まいばん）every night
晩御飯（ばんごはん）dinner', 3, array['N3']::text[]),
  ('kanji', '猫', null, array['cat']::text[], null, array['ビョウ']::text[], array['ねこ']::text[], 11, '{}'::text[], null, null, 3, array['N3']::text[]),
  ('kanji', '園', null, array['park','garden','yard','farm']::text[], null, array['エン']::text[], array['その']::text[], 13, '{}'::text[], null, '公園（こうえん）a park
動物園（どうぶつえん）zoo
～園（～えん）~ garden (especially man made)
園芸（えんげい）horticulture', 3, array['N3']::text[]),
  ('kanji', '曜', null, array['weekday']::text[], null, array['ヨウ']::text[], '{}'::text[], 18, '{}'::text[], null, '火曜日（かようび）Tuesday
金曜日（きんようび）Friday
月曜日（げつようび）Monday
水曜日（すいようび）Wednesday', 4, array['N4']::text[]),
  ('kanji', '書', null, array['write']::text[], null, array['ショ']::text[], array['か.く','-が.き','-がき']::text[], 10, array['昼','画']::text[], '昼 daytime: 尺 + 日 + 一. 書 write: 聿 brush + 日. 画 picture: 一 + 由 inside 凵.', '書く（かく）to write
辞書（じしょ）dictionary
葉書（はがき）postcard
図書館（としょかん）library', 5, array['N5']::text[]),
  ('kanji', '遠', null, array['distant','far']::text[], null, array['エン','オン']::text[], array['とお.い']::text[], 13, '{}'::text[], null, '遠い（とおい）far (away)
遠慮（えんりょする）restraint
遠く（とおく）far away
永遠（えいえん）eternity', 3, array['N3']::text[]),
  ('kanji', '門', null, array['gate','counter for cannons']::text[], null, array['モン']::text[], array['かど','と']::text[], 8, array['間','問','聞']::text[], 'All inside 門 gate: 間 interval has 日, 問 question has 口 (mouth asks), 聞 hear has 耳 (ear).', '専門（せんもん）major
正門（せいもん）main gate', 2, array['N2']::text[]),
  ('kanji', '係', null, array['person in charge','connection','duty','concern oneself']::text[], null, array['ケイ']::text[], array['かか.る','かかり','-がかり','かか.わる']::text[], 9, '{}'::text[], null, '関係（かんけい）relation(ship)
係わる（かかわる）to concern oneself in', 3, array['N3']::text[]),
  ('kanji', '取', null, array['take','fetch','take up']::text[], null, array['シュ']::text[], array['と.る','と.り','と.り-','とり','-ど.り']::text[], 8, '{}'::text[], null, '取る（とる）to take (a class)
取り替える（とりかえる）to exchange
取れる（とれる）to come off
受け取る（うけとる）to receive', 3, array['N3']::text[]),
  ('kanji', '品', null, array['goods','refinement','dignity','article','counter for meal courses']::text[], null, array['ヒン','ホン']::text[], array['しな']::text[], 9, '{}'::text[], null, '品物（しなもの）goods
食料品（しょくりょうひん）foodstuff
商品（しょうひん）commodity
賞品（しょうひん）prize', 4, array['N4']::text[]),
  ('kanji', '守', null, array['guard','protect','defend','obey']::text[], null, array['シュ','ス']::text[], array['まも.る','まも.り','もり','-もり','かみ']::text[], 6, '{}'::text[], null, '留守（るす）absence
守る（まもる）to protect
留守番（るすばん）care-taking', 3, array['N3']::text[]),
  ('kanji', '幸', null, array['happiness','blessing','fortune']::text[], null, array['コウ']::text[], array['さいわ.い','さち','しあわ.せ']::text[], 8, '{}'::text[], null, '幸せ（しあわせ）happiness
幸運（こううん）good luck
幸福（こうふく）happiness
幸い（さいわい）fortunately', 3, array['N3']::text[]),
  ('kanji', '急', null, array['hurry','emergency','sudden','steep']::text[], null, array['キュウ']::text[], array['いそ.ぐ','いそ.ぎ','せ.く']::text[], 9, '{}'::text[], null, '急行（きゅうこう）express train or bus
特急（とっきゅう）limited express (train faster than an express)
急ぐ（いそぐ）to hurry
至急（しきゅう）urgent', 4, array['N4']::text[]),
  ('kanji', '真', null, array['true','reality','buddhist sect']::text[], null, array['シン']::text[], array['ま','ま-','まこと']::text[], 10, '{}'::text[], null, '写真（しゃしん）a picture
真中（まんなか）middle
真面目（まじめ）diligent
真剣（しんけん）seriousness', 4, array['N4']::text[]),
  ('kanji', '箱', null, array['box','chest','case','bin','railway car']::text[], null, array['ソウ']::text[], array['はこ']::text[], 15, '{}'::text[], null, null, 3, array['N3']::text[]),
  ('kanji', '荷', null, array['baggage','shoulder-pole load','bear (a burden)','shoulder (a gun)','load','cargo','freight']::text[], null, array['カ']::text[], array['に']::text[], 10, '{}'::text[], null, '荷物（にもつ）luggage', 2, array['N2']::text[]),
  ('kanji', '面', null, array['mask','face','features','surface']::text[], null, array['メン','ベン']::text[], array['おも','おもて','つら']::text[], 9, '{}'::text[], null, '面白い（おもしろい）interesting
真面目（まじめ）diligent
面接（めんせつ）interview
面倒（めんどう）trouble', 3, array['N3']::text[]),
  ('kanji', '喜', null, array['rejoice','take pleasure in']::text[], null, array['キ']::text[], array['よろこ.ぶ','よろこ.ばす']::text[], 12, '{}'::text[], null, '喜ぶ（よろこぶ）to rejoice
喜び（よろこび）joy', 3, array['N3']::text[]),
  ('kanji', '府', null, array['borough','urban prefecture','govt office','representative body','storehouse']::text[], null, array['フ']::text[], '{}'::text[], 8, '{}'::text[], null, '政府（せいふ）government', 2, array['N2']::text[]),
  ('kanji', '治', null, array['reign','be at peace','calm down','subdue','quell','govt','cure','heal','rule','conserve']::text[], null, array['ジ','チ']::text[], array['おさ.める','おさ.まる','なお.る','なお.す']::text[], 8, '{}'::text[], null, '治る（なおる）to get better
政治（せいじ）politics
治療（ちりょう）medical treatment
治める（おさめる）to govern', 3, array['N3']::text[]),
  ('kanji', '浴', null, array['bathe','be favored with','bask in']::text[], null, array['ヨク']::text[], array['あ.びる','あ.びせる']::text[], 10, '{}'::text[], null, '浴びる（あびる）to bathe
浴衣（ゆかた）bathrobe
海水浴（かいすいよく）sea bathing', 2, array['N2']::text[]),
  ('kanji', '笑', null, array['laugh']::text[], null, array['ショウ']::text[], array['わら.う','え.む']::text[], 10, '{}'::text[], null, '笑う（わらう）to laugh
笑顔（えがお）smile (on one''s face)
笑い（わらい）laugh
微笑む（ほほえむ）to smile', 3, array['N3']::text[]),
  ('kanji', '辞', null, array['resign','word','term','expression']::text[], null, array['ジ']::text[], array['や.める','いな.む']::text[], 13, '{}'::text[], null, '辞書（じしょ）dictionary
辞典（じてん）encyclopedia
辞退（じたい）refusal
お辞儀（おじぎ）bow', 3, array['N3']::text[]),
  ('kanji', '関', null, array['connection','barrier','gateway','involve','concerning']::text[], null, array['カン']::text[], array['せき','-ぜき','かか.わる','からくり','かんぬき']::text[], 14, '{}'::text[], null, '玄関（げんかん）entrance (to a house or a building)
関係（かんけい）relation(ship)
関心（かんしん）concern
関連（かんれん）relation', 3, array['N3']::text[]),
  ('kanji', '政', null, array['politics','government']::text[], null, array['セイ','ショウ']::text[], array['まつりごと','まん']::text[], 9, '{}'::text[], null, '政治（せいじ）politics
政府（せいふ）government
政党（せいとう）(member of) political party', 3, array['N3']::text[]),
  ('kanji', '留', null, array['detain','fasten','halt','stop']::text[], null, array['リュウ','ル']::text[], array['と.める','と.まる','とど.める','とど.まる','るうぶる']::text[], 10, '{}'::text[], null, '留学生（りゅうがくせい）international student
留守（るす）absence
留学（りゅうがく）studying abroad
停留所（ていりゅうじょ）bus or tram stop', 3, array['N3']::text[]),
  ('kanji', '険', null, array['precipitous','inaccessible place','impregnable position','steep place','sharp eyes']::text[], null, array['ケン']::text[], array['けわ.しい']::text[], 11, '{}'::text[], null, '危険（きけん）danger
冒険（ぼうけん）risk
険しい（けわしい）steep', 3, array['N3']::text[]),
  ('kanji', '危', null, array['dangerous','fear','uneasy']::text[], null, array['キ']::text[], array['あぶ.ない','あや.うい','あや.ぶむ']::text[], 6, '{}'::text[], null, '危ない（あぶない）dangerous
危険（きけん）danger
危うい（あやうい）dangerous', 3, array['N3']::text[]),
  ('kanji', '存', null, array['exist','suppose','be aware of','believe','feel']::text[], null, array['ソン','ゾン']::text[], array['ながら.える','あ.る','たも.つ','と.う']::text[], 6, '{}'::text[], null, 'ご存じ（ごぞんじ）knowing
存在（そんざい）existence
保存（ほぞん）preservation
生存（せいぞん）existence', 3, array['N3']::text[]),
  ('kanji', '専', null, array['specialty','exclusive','mainly','solely']::text[], null, array['セン']::text[], array['もっぱ.ら']::text[], 9, '{}'::text[], null, '専門（せんもん）major
専攻（せんこう）major subject
専制（せんせい）despotism', 2, array['N2']::text[]),
  ('kanji', '原', null, array['meadow','original','primitive','field','plain','prairie','tundra','wilderness']::text[], null, array['ゲン']::text[], array['はら']::text[], 10, '{}'::text[], null, '原因（げんいん）cause
原稿（げんこう）manuscript
原産（げんさん）place of origin
原始（げんし）origin', 3, array['N3']::text[]),
  ('kanji', '細', null, array['dainty','get thin','taper','slender','narrow','detailed','precise']::text[], null, array['サイ']::text[], array['ほそ.い','ほそ.る','こま.か','こま.かい']::text[], 11, '{}'::text[], null, '細い（ほそい）thin
細かい（こまかい）small', 2, array['N2']::text[]),
  ('kanji', '薬', null, array['medicine','chemical','enamel','gunpowder','benefit']::text[], null, array['ヤク']::text[], array['くすり']::text[], 16, '{}'::text[], null, '薬指（くすりゆび）ring finger
農薬（のうやく）agricultural chemicals
薬品（やくひん）medicine(s)
薬局（やっきょく）pharmacy', 3, array['N3']::text[]),
  ('kanji', '鼻', null, array['nose','snout']::text[], null, array['ビ']::text[], array['はな']::text[], 14, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '側', null, array['side','lean','oppose','regret']::text[], null, array['ソク']::text[], array['かわ','がわ','そば']::text[], 11, '{}'::text[], null, '～側（～がわ）~ side
両側（りょうがわ）both sides', 3, array['N3']::text[]),
  ('kanji', '兵', null, array['soldier','private','troops','army','warfare','strategy','tactics']::text[], null, array['ヘイ','ヒョウ']::text[], array['つわもの']::text[], 7, '{}'::text[], null, '兵隊（へいたい）soldier', 2, array['N2']::text[]),
  ('kanji', '堂', null, array['public chamber','hall']::text[], null, array['ドウ']::text[], '{}'::text[], 11, '{}'::text[], null, '食堂（しょくどう）cafeteria
講堂（こうどう）auditorium', 4, array['N4']::text[]),
  ('kanji', '塩', null, array['salt']::text[], null, array['エン']::text[], array['しお']::text[], 13, '{}'::text[], null, '塩辛（しおから）salty (taste)
食塩（しょくえん）table salt
塩辛い（しおからい）salty (taste)', 2, array['N2']::text[]),
  ('kanji', '席', null, array['seat','mat','occasion','place']::text[], null, array['セキ']::text[], array['むしろ']::text[], 10, '{}'::text[], null, '出席（しゅっせきする）attendance
欠席（けっせき）absence
座席（ざせき）seat
～席（～せき）counter for seats', 3, array['N3']::text[]),
  ('kanji', '敗', null, array['failure','defeat','reversal']::text[], null, array['ハイ']::text[], array['やぶ.れる']::text[], 11, '{}'::text[], null, '失敗（しっぱい）failure
～敗（はい）counter for loss
勝敗（しょうはい）victory or defeat', 3, array['N3']::text[]),
  ('kanji', '果', null, array['fruit','reward','carry out','achieve','complete','end','finish','succeed']::text[], null, array['カ']::text[], array['は.たす','はた.す','-は.たす','は.てる','-は.てる','は.て']::text[], 8, '{}'::text[], null, '果物（くだもの）fruit
結果（けっか）result
効果（こうか）effect
果実（かじつ）fruit', 3, array['N3']::text[]),
  ('kanji', '栄', null, array['flourish','prosperity','honor','glory','splendor']::text[], null, array['エイ','ヨウ']::text[], array['さか.える','は.え','-ば.え','は.える','え']::text[], 9, '{}'::text[], null, '栄養（えいよう）nutrition', 2, array['N2']::text[]),
  ('kanji', '因', null, array['cause','factor','be associated with','depend on','be limited to']::text[], null, array['イン']::text[], array['よ.る','ちな.む']::text[], 6, '{}'::text[], null, '原因（げんいん）cause
因る（よる）to come from', 3, array['N3']::text[]),
  ('kanji', '常', null, array['usual','ordinary','normal','common','regular','continually','always','long-lasting']::text[], null, array['ジョウ']::text[], array['つね','とこ-']::text[], 11, '{}'::text[], null, '非常に（ひじょうに）extremely
常識（じょうしき）common sense
異常（いじょう）strangeness
常に（つねに）always (same as いつも) (written expression)', 3, array['N3']::text[]),
  ('kanji', '識', null, array['discriminating','know','write']::text[], null, array['シキ']::text[], array['し.る','しる.す']::text[], 19, '{}'::text[], null, '常識（じょうしき）common sense
意識（いしき）consciousness
知識（ちしき）knowledge
標識（ひょうしき）sign', 3, array['N3']::text[]),
  ('kanji', '非', null, array['un-','mistake','negative','injustice','non-']::text[], null, array['ヒ']::text[], array['あら.ず']::text[], 8, '{}'::text[], null, '是非（ぜひ）certainly
非常に（ひじょうに）extremely
非常（ひじょう）emergency
非行（ひこう）delinquency', 3, array['N3']::text[]),
  ('kanji', '干', null, array['dry','parch','ebb','recede','interfere','intercede']::text[], null, array['カン']::text[], array['ほ.す','ほ.し-','-ぼ.し','ひ.る']::text[], 3, array['千']::text[], '千 thousand starts with a slanted ノ. 干 dry has a flat top line.', '干す（ほす）to air', 2, array['N2']::text[]),
  ('kanji', '官', null, array['bureaucrat','the government','organ']::text[], null, array['カン']::text[], '{}'::text[], 8, '{}'::text[], null, '警官（けいかん）police officer
官僚（かんりょう）bureaucrat
器官（きかん）organ (of body, instrument)
官庁（かんちょう）government office', 3, array['N3']::text[]),
  ('kanji', '察', null, array['guess','presume','surmise','judge','understand']::text[], null, array['サツ']::text[], '{}'::text[], 14, '{}'::text[], null, '警察（けいさつ）police
診察（しんさつ）medical examination (of a patient)
観察（かんさつ）observation', 3, array['N3']::text[]),
  ('kanji', '底', null, array['bottom','sole','depth','bottom price','base','kind','sort']::text[], null, array['テイ']::text[], array['そこ']::text[], 8, array['低']::text[], '低 low: 亻 person. 底 bottom: 广 roof.', '徹底（てってい）thoroughness', 2, array['N2']::text[]),
  ('kanji', '愛', null, array['love','affection','favourite']::text[], null, array['アイ']::text[], array['いと.しい','かな.しい','め.でる','お.しむ','まな']::text[], 13, '{}'::text[], null, '可愛い（かわいい）cute
愛情（あいじょう）love
愛する（あいする）to love
可愛そう（かわいそう）poor', 3, array['N3']::text[]),
  ('kanji', '署', null, array['signature','govt office','police station']::text[], null, array['ショ']::text[], '{}'::text[], 13, '{}'::text[], null, '署名（しょめい）signature
消防署（しょうぼうしょ）fire station', 2, array['N2']::text[]),
  ('kanji', '警', null, array['admonish','commandment']::text[], null, array['ケイ']::text[], array['いまし.める']::text[], 19, '{}'::text[], null, '警官（けいかん）police officer
警察（けいさつ）police
警告（けいこく）warning
警備（けいび）defense', 3, array['N3']::text[]),
  ('kanji', '恋', null, array['romance','in love','yearn for','miss','darling']::text[], null, array['レン']::text[], array['こ.う','こい','こい.しい']::text[], 10, '{}'::text[], null, '恋人（こいびと）lover
失恋（しつれん）broken heart
恋しい（こいしい）dear', 2, array['N2']::text[]),
  ('kanji', '覚', null, array['memorize','learn','remember','awake','sober up']::text[], null, array['カク']::text[], array['おぼ.える','さ.ます','さ.める','さと.る']::text[], 12, '{}'::text[], null, '覚える（おぼえる）to learn
覚悟（かくご）resolution
感覚（かんかく）sense
視覚（しかく）sense of sight', 3, array['N3']::text[]),
  ('kanji', '説', null, array['opinion','theory','explanation','rumor']::text[], null, array['セツ','ゼイ']::text[], array['と.く']::text[], 14, '{}'::text[], null, '小説（しょうせつ）novel
説明（せつめい）explanation
演説（えんぜつ）speech
説く（とく）to explain', 3, array['N3']::text[]),
  ('kanji', '訓', null, array['instruction','japanese character reading','explanation','read']::text[], null, array['クン','キン']::text[], array['おし.える','よ.む','くん.ずる']::text[], 10, '{}'::text[], null, '訓練（くんれん）practice', 2, array['N2']::text[]),
  ('kanji', '試', null, array['test','try','attempt','experiment','ordeal']::text[], null, array['シ']::text[], array['こころ.みる','ため.す']::text[], 13, '{}'::text[], null, '試合（しあい）match
試験（しけん）an exam
試し（ためし）trial
試す（ためす）to attempt', 4, array['N4']::text[]),
  ('kanji', '告', null, array['revelation','tell','inform','announce']::text[], null, array['コク']::text[], array['つ.げる']::text[], 7, '{}'::text[], null, '警告（けいこく）warning
広告（こうこく）advertisement
報告（ほうこく）report
申告（しんこく）report', 3, array['N3']::text[]),
  ('kanji', '種', null, array['species','kind','class','variety','seed']::text[], null, array['シュ']::text[], array['たね','-ぐさ']::text[], 14, '{}'::text[], null, '種類（しゅるい）variety
人種（じんしゅ）race (of people)
一種（いっしゅ）a species', 3, array['N3']::text[]),
  ('kanji', '達', null, array['accomplished','reach','arrive','attain']::text[], null, array['タツ','ダ']::text[], array['-たち']::text[], 12, '{}'::text[], null, '友達（ともだち）friend
上達（じょうたつ）improvement
配達（はいたつ）delivery
発達（はったつ）development', 3, array['N3']::text[]),
  ('kanji', '類', null, array['sort','kind','variety','class','genus']::text[], null, array['ルイ']::text[], array['たぐ.い']::text[], 18, '{}'::text[], null, '種類（しゅるい）variety
書類（しょるい）documents
人類（じんるい）mankind
親類（しんるい）relative(s) (same as 親戚 (しんせき))', 3, array['N3']::text[]),
  ('kanji', '報', null, array['report','news','reward','retribution']::text[], null, array['ホウ']::text[], array['むく.いる']::text[], 12, '{}'::text[], null, '電報（でんぽう）telegram
天気予報（てんきよほう）weather forecast
情報（じょうほう）information
予報（よほう）forecast', 3, array['N3']::text[]),
  ('kanji', '祈', null, array['pray','wish']::text[], null, array['キ']::text[], array['いの.る']::text[], 8, '{}'::text[], null, '祈る（いのる）to pray', 2, array['N2']::text[]),
  ('kanji', '等', null, array['etc.','and so forth','class (first)','quality','equal','similar']::text[], null, array['トウ']::text[], array['ひと.しい','など','-ら']::text[], 12, '{}'::text[], null, '高校; 高等学校（こうこう; こうとうがっこう）high school
上等（じょうとう）first class
平等（びょうどう）equality
等しい（ひとしい）equal', 3, array['N3']::text[]),
  ('kanji', '借', null, array['borrow','rent']::text[], null, array['シャク']::text[], array['か.りる']::text[], 10, '{}'::text[], null, '借りる（かりる）to borrow
借金（しゃっきん）debt
借り（かり）borrowing', 4, array['N4']::text[]),
  ('kanji', '焼', null, array['bake','burning']::text[], null, array['ショウ']::text[], array['や.く','や.き','や.き-','-や.き','や.ける']::text[], 12, '{}'::text[], null, '焼く（やく）to bake
焼ける（やける）to burn', 2, array['N2']::text[]),
  ('kanji', '座', null, array['squat','seat','cushion','gathering','sit']::text[], null, array['ザ']::text[], array['すわ.る']::text[], 10, '{}'::text[], null, '座る（すわる）to sit
座席（ざせき）seat
座敷（ざしき）tatami room
座布団（ざぶとん）cushion (Japanese)', 3, array['N3']::text[]),
  ('kanji', '忘', null, array['forget']::text[], null, array['ボウ']::text[], array['わす.れる']::text[], 7, '{}'::text[], null, '忘れる（わすれる）to forget
忘れ物（わすれもの）lost article', 3, array['N3']::text[]),
  ('kanji', '洗', null, array['wash','inquire into','probe']::text[], null, array['セン']::text[], array['あら.う']::text[], 9, '{}'::text[], null, '洗う（あらう）to wash
洗濯（せんたく）washing
お手洗い（おてあらい）toilet
洗剤（せんざい）detergent', 3, array['N3']::text[]),
  ('kanji', '胸', null, array['bosom','breast','chest','heart','feelings']::text[], null, array['キョウ']::text[], array['むね','むな-']::text[], 10, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '脳', null, array['brain','memory']::text[], null, array['ノウ','ドウ']::text[], array['のうずる']::text[], 11, '{}'::text[], null, '頭脳（ずのう）head', 2, array['N2']::text[]),
  ('kanji', '験', null, array['verification','effect','testing']::text[], null, array['ケン','ゲン']::text[], array['あかし','しるし','ため.す','ためし']::text[], 18, '{}'::text[], null, '試験（しけん）an exam
経験（けいけんする）experience
実験（じっけん）lab work
受験（じゅけん）taking an examination', 4, array['N4']::text[]),
  ('kanji', '許', null, array['permit','approve']::text[], null, array['キョ']::text[], array['ゆる.す','もと']::text[], 11, '{}'::text[], null, '許可（きょか）permission
免許（めんきょ）license
許す（ゆるす）to permit', 3, array['N3']::text[]),
  ('kanji', '枚', null, array['sheet of...','counter for flat thin objects or sheets']::text[], null, array['マイ','バイ']::text[], '{}'::text[], 8, '{}'::text[], null, '～枚（～まい）counter for flat things
枚数（まいすう）the number of flat things', 2, array['N2']::text[]),
  ('kanji', '静', null, array['quiet']::text[], null, array['セイ','ジョウ']::text[], array['しず-','しず.か','しず.まる','しず.める']::text[], 14, '{}'::text[], null, '静か（しずか）quiet
冷静（れいせい）calm
静まる（しずまる）to quieten down', 3, array['N3']::text[]),
  ('kanji', '禁', null, array['prohibition','ban','forbid']::text[], null, array['キン']::text[], '{}'::text[], 13, '{}'::text[], null, '禁煙（きんえん）No Smoking
禁止（きんし）prohibition', 2, array['N2']::text[]),
  ('kanji', '喫', null, array['consume','eat','drink','smoke','receive (a blow)']::text[], null, array['キツ']::text[], array['の.む']::text[], 12, '{}'::text[], null, '喫茶店（きっさてん）café', 2, array['N2']::text[]),
  ('kanji', '煙', null, array['smoke']::text[], null, array['エン']::text[], array['けむ.る','けむり','けむ.い']::text[], 13, '{}'::text[], null, '禁煙（きんえん）No Smoking
煙突（えんとつ）chimney
煙い（けむい）smoky', 3, array['N3']::text[]),
  ('kanji', '加', null, array['add','addition','increase','join','include','canada']::text[], null, array['カ']::text[], array['くわ.える','くわ.わる']::text[], 5, '{}'::text[], null, '参加（さんか）participation
加減（かげん）adjustment
加味（かみ）seasoning
増加（ぞうか）increase', 3, array['N3']::text[]),
  ('kanji', '減', null, array['dwindle','decrease','reduce','decline','curtail','get hungry']::text[], null, array['ゲン']::text[], array['へ.る','へ.らす']::text[], 12, '{}'::text[], null, '加減（かげん）adjustment
減少（げんしょう）decrease
減る（へる）to decrease (in size or number)
減らす（へらす）to decrease', 2, array['N2']::text[]),
  ('kanji', '順', null, array['obey','order','turn','right','docility','occasion']::text[], null, array['ジュン']::text[], '{}'::text[], 12, '{}'::text[], null, '順調（じゅんちょう）doing well
順番（じゅんばん）turn (in line)
順々（じゅんじゅん）in order
順序（じゅんじょ）order', 2, array['N2']::text[]),
  ('kanji', '容', null, array['contain','form','looks']::text[], null, array['ヨウ']::text[], array['い.れる']::text[], 10, '{}'::text[], null, '容易（ようい）easy
容器（ようき）container
内容（ないよう）subject
美容（びよう）beauty of figure or form', 3, array['N3']::text[]),
  ('kanji', '布', null, array['linen','cloth','spread','distribute']::text[], null, array['フ']::text[], array['ぬの']::text[], 5, '{}'::text[], null, '財布（さいふ）wallet
布団（ふとん）futon
毛布（もうふ）blanket
分布（ぶんぷ）distribution', 2, array['N2']::text[]),
  ('kanji', '易', null, array['easy','ready to','simple','fortune-telling','divination']::text[], null, array['エキ','イ']::text[], array['やさ.しい','やす.い']::text[], 8, '{}'::text[], null, '易しい（やさしい）easy
貿易（ぼうえき）trade
容易（ようい）easy
安易（あんい）easy-going', 3, array['N3']::text[]),
  ('kanji', '財', null, array['property','money','wealth','assets']::text[], null, array['ザイ','サイ','ゾク']::text[], array['たから']::text[], 10, '{}'::text[], null, '財布（さいふ）wallet
財産（ざいさん）property', 3, array['N3']::text[]),
  ('kanji', '若', null, array['young','if','perhaps','possibly','low number','immature']::text[], null, array['ジャク','ニャク','ニャ']::text[], array['わか.い','わか-','も.しくわ','も.し','も.しくは','ごと.し']::text[], 8, '{}'::text[], null, '若い（わかい）young
若々しい（わかわかしい）youthful', 3, array['N3']::text[]),
  ('kanji', '詞', null, array['part of speech','words','poetry']::text[], null, array['シ']::text[], array['ことば']::text[], 12, '{}'::text[], null, '名詞（めいし）noun
動詞（どうし）verb
助詞（じょし）(gram) particle(s)
台詞（せりふ）speech', 2, array['N2']::text[]),
  ('kanji', '歴', null, array['curriculum','continuation','passage of time']::text[], null, array['レキ','レッキ']::text[], '{}'::text[], 14, '{}'::text[], null, '歴史（れきし）history
学歴（がくれき）academic background', 2, array['N2']::text[]),
  ('kanji', '冊', null, array['tome','counter for books','volume']::text[], null, array['サツ','サク']::text[], array['ふみ']::text[], 5, '{}'::text[], null, '～冊（～さつ）counter for books', 2, array['N2']::text[]),
  ('kanji', '宇', null, array['eaves','roof','house','heaven']::text[], null, array['ウ']::text[], '{}'::text[], 6, '{}'::text[], null, '宇宙（うちゅう）universe', 2, array['N2']::text[]),
  ('kanji', '忙', null, array['busy','occupied','restless']::text[], null, array['ボウ','モウ']::text[], array['いそが.しい','せわ.しい','おそ.れる','うれえるさま']::text[], 6, '{}'::text[], null, '忙しい（いそがしい）busy (people, days)', 3, array['N3']::text[]),
  ('kanji', '団', null, array['group','association']::text[], null, array['ダン','トン']::text[], array['かたまり','まる.い']::text[], 6, '{}'::text[], null, '布団（ふとん）futon
集団（しゅうだん）group
団体（だんたい）organization
～団（～だん）group', 2, array['N2']::text[]),
  ('kanji', '暴', null, array['outburst','rave','fret','force','violence','cruelty','outrage']::text[], null, array['ボウ','バク']::text[], array['あば.く','あば.れる']::text[], 15, '{}'::text[], null, '乱暴（らんぼう）rude
暴れる（あばれる）to act violently', 2, array['N2']::text[]),
  ('kanji', '混', null, array['mix','blend','confuse']::text[], null, array['コン']::text[], array['ま.じる','-ま.じり','ま.ざる','ま.ぜる','こ.む']::text[], 11, '{}'::text[], null, '混雑（こんざつ）confusion
混乱（こんらん）chaos
混ざる（まざる）to be mixed
混じる（まじる）to be mixed', 2, array['N2']::text[]),
  ('kanji', '乱', null, array['riot','war','disorder','disturb']::text[], null, array['ラン','ロン']::text[], array['みだ.れる','みだ.る','みだ.す','みだ','おさ.める','わた.る']::text[], 7, '{}'::text[], null, '混乱（こんらん）chaos
乱暴（らんぼう）rude', 2, array['N2']::text[]),
  ('kanji', '徒', null, array['on foot','junior','emptiness','vanity','futility','uselessness','ephemeral thing','gang','set','party','people']::text[], null, array['ト']::text[], array['いたずら','あだ']::text[], 10, '{}'::text[], null, '生徒（せいと）student', 3, array['N3']::text[]),
  ('kanji', '得', null, array['gain','get','find','earn','acquire','can','may','able to','profit','advantage','benefit']::text[], null, array['トク']::text[], array['え.る','う.る']::text[], 11, '{}'::text[], null, '得る（える）to get
得る（うる）to get
得意（とくい）pride
納得（なっとく）consent', 3, array['N3']::text[]),
  ('kanji', '改', null, array['reformation','change','modify','mend','renew','examine','inspect','search']::text[], null, array['カイ']::text[], array['あらた.める','あらた.まる']::text[], 7, '{}'::text[], null, '改善（かいぜん）betterment
改札（かいさつ）examination of tickets
改正（かいせい）revision
改造（かいぞう）remodeling', 2, array['N2']::text[]),
  ('kanji', '続', null, array['continue','series','sequel']::text[], null, array['ゾク','ショク','コウ','キョウ']::text[], array['つづ.く','つづ.ける','つぐ.ない']::text[], 13, '{}'::text[], null, '続く（つづく）to be continued
続ける（つづける）to continue
～続ける（～つづける）to continue doing ~
連続（れんぞく）consecutive', 3, array['N3']::text[]),
  ('kanji', '連', null, array['take along','lead','join','connect','party','gang','clique']::text[], null, array['レン']::text[], array['つら.なる','つら.ねる','つ.れる','-づ.れ']::text[], 10, '{}'::text[], null, '連絡（れんらく）communication
連れる（つれる）to lead
関連（かんれん）relation
連想（れんそう）association (of ideas)', 3, array['N3']::text[]),
  ('kanji', '困', null, array['quandary','become distressed','annoyed']::text[], null, array['コン']::text[], array['こま.る']::text[], 7, '{}'::text[], null, '困る（こまる）to be bothered
困難（こんなん）difficulty', 3, array['N3']::text[]),
  ('kanji', '絡', null, array['entwine','coil around','get caught in']::text[], null, array['ラク']::text[], array['から.む','から.まる']::text[], 12, '{}'::text[], null, '連絡（れんらく）communication', 2, array['N2']::text[]),
  ('kanji', '比', null, array['compare','race','ratio','philippines']::text[], null, array['ヒ']::text[], array['くら.べる']::text[], 4, array['北']::text[], '北 north: two people back to back. 比 compare: two ヒ side by side.', '比べる（くらべる）to compare
比較（ひかく）comparison
比較的（ひかくてき）comparatively', 2, array['N2']::text[]),
  ('kanji', '機', null, array['loom','mechanism','machine','airplane','opportunity','potency','efficacy','occasion']::text[], null, array['キ']::text[], array['はた']::text[], 16, '{}'::text[], null, '飛行機（ひこうき）airplane
機会（きかい）chance
機械（きかい）machine
機関（きかん）engine', 3, array['N3']::text[]),
  ('kanji', '飛', null, array['fly','skip (pages)','scatter']::text[], null, array['ヒ']::text[], array['と.ぶ','と.ばす','-と.ばす']::text[], 9, '{}'::text[], null, '飛ぶ（とぶ）to fly
飛行機（ひこうき）airplane
飛行場（ひこうじょう）airport
飛行（ひこう）aviation', 3, array['N3']::text[]),
  ('kanji', '害', null, array['harm','injury']::text[], null, array['ガイ']::text[], '{}'::text[], 10, '{}'::text[], null, '障害（しょうがい）obstacle
損害（そんがい）damage
被害（ひがい）damage
公害（こうがい）public nuisance', 3, array['N3']::text[]),
  ('kanji', '余', null, array['too much','myself','surplus','other','remainder']::text[], null, array['ヨ']::text[], array['あま.る','あま.り','あま.す','あんま.り']::text[], 7, '{}'::text[], null, '余り（あまり）not very
余分（よぶん）extra
余裕（よゆう）excess
余る（あまる）to be left over', 3, array['N3']::text[]),
  ('kanji', '難', null, array['difficult','impossible','trouble','accident','defect']::text[], null, array['ナン']::text[], array['かた.い','-がた.い','むずか.しい','むづか.しい','むつか.しい','-にく.い']::text[], 18, array['漢']::text[], 'Both share the 𦰩 body. 漢 Chinese adds 氵 water on the left. 難 difficult adds 隹 bird on the right.', '難しい（むずかしい）difficult
困難（こんなん）difficulty
災難（さいなん）calamity
盗難（とうなん）theft', 3, array['N3']::text[]),
  ('kanji', '被', null, array['incur','cover','veil','brood over','shelter','wear','put on','be exposed (film)','receiving']::text[], null, array['ヒ']::text[], array['こうむ.る','おお.う','かぶ.る','かぶ.せる']::text[], 10, '{}'::text[], null, '被る（かぶる）to wear
被害（ひがい）damage
被せる（かぶせる）to cover (with something)', 2, array['N2']::text[]),
  ('kanji', '震', null, array['quake','shake','tremble','quiver','shiver']::text[], null, array['シン']::text[], array['ふる.う','ふる.える']::text[], 15, '{}'::text[], null, '地震（じしん）earthquake
震える（ふるえる）to shiver', 2, array['N2']::text[]),
  ('kanji', '械', null, array['contraption','fetter','machine','instrument']::text[], null, array['カイ']::text[], array['かせ']::text[], 11, '{}'::text[], null, '機械（きかい）machine
器械（きかい）instrument', 2, array['N2']::text[]),
  ('kanji', '確', null, array['assurance','firm','tight','hard','solid','confirm','clear','evident']::text[], null, array['カク','コウ']::text[], array['たし.か','たし.かめる']::text[], 15, '{}'::text[], null, '確か（たしか）if I remember correctly
正確（せいかく）accurate
確実（かくじつ）certainty
確認（かくにん）affirmation', 3, array['N3']::text[]),
  ('kanji', '個', null, array['individual','counter for articles']::text[], null, array['コ','カ']::text[], '{}'::text[], 10, '{}'::text[], null, '～個（～こ）counter for small items (e.g., fruits, cups)
個人（こじん）individual
個々（ここ）individual
個体（こたい）an individual', 2, array['N2']::text[])
on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set
  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,
  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,
  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags,
  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);

insert into public.cards ("type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags") values
  ('kanji', '圧', null, array['pressure','push','overwhelm','oppress','dominate']::text[], null, array['アツ','エン','オウ']::text[], array['お.す','へ.す','おさ.える','お.さえる']::text[], 5, '{}'::text[], null, '圧縮（あっしゅく）compression
気圧（きあつ）atmospheric pressure
血圧（けつあつ）blood pressure', 2, array['N2']::text[]),
  ('kanji', '在', null, array['exist','outskirts','suburbs','located in']::text[], null, array['ザイ']::text[], array['あ.る']::text[], 6, '{}'::text[], null, '在る（ある）to be
現在（げんざい）now (same as 今 (いま))
存在（そんざい）existence
滞在（たいざい）stay', 3, array['N3']::text[]),
  ('kanji', '夢', null, array['dream','vision','illusion']::text[], null, array['ム','ボウ']::text[], array['ゆめ','ゆめ.みる','くら.い']::text[], 13, '{}'::text[], null, '夢中（むちゅう）crush', 3, array['N3']::text[]),
  ('kanji', '産', null, array['products','bear','give birth','yield','childbirth','native','property']::text[], null, array['サン']::text[], array['う.む','う.まれる','うぶ-','む.す']::text[], 11, '{}'::text[], null, '生産（せいさんする）production
産業（さんぎょう）industry
お土産（おみやげ）souvenir
財産（ざいさん）property', 3, array['N3']::text[]),
  ('kanji', '倒', null, array['overthrow','fall','collapse','drop','break down']::text[], null, array['トウ']::text[], array['たお.れる','-だお.れ','たお.す','さかさま','さかさ','さかしま']::text[], 10, '{}'::text[], null, '倒れる（たおれる）to collapse
面倒（めんどう）trouble
倒す（たおす）to throw down
倒産（とうさん）(corporate) bankruptcy', 3, array['N3']::text[]),
  ('kanji', '厚', null, array['thick','heavy','rich','kind','cordial','brazen','shameless']::text[], null, array['コウ']::text[], array['あつ.い','あか']::text[], 9, '{}'::text[], null, '厚い（あつい）kind
厚かましい（あつかましい）impudent', 2, array['N2']::text[]),
  ('kanji', '妻', null, array['wife','spouse']::text[], null, array['サイ']::text[], array['つま']::text[], 8, '{}'::text[], null, '夫妻（ふさい）man and wife', 3, array['N3']::text[]),
  ('kanji', '議', null, array['deliberation','consultation','debate','consideration']::text[], null, array['ギ']::text[], '{}'::text[], 20, '{}'::text[], null, '会議（かいぎ）business meeting
会議室（かいぎしつ）conference room
議員（ぎいん）member of the Diet
議会（ぎかい）Diet', 3, array['N3']::text[]),
  ('kanji', '犯', null, array['crime','sin','offense']::text[], null, array['ハン','ボン']::text[], array['おか.す']::text[], 5, '{}'::text[], null, '犯罪（はんざい）crime
犯人（はんにん）offender
防犯（ぼうはん）prevention of crime', 3, array['N3']::text[]),
  ('kanji', '罪', null, array['guilt','sin','crime','fault','blame','offense']::text[], null, array['ザイ']::text[], array['つみ']::text[], 13, '{}'::text[], null, '犯罪（はんざい）crime', 3, array['N3']::text[]),
  ('kanji', '防', null, array['ward off','defend','protect','resist']::text[], null, array['ボウ']::text[], array['ふせ.ぐ']::text[], 7, '{}'::text[], null, '消防（しょうぼう）fire fighting
予防（よぼう）prevention
防ぐ（ふせぐ）to defend (against)
防～（ぼう～）~ prevention', 2, array['N2']::text[]),
  ('kanji', '論', null, array['argument','discourse']::text[], null, array['ロン']::text[], '{}'::text[], 15, '{}'::text[], null, '議論（ぎろん）argument
結論（けつろん）conclusion
論争（ろんそう）controversy
論文（ろんぶん）thesis', 3, array['N3']::text[]),
  ('kanji', '経', null, array['sutra','longitude','pass thru','expire','warp']::text[], null, array['ケイ','キョウ','キン']::text[], array['へ.る','た.つ','たていと','はか.る','のり']::text[], 11, '{}'::text[], null, '経済（けいざい）economics
経験（けいけんする）experience
神経（しんけい）nerve
経営（けいえい）management', 3, array['N3']::text[]),
  ('kanji', '史', null, array['history','chronicle']::text[], null, array['シ']::text[], '{}'::text[], 5, '{}'::text[], null, '歴史（れきし）history
女史（じょし）Ms.
～史（～し）history of ~', 2, array['N2']::text[]),
  ('kanji', '済', null, array['settle (debt, etc.)','relieve (burden)','finish','come to an end','excusable','need not']::text[], null, array['サイ','セイ']::text[], array['す.む','-ず.み','-ずみ','す.まない','す.ます','-す.ます','すく.う','な.す','わたし','わた.る']::text[], 11, '{}'::text[], null, '経済（けいざい）economics
済む（すむ）to finish
済ませる（すませる）to be finished
～済（～ずみ）finished', 3, array['N3']::text[]),
  ('kanji', '委', null, array['committee','entrust to','leave to','devote','discard']::text[], null, array['イ']::text[], array['ゆだ.ねる']::text[], 8, '{}'::text[], null, '委員（いいん）committee member', 2, array['N2']::text[]),
  ('kanji', '判', null, array['judgement','signature','stamp','seal']::text[], null, array['ハン','バン']::text[], array['わか.る']::text[], 7, '{}'::text[], null, '審判（しんぱん）umpire
裁判（さいばん）trial
判断（はんだん）judgment
批判（ひはん）criticism', 3, array['N3']::text[]),
  ('kanji', '制', null, array['system','law','rule']::text[], null, array['セイ']::text[], '{}'::text[], 8, '{}'::text[], null, '制限（せいげん）restriction
制度（せいど）system
規制（きせい）regulation
制作（せいさく）work (e.g., film, book)', 3, array['N3']::text[]),
  ('kanji', '務', null, array['task','duties']::text[], null, array['ム']::text[], array['つと.める']::text[], 11, '{}'::text[], null, '事務所（じむしょ）office
公務員（こうむいん）government worker
義務（ぎむ）duty
務め（つとめ）duty', 3, array['N3']::text[]),
  ('kanji', '査', null, array['investigate']::text[], null, array['サ']::text[], '{}'::text[], 9, '{}'::text[], null, '検査（けんさ）inspection
調査（ちょうさ）survey
捜査（そうさ）search (esp. in criminal investigations, investigation)
巡査（じゅんさ）policeman', 2, array['N2']::text[]),
  ('kanji', '総', null, array['general','whole','all','full','total']::text[], null, array['ソウ']::text[], array['す.べて','すべ.て','ふさ']::text[], 14, '{}'::text[], null, '総～（そう～）gross
総理大臣（そうりだいじん）Prime Minister', 2, array['N2']::text[]),
  ('kanji', '設', null, array['establishment','provision','prepare']::text[], null, array['セツ']::text[], array['もう.ける']::text[], 11, '{}'::text[], null, '設計（せっけい）plan
建設（けんせつ）construction
設備（せつび）equipment', 2, array['N2']::text[]),
  ('kanji', '資', null, array['assets','resources','capital','funds','data','be conducive to','contribute to']::text[], null, array['シ']::text[], '{}'::text[], 13, '{}'::text[], null, '資源（しげん）resources
資本（しほん）funds
資格（しかく）qualifications
資料（しりょう）materials', 3, array['N3']::text[]),
  ('kanji', '権', null, array['authority','power','rights']::text[], null, array['ケン','ゴン']::text[], array['おもり','かり','はか.る']::text[], 15, '{}'::text[], null, '権利（けんり）right', 3, array['N3']::text[]),
  ('kanji', '件', null, array['affair','case','matter','item']::text[], null, array['ケン']::text[], array['くだん']::text[], 6, '{}'::text[], null, '事件（じけん）event
条件（じょうけん）conditions', 3, array['N3']::text[]),
  ('kanji', '断', null, array['severance','decline','refuse','apologize','warn','dismiss','prohibit','decision','judgement','cutting']::text[], null, array['ダン']::text[], array['た.つ','ことわ.る','さだ.める']::text[], 11, '{}'::text[], null, '横断（おうだん）crossing
断る（ことわる）to refuse
判断（はんだん）judgment
断つ（たつ）to sever', 3, array['N3']::text[]),
  ('kanji', '任', null, array['responsibility','duty','term','entrust to','appoint']::text[], null, array['ニン']::text[], array['まか.せる','まか.す']::text[], 6, '{}'::text[], null, '責任（せきにん）duty
任せる（まかせる）to entrust to another
就任（しゅうにん）inauguration', 3, array['N3']::text[]),
  ('kanji', '責', null, array['blame','condemn','censure']::text[], null, array['セキ']::text[], array['せ.める']::text[], 11, '{}'::text[], null, '責任（せきにん）duty
責める（せめる）to condemn', 3, array['N3']::text[]),
  ('kanji', '省', null, array['focus','government ministry','conserve']::text[], null, array['セイ','ショウ']::text[], array['かえり.みる','はぶ.く']::text[], 9, '{}'::text[], null, '省略（しょうりゃく）omission
省く（はぶく）to omit
反省（はんせい）reflection
～省（～しょう）kind of ministry', 2, array['N2']::text[]),
  ('kanji', '増', null, array['increase','add','augment','gain','promote']::text[], null, array['ゾウ']::text[], array['ま.す','ま.し','ふ.える','ふ.やす']::text[], 14, '{}'::text[], null, '増える（ふえる）to increase
増加（ぞうか）increase
増す（ます）to increase
増やす（ふやす）to increase (v.t.)', 3, array['N3']::text[]),
  ('kanji', '税', null, array['tax','duty']::text[], null, array['ゼイ']::text[], '{}'::text[], 12, '{}'::text[], null, '税金（ぜいきん）tax
課税（かぜい）taxation
税関（ぜいかん）customs
免税（めんぜい）tax exemption', 2, array['N2']::text[]),
  ('kanji', '解', null, array['unravel','notes','key','explanation','understanding','untie','undo','solve','answer','cancel','absolve','explain','minute']::text[], null, array['カイ','ゲ']::text[], array['と.く','と.かす','と.ける','ほど.く','ほど.ける','わか.る','さと.る']::text[], 13, '{}'::text[], null, '解決（かいけつ）settlement
解釈（かいしゃく）explanation
見解（けんかい）opinion
誤解（ごかい）misunderstanding', 3, array['N3']::text[]),
  ('kanji', '際', null, array['occasion','side','edge','verge','dangerous','adventurous','indecent','time','when']::text[], null, array['サイ']::text[], array['きわ','-ぎわ']::text[], 14, '{}'::text[], null, '国際（こくさい）international
実際（じっさい）in fact
交際（こうさい）friendship', 3, array['N3']::text[]),
  ('kanji', '認', null, array['acknowledge','witness','discern','recognize','appreciate','believe']::text[], null, array['ニン']::text[], array['みと.める','したた.める']::text[], 14, '{}'::text[], null, '承認（しょうにん）recognition
確認（かくにん）affirmation
認める（みとめる）to recognize', 3, array['N3']::text[]),
  ('kanji', '過', null, array['overdo','exceed','go beyond','error']::text[], null, array['カ']::text[], array['す.ぎる','-す.ぎる','-す.ぎ','す.ごす','あやま.つ','あやま.ち','よ.ぎる']::text[], 12, '{}'::text[], null, '過ぎる（すぎる）to exceed
過去（かこ）past
過程（かてい）process
通過（つうか）passage through', 3, array['N3']::text[]),
  ('kanji', '寝', null, array['lie down','sleep','rest','bed','remain unsold']::text[], null, array['シン']::text[], array['ね.る','ね.かす','い.ぬ','みたまや','や.める']::text[], 13, '{}'::text[], null, '寝る（ねる）to sleep
寝坊（ねぼう）sleeping in late
寝台（しんだい）bed
寝巻（ねまき）sleep-wear', 3, array['N3']::text[]),
  ('kanji', '各', null, array['each','every','either']::text[], null, array['カク']::text[], array['おのおの']::text[], 6, '{}'::text[], null, '各々（おのおの）each
各～（かく～）every ~
各自（かくじ）individual
各地（かくち）various parts of the country', 2, array['N2']::text[]),
  ('kanji', '置', null, array['placement','put','set','deposit','leave behind','keep','employ','pawn']::text[], null, array['チ']::text[], array['お.く','-お.き']::text[], 13, '{}'::text[], null, '置く（おく）to put
位置（いち）place
装置（そうち）equipment
物置（ものおき）storage room', 3, array['N3']::text[]),
  ('kanji', '費', null, array['expense','cost','spend','consume','waste']::text[], null, array['ヒ']::text[], array['つい.やす','つい.える']::text[], 12, '{}'::text[], null, '消費（しょうひ）consumption
費用（ひよう）cost
～費（～ひ）cost of ~', 3, array['N3']::text[]),
  ('kanji', '勢', null, array['forces','energy','military strength']::text[], null, array['セイ','ゼイ']::text[], array['いきお.い','はずみ']::text[], 13, '{}'::text[], null, '大勢（おおぜい）great number of people
勢い（いきおい）force
姿勢（しせい）attitude', 2, array['N2']::text[]),
  ('kanji', '営', null, array['occupation','camp','perform','build','conduct (business)']::text[], null, array['エイ']::text[], array['いとな.む','いとな.み']::text[], 12, '{}'::text[], null, '営業（えいぎょう）business
経営（けいえい）management', 2, array['N2']::text[]),
  ('kanji', '示', null, array['show','indicate','point out','express','display']::text[], null, array['ジ','シ']::text[], array['しめ.す']::text[], 5, '{}'::text[], null, '示す（しめす）to show
掲示（けいじ）notice
表示（ひょうじ）display', 3, array['N3']::text[]),
  ('kanji', '領', null, array['jurisdiction','dominion','territory','fief','reign']::text[], null, array['リョウ']::text[], array['えり']::text[], 14, '{}'::text[], null, '大統領（だいとうりょう）president
～領（～りょう）territory
要領（ようりょう）gist
領事（りょうじ）consul', 2, array['N2']::text[]),
  ('kanji', '副', null, array['vice-','assistant','aide','duplicate','copy']::text[], null, array['フク']::text[], '{}'::text[], 11, '{}'::text[], null, '副～（ふく～）vice ~
副詞（ふくし）adverb', 2, array['N2']::text[]),
  ('kanji', '観', null, array['outlook','look','appearance','condition','view']::text[], null, array['カン']::text[], array['み.る','しめ.す']::text[], 18, '{}'::text[], null, '観客（かんきゃく）audience
観光（かんこう）sightseeing
観察（かんさつ）observation
～観（かん）feeling', 3, array['N3']::text[]),
  ('kanji', '値', null, array['price','cost','value']::text[], null, array['チ']::text[], array['ね','あたい']::text[], 10, '{}'::text[], null, '値段（ねだん）price
価値（かち）value', 3, array['N3']::text[]),
  ('kanji', '吸', null, array['suck','imbibe','inhale','sip']::text[], null, array['キュウ']::text[], array['す.う']::text[], 6, '{}'::text[], null, '吸う（すう）to breathe in
吸収（きゅうしゅう）absorption
呼吸（こきゅう）breath', 3, array['N3']::text[]),
  ('kanji', '域', null, array['range','region','limits','stage','level']::text[], null, array['イキ']::text[], '{}'::text[], 11, '{}'::text[], null, '地域（ちいき）area
区域（くいき）zone
流域（りゅういき）(river) basin', 2, array['N2']::text[]),
  ('kanji', '状', null, array['status quo','conditions','circumstances','form','appearance']::text[], null, array['ジョウ']::text[], '{}'::text[], 7, '{}'::text[], null, '状況（じょうきょう）state of affairs
症状（しょうじょう）symptoms
状態（じょうたい）condition
現状（げんじょう）present condition', 3, array['N3']::text[]),
  ('kanji', '収', null, array['income','obtain','reap','pay','supply','store']::text[], null, array['シュウ']::text[], array['おさ.める','おさ.まる']::text[], 4, '{}'::text[], null, '収穫（しゅうかく）harvest
収入（しゅうにゅう）income
吸収（きゅうしゅう）absorption
収める（おさめる）to store to pay', 3, array['N3']::text[]),
  ('kanji', '停', null, array['halt','stopping']::text[], null, array['テイ']::text[], array['と.める','と.まる']::text[], 11, '{}'::text[], null, '停電（ていでん）failure of electricity
停留所（ていりゅうじょ）bus or tram stop
停止（ていし）suspension
停車（ていしゃ）stopping (e.g., train)', 2, array['N2']::text[]),
  ('kanji', '革', null, array['leather','skin','reform','become serious']::text[], null, array['カク']::text[], array['かわ']::text[], 9, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '職', null, array['post','employment','work']::text[], null, array['ショク','ソク']::text[], '{}'::text[], 18, '{}'::text[], null, '就職（しゅうしょく）finding employment
職業（しょくぎょう）occupation
職人（しょくにん）artisan
職場（しょくば）workplace', 3, array['N3']::text[]),
  ('kanji', '規', null, array['standard','measure']::text[], null, array['キ']::text[], '{}'::text[], 11, '{}'::text[], null, '規則（きそく）rule
規制（きせい）regulation
正規（せいき）regular
規準（きじゅん）standard', 3, array['N3']::text[]),
  ('kanji', '割', null, array['proportion','comparatively','divide','cut','separate','split']::text[], null, array['カツ']::text[], array['わ.る','わり','わ.り','わ.れる','さ.く']::text[], 12, '{}'::text[], null, '割合（わりあい）rate
割れる（われる）to break
役割（やくわり）assigning (allotment of) parts
割る（わる）to divide', 3, array['N3']::text[]),
  ('kanji', '演', null, array['performance','act','play','render','stage']::text[], null, array['エン']::text[], '{}'::text[], 14, '{}'::text[], null, '演技（えんぎ）acting
演説（えんぜつ）speech
演奏（えんそう）musical performance
講演（こうえん）lecture', 3, array['N3']::text[]),
  ('kanji', '律', null, array['rhythm','law','regulation','gauge','control']::text[], null, array['リツ','リチ','レツ']::text[], '{}'::text[], 9, '{}'::text[], null, '法律（ほうりつ）law
規律（きりつ）order', 2, array['N2']::text[]),
  ('kanji', '師', null, array['expert','teacher','master','model','exemplar','army (incl. counter)','war']::text[], null, array['シ']::text[], array['いくさ']::text[], 10, '{}'::text[], null, '医師（いし）doctor
技師（ぎし）engineer
講師（こうし）lecturer
漁師（りょうし）fisherman', 3, array['N3']::text[]),
  ('kanji', '準', null, array['semi-','correspond to','proportionate to','conform','imitate']::text[], null, array['ジュン']::text[], array['じゅん.じる','じゅん.ずる','なぞら.える','のり','ひと.しい','みずもり']::text[], 13, '{}'::text[], null, '準備（じゅんびする）prepare
水準（すいじゅん）level
基準（きじゅん）standard
規準（きじゅん）standard', 2, array['N2']::text[]),
  ('kanji', '則', null, array['rule','follow','based on','model after']::text[], null, array['ソク']::text[], array['のっと.る']::text[], 9, '{}'::text[], null, '規則（きそく）rule
法則（ほうそく）law
不規則（ふきそく）irregularity', 2, array['N2']::text[]),
  ('kanji', '備', null, array['equip','provision','preparation']::text[], null, array['ビ']::text[], array['そな.える','そな.わる','つぶさ.に']::text[], 12, '{}'::text[], null, '準備（じゅんびする）prepare
設備（せつび）equipment
備える（そなえる）to prepare
警備（けいび）defense', 3, array['N3']::text[]),
  ('kanji', '導', null, array['guidance','leading','conduct','usher']::text[], null, array['ドウ']::text[], array['みちび.く']::text[], 15, '{}'::text[], null, '指導（しどう）leadership', 2, array['N2']::text[]),
  ('kanji', '優', null, array['tenderness','excel','surpass','actor','superiority','gentleness']::text[], null, array['ユウ','ウ']::text[], array['やさ.しい','すぐ.れる','まさ.る']::text[], 17, '{}'::text[], null, '優しい（やさしい）kind (person)
女優（じょゆう）actress
優秀（ゆうしゅう）superiority
優勝（ゆうしょう）overall victory', 3, array['N3']::text[]),
  ('kanji', '宅', null, array['home','house','residence','our house','my husband']::text[], null, array['タク']::text[], '{}'::text[], 6, '{}'::text[], null, 'お宅（おたく）(someone else''s) house
住宅（じゅうたく）resident
帰宅（きたく）returning home
自宅（じたく）one''s own home (same as 自分の家 (じぶんのいえ))', 3, array['N3']::text[]),
  ('kanji', '現', null, array['present','existing','actual']::text[], null, array['ゲン']::text[], array['あらわ.れる','あらわ.す','うつつ','うつ.つ']::text[], 11, '{}'::text[], null, '実現（じつげん）implementation
現す（あらわす）to show
現れ（あらわれ）expression
現金（げんきん）cash', 3, array['N3']::text[]),
  ('kanji', '乳', null, array['milk','breasts']::text[], null, array['ニュウ']::text[], array['ちち','ち']::text[], 8, '{}'::text[], null, '牛乳（ぎゅうにゅう）milk', 2, array['N2']::text[]),
  ('kanji', '呼', null, array['call','call out to','invite']::text[], null, array['コ']::text[], array['よ.ぶ']::text[], 8, '{}'::text[], null, '呼ぶ（よぶ）to call (one''s name)
呼吸（こきゅう）breath
呼び出す（よびだす）to summon
呼び掛ける（よびかける）to call out to', 3, array['N3']::text[]),
  ('kanji', '城', null, array['castle']::text[], null, array['ジョウ','セイ']::text[], array['しろ']::text[], 9, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '担', null, array['shouldering','carry','raise','bear']::text[], null, array['タン']::text[], array['かつ.ぐ','にな.う']::text[], 8, '{}'::text[], null, '担当（たんとう）(in) charge
担ぐ（かつぐ）to shoulder', 2, array['N2']::text[]),
  ('kanji', '額', null, array['forehead','tablet','plaque','framed picture','sum','amount','volume']::text[], null, array['ガク']::text[], array['ひたい']::text[], 18, '{}'::text[], null, '金額（きんがく）amount of money', 2, array['N2']::text[]),
  ('kanji', '違', null, array['difference','differ']::text[], null, array['イ']::text[], array['ちが.う','ちが.い','ちが.える','-ちが.える','たが.う','たが.える']::text[], 13, '{}'::text[], null, '違う（ちがう）to be different
間違える（まちがえる）to make a mistake
違反（いはん）violation (of law)
違い（ちがい）difference', 3, array['N3']::text[]),
  ('kanji', '輸', null, array['transport','send','be inferior']::text[], null, array['ユ','シュ']::text[], '{}'::text[], 16, '{}'::text[], null, '輸入（ゆにゅう）import
輸出（ゆしゅつする）export
輸血（ゆけつ）blood transfusion
輸送（ゆそう）transport', 2, array['N2']::text[]),
  ('kanji', '燃', null, array['burn','blaze','glow']::text[], null, array['ネン']::text[], array['も.える','も.やす','も.す']::text[], 16, '{}'::text[], null, '燃える（もえる）to burn
燃やす（もやす）to burn', 2, array['N2']::text[]),
  ('kanji', '祝', null, array['celebrate','congratulate']::text[], null, array['シュク','シュウ']::text[], array['いわ.う']::text[], 9, '{}'::text[], null, 'お祝い（おいわい）congratulation
祝い（いわい）celebration
祝う（いわう）to congratulate
祝日（しゅくじつ）national holiday', 2, array['N2']::text[]),
  ('kanji', '届', null, array['deliver','reach','arrive','report','notify','forward']::text[], null, array['カイ']::text[], array['とど.ける','-とど.け','とど.く']::text[], 8, '{}'::text[], null, '届ける（とどける）to deliver (v.t.)
届く（とどく）to reach', 2, array['N2']::text[]),
  ('kanji', '肩', null, array['shoulder']::text[], null, array['ケン']::text[], array['かた']::text[], 8, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '腕', null, array['arm','ability','talent']::text[], null, array['ワン']::text[], array['うで']::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '腰', null, array['loins','hips','waist','low wainscoting']::text[], null, array['ヨウ']::text[], array['こし']::text[], 13, '{}'::text[], null, '腰掛（こしかけ）seat
腰掛け（こしかけ）seat
腰掛ける（こしかける）to sit (down)', 2, array['N2']::text[]),
  ('kanji', '触', null, array['contact','touch','feel','hit','proclaim','announce','conflict']::text[], null, array['ショク']::text[], array['ふ.れる','さわ.る','さわ']::text[], 13, '{}'::text[], null, '触る（さわる）to touch
触れる（ふれる）to touch', 2, array['N2']::text[]),
  ('kanji', '層', null, array['stratum','social class','layer','story','floor']::text[], null, array['ソウ']::text[], '{}'::text[], 14, '{}'::text[], null, '一層（いっそう）much more
高層（こうそう）tall
大層（たいそう）very much', 2, array['N2']::text[]),
  ('kanji', '型', null, array['mould','type','model']::text[], null, array['ケイ']::text[], array['かた','-がた']::text[], 9, '{}'::text[], null, '典型（てんけい）type', 2, array['N2']::text[]),
  ('kanji', '庁', null, array['government office']::text[], null, array['チョウ','テイ']::text[], array['やくしょ']::text[], 5, '{}'::text[], null, '～庁（～ちょう）office
官庁（かんちょう）government office
県庁（けんちょう）prefectural office', 2, array['N2']::text[]),
  ('kanji', '差', null, array['distinction','difference','variation','discrepancy','margin','balance']::text[], null, array['サ']::text[], array['さ.す','さ.し']::text[], 10, '{}'::text[], null, '差す（さす）to raise (stretch out) hands
交差点（こうさてん）intersection
差し上げる（さしあげる）-- humble expression for あげる --
差別（さべつ）discrimination', 3, array['N3']::text[]),
  ('kanji', '管', null, array['pipe','tube','wind instrument','drunken talk','control','jurisdiction']::text[], null, array['カン']::text[], array['くだ']::text[], 14, '{}'::text[], null, '管理（かんり）control
血管（けっかん）blood vessel', 2, array['N2']::text[]),
  ('kanji', '象', null, array['elephant','pattern after','imitate','image','shape','sign (of the times)']::text[], null, array['ショウ','ゾウ']::text[], array['かたど.る']::text[], 12, '{}'::text[], null, '印象（いんしょう）impression
現象（げんしょう）phenomenon
対象（たいしょう）target
抽象（ちゅうしょう）abstract', 2, array['N2']::text[]),
  ('kanji', '量', null, array['quantity','measure','weight','amount','consider','estimate','surmise']::text[], null, array['リョウ']::text[], array['はか.る']::text[], 12, '{}'::text[], null, '量る（はかる）to measure
重量（じゅうりょう）heavyweight
測量（そくりょう）measurement
分量（ぶんりょう）amount', 2, array['N2']::text[]),
  ('kanji', '境', null, array['boundary','border','region']::text[], null, array['キョウ','ケイ']::text[], array['さかい']::text[], 14, '{}'::text[], null, '環境（かんきょう）environment
国境（こっきょう）national or state border
境界（きょうかい）boundary', 2, array['N2']::text[]),
  ('kanji', '武', null, array['warrior','military','chivalry','arms']::text[], null, array['ブ','ム']::text[], array['たけ','たけ.し']::text[], 8, '{}'::text[], null, '武器（ぶき）weapon
武士（ぶし）warrior', 2, array['N2']::text[]),
  ('kanji', '質', null, array['substance','quality','matter','temperament']::text[], null, array['シツ','シチ','チ']::text[], array['たち','ただ.す','もと','わりふ']::text[], 15, '{}'::text[], null, '質問（しつもん）question
性質（せいしつ）nature
物質（ぶっしつ）material
素質（そしつ）talent', 4, array['N4']::text[]),
  ('kanji', '述', null, array['mention','state','speak','relate']::text[], null, array['ジュツ']::text[], array['の.べる']::text[], 8, '{}'::text[], null, '述べる（のべる）to state
述語（じゅつご）predicate', 2, array['N2']::text[]),
  ('kanji', '供', null, array['submit','offer','present','serve (meal)','accompany']::text[], null, array['キョウ','ク','クウ','グ']::text[], array['そな.える','とも','-ども']::text[], 8, '{}'::text[], null, '子供（こども）child(ren)
供給（きょうきゅう）supply', 3, array['N3']::text[]),
  ('kanji', '販', null, array['marketing','sell','trade']::text[], null, array['ハン']::text[], '{}'::text[], 11, '{}'::text[], null, '販売（はんばい）sale', 2, array['N2']::text[]),
  ('kanji', '限', null, array['limit','restrict','to best of ability']::text[], null, array['ゲン']::text[], array['かぎ.る','かぎ.り','-かぎ.り']::text[], 9, '{}'::text[], null, '制限（せいげん）restriction
限る（かぎる）to restrict
期限（きげん）deadline
限界（げんかい）limit', 3, array['N3']::text[]),
  ('kanji', '与', null, array['bestow','participate in','give','award','impart','provide','cause','gift','godsend']::text[], null, array['ヨ']::text[], array['あた.える','あずか.る','くみ.する','ともに']::text[], 3, '{}'::text[], null, '与える（あたえる）to give
給与（きゅうよ）salary', 3, array['N3']::text[]),
  ('kanji', '含', null, array['contain','include','hold in the mouth','bear in mind','understand','cherish']::text[], null, array['ガン']::text[], array['ふく.む','ふく.める']::text[], 7, '{}'::text[], null, '含む（ふくむ）to contain
含める（ふくめる）to include', 2, array['N2']::text[]),
  ('kanji', '況', null, array['condition','situation']::text[], null, array['キョウ']::text[], array['まし.て','いわ.んや','おもむき']::text[], 8, '{}'::text[], null, '状況（じょうきょう）state of affairs', 2, array['N2']::text[]),
  ('kanji', '渡', null, array['transit','ford','ferry','cross','import','deliver','diameter','migrate']::text[], null, array['ト']::text[], array['わた.る','-わた.る','わた.す']::text[], 12, '{}'::text[], null, '渡す（わたす）to hand (something) over (v.t.)
渡る（わたる）to cross over', 3, array['N3']::text[]),
  ('kanji', '景', null, array['scenery','view']::text[], null, array['ケイ']::text[], '{}'::text[], 12, '{}'::text[], null, '景色（けしき）scenery
景気（けいき）condition
光景（こうけい）scene
風景（ふうけい）scenery', 3, array['N3']::text[]),
  ('kanji', '抜', null, array['slip out','extract','pull out','pilfer','quote','remove','omit']::text[], null, array['バツ','ハツ','ハイ']::text[], array['ぬ.く','-ぬ.く','ぬ.き','ぬ.ける','ぬ.かす','ぬ.かる']::text[], 7, '{}'::text[], null, '抜く（ぬく）to extract
抜ける（ぬける）to come out', 3, array['N3']::text[]),
  ('kanji', '補', null, array['supplement','supply','make good','offset','compensate','assistant','learner']::text[], null, array['ホ']::text[], array['おぎな.う']::text[], 12, '{}'::text[], null, '候補（こうほ）candidacy
補償（ほしょう）compensation
補う（おぎなう）to compensate for', 2, array['N2']::text[]),
  ('kanji', '候', null, array['climate','season','weather','wait for','expect']::text[], null, array['コウ']::text[], array['そうろう']::text[], 10, '{}'::text[], null, '気候（きこう）climate
候補（こうほ）candidacy
天候（てんこう）weather', 3, array['N3']::text[]),
  ('kanji', '構', null, array['posture','build','pretend']::text[], null, array['コウ']::text[], array['かま.える','かま.う']::text[], 14, '{}'::text[], null, '結構（けっこう）splendid
構成（こうせい）organization
機構（きこう）mechanism
構造（こうぞう）structure', 3, array['N3']::text[]),
  ('kanji', '捕', null, array['catch','capture']::text[], null, array['ホ']::text[], array['と.らえる','と.らわれる','と.る','とら.える','とら.われる','つか.まえる','つか.まる']::text[], 10, '{}'::text[], null, '捕まえる（つかまえる）to catch
逮捕（たいほ）arrest
捕まる（つかまる）to be arrested
捕る（とる）to take', 3, array['N3']::text[]),
  ('kanji', '効', null, array['merit','efficacy','efficiency','benefit']::text[], null, array['コウ']::text[], array['き.く','ききめ','なら.う']::text[], 8, '{}'::text[], null, '効く（きく）to be effective
効果（こうか）effect
有効（ゆうこう）valid
効力（こうりょく）effect', 2, array['N2']::text[]),
  ('kanji', '慣', null, array['accustomed','get used to','become experienced']::text[], null, array['カン']::text[], array['な.れる','な.らす']::text[], 14, '{}'::text[], null, '習慣（しゅうかん）custom (in reference to culture)
慣れる（なれる）to grow accustomed to
慣行（かんこう）customary practice
慣らす（ならす）to accustom', 3, array['N3']::text[]),
  ('kanji', '豊', null, array['bountiful','excellent','rich']::text[], null, array['ホウ','ブ']::text[], array['ゆた.か','とよ']::text[], 13, '{}'::text[], null, '豊か（ゆたか）abundant
豊富（ほうふ）abundance', 2, array['N2']::text[]),
  ('kanji', '満', null, array['full','fullness','enough','satisfy']::text[], null, array['マン','バン']::text[], array['み.ちる','み.つ','み.たす']::text[], 12, '{}'::text[], null, '満足（まんぞく）satisfaction
不満（ふまん）dissatisfaction
満ちる（みちる）to be full
満員（まんいん）full house', 3, array['N3']::text[]),
  ('kanji', '巻', null, array['scroll','volume','book','part','roll up','wind up','tie','coil','counter for texts (or book scrolls)']::text[], null, array['カン','ケン']::text[], array['ま.く','まき','ま.き']::text[], 9, '{}'::text[], null, '巻く（まく）to wind
～巻（～かん）volume
寝巻（ねまき）sleep-wear', 2, array['N2']::text[]),
  ('kanji', '捜', null, array['search','look for','locate']::text[], null, array['ソウ','シュ','シュウ']::text[], array['さが.す']::text[], 10, '{}'::text[], null, '捜査（そうさ）search (esp. in criminal investigations, investigation)
捜す（さがす）to search', 2, array['N2']::text[]),
  ('kanji', '掛', null, array['hang','suspend','depend','arrive at','tax','pour']::text[], null, array['カイ','ケイ']::text[], array['か.ける','-か.ける','か.け','-か.け','-が.け','か.かる','-か.かる','-が.かる','か.かり','-が.かり','かかり','-がかり']::text[], 11, '{}'::text[], null, '掛ける（かける）to put on (e.g., glasses)
見掛ける（みかける）to (happen to see)
お目に掛かる（おめにかかる）meet ~
腰掛（こしかけ）seat', 3, array['N3']::text[]),
  ('kanji', '替', null, array['exchange','spare','substitute','per-']::text[], null, array['タイ']::text[], array['か.える','か.え-','か.わる']::text[], 12, '{}'::text[], null, '取り替える（とりかえる）to exchange
両替（りょうがえ）change
替える（かえる）to exchange
為替（かわせ）money order', 2, array['N2']::text[]),
  ('kanji', '居', null, array['reside','to be','exist','live with']::text[], null, array['キョ','コ']::text[], array['い.る','-い','お.る']::text[], 8, '{}'::text[], null, '居る（いる）(humble) to be (animate)
芝居（しばい）play
居間（いま）living room
居眠り（いねむり）dozing', 3, array['N3']::text[]),
  ('kanji', '造', null, array['create','make','structure','physique']::text[], null, array['ゾウ']::text[], array['つく.る','つく.り','-づく.り']::text[], 10, '{}'::text[], null, '製造（せいぞう）manufacture
創造（そうぞう）creation
改造（かいぞう）remodeling
構造（こうぞう）structure', 2, array['N2']::text[]),
  ('kanji', '印', null, array['stamp','seal','mark','imprint','symbol','emblem','trademark','evidence','souvenir','india']::text[], null, array['イン']::text[], array['しるし','-じるし','しる.す']::text[], 6, '{}'::text[], null, '印刷（いんさつ）printing
印象（いんしょう）impression
目印（めじるし）mark
矢印（やじるし）directing arrow', 2, array['N2']::text[]),
  ('kanji', '復', null, array['restore','return to','revert','resume']::text[], null, array['フク']::text[], array['また']::text[], 12, '{}'::text[], null, '復習（ふくしゅう）review (of lessons)
回復（かいふく）recovery (from illness)
往復（おうふく）(col) round trip', 2, array['N2']::text[]),
  ('kanji', '筆', null, array['writing brush','writing','painting brush','handwriting']::text[], null, array['ヒツ']::text[], array['ふで']::text[], 12, '{}'::text[], null, '鉛筆（えんぴつ）pencil
万年筆（まんねんひつ）fountain pen
執筆（しっぴつ）writing
随筆（ずいひつ）essays', 2, array['N2']::text[]),
  ('kanji', '貯', null, array['savings','store','lay in','keep','wear mustache']::text[], null, array['チョ']::text[], array['た.める','たくわ.える']::text[], 12, '{}'::text[], null, '貯金（ちょきん）(bank) savings
貯蔵（ちょぞう）storage', 2, array['N2']::text[]),
  ('kanji', '刺', null, array['thorn','pierce','stab','prick','sting','calling card']::text[], null, array['シ']::text[], array['さ.す','さ.さる','さ.し','さし','とげ']::text[], 8, '{}'::text[], null, '刺激（しげき）stimulus
刺す（さす）to sting
名刺（めいし）(name) card
刺さる（ささる）to stick', 2, array['N2']::text[]),
  ('kanji', '郵', null, array['mail','stagecoach stop']::text[], null, array['ユウ']::text[], '{}'::text[], 11, '{}'::text[], null, '郵便局（ゆうびんきょく）post office
郵便（ゆうびん）mail
郵送（ゆうそう）mailing', 2, array['N2']::text[]),
  ('kanji', '針', null, array['needle','pin','staple','stinger']::text[], null, array['シン']::text[], array['はり']::text[], 10, '{}'::text[], null, '針路（しんろ）course
針金（はりがね）wire
方針（ほうしん）objective', 2, array['N2']::text[]),
  ('kanji', '突', null, array['stab','protruding','thrust','pierce','prick','collision','sudden']::text[], null, array['トツ','カ']::text[], array['つ.く']::text[], 8, '{}'::text[], null, '衝突（しょうとつ）collision
突く（つく）to thrust
突然（とつぜん）abruptly
煙突（えんとつ）chimney', 3, array['N3']::text[]),
  ('kanji', '菓', null, array['candy','cakes','fruit']::text[], null, array['カ']::text[], '{}'::text[], 11, '{}'::text[], null, 'お菓子（おかし）confections
菓子（かし）confectionery', 2, array['N2']::text[]),
  ('kanji', '河', null, array['river']::text[], null, array['カ']::text[], array['かわ']::text[], 8, '{}'::text[], null, '川; 河（かわ）river
運河（うんが）canal', 2, array['N2']::text[]),
  ('kanji', '汗', null, array['sweat','perspire']::text[], null, array['カン']::text[], array['あせ']::text[], 6, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '再', null, array['again','twice','second time']::text[], null, array['サイ','サ']::text[], array['ふたた.び']::text[], 6, '{}'::text[], null, '再来月（さらいげつ）the month after next
再来週（さらいしゅう）the week after next
再び（ふたたび）again
再～（さい～）re ~', 2, array['N2']::text[]),
  ('kanji', '接', null, array['touch','contact','adjoin','piece together']::text[], null, array['セツ','ショウ']::text[], array['つ.ぐ']::text[], 11, '{}'::text[], null, '面接（めんせつ）interview
直接（ちょくせつ）direct
接ぐ（つぐ）to join
応接（おうせつ）reception', 2, array['N2']::text[]),
  ('kanji', '占', null, array['fortune-telling','divining','forecasting','occupy','hold','have','get','take']::text[], null, array['セン']::text[], array['し.める','うらな.う']::text[], 5, '{}'::text[], null, '占める（しめる）to take up
占う（うらなう）to predict', 2, array['N2']::text[]),
  ('kanji', '招', null, array['beckon','invite','summon','engage']::text[], null, array['ショウ']::text[], array['まね.く']::text[], 8, '{}'::text[], null, '招待（しょうたいする）invitation
招く（まねく）to invite', 3, array['N3']::text[]),
  ('kanji', '段', null, array['grade','steps','stairs']::text[], null, array['ダン','タン']::text[], '{}'::text[], 9, '{}'::text[], null, '階段（かいだん）stairs
段々（だんだん）gradually
値段（ねだん）price
手段（しゅだん）means', 3, array['N3']::text[]),
  ('kanji', '胃', null, array['stomach','paunch','crop','craw']::text[], null, array['イ']::text[], '{}'::text[], 9, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '腹', null, array['abdomen','belly','stomach']::text[], null, array['フク']::text[], array['はら']::text[], 13, '{}'::text[], null, 'お腹（おなか）stomach', 3, array['N3']::text[]),
  ('kanji', '痛', null, array['pain','hurt','damage','bruise']::text[], null, array['ツウ']::text[], array['いた.い','いた.む','いた.ましい','いた.める']::text[], 12, '{}'::text[], null, '痛い（いたい）hurt
頭痛（ずつう）headache
痛み（いたみ）pain
苦痛（くつう）pain', 3, array['N3']::text[]),
  ('kanji', '退', null, array['retreat','withdraw','retire','resign','repel','expel','reject']::text[], null, array['タイ']::text[], array['しりぞ.く','しりぞ.ける','ひ.く','の.く','の.ける','ど.く']::text[], 9, '{}'::text[], null, '退院（たいいんする）leaving hospital
引退（いんたい）retirement
退屈（たいくつ）tedium
退く（どく）to retreat', 3, array['N3']::text[]),
  ('kanji', '悩', null, array['trouble','worry','in pain','distress','illness']::text[], null, array['ノウ']::text[], array['なや.む','なや.ます','なや.ましい','なやみ']::text[], 10, '{}'::text[], null, '悩む（なやむ）to agonize', 2, array['N2']::text[]),
  ('kanji', '貸', null, array['lend']::text[], null, array['タイ']::text[], array['か.す','か.し-','かし-']::text[], 12, '{}'::text[], null, '貸す（かす）to lend
貸し（かし）loan
貸間（かしま）room to let
貸家（かしや）house for rent', 4, array['N4']::text[]),
  ('kanji', '迷', null, array['astray','be perplexed','in doubt','lost','err','illusion']::text[], null, array['メイ']::text[], array['まよ.う']::text[], 9, '{}'::text[], null, '迷う（まよう）to be puzzled
迷惑（めいわく）trouble
迷子（まいご）lost (stray) child
迷信（めいしん）superstition', 3, array['N3']::text[]),
  ('kanji', '訪', null, array['call on','visit','look up','offer sympathy']::text[], null, array['ホウ']::text[], array['おとず.れる','たず.ねる','と.う']::text[], 11, '{}'::text[], null, '訪ねる（たずねる）to visit
訪問（ほうもん）call', 3, array['N3']::text[]),
  ('kanji', '怒', null, array['angry','be offended']::text[], null, array['ド','ヌ']::text[], array['いか.る','おこ.る']::text[], 9, '{}'::text[], null, '怒る（おこる）to get angry
怒り（いかり）anger
怒鳴る（どなる）to shout', 3, array['N3']::text[]),
  ('kanji', '昇', null, array['rise up']::text[], null, array['ショウ']::text[], array['のぼ.る']::text[], 8, '{}'::text[], null, '昇る（のぼる）to arise', 2, array['N2']::text[]),
  ('kanji', '眠', null, array['sleep','die','sleepy']::text[], null, array['ミン']::text[], array['ねむ.る','ねむ.い']::text[], 10, '{}'::text[], null, '眠い（ねむい）sleepy
眠る（ねむる）to sleep
睡眠（すいみん）sleep
居眠り（いねむり）dozing', 3, array['N3']::text[]),
  ('kanji', '靴', null, array['shoes']::text[], null, array['カ']::text[], array['くつ']::text[], 13, '{}'::text[], null, '靴下（くつした）socks', 3, array['N3']::text[]),
  ('kanji', '濃', null, array['concentrated','thick','dark','undiluted']::text[], null, array['ノウ']::text[], array['こ.い']::text[], 16, '{}'::text[], null, '濃い（こい）thick (as of color, liquid)
濃度（のうど）concentration', 2, array['N2']::text[]),
  ('kanji', '極', null, array['poles','settlement','conclusion','end','highest rank','electric poles','very','extremely','most','highly','10**48']::text[], null, array['キョク','ゴク']::text[], array['きわ.める','きわ.まる','きわ.まり','きわ.み','き.める','-ぎ.め','き.まる']::text[], 12, '{}'::text[], null, '積極的（せっきょくてき）positive
南極（なんきょく）south pole
北極（ほっきょく）North Pole
消極的（しょうきょくてき）passive', 2, array['N2']::text[]),
  ('kanji', '途', null, array['route','way','road']::text[], null, array['ト']::text[], array['みち']::text[], 10, '{}'::text[], null, '途中（とちゅう）on the way
途端（とたん）just (now, at the moment, etc.)
中途（ちゅうと）in the middle
用途（ようと）use', 3, array['N3']::text[]),
  ('kanji', '給', null, array['salary','wage','gift','allow','grant','bestow on']::text[], null, array['キュウ']::text[], array['たま.う','たも.う','-たま.え']::text[], 12, '{}'::text[], null, '支給（しきゅう）payment
給料（きゅうりょう）salary
供給（きょうきゅう）supply
給与（きゅうよ）salary', 3, array['N3']::text[]),
  ('kanji', '逆', null, array['inverted','reverse','opposite','wicked']::text[], null, array['ギャク','ゲキ']::text[], array['さか','さか.さ','さか.らう']::text[], 9, '{}'::text[], null, '逆らう（さからう）to go against
逆さ（さかさ）reverse
逆様（さかさま）reverse', 2, array['N2']::text[]),
  ('kanji', '巨', null, array['gigantic','big','large','great']::text[], null, array['キョ']::text[], '{}'::text[], 5, '{}'::text[], null, '巨大（きょだい）huge', 2, array['N2']::text[]),
  ('kanji', '庫', null, array['warehouse','storehouse']::text[], null, array['コ','ク']::text[], array['くら']::text[], 10, '{}'::text[], null, '冷蔵庫（れいぞうこ）refrigerator
金庫（きんこ）safe
車庫（しゃこ）garage
倉庫（そうこ）storehouse', 2, array['N2']::text[]),
  ('kanji', '児', null, array['newborn babe','child','young of animals']::text[], null, array['ジ','ニ','ゲイ']::text[], array['こ','-こ','-っこ']::text[], 7, '{}'::text[], null, '児童（じどう）children
育児（いくじ）childcare
幼児（ようじ）infant', 2, array['N2']::text[]),
  ('kanji', '冷', null, array['cool','cold (beer, person)','chill']::text[], null, array['レイ']::text[], array['つめ.たい','ひ.える','ひ.や','ひ.ややか','ひ.やす','ひ.やかす','さ.める','さ.ます']::text[], 7, '{}'::text[], null, '冷たい（つめたい）cold (things, people)
冷蔵庫（れいぞうこ）refrigerator
冷房（れいぼう）cooling
冷える（ひえる）to grow cold', 3, array['N3']::text[]),
  ('kanji', '凍', null, array['frozen','congeal','refrigerate']::text[], null, array['トウ']::text[], array['こお.る','こご.える','こご.る','い.てる','し.みる']::text[], 10, '{}'::text[], null, '凍る（こおる）to freeze
冷凍（れいとう）freezing
凍える（こごえる）to freeze', 2, array['N2']::text[]),
  ('kanji', '幼', null, array['infancy','childhood']::text[], null, array['ヨウ']::text[], array['おさな.い']::text[], 5, '{}'::text[], null, '幼い（おさない）very young
幼児（ようじ）infant
幼稚（ようち）infancy
幼稚園（ようちえん）kindergarten', 2, array['N2']::text[]),
  ('kanji', '処', null, array['dispose','manage','deal with','sentence','condemn','act','behave','place']::text[], null, array['ショ']::text[], array['ところ','-こ','お.る']::text[], 5, '{}'::text[], null, '処理（しょり）processing', 3, array['N3']::text[]),
  ('kanji', '清', null, array['pure','purify','cleanse','exorcise','manchu dynasty']::text[], null, array['セイ','ショウ','シン']::text[], array['きよ.い','きよ.まる','きよ.める']::text[], 11, '{}'::text[], null, '清む（すむ）to clear (e.g., weather)
清潔（せいけつ）clean
清い（きよい）clear
清書（せいしょ）clean copy', 2, array['N2']::text[]),
  ('kanji', '録', null, array['record']::text[], null, array['ロク']::text[], array['しる.す','と.る']::text[], 16, '{}'::text[], null, '記録（きろく）record
録音（ろくおん）(audio) recording', 2, array['N2']::text[]),
  ('kanji', '券', null, array['ticket']::text[], null, array['ケン']::text[], '{}'::text[], 8, '{}'::text[], null, '回数券（かいすうけん）book of tickets
定期券（ていきけん）commuter pass', 2, array['N2']::text[]),
  ('kanji', '婦', null, array['lady','woman','wife','bride']::text[], null, array['フ']::text[], array['よめ']::text[], 11, '{}'::text[], null, '看護婦（かんごふ）(female) nurse
主婦（しゅふ）housewife
夫婦（ふうふ）married couple
婦人（ふじん）woman (same as 女性 (じょせい)、女の人 (おんなのひと))', 3, array['N3']::text[]),
  ('kanji', '移', null, array['shift','move','change','drift','catch (cold, fire)','pass into']::text[], null, array['イ']::text[], array['うつ.る','うつ.す']::text[], 11, '{}'::text[], null, '移る（うつる）to move (from a house)
移動（いどう）migration
移転（いてん）moving', 2, array['N2']::text[]),
  ('kanji', '程', null, array['extent','degree','law','formula','distance','limits','amount']::text[], null, array['テイ']::text[], array['ほど','-ほど']::text[], 12, '{}'::text[], null, '過程（かてい）process
課程（かてい）course
程度（ていど）degree
先程（さきほど）a little while ago', 3, array['N3']::text[]),
  ('kanji', '精', null, array['refined','ghost','fairy','energy','vitality','semen','excellence','purity','skill']::text[], null, array['セイ','ショウ']::text[], array['しら.げる','くわ.しい']::text[], 14, '{}'::text[], null, '精神（せいしん）mind
精々（せいぜい）at the most
精巧（せいこう）elaborate
精算（せいさん）exact calculation', 3, array['N3']::text[]),
  ('kanji', '絶', null, array['discontinue','sever','cut off','abstain','interrupt','suppress','be beyond','without match','peerless','unparalleled']::text[], null, array['ゼツ']::text[], array['た.える','た.やす','た.つ']::text[], 12, '{}'::text[], null, '絶対（ぜったい）definitely
絶滅（ぜつめつ）destruction
絶えず（たえず）constantly', 3, array['N3']::text[]),
  ('kanji', '並', null, array['row','and','besides','as well as','line up','rank with','rival','equal']::text[], null, array['ヘイ','ホウ']::text[], array['な.み','なみ','なら.べる','なら.ぶ','なら.びに']::text[], 8, '{}'::text[], null, '並ぶ（ならぶ）to line up
並べる（ならべる）to put (things) side by side
並木（なみき）roadside tree
並行（へいこう）(going) side by side', 2, array['N2']::text[]),
  ('kanji', '杯', null, array['counter for cupfuls','wine glass','glass','toast']::text[], null, array['ハイ']::text[], array['さかずき']::text[], 8, '{}'::text[], null, '～杯（～はい）counter for cupfuls
一杯（いっぱい）full
乾杯（かんぱい）Cheers! (a toast)', 3, array['N3']::text[]),
  ('kanji', '乾', null, array['drought','dry','dessicate','drink up','heaven','emperor']::text[], null, array['カン','ケン']::text[], array['かわ.く','かわ.かす','ほ.す','ひ.る','いぬい']::text[], 11, '{}'::text[], null, '乾く（かわく）to get dry
乾燥（かんそう）dry
乾かす（かわかす）to dry
乾杯（かんぱい）Cheers! (a toast)', 2, array['N2']::text[]),
  ('kanji', '欧', null, array['europe']::text[], null, array['オウ']::text[], array['うた.う','は.く']::text[], 8, '{}'::text[], null, '欧米（おうべい）Europe and America', 2, array['N2']::text[]),
  ('kanji', '積', null, array['volume','product (x*y)','acreage','contents','pile up','stack','load','amass']::text[], null, array['セキ']::text[], array['つ.む','-づ.み','つ.もる','つ.もり']::text[], 16, '{}'::text[], null, '積む（つむ）to pile up
積極的（せっきょくてき）positive
積もる（つもる）to pile up
体積（たいせき）capacity', 3, array['N3']::text[]),
  ('kanji', '臣', null, array['retainer','subject']::text[], null, array['シン','ジン']::text[], '{}'::text[], 7, '{}'::text[], null, '大臣（だいじん）cabinet minister
総理大臣（そうりだいじん）Prime Minister', 2, array['N2']::text[]),
  ('kanji', '略', null, array['abbreviation','omission','outline','shorten','capture','plunder']::text[], null, array['リャク']::text[], array['ほぼ','はぶ.く','おか.す','おさ.める','はかりごと','はか.る']::text[], 11, '{}'::text[], null, '省略（しょうりゃく）omission
略す（りゃくす）to abbreviate', 2, array['N2']::text[]),
  ('kanji', '航', null, array['navigate','sail','cruise','fly']::text[], null, array['コウ']::text[], '{}'::text[], 10, '{}'::text[], null, '航空（こうくう）aviation
航海（こうかい）sail', 2, array['N2']::text[]),
  ('kanji', '寄', null, array['draw near','stop in','bring near','gather','collect','send','forward']::text[], null, array['キ']::text[], array['よ.る','-よ.り','よ.せる']::text[], 11, '{}'::text[], null, '寄る（よる）to stop by
寄付（きふ）contribution
年寄（としより）old people
寄せる（よせる）to collect', 3, array['N3']::text[]),
  ('kanji', '板', null, array['plank','board','plate','stage']::text[], null, array['ハン','バン']::text[], array['いた']::text[], 8, '{}'::text[], null, '黒板（こくばん）blackboard
看板（かんばん）sign', 2, array['N2']::text[]),
  ('kanji', '娘', null, array['daughter','girl']::text[], null, array['ジョウ']::text[], array['むすめ','こ']::text[], 10, '{}'::text[], null, null, 3, array['N3']::text[]),
  ('kanji', '怖', null, array['dreadful','be frightened','fearful']::text[], null, array['フ','ホ']::text[], array['こわ.い','こわ.がる','お.じる','おそ.れる']::text[], 8, '{}'::text[], null, '怖い（こわい）scary
恐怖（きょうふ）fear', 3, array['N3']::text[]),
  ('kanji', '恐', null, array['fear','dread','awe']::text[], null, array['キョウ']::text[], array['おそ.れる','おそ.る','おそ.ろしい','こわ.い','こわ.がる']::text[], 10, '{}'::text[], null, '恐怖（きょうふ）fear
恐らく（おそらく）perhaps
恐れる（おそれる）to fear
恐ろしい（おそろしい）terrible', 3, array['N3']::text[]),
  ('kanji', '詰', null, array['packed','close','pressed','reprove','rebuke','blame']::text[], null, array['キツ','キチ']::text[], array['つ.める','つ.め','-づ.め','つ.まる','つ.む']::text[], 13, '{}'::text[], null, '詰める（つめる）to pack
缶詰（かんづめ）canning
瓶詰（びんづめ）bottling
詰まる（つまる）to be blocked', 2, array['N2']::text[]),
  ('kanji', '婚', null, array['marriage']::text[], null, array['コン']::text[], '{}'::text[], 11, '{}'::text[], null, '結婚（けっこん (する)）marriage (get married)
婚約（こんやく）engagement
離婚（りこん）divorce', 3, array['N3']::text[]),
  ('kanji', '遊', null, array['play']::text[], null, array['ユウ','ユ']::text[], array['あそ.ぶ','あそ.ばす']::text[], 12, '{}'::text[], null, '遊ぶ（あそぶ）to play
遊び（あそび）play
遊園地（ゆうえんち）amusement park', 3, array['N3']::text[]),
  ('kanji', '照', null, array['illuminate','shine','compare','bashful']::text[], null, array['ショウ']::text[], array['て.る','て.らす','て.れる']::text[], 13, '{}'::text[], null, '対照（たいしょう）contrast
照明（しょうめい）illumination
照る（てる）to shine
照らす（てらす）to shine on', 2, array['N2']::text[]),
  ('kanji', '快', null, array['cheerful','pleasant','agreeable','comfortable']::text[], null, array['カイ']::text[], array['こころよ.い']::text[], 7, '{}'::text[], null, '快適（かいてき）pleasant
愉快（ゆかい）pleasant
快晴（かいせい）good weather', 2, array['N2']::text[]),
  ('kanji', '版', null, array['printing block','printing plate','edition','impression','label']::text[], null, array['ハン']::text[], '{}'::text[], 8, '{}'::text[], null, '出版（しゅっぱん）publication', 2, array['N2']::text[]),
  ('kanji', '貧', null, array['poverty','poor']::text[], null, array['ヒン','ビン']::text[], array['まず.しい']::text[], 11, '{}'::text[], null, '貧しい（まずしい）poor', 3, array['N3']::text[]),
  ('kanji', '適', null, array['suitable','occasional','rare','qualified','capable']::text[], null, array['テキ']::text[], array['かな.う']::text[], 14, '{}'::text[], null, '適当（てきとう）fitness
快適（かいてき）pleasant
適切（てきせつ）appropriate
適度（てきど）moderate', 3, array['N3']::text[]),
  ('kanji', '預', null, array['deposit','custody','leave with','entrust to']::text[], null, array['ヨ']::text[], array['あず.ける','あず.かる']::text[], 13, '{}'::text[], null, '預かる（あずかる）to keep (something) for (someone)
預ける（あずける）to give into custody', 2, array['N2']::text[]),
  ('kanji', '延', null, array['prolong','stretching']::text[], null, array['エン']::text[], array['の.びる','の.べる','の.べ','の.ばす']::text[], 8, '{}'::text[], null, '延期（えんき）postponement
延ばす（のばす）to extend
延びる（のびる）to be prolonged
延長（えんちょう）extension', 2, array['N2']::text[]),
  ('kanji', '翌', null, array['the following','next']::text[], null, array['ヨク']::text[], '{}'::text[], 11, '{}'::text[], null, '翌～（よく～）next ~', 2, array['N2']::text[]),
  ('kanji', '押', null, array['push','stop','check','subdue','attach','seize','weight','shove','press','seal','do in spite of']::text[], null, array['オウ']::text[], array['お.す','お.し-','お.っ-','お.さえる','おさ.える']::text[], 8, '{}'::text[], null, '押す（おす）to push
押し入れ（おしいれ）closet
押える（おさえる）to stop
押さえる（おさえる）to pin down', 3, array['N3']::text[]),
  ('kanji', '更', null, array['grow late','night watch','sit up late','of course','renew','renovate','again','more and more','further']::text[], null, array['コウ']::text[], array['さら','さら.に','ふ.ける','ふ.かす']::text[], 7, '{}'::text[], null, '更に（さらに）furthermore
変更（へんこう）change
更ける（ふける）to get late', 3, array['N3']::text[]),
  ('kanji', '浮', null, array['floating','float','rise to surface']::text[], null, array['フ']::text[], array['う.く','う.かれる','う.かぶ','む','う.かべる']::text[], 10, '{}'::text[], null, '浮ぶ（うかぶ）to float
浮く（うく）to float
浮かべる（うかべる）to float', 3, array['N3']::text[]),
  ('kanji', '符', null, array['token','sign','mark','tally','charm']::text[], null, array['フ']::text[], '{}'::text[], 11, '{}'::text[], null, '切符（きっぷ）a ticket
符号（ふごう）sign', 2, array['N2']::text[]),
  ('kanji', '越', null, array['surpass','cross over','move to','exceed','vietnam']::text[], null, array['エツ','オツ']::text[], array['こ.す','-こ.す','-ご.し','こ.える','-ご.え']::text[], 12, '{}'::text[], null, '引っ越す（ひっこす）to move to a new place of residence
越す（こす）to go over (e.g., with audience)
越える（こえる）to exceed
引越し（ひっこし）moving', 3, array['N3']::text[]),
  ('kanji', '背', null, array['stature','height','back','behind','disobey','defy','go back on','rebel']::text[], null, array['ハイ']::text[], array['せ','せい','そむ.く','そむ.ける']::text[], 9, '{}'::text[], null, '背広（せびろ）men''s suit
背中（せなか）back (of body)
背負う（せおう）to be burdened with', 3, array['N3']::text[]),
  ('kanji', '盗', null, array['steal','rob','pilfer']::text[], null, array['トウ']::text[], array['ぬす.む','ぬす.み']::text[], 11, '{}'::text[], null, '盗む（ぬすむ）to steal
強盗（ごうとう）robbery
盗難（とうなん）theft', 3, array['N3']::text[]),
  ('kanji', '編', null, array['compilation','knit','plait','braid','twist','editing','completed poem','part of a book']::text[], null, array['ヘン']::text[], array['あ.む','-あ.み']::text[], 15, '{}'::text[], null, '編む（あむ）to knit
短編（たんぺん）short (e.g., story, film)
編集（へんしゅう）editing
編み物（あみもの）knitting', 2, array['N2']::text[]),
  ('kanji', '普', null, array['universal','wide(ly)','generally','prussia']::text[], null, array['フ']::text[], array['あまね.く','あまねし']::text[], 12, '{}'::text[], null, '普通（ふつう）common
普段（ふだん）in everyday situations
普及（ふきゅう）diffusion', 2, array['N2']::text[]),
  ('kanji', '除', null, array['exclude','division (x/3)','remove','abolish','cancel','except']::text[], null, array['ジョ','ジ']::text[], array['のぞ.く','-よ.け']::text[], 10, '{}'::text[], null, '掃除（そうじ (する)）cleaning
除く（のぞく）to remove
削除（さくじょ）elimination', 3, array['N3']::text[]),
  ('kanji', '幾', null, array['how many','how much','how far','how long','some','several']::text[], null, array['キ']::text[], array['いく-','いく.つ','いく.ら']::text[], 12, '{}'::text[], null, '幾～（いく～）several ~
幾分（いくぶん）somewhat', 3, array['N3']::text[]),
  ('kanji', '掃', null, array['sweep','brush']::text[], null, array['ソウ','シュ']::text[], array['は.く']::text[], 11, '{}'::text[], null, '掃除（そうじ (する)）cleaning
掃く（はく）to sweep
清掃（せいそう）cleaning', 2, array['N2']::text[]),
  ('kanji', '泥', null, array['mud','mire','adhere to','be attached to']::text[], null, array['デイ','ナイ','デ','ニ']::text[], array['どろ','なず.む']::text[], 8, '{}'::text[], null, '泥棒（どろぼう）thief', 2, array['N2']::text[]),
  ('kanji', '棒', null, array['rod','stick','cane','pole','club','line']::text[], null, array['ボウ']::text[], '{}'::text[], 12, '{}'::text[], null, '泥棒（どろぼう）thief', 2, array['N2']::text[]),
  ('kanji', '孫', null, array['grandchild','descendants']::text[], null, array['ソン']::text[], array['まご']::text[], 10, '{}'::text[], null, '子孫（しそん）descendant', 2, array['N2']::text[])
on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set
  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,
  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,
  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags,
  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);

