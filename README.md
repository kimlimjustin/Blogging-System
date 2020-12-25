# Blogging System
An easy to use, markdown based blogging system that supports users from website and desktop.

![Blogging system demo](https://drive.google.com/uc?export=view&id=1B_mXjuEtNQfnfdamrY3MVlq4LNpIEGXY)

## Quicky setup:
- Clone this repository or fork it.
    - To clone this repository, type `git clone https://github.com/kimlimjustin/Blogging-System.git` on your command line.
    - To fork this repository, click fork button of this repository then type `git clone https://github.com/<your username>/Blogging-System.git` on your command line
- Inside `server` folder, create a new file named `.env` which stores information about the server side, such as `ATLAS_URI` and `SECURITY_KEY`. For example of this file, you can view `server/.env.example` file
- Inside `website` folder, create a new file called `.env` which stores your information about client side such as `REACT_APP_SECRET_KEY` and `REACT_APP_SERVER_URL` informations. For example of this file, you can view `website/.env.example` file
- Install all dependencies
    - Client side: on the `website` directory type `npm install`
    - Server side: on the `server` directory type `npm install`
- Run it on node js:
    - Client side(website and desktop app): on the `website` directory type `npm run start`
    - Server side: on the `server` directory type `npm start`
- Build for production of website and desktop
    - On the `website` directory, type `npm run build`

## Commands available for `website` directory:
- `npm run react-start`: Start and run react application in the development mode.
- `npm run react-build`: Build react application to the `build` folder.
- `npm run react-eject`: Eject your react build tool and configs.
- `npm run electron-build`: Build desktop app using electron.js.
- `npm run build`: Build application for both website and desktop
- `npm run start`: Start your application for both website and desktop