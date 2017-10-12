'use strict';
const database = require('./server/db');
const db = require('./server/db/models');
const {
  User,
  Event,
  Category,
  Destination,
  AssociatedEvent,
  PreferredCategory,
  PreferredDestination,
  Language,
  AssociatedLanguage,
  Message,
  Fitbit
} = db;

//Create seed data
let data = {
  fitbitData: [
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 6000 },
        { steps: 3000 },
        { steps: 7000 },
        { steps: 8000 },
        { steps: 1000 },
        { steps: 7000 },
        { steps: 6500 }
      ],
      weekAverageSteps: 5000,
      monthAverageSteps: 30000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 7000,
      monthAverageSteps: 35000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 10000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 10000 }
      ],
      weekAverageSteps: 8000,
      monthAverageSteps: 49000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 9000,
      monthAverageSteps: 55000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 9000,
      monthAverageSteps: 55000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 10000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 10000 }
      ],
      weekAverageSteps: 8000,
      monthAverageSteps: 49000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 9000,
      monthAverageSteps: 55000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 9000,
      monthAverageSteps: 55000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 8000 },
        { steps: 9000 },
        { steps: 7000 },
        { steps: 9000 }
      ],
      weekAverageSteps: 9000,
      monthAverageSteps: 55000,
      threeMonthAverageSteps: 0
    },
    {
      accessToken: '1312',
      weekSteps: [
        { steps: 9000 },
        { steps: 10000 },
        { steps: 12000 },
        { steps: 5000 },
        { steps: 3000 },
        { steps: 5000 },
        { steps: 4000 }
      ],
      weekAverageSteps: 6000,
      monthAverageSteps: 35000,
      threeMonthAverageSteps: 0
    }
  ],
  userData: [
    {
      firstName: 'Eren',
      lastName: 'Chen',
      gender: 'male',
      email: 'eren@gmail.com',
      password: '123',
      isAdmin: true,
      isProfessional: true,
      fitbitInfoId: 1,
      height: 6.1,
      weight: 190,
      age: 27,
      avatar: '/images/student.png'
    },
    {
      firstName: 'Ranjeet',
      lastName: 'Sodhi',
      gender: 'male',
      email: 'ranjeet@gmail.com',
      password: '123',
      isAdmin: true,
      isProfessional: false,
      fitbitInfoId: 2,
      height: 6,
      weight: 175,
      age: 38,
      avatar: '/images/man1.png'
    },
    {
      firstName: 'Bojan',
      lastName: 'Jovanovic',
      gender: 'male',
      email: 'bojan@gmail.com',
      password: '123',
      isAdmin: true,
      isProfessional: true,
      fitbitInfoId: 3,
      height: 6.1,
      weight: 170,
      age: 26,
      avatar: '/images/man2.png'
    },
    {
      firstName: 'David',
      lastName: 'Eiber',
      gender: 'male',
      email: 'david@gmail.com',
      password: '123',
      isAdmin: true,
      isProfessional: false,
      fitbitInfoId: 4,
      height: 6.1,
      weight: 170,
      age: 25,
      avatar: '/images/boy.png'
    },
    {
      firstName: 'Eli',
      lastName: 'Zabeth',
      gender: 'female',
      email: 'eli@gmail.com',
      password: '123',
      isAdmin: false,
      isProfessional: false,
      fitbitInfoId: 5,
      height: 5.1,
      weight: 115,
      age: 25,
      avatar: '/images/girl.png'
    },
    {
      firstName: 'Jimmy',
      lastName: 'Chen',
      gender: 'male',
      email: 'jimmy@gmail.com',
      password: '123',
      isAdmin: false,
      isProfessional: false,
      fitbitInfoId: 6,
      height: 5.9,
      weight: 165,
      age: 21,
      avatar: '/images/boy.png'
    },
    {
      firstName: 'Sally',
      lastName: 'Smith',
      gender: 'female',
      email: 'sally@gmail.com',
      password: '123',
      isAdmin: false,
      isProfessional: false,
      fitbitInfoId: 7,
      height: 5.2,
      weight: 115,
      age: 27,
      avatar: '/images/girl.png'
    },
    {
      firstName: 'George',
      lastName: 'Gomez',
      gender: 'male',
      email: 'george@gmail.com',
      password: '123',
      isAdmin: false,
      isProfessional: false,
      fitbitInfoId: 8,
      height: 6.6,
      weight: 185,
      age: 29,
      avatar: '/images/man2.png'
    },
    {
      firstName: 'Alexis',
      lastName: 'Henry',
      gender: 'female',
      email: 'alex@gmail.com',
      password: '123',
      isAdmin: false,
      isProfessional: false,
      fitbitInfoId: 9,
      height: 5.2,
      weight: 115,
      age: 27,
      avatar: '/images/girl.png'
    },
    {
      firstName: 'Peter',
      lastName: 'David',
      gender: 'male',
      email: 'peter@gmail.com',
      password: '123',
      isAdmin: true,
      isProfessional: false,
      fitbitInfoId: 2,
      height: 6.2,
      weight: 175,
      age: 28,
      avatar: '/images/man1.png'
    }
  ],
  eventData: [
    {
      name: 'Marathon des Sables',
      image:
        'https://marathondessables.co.uk/wp-content/uploads/2015/12/marathon.jpg',
      description:
        'The Marathon des Sables is the stuff of legends. It is The Toughest Footrace on Earth (Discovery Channel). MdS is a truly gruelling multi-stage adventure through a mythical landscape in one of the world’s most inhospitable environments – the Sahara desert. You have to be self-sufficient and carry all your own food and equipment for the week on your back. Communal goat’s-hair Berber tents are pitched every night but, apart from that you have to take it with you. Water is rationed and if you exceed the ration, you get a time penalty.',
      date: '2017-11-03 14:34:22',
      difficulty: 10,
      categoryId: 15,
      destinationId: 5,
      location: 'Merzouga, Meknes-Tafilalet, Morocco',
      lat: 31.0801676,
      lng: -4.013361000000032
    },
    {
      name: 'Paris Dakar',
      image:
        'https://s-media-cache-ak0.pinimg.com/originals/26/32/ae/2632ae81202f4ca83a2435b1697ebab5.jpg',
      description:
        'The adventure began back in 1977, when Thierry Sabine got lost on his motorbike in the Libyan desert during the Abidjan-Nice Rally. Saved from the sands in extremis, he returned to France still in thrall to this landscape and promising himself he would share his fascination with as many people as possible. He proceeded to come up with a route starting in Europe, continuing to Algiers and crossing Agadez before eventually finishing at Dakar. The founder coined a motto for his inspiration: "A challenge for those who go. A dream for those who stay behind." Courtesy of his great conviction and that modicum of madness peculiar to all great ideas, the plan quickly became a reality. Since then, the Paris-Dakar, a unique event sparked by the spirit of adventure, open to all riders and carrying a message of friendship between all men, has never failed to challenge, surprise and excite. Over the course of almost thirty years, it has generated innumerable sporting and human stories.',
      date: '2017-10-15 14:00:00',
      difficulty: 5,
      categoryId: 2,
      destinationId: 12,
      location: 'Paris, Salles, France',
      lat: 40.7127837,
      lng: -74.00594130000002
    },
    {
      name: 'Paris Parkour',
      image:
        'https://i.pinimg.com/originals/f5/38/28/f53828f62ce0546a2fadb72e6dbd5042.jpg',
      description:
        'Parkour was born in Paris – so of course this is the destination for the parkour team. Here we will train in the inspiring Parisian streets, side by side with the city’s own parkour enthusiasts. Parkour athletes’ aim is to move quickly and efficiently through the surroundings, using only their body to propel themselves while negotiating obstacles in between. It is a non competitive sport which may be performed as an obstacle course, but most of the times is being practiced as a creative and sometimes playful subversion or reinterpretation of urban spaces. The original name was parcours but it changed because in its new form is more dynamic and stronger. In Paris parkour is like a form of art. Anyone can practice parkour by having the proper physical and mental condition. Parkour athletes in Paris use climbing, jumping, running, vaulting, quadrupedal movements, rolling and sometimes even swimming if the moves are suitable for the situation. Stairs, curbs, rails, scaffolds, street lighting even the street itself are some of the obstacles you might meet.',
      date: '2017-10-15 14:00:00',
      difficulty: 9,
      categoryId: 2,
      destinationId: 12,
      location: 'Paris, Salles, France',
      lat: 40.7127837,
      lng: -74.00594130000002
    },
    {
      name: 'BMX street ride Paris',
      image:
        'https://i.imgur.com/u2FoT8a.jpg',
      description:
        'BMX stands for ‘Bicycle Motocross’. Join BMX riders as we show each other around our favourite streets in the French capital. Street BMX is the art of riding a BMX bike through, and on, manmade obstacles, and gets creative with handrails, stairs, drops, ledges and other urban surroundings.',
      date: '2017-10-15 14:00:00',
      difficulty: 4,
      categoryId: 2,
      destinationId: 12,
      location: 'Paris, Salles, France',
      lat: 40.7127837,
      lng: -74.00594130000002
    },
    {
      name: 'Climb Dali',
      image: 'https://i.imgur.com/Vxbj8AX.jpg',
      description:
        'Climbing in and around Dali, there are currently 68 climbing routes, spread across 4 crags. (If you include nearby Liming and Kunming, there are more than 300 routes, which is more than enough to justify a trip out here). In Dali alone, there are vertical gneiss walls, sedimentary rock, and overhanging limestone, with potential for trad and multi-pitch and hundreds of boulder problems. With your help, we can turn Dali into one of the premier climbing destinations in China. While Dali lacks the abundant karsts of Yangshuo, it boasts great weather all year-round, no access issues, awesome views, and an overall amazing atmosphere. A great place to spend rest days, and there are plenty of other activities besides rock climbing to keep you busy. Trekking, cycling, kayaking, swimming, and even paragliding! Come on over and start claiming first ascents!',
      date: '2017-10-09 12:00:00',
      difficulty: 5,
      categoryId: 1,
      destinationId: 16,
      location: 'Dali, Yunnan, China',
      lat: 25.606486,
      lng: 100.26763800000003
    },
    {
      name: 'Red Bull Cliff Diving World Series',
      image: 'https://i.imgur.com/evo8aci.jpg',
      description:
        'The simplest definition of cliff diving is this: It is an activity that involves highly-trained athletes diving into the water from a very high and steep cliff. This is a risky sport that should only be done by people who have been given the proper training that allows them to soar from extreme heights and safely land in the water below. Cliff divers are extreme sports athletes who have honed the acrobatic skills that allow them to take part in this risky sport without receiving an injury. Energy drink maker Red Bull runs one of the most dramatic competitions, with skilled divers leaping off rocky cliffs or platforms set as high as 85-feet, allowing them to plunge into lakes and oceans.',
      date: '2017-12-14 8:30:00',
      difficulty: 7,
      categoryId: 4,
      destinationId: 17,
      location: 'São Miguel dos Milagres, State of Alagoas, Brazil',
      lat: 40.7127837,
      lng: -74.00594130000002
    },
    {
      name: 'Surfing in Sunset Beach',
      image:
        'https://coresites-cdn.factorymedia.com/mpora_new/wp-content/uploads/2017/02/vladimir-kudinov-65978.jpg',
      description:
        'Sunset Beach is one of the most famous big wave surfing spots on the North Shore of Oahu. Between the 1950s and the 1980s, it was considered the ultimate test and the most important surf beach in the world. Originally named "Paumalu", Sunset Beach offers a dangerous lava-rock reef and, at least, six wave peaks: The Reef, The Bowl, West Peak, Sunset Point, The North Wall and Backyards. Home to the Duke Kahanamoku Classic, Sunset Beach will pump perfect waves with West-to-Northeast swells coming from the North Pacific. The spot is located only two miles east of Banzai Pipeline. Trade winds will be an advantage and a disadvantage, at the same, as the offshore breeze will make paddling for a wave a difficult task. Add shifting peaks, heavy lips and currents and the game level gets an extra star.',
      date: '2018-01-18 10:15:00',
      difficulty: 4,
      categoryId: 3,
      destinationId: 15,
      location: 'Honolulu, HI, United States',
      lat: 21.3069444,
      lng: -157.85833330000003
    },
    {
      name: 'Shark Cage Diving in Monauk',
      image:
        'https://img.grouponcdn.com/deal/tsAZzjjN9JuLXhmWbpTc/7h-700x420/v1/c700x420.jpg',
      description:
        'Welcome to Montauk Shark Cage Diving, a face-to-face meeting with the ocean’s premier predator, arranged by a fearless Long Island charter company that’s accepting reservations now. If it helps to calm your nerves, think of this as one big museum exhibit. That just happens to be taking place smack-dab in the middle of shark-infested waters. So you’ll load up your lucky flippers and head out to Montauk in search of the ultimate adrenaline rush/encore to Shark Week. Upon arrival, you’ll board the Sea Turtle—a custom-built, 36-foot dive boat that’ll shuttle you (and a one-inch anodized aluminum bar shark cage) out about 30 miles into the Atlantic Ocean. At that point, the crew will begin prepping the area for diving. Which is really just a fancy way of saying they’ll dump fish guts overboard.',
      date: '2018-01-18 10:15:00',
      difficulty: 4,
      categoryId: 2,
      destinationId: 2,
      location: 'Montauk, NY, United States',
      lat: 41.0359353,
      lng: -71.95451459999998
    },
    {
      name: 'Conquer Mont Blanc',
      image:
        'https://www.alpine-guides.com/wp-content/uploads/2016/07/montlanc-2-1024x573.jpg',
      description:
        'Every year, the summit of Mont Blanc becomes the ultimate objective for mountaineers from all over the world, all striving to stand on the top of Europe and look down at all of the major summits of the Alps. prevnext Gouter Route to the Summit of Mont BlancView from the summit of Mont BlancSummit of Mont Blanc viewed from afar People normally choose one of the two most common routes to climb Mont Blanc from Chamonix. The route from the Aiguille du Midi, over Mont Blanc du Tacul and Mont Maudit is generally quieter, and highly dependent on conditions, but slightly more technical. Be aware of serious rockfall hazards in the Grand Couloir of the Aiguille du Gouter. While not technically challenging, ascending Mont Blanc requires a high level of physical fitness and experience using crampons and an ice axe.',
      date: '2018-02-22 10:15:00',
      difficulty: 10,
      categoryId: 1,
      destinationId: 13,
      location: 'Aosta Valley, Aosta, Italy',
      lat: 45.7349551,
      lng: 7.313076200000069
    },
    {
      name: 'Everest base camp Expedition',
      image:
        'http://nepalexpeditions.biz/wp-content/uploads/everest-base-camp-nepal-trek.jpg',
      description: 'Get to the base camp of Mt. Everest',
      date: '2018-04-22 07:15:00',
      difficulty: 9,
      categoryId: 1,
      destinationId: 10,
      location: 'Solukhumbu, Eastern Region, Nepal',
      lat: 37.7749295,
      lng: -122.41941550000001
    },
    {
      name: 'Volcano boarding',
      image: 'https://i.imgur.com/UAcPVhI.jpg',
      description:
        'For the bulk of the free world, a volcano – whether active or not – is a natural wonder best admired from afar. Yet for the extreme among us, it’s a chance to engage in one of the planet’s fastest growing pastimes: volcano boarding, aka sliding on a board at a righteous pace down the interior incline of an active volcano (presumably the larger, more active and more likely to expel red-hot magma into the atmosphere, the better). Boards tend to be like a 19th-century toboggan, bolstered with a layer of metal at the front end and a rope hold. High winds in the drop zone can be a hazard, as can rock burn. Though a onesie, goggles and gloves ought to prevent any serious tearing of the flesh.',
      date: '2018-06-21 09:00:00',
      difficulty: 7,
      categoryId: 15,
      destinationId: 8,
      location: 'Cerro Negro Volcano, León Department, Nicaragua',
      lat: 12.5077778,
      lng: -86.7022222
    },
    {
      name: 'North Fork Kayaking Championship',
      image: 'http://cdn.canoekayak.com/uploads/2015/05/Touring-Kayak.jpg',
      description:
        'A competition built to expose the talent of the best kayakers in the world on an amazing piece of whitewater. The NFC is one of our six favorite whitewater kayak events in North America. Previous years’ top 10 finishers vote on athletes that apply to race in the main event, however to support up and comers it is setup so any charger has the opportunity to come win it all. With three races, the Melt Awards Film and Photo Festival, and top shelf parties along the way the NFC brings to you the freshest of what the world of kayaking has to offer.',
      date: '2018-01-14 06:30:00',
      difficulty: 8,
      categoryId: 14,
      destinationId: 9,
      location: 'Banks, ID, United States',
      lat: 44.0804473,
      lng: -116.12401499999999
    },
    {
      name: 'Zorbing in the Bay',
      image: 'https://www.zorb.com/zorb_website/static/img/og-logo.jpg',
      description:
        'Whether on land or on water Zorbing is a one of a kind experience where you are actually in a giant inflatable ball.  View the world while inside a plastic bubble rolling around from side to side with non stop giggles the whole time.  Our guides will be there the entire time to show you how to enter and exit the Zorb.  This is a great FAMILY activity and great from toddlers to adults alike.  Each ball can fit up to 2 people so feel free to enjoy it with a friend.  You can Zorb battle with an opposing ball or just hang.',
      date: '2017-11-13 11:30:00',
      difficulty: 8,
      categoryId: 14,
      destinationId: 3,
      location: 'San Francisco, CA, United States',
      lat: 37.7749295,
      lng: -122.41941550000001
    },
    {
      name: 'Fly High Hang Gliding',
      image: 'https://media.timeout.com/images/103458397/image.jpg',
      description:
        'Tucked up against the Sam’s Point Preserve on the Shawangunk Ridge, the town of Ellenville is known the world over for its ideal hang gliding conditions. The sport’s physics can be dizzying and daunting — you; a glorified and unmotorized kite capable of zipping over 100 miles per hour; the wind; and anywhere from 4,000 and 6,000 feet of air between your feet and the ground lasting from a few minutes to 11 and a half hours.',
      date: '2018-02-09 12:30:00',
      difficulty: 8,
      categoryId: 14,
      destinationId: 11,
      location: 'Pine Bush, NY, United States',
      lat: 37.7749295,
      lng: -122.41941550000001
    }
  ],
  categoryData: [
    {
      name: 'Climbing',
      image:
        'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjw0K_n08jWAhUMVxQKHRVJBocQjRwIBw&url=https%3A%2F%2Fwww.outdoorgearlab.com%2Fclimbing&psig=AFQjCNFxL6nSNgJFeC-1CBSxU3Zw8wp90g&ust=1506714701662434'
    },
    {
      name: 'Skydiving',
      image:
        'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjx3qeD1MjWAhXHWhQKHR8QBFsQjRwIBw&url=http%3A%2F%2Fwww.skydiveharborsprings.com%2F&psig=AFQjCNHy6N3N4mwmN5hsoXLTPx4m7stebQ&ust=1506714751721889'
    },
    {
      name: 'Surfing',
      image:
        'https://coresites-cdn.factorymedia.com/mpora_new/wp-content/uploads/2017/02/vladimir-kudinov-65978.jpg'
    },
    {
      name: 'Racing',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'Cave diving',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'Bungee jumping',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'BMX',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'Freediving',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'Hang gliding',
      image:
        'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'
    },
    {
      name: 'Paragliding',
      image:
        'http://www.revivalnepal.com/wp-content/uploads/2015/07/Paragliding-in-Pokhara-e1482222586825.jpg'
    },
    {
      name: 'Rafting',
      image:
        'http://www.merrillmagee.com/wp-content/uploads/2015/05/rafting.jpg'
    },
    {
      name: 'Zorbing',
      image: 'https://www.zorb.com/zorb_website/static/img/og-logo.jpg'
    },
    {
      name: 'Snowboarding',
      image:
        'http://cdn.snowboarding.transworld.net/blogs.dir/442/files/2017/01/Josh-Dirksen-Oregon-Insight-Tyler-Roemer-05.jpg'
    },
    {
      name: 'Kayaking',
      image: 'http://cdn.canoekayak.com/uploads/2015/05/Touring-Kayak.jpg'
    },
    {
      name: 'Other',
      image: 'http://cdn.canoekayak.com/uploads/2015/05/Touring-Kayak.jpg'
    }
  ],
  destinationData: [
    {
      city: 'New York',
      state: 'NY',
      country: 'United States',
      latitude: 40.7127837,
      longitude: -74.00594130000002
    },
    {
      city: 'London',
      state: 'England',
      country: 'United Kingdom',
      latitude: 51.5073509,
      longitude: -0.12775829999998223
    },
    {
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      latitude: 37.7749295,
      longitude: -122.41941550000001
    },
    {
      city: 'Juno',
      state: 'AK',
      country: 'United States',
      latitude: 58.3019444,
      longitude: -134.4197221
    },
    {
      city: 'Merzouga',
      state: 'Meknes-Tafilalet',
      country: 'Morocco',
      latitude: 31.0801676,
      longitude: -4.013361000000032
    },
    {
      city: 'Medellín',
      state: 'Antioquia',
      country: 'Colombia',
      latitude: 6.244203,
      longitude: -75.58121189999997
    },
    {
      city: 'Rio de Janeiro',
      state: 'State of Rio de Janeiro',
      country: 'Brazil',
      latitude: -22.9068467,
      longitude: -43.17289649999998
    },
    {
      city: 'Cerro Negro Volcano',
      state: 'León Department',
      country: 'Nicaragua',
      latitude: -22.9068467,
      longitude: -43.17289649999998
    },
    {
      city: 'Banks',
      state: 'ID',
      country: 'United States',
      latitude: 44.0804473,
      longitude: -116.12401499999999
    },
    {
      city: 'Solukhumbu',
      state: 'Eastern Region',
      country: 'Nepal',
      latitude: 27.7909733,
      longitude: 86.66110830000002
    },
    {
      city: 'Pine Bush',
      state: 'NY',
      country: 'United States',
      latitude: 41.6081492,
      longitude: -74.29904010000001
    },
    {
      city: 'Paris',
      state: 'Salles',
      country: 'France',
      latitude: 48.8657858,
      longitude: 2.3098588999999947
    },
    {
      city: 'Aosta Valley',
      state: 'Aosta',
      country: 'Italy',
      latitude: 45.7349551,
      longitude: 7.313076200000069
    },
    {
      city: 'Montauk',
      state: 'NY',
      country: 'United States',
      latitude: 41.0359353,
      longitude: -71.95451459999998
    },
    {
      city: 'Honolulu',
      state: 'HI',
      country: 'United States',
      latitude: 21.3069444,
      longitude: -157.85833330000003
    },
    {
      city: 'Dali',
      state: 'Yunnan',
      country: 'China',
      latitude: 25.606486,
      longitude: 100.26763800000003
    },
    {
      city: 'São Miguel dos Milagres',
      state: 'State of Alagoas',
      country: 'Brazil',
      latitude: -9.2678356,
      longitude: -35.3746835
    }
  ],
  associatedEventData: [
    { userId: 1, eventId: 1, type: 'selected' },
    { userId: 1, eventId: 2, type: 'created' },
    { userId: 1, eventId: 7, type: 'created' },
    { userId: 2, eventId: 2, type: 'followed' },
    { userId: 2, eventId: 1, type: 'selected' },
    { userId: 2, eventId: 3, type: 'created' },
    { userId: 2, eventId: 4, type: 'created' },
    { userId: 2, eventId: 5, type: 'created' },
    { userId: 2, eventId: 6, type: 'created' },
    { userId: 3, eventId: 3, type: 'selected' },
    { userId: 3, eventId: 4, type: 'followed' },
    { userId: 4, eventId: 4, type: 'followed' },
    { userId: 5, eventId: 2, type: 'followed' },
    { userId: 5, eventId: 3, type: 'followed' },
    { userId: 3, eventId: 8, type: 'created' },
    { userId: 1, eventId: 8, type: 'followed' },
    { userId: 6, eventId: 9, type: 'created' },
    { userId: 7, eventId: 10, type: 'created' },
    { userId: 5, eventId: 10, type: 'followed' },
    { userId: 4, eventId: 10, type: 'followed' },
    { userId: 2, eventId: 10, type: 'selected' },
    { userId: 8, eventId: 11, type: 'created' },
    { userId: 3, eventId: 11, type: 'followed' },
    { userId: 1, eventId: 11, type: 'followed' },
    { userId: 9, eventId: 11, type: 'selected' },
    { userId: 9, eventId: 12, type: 'created' },
    { userId: 2, eventId: 12, type: 'followed' },
    { userId: 8, eventId: 12, type: 'followed' },
    { userId: 10, eventId: 12, type: 'selected' }
  ],
  preferredCategoryData: [
    { userId: 1, categoryId: 1 },
    { userId: 1, categoryId: 2 },
    { userId: 2, categoryId: 3 },
    { userId: 2, categoryId: 4 },
    { userId: 3, categoryId: 3 },
    { userId: 3, categoryId: 1 },
    { userId: 4, categoryId: 4 },
    { userId: 4, categoryId: 2 },
    { userId: 5, categoryId: 3 },
    { userId: 5, categoryId: 4 },
    { userId: 6, categoryId: 1 },
    { userId: 6, categoryId: 7 },
    { userId: 6, categoryId: 6 },
    { userId: 7, categoryId: 8 },
    { userId: 7, categoryId: 9 },
    { userId: 8, categoryId: 11 },
    { userId: 8, categoryId: 7 },
    { userId: 9, categoryId: 4 },
    { userId: 9, categoryId: 8 },
    { userId: 10, categoryId: 9 },
    { userId: 10, categoryId: 15 }
  ],
  preferredDestinationData: [
    { userId: 1, destinationId: 4 },
    { userId: 1, destinationId: 1 },
    { userId: 2, destinationId: 7 },
    { userId: 2, destinationId: 5 },
    { userId: 2, destinationId: 6 },
    { userId: 3, destinationId: 1 },
    { userId: 3, destinationId: 2 },
    { userId: 3, destinationId: 5 },
    { userId: 3, destinationId: 6 },
    { userId: 4, destinationId: 1 },
    { userId: 4, destinationId: 4 },
    { userId: 5, destinationId: 7 },
    { userId: 5, destinationId: 5 },
    { userId: 5, destinationId: 6 },
    { userId: 6, destinationId: 4 },
    { userId: 6, destinationId: 1 },
    { userId: 6, destinationId: 7 },
    { userId: 7, destinationId: 3 },
    { userId: 7, destinationId: 6 },
    { userId: 8, destinationId: 1 },
    { userId: 7, destinationId: 2 },
    { userId: 8, destinationId: 8 },
    { userId: 8, destinationId: 13 },
    { userId: 8, destinationId: 11 },
    { userId: 9, destinationId: 8 },
    { userId: 9, destinationId: 9 },
    { userId: 9, destinationId: 12 },
    { userId: 10, destinationId: 13 },
    { userId: 10, destinationId: 17 }
  ],
  languageData: [
    { code: 'sq', name: 'Albanian', nativeName: 'Shqip' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'av', name: 'Avaric', nativeName: 'авар мацӀ, магӀарул мацӀ' },
    { code: 'ae', name: 'Avestan', nativeName: 'avesta' },
    { code: 'ay', name: 'Aymara', nativeName: 'aymar aru' },
    { code: 'az', name: 'Azerbaijani', nativeName: 'azərbaycan dili' },
    { code: 'bm', name: 'Bambara', nativeName: 'bamanankan' },
    { code: 'eu', name: 'Basque', nativeName: 'euskara, euskera' },
    { code: 'be', name: 'Belarusian', nativeName: 'Беларуская' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'bh', name: 'Bihari', nativeName: 'भोजपुरी' },
    { code: 'bi', name: 'Bislama', nativeName: 'Bislama' },
    { code: 'bs', name: 'Bosnian', nativeName: 'bosanski jezik' },
    { code: 'br', name: 'Breton', nativeName: 'brezhoneg' },
    { code: 'bg', name: 'Bulgarian', nativeName: 'български език' },
    { code: 'my', name: 'Burmese', nativeName: 'ဗမာစာ' },
    { code: 'ca', name: 'Catalan; Valencian', nativeName: 'Català' },
    { code: 'ch', name: 'Chamorro', nativeName: 'Chamoru' },
    { code: 'ce', name: 'Chechen', nativeName: 'нохчийн мотт' },
    {
      code: 'ny',
      name: 'Chichewa; Chewa; Nyanja',
      nativeName: 'chiCheŵa, chinyanja'
    },
    { code: 'zh', name: 'Chinese', nativeName: '中文 (Zhōngwén), 汉语, 漢語' },
    { code: 'cv', name: 'Chuvash', nativeName: 'чӑваш чӗлхи' },
    { code: 'kw', name: 'Cornish', nativeName: 'Kernewek' },
    { code: 'co', name: 'Corsican', nativeName: 'corsu, lingua corsa' },
    { code: 'hr', name: 'Croatian', nativeName: 'hrvatski' },
    { code: 'cs', name: 'Czech', nativeName: 'česky, čeština' },
    { code: 'da', name: 'Danish', nativeName: 'dansk' },
    { code: 'dv', name: 'Divehi; Dhivehi; Maldivian;', nativeName: 'ދިވެހި' },
    { code: 'nl', name: 'Dutch', nativeName: 'Nederlands, Vlaams' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto' },
    { code: 'et', name: 'Estonian', nativeName: 'eesti, eesti keel' },
    { code: 'ee', name: 'Ewe', nativeName: 'Eʋegbe' },
    { code: 'fo', name: 'Faroese', nativeName: 'føroyskt' },
    { code: 'fj', name: 'Fijian', nativeName: 'vosa Vakaviti' },
    { code: 'fi', name: 'Finnish', nativeName: 'suomi, suomen kieli' },
    { code: 'fr', name: 'French', nativeName: 'français, langue française' },
    {
      code: 'ff',
      name: 'Fula; Fulah; Pulaar; Pular',
      nativeName: 'Fulfulde, Pulaar, Pular'
    },
    { code: 'gl', name: 'Galician', nativeName: 'Galego' },
    { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'el', name: 'Greek, Modern', nativeName: 'Ελληνικά' },
    { code: 'gn', name: 'Guaraní', nativeName: 'Avañeẽ' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    {
      code: 'ht',
      name: 'Haitian; Haitian Creole',
      nativeName: 'Kreyòl ayisyen'
    },
    { code: 'ha', name: 'Hausa', nativeName: 'Hausa, هَوُسَ' },
    { code: 'he', name: 'Hebrew (modern)', nativeName: 'עברית' },
    { code: 'hz', name: 'Herero', nativeName: 'Otjiherero' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी, हिंदी' },
    { code: 'ho', name: 'Hiri Motu', nativeName: 'Hiri Motu' },
    { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
    { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
    {
      code: 'ie',
      name: 'Interlingue',
      nativeName: 'Originally called Occidental; then Interlingue after WWII'
    },
    { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
    { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo' },
    { code: 'ik', name: 'Inupiaq', nativeName: 'Iñupiaq, Iñupiatun' },
    { code: 'io', name: 'Ido', nativeName: 'Ido' },
    { code: 'is', name: 'Icelandic', nativeName: 'Íslenska' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語 (にほんご／にっぽんご)' },
    { code: 'jv', name: 'Javanese', nativeName: 'basa Jawa' },
    {
      code: 'kl',
      name: 'Kalaallisut, Greenlandic',
      nativeName: 'kalaallisut, kalaallit oqaasii'
    },
    { code: 'ks', name: 'Kashmiri', nativeName: 'कश्मीरी, كشميري‎' },
    { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ тілі' },
    { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
    { code: 'ki', name: 'Kikuyu, Gikuyu', nativeName: 'Gĩkũyũ' },
    { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
    { code: 'ky', name: 'Kirghiz, Kyrgyz', nativeName: 'кыргыз тили' },
    { code: 'kv', name: 'Komi', nativeName: 'коми кыв' },
    { code: 'kg', name: 'Kongo', nativeName: 'KiKongo' },
    { code: 'ko', name: 'Korean', nativeName: '한국어 (韓國語), 조선말 (朝鮮語)' },
    { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî, كوردی‎' },
    { code: 'kj', name: 'Kwanyama, Kuanyama', nativeName: 'Kuanyama' },
    { code: 'la', name: 'Latin', nativeName: 'latine, lingua latina' },
    {
      code: 'lb',
      name: 'Luxembourgish, Letzeburgesch',
      nativeName: 'Lëtzebuergesch'
    },
    { code: 'lg', name: 'Luganda', nativeName: 'Luganda' },
    {
      code: 'li',
      name: 'Limburgish, Limburgan, Limburger',
      nativeName: 'Limburgs'
    },
    { code: 'ln', name: 'Lingala', nativeName: 'Lingála' },
    { code: 'lo', name: 'Lao', nativeName: 'ພາສາລາວ' },
    { code: 'lt', name: 'Lithuanian', nativeName: 'lietuvių kalba' },
    { code: 'lv', name: 'Latvian', nativeName: 'latviešu valoda' },
    { code: 'mk', name: 'Macedonian', nativeName: 'македонски јазик' },
    { code: 'ms', name: 'Malay', nativeName: 'bahasa Melayu, بهاس ملايو‎' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
    { code: 'mi', name: 'Māori', nativeName: 'te reo Māori' },
    { code: 'mr', name: 'Marathi (Marāṭhī)', nativeName: 'मराठी' },
    { code: 'mn', name: 'Mongolian', nativeName: 'монгол' },
    { code: 'na', name: 'Nauru', nativeName: 'Ekakairũ Naoero' },
    {
      code: 'nv',
      name: 'Navajo, Navaho',
      nativeName: 'Diné bizaad, Dinékʼehǰí'
    },
    { code: 'nb', name: 'Norwegian Bokmål', nativeName: 'Norsk bokmål' },
    { code: 'nd', name: 'North Ndebele', nativeName: 'isiNdebele' },
    { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
    { code: 'ng', name: 'Ndonga', nativeName: 'Owambo' },
    { code: 'nn', name: 'Norwegian Nynorsk', nativeName: 'Norsk nynorsk' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'ii', name: 'Nuosu', nativeName: 'ꆈꌠ꒿ Nuosuhxop' },
    { code: 'nr', name: 'South Ndebele', nativeName: 'isiNdebele' },
    { code: 'oc', name: 'Occitan', nativeName: 'Occitan' },
    { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
    { code: 'os', name: 'Ossetian, Ossetic', nativeName: 'ирон æвзаг' },
    { code: 'pa', name: 'Panjabi, Punjabi', nativeName: 'ਪੰਜਾਬੀ, پنجابی‎' },
    { code: 'pi', name: 'Pāli', nativeName: 'पाऴि' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
    { code: 'pl', name: 'Polish', nativeName: 'polski' },
    { code: 'ps', name: 'Pashto, Pushto', nativeName: 'پښتو' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'qu', name: 'Quechua', nativeName: 'Runa Simi, Kichwa' },
    { code: 'rm', name: 'Romansh', nativeName: 'rumantsch grischun' },
    { code: 'rn', name: 'Kirundi', nativeName: 'kiRundi' },
    { code: 'ro', name: 'Romanian, Moldavian, Moldovan', nativeName: 'română' },
    { code: 'ru', name: 'Russian', nativeName: 'русский язык' },
    { code: 'sa', name: 'Sanskrit (Saṁskṛta)', nativeName: 'संस्कृतम्' },
    { code: 'sc', name: 'Sardinian', nativeName: 'sardu' },
    { code: 'sd', name: 'Sindhi', nativeName: 'सिन्धी, سنڌي، سندھی‎' },
    { code: 'se', name: 'Northern Sami', nativeName: 'Davvisámegiella' },
    { code: 'sm', name: 'Samoan', nativeName: 'gagana faa Samoa' },
    { code: 'sg', name: 'Sango', nativeName: 'yângâ tî sängö' },
    { code: 'sr', name: 'Serbian', nativeName: 'српски језик' },
    { code: 'gd', name: 'Scottish Gaelic; Gaelic', nativeName: 'Gàidhlig' },
    { code: 'sn', name: 'Shona', nativeName: 'chiShona' },
    { code: 'si', name: 'Sinhala, Sinhalese', nativeName: 'සිංහල' },
    { code: 'sk', name: 'Slovak', nativeName: 'slovenčina' },
    { code: 'sl', name: 'Slovene', nativeName: 'slovenščina' },
    { code: 'so', name: 'Somali', nativeName: 'Soomaaliga, af Soomaali' },
    { code: 'st', name: 'Southern Sotho', nativeName: 'Sesotho' },
    {
      code: 'es',
      name: 'Spanish; Castilian',
      nativeName: 'español, castellano'
    },
    { code: 'su', name: 'Sundanese', nativeName: 'Basa Sunda' },
    { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
    { code: 'ss', name: 'Swati', nativeName: 'SiSwati' },
    { code: 'sv', name: 'Swedish', nativeName: 'svenska' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'tg', name: 'Tajik', nativeName: 'тоҷикӣ, toğikī, تاجیکی‎' },
    { code: 'th', name: 'Thai', nativeName: 'ไทย' },
    { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
    {
      code: 'bo',
      name: 'Tibetan Standard, Tibetan, Central',
      nativeName: 'བོད་ཡིག'
    },
    { code: 'tk', name: 'Turkmen', nativeName: 'Türkmen, Түркмен' },
    { code: 'tl', name: 'Tagalog', nativeName: 'Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔' },
    { code: 'tn', name: 'Tswana', nativeName: 'Setswana' },
    { code: 'to', name: 'Tonga (Tonga Islands)', nativeName: 'faka Tonga' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
    { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga' },
    { code: 'tt', name: 'Tatar', nativeName: 'татарча, tatarça, تاتارچا‎' },
    { code: 'tw', name: 'Twi', nativeName: 'Twi' },
    { code: 'ty', name: 'Tahitian', nativeName: 'Reo Tahiti' },
    { code: 'ug', name: 'Uighur, Uyghur', nativeName: 'Uyƣurqə, ئۇيغۇرچە‎' },
    { code: 'uk', name: 'Ukrainian', nativeName: 'українська' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'uz', name: 'Uzbek', nativeName: 'zbek, Ўзбек, أۇزبېك‎' },
    { code: 've', name: 'Venda', nativeName: 'Tshivenḓa' },
    { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
    { code: 'wa', name: 'Walloon', nativeName: 'Walon' },
    { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg' },
    { code: 'wo', name: 'Wolof', nativeName: 'Wollof' },
    { code: 'fy', name: 'Western Frisian', nativeName: 'Frysk' },
    { code: 'yi', name: 'Yiddish', nativeName: 'ייִדיש' },
    { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
    { code: 'za', name: 'Zhuang, Chuang', nativeName: 'Saɯ cueŋƅ, Saw cuengh' }
  ],
  AssociatedLanguageData: [
    { userId: 1, languageId: 30 },
    { userId: 1, languageId: 32 },
    { userId: 2, languageId: 59 },
    { userId: 2, languageId: 46 },
    { userId: 3, languageId: 140 },
    { userId: 3, languageId: 32 },
    { userId: 4, languageId: 121 },
    { userId: 5, languageId: 47 },
    { userId: 5, languageId: 125 },
    { userId: 6, languageId: 30 },
    { userId: 7, languageId: 62 },
    { userId: 7, languageId: 59 },
    { userId: 8, languageId: 32 },
    { userId: 8, languageId: 140 },
    { userId: 9, languageId: 53 },
    { userId: 9, languageId: 1 },
    { userId: 9, languageId: 47 },
    { userId: 10, languageId: 40 }
  ],
  MessageData: [
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 1
    },
    { content: 'Definitely!', userId: 3, eventId: 1 },
    { content: 'Me too!', userId: 2, eventId: 1 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 1
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 2
    },
    { content: 'Definitely!', userId: 3, eventId: 2 },
    { content: 'Me too!', userId: 2, eventId: 2 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 2
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 3
    },
    { content: 'Definitely!', userId: 3, eventId: 3 },
    { content: 'Me too!', userId: 2, eventId: 3 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 3
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 4
    },
    { content: 'Definitely!', userId: 3, eventId: 4 },
    { content: 'Me too!', userId: 2, eventId: 4 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 4
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 5
    },
    { content: 'Definitely!', userId: 3, eventId: 5 },
    { content: 'Me too!', userId: 2, eventId: 5 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 5
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 6
    },
    { content: 'Definitely!', userId: 3, eventId: 6 },
    { content: 'Me too!', userId: 2, eventId: 6 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 6
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 7
    },
    { content: 'Definitely!', userId: 3, eventId: 7 },
    { content: 'Me too!', userId: 2, eventId: 7 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 7
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 8
    },
    { content: 'Definitely!', userId: 3, eventId: 8 },
    { content: 'Me too!', userId: 2, eventId: 8 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 8
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 9
    },
    { content: 'Definitely!', userId: 3, eventId: 9 },
    { content: 'Me too!', userId: 2, eventId: 9 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 9
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 10
    },
    { content: 'Definitely!', userId: 3, eventId: 10 },
    { content: 'Me too!', userId: 2, eventId: 10 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 10
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 11
    },
    { content: 'Definitely!', userId: 3, eventId: 11 },
    { content: 'Me too!', userId: 2, eventId: 11 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 11
    },
    {
      content: "I've wanted to join this event for years!",
      userId: 1,
      eventId: 12
    },
    { content: 'Definitely!', userId: 3, eventId: 12 },
    { content: 'Me too!', userId: 2, eventId: 12 },
    {
      content: "Let's meet for a coffee on event day.",
      userId: 4,
      eventId: 12
    }
  ]
};

//Force sync the db, and then create the data in the two tables.
database
  .sync({ force: true })
  .then(() => console.log('Database FORCE TRUE completed'))
  .then(() =>
    Fitbit.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.fitbitData.map(fitbit => {
        return Fitbit.create(fitbit);
      })
    );
  })
  .then(() => console.log('completed Fitbit sync'))
  .then(() =>
    User.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.userData.map(user => {
        return User.create(user);
      })
    );
  })
  .then(() => console.log('completed User sync'))
  .then(() =>
    Category.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.categoryData.map(category => {
        return Category.create(category);
      })
    );
  })
  .then(() => console.log('completed Category sync'))
  .then(() =>
    Language.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.languageData.map(language => {
        return Language.create(language);
      })
    );
  })
  .then(() => console.log('completed Language sync'))
  .then(() =>
    Destination.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.destinationData.map(destination => {
        return Destination.create(destination);
      })
    );
  })
  .then(() => console.log('completed Destination sync'))
  .then(() =>
    Event.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.eventData.map(event => {
        return Event.create(event);
      })
    );
  })
  .then(() => console.log('completed Event sync'))
  .then(() =>
    AssociatedEvent.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.associatedEventData.map(associatedEvent => {
        return AssociatedEvent.create(associatedEvent);
      })
    );
  })
  .then(() => console.log('completed AssociatedEvent sync'))
  .then(() =>
    PreferredCategory.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.preferredCategoryData.map(preferredCategory => {
        return PreferredCategory.create(preferredCategory);
      })
    );
  })
  .then(() => console.log('completed PreferredCategory sync'))
  .then(() =>
    PreferredDestination.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.preferredDestinationData.map(preferredDestination => {
        return PreferredDestination.create(preferredDestination);
      })
    );
  })
  .then(() => console.log('completed PreferredDestination sync'))
  .then(() =>
    AssociatedLanguage.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.AssociatedLanguageData.map(associatedLanguage => {
        return AssociatedLanguage.create(associatedLanguage);
      })
    );
  })
  .then(() => console.log('completed AssociatedLanguage sync'))
  .then(() =>
    Message.sync({
      force: true
    })
  )
  .then(() => {
    return Promise.all(
      data.MessageData.map(message => {
        return Message.create(message);
      })
    );
  })
  .then(() => console.log('completed AssociatedLanguage sync'))
  .catch(err => console.error('There was totally a problem', err, err.stack))
  .finally(() => {
    database.close();
    console.log('connection closed');
    return null;
  });
