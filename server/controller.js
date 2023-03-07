const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
const fortunes = ["Advice is like kissing. It costs nothing and is a pleasant thing to do.", "Be careful or you could fall for some tricks today.","You'll meet a man at Denny's and he'll be touchy","Believe it can be done","Carve your name on your heart and not on marble."]
const goalData = require('./whatchagoalstho.json')
let id = goalData.length

module.exports = {

    getCompliment: (req, res) => {
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex]

        res.status(200).send(randomFortune)
    },

    addGoal: (req, res) => {
        req.body.id = id
        goalData.push(req.body)
        id++
        res.status(200).send(goalData)
    },

    deleteGoal: (req, res) => {
        const findGoalId = goalData.findIndex((e) => e.id === +req.params.id);
        goalData.splice(findGoalId, 1)
         
        res.status(200).send(goalData)
    },

    updateGoal: (req, res) => {
        const {id} = req.params;
        // const {checkbox} = req.body;

        console.log(goalData)

        const goal = goalData.findIndex((goal) => {
            if(+id === goal.id && goal.completed === false) { 
                goal.completed = true
            } else {
                goal.completed = false
            }
        })

        res.status(200).send(goalData)
    }

}