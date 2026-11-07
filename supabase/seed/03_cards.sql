-- 03_cards.sql: run the files in supabase/seed/ in filename order.
insert into public.cards ("type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags") values
  ('kanji', '帯', null, array['sash','belt','obi','zone','region']::text[], null, array['タイ']::text[], array['お.びる','おび']::text[], 10, '{}'::text[], null, '一帯（いったい）a region
携帯（けいたい）carrying something
熱帯（ねったい）tropics
温帯（おんたい）temperate zone', 2, array['N2']::text[]),
  ('kanji', '散', null, array['scatter','disperse','spend','squander']::text[], null, array['サン']::text[], array['ち.る','ち.らす','-ち.らす','ち.らかす','ち.らかる','ち.らばる','ばら','ばら.ける']::text[], 12, '{}'::text[], null, '散歩（さんぽ (する)）walk
散る（ちる）to fall
散らす（ちらす）to scatter
解散（かいさん）breakup', 3, array['N3']::text[]),
  ('kanji', '粉', null, array['flour','powder','dust']::text[], null, array['フン']::text[], array['デシメートル','こ','こな']::text[], 10, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '菜', null, array['vegetable','side dish','greens']::text[], null, array['サイ']::text[], array['な']::text[], 11, '{}'::text[], null, '野菜（やさい）vegetable', 2, array['N2']::text[]),
  ('kanji', '貨', null, array['freight','goods','property']::text[], null, array['カ']::text[], array['たから']::text[], 11, '{}'::text[], null, '硬貨（こうか）coin
通貨（つうか）currency
銅貨（どうか）copper coin
貨物（かもつ）cargo', 2, array['N2']::text[]),
  ('kanji', '陸', null, array['land','six']::text[], null, array['リク','ロク']::text[], array['おか']::text[], 11, '{}'::text[], null, '大陸（たいりく）continent', 2, array['N2']::text[]),
  ('kanji', '似', null, array['becoming','resemble','counterfeit','imitate','suitable']::text[], null, array['ジ']::text[], array['に.る','ひ.る']::text[], 7, '{}'::text[], null, '似る（にる）to resemble
真似（まね）mimicry
似合う（にあう）to suit (a person)
真似る（まねる）to mimic', 3, array['N3']::text[]),
  ('kanji', '均', null, array['level','average']::text[], null, array['キン']::text[], array['なら.す']::text[], 7, '{}'::text[], null, '平均（へいきん）equilibrium', 2, array['N2']::text[]),
  ('kanji', '富', null, array['wealth','enrich','abundant']::text[], null, array['フ','フウ']::text[], array['と.む','とみ']::text[], 12, '{}'::text[], null, '豊富（ほうふ）abundance', 3, array['N3']::text[]),
  ('kanji', '探', null, array['grope','search','look for']::text[], null, array['タン']::text[], array['さぐ.る','さが.す']::text[], 11, '{}'::text[], null, '探す（さがす）to search
探る（さぐる）to search', 3, array['N3']::text[]),
  ('kanji', '迎', null, array['welcome','meet','greet']::text[], null, array['ゲイ']::text[], array['むか.える']::text[], 7, '{}'::text[], null, '迎える（むかえる）to welcome
歓迎（かんげい）welcome
迎え（むかえ）meeting
出迎え（でむかえ）meeting', 3, array['N3']::text[]),
  ('kanji', '採', null, array['pick','take','fetch','take up']::text[], null, array['サイ']::text[], array['と.る']::text[], 11, '{}'::text[], null, '採集（さいしゅう）collecting
採点（さいてん）marking
採る（とる）to adopt (measure, proposal)', 2, array['N2']::text[]),
  ('kanji', '永', null, array['eternity','long','lengthy']::text[], null, array['エイ']::text[], array['なが.い']::text[], 5, '{}'::text[], null, '永遠（えいえん）eternity
永久（えいきゅう）eternity', 2, array['N2']::text[]),
  ('kanji', '液', null, array['fluid','liquid','juice','sap','secretion']::text[], null, array['エキ']::text[], '{}'::text[], 11, '{}'::text[], null, '血液（けつえき）blood
液体（えきたい）liquid', 2, array['N2']::text[]),
  ('kanji', '祖', null, array['ancestor','pioneer','founder']::text[], null, array['ソ']::text[], '{}'::text[], 9, '{}'::text[], null, '祖母（そぼ）grandmother
祖父（そふ）grandfather
先祖（せんぞ）ancestor
祖先（そせん）ancestor(s)', 3, array['N3']::text[]),
  ('kanji', '績', null, array['exploits','achievements','unreeling cocoons']::text[], null, array['セキ']::text[], '{}'::text[], 17, '{}'::text[], null, '成績（せいせき）grade (i.e., on a test)
功績（こうせき）achievements
実績（じっせき）achievements', 2, array['N2']::text[]),
  ('kanji', '複', null, array['duplicate','double','compound','multiple']::text[], null, array['フク']::text[], '{}'::text[], 14, '{}'::text[], null, '複雑（ふくざつ）complexity
複写（ふくしゃ）copy
複数（ふくすう）plural', 2, array['N2']::text[]),
  ('kanji', '雑', null, array['miscellaneous']::text[], null, array['ザツ','ゾウ']::text[], array['まじ.える','まじ.る']::text[], 14, '{}'::text[], null, '雑誌（ざっし）magazine
複雑（ふくざつ）complexity
混雑（こんざつ）confusion
雑音（ざつおん）noise (jarring, grating)', 3, array['N3']::text[]),
  ('kanji', '賛', null, array['approve','praise','title or inscription on picture','assist','agree with']::text[], null, array['サン']::text[], array['たす.ける','たた.える']::text[], 15, '{}'::text[], null, '賛成（さんせい）approval', 3, array['N3']::text[]),
  ('kanji', '党', null, array['party','faction','clique']::text[], null, array['トウ']::text[], array['なかま','むら']::text[], 10, '{}'::text[], null, '野党（やとう）opposition party
政党（せいとう）(member of) political party', 2, array['N2']::text[]),
  ('kanji', '卵', null, array['egg','ovum','spawn','roe']::text[], null, array['ラン']::text[], array['たまご']::text[], 7, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '捨', null, array['discard','throw away','abandon','resign','reject','sacrifice']::text[], null, array['シャ']::text[], array['す.てる']::text[], 11, '{}'::text[], null, '捨てる（すてる）throw away (trash)
四捨五入（ししゃごにゅう）rounding up (fractions)', 2, array['N2']::text[]),
  ('kanji', '込', null, array['crowded','mixture','in bulk','included','(kokuji)']::text[], null, '{}'::text[], array['-こ.む','こ.む','こ.み','-こ.み','こ.める']::text[], 5, '{}'::text[], null, '込む（こむ）to be crowded
人込み（ひとごみ）crowd of people
申し込む（もうしこむ）to apply for
思い込む（おもいこむ）to be under impression that', 3, array['N3']::text[]),
  ('kanji', '汚', null, array['dirty','pollute','disgrace','rape','defile']::text[], null, array['オ']::text[], array['けが.す','けが.れる','けが.らわしい','よご.す','よご.れる','きたな.い']::text[], 6, '{}'::text[], null, '汚い（きたない）dirty
汚れる（よごれる）to become dirty
汚染（おせん）pollution
汚す（よごす）to pollute', 2, array['N2']::text[]),
  ('kanji', '欲', null, array['longing','covetousness','greed','passion','desire','craving']::text[], null, array['ヨク']::text[], array['ほっ.する','ほ.しい']::text[], 11, '{}'::text[], null, '欲しい（ほしい）to want
食欲（しょくよく）appetite (for food)
欲張り（よくばり）greedy', 3, array['N3']::text[]),
  ('kanji', '机', null, array['desk','table']::text[], null, array['キ']::text[], array['つくえ']::text[], 6, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '簡', null, array['simplicity','brevity']::text[], null, array['カン','ケン']::text[], array['えら.ぶ','ふだ']::text[], 18, '{}'::text[], null, '簡単（かんたん）simple', 2, array['N2']::text[]),
  ('kanji', '閉', null, array['closed','shut']::text[], null, array['ヘイ']::text[], array['と.じる','と.ざす','し.める','し.まる','た.てる']::text[], 11, array['開']::text[], '開 open: 开 inside the gate. 閉 close: 才 inside the gate.', '閉まる（しまる）to close
閉める（しめる）to close
閉じる（とじる）to close (e.g., book, eyes)
閉会（へいかい）closure', 3, array['N3']::text[]),
  ('kanji', '誌', null, array['document','records']::text[], null, array['シ']::text[], '{}'::text[], 14, '{}'::text[], null, '雑誌（ざっし）magazine', 2, array['N2']::text[]),
  ('kanji', '窓', null, array['window','pane']::text[], null, array['ソウ','ス']::text[], array['まど','てんまど','けむだし']::text[], 11, '{}'::text[], null, '窓口（まどぐち）(ticket) window', 3, array['N3']::text[]),
  ('kanji', '否', null, array['negate','no','noes','refuse','decline','deny']::text[], null, array['ヒ']::text[], array['いな','いや']::text[], 7, '{}'::text[], null, '否定（ひてい）negation', 3, array['N3']::text[]),
  ('kanji', '宝', null, array['treasure','wealth','valuables']::text[], null, array['ホウ']::text[], array['たから']::text[], 8, '{}'::text[], null, '宝石（ほうせき）gem', 2, array['N2']::text[]),
  ('kanji', '尊', null, array['revered','valuable','precious','noble','exalted']::text[], null, array['ソン']::text[], array['たっと.い','とうと.い','たっと.ぶ','とうと.ぶ']::text[], 12, '{}'::text[], null, '尊敬（そんけい）respect
尊重（そんちょう）respect', 2, array['N2']::text[]),
  ('kanji', '敬', null, array['awe','respect','honor','revere']::text[], null, array['ケイ','キョウ']::text[], array['うやま.う']::text[], 12, '{}'::text[], null, '敬意（けいい）respect
尊敬（そんけい）respect
敬う（うやまう）to show respect
敬語（けいご）honorific language (lit., respect language)', 2, array['N2']::text[]),
  ('kanji', '暮', null, array['evening','twilight','season''s end','livelihood','make a living','spend time']::text[], null, array['ボ']::text[], array['く.れる','く.らす']::text[], 14, '{}'::text[], null, '暮れる（くれる）to get dark
暮れ（くれ）year end
暮らし（くらし）living
暮らす（くらす）to live', 3, array['N3']::text[]),
  ('kanji', '灰', null, array['ashes','puckery juice','cremate']::text[], null, array['カイ']::text[], array['はい']::text[], 6, '{}'::text[], null, '灰皿（はいざら）ashtray
灰色（はいいろ）grey', 2, array['N2']::text[]),
  ('kanji', '砂', null, array['sand']::text[], null, array['サ','シャ']::text[], array['すな']::text[], 9, '{}'::text[], null, '砂糖（さとう）sugar
砂漠（さばく）desert', 2, array['N2']::text[]),
  ('kanji', '著', null, array['renowned','publish','write','remarkable','phenomenal','put on','don','wear','arrival','finish (race)','counter for suits of clothing','literary work']::text[], null, array['チョ','チャク']::text[], array['あらわ.す','いちじる.しい']::text[], 11, '{}'::text[], null, '著す（あらわす）to write
著者（ちょしゃ）author', 2, array['N2']::text[]),
  ('kanji', '蒸', null, array['steam','heat','sultry','foment','get musty']::text[], null, array['ジョウ','セイ']::text[], array['む.す','む.れる','む.らす']::text[], 13, '{}'::text[], null, '蒸す（むす）to steam
蒸し暑い（むしあつい）humid
蒸気（じょうき）steam
蒸発（じょうはつ）evaporation', 2, array['N2']::text[]),
  ('kanji', '蔵', null, array['storehouse','hide','own','have','possess']::text[], null, array['ゾウ','ソウ']::text[], array['くら','おさ.める','かく.れる']::text[], 15, '{}'::text[], null, '冷蔵庫（れいぞうこ）refrigerator
貯蔵（ちょぞう）storage', 2, array['N2']::text[]),
  ('kanji', '装', null, array['attire','dress','pretend','disguise','profess']::text[], null, array['ソウ','ショウ']::text[], array['よそお.う','よそお.い']::text[], 12, '{}'::text[], null, '装置（そうち）equipment
服装（ふくそう）clothes
包装（ほうそう）packing', 2, array['N2']::text[]),
  ('kanji', '裏', null, array['back','amidst','in','reverse','inside','palm','sole','rear','lining','wrong side']::text[], null, array['リ']::text[], array['うら']::text[], 13, '{}'::text[], null, '裏切る（うらぎる）to betray
裏口（うらぐち）backdoor
裏返す（うらがえす）to turn inside out', 2, array['N2']::text[]),
  ('kanji', '諸', null, array['various','many','several','together']::text[], null, array['ショ']::text[], array['もろ']::text[], 15, '{}'::text[], null, '諸～（しょ～）various ~', 2, array['N2']::text[]),
  ('kanji', '誤', null, array['mistake','err','do wrong','mislead']::text[], null, array['ゴ']::text[], array['あやま.る','-あやま.る']::text[], 14, '{}'::text[], null, '誤り（あやまり）error
誤解（ごかい）misunderstanding', 3, array['N3']::text[]),
  ('kanji', '臓', null, array['entrails','viscera','bowels']::text[], null, array['ゾウ']::text[], array['はらわた']::text[], 19, '{}'::text[], null, '心臓（しんぞう）heart', 2, array['N2']::text[]),
  ('kanji', '降', null, array['descend','precipitate','fall','surrender']::text[], null, array['コウ','ゴ']::text[], array['お.りる','お.ろす','ふ.る','ふ.り','くだ.る','くだ.す']::text[], 10, '{}'::text[], null, '降る（ふる）to precipitate
降りる（おりる）to get off
降伏（こうふく）capitulation
降ろす（おろす）to take down', 3, array['N3']::text[]),
  ('kanji', '純', null, array['genuine','purity','innocence','net (profit)']::text[], null, array['ジュン']::text[], '{}'::text[], 10, '{}'::text[], null, '単純（たんじゅん）simplicity
純情（じゅんじょう）pure heart
純粋（じゅんすい）pure', 2, array['N2']::text[]),
  ('kanji', '紅', null, array['crimson','deep red']::text[], null, array['コウ','ク']::text[], array['べに','くれない','あか.い']::text[], 9, '{}'::text[], null, '紅茶（こうちゃ）black tea
口紅（くちべに）lipstick
紅葉（こうよう）fall colors (of leaves)
紅葉（もみじ）(Japanese) maple', 2, array['N2']::text[]),
  ('kanji', '拝', null, array['worship','adore','pray to']::text[], null, array['ハイ']::text[], array['おが.む','おろが.む']::text[], 8, '{}'::text[], null, '拝見（はいけんする）(humble) (polite) seeing
拝む（おがむ）to worship', 2, array['N2']::text[]),
  ('kanji', '劇', null, array['drama','play']::text[], null, array['ゲキ']::text[], '{}'::text[], 15, '{}'::text[], null, '劇場（げきじょう）theater
悲劇（ひげき）tragedy
演劇（えんげき）play (theatrical)', 2, array['N2']::text[]),
  ('kanji', '勤', null, array['diligence','become employed','serve']::text[], null, array['キン','ゴン']::text[], array['つと.める','-づと.め','つと.まる','いそ.しむ']::text[], 12, '{}'::text[], null, '勤める（つとめる）to work (for)
通勤（つうきん）commuting to work
勤め（つとめ）work
出勤（しゅっきん）going to work', 3, array['N3']::text[]),
  ('kanji', '承', null, array['acquiesce','hear','listen to','be informed','receive']::text[], null, array['ショウ','ジョウ']::text[], array['うけたまわ.る','う.ける']::text[], 8, '{}'::text[], null, '承知（しょうちする）consent
承認（しょうにん）recognition
承る（うけたまわる）(humble) to hear', 2, array['N2']::text[]),
  ('kanji', '損', null, array['damage','loss','disadvantage','hurt','injure']::text[], null, array['ソン']::text[], array['そこ.なう','そこな.う','-そこ.なう','そこ.ねる','-そこ.ねる']::text[], 13, '{}'::text[], null, '損害（そんがい）damage
損得（そんとく）loss and gain', 2, array['N2']::text[]),
  ('kanji', '枝', null, array['bough','branch','twig','limb','counter for branches']::text[], null, array['シ']::text[], array['えだ']::text[], 8, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '刻', null, array['engrave','cut fine','chop','hash','mince','time','carving']::text[], null, array['コク']::text[], array['きざ.む','きざ.み']::text[], 8, '{}'::text[], null, '時刻（じこく）time
深刻（しんこく）serious
遅刻（ちこく）lateness
刻む（きざむ）to mince', 3, array['N3']::text[]),
  ('kanji', '遅', null, array['slow','late','back','later']::text[], null, array['チ']::text[], array['おく.れる','おく.らす','おそ.い']::text[], 12, '{}'::text[], null, '遅い（おそい）slow
遅れる（おくれる）to (be) become late
遅れ（おくれ）delay
遅刻（ちこく）lateness', 3, array['N3']::text[]),
  ('kanji', '測', null, array['fathom','plan','scheme','measure']::text[], null, array['ソク']::text[], array['はか.る']::text[], 12, '{}'::text[], null, '予測（よそく）prediction
測る（はかる）to measure
観測（かんそく）observation
測定（そくてい）measurement', 2, array['N2']::text[]),
  ('kanji', '破', null, array['rend','rip','tear','break','destroy','defeat','frustrate']::text[], null, array['ハ']::text[], array['やぶ.る','やぶ.れる','わ.れる']::text[], 10, '{}'::text[], null, '破る（やぶる）to tear
破産（はさん）(personal) bankruptcy
破れる（やぶれる）to get torn
破片（はへん）fragment', 3, array['N3']::text[]),
  ('kanji', '講', null, array['lecture','club','association']::text[], null, array['コウ']::text[], '{}'::text[], 17, '{}'::text[], null, '講堂（こうどう）auditorium
講義（こうぎ）a lecture
講演（こうえん）lecture
休講（きゅうこう）lecture canceled', 2, array['N2']::text[]),
  ('kanji', '紹', null, array['introduce','inherit','help']::text[], null, array['ショウ']::text[], '{}'::text[], 11, '{}'::text[], null, '紹介（しょうかい）an introduction', 2, array['N2']::text[]),
  ('kanji', '介', null, array['jammed in','shellfish','mediate','concern oneself with']::text[], null, array['カイ']::text[], '{}'::text[], 4, '{}'::text[], null, '紹介（しょうかい）an introduction
厄介（やっかい）trouble', 2, array['N2']::text[]),
  ('kanji', '互', null, array['mutually','reciprocally','together']::text[], null, array['ゴ']::text[], array['たが.い','かたみ.に']::text[], 4, '{}'::text[], null, '互い（たがい）mutual
お互い（おたがい）mutual
相互（そうご）mutual', 3, array['N3']::text[]),
  ('kanji', '彼', null, array['he','that','the']::text[], null, array['ヒ']::text[], array['かれ','かの','か.の']::text[], 8, '{}'::text[], null, '彼ら（かれら）they (usually male)
彼女（かのじょ）girlfriend', 3, array['N3']::text[]),
  ('kanji', '恥', null, array['shame','dishonor']::text[], null, array['チ']::text[], array['は.じる','はじ','は.じらう','は.ずかしい']::text[], 10, '{}'::text[], null, '恥ずかしい（はずかしい）ashamed', 3, array['N3']::text[]),
  ('kanji', '湖', null, array['lake']::text[], null, array['コ']::text[], array['みずうみ']::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '銅', null, array['copper']::text[], null, array['ドウ']::text[], array['あかがね']::text[], 14, '{}'::text[], null, '銅貨（どうか）copper coin', 2, array['N2']::text[]),
  ('kanji', '払', null, array['pay','clear out','prune','banish','dispose of']::text[], null, array['フツ','ヒツ','ホツ']::text[], array['はら.う','-はら.い','-ばら.い']::text[], 5, '{}'::text[], null, '払う（はらう）to pay
支払（しはらい）payment
支払う（しはらう）to pay
払い込む（はらいこむ）to deposit', 3, array['N3']::text[]),
  ('kanji', '油', null, array['oil','fat']::text[], null, array['ユ','ユウ']::text[], array['あぶら']::text[], 8, '{}'::text[], null, '醤油（しょうゆ）soy sauce
石油（せきゆ）oil
灯油（とうゆ）lamp oil
油断（ゆだん）negligence', 2, array['N2']::text[]),
  ('kanji', '旧', null, array['old times','old things','old friend','former','ex-']::text[], null, array['キュウ']::text[], array['ふる.い','もと']::text[], 5, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '姓', null, array['surname']::text[], null, array['セイ','ショウ']::text[], '{}'::text[], 8, '{}'::text[], null, '姓名（せいめい）full name', 2, array['N2']::text[]),
  ('kanji', '貿', null, array['trade','exchange']::text[], null, array['ボウ']::text[], '{}'::text[], 12, '{}'::text[], null, '貿易（ぼうえき）trade', 2, array['N2']::text[]),
  ('kanji', '将', null, array['leader','commander','general','admiral','or','and again','soon','from now on','just about']::text[], null, array['ショウ','ソウ']::text[], array['まさ.に','はた','まさ','ひきい.る','もって']::text[], 10, '{}'::text[], null, '将来（しょうらい）(in the) future
将棋（しょうぎ）Japanese chess', 2, array['N2']::text[]),
  ('kanji', '伸', null, array['expand','stretch','extend','lengthen','increase']::text[], null, array['シン']::text[], array['の.びる','の.ばす','の.べる','の.す']::text[], 7, '{}'::text[], null, '伸ばす（のばす）to extend
伸びる（のびる）to extend', 2, array['N2']::text[]),
  ('kanji', '幅', null, array['hanging scroll','width']::text[], null, array['フク']::text[], array['はば']::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '甘', null, array['sweet','coax','pamper','be content','sugary']::text[], null, array['カン']::text[], array['あま.い','あま.える','あま.やかす','うま.い']::text[], 5, '{}'::text[], null, '甘い（あまい）generous
甘やかす（あまやかす）to pamper', 2, array['N2']::text[]),
  ('kanji', '換', null, array['interchange','period','change','convert','replace','renew']::text[], null, array['カン']::text[], array['か.える','-か.える','か.わる']::text[], 12, '{}'::text[], null, '乗り換える（のりかえる）to transfer (trains)
交換（こうかん）exchange
換える（かえる）to exchange
換気（かんき）ventilation', 2, array['N2']::text[]),
  ('kanji', '療', null, array['heal','cure']::text[], null, array['リョウ']::text[], '{}'::text[], 17, '{}'::text[], null, '医療（いりょう）medical care
治療（ちりょう）medical treatment', 2, array['N2']::text[]),
  ('kanji', '舞', null, array['dance','flit','circle','wheel']::text[], null, array['ブ']::text[], array['ま.う','-ま.う','まい']::text[], 15, '{}'::text[], null, 'お見舞い（おみまい）calling on someone who is ill
舞台（ぶたい）stage (theater)
見舞い（みまい）expression of sympathy
振舞う（ふるまう）to behave', 3, array['N3']::text[]),
  ('kanji', '般', null, array['carrier','carry','all','general','sort','kind']::text[], null, array['ハン']::text[], '{}'::text[], 10, '{}'::text[], null, '一般（いっぱん）general
全般（ぜんぱん）(the) whole', 2, array['N2']::text[]),
  ('kanji', '頼', null, array['trust','request']::text[], null, array['ライ']::text[], array['たの.む','たの.もしい','たよ.る']::text[], 16, '{}'::text[], null, '頼む（たのむ）to request
信頼（しんらい）reliance
依頼（いらい）request
頼る（たよる）to rely on', 3, array['N3']::text[]),
  ('kanji', '依', null, array['reliant','depend on','consequently','therefore','due to']::text[], null, array['イ','エ']::text[], array['よ.る']::text[], 8, '{}'::text[], null, '依頼（いらい）request
依然（いぜん）still', 2, array['N2']::text[]),
  ('kanji', '漁', null, array['fishing','fishery']::text[], null, array['ギョ','リョウ']::text[], array['あさ.る']::text[], 14, '{}'::text[], null, '漁業（ぎょぎょう）fishing (industry)
漁師（りょうし）fisherman', 2, array['N2']::text[]),
  ('kanji', '募', null, array['recruit','campaign','gather (contributions)','enlist','grow violent']::text[], null, array['ボ']::text[], array['つの.る']::text[], 12, '{}'::text[], null, '募集（ぼしゅう）recruitment', 2, array['N2']::text[]),
  ('kanji', '患', null, array['afflicted','disease','suffer from','be ill']::text[], null, array['カン']::text[], array['わずら.う']::text[], 11, '{}'::text[], null, '患者（かんじゃ）patient', 2, array['N2']::text[]),
  ('kanji', '戻', null, array['re-','return','revert','resume','restore','go backwards']::text[], null, array['レイ']::text[], array['もど.す','もど.る']::text[], 7, '{}'::text[], null, '戻る（もどる）to return (v.i.)
戻す（もどす）to restore
払い戻す（はらいもどす）to repay', 3, array['N3']::text[]),
  ('kanji', '湾', null, array['gulf','bay','inlet']::text[], null, array['ワン']::text[], array['いりえ']::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '爆', null, array['bomb','burst open','pop','split']::text[], null, array['バク']::text[], array['は.ぜる']::text[], 19, '{}'::text[], null, '爆発（ばくはつ）explosion', 2, array['N2']::text[]),
  ('kanji', '跡', null, array['tracks','mark','print','impression']::text[], null, array['セキ']::text[], array['あと']::text[], 13, '{}'::text[], null, '足跡（あしあと）footprint', 2, array['N2']::text[]),
  ('kanji', '香', null, array['incense','smell','perfume']::text[], null, array['コウ','キョウ']::text[], array['か','かお.り','かお.る']::text[], 9, '{}'::text[], null, '香り（かおり）aroma
香水（こうすい）perfume', 2, array['N2']::text[]),
  ('kanji', '兆', null, array['portent','10**12','trillion','sign','omen','symptoms']::text[], null, array['チョウ']::text[], array['きざ.す','きざ.し']::text[], 6, '{}'::text[], null, '～兆（～ちょう）trillion', 2, array['N2']::text[]),
  ('kanji', '抱', null, array['embrace','hug','hold in arms']::text[], null, array['ホウ']::text[], array['だ.く','いだ.く','かか.える']::text[], 8, '{}'::text[], null, '抱く（いだく）to hold (v.t.) (written expression)
抱く（だく）to embrace
抱える（かかえる）to hold or carry under or in the arms', 3, array['N3']::text[]),
  ('kanji', '齢', null, array['age']::text[], null, array['レイ']::text[], array['よわい','とし']::text[], 17, '{}'::text[], null, '年齢（ねんれい）age', 2, array['N2']::text[]),
  ('kanji', '刊', null, array['publish','carve','engrave']::text[], null, array['カン']::text[], '{}'::text[], 5, '{}'::text[], null, '刊行（かんこう）publication
季刊（きかん）quarterly (e.g., magazine)
～刊（～かん）~ issued (magazine, newspaper)
夕刊（ゆうかん）evening paper', 2, array['N2']::text[]),
  ('kanji', '傾', null, array['lean','incline','tilt','trend','wane','sink','ruin','bias']::text[], null, array['ケイ']::text[], array['かたむ.く','かたむ.ける','かたぶ.く','かた.げる','かし.げる']::text[], 13, '{}'::text[], null, '傾向（けいこう）tendency
傾く（かたむく）to incline toward
傾らか（なだらか）gradual', 2, array['N2']::text[]),
  ('kanji', '奥', null, array['heart','interior']::text[], null, array['オウ']::text[], array['おく','おく.まる','くま']::text[], 12, '{}'::text[], null, '奥さん（おくさん）(someone else''s) wife (hon.)', 2, array['N2']::text[]),
  ('kanji', '緒', null, array['thong','beginning','inception','end','cord','strap','mental or emotional state']::text[], null, array['ショ','チョ']::text[], array['お','いとぐち']::text[], 14, '{}'::text[], null, '一緒（いっしょ）together', 3, array['N3']::text[]),
  ('kanji', '贈', null, array['presents','send','give to','award to','confer on','presenting something']::text[], null, array['ゾウ','ソウ']::text[], array['おく.る']::text[], 18, '{}'::text[], null, '贈り物（おくりもの）a gift
贈る（おくる）to present', 2, array['N2']::text[]),
  ('kanji', '逃', null, array['escape','flee','shirk','evade','set free']::text[], null, array['トウ']::text[], array['に.げる','に.がす','のが.す','のが.れる']::text[], 9, '{}'::text[], null, '逃げる（にげる）to escape
逃がす（にがす）to let loose', 3, array['N3']::text[]),
  ('kanji', '超', null, array['transcend','super-','ultra-']::text[], null, array['チョウ']::text[], array['こ.える','こ.す']::text[], 12, '{}'::text[], null, '超す（こす）to cross
超える（こえる）to exceed
超過（ちょうか）excess', 2, array['N2']::text[]),
  ('kanji', '雇', null, array['employ','hire']::text[], null, array['コ']::text[], array['やと.う']::text[], 12, '{}'::text[], null, '雇う（やとう）to employ', 2, array['N2']::text[]),
  ('kanji', '片', null, array['one-sided','leaf','sheet']::text[], null, array['ヘン']::text[], array['かた-','かた']::text[], 4, '{}'::text[], null, '片仮名（かたかな）katakana
片付ける（かたづける）to (clean) tidy up (v.t.)
片付く（かたづく）to put in order
片付け（かたづけ）tidying up', 2, array['N2']::text[]),
  ('kanji', '群', null, array['flock','group','crowd','herd','swarm','cluster']::text[], null, array['グン']::text[], array['む.れる','む.れ','むら','むら.がる']::text[], 13, '{}'::text[], null, '群れ（むれ）crowd', 2, array['N2']::text[]),
  ('kanji', '埋', null, array['bury','be filled up','embedded']::text[], null, array['マイ']::text[], array['う.める','う.まる','う.もれる','うず.める','うず.まる','い.ける']::text[], 10, '{}'::text[], null, '埋める（うめる）to bury
埋まる（うまる）to be buried', 2, array['N2']::text[]),
  ('kanji', '御', null, array['honorable','manipulate','govern']::text[], null, array['ギョ','ゴ']::text[], array['おん-','お-','み-']::text[], 12, '{}'::text[], null, '御飯（ごはん）rice (cooked)
朝御飯（あさごはん）breakfast
晩御飯（ばんごはん）dinner
昼御飯（ひるごはん）lunch', 3, array['N3']::text[]),
  ('kanji', '駐', null, array['stop-over','reside in','resident']::text[], null, array['チュウ']::text[], '{}'::text[], 15, '{}'::text[], null, '駐車場（ちゅうしゃじょう）parking lot
駐車（ちゅうしゃ）parking (e.g., car)', 2, array['N2']::text[]),
  ('kanji', '柱', null, array['pillar','post','cylinder','support']::text[], null, array['チュウ']::text[], array['はしら']::text[], 9, '{}'::text[], null, '電柱（でんちゅう）telephone pole', 2, array['N2']::text[]),
  ('kanji', '吹', null, array['blow','breathe','puff','emit','smoke']::text[], null, array['スイ']::text[], array['ふ.く']::text[], 7, '{}'::text[], null, '吹く（ふく）to blow (wind, etc.)
吹雪（ふぶき）snow storm', 3, array['N3']::text[]),
  ('kanji', '鋭', null, array['pointed','sharpness','edge','weapon','sharp','violent']::text[], null, array['エイ']::text[], array['するど.い']::text[], 15, '{}'::text[], null, '鋭い（するどい）pointed', 2, array['N2']::text[]),
  ('kanji', '殿', null, array['mr.','hall','mansion','palace','temple','lord']::text[], null, array['デン','テン']::text[], array['との','-どの']::text[], 13, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '薄', null, array['dilute','thin','weak (tea)','pampas grass']::text[], null, array['ハク']::text[], array['うす.い','うす-','-うす','うす.める','うす.まる','うす.らぐ','うす.ら-','うす.れる','すすき']::text[], 16, '{}'::text[], null, '薄い（うすい）thin
薄暗い（うすぐらい）dim
薄める（うすめる）to dilute', 2, array['N2']::text[]),
  ('kanji', '伺', null, array['pay respects','visit','ask','inquire','question','implore']::text[], null, array['シ']::text[], array['うかが.う']::text[], 7, '{}'::text[], null, '伺う（うかがう）humble form of 行く (いく)', 2, array['N2']::text[]),
  ('kanji', '炭', null, array['charcoal','coal']::text[], null, array['タン']::text[], array['すみ']::text[], 9, '{}'::text[], null, '石炭（せきたん）coal
炭鉱（たんこう）coal mine', 2, array['N2']::text[]),
  ('kanji', '包', null, array['wrap','pack up','cover','conceal']::text[], null, array['ホウ']::text[], array['つつ.む','くる.む']::text[], 5, '{}'::text[], null, '包む（つつむ）to wrap
小包（こづつみ）parcel
包み（つつみ）bundle
包装（ほうそう）packing', 2, array['N2']::text[]),
  ('kanji', '衣', null, array['garment','clothes','dressing']::text[], null, array['イ','エ']::text[], array['ころも','きぬ','-ぎ']::text[], 6, '{}'::text[], null, '衣服（いふく）clothes
衣料（いりょう）clothing
浴衣（ゆかた）bathrobe
衣食住（いしょくじゅう）food', 2, array['N2']::text[]),
  ('kanji', '鉱', null, array['mineral','ore']::text[], null, array['コウ']::text[], array['あらがね']::text[], 13, '{}'::text[], null, '鉱物（こうぶつ）mineral
炭鉱（たんこう）coal mine', 2, array['N2']::text[]),
  ('kanji', '到', null, array['arrival','proceed','reach','attain','result in']::text[], null, array['トウ']::text[], array['いた.る']::text[], 8, '{}'::text[], null, '到着（とうちゃく）arrival', 3, array['N3']::text[]),
  ('kanji', '双', null, array['pair','set','comparison','counter for pairs']::text[], null, array['ソウ']::text[], array['ふた','たぐい','ならぶ','ふたつ']::text[], 4, '{}'::text[], null, '双子（ふたご）twins', 2, array['N2']::text[]),
  ('kanji', '床', null, array['bed','counter for beds','floor','padding','tatami']::text[], null, array['ショウ']::text[], array['とこ','ゆか']::text[], 7, '{}'::text[], null, '床屋（とこや）barber''s (shop)
起床（きしょう）rising
床の間（とこのま）alcove', 2, array['N2']::text[]),
  ('kanji', '掘', null, array['dig','delve','excavate']::text[], null, array['クツ']::text[], array['ほ.る']::text[], 11, '{}'::text[], null, '掘る（ほる）to dig', 2, array['N2']::text[]),
  ('kanji', '泊', null, array['overnight stay','put up at','ride at anchor']::text[], null, array['ハク']::text[], array['と.まる','と.める']::text[], 8, '{}'::text[], null, '泊まる（とまる）to stay (over night) (v.i.)
宿泊（しゅくはく）lodging
泊める（とめる）to have someone stay (over night) (v.t.)
～泊（～はく）counter for staying (e.g., 2 nights)', 2, array['N2']::text[]),
  ('kanji', '荒', null, array['laid waste','rough','rude','wild']::text[], null, array['コウ']::text[], array['あら.い','あら-','あ.れる','あ.らす','-あ.らし','すさ.む']::text[], 9, '{}'::text[], null, '荒廃（こうはい）ruin
荒い（あらい）rough
荒れる（あれる）to be stormy', 2, array['N2']::text[]),
  ('kanji', '袋', null, array['sack','bag','pouch']::text[], null, array['タイ','ダイ']::text[], array['ふくろ']::text[], 11, '{}'::text[], null, '手袋（てぶくろ）glove(s)
足袋（たび）Japanese socks (with split toe)', 2, array['N2']::text[]),
  ('kanji', '珍', null, array['rare','curious','strange']::text[], null, array['チン']::text[], array['めずら.しい','たから']::text[], 9, '{}'::text[], null, '珍しい（めずらしい）unusual', 2, array['N2']::text[]),
  ('kanji', '籍', null, array['enroll','domiciliary register','membership']::text[], null, array['セキ']::text[], '{}'::text[], 20, '{}'::text[], null, '国籍（こくせき）nationality
書籍（しょせき）book', 2, array['N2']::text[]),
  ('kanji', '刷', null, array['printing','print','brush']::text[], null, array['サツ']::text[], array['す.る','-ず.り','-ずり','は.く']::text[], 8, '{}'::text[], null, '刷る（する）to print
印刷（いんさつ）printing', 2, array['N2']::text[]),
  ('kanji', '封', null, array['seal','closing']::text[], null, array['フウ','ホウ']::text[], '{}'::text[], 9, '{}'::text[], null, '封筒（ふうとう）envelope', 2, array['N2']::text[]),
  ('kanji', '筒', null, array['cylinder','pipe','tube','gun barrel','sleeve']::text[], null, array['トウ']::text[], array['つつ']::text[], 12, '{}'::text[], null, '封筒（ふうとう）envelope
水筒（すいとう）canteen', 2, array['N2']::text[]),
  ('kanji', '柔', null, array['tender','weakness','gentleness','softness']::text[], null, array['ジュウ','ニュウ']::text[], array['やわ.らか','やわ.らかい','やわ','やわ.ら']::text[], 9, '{}'::text[], null, '柔道（じゅうどう）judo
柔らかい（やわらかい）soft (in reference to texture)', 2, array['N2']::text[]),
  ('kanji', '沈', null, array['sink','be submerged','subside','be depressed','aloes']::text[], null, array['チン','ジン']::text[], array['しず.む','しず.める']::text[], 7, '{}'::text[], null, '沈む（しずむ）to sink', 2, array['N2']::text[]),
  ('kanji', '辛', null, array['spicy','bitter','hot','acrid']::text[], null, array['シン']::text[], array['から.い','つら.い','-づら.い','かのと']::text[], 7, '{}'::text[], null, '辛い（からい）hot and spicy
辛い（つらい）painful
塩辛（しおから）salty (taste)
～辛い（～づらい）hard to do ~', 2, array['N2']::text[]),
  ('kanji', '匹', null, array['equal','head','counter for small animals','roll of cloth']::text[], null, array['ヒツ']::text[], array['ひき']::text[], 4, '{}'::text[], null, '～匹（～ひき）counter for small animals', 2, array['N2']::text[]),
  ('kanji', '叫', null, array['shout','exclaim','yell']::text[], null, array['キョウ']::text[], array['さけ.ぶ']::text[], 6, '{}'::text[], null, '叫ぶ（さけぶ）to shout', 2, array['N2']::text[]),
  ('kanji', '髪', null, array['hair of the head']::text[], null, array['ハツ']::text[], array['かみ']::text[], 14, '{}'::text[], null, '髪の毛（かみのけ）hair (head)
白髪（しらが）white or grey hair', 3, array['N3']::text[]),
  ('kanji', '涙', null, array['tears','sympathy']::text[], null, array['ルイ','レイ']::text[], array['なみだ']::text[], 10, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '缶', null, array['tin can','container']::text[], null, array['カン']::text[], array['かま']::text[], 6, '{}'::text[], null, '缶詰（かんづめ）canning', 2, array['N2']::text[]),
  ('kanji', '粒', null, array['grains','drop','counter for tiny particles']::text[], null, array['リュウ']::text[], array['つぶ']::text[], 11, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '塔', null, array['pagoda','tower','steeple']::text[], null, array['トウ']::text[], '{}'::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '肌', null, array['texture','skin','body','grain']::text[], null, array['キ']::text[], array['はだ']::text[], 6, '{}'::text[], null, '肌着（はだぎ）underwear', 2, array['N2']::text[]),
  ('kanji', '舟', null, array['boat','ship']::text[], null, array['シュウ']::text[], array['ふね','ふな-','-ぶね']::text[], 6, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '曇', null, array['cloudy weather','cloud up']::text[], null, array['ドン']::text[], array['くも.る']::text[], 16, '{}'::text[], null, '曇り（くもり）cloudiness
曇る（くもる）to become cloudy', 2, array['N2']::text[]),
  ('kanji', '疲', null, array['exhausted','tire','weary']::text[], null, array['ヒ']::text[], array['つか.れる','-づか.れ','つか.らす']::text[], 10, '{}'::text[], null, '疲れる（つかれる）to get (become) tired
疲れ（つかれ）tiredness', 3, array['N3']::text[]),
  ('kanji', '磨', null, array['grind','polish','scour','improve','brush (teeth)']::text[], null, array['マ']::text[], array['みが.く','す.る']::text[], 16, '{}'::text[], null, '磨く（みがく）to brush (teeth)
歯磨き（はみがき）toothbrushing', 2, array['N2']::text[]),
  ('kanji', '湿', null, array['damp','wet','moist']::text[], null, array['シツ','シュウ']::text[], array['しめ.る','しめ.す','うるお.う','うるお.す']::text[], 12, '{}'::text[], null, '湿気（しっけ）moisture
湿度（しつど）humidity
湿る（しめる）to be wet
湿気（しっき）moisture', 2, array['N2']::text[]),
  ('kanji', '硬', null, array['stiff','hard']::text[], null, array['コウ']::text[], array['かた.い']::text[], 12, '{}'::text[], null, '堅; 硬; 固い（かたい）solid
硬い（かたい）hard
硬貨（こうか）coin', 2, array['N2']::text[]),
  ('kanji', '鈍', null, array['dull','slow','foolish','blunt']::text[], null, array['ドン']::text[], array['にぶ.い','にぶ.る','にぶ-','なま.る','なまく.ら']::text[], 12, '{}'::text[], null, '鈍い（にぶい）dull (e.g., a knife)
鈍い（のろい）dull (e.g., a knife)', 2, array['N2']::text[]),
  ('kanji', '歳', null, array['year-end','age','occasion','opportunity']::text[], null, array['サイ','セイ']::text[], array['とし','とせ','よわい']::text[], 13, '{}'::text[], null, '～歳（～さい）~ years old
二十歳（はたち）20 years old
万歳（ばんざい）banzai', 3, array['N3']::text[]),
  ('kanji', '涼', null, array['refreshing','nice and cool']::text[], null, array['リョウ']::text[], array['すず.しい','すず.む','すず.やか','うす.い','ひや.す','まことに']::text[], 11, '{}'::text[], null, '涼しい（すずしい）cool
涼む（すずむ）to cool oneself', 2, array['N2']::text[]),
  ('kanji', '零', null, array['zero','spill','overflow','nothing','cipher']::text[], null, array['レイ']::text[], array['ぜろ','こぼ.す','こぼ.れる']::text[], 13, '{}'::text[], null, '零点（れいてん）zero', 2, array['N2']::text[]),
  ('kanji', '綿', null, array['cotton']::text[], null, array['メン']::text[], array['わた']::text[], 14, '{}'::text[], null, '木綿（もめん）cotton', 2, array['N2']::text[]),
  ('kanji', '帽', null, array['cap','headgear']::text[], null, array['ボウ','モウ']::text[], array['ずきん','おお.う']::text[], 12, '{}'::text[], null, '帽子（ぼうし）hat', 2, array['N2']::text[]),
  ('kanji', '憎', null, array['hate','detest']::text[], null, array['ゾウ']::text[], array['にく.む','にく.い','にく.らしい','にく.しみ']::text[], 14, '{}'::text[], null, '憎い（にくい）hateful
憎む（にくむ）to hate
憎らしい（にくらしい）odious', 2, array['N2']::text[]),
  ('kanji', '滴', null, array['drip','drop']::text[], null, array['テキ']::text[], array['しずく','したた.る']::text[], 14, '{}'::text[], null, '～滴（～てき）drop
水滴（すいてき）drop of water', 2, array['N2']::text[]),
  ('kanji', '畳', null, array['tatami mat','counter for tatami mats','fold','shut up','do away with']::text[], null, array['ジョウ','チョウ']::text[], array['たた.む','たたみ','かさ.なる']::text[], 12, '{}'::text[], null, '畳む（たたむ）to fold (clothes)
～畳（～じょう）count for tatami', 2, array['N2']::text[]),
  ('kanji', '畜', null, array['livestock','domestic fowl and animals']::text[], null, array['チク']::text[], '{}'::text[], 10, '{}'::text[], null, '牧畜（ぼくちく）stock-farming', 2, array['N2']::text[]),
  ('kanji', '溶', null, array['melt','dissolve','thaw']::text[], null, array['ヨウ']::text[], array['と.ける','と.かす','と.く']::text[], 13, '{}'::text[], null, '溶く（とく）to dissolve (paint)
溶ける（とける）to melt
溶岩（ようがん）lava
溶かす（とかす）to melt', 2, array['N2']::text[]),
  ('kanji', '踊', null, array['jump','dance','leap','skip']::text[], null, array['ヨウ']::text[], array['おど.る']::text[], 14, '{}'::text[], null, '踊る（おどる）to dance
踊り（おどり）dance', 2, array['N2']::text[]),
  ('kanji', '賢', null, array['intelligent','wise','wisdom','cleverness']::text[], null, array['ケン']::text[], array['かしこ.い']::text[], 16, '{}'::text[], null, '賢い（かしこい）wise', 2, array['N2']::text[]),
  ('kanji', '灯', null, array['lamp','a light','light','counter for lights']::text[], null, array['トウ']::text[], array['ひ','ほ-','ともしび','とも.す','あかり']::text[], 6, '{}'::text[], null, '電灯（でんとう）electric light
灯台（とうだい）lighthouse
灯油（とうゆ）lamp oil
蛍光灯（けいこうとう）fluorescent lamp', 2, array['N2']::text[]),
  ('kanji', '咲', null, array['blossom','bloom']::text[], null, array['ショウ']::text[], array['さ.く','-ざき']::text[], 9, '{}'::text[], null, '咲く（さく）to bloom', 2, array['N2']::text[]),
  ('kanji', '塗', null, array['paint','plaster','daub','smear','coating']::text[], null, array['ト']::text[], array['ぬ.る','ぬ.り','まみ.れる']::text[], 13, '{}'::text[], null, '塗る（ぬる）to paint', 2, array['N2']::text[]),
  ('kanji', '偶', null, array['accidentally','even number','couple','man & wife','same kind']::text[], null, array['グウ']::text[], array['たま']::text[], 11, '{}'::text[], null, '偶然（ぐうぜん）(by) chance
偶々（たまたま）unexpectedly
偶数（ぐうすう）even number', 3, array['N3']::text[]),
  ('kanji', '偉', null, array['admirable','greatness','remarkable','conceited','famous','excellent']::text[], null, array['イ']::text[], array['えら.い']::text[], 12, '{}'::text[], null, '偉大（いだい）greatness
偉い（えらい）great', 3, array['N3']::text[]),
  ('kanji', '頂', null, array['place on the head','receive','top of head','top','summit','peak']::text[], null, array['チョウ']::text[], array['いただ.く','いただき']::text[], 11, '{}'::text[], null, '頂上（ちょうじょう）top
頂点（ちょうてん）top', 3, array['N3']::text[]),
  ('kanji', '召', null, array['seduce','call','send for','wear','put on','ride in','buy','eat','drink','catch (cold)']::text[], null, array['ショウ']::text[], array['め.す']::text[], 5, '{}'::text[], null, '召し上がる（めしあがる）-- honorific form of 食べる (たべる) and 飲む (のむ) --', 2, array['N2']::text[]),
  ('kanji', '挟', null, array['pinch','between']::text[], null, array['キョウ','ショウ']::text[], array['はさ.む','はさ.まる','わきばさ.む','さしはさ.む']::text[], 9, '{}'::text[], null, '挟む（はさむ）to pinch
挟まる（はさまる）to get between', 2, array['N2']::text[]),
  ('kanji', '枯', null, array['wither','die','dry up','be seasoned']::text[], null, array['コ']::text[], array['か.れる','か.らす']::text[], 9, '{}'::text[], null, '枯れる（かれる）to wither', 2, array['N2']::text[]),
  ('kanji', '沸', null, array['seethe','boil','ferment','uproar','breed']::text[], null, array['フツ']::text[], array['わ.く','わ.かす']::text[], 8, '{}'::text[], null, '沸く（わく）to boil
沸かす（わかす）to boil', 2, array['N2']::text[]),
  ('kanji', '濯', null, array['laundry','wash','pour on','rinse']::text[], null, array['タク']::text[], array['すす.ぐ','ゆす.ぐ']::text[], 17, '{}'::text[], null, '洗濯（せんたく）washing', 2, array['N2']::text[]),
  ('kanji', '燥', null, array['parch','dry up']::text[], null, array['ソウ']::text[], array['はしゃ.ぐ']::text[], 17, '{}'::text[], null, '乾燥（かんそう）dry', 2, array['N2']::text[]),
  ('kanji', '瓶', null, array['bottle','vial','jar','jug','vat','urn']::text[], null, array['ビン']::text[], array['かめ']::text[], 11, '{}'::text[], null, '花瓶（かびん）(flower) vase
瓶詰（びんづめ）bottling', 2, array['N2']::text[]),
  ('kanji', '耕', null, array['till','plow','cultivate']::text[], null, array['コウ']::text[], array['たがや.す']::text[], 10, '{}'::text[], null, '耕地（こうち）arable land
耕す（たがやす）to till', 2, array['N2']::text[]),
  ('kanji', '肯', null, array['agreement','consent','comply with']::text[], null, array['コウ']::text[], array['がえんじ.る']::text[], 8, '{}'::text[], null, '肯定（こうてい）positive', 2, array['N2']::text[]),
  ('kanji', '脂', null, array['fat','grease','tallow','lard','rosin','gum','tar']::text[], null, array['シ']::text[], array['あぶら']::text[], 10, '{}'::text[], null, '脂肪（しぼう）fat', 2, array['N2']::text[]),
  ('kanji', '膚', null, array['skin','body','grain','texture','disposition']::text[], null, array['フ']::text[], array['はだ']::text[], 15, '{}'::text[], null, '皮膚（ひふ）skin', 2, array['N2']::text[]),
  ('kanji', '軒', null, array['flats','counter for houses','eaves']::text[], null, array['ケン']::text[], array['のき']::text[], 10, '{}'::text[], null, '～軒（～けん）counter for houses', 2, array['N2']::text[]),
  ('kanji', '軟', null, array['soft']::text[], null, array['ナン']::text[], array['やわ.らか','やわ.らかい']::text[], 11, '{}'::text[], null, '軟らかい（やわらかい）soft', 2, array['N2']::text[]),
  ('kanji', '郊', null, array['outskirts','suburbs','rural area']::text[], null, array['コウ']::text[], '{}'::text[], 9, '{}'::text[], null, '郊外（こうがい）suburb', 2, array['N2']::text[]),
  ('kanji', '隅', null, array['corner','nook']::text[], null, array['グウ']::text[], array['すみ']::text[], 12, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('kanji', '隻', null, array['vessels','counter for ships','fish','birds','arrows','one of a pair']::text[], null, array['セキ']::text[], '{}'::text[], 10, '{}'::text[], null, null, 2, array['N2']::text[]),
  ('vocab', 'ああ', 'ああ', array['Ah!','Oh!']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '会う', 'あう', array['to meet','to see']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '青', 'あお', array['blue']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '青い', 'あおい', array['blue']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '赤', 'あか', array['red']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '赤い', 'あかい', array['red']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '明るい', 'あかるい', array['bright (in reference to personality or weather)','cheerful']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '秋', 'あき', array['fall (season)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '開く', 'あく', array['to open','to become open']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '開ける', 'あける', array['to open (v.t.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '上げる', 'あげる', array['to raise','to lift']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '朝', 'あさ', array['morning']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '朝御飯', 'あさごはん', array['breakfast']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '明後日', 'あさって', array['day after tomorrow']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '足; 脚', 'あし', array['foot','leg']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '明日', 'あした', array['tomorrow']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'あそこ', 'あそこ', array['there','over there','that place']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '遊ぶ', 'あそぶ', array['to play','to spend time pleasantly','to hang out']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '暖かい', 'あたたかい', array['warm']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '頭', 'あたま', array['head']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '新しい', 'あたらしい', array['new']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[])
on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set
  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,
  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,
  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags,
  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);

insert into public.cards ("type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags") values
  ('vocab', 'あちら', 'あちら', array['this way (polite)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '暑い', 'あつい', array['hot (in reference to weather)','warm']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '熱い', 'あつい', array['hot (objects)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '厚い', 'あつい', array['kind','warm(hearted)','thick','deep']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'あっち', 'あっち', array['over there']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '後', 'あと', array['afterwards (later)','in the future','the rest','since then']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'あなた', 'あなた', array['you']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '兄', 'あに', array['(my) older brother (humble)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '姉', 'あね', array['(my) older sister (humble)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'アパート', 'アパート', array['apartment (abbr.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'あの', 'あの', array['that over there','like that','that way','um...']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '浴びる', 'あびる', array['to bathe','to shower']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '危ない', 'あぶない', array['dangerous','critical']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '甘い', 'あまい', array['generous','sweet']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '余り', 'あまり', array['not very','surplus']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '雨', 'あめ', array['rain']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '飴', 'あめ', array['(hard) candy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '洗う', 'あらう', array['to wash']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '在る', 'ある', array['to be','to have']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '有る', 'ある', array['to be','to have']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '歩く', 'あるく', array['to walk']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'あれ', 'あれ', array['that one (over there)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いい; よい', 'いい; よい', array['good']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いいえ', 'いいえ', array['no','not at all']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '言う', 'いう', array['to say']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '家', 'いえ', array['house','home']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いかが', 'いかが', array['how','in what way']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '行く', 'いく; ゆく', array['to go']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いくつ', 'いくつ', array['how many','how old']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いくら', 'いくら', array['how much','how many']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '池', 'いけ', array['pond']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '医者', 'いしゃ', array['doctor','physician']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '椅子', 'いす', array['chair']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '忙しい', 'いそがしい', array['busy (people, days)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '痛い', 'いたい', array['hurt','painful','sore']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一', 'いち', array['one']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一日', 'いちにち', array['one day (duration)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一番', 'いちばん', array['best (most)','first','number one']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いつ', 'いつ', array['when']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '五日', 'いつか', array['five days','fifth day of the month']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一緒', 'いっしょ', array['together']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '五つ', 'いつつ', array['five things']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'いつも', 'いつも', array['always','usually','every time','never (with neg. verb)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '犬', 'いぬ', array['dog']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今', 'いま', array['now']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '意味', 'いみ', array['meaning','significance']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '妹', 'いもうと', array['younger sister (humble)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '嫌', 'いや', array['disagreeable','detestable','unpleasant']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '入口', 'いりぐち', array['entrance']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '居る', 'いる', array['(humble) to be (animate)','to exist']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '要る', 'いる', array['to need']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '入れる', 'いれる', array['to put in']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '色', 'いろ', array['color']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '色々', 'いろいろ', array['various']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '上', 'うえ', array['above (up, top, etc.)','over','on top of']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '後ろ', 'うしろ', array['back','behind','rear']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '薄い', 'うすい', array['thin','weak']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '歌', 'うた', array['a song']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '歌う', 'うたう', array['to sing']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'うち', 'うち', array['home','house','my place']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '生まれる', 'うまれる', array['to be born']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '海', 'うみ', array['sea','beach']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '売る', 'うる', array['to sell (v.t.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'うるさい', 'うるさい', array['noisy','annoying']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '上着', 'うわぎ', array['coat','jacket']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '絵', 'え', array['a painting','a picture','a drawing']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '映画', 'えいが', array['movie','film']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '映画館', 'えいがかん', array['movie theater','cinema']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '英語', 'えいご', array['English (language)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ええ', 'ええ', array['yes']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '駅', 'えき', array['station']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'エレベーター', 'エレベーター', array['elevator']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～円', '～えん', array['Yen']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '鉛筆', 'えんぴつ', array['pencil']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お～', 'お～', array['honorable ~ (honorific)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '美味しい', 'おいしい', array['delicious','tasty']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '多い', 'おおい', array['many','there are a lot']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大きい', 'おおきい', array['big','large']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大きな', 'おおきな', array['big']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大勢', 'おおぜい', array['great number of people']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お母さん', 'おかあさん', array['mother (formal)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お菓子', 'おかし', array['confections','sweets','snack']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お金', 'おかね', array['money']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '起きる', 'おきる', array['to get up (e.g., from sleeping)','to happen']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '置く', 'おく', array['to put','to lay','to place']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '奥さん', 'おくさん', array['(someone else''s) wife (hon.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お酒', 'おさけ', array['sake','alcohol']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お皿', 'おさら', array['plate','dish']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '伯父; 叔父さん', 'おじさん', array['uncle','middle-aged man']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'おじいさん', 'おじいさん', array['grandfather','male senior citizen']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '教える', 'おしえる', array['to teach','to inform','to instruct']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '押す', 'おす', array['to push','to press','to stamp (e.g., a passport)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '遅い', 'おそい', array['slow','(to be) late']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お茶', 'おちゃ', array['(green) tea']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お手洗い', 'おてあらい', array['toilet','restroom','bathroom (lit., a place to wash one''s hands)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お父さん', 'おとうさん', array['father (formal)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '弟', 'おとうと', array['younger brother']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '男', 'おとこ', array['man','male']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '男の子', 'おとこのこ', array['boy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一昨日', 'おととい', array['the day before yesterday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'おととし', 'おととし', array['year before last']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大人', 'おとな', array['adult']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お腹', 'おなか', array['stomach']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '同じ', 'おなじ', array['same','identical']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お兄さん', 'おにいさん', array['(someone else''s) older brother (formal)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お姉さん', 'おねえさん', array['older sister (formal)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '伯母さん; 叔母さん', 'おばさん', array['aunt']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'おばあさん', 'おばあさん', array['grandmother','female senior-citizen']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お風呂', 'おふろ', array['a bath']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'お弁当', 'おべんとう', array['a boxed lunch']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '覚える', 'おぼえる', array['to learn','to commit to memory','to remember','to memorize']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'おまわりさん', 'おまわりさん', array['policeman (friendly term)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '重い', 'おもい', array['heavy','serious']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '面白い', 'おもしろい', array['interesting','amusing']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '泳ぐ', 'およぐ', array['to swim']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '降りる', 'おりる', array['to get off']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '終る', 'おわる', array['to finish','to close']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '音楽', 'おんがく', array['Music']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '女', 'おんな', array['woman','female']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '女の子', 'おんなのこ', array['girl']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～回', '～かい', array['counter for occurrences (~ times)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～階', '～かい', array['counter for stories (floors) of a building']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '外国', 'がいこく', array['foreign country','abroad']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '外国人', 'がいこくじん', array['foreigner']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '会社', 'かいしゃ', array['company','corporation']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '階段', 'かいだん', array['stairs']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '買い物', 'かいもの', array['shopping']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '買う', 'かう', array['to buy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '返す', 'かえす', array['to return something']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '帰る', 'かえる', array['to go back','to go home','to return']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '顔', 'かお', array['face (body part)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'かかる', 'かかる', array['it takes (amount of time, money) (v.i.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '鍵', 'かぎ', array['a lock','a key']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '書く', 'かく', array['to write']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '学生', 'がくせい', array['student']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～か月', '～かげつ', array['(number of) months']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '掛ける', 'かける', array['to put on (e.g., glasses)','to hang (e.g., on a wall)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'かける', 'かける', array['to dial/call (e.g., phone)','to sit down']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '傘', 'かさ', array['umbrella','parasol']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '貸す', 'かす', array['to lend']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '風', 'かぜ', array['wind','breeze']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '風邪', 'かぜ', array['cold','flu']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '方', 'かた', array['-- honorific form for 人 (ひと) --','way of doing']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '家族', 'かぞく', array['family','members of a family']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '片仮名', 'かたかな', array['katakana']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～月', '～がつ', array['month of year']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '学校', 'がっこう', array['a school']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'カップ', 'カップ', array['cup']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '家庭', 'かてい', array['home','family']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '角', 'かど', array['corner (e.g., desk, pavement)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'かばん', 'かばん', array['bag','basket']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '花瓶', 'かびん', array['(flower) vase']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'かぶる', 'かぶる', array['to wear','to put on (e.g., a hat on the head)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '紙', 'かみ', array['paper']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'カメラ', 'カメラ', array['camera']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '火曜日', 'かようび', array['Tuesday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '辛い', 'からい', array['hot and spicy','salty']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '体', 'からだ', array['body','health']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '借りる', 'かりる', array['to borrow','to owe']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～がる', '～がる', array['feel']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '軽い', 'かるい', array['light','non-serious','minor']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'カレー', 'カレー', array['curry (abbr. for curry and rice)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'カレンダー', 'カレンダー', array['calendar']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '川; 河', 'かわ', array['river']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～側', '～がわ', array['~ side']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '可愛い', 'かわいい', array['cute','adorable']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '漢字', 'かんじ', array['kanji','Chinese character']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '木', 'き', array['tree','wood','timber']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '黄色', 'きいろ', array['yellow']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '黄色い', 'きいろい', array['yellow']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '消える', 'きえる', array['to vanish','to disappear']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '聞く', 'きく', array['to hear','to listen','to ask']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '北', 'きた', array['north']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ギター', 'ギター', array['guitar']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '汚い', 'きたない', array['dirty','unclean','filthy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '喫茶店', 'きっさてん', array['café']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '切手', 'きって', array['postal (postage) stamps']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '切符', 'きっぷ', array['a ticket']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '昨日', 'きのう', array['yesterday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '九', 'きゅう', array['nine']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '牛肉', 'ぎゅうにく', array['beef']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '牛乳', 'ぎゅうにゅう', array['milk']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今日', 'きょう', array['today','this day']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '教室', 'きょうしつ', array['classroom']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '兄弟', 'きょうだい', array['siblings (humble)','brothers and sisters']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '去年', 'きょねん', array['last year']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '嫌い', 'きらい', array['dislike']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '切る', 'きる', array['to cut','to hang up (a phone)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '着る', 'きる', array['to put on (clothes above your waist)','to wear']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '綺麗', 'きれい', array['pretty','clean','tidy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'キロ; キログラム', 'キロ; キログラム', array['(abbr.) kilo (kilogram)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'キロ; キロメートル', 'キロ; キロメートル', array['(abbr.) kilo (kilometer)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '銀行', 'ぎんこう', array['bank']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '金曜日', 'きんようび', array['Friday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '九', 'く', array['nine']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '薬', 'くすり', array['medicine']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '下さい', 'ください', array['(with te-form verb) please do for me']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '果物', 'くだもの', array['fruit']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '口', 'くち', array['job opening','mouth']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '靴', 'くつ', array['shoes','footwear']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[])
on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set
  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,
  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,
  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags,
  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);

insert into public.cards ("type", "term", "reading", "meaning_en", "meaning_my", "onyomi", "kunyomi", "stroke_count", "similar", "similar_note", "example_jp", "jlpt_level", "tags") values
  ('vocab', '靴下', 'くつした', array['socks']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '国', 'くに', array['country','place of origin']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '曇り', 'くもり', array['cloudiness','cloudy weather']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '曇る', 'くもる', array['to become cloudy','to become dim']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '暗い', 'くらい', array['dark','gloomy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～くらい; ぐらい', '～くらい; ぐらい', array['approximate (quantity)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'クラス', 'クラス', array['a class']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'グラム', 'グラム', array['gram']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '来る', 'くる', array['to come']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '車', 'くるま', array['car','vehicle']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '黒', 'くろ', array['black']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '黒い', 'くろい', array['black','dark']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '警官', 'けいかん', array['police officer']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今朝', 'けさ', array['this morning']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '消す', 'けす', array['to erase','to delete','to turn off power']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '結構', 'けっこう', array['splendid','enough','tolerably']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '結婚', 'けっこん (する)', array['marriage (get married)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '月曜日', 'げつようび', array['Monday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '玄関', 'げんかん', array['entrance (to a house or a building)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '元気', 'げんき', array['health(y)','energetic']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～個', '～こ', array['counter for small items (e.g., fruits, cups)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '五', 'ご', array['five']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～語', '～ご', array['word','language']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '公園', 'こうえん', array['a park']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '交差点', 'こうさてん', array['intersection']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '紅茶', 'こうちゃ', array['black tea']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '交番', 'こうばん', array['police box']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '声', 'こえ', array['voice']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'コート', 'コート', array['coat','court (e.g., tennis)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'コーヒー', 'コーヒー', array['coffee']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ここ', 'ここ', array['here','this place']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '午後', 'ごご', array['afternoon','P.M.']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '九日', 'ここのか', array['nine days','ninth day of the month']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '九つ', 'ここのつ', array['nine things']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '午前', 'ごぜん', array['morning','A.M.']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '答える', 'こたえる', array['to answer','to reply']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'こちら', 'こちら', array['this person (polite)','this way (polite)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'こっち', 'こっち', array['this person','this direction','this side']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'コップ', 'コップ', array['a tumbler','a glass']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今年', 'ことし', array['this year']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '言葉', 'ことば', array['language','word(s)','expression(s)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '子供', 'こども', array['child(ren)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'この', 'この', array['this']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '御飯', 'ごはん', array['rice (cooked)','meal']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'コピーする', 'コピーする', array['to copy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '困る', 'こまる', array['to be bothered','to have difficulty']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'これ', 'これ', array['this one']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～ころ; ～ごろ', '～ころ; ～ごろ', array['about','toward','approximately (time)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今月', 'こんげつ', array['this month']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今週', 'こんしゅう', array['this week']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'こんな', 'こんな', array['such','like this']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '今晩', 'こんばん', array['tonight','this evening']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'さあ', 'さあ', array['come now','well']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～歳', '～さい', array['~ years old']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '財布', 'さいふ', array['wallet']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '魚', 'さかな', array['fish']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '先', 'さき', array['future','recent','previous']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '咲く', 'さく', array['to bloom']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '作文', 'さくぶん', array['essay','composition']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '差す', 'さす', array['to raise (stretch out) hands','to raise (e.g., umbrella)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～冊', '～さつ', array['counter for books']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '雑誌', 'ざっし', array['magazine','journal']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '砂糖', 'さとう', array['sugar']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '寒い', 'さむい', array['cold (in reference to weather)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'さ来年', 'さらいねん', array['year after next']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～さん', '～さん', array['Mr. ~','Ms. ~']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '三', 'さん', array['three']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '散歩', 'さんぽ (する)', array['walk','stroll']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '四', 'し', array['four']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～時', '～じ', array['~ o''clock (time)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '塩', 'しお', array['salt']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'しかし', 'しかし', array['however','but']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '時間', 'じかん', array['time']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～時間', '～じかん', array['~ hours']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '仕事', 'しごと', array['work','job','occupation','employment']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '辞書', 'じしょ', array['dictionary']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '静か', 'しずか', array['quiet','calm']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '下', 'した', array['under','below','beneath']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '七', 'しち', array['seven']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '質問', 'しつもん', array['question','inquiry']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '自転車', 'じてんしゃ', array['bicycle']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '自動車', 'じどうしゃ', array['automobile']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '死ぬ', 'しぬ', array['to die']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '字引', 'じびき', array['dictionary']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '自分', 'じぶん', array['myself','oneself']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '閉まる', 'しまる', array['to close','to be closed']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '閉める', 'しめる', array['to close','to shut']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '締める', 'しめる', array['to tie','to fasten','to tighten']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'じゃ; じゃあ', 'じゃ; じゃあ', array['well','well then']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '写真', 'しゃしん', array['a picture','a photograph']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'シャツ', 'シャツ', array['shirt']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'シャワー', 'シャワー', array['shower']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '十', 'じゅう', array['ten']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～中', '～じゅう', array['during','while']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～週間', '～しゅうかん', array['~ weeks']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '授業', 'じゅぎょう', array['a class (of school)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '宿題', 'しゅくだい', array['homework']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '上手', 'じょうず', array['be good at','skillful']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '丈夫', 'じょうぶ', array['strong','solid','durable']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '醤油', 'しょうゆ', array['soy sauce']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '食堂', 'しょくどう', array['cafeteria','dining hall']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '知る', 'しる', array['to know','to understand']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '白', 'しろ', array['white']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '白い', 'しろい', array['white']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～人', '～じん', array['counter for people']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '新聞', 'しんぶん', array['newspaper']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '水曜日', 'すいようび', array['Wednesday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '吸う', 'すう', array['to breathe in','to suck']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'スカート', 'スカート', array['skirt']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '好き', 'すき', array['liking','fondness','love']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～すぎ', '～すぎ', array['past','to exceed','~ too much']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '少ない', 'すくない', array['a little','a few']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'すぐに', 'すぐに', array['immediately','soon']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '少し', 'すこし', array['little','few']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '涼しい', 'すずしい', array['cool','refreshing (in reference to weather)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～ずつ', '～ずつ', array['at a time']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ストーブ', 'ストーブ', array['heater (lit: stove)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'スプーン', 'スプーン', array['spoon']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'スポーツ', 'スポーツ', array['sport(s)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ズボン', 'ズボン', array['trousers']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '住む', 'すむ', array['to reside','to live in']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'する', 'する', array['to do','to try','to wear small items (e.g., necktie, watch, etc.)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '座る', 'すわる', array['to sit']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '背', 'せい', array['(one''s) height','stature']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '生徒', 'せいと', array['student','pupil']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'セーター', 'セーター', array['sweater']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '石鹸', 'せっけん', array['soap']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '背広', 'せびろ', array['men''s suit']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '狭い', 'せまい', array['narrow','not spacious']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ゼロ', 'ゼロ', array['zero']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '千', 'せん', array['thousand']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '先月', 'せんげつ', array['last month']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '先週', 'せんしゅう', array['last week']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '先生', 'せんせい', array['teacher','professor','master','doctor']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '洗濯', 'せんたく', array['washing','laundry']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '全部', 'ぜんぶ', array['all','entire','whole']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そう; そうです', 'そう; そうです', array['yes','appears','to be the case']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '掃除', 'そうじ (する)', array['cleaning','sweeping']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そうして; そして', 'そうして; そして', array['and','like that']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そこ', 'そこ', array['that place','there','bottom','sole']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そちら', 'そちら', array['over there']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そっち', 'そっち', array['over there']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '外', 'そと', array['outside','exterior']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'その', 'その', array['that']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'そば', 'そば', array['near','close','beside','Japanese traditional buckwheat noodle']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '空', 'そら', array['sky']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'それ', 'それ', array['that one']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'それから', 'それから', array['and then','after that']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'それでは', 'それでは', array['in that situation','well then...']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～台', '～だい', array['counter for vehicles','machines']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大学', 'だいがく', array['college','university']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大使館', 'たいしかん', array['embassy']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大丈夫', 'だいじょうぶ', array['It''s ok (all right)','No need to worry','Everything is under control']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大好き', 'だいすき', array['very like-able','like very much']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大切', 'たいせつ', array['important']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '台所', 'だいどころ', array['kitchen']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '大変', 'たいへん', array['very','difficult','hard']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '高い', 'たかい', array['tall','high','expensive']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～だけ', '～だけ', array['only ~','just ~','as ~']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '沢山', 'たくさん', array['many','much']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'タクシー', 'タクシー', array['taxi']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '出す', 'だす', array['to take (something) out','to hand in (something)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～たち', '～たち', array['plural suffix']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '立つ', 'たつ', array['to stand up']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'たて', 'たて', array['length','height']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '建物', 'たてもの', array['building']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '楽しい', 'たのしい', array['enjoyable','fun']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '頼む', 'たのむ', array['to request','to ask (a favor)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'たばこ', 'たばこ', array['tobacco','cigarettes']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '多分', 'たぶん', array['perhaps','probably','maybe']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '食べ物', 'たべもの', array['food']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '食べる', 'たべる', array['to eat']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '卵', 'たまご', array['egg']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '誰', 'だれ', array['who']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '誰か', 'だれか', array['someone']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '誕生日', 'たんじょうび', array['birthday']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '段々', 'だんだん', array['gradually','by degrees']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '小さい', 'ちいさい', array['small','little']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '小さな', 'ちいさな', array['small','little']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '近い', 'ちかい', array['near','close by','short']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '違う', 'ちがう', array['to be different','to differ','wrong']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '近く', 'ちかく', array['nearby','in the neighborhood']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '地下鉄', 'ちかてつ', array['underground train','subway']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '地図', 'ちず', array['a map']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '父', 'ちち', array['(my) father']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '茶色', 'ちゃいろ', array['brown']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '茶碗', 'ちゃわん', array['rice bowl']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '～中', '～ちゅう', array['during','while ~ing']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '丁度', 'ちょうど', array['just','right','exactly']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'ちょっと', 'ちょっと', array['a little','somewhat','just a little','somewhat']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '一日', 'ついたち', array['one day','first day of the month']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '使う', 'つかう', array['to use']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '疲れる', 'つかれる', array['to get (become) tired','to become fatigued']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '次', 'つぎ', array['next']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '着く', 'つく', array['to arrive at','to reach']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '机', 'つくえ', array['desk']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '作る', 'つくる', array['to make','to create']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'つける', 'つける', array['to turn on (e.g., a light)','to take']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', '勤める', 'つとめる', array['to work (for)']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[]),
  ('vocab', 'つまらない', 'つまらない', array['boring','dull','insignificant']::text[], null, '{}'::text[], '{}'::text[], null, '{}'::text[], null, null, 5, array['N5']::text[])
on conflict (type, term, coalesce(reading, '')) where owner_id is null do update set
  meaning_en = excluded.meaning_en, onyomi = excluded.onyomi, kunyomi = excluded.kunyomi,
  stroke_count = excluded.stroke_count, "similar" = excluded."similar", similar_note = excluded.similar_note,
  example_jp = excluded.example_jp, jlpt_level = excluded.jlpt_level, tags = excluded.tags,
  meaning_my = coalesce(public.cards.meaning_my, excluded.meaning_my);

