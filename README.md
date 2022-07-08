<p align="center">
    <a href='https://www.nfthost.app/' rel='nofollow'>
        <img src='./public/assets/logo.png' alt='FunTime Logo' style="width: 150px" />
    </a>
</p>

<h1 align="center">FunTime</h1>

<p align="center">
    <img src='https://github.com/Damandeep27/FunTime/actions/workflows/docker-deployment.yml/badge.svg' alt='Docker Deployment'>
</p>

<p align="center">
    Hangout and meet new friends in a unique way!
</p>

<p align="center">
    <a href='https://fun--time.herokuapp.com' target="_blank">Visit Website</a>
</p>

## Setup

<a href='https://hub.docker.com/repository/docker/stephenasuncion/funtime' target="_blank">Docker Hub Repository: funtime</a>

Installation with Docker Hub:
```
docker pull stephenasuncion/funtime:main
docker container run --name web -p 8080:8080 stephenasuncion/funtime:main
```

Installation with Node.js:
```
npm i 
npm run dev
```

## Environment Variables

| .env        |
| ----------- |
| MONGODB_URI |

## Support

If you need help with anything please contact us on Slack @sasuncion02 or @Damandeep Singh

## License

[Apache License Version 2.0](https://github.com/Damandeep27/FunTime/blob/main/LICENSE)
