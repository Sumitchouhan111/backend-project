import {Sequelize} from'sequelize';

const sequelize = new Sequelize("myproject","root","root",{
    host:"localhost",
    dialect:"mysql"
})

sequelize.authenticate().then(()=>{
    console.log("data base created ");
}).catch(()=>{
  console.log("not create a data base ");
  console.log(err);
})

export default sequelize;