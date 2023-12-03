add model 
npx sequelize-cli model:generate --name User --attributes username:string,password:string
npx sequelize-cli model:generate --name Token --attributes UserId:string,token:string
