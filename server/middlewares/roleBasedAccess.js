const Role = require('../models/role');

exports.checkPermission = (permission) => {
    return async (req, res, next) => {
      const userRole = req.user ? req.user.role : 'anonymous';
      
      const getPermissions = await Role.findOne({role: userRole});
  
      if (getPermissions.permissions.includes(permission)) {
        return next();
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    };
  };