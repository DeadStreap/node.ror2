const Router = require('express')
const router = new Router()
const Controller = require('../controller/controller')

router.post('/add/item', Controller.createItem)
router.get('/items', Controller.getItems)
router.get('/item/id/:id', Controller.getItemById)
router.get('/item/rarity/:rarity', Controller.getItemByRarity)
router.get('/item/name/:name', Controller.getItemByName)

router.get('/characters', Controller.getCharacters)
router.get('/character/name/:name', Controller.getCharacterByName)

router.post('/user/register', Controller.regUser)
router.post("/user/auth", Controller.authUser)
router.get("/user/favorite/all/:user_id", Controller.getUserFavoriteAll)
router.get("/user/favorite/id/:user_id", Controller.getUserFavoriteId)
router.post("/user/add/favorite", Controller.addUserFavorite)

module.exports = router
