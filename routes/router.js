const Router = require('express')
const router = new Router()
const itemsController = require('../controller/itemsController')
const equipmentController = require('../controller/equipmentController')
const charactersController = require('../controller/charactersController')
const userController = require('../controller/userController')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./public/uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})


router.post('/add/item', itemsController.createItem)
router.post('/update/item', itemsController.updateItem)
router.post('/delete/item', itemsController.deleteItem)
router.get('/items', itemsController.getItems)
router.get('/item/id/:id', itemsController.getItemById)
router.get('/item/rarity/:rarity', itemsController.getItemByRarity)
router.get('/item/name/:name', itemsController.getItemByName)

router.post('/add/equipment', equipmentController.createEquipment)
router.post('/update/equipment', equipmentController.updateEquipment)
router.post('/delete/equipment', equipmentController.deleteEquipment)
router.get('/equipments', equipmentController.getEquipments)
router.get('/equipment/id/:id', equipmentController.getEquipmentById)
router.get('/equipment/name/:name', equipmentController.getEquipmentByName)

router.post('/add/character', charactersController.createCharacter)
router.post('/update/character', charactersController.updateCharacter)
router.post('/delete/character', charactersController.deleteCharacter)
router.get('/characters', charactersController.getCharacters)
router.get('/character/name/:name', charactersController.getCharacterByName)

router.post('/user/register', userController.regUser)
router.post('/user/update/avatar', userController.updateAvatar)
router.post('/user/upload/avatar', upload.single('file'), userController.uploadAvatar)
router.post('/user/update/admin', userController.updateAdmin)
router.post('/user/delete/avatar', userController.deleteAvatar)
router.post('/user/delete', userController.deleteUser)
router.post("/user/auth", userController.authUser)
router.get("/user/favorite/all/:user_id", userController.getUserFavoriteAll)
router.get("/user/favorite/id/:user_id", userController.getUserFavoriteId)
router.post("/user/add/favorite", userController.addUserFavorite)
router.get('/users', userController.getUsers)
router.get('/user/id/:id', userController.getUserById)

module.exports = router
