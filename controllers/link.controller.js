import { nanoid } from "nanoid"
import { Link } from "../models/Link.js"

export const getLinks = async (req, res) => {
    try {

        const links = await Link.find({uid: req.uid})
        return res.json({ links })
        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ error: "Error de servidor."})

    }
}

export const getLink = async (req, res) => {
    try {
        const {nanoLink} = req.params
        const link = await Link.findOne({ nanoLink })
        if(!link) return res.status(404).json({ error: "El link no existe." })

        return res.json({ longLink: link.longLink })
        
    } catch (error) {
        
        console.log(error)
        if(error.kind === 'ObjectId') {
            return res.status(403).json({ error: "Formato del link incorrecto." })
        }
        return res.status(500).json({ error: "Error de servidor."})

    }
}

export const getLinkById = async (req, res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({ error: "El link no existe." })
        //Si se comparte el link no se debería de restringir.
        if(!link.uid.equals(req.uid)) return res.status(401).json({ error: "El link no existe para el uid." }) 
        return res.json({ link })
        
    } catch (error) {
        
        console.log(error)
        if(error.kind === 'ObjectId') {
            return res.status(403).json({ error: "Formato del link incorrecto." })
        }
        return res.status(500).json({ error: "Error de servidor."})

    }
}

export const createLink =  async (req, res) => {
    try {

        let { longLink } = req.body
        if(!longLink.startsWith('https://')){
            longLink = 'https://' + longLink
        }
        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        const newLink = await link.save()
        return res.status(201).json({ newLink })
        
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({ error: "Error de servidor."})

    }    
}

export const removeLink = async (req, res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({ error: "El link no existe." })
        //Si se comparte el link no se debería de restringir.
        if(!link.uid.equals(req.uid)) return res.status(401).json({ error: "El link no existe para el uid." }) 
        await link.remove()
        return res.json({ link })
        
    } catch (error) {
        
        console.log(error)
        if(error.kind === 'ObjectId') {
            return res.status(403).json({ error: "Formato del link incorrecto." })
        }
        return res.status(500).json({ error: "Error de servidor."})

    }
}

export const updateLink = async (req, res) => {
    try {
        const {id} = req.params
        const {longLink} = req.body
        if(!longLink.startsWith('https://')){
            longLink = 'https://' + longLink
        }
        const link = await Link.findById(id)
        if(!link) return res.status(404).json({ error: "El link no existe." })
        //Si se comparte el link no se debería de restringir.
        if(!link.uid.equals(req.uid)) return res.status(401).json({ error: "El link no existe para el uid." }) 
        //Update
        link.longLink = longLink
        await link.save()
        return res.json({ link })
        
    } catch (error) {
        
        console.log(error)
        if(error.kind === 'ObjectId') {
            return res.status(403).json({ error: "Formato del link incorrecto." })
        }
        return res.status(500).json({ error: "Error de servidor."})

    }
}