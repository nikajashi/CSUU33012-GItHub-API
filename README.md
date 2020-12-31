Assignment for Software Engineering Module 
Project Spec: 
Interrogate the GitHub API to build visualisation of data available tht elucidates some aspect of the softare engineering process, such as a social graph of developers and projects, or a visualisation of indiviudal of team performance. Provide a visualisation of this using the d3js library. See https://d3js.org

## Project Description
This project was built using:
 - [ReactJS](https://reactjs.org/)</br>
 - React D3[https://react-d3-library.github.io/]</br>
 - [@octokit/rest](https://www.npmjs.com/package/@octokit/rest)</br>

### Login
The login screen uses Octokit to authenticate the GitHub user using basic authentication. It handles incorrect username and password.


### Dashboard
The dashboard displays the users basic information as well as presenting three cards for stats.

 - Quick Stats -> Basic stats like the number of followers, private/public repos, gists etc.</br>
 - Language Stats -> shows the bytes of code written in each language across all repos. It displays this data in a pie chart.</br>


 ### Stars
 This screen simply show the users stars and allows them to follow the link to the starred repo.
 
 
 ## Usage (in development mode) 
 
 ### `npm install`

Install dependencies.
 
 
 ### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
