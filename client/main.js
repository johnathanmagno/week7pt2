const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const goalsInput = document.getElementById("goals-input")
const form = document.getElementById("goals")
const goalsContainer = document.getElementById("goals-container")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            alert(res.data)
        })
}

const goalsCallback = ({ data: goals }) => displayGoals(goals)

const addGoal = (body) => axios.post("http://localhost:4000/api/goals/", body).then(goalsCallback)
const deleteGoal = (id) => axios.delete(`http://localhost:4000/api/goals/${id}`).then(goalsCallback, alert('You deleted a goal.'))
const updateGoal = (id) => axios.put(`http://localhost:4000/api/goals/${id}`).then(res => (goalsCallback, console.log(res.data)))
const createGoalLine = (goal) => {
    const goalLine = document.createElement("div")
    goalLine.classList.add('goal-line')
    
    goalLine.innerHTML = 
    ` 
    <button onclick="deleteGoal(${goal.id})" class="goal-line">X</button>
    <p class="goal-line">${goal.goal}</p><br>`
    
    goalsContainer.appendChild(goalLine)
}

const goalText = (e) => {
    e.preventDefault()

    let bodyObj = {
        goal: goalsInput.value,
        completed: false
    }

    addGoal(bodyObj)

    goalsInput.value = ''
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalLine(arr[i])
    }
}

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
form.addEventListener('submit', goalText);