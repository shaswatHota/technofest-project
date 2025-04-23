const {z} =require("zod");

const userProfileSchema = z.object({

    username : z.string().min(1),
    collegeName : z.string().min(1),
    collegeDuration : z.object({

        start : z.number(),
        end : z.number(),

    }),
    profilePicUrl : z.string().optional()


});
module.exports = userProfileSchema;