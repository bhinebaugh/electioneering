// candidate characteristics
// group into pairs of antonyms?
// have nullifying characteristics?
const CORPORATE = "corporate";
const SHADY = "shady";
const CYNICAL = "cynical";
const GRASSROOTS = "grassroots";
const INCONSISTENT = "inconsistent";
const MODERATE = "moderate";
const NEGATIVE = "negative";
const DIRTY = "dirty";
const SERIOUS = "serious";
const LEGIT = "legit";
const LIKEABLE = "likeable";
const ESTABLISHMENT = "establishment";
const ANTIESTABLISHMENT = "antiestablishment";
const OUTSIDER = "outsider";
const POPULIST = "populist";
// characteristic brainstorming:
// UPSTART, SUAVE, SLICK, EVASIVE, RELIABLE, BIPARTISAN, DIVISIVE
// ELITE, ALOOF, COLD, WARM, OUT_OF_TOUCH, RELATABLE, SCANDALOUS
// INSIDER, CROOKED, POLISHED, SMOOTH, GAFFE_PRONE, BOLD, RUDE, ROUGH, MAVERICK

const antagonisms = {
    SHADY: [LEGIT],
    // ESTABLISHMENT: [ANTIESTABLISHMENT, OUTSIDER, MAVERICK]
}

const target = ["self", "opponent"];

var demographics = [
    { name: "single issue voters", attributes: [SERIOUS]},
    { name: "change year", attributes: [ANTIESTABLISHMENT, OUTSIDER, POPULIST]}
]

function Card(
    name, 
    description = "", 
    requirements = null,
    effects = {}, 
    attributes = []
) {
    this.name = name;
    this.description = description;
    this.requirements = requirements; // object or array of objects
    this.effects = effects;
    this.attributes = attributes;
    /* possible additional card attributes
        health
        duration // e.g. smear campaign, decreases approval for 3 turns
        classes: [], // event, person, content
        flags: [],
        triggers: [],
        immunities: [],
    */
}

const cardDefinitions = [
    {
        frequency: 6,
        card: new Card(
            "hire staff", "increase your campaign's capacity by adding more people",
            { funding: 1 },
            { staff: 1, funding: -1 }, [LEGIT]
        )
    },
    {
        frequency: 3,
        card: new Card(
            "big fundraiser", "hold an exclusive event to encourage large donations",
            { staff: 2 },
            { funding: 5 }, [CORPORATE]
        )
    },
    {
        frequency: 3,
        card: new Card(
            "small online donations", "contributions through your website add up",
            { staff: 1 },
            { funding: 3 }, [GRASSROOTS]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "recruit volunteers", "ask as part of outreach",
            { staff: 1 },
            { volunteers: 2, enthusiasm: 1 }, [GRASSROOTS]
        )
    },
    {
        frequency: 4,
        card: new Card(
            "stump speech", "speak to the people on the campaign trail",
            { staff: 1 }, // better w/ more staff? multiplied by endorsement?
            { volunteers: 1, enthusiasm: 2 }, [GRASSROOTS, POPULIST]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "community endorsement", "outreach pays off",
            { staff: 2 },
            { volunteers: 2, endorsements: 1, media: 1 }, [GRASSROOTS]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "business endorsement", "dividends of shmoozing",
            { staff: 2 },
            { funding: 1, endorsements: 1, media: 1 }, [CORPORATE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "celebrity endorsement", "a well-liked personality comes out in support",
            { },
            { volunteers: 1, endorsements: 1, media: 1 }
        )
    },
    {
        frequency: 2,
        // def attr value setting
        card: new Card(
            "policy paper", "release a detailed plan on an issue",
            {staff: 3},
            { enthusiasm: 1, media: 2 }, [SERIOUS]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "late night appearance", "chat with a talk show host",
            // [ {staff: 2}, {funding: 4}],
            { staff: 2 },
            { polling: 3, media: 2, }, [LIKEABLE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "hit piece", "a scathing newspaper article", 
            { staff: 1 },
            { polling: -3 }, []
        )
    },
    {
        frequency: 1,
        card: new Card(
            "endorsement", "a politician endorses you",
            // [ {funding: 2}, {staff:4}],
            { funding: 2 },
            { endorsements: 1, polling: Math.round(1 + Math.random()*3)}, [ESTABLISHMENT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "pundit", "a talking head talks up your campaign on TV",
            // [ {funding: 4}, {staff: 2, volunteers: 2} ],
            { funding: 4 },
            { endorsements: 1, polling: 2, }, [LEGIT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "sway an editorial board", "a local newspaper proclaims you best candidate", 
            { staff: 3 },
            { endorsements: 1, enthusiasm: 1, polling: 3 }, [LEGIT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "podcast guest spot", "you are invited on a popular non-politics podcast", 
            { staff: 2 },
            { endorsements: 1, enthusiasm: 2, polling: 2 }, [LIKEABLE,POPULIST]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "viral moment", "a social media clip is widely shared",
            { staff: 2 },
            { media: 2, polling: 5 }, [LIKEABLE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "triangulate", "shift to center to appeal to a more general audience", 
            { staff: 3 },
            { polling: 4 }, [MODERATE, INCONSISTENT]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "one-liner", "memorable debate moment has everyone talking", 
            { staff: 2 },
            { enthusiasm: 2, polling: 1 }, [LIKEABLE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "win a debate", "commanding debate performance garners praise", 
            { staff: 3 },
            { enthusiasm: 2, polling: 1 }, [SERIOUS,LEGIT]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "hot mic", "an unguarded moment proves embarrassing", 
            { },
            { enthusiasm: -1, polling: -2 }, [SERIOUS,LEGIT]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "SuperPAC", "money money money! (strings attached)", 
            { staff: 3 },
            { funding: 4, polling: -2 }, [CORPORATE, SHADY]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "phone banking", "volunteers make lots of calls for you", 
            { volunteers: 2 },
            { polling: 2, turnout: 2 }, [GRASSROOTS]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "door knocking", "volunteers canvass for you", 
            { volunteers: 3 },
            { polling: 4, turnout: 3 }, [GRASSROOTS]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "nickname", "an affectionate moniker gets added to your name", 
            null,
            { polling: 1 }, [LIKEABLE]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "attack ad", "run a TV spot slamming your opponent", 
            { funding: 3, staff: 2 },
            { polling: 7, funding: -3 }, [CYNICAL, DIRTY, NEGATIVE] // should reduce opponent's polling, but apply (-) characteristics to you
        )
    },
    {
        frequency: 2,
        card: new Card(
            "inspirational campaign ad", "slick and uplifting",
            { funding: 4, staff: 2 },
            { polling: 2, funding: -4 }, [LIKEABLE]
        )
    }
];            


// const [k,v] of cardDefs
export const cardSet = cardDefinitions.reduce(
    (set, cv) => {
        let toAdd = []
        for (let i = 0; i < cv.frequency; i++) { toAdd.push(cv.card) }
        return set.concat(toAdd)
    },
    []
)