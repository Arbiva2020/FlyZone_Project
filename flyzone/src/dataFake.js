import Map from "../src/assets/map.png";
import Map1 from "../src/assets/map1.png";
import Map2 from "../src/assets/map2.png";
import Map3 from "../src/assets/map3.png";
import Map4 from "../src/assets/map4.png";
import Map5 from "../src/assets/map5.png";

export const allUsers = [
    {
      security_level: 1,
      userName: "Radio BlaBla",
      firstName: "Uri",
      lastName: "Levi",
      password: "SA535536",
      email: "Radio@BlaBla.com",
      profileImguser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&usqp=CAU",
      level: 1,
      company_id: "4",
      company_name: "DownWind",
      group_id: "2",
      currentLevel: "A",
      testsFinal: [
        90,
        34,
        80,
        45,
        90,
        34
      ],
      MMR: 4,
      badges: 2,
      total_assessments: 6,
      numberOfFailurs: 1,
      totalScore: 230,
      straight_failures: 2,
      assessment_overdue: 0,
      admin: "true", 
      id: "123456",
    },
    {
      security_level: 0,
      userName: "Show",
      firstName: "Netta",
      lastName: "Glory",
      password: "AAA111",
      email: "netta@glory.com",
      profileImguser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDcky3ZF_NZZk3__VxrH-kC7ESKB6th_z8A&usqp=CAU",
      level: 3,
      company_id: "1",
      company_name: "ICL",
      group_id: "3",
      currentLevel: "A",
      testsFinal: [
        20,
        24,
        40,
        65,
        80,
        90
      ],
      MMR: 6,
      badges: 5,
      total_assessments: 8,
      numberOfFailurs: 3,
      totalScore: 550,
      straight_failures: 5,
      assessment_overdue: 1,
      admin: "false", 
      id: "123455",
    },
    {
      security_level: 2,
      userName: "Dust",
      firstName: "Anne",
      lastName: "James",
      password: "BBB222",
      email: "anne@james.com",
      profileImguser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGDNPqYvfVXr50g4wSf4HLD4p557PbSFNdJaKHA0Sqmva990kgeqCWX32L8hlD2NNWyeU&usqp=CAU",
      level: 5,
      company_id: "3",
      company_name: "Candoo",
      group_id: "1",
      currentLevel: "D",
      testsFinal: [
        10,
        20,
        20,
        25,
        37,
        78,
        81
      ],
      MMR: 8,
      badges: 10,
      total_assessments: 7,
      numberOfFailurs: 2,
      totalScore: 2671,
      straight_failures: 1,
      assessment_overdue: 2,
      admin: "false", 
      id: "123454",
    },
    {
      security_level: 3,
      userName: "Mosh",
      firstName: "Moshe",
      lastName: "Rabenu",
      password: "CCC333",
      email: "Moshe@rabenu.com",
      profileImguser: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGDNPqYvfVXr50g4wSf4HLD4p557PbSFNdJaKHA0Sqmva990kgeqCWX32L8hlD2NNWyeU&usqp=CAU",
      level: 1,
      company_id: "4",
      company_name: "Flywere",
      group_id: "6",
      currentLevel: "B",
      testsFinal: [
        50,
        60,
        70,
        80,
        90
      ],
      MMR: 7,
      badges: 6,
      total_assessments: 9,
      numberOfFailurs: 3,
      totalScore: 3371,
      straight_failures: 4,
      assessment_overdue: 0,
      admin: "false", 
      id: "123456",
    }
  ]

export const datafake = [
    {
        id: "test1", 
        collisions: 5, 
        battary: 0, 
        avgScore: 3.5, 
        points: 6
    },
    {
        id: "test2", 
        collisions: 6, 
        battary: 4, 
        avgScore: 2, 
        points: 1
    }, {
        id: "test3", 
        collisions: 9, 
        battary: 1, 
        avgScore: 6, 
        points: 4
    }, {
        id: "test4", 
        collisions: 0, 
        battary: 1, 
        avgScore: 3, 
        points: 2
    }, {
        id: "test5", 
        collisions: 3, 
        battary: 1, 
        avgScore: 4, 
        points: 8
    }
]

export const lineData = 
    {
        // headline: "Tests Scores",
        "#1": 80,
        "#2": 30,
        "#3": 70, 
        "#4": 10, 
        "#5": 40, 
        "#6": 80,
        "#7": 50,  
        "#8": 10, 
        "#9": 40, 
        "#10": 80,
    }


export const pieData = 
    {
        crash: 20,
        battary: 40,
        targeted: 10, 
        wind: 5, 
        balancing: 15, 
        timeOut: 10,
    }

    export const horizontalBarData = 
    [
        {crash: 30, battary: 10, targeted: 15, wind: 15, balancing: 25, timeOut: 5},
        {crash_AVG: 20, battary_AVG: 40, targeted_AVG: 10, wind_AVG: 5, balancing_AVG: 15, timeOut_AVG: 10},
    ]

    export const DoughnutDataBadges = 
    {
        totalBadges: 10, 
        userBadges: 8
    }

    export const DoughnutDataFail = 
    {
        totalTests: 14, 
        userFails: 2
    }

    export const DoughnutDataPerfect = 
    {
        totalTests: 14,  
        userPerfectScore: 5
    }

    export const users = 
    [
        {
            id: 1,
            admin: true, 
            firstName: "Shmoopsie",
            lastName: "poo", 
        }, 
        {
            id: 2,
            admin: false, 
            firstName: "Googlie",
            lastName: "bear", 
        }
    ]

    export const mainViewDatafake = [
        {
            id: "test1", 
            collisions: 5, 
            battary: 0, 
            avgScore: 3.5, 
            points: 6
        },
        {
            id: "test2", 
            collisions: 6, 
            battary: 4, 
            avgScore: 2, 
            points: 1
        }, {
            id: "test3", 
            collisions: 9, 
            battary: 1, 
            avgScore: 6, 
            points: 4
        }, {
            id: "test4", 
            collisions: 0, 
            battary: 1, 
            avgScore: 3, 
            points: 2
        }, {
            id: "test5", 
            collisions: 3, 
            battary: 1, 
            avgScore: 4, 
            points: 8
        }
    ]
    
    export const mainViewLineData = 
        {
            headline: "Tests Scores",
            scoreFirst: 80,
            scoreSecond: 30,
            scoreThird: 70, 
            scoreForth: 10, 
            scoreFifth: 40, 
            scoreSixth: 80,
            scoreSeventh: 50,  
            scoreEight: 10, 
            scoreNineth: 40, 
            scoreTenth: 80,
        }

        export const companiesDb = [
        {
            id: 1, 
            name: "ICL",
            size: "Large", 
            numberOfPilots: 5, 
            groups: [1,2,3,4,5,6]
        },
        {
            id: 2, 
            name: "Elbit",
            size: "Large", 
            numberOfPilots: 3, 
            groups: [1,2,3]
        },
        {
            id: 3, 
            name: "Candoo",
            size: "Medium", 
            numberOfPilots: 2, 
            numberOfPilots: 3, 
            groups: [1,2,3,4,5]
        },
        {
            id: 4, 
            name: "DownWind",
            size: "Small", 
            numberOfPilots: 4, 
            numberOfPilots: 3, 
            groups: [1,2]
        }
    ]
    
    export const maps = [
        {
            id: 1,
            total: "2", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Open desert", 
            map: Map, 
            characteristics: ["desert", "open space", "arrid", "empty", "middle east"],
            description: "This map will be used for scenarios that require flying in open areas and coaping with challanges such as reception problems",
            additionalData: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut "
        },
        {
            id: 2,
            total: "4", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Woods",  
            map: Map1, 
            characteristics: ["trees", "open space", "obsticle", "forest", "middle east", "high density"], 
            description: "This map will is good for scenarios that require flying in crowded areas", 
            additionalData:"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        },
        {
            id: 3, 
            total: "6", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "City", 
            map: Map2, 
            characteristics: ["city", "open space", "building", "crouded", "manuvre"], 
            description: "This map will be used for scenarios that AAAAAAAAAAAAAAA",
            additionalData:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
        {
            id: 4,
            total: "1", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view" 
            name: "Closed space", 
            map: Map3, 
            characteristics: ["closed space ", "open space", "empty", "high density"], 
            description: "This map will be used for scenarios that require BBBBBBBBBBBBBBBBBBBBBBBB",
            additionalData:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo",
        },
        {
            id: 5, 
            total: "3", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Refugee camp", 
            map: Map4, 
            characteristics: ["refugee", "camp", "high density", "crowded"], 
            description: "This map will be used for scenarios that require CCCCCCCCCCCCCCCCCCC",
            additionalData:"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt",
        },
        {
            id: 6, 
            total: "3", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Open sea", 
            map: Map4, 
            characteristics: ["refugee", "camp", "high density", "crowded"], 
            description: "This map will be used for scenarios that require DDDDDDDDDDDDDDDD",
            additionalData:"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem",
        },
        {
            id: 7, 
            total: "3", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Port", 
            map: Map1, 
            characteristics: ["refugee", "camp", "high density", "crowded"], 
            description: "This map will be used for scenarios that require EEEEEEEEEEEEEEEE", 
            additionalData:"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ",
        },
        {
            id: 8, 
            total: "3", //in the future, this will be gone and the sum of all usage of this specific map will appear un the chart of "main view"
            name: "Combined scene", 
            map: Map2, 
            characteristics: ["refugee", "camp", "high density", "crowded"], 
            description: "This map will be used for scenarios that require CCCCCCCCCCCCCCCCCCC",
            additionalData:"Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        },
    ]


    export const scenarios = [
        {
            id: 1, 
            name: "Surveillance",
            difficulty_level: [2, 3], 
            description: "Drone kept at a constan position in the height of X meters, taking videos of target Y for 20 min.",
            key_words: ["constant position", "video", "max.height", "min.height"]
        },
        {
            id: 2, 
            name: "Photography",
            difficulty_level: [1, 2], 
            description: "Drone must take photos of at least 3 different angles of object Y, in various distances and without being spotted",
            key_words: ["angles", "monitor", "photo"]  
        },
        {
            id: 3, 
            name: "Delivery",
            difficulty_level: [2, 3],
            description: "Drone will get to a X location, lower down the delivary and go back home within 30 min.",
            key_words: ["Drop", "Location", "obstacle"]  
        },
        {
            id: 4, 
            name: "Collection",
            difficulty_level: [2, 3], 
            description: "Drone will get to a X location, collect the delivary and go back home within 30 min.",
            key_words: []  
        },
        {
            id: 5, 
            name: "Targeting",
            difficulty_level: [3, 4, 5], 
            description: "Drone will have the specified target locked for X seconds, while keeping itself steady in mid air",
            key_words: ["target", "focuse", "lock", "visible"]  
        },
        {
            id: 6, 
            name: "Indoors", 
            difficulty_level: [4, 5], 
            description: "Drone will navigate between the rooms of the perimiter steadily, without any interactions with walls or objects",
            key_words: ["room", "navigation", "collision", "contact", 'building']  
        }, 
        {
            id: 7, 
            name: "Tunnel", 
            difficulty_level: [5, 5], 
            description: "Drone will navigate through the tunnel steadily, without coliding in its walls",
            key_words: ["wall", "side", "gps", "heating"]  
        }, 
        {
            id: 8, 
            name: "Kamikaze", 
            difficulty_level: [3, 5],
            description: "Drone will detect target and crush itself into it",
            key_words: ["crush", "suicide"]  
        }, 
        {
            id: 9, 
            name: "Interception", 
            difficulty_level: [5, 5], 
            description: "Drone will shoot at a target within X seconds from detection",
            key_words: ["target", "shoot", "prevent"]  
        }, 
        {
            id: 10, 
            name: "Release cargo",
            difficulty_level: [2, 3],
            description: "Drone will get to a X location, release cargo from air and go back home within 30 min.",
            key_words: ["drop", "cargo"]  
        },
    ]

    export const adminList = 
    {
        userName: "admin",
        password: "admin10",
        profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRudDbHeW2OobhX8E9fAY-ctpUAHeTNWfaqJA&usqp=CAU",
        lastLoggedIn: new Date().getTime,
    }


    export const missions = [
        {
            id: 1, 
            name: "A",
        },
        {
            id: 2, 
            name: "B",
        },
        {
            id: 3, 
            name: "C",
        },
        {
            id: 4, 
            name: "D",
             
        },
        {
            id: 5, 
            name: "E",
        },
        {
            id: 6, 
            name: "F", 
        }
    ]


    
    export const windSpeed = [
        {
            id: 1, 
            name: "A",
        },
        {
            id: 2, 
            name: "B",
        },
        {
            id: 3, 
            name: "C",
        },
        {
            id: 4, 
            name: "D",
             
        },
        {
            id: 5, 
            name: "E",
        },
        {
            id: 6, 
            name: "F", 
        }
    ]


    export const fogDensity = [
        {
            id: 1, 
            name: "AA",
        },
        {
            id: 2, 
            name: "BB",
        },
        {
            id: 3, 
            name: "CC",
        },
        {
            id: 4, 
            name: "DD",
             
        },
        {
            id: 5, 
            name: "EE",
        },
        {
            id: 6, 
            name: "FF", 
        }
    ]