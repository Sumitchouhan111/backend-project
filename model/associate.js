

import post from "./post.model.js";
import User from "./user.model.js";
import follow from "./follow.model.js";


User.hasMany(post, { foreignKey: "id" });
post.belongsTo(User, { foreignKey: "id" });
User.hasMany(follow,{foreignKey:"id"});
User.hasMany(follow,{foreignKey:"id"});
follow.belongsTo(User,{foreignKey:"userfollowid"})
follow.belongsTo(User,{foreignKey:"userfollowingid"})
// post.belongsTo(User,{foreignKey:"id"})

export { User, post,follow };


