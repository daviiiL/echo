
<br/>
<div align="center">
<a href="https://github.com/daviiiL/echo">
<img src="https://cdn.icon-icons.com/icons2/2248/PNG/512/blur_icon_137869.png" alt="Logo" width="80" height="80">
</a>
<h3 align="center">echo</h3>
<p align="center">
another user-friendly and soothing article publishing/blogging platform
<br/>
<br/>
<a href="https://github.com/daviiiL/echo/wiki"><strong>Explore the docs »</strong></a>
<br/>
<br/>
<a href="https://echo-2nra.onrender.com/">View Demo .</a>  
<a href="https://github.com/daviiiL/echo/issues/new">Report Bug .</a>
<a href="https://github.com/daviiiL/echo/issues/new">Request Feature</a>
</p>
</div>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [React](https://reactjs.org)
- [Express](https://expressjs.com/)
- [Vite](https://vitejs.dev/)
- [React Redux](https://react-redux.js.org/)
- [postgreSQL](https://www.postgresql.org/)
## Getting Started

To setup this project locally, clone the project and follow the installation instructions.
### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```
### Installation

#### Local 

1. Clone the repo
   ```sh
   git clone https://github.com/daviiiL/echo
   ```
3. Install NPM packages
   ```sh
   npm --prefix frontend install -r requirements.txt
   npm --prefix backend install
   ```
4. Navigate to ./backend and copy the example .env file 
   ```sh
   cp .env.example .env
   ```
5. Edit the .env file with your fav editor 
5.5 Run database migrations and seeders
   ```sh 
   cd ./backend && npx dotenv -- sequelize db:migrate && npx dotenv -- sequelize db:seed:all
   ```
6. To start the frontend and the backend servers, respectively (example from project root)
  ```sh 
    # frontend 
    npm --prefix frontend run dev

    #backend
    npm --prefix backend start
  ```

#### Via Render

1.  Create a postgreSQL Database Server with your account.
2. Create a Web Service Server with your account, linking github repo of ```https://github.com/daviiiL/echo``` and your created db server.
3. Build and have fun 
## Roadmap

- [x] Add comments hierarchy 
- [x] Add bookmarks
- [x] Add likes
- [x] Add toast notifications  
- [ ] Friends and followers
- [ ] News APIs
- [ ] Chatrooms

See the [open issues](https://github.com/daviiiL/echo/issues/new) for a full list of proposed features (and known issues).
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## License

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.
## Acknowledgments

medium.com and my cat inspired this project


