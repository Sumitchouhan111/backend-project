

import post from "./post.model.js";
import User from "./user.model.js";
import follow from "./follow.model.js";
import postlike from "./postlike.model.js";
import notification from "./notification.js";
import Comments from "./comment.model.js";
import { commnetslike } from "./commentlike.js";
import { Reply } from "./Reply.model.js";



User.hasMany(post, { foreignKey: "id" });
post.belongsTo(User, { foreignKey: "id" });
User.hasMany(follow,{foreignKey:"id"});
User.hasMany(follow,{foreignKey:"id"});
follow.belongsTo(User,{foreignKey:"userfollowid"})
follow.belongsTo(User,{foreignKey:"userfollowingid"})


post.hasMany(postlike,{foreignKey:"postid"});
postlike.belongsTo(post,{foreignKey:"postid"})

User.hasMany(postlike,{foreignKey:"id"})
postlike.belongsTo(User,{foreignKey:"id"})


User.hasMany(notification,{foreignKey:"id"});
notification.belongsTo(User,{foreignKey:"id"});

post.hasMany(Comments,{foreignKey:"postid"})
Comments.belongsTo(post,{foreignKey:"postid"})

User.hasMany(Comments,{foreignKey:"id"})
Comments.belongsTo(User,{foreignKey:"id"})

User.hasMany(commnetslike,{foreignKey:"id"})
commnetslike.belongsTo(User,{foreignKey:"id"})

Comments.hasMany(commnetslike,{foreignKey:"commnetid"});
commnetslike.belongsTo(Comments,{foreignKey:"commnetid"})

Comments.hasMany(Reply,{foreignKey:"commnetid"})
Reply.belongsTo(Comments,{foreignKey:"commnetid"})

User.hasMany(Reply,{foreignKey:"id"})
Reply.belongsTo(User,{foreignKey:"id"})

export {User, post,follow,postlike,notification,Comments,commnetslike,Reply};


