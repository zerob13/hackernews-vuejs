import Firebase from 'firebase'
import {
  EventEmitter
} from 'events'

const api = new Firebase('https://hacker-news.firebaseio.com/v0')
const itemsCache = Object.create(null)
const store = new EventEmitter()
const storiesPerPage = store.storiesPerPage = 30
let newStoryIds = []
let topStoryIds = []
let askStoryIds = []
let showStoryIds = []
let jobStoryIds = []

export default store
api.child('newstories').on('value', snapshot => {
  newStoryIds = snapshot.val()
  store.emit('newstories-updated')
})

api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val()
  store.emit('topstories-updated')
})

api.child('askstories').on('value', snapshot => {
  askStoryIds = snapshot.val()
  store.emit('askstories-updated')
})

api.child('showstories').on('value', snapshot => {
  showStoryIds = snapshot.val()
  store.emit('showstories-updated')
})

api.child('jobstories').on('value', snapshot => {
  jobStoryIds = snapshot.val()
  store.emit('jobstories-updated')
})

/**
 * Fetch an item data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchItem = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('item/' + id).once('value', snapshot => {
        const story = itemsCache[id] = snapshot.val()
        resolve(story)
      }, reject)
    }
  })
}

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */

store.fetchItems = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve([])
  } else {
    return Promise.all(ids.map(id => store.fetchItem(id)))
  }
}

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @param {Number} storyid  
 * @return {Promise}
 */

store.fetchItemsByPage = (page, storyId) => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  var ids;
  switch (storyId) {
    case 'new':
      ids = newStoryIds.slice(start, end)
      break;
    case 'top':
      ids = topStoryIds.slice(start, end)
      break;
    case 'ask':
      ids = askStoryIds.slice(start, end)
      break;
    case 'show':
      ids = showStoryIds.slice(start, end)
      break;
    case 'job':
      ids = jobStoryIds.slice(start, end)
      break;
    default:
      ids = topStoryIds.slice(start, end)
      break;
  }
  return store.fetchItems(ids)
}

/**
 * Fetch a user data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}
