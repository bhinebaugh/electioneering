// candidate characteristics
// group into pairs of antonyms?
// have nullifying characteristics?
const CORPORATE = "corporate";
const SHADY = "shady";
const CYNICAL = "cynical";
const GRASSROOTS = "grassroots";
const INCONSISTENT = "inconsistent";
const MODERATE = "moderate";
const NEGATIVE = "negtive";
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
// INSIDER, CROOKED, POLISHED, SMOOTH, BOLD, RUDE, ROUGH
const target = ["self", "opponent"];

var demographics = [
    { name: "single issue voters", attributes: [SERIOUS]},
    { name: "change year", attributes: [ANTIESTABLISHMENT, OUTSIDER, POPULIST]}
]

function Card(name, description, effects = {}, attributes = []) {
    this.name = name;
    this.description = description;
    this.effects = effects;
    this.attributes = attributes;
    /* possible additional card attributes
        cost: 0, // number and type
        cost: { funding: 5, staff: 0 }
        prerequisite: { staff: 2, volunteers: 5 }
        health
        duration // e.g. smear campaign, decreases approval for 3 turns
        classes: [], // event, person, content
        flags: [],
        effects: [],
        triggers: [],
        immunities: [],
    */
}

var policy = new Card("policy paper", "release a detailed plan on an issue", { enthusiasm: 1, media: 2 }, [SERIOUS]);
var tv1 = new Card("late night appearance", "chat with a talk show host", { polling: 3, media: 2, }, [LIKEABLE]);
var pol = new Card("endorsement", "a politician endorses you", { endorsements: 1, polling: Math.round(1 + Math.random()*3)}, [ESTABLISHMENT]);
var pundit = new Card("pundit", "a talking head talks up your campaign on TV", { polling: 2, }, [LEGIT]);
var meme = new Card("viral moment", "a social media clip is widely shared", { media: 2, polling: 5 }, [LIKEABLE]);
var tri = new Card("triangulate", "shift to center to appeal to a more general audience", {}, [MODERATE, INCONSISTENT]);
var oneliner = new Card("one-liner", "memorable debate moment has everyone talking", { enthusiasm: 2, polling: 1 });
var superpac = new Card("SuperPAC", "money money money! (strings attached)", { funding: 4, polling: -2 }, [CORPORATE, SHADY]);
var phone = new Card("phone banking", "volunteers make lots of calls for you", { polling: 2, turnout: 2 }, [GRASSROOTS]);
var tv2 = new Card("attack ad", "run a TV spot slamming your opponent", { polling: -2 }, [CYNICAL, DIRTY, NEGATIVE]); // should reduce opponent's polling, but apply (-) characteristics to you
var nickname = new Card("nickname", "an affectionate moniker gets added to your name", { opinion: 1 }, [LIKEABLE]);


export const cardSet = [
    pundit, pundit, pundit,
    pol, pol, 
    policy,
    tv1, tv1,
    meme, meme,
    tri,
    oneliner,
    superpac, superpac,
    phone, phone, phone,
    tv2, tv2,
    nickname,
]
// cardsObject = { pundit: 3, pol: 2 }
// for(let i=0; i<3; i++) { cardSet.push(pol)}
