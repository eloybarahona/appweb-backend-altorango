import { Router } from "express"
import { createLink, getLinks, getLink, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validatorManager.js";

const router = Router()

//GET           /api/v1/links       all links
//GET           /api/v1/links:id    single link
//POST          /api/v1/links       create link
//PATCH-PUT     /api/v1/links:id    update link
//DELETE        /api/v1/links:id    remove link

router.get('/', requireToken, getLinks)
//router.get('/:id', requireToken, paramsLinkValidator, getLinkById)
router.get('/:nanoLink', getLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.patch('/:id', requireToken, paramsLinkValidator, bodyLinkValidator, updateLink)
router.delete('/:id', requireToken, paramsLinkValidator, removeLink)

export default router;

