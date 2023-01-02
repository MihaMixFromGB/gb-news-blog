// will be replaced main.js from dist after build (build config on vercel)
// vercel serverless function don't support alias path from tsconfig.json
// and so an error will throw, for example, 'Cannot found module '@gb-news-blog/entities'

// Deployment on Vercel - assets not found. But assets folder exists in Output
// Solution:
// 1) Build local and copy main.js to api folder: npm run build:api:vercel.
// 2) verson.json:
// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "api/main.js",
//       "use": "@vercel/node"
//     },
//     {
//       "src": "src/assets/**",
//       "use": "@vercel/static"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/images/(.+)",
//       "dest": "src/assets/images/$1"
//     },
//     {
//       "src": "/(.*)",
//       "dest": "api/main.js"
//     }
//   ]
// }
