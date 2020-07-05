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
        frequency: 9,
        card: new Card(
            "hire staff", "increase your campaign's capacity by adding more people",
            { funding: 1 },
            { staff: 1, funding: -1 }, [LEGIT]
        )
    },
    {
        frequency: 3,
        card: new Card(
            "small fundraiser", "hold a private event to encourage donations",
            { staff: 1 },
            { funding: 2 }, [CORPORATE]
        )
    },

    {
        frequency: 3,
        card: new Card(
            "big fundraiser", "hold an exclusive event to encourage large donations",
            { staff: 2 },
            { funding: 4 }, [CORPORATE]
        )
    },
    {
        frequency: 3,
        card: new Card(
            "small online donations", "contributions through your website add up",
            { staff: 1 },
            { funding: 2 }, [GRASSROOTS]
        )
    },
    {
        frequency: 3,
        card: new Card(
            "recurring donations", "a few online contributors agree to be billed monthly",
            { staff: 2 },
            { funding: 3 }, [GRASSROOTS]
        )
    },
    {
        frequency: 5,
        card: new Card(
            "recruit volunteers", "ask as part of outreach",
            { staff: 1 },
            { volunteers: 2, enthusiasm: 1, funding: -1 }, [GRASSROOTS]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "newsletter", "send an update to your mailing list",
            { staff: 1 },
            { volunteers: 1, enthusiasm: 2 }, [SERIOUS]
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
            { volunteers: 1 },
            { volunteers: 1, endorsements: 1, media: 1 }
        )
    },
    {
        frequency: 2,
        // def attr value setting
        card: new Card(
            "policy paper", "release a detailed plan on an issue",
            { staff: 3, funding: 1 },
            { polling: 3, enthusiasm: 1, media: 2, funding: -1 }, [SERIOUS]
        )
    },
    {
        frequency: 4,
        // def attr value setting
        card: new Card(
            "press release", "issue a formal statement addressing a topic in the news",
            {staff: 1},
            { polling: 1, media: 1 }, [SERIOUS]
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
        frequency: 4,
        // def attr value setting
        card: new Card(
            "press conference", "answer questions from reporters",
            { staff: 1 },
            { polling: 2, media: 1, enthusiasm: 1 }, [SERIOUS]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "mixed press", "coverage questions the depth of your support", 
            { staff: 1 },
            { polling: -2 }, []
        )
    },
    {
        frequency: 1,
        card: new Card(
            "hit piece", "a scathing newspaper article", 
            { staff: 2 },
            { polling: -4 }, []
        )
    },
    {
        frequency: 3,
        card: new Card(
            "party endorsement", "a fellow politician notices your fundraising and endorses you",
            // [ {funding: 2}, {staff:4}],
            { funding: 4 },
            { endorsements: 1, polling: Math.round(1 + Math.random()*5)}, [ESTABLISHMENT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "pundit", "a talking head is impressed by your campaign on air",
            // [ {funding: 4}, {staff: 2, volunteers: 2} ],
            { funding: 3 },
            { endorsements: 1, polling: 2, }, [LEGIT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "buzz", "commentators make note of your impassioned supporters",
            // [ {funding: 4}, {staff: 2, volunteers: 2} ],
            { volunteers: 3 },
            { polling: 2, enthusiasm: 2 }, [LEGIT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "sway an editorial board", "a local newspaper proclaims you best candidate", 
            { staff: 3 },
            { endorsements: 1, enthusiasm: 2, polling: 3 }, [LEGIT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "radio interview", "local talk radio host has you on for a chat", 
            { staff:  1 },
            { enthusiasm: 1, polling: 2 }, [LIKEABLE,POPULIST]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "podcast guest spot", "you are invited on a popular non-politics podcast", 
            { staff:  2 },
            { endorsements: 1, enthusiasm: 2, polling: 3 }, [LIKEABLE,POPULIST]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "viral moment", "a social media clip is widely shared",
            { staff: 2 },
            { media: 2, polling: 4 }, [LIKEABLE]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "equivocate", "walk back some earlier positions", 
            { staff: 1 },
            { polling: 3, enthusiasm: -1 }, [MODERATE, INCONSISTENT]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "triangulate", "consultants help adjust policy for more popular appeal", 
            { staff: 3 },
            { polling: 5, funding: -1 }, [MODERATE, INCONSISTENT]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "gaffe", "your foot ends up in your mouth", 
            { },
            { enthusiasm: -1, polling: -2 }, [LIKEABLE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "one-liner", "memorable debate moment has everyone talking", 
            { staff: 2 },
            { enthusiasm: 2, polling: 2 }, [LIKEABLE]
        )
    },
    {
        frequency: 1,
        card: new Card(
            "win a debate", "commanding debate performance garners praise", 
            { staff: 3 },
            { enthusiasm: 2, polling: 5, media: 1 }, [SERIOUS,LEGIT]
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
            { funding: 4, polling: -2, enthusiasm: -1 }, [CORPORATE, SHADY]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "phone banking", "volunteers make lots of calls for you", 
            { volunteers: 2 },
            { polling: 2, enthusiasm: 2, funding: -1 }, [GRASSROOTS]
        )
    },
    {
        frequency: 2,
        card: new Card(
            "door knocking", "volunteers canvass for you", 
            { volunteers: 3 },
            { polling: 4, enthusiasm: 3, funding: -1 }, [GRASSROOTS]
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
        frequency: 4,
        card: new Card(
            "attack ad", "run a TV spot slamming your opponent", 
            { funding: 1, staff: 1 },
            { polling: -4, funding: -1 }, [CYNICAL, DIRTY, NEGATIVE] // should reduce opponent's polling, but apply (-) characteristics to you
        )
    },
    {
        frequency: 2,
        card: new Card(
            "smear campaign", "manufacture a controversy about your opponent", 
            { funding: 3, staff: 2 },
            { polling: 9, funding: -3 }, [CYNICAL, DIRTY, NEGATIVE] // should reduce opponent's polling, but apply (-) characteristics to you
        )
    },
    {
        frequency: 2,
        card: new Card(
            "Billboard", "your name recognition gets a boost", 
            { funding: 1, staff: 1 },
            { polling: 2, funding: -1 }, []
        )
    },
    {
        frequency: 5,
        card: new Card(
            "Prime time ad", "your commercial is seen by many viewer", 
            { funding: 1, staff: 1 },
            { polling: 3, funding: -1 }, [LEGIT] // should reduce opponent's polling, but apply (-) characteristics to you
        )
    },
    {
        frequency: 2,
        card: new Card(
            "inspirational campaign ad", "slick and uplifting",
            { funding: 3, staff: 2 },
            { polling: 4, enthusiasm: 1, funding: -3 }, [LIKEABLE]
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