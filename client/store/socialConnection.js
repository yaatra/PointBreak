import axios from 'axios'
import history from '../history'

const similarUsers = []

const FETCH_SIMILAR_USERS = 'FETCH_SIMILAR_USERS';

const fetchSimilarAction = similarUsers => ({ type: FETCH_SIMILAR_USERS, similarUsers })

const currentUserPoints = user => {
    console.log("******USER inside currentUserPoints", user)
    let totalPoints = 0;
    // 1 point per category
    user.categories.length ? user.categories.forEach(category => totalPoints++) : null
    // 1 point for destination
    user.destinations.length ? user.destinations.forEach(destination => totalPoints++) : null 
    // 2 points for age
    user.age ? totalPoints+=2 : null 
    // 1 point for every language
    user.languages.length ? user.languages.forEach(language => totalPoints++) : null 
    // 2 points for summary health
    user.fitbitInfoId ? totalPoints+=2 : null;
    return totalPoints
}

const calculateUserMatch = (currentUser, userToCompare) => {
   let matchingPoints = 0;
   // 1 point for every matching category
   if(currentUser.categories.length && userToCompare.categories.length) {
    currentUser.categories.forEach(category => (userToCompare.categories.includes(category)) ? matchingPoints++ : null)   
   }
   // 1 point for every destination match
   if(currentUser.destinations.length && userToCompare.destinations.length) {
    currentUser.destinations.forEach(destination => (userToCompare.destinations.includes(destination)) ? matchingPoints++ : null)   
   }
   // 2 points if age is withing +- 7yrs of selected user, +- 7 - 12 1 point, else 0
   if (currentUser.age) {
       if (Math.abs(currentUser.age - userToCompare.age)<7) {
          matchingPoints += 2
       } else if(Math.abs(currentUser.age - userToCompare.age)>7 && Math.abs(currentUser.age - userToCompare.age)<12) {
          matchingPoints++
       }
   }
   // 1 point for every language match
   if(currentUser.languages.length && userToCompare.languages.length) {
    currentUser.languages.forEach(lang => (userToCompare.languages.includes(lang)) ? matchingPoints++ : null)   
   }
   // 2 point if health score within 70 percent of selected user, 50 - 70 1 point, less < 50 0 points
   if (currentUser.fitbitInfoId && userToCompare.fitbitInfoId) {
       if(currentUser.fitbitInfo.weekAverageSteps && userToCompare.fitbitInfo.weekAverageSteps) {
           const stepPercentMatch = (Math.abs(currentUser.fitbitInfo.weekAverageSteps - userToCompare.fitbitInfo.weekAverageSteps) 
           / (currentUser.fitbitInfo.weekAverageSteps > userToCompare.fitbitInfo.weekAverageSteps) ? currentUser.fitbitInfo.weekAverageSteps : userToCompare.fitbitInfo.weekAverageSteps)
           if(stepPercentMatch > 0.7) {
             matchingPoints += 2
           } else if (stepPercentMatch > 0.5 && stepPercentMatch < 0.7) {
             matchingPoints++
           }
       }
   }
   return matchingPoints;
}

const matchingFunction = (selectedUser, users) => {
    // points for current user
    const matchingArray = []
    let currentPoints = currentUserPoints(selectedUser)
    users.forEach(user => {
        const matchingPoints = calculateUserMatch(selectedUser,user)
        let matchPercentage = matchingPoints / currentPoints
        matchingArray.push([matchPercentage, user])
    })
    matchingArray.sort((el1, el2) => el1[0] - el2[0]).reverse()
    console.log(matchingArray)
    return matchingArray;
}


export const fetchSimilarThunk = (selectedUser) =>
    dispatch =>
        axios.get('/api/users')
        .then(res => res.data)
        .then(users => {
            //console.log(users)
            let user = users.filter(user => user.id === selectedUser.id)[0]
            console.log(user);
            console.log(users);
            let usersData = matchingFunction(user, users)
            //console.log("user Data", usersData)
            //fetchSimilarAction(usersData)
        })
        .catch(err => console.log(err))




export default function (state = similarUsers, action) {
    switch (action.type) {
      case FETCH_SIMILAR_USERS:
        return action.similarUsers
      default:
        return state
    }
  }