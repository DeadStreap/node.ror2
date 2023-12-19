const Router = require('express')
const router = new Router()
const itemsController = require('../controller/itemsController')
const equipmentController = require('../controller/equipmentController')
const charactersController = require('../controller/charactersController')
const userController = require('../controller/userController')

router.post('/add/item', itemsController.createItem)
router.get('/items', itemsController.getItems)
router.get('/item/id/:id', itemsController.getItemById)
router.get('/item/rarity/:rarity', itemsController.getItemByRarity)
router.get('/item/name/:name', itemsController.getItemByName)

router.post('/add/equipment', equipmentController.createEquipment)
router.get('/equipments', equipmentController.getEquipments)
router.get('/equipment/id/:id', equipmentController.getEquipmentById)
router.get('/equipment/name/:name', equipmentController.getEquipmentByName)

router.get('/characters', charactersController.getCharacters)
router.get('/character/name/:name', charactersController.getCharacterByName)

router.post('/user/register', userController.regUser)
router.post('/user/update/avatar', userController.updateAvatar)
router.post('/user/delete/avatar', userController.deleteAvatar)
router.post("/user/auth", userController.authUser)
router.get("/user/favorite/all/:user_id", userController.getUserFavoriteAll)
router.get("/user/favorite/id/:user_id", userController.getUserFavoriteId)
router.post("/user/add/favorite", userController.addUserFavorite)

module.exports = router
