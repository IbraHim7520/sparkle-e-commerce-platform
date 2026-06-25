
// NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:7000
// NEXT_PUBLIC_FRONTEND_URL=http://localhost:7000


// NEXT_PUBLIC_BACKEND_URL=http://localhost:7000/api/v1
// NEXT_PUBLIC_CLOUDINARY_PRESET=sparkle_e_commerce
// NEXT_PUBLIC_CLOUDINARY_NAME=dx8bgm921
export const envFile = {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:7000/api/v1",
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    CLOUDINARY_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET,
    CLOUDINARY_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
}

if(!envFile.BACKEND_URL || !envFile.FRONTEND_URL || !envFile.BETTER_AUTH_URL){
    throw new Error("Please provide all the required environment variables")
}