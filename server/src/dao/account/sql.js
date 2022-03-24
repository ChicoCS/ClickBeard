module.exports = {
  getLoginAccount: `
    SELECT us.uid, us.name, us.email, us.type 
    FROM users us
    WHERE 
    us.login = :login
    AND
    us.password = :password`,

  getAccountByUID: `
    SELECT * 
    FROM users us
    WHERE 
    us.uid = :uid`,
  
  getAccountByEmail: `
    SELECT * 
    FROM users us
    WHERE 
    us.email = :email`,

  checkLoginAccount: `
    SELECT TRUE
    FROM users us
    WHERE 
    us.login = :login
  `,

  checkAccountExists: `
    SELECT us.login, us.email 
    FROM users us
    WHERE 
    us.login = :login
    OR 
    us.email = :email
  `,

  createAccount: `
    INSERT INTO users(name, login, password, email, type) 
    VALUES (:name, :login, :password, :email, :type)
  `,

  deleteAccount: `DELETE FROM users WHERE uid = :uid`,
};
