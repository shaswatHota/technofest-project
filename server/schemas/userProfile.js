import {z} from zod;

const userProfileSchema = z.object({

    username : z.string().min(1),
    collegeName : z.string().min(1),
    collegeDuration : z.object({

        start : z.number(),
        end : z.number(),

    }),
    profilePicUrl : z.string().oprional()


});
export default userProfileSchema;