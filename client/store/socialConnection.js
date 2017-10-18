import axios from 'axios'

/**
 * INITIAL STATE
 */
const similarUsers = []

/**
 * ACTION TYPES
 */
const FETCH_SIMILAR_USERS = 'FETCH_SIMILAR_USERS'

// CODE LOGIC ----
const currentUserPoints = user => {
  let totalPoints = 12
  // let totalPoints = 12
  if (user.categories.length || user.destinations.length || user.languages.length) {
    // 1 point per category
    totalPoints += user.categories.length
    // 1 point for destination
    totalPoints += user.destinations.length
    // 2 points for age
    totalPoints += user.age ? 2 : 0
    // 1 point for every language
    totalPoints += user.languages.length
    // 2 points for summary health
    totalPoints += user.fitbitInfoId ? 2 : 0
    // 2 points for summary health
    totalPoints += user.weight ? 2 : 0
  }
  return totalPoints
}

const calculateUserMatch = (currentUser, userToCompare) => {
   let matchingPoints = 12
   // 1 point for every matching category
   if (currentUser.categories.length && userToCompare.categories.length) {
    //currentUser.categories.forEach(category => ((userToCompare.categories.includes(category)) ? matchingPoints++ : null))
    let userToCompareCategories = {}
    userToCompare.categories.forEach(category => userToCompareCategories[category.name] = category.name)
    //console.log("CATEGORIES CATEGORIES CATEGORIES", userToCompareCategories)
    currentUser.categories.forEach(category => {
      if (userToCompareCategories[category.name] !== undefined) { matchingPoints++  }
    })
   }
   // 1 point for every destination match
   if (currentUser.destinations.length && userToCompare.destinations.length) {
    // currentUser.destinations.forEach(destination => ((userToCompare.destinations.includes(destination)) ? matchingPoints++ : null))
    let userToCompareDestiations = {}
    userToCompare.destinations.forEach(dest => userToCompareDestiations[dest.id] = dest.id)
    //console.log("DESTINATIONS DESTINATIONS DESTINATIONS", userToCompareDestiations)
    currentUser.destinations.forEach(dest => {
      if (userToCompareDestiations[dest.id] !== undefined) { matchingPoints++  }
    })
   }
   // 2 points if age is withing +- 7yrs of selected user, +- 7 - 12 1 point, else 0
   if (currentUser.age) {
       if (Math.abs(currentUser.age - userToCompare.age) < 10) {
          matchingPoints += 2
       } else if (Math.abs(currentUser.age - userToCompare.age) > 7 && Math.abs(currentUser.age - userToCompare.age) < 15) {
          matchingPoints++
       }
   }
   // 1 point for every language match
   if (currentUser.languages.length && userToCompare.languages.length) {
    //currentUser.languages.forEach(lang => ((userToCompare.languages.includes(lang)) ? matchingPoints++ : null))
    let userToCompareLanguages = {}
    userToCompare.languages.forEach(lang => userToCompareLanguages[lang.id] = lang.id)
    console.log("LANGUAGES LANGUAGES LANGUAGES", userToCompareLanguages)
    // currentUser.languages.forEach(lang => {
    //   if (userToCompareLanguages[lang.id] !== undefined) {
    //     matchingPoints+= 2
    //     break;
    //   }
    // })
    for(let i=0; i<currentUser.languages.length; i++) {
      if(userToCompareLanguages[currentUser.languages[i].id] !== undefined) {
        matchingPoints += currentUser.languages.length;
        break;
      }
    }
   }
   // 2 point if health score within 70 percent of selected user, 50 - 70 1 point, less < 50 0 points
   if (currentUser.fitbitInfoId && userToCompare.fitbitInfoId) {
       if (currentUser.fitbitInfo.weekAverageSteps && userToCompare.fitbitInfo.weekAverageSteps) {
           const stepPercentMatch = (Math.abs(currentUser.fitbitInfo.weekAverageSteps - userToCompare.fitbitInfo.weekAverageSteps) / (currentUser.fitbitInfo.weekAverageSteps > userToCompare.fitbitInfo.weekAverageSteps) ? currentUser.fitbitInfo.weekAverageSteps : userToCompare.fitbitInfo.weekAverageSteps)
           if (stepPercentMatch > 0.7) {
             matchingPoints += 2
           } else if (stepPercentMatch > 0.5 && stepPercentMatch < 0.7) {
             matchingPoints++
           }
       }
   }

   if(Math.abs(currentUser.weight - userToCompare.weight) < 30){
    matchingPoints += 0.25
   }
   if(Math.abs(currentUser.weight - userToCompare.weight) < 15){
    matchingPoints += 0.25
   }
   if(Math.abs(currentUser.weight - userToCompare.weight) < 10){
    matchingPoints += 0.25
   }
   if(Math.abs(currentUser.weight - userToCompare.weight) < 8){
    matchingPoints += 0.25
   }

  //  if (Math.abs(currentUser.height - userToCompare.height < 0.3)) {
  //   matchingPoints += 0.3
  //  }

  //  if (Math.abs(currentUser.height - userToCompare.height < 0.2)) {
  //   matchingPoints += 0.3
  //  }

  //  if (Math.abs(currentUser.height - userToCompare.height < 0.1)) {
  //   matchingPoints += 0.5
  //  }

  //  if(Math.abs(currentUser.bmi - userToCompare.bmi < 4)) {
  //   matchingPoints += 0.4
  //  }

  //  if(Math.abs(currentUser.bmi - userToCompare.bmi < 3)) {
  //   matchingPoints += 0.8
  //  }

  //  if(Math.abs(currentUser.bmi - userToCompare.bmi < 2)) {
  //   matchingPoints += 1
  //  }

   return matchingPoints
}

const matchingFunction = (selectedUser, users) => {
    // points for current user
    const matchingArray = []
    let currentPoints = currentUserPoints(selectedUser)
    console.log("CURRENT POINTS", currentPoints)
    users.forEach(user => {
        const matchingPoints = calculateUserMatch(selectedUser, user)
        console.log("MATCHING POINTS", matchingPoints, "SELECTED USER ", selectedUser, "USER", user)
        let matchPercentage = matchingPoints / currentPoints
        console.log("MATCHING PERCENTAGE", matchPercentage)
        matchingArray.push([matchPercentage, user])
    })
    matchingArray.sort((el1, el2) => el1[0] - el2[0]).reverse()
    return matchingArray
}

// ACTION HANDLER ----
const fetchSimilarAction = usersData => ({ type: FETCH_SIMILAR_USERS, usersData })

// THUNK ----
export const fetchSimilarThunk = (selectedUser) => dispatch =>
        axios.get('/api/users')
        .then(res => res.data)
        .then(users => {
            //console.log(users)
            let user = users.filter(user => user.id === selectedUser.id)[0]
            let usersData = matchingFunction(user, users)
            //console.log(usersData)
            dispatch(fetchSimilarAction(usersData.slice(1)))
        })
        .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = similarUsers, action) {
    switch (action.type) {
      case FETCH_SIMILAR_USERS:
        return action.usersData
      default:
        return state
    }
  }
