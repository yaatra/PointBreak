'use strict'
const database = require('./server/db')
const db = require('./server/db/models')
const {User, Event, Category,
   Destination, AssociatedEvent,
   PreferredCategory,
   PreferredDestination,
   Language, AssociatedLanguage, Fitbit} = db

//Create seed data
let data = {
  fitbitData: [
    {id: 1, accessToken: 1312, weekAverageSteps: 5000, monthAverageSteps: 30000},
    {id: 2, accessToken: 1312, weekAverageSteps: 7000, monthAverageSteps: 35000},
    {id: 3, accessToken: 1312, weekAverageSteps: 8000, monthAverageSteps: 49000},
    {id: 4, accessToken: 1312, weekAverageSteps: 9000, monthAverageSteps: 55000}
  ],
  userData: [

    {firstName: 'Eren', lastName: 'Chen', gender: 'female', email: 'eren@gmail.com', password: '123', isAdmin: true, isProfessional: true, bmi: 23.7, height: 6.1, weight: 180, age: 25, avatar: 'https://pbs.twimg.com/profile_images/582688964613566464/CTzZir9c.jpg'},
    {firstName: 'Ranjeet', lastName: 'Sodhi', gender: 'male', email: 'ranjeet@gmail.com', password: '123', isAdmin: true, isProfessional: false, bmi: 97.7, height: 4, weight: 320, age: 90, avatar: 'https://i.ytimg.com/vi/aIN6BTToTP4/maxresdefault.jpg'},
    {firstName: 'Bojan', lastName: 'Jovanovic', gender: 'male', email: 'bojan@gmail.com', password: '123', isAdmin: true, isProfessional: true, bmi: 23.7, height: 6.1, weight: 180, age: 25, avatar: 'https://pbs.twimg.com/profile_images/582688964613566464/CTzZir9c.jpg'},
    {firstName: 'David', lastName: 'Eiber', gender: 'female', email: 'david@gmail.com', password: '123', isAdmin: true, isProfessional: false, bmi: 23.7, height: 6.1, weight: 180, age: 25, avatar: 'https://pbs.twimg.com/profile_images/582688964613566464/CTzZir9c.jpg'}
  ],
  eventData: [
    {name: 'Race The Rabbit', image: 'https://i.ytimg.com/vi/x_CFMV_BSPE/maxresdefault.jpg', description: 'Racing event in Bangkok', date: '2017-11-03 14:34:22', difficulty: 7, categoryId: 1, destinationId: 1, location: 'New York, NY, United States', lat:40.7127837, lng:-74.00594130000002 },
    {name: 'Paris Dakar', image: 'https://s-media-cache-ak0.pinimg.com/originals/26/32/ae/2632ae81202f4ca83a2435b1697ebab5.jpg', description: 'Race people down the most exciting parts of Paris Dakar route', date: '2017-10-15 14:00:00', difficulty: 5, categoryId: 2, destinationId: 2, location: 'New York, NY, United States', lat:40.7127837, lng:-74.00594130000002},
    {name: 'Fly With Eagles', image: 'https://s-media-cache-ak0.pinimg.com/originals/c0/99/b1/c099b1b44e4737b30c19749a0554566b.jpg', description: 'Skydiving on shore of Pacific Ocean', date: '2017-10-09 12:00:00', difficulty: 8, categoryId: 3, destinationId: 3, location: 'New York, NY, United States', lat:40.7127837, lng:-74.00594130000002},
    {name: 'Jump the Hex', image: 'https://s7.favim.com/orig/150320/beach-happiness-happy-life-Favim.com-2579877.jpg', description: 'Experience the amazing Amazon Forrest views', date: '2017-12-14 8:30:00', difficulty: 7, categoryId: 4, destinationId: 4, location: 'New York, NY, United States', lat:40.7127837, lng:-74.00594130000002},
    {name: 'Surf the Dragon', image: 'https://travelmoredotph.files.wordpress.com/2016/05/surfing-photo-main.jpg?w=1200', description: 'Waves are outta control here!', date: '2018-01-18 10:15:00', difficulty: 4, categoryId: 1, destinationId: 1, location: 'San Francisco, CA, United States', lat:37.7749295, lng:-122.41941550000001},
    {name: 'Sharky Barky', image: 'https://travelmoredotph.files.wordpress.com/2016/05/surfing-photo-main.jpg?w=1200', description: 'Sharks are our best friends!', date: '2018-01-18 10:15:00', difficulty: 4, categoryId: 2, destinationId: 2, location: 'San Francisco, CA, United States', lat:37.7749295, lng:-122.41941550000001},
    {name: 'Conquer Mount Blanc', image: 'http://ftpcontent.worldnow.com/kfmb/images/shark_sandiego1.jpg', description: 'Climbing Mt. Blanc', date: '2018-02-22 10:15:00', difficulty: 8, categoryId: 3, destinationId: 3, location: 'San Francisco, CA, United States', lat:37.7749295, lng:-122.41941550000001},
    {name: 'Everest base camp Expedition', image: 'http://nepalexpeditions.biz/wp-content/uploads/everest-base-camp-nepal-trek.jpg', description: 'Get to the base camp of towards Mt. Everest', date: '2018-04-22 07:15:00', difficulty: 6, categoryId: 4, destinationId: 4, location: 'San Francisco, CA, United States', lat:37.7749295, lng:-122.41941550000001}
  ],
  categoryData: [
    {name: 'Climbing', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjw0K_n08jWAhUMVxQKHRVJBocQjRwIBw&url=https%3A%2F%2Fwww.outdoorgearlab.com%2Fclimbing&psig=AFQjCNFxL6nSNgJFeC-1CBSxU3Zw8wp90g&ust=1506714701662434'},
    {name: 'Skydiving', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjx3qeD1MjWAhXHWhQKHR8QBFsQjRwIBw&url=http%3A%2F%2Fwww.skydiveharborsprings.com%2F&psig=AFQjCNHy6N3N4mwmN5hsoXLTPx4m7stebQ&ust=1506714751721889'},
    {name: 'Surfing', image: 'https://coresites-cdn.factorymedia.com/mpora_new/wp-content/uploads/2017/02/vladimir-kudinov-65978.jpg'},
    {name: 'Racing', image: 'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'},
  ],
  destinationData: [
    {city: 'New York', state: 'NY', country: 'United States',latitude: 40.7127837, longitude: -74.00594130000002},
    {city: 'London', state: 'England',  country: 'United Kingdom',latitude: 51.5073509, longitude: -0.12775829999998223},
    {city: 'San Francisco', state: 'CA', country: 'United States',latitude: 37.7749295, longitude: -122.41941550000001},
    {city: 'Juno', state: 'AK', country: 'United States', latitude: 58.3019444, longitude: -134.4197221},
    {city: 'Sydney', state: 'New South Wales', country: 'Australia', latitude: -33.8688197, longitude: 151.20929550000005},
    {city: 'Medellín', state: 'Antioquia', country: 'Colombia', latitude: 6.244203, longitude: -75.58121189999997},
    {city: 'Rio de Janeiro', state: 'State of Rio de Janeiro', country: 'Brazil', latitude: -22.9068467, longitude: -43.17289649999998}
  ],
  associatedEventData: [
    {userId: 1, eventId: 1, type: 'selected'},
    {userId: 2, eventId: 2, type: 'followed'},
    {userId: 3, eventId: 3, type: 'selected'},
    {userId: 4, eventId: 4, type: 'followed'}
  ],
  preferredCategoryData: [
    {userId: 1, categoryId: 1},
    {userId: 1, categoryId: 2},
    {userId: 2, categoryId: 3},
    {userId: 2, categoryId: 4},
    {userId: 3, categoryId: 3},
    {userId: 3, categoryId: 1},
    {userId: 4, categoryId: 4},
    {userId: 4, categoryId: 2},
  ],
  preferredDestinationData: [
    {userId: 1, destinationId: 4},
    {userId: 1, destinationId: 1},
    {userId: 2, destinationId: 7},
    {userId: 2, destinationId: 5},
    {userId: 2, destinationId: 6},
    {userId: 3, destinationId: 1},
    {userId: 3, destinationId: 2},
    {userId: 3, destinationId: 5},
    {userId: 3, destinationId: 6},
    {userId: 4, destinationId: 1},
    {userId: 4, destinationId: 4},
  ],
  languageData: [
    {"code":"ab","name":"Abkhaz","nativeName":"аҧсуа"},
    {"code":"aa","name":"Afar","nativeName":"Afaraf"},
    {"code":"af","name":"Afrikaans","nativeName":"Afrikaans"},
    {"code":"ak","name":"Akan","nativeName":"Akan"},
    {"code":"sq","name":"Albanian","nativeName":"Shqip"},
    {"code":"am","name":"Amharic","nativeName":"አማርኛ"},
    {"code":"ar","name":"Arabic","nativeName":"العربية"},
    {"code":"an","name":"Aragonese","nativeName":"Aragonés"},
    {"code":"hy","name":"Armenian","nativeName":"Հայերեն"},
    {"code":"as","name":"Assamese","nativeName":"অসমীয়া"},
    {"code":"av","name":"Avaric","nativeName":"авар мацӀ, магӀарул мацӀ"},
    {"code":"ae","name":"Avestan","nativeName":"avesta"},
    {"code":"ay","name":"Aymara","nativeName":"aymar aru"},
    {"code":"az","name":"Azerbaijani","nativeName":"azərbaycan dili"},
    {"code":"bm","name":"Bambara","nativeName":"bamanankan"},
    {"code":"ba","name":"Bashkir","nativeName":"башҡорт теле"},
    {"code":"eu","name":"Basque","nativeName":"euskara, euskera"},
    {"code":"be","name":"Belarusian","nativeName":"Беларуская"},
    {"code":"bn","name":"Bengali","nativeName":"বাংলা"},
    {"code":"bh","name":"Bihari","nativeName":"भोजपुरी"},
    {"code":"bi","name":"Bislama","nativeName":"Bislama"},
    {"code":"bs","name":"Bosnian","nativeName":"bosanski jezik"},
    {"code":"br","name":"Breton","nativeName":"brezhoneg"},
    {"code":"bg","name":"Bulgarian","nativeName":"български език"},
    {"code":"my","name":"Burmese","nativeName":"ဗမာစာ"},
    {"code":"ca","name":"Catalan; Valencian","nativeName":"Català"},
    {"code":"ch","name":"Chamorro","nativeName":"Chamoru"},
    {"code":"ce","name":"Chechen","nativeName":"нохчийн мотт"},
    {"code":"ny","name":"Chichewa; Chewa; Nyanja","nativeName":"chiCheŵa, chinyanja"},
    {"code":"zh","name":"Chinese","nativeName":"中文 (Zhōngwén), 汉语, 漢語"},
    {"code":"cv","name":"Chuvash","nativeName":"чӑваш чӗлхи"},
    {"code":"kw","name":"Cornish","nativeName":"Kernewek"},
    {"code":"co","name":"Corsican","nativeName":"corsu, lingua corsa"},
    {"code":"cr","name":"Cree","nativeName":"ᓀᐦᐃᔭᐍᐏᐣ"},
    {"code":"hr","name":"Croatian","nativeName":"hrvatski"},
    {"code":"cs","name":"Czech","nativeName":"česky, čeština"},
    {"code":"da","name":"Danish","nativeName":"dansk"},
    {"code":"dv","name":"Divehi; Dhivehi; Maldivian;","nativeName":"ދިވެހި"},
    {"code":"nl","name":"Dutch","nativeName":"Nederlands, Vlaams"},
    {"code":"en","name":"English","nativeName":"English"},
    {"code":"eo","name":"Esperanto","nativeName":"Esperanto"},
    {"code":"et","name":"Estonian","nativeName":"eesti, eesti keel"},
    {"code":"ee","name":"Ewe","nativeName":"Eʋegbe"},
    {"code":"fo","name":"Faroese","nativeName":"føroyskt"},
    {"code":"fj","name":"Fijian","nativeName":"vosa Vakaviti"},
    {"code":"fi","name":"Finnish","nativeName":"suomi, suomen kieli"},
    {"code":"fr","name":"French","nativeName":"français, langue française"},
    {"code":"ff","name":"Fula; Fulah; Pulaar; Pular","nativeName":"Fulfulde, Pulaar, Pular"},
    {"code":"gl","name":"Galician","nativeName":"Galego"},
    {"code":"ka","name":"Georgian","nativeName":"ქართული"},
    {"code":"de","name":"German","nativeName":"Deutsch"},
    {"code":"el","name":"Greek, Modern","nativeName":"Ελληνικά"},
    {"code":"gn","name":"Guaraní","nativeName":"Avañeẽ"},
    {"code":"gu","name":"Gujarati","nativeName":"ગુજરાતી"},
    {"code":"ht","name":"Haitian; Haitian Creole","nativeName":"Kreyòl ayisyen"},
    {"code":"ha","name":"Hausa","nativeName":"Hausa, هَوُسَ"},
    {"code":"he","name":"Hebrew (modern)","nativeName":"עברית"},
    {"code":"hz","name":"Herero","nativeName":"Otjiherero"},
    {"code":"hi","name":"Hindi","nativeName":"हिन्दी, हिंदी"},
    {"code":"ho","name":"Hiri Motu","nativeName":"Hiri Motu"},
    {"code":"hu","name":"Hungarian","nativeName":"Magyar"},
    {"code":"ia","name":"Interlingua","nativeName":"Interlingua"},
    {"code":"id","name":"Indonesian","nativeName":"Bahasa Indonesia"},
    {"code":"ie","name":"Interlingue","nativeName":"Originally called Occidental; then Interlingue after WWII"},
    {"code":"ga","name":"Irish","nativeName":"Gaeilge"},
    {"code":"ig","name":"Igbo","nativeName":"Asụsụ Igbo"},
    {"code":"ik","name":"Inupiaq","nativeName":"Iñupiaq, Iñupiatun"},
    {"code":"io","name":"Ido","nativeName":"Ido"},
    {"code":"is","name":"Icelandic","nativeName":"Íslenska"},
    {"code":"it","name":"Italian","nativeName":"Italiano"},
    {"code":"iu","name":"Inuktitut","nativeName":"ᐃᓄᒃᑎᑐᑦ"},
    {"code":"ja","name":"Japanese","nativeName":"日本語 (にほんご／にっぽんご)"},
    {"code":"jv","name":"Javanese","nativeName":"basa Jawa"},
    {"code":"kl","name":"Kalaallisut, Greenlandic","nativeName":"kalaallisut, kalaallit oqaasii"},
    {"code":"kn","name":"Kannada","nativeName":"ಕನ್ನಡ"},
    {"code":"kr","name":"Kanuri","nativeName":"Kanuri"},
    {"code":"ks","name":"Kashmiri","nativeName":"कश्मीरी, كشميري‎"},
    {"code":"kk","name":"Kazakh","nativeName":"Қазақ тілі"},
    {"code":"km","name":"Khmer","nativeName":"ភាសាខ្មែរ"},
    {"code":"ki","name":"Kikuyu, Gikuyu","nativeName":"Gĩkũyũ"},
    {"code":"rw","name":"Kinyarwanda","nativeName":"Ikinyarwanda"},
    {"code":"ky","name":"Kirghiz, Kyrgyz","nativeName":"кыргыз тили"},
    {"code":"kv","name":"Komi","nativeName":"коми кыв"},
    {"code":"kg","name":"Kongo","nativeName":"KiKongo"},
    {"code":"ko","name":"Korean","nativeName":"한국어 (韓國語), 조선말 (朝鮮語)"},
    {"code":"ku","name":"Kurdish","nativeName":"Kurdî, كوردی‎"},
    {"code":"kj","name":"Kwanyama, Kuanyama","nativeName":"Kuanyama"},
    {"code":"la","name":"Latin","nativeName":"latine, lingua latina"},
    {"code":"lb","name":"Luxembourgish, Letzeburgesch","nativeName":"Lëtzebuergesch"},
    {"code":"lg","name":"Luganda","nativeName":"Luganda"},
    {"code":"li","name":"Limburgish, Limburgan, Limburger","nativeName":"Limburgs"},
    {"code":"ln","name":"Lingala","nativeName":"Lingála"},
    {"code":"lo","name":"Lao","nativeName":"ພາສາລາວ"},
    {"code":"lt","name":"Lithuanian","nativeName":"lietuvių kalba"},
    {"code":"lu","name":"Luba-Katanga","nativeName":""},
    {"code":"lv","name":"Latvian","nativeName":"latviešu valoda"},
    {"code":"gv","name":"Manx","nativeName":"Gaelg, Gailck"},
    {"code":"mk","name":"Macedonian","nativeName":"македонски јазик"},
    {"code":"mg","name":"Malagasy","nativeName":"Malagasy fiteny"},
    {"code":"ms","name":"Malay","nativeName":"bahasa Melayu, بهاس ملايو‎"},
    {"code":"ml","name":"Malayalam","nativeName":"മലയാളം"},
    {"code":"mt","name":"Maltese","nativeName":"Malti"},
    {"code":"mi","name":"Māori","nativeName":"te reo Māori"},
    {"code":"mr","name":"Marathi (Marāṭhī)","nativeName":"मराठी"},
    {"code":"mh","name":"Marshallese","nativeName":"Kajin M̧ajeļ"},
    {"code":"mn","name":"Mongolian","nativeName":"монгол"},
    {"code":"na","name":"Nauru","nativeName":"Ekakairũ Naoero"},
    {"code":"nv","name":"Navajo, Navaho","nativeName":"Diné bizaad, Dinékʼehǰí"},
    {"code":"nb","name":"Norwegian Bokmål","nativeName":"Norsk bokmål"},
    {"code":"nd","name":"North Ndebele","nativeName":"isiNdebele"},
    {"code":"ne","name":"Nepali","nativeName":"नेपाली"},
    {"code":"ng","name":"Ndonga","nativeName":"Owambo"},
    {"code":"nn","name":"Norwegian Nynorsk","nativeName":"Norsk nynorsk"},
    {"code":"no","name":"Norwegian","nativeName":"Norsk"},
    {"code":"ii","name":"Nuosu","nativeName":"ꆈꌠ꒿ Nuosuhxop"},
    {"code":"nr","name":"South Ndebele","nativeName":"isiNdebele"},
    {"code":"oc","name":"Occitan","nativeName":"Occitan"},
    {"code":"oj","name":"Ojibwe, Ojibwa","nativeName":"ᐊᓂᔑᓈᐯᒧᐎᓐ"},
    {"code":"cu","name":"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic","nativeName":"ѩзыкъ словѣньскъ"},
    {"code":"om","name":"Oromo","nativeName":"Afaan Oromoo"},
    {"code":"or","name":"Oriya","nativeName":"ଓଡ଼ିଆ"},
    {"code":"os","name":"Ossetian, Ossetic","nativeName":"ирон æвзаг"},
    {"code":"pa","name":"Panjabi, Punjabi","nativeName":"ਪੰਜਾਬੀ, پنجابی‎"},
    {"code":"pi","name":"Pāli","nativeName":"पाऴि"},
    {"code":"fa","name":"Persian","nativeName":"فارسی"},
    {"code":"pl","name":"Polish","nativeName":"polski"},
    {"code":"ps","name":"Pashto, Pushto","nativeName":"پښتو"},
    {"code":"pt","name":"Portuguese","nativeName":"Português"},
    {"code":"qu","name":"Quechua","nativeName":"Runa Simi, Kichwa"},
    {"code":"rm","name":"Romansh","nativeName":"rumantsch grischun"},
    {"code":"rn","name":"Kirundi","nativeName":"kiRundi"},
    {"code":"ro","name":"Romanian, Moldavian, Moldovan","nativeName":"română"},
    {"code":"ru","name":"Russian","nativeName":"русский язык"},
    {"code":"sa","name":"Sanskrit (Saṁskṛta)","nativeName":"संस्कृतम्"},
    {"code":"sc","name":"Sardinian","nativeName":"sardu"},
    {"code":"sd","name":"Sindhi","nativeName":"सिन्धी, سنڌي، سندھی‎"},
    {"code":"se","name":"Northern Sami","nativeName":"Davvisámegiella"},
    {"code":"sm","name":"Samoan","nativeName":"gagana faa Samoa"},
    {"code":"sg","name":"Sango","nativeName":"yângâ tî sängö"},
    {"code":"sr","name":"Serbian","nativeName":"српски језик"},
    {"code":"gd","name":"Scottish Gaelic; Gaelic","nativeName":"Gàidhlig"},
    {"code":"sn","name":"Shona","nativeName":"chiShona"},
    {"code":"si","name":"Sinhala, Sinhalese","nativeName":"සිංහල"},
    {"code":"sk","name":"Slovak","nativeName":"slovenčina"},
    {"code":"sl","name":"Slovene","nativeName":"slovenščina"},
    {"code":"so","name":"Somali","nativeName":"Soomaaliga, af Soomaali"},
    {"code":"st","name":"Southern Sotho","nativeName":"Sesotho"},
    {"code":"es","name":"Spanish; Castilian","nativeName":"español, castellano"},
    {"code":"su","name":"Sundanese","nativeName":"Basa Sunda"},
    {"code":"sw","name":"Swahili","nativeName":"Kiswahili"},
    {"code":"ss","name":"Swati","nativeName":"SiSwati"},
    {"code":"sv","name":"Swedish","nativeName":"svenska"},
    {"code":"ta","name":"Tamil","nativeName":"தமிழ்"},
    {"code":"te","name":"Telugu","nativeName":"తెలుగు"},
    {"code":"tg","name":"Tajik","nativeName":"тоҷикӣ, toğikī, تاجیکی‎"},
    {"code":"th","name":"Thai","nativeName":"ไทย"},
    {"code":"ti","name":"Tigrinya","nativeName":"ትግርኛ"},
    {"code":"bo","name":"Tibetan Standard, Tibetan, Central","nativeName":"བོད་ཡིག"},
    {"code":"tk","name":"Turkmen","nativeName":"Türkmen, Түркмен"},
    {"code":"tl","name":"Tagalog","nativeName":"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},
    {"code":"tn","name":"Tswana","nativeName":"Setswana"},
    {"code":"to","name":"Tonga (Tonga Islands)","nativeName":"faka Tonga"},
    {"code":"tr","name":"Turkish","nativeName":"Türkçe"},
    {"code":"ts","name":"Tsonga","nativeName":"Xitsonga"},
    {"code":"tt","name":"Tatar","nativeName":"татарча, tatarça, تاتارچا‎"},
    {"code":"tw","name":"Twi","nativeName":"Twi"},
    {"code":"ty","name":"Tahitian","nativeName":"Reo Tahiti"},
    {"code":"ug","name":"Uighur, Uyghur","nativeName":"Uyƣurqə, ئۇيغۇرچە‎"},
    {"code":"uk","name":"Ukrainian","nativeName":"українська"},
    {"code":"ur","name":"Urdu","nativeName":"اردو"},
    {"code":"uz","name":"Uzbek","nativeName":"zbek, Ўзбек, أۇزبېك‎"},
    {"code":"ve","name":"Venda","nativeName":"Tshivenḓa"},
    {"code":"vi","name":"Vietnamese","nativeName":"Tiếng Việt"},
    {"code":"vo","name":"Volapük","nativeName":"Volapük"},
    {"code":"wa","name":"Walloon","nativeName":"Walon"},
    {"code":"cy","name":"Welsh","nativeName":"Cymraeg"},
    {"code":"wo","name":"Wolof","nativeName":"Wollof"},
    {"code":"fy","name":"Western Frisian","nativeName":"Frysk"},
    {"code":"xh","name":"Xhosa","nativeName":"isiXhosa"},
    {"code":"yi","name":"Yiddish","nativeName":"ייִדיש"},
    {"code":"yo","name":"Yoruba","nativeName":"Yorùbá"},
    {"code":"za","name":"Zhuang, Chuang","nativeName":"Saɯ cueŋƅ, Saw cuengh"}
  ],
  AssociatedLanguageData: [
    {userId: 1, languageId: 30},
    {userId: 1, languageId: 40},
    {userId: 2, languageId: 59},
    {userId: 2, languageId: 40},
    {userId: 3, languageId: 140},
    {userId: 3, languageId: 40},
    {userId: 4, languageId: 40},
  ],

}

//Force sync the db, and then create the data in the two tables.
Fitbit.sync({
  force: true
})
.then(() => {
  return Promise.all(
    data.fitbitData.map(fitbit => {
      return Fitbit.create(fitbit)
    })
)})
.then(() => console.log('completed Fitbit sync'))
.then(() => User.sync({
  force: true
}))
.then(() => {
  return Promise.all(
  data.userData.map(user => {
    return User.create(user)
  })
)})
.then(() => console.log('completed User sync'))
.then(() => Category.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.categoryData.map(category => {
      return Category.create(category)
    })
)})
.then(() => console.log('completed Category sync'))
.then(() => Language.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.languageData.map(language => {
      return Language.create(language)
    })
)})
.then(() => console.log('completed Language sync'))
.then(() => Destination.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.destinationData.map(destination => {
      return Destination.create(destination)
    })
)})
.then(() => console.log('completed Destination sync'))
.then(() => Event.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.eventData.map(event => {
      return Event.create(event)
    })
)})
.then(() => console.log('completed Event sync'))
.then(() => AssociatedEvent.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.associatedEventData.map(associatedEvent => {
      return AssociatedEvent.create(associatedEvent)
    })
)})
.then(() => console.log('completed AssociatedEvent sync'))
.then(() => PreferredCategory.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.preferredCategoryData.map(preferredCategory => {
      return PreferredCategory.create(preferredCategory)
    })
)})
.then(() => console.log('completed PreferredCategory sync'))
.then(() => PreferredDestination.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.preferredDestinationData.map(preferredDestination => {
      return PreferredDestination.create(preferredDestination)
    })
)})
.then(() => console.log('completed PreferredDestination sync'))
.then(() => AssociatedLanguage.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.AssociatedLanguageData.map(associatedLanguage => {
      return AssociatedLanguage.create(associatedLanguage)
    })
)})
.then(() => console.log('completed AssociatedLanguage sync'))
.catch(err => console.error('There was totally a problem', err, err.stack))
.finally(() => {
  database.close()
  console.log('connection closed')
  return null
})
