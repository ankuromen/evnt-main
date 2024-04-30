import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
		},
		dob: {
			type: Date,
		},
		gender: {
			type: String,
			enum: ["Male", "Female", "Other"],
		},
		nationality: {
            type: String,
        },
		location: {
            type: String,
        },
		interests: {
            type: [String],
            default: [],
        },
		preferredPlatformsOfEvent: {
            type: [String],
            default: [],
        },
        occupation: {
            type: String,
        },
		instagram: {
            type: String,
        },
		profilePic: {
			type: String,
			default: "",
		},
		followers: {
			type: [String],
			default: [],
		},
		following: {
			type: [String],
			default: [],
		},
		bio: {
			type: String,
			default: "",
		},
		isFrozen: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
