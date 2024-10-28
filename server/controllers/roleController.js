const Role = require('../models/role')

const newRole = async (req, res) => {
    const { role, permissions } = req.body
  
    let emptyFields = []
  
    if(!role) {
      emptyFields.push('role')
    }
    if(!permissions) {
        emptyFields.push('permissions')
      }
    
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    try {
      const roleList = await Role.create({ role, permissions })
      res.status(201).json(roleList)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

  const getRoleList = async (req, res) => {
    const roleList = await Role.find()
    res.status(200).json(roleList)
  }

  module.exports = { newRole, getRoleList }